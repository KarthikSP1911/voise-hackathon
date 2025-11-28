import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Transcribe audio using Groq Whisper
 * @param audioFile - Audio file buffer or blob
 * @returns Transcribed text
 */
export async function transcribeAudio(audioFile: File): Promise<string> {
  try {
    const transcription = await groq.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-large-v3",
      language: "en", // English for now, will add multilingual later
      response_format: "json",
      temperature: 0.0, // More deterministic
    });
    
    return transcription.text;
  } catch (error: any) {
    console.error('Whisper transcription error:', error);
    throw new Error(`Transcription failed: ${error.message}`);
  }
}

/**
 * Process triage input using Groq LLaMA
 * @param transcript - Patient's symptom description
 * @returns Structured triage data
 */
export async function processTriageWithLLaMA(transcript: string) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: TRIAGE_SYSTEM_PROMPT
        },
        {
          role: "user",
          content: `Patient describes: "${transcript}"\n\nProvide a structured triage assessment in JSON format with severity-based classification.`
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.2, // Very low temperature for consistent medical assessments
      max_tokens: 2500,
      response_format: { type: "json_object" } // Enforce JSON response
    });

    const responseText = completion.choices[0]?.message?.content;
    
    if (!responseText) {
      throw new Error('Empty response from LLaMA');
    }

    // Parse the JSON response
    const result = JSON.parse(responseText);
    
    // Validate the response structure
    if (!result.urgencyLevel || !result.aiSummary) {
      throw new Error('Invalid response structure from LLaMA');
    }

    // Validate urgency level is one of the allowed values
    const validUrgencyLevels = ['SELF_CARE', 'CLINIC_VISIT', 'URGENT_VISIT', 'EMERGENCY'];
    if (!validUrgencyLevels.includes(result.urgencyLevel)) {
      console.warn(`Invalid urgency level: ${result.urgencyLevel}, defaulting to CLINIC_VISIT`);
      result.urgencyLevel = 'CLINIC_VISIT';
    }

    return {
      structuredData: result.structuredData || {},
      urgencyLevel: result.urgencyLevel,
      redFlags: result.redFlags || [],
      aiSummary: result.aiSummary,
      rationale: result.rationale || 'No rationale provided',
      recommendedAction: result.recommendedAction || 'Please consult with a healthcare provider',
    };
    
  } catch (error: any) {
    console.error('LLaMA triage processing error:', error);
    
    // Provide more specific error messages
    if (error.message?.includes('API key')) {
      throw new Error('Groq API key is invalid or missing');
    }
    if (error.message?.includes('rate limit')) {
      throw new Error('API rate limit exceeded. Please try again in a moment.');
    }
    if (error.name === 'SyntaxError') {
      throw new Error('Failed to parse AI response. Please try again.');
    }
    
    throw new Error(`Triage processing failed: ${error.message}`);
  }
}

/**
 * System prompt for triage AI with severity-based classification
 */
const TRIAGE_SYSTEM_PROMPT = `You are an expert medical triage assistant with advanced severity classification capabilities. Your role is to:

1. ANALYZE symptoms with context-aware severity assessment
2. CLASSIFY urgency based on medical priority and risk
3. IDENTIFY red flags requiring immediate attention
4. PROVIDE evidence-based rationale for classification

## URGENCY CLASSIFICATION RULES:

### EMERGENCY (Life-threatening - Call 911)
- Chest pain, difficulty breathing, stroke symptoms
- Severe bleeding, major trauma, accidents
- Loss of consciousness, seizures
- Severe allergic reactions, anaphylaxis
- Suicidal thoughts, severe mental health crisis
- Severe burns, poisoning, overdose

### URGENT_VISIT (Same day care needed)
- High fever (>103°F) with severe symptoms
- Moderate to severe pain (7-10/10)
- Persistent vomiting/diarrhea with dehydration
- Suspected fractures, deep cuts needing stitches
- Severe headache with neurological symptoms
- Difficulty urinating, blood in urine/stool
- Moderate accidents or injuries

### CLINIC_VISIT (Within 1-3 days)
- Moderate fever (100-103°F) lasting >3 days
- Moderate pain (4-6/10) affecting daily activities
- Persistent cough, cold symptoms worsening
- Skin infections, rashes spreading
- Minor injuries not improving
- Urinary symptoms, mild infections

### SELF_CARE (Home management appropriate)
- Mild cold, cough, sore throat
- Minor aches, low-grade fever (<100°F)
- Mild headache, fatigue
- Minor cuts, bruises
- Mild allergies, seasonal symptoms
- General wellness concerns

## SEVERITY FACTORS TO CONSIDER:
- **Onset**: Sudden onset = higher urgency
- **Duration**: Prolonged symptoms = increased concern
- **Intensity**: Severe pain/symptoms = higher priority
- **Vital signs**: Abnormal vitals = urgent
- **Age/vulnerability**: Elderly, children, pregnant = escalate
- **Mechanism**: Trauma, accidents = higher priority
- **Red flags**: Any life-threatening indicators = EMERGENCY

## SENTIMENT ANALYSIS:
Detect emotional distress, anxiety, or panic in patient description. Escalate if:
- Patient expresses fear of dying
- Describes symptoms as "worst ever"
- Multiple severe symptoms simultaneously
- Rapid deterioration mentioned

Return a JSON object with this structure:
{
  "structuredData": {
    "chiefComplaint": "string",
    "symptoms": ["array of symptoms"],
    "duration": "string",
    "onset": "sudden|gradual|chronic",
    "severity": "mild|moderate|severe|critical",
    "associatedSymptoms": ["array"],
    "relevantHistory": "string",
    "vitalSigns": "any mentioned vital signs",
    "painScale": "0-10 if mentioned",
    "emotionalState": "calm|anxious|distressed|panicked"
  },
  "urgencyLevel": "SELF_CARE|CLINIC_VISIT|URGENT_VISIT|EMERGENCY",
  "redFlags": ["array of concerning indicators"],
  "aiSummary": "Concise clinical summary with severity context",
  "rationale": "Detailed explanation for urgency classification including severity factors",
  "recommendedAction": "Specific next steps for patient"
}`;

export { groq };
