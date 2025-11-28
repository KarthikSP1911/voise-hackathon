import { UrgencyLevel } from '@prisma/client';

/**
 * Pre-process patient input before sending to AI
 */
export function preprocessInput(input: string): string {
  // TODO: Implement input cleaning and normalization
  // - Remove excessive whitespace
  // - Fix common typos
  // - Normalize medical terms
  return input.trim();
}

/**
 * Validate urgency level classification
 */
export function isValidUrgencyLevel(level: string): level is UrgencyLevel {
  return ['SELF_CARE', 'CLINIC_VISIT', 'URGENT_VISIT', 'EMERGENCY'].includes(level);
}

/**
 * Get urgency level priority (for sorting)
 */
export function getUrgencyPriority(level: UrgencyLevel): number {
  const priorities = {
    EMERGENCY: 4,
    URGENT_VISIT: 3,
    CLINIC_VISIT: 2,
    SELF_CARE: 1,
  };
  return priorities[level] || 0;
}

/**
 * Detect potential red flags in symptoms
 */
export function detectRedFlags(symptoms: string[]): string[] {
  // TODO: Implement red flag detection logic
  // This is a placeholder - actual implementation should be more sophisticated
  const redFlagKeywords = [
    'chest pain',
    'difficulty breathing',
    'severe bleeding',
    'unconscious',
    'stroke',
    'heart attack',
    'suicide',
    'severe headache',
    'confusion',
  ];
  
  const detectedFlags: string[] = [];
  const lowerSymptoms = symptoms.map(s => s.toLowerCase());
  
  for (const keyword of redFlagKeywords) {
    if (lowerSymptoms.some(s => s.includes(keyword))) {
      detectedFlags.push(keyword);
    }
  }
  
  return detectedFlags;
}

/**
 * Generate follow-up recommendations based on urgency
 */
export function generateFollowUpRecommendations(urgency: UrgencyLevel): string {
  const recommendations = {
    SELF_CARE: 'Monitor your symptoms. If they worsen, contact your healthcare provider.',
    CLINIC_VISIT: 'Schedule an appointment with your primary care provider within the next few days.',
    URGENT_VISIT: 'Visit an urgent care clinic or your doctor today.',
    EMERGENCY: 'Seek immediate emergency care. Call 911 or go to the nearest emergency room.',
  };
  
  return recommendations[urgency];
}
