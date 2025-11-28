import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { processTriageWithLLaMA } from '@/lib/groq';
import { triageInputSchema } from '@/lib/validators';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';
import { preprocessInput } from '@/lib/triage';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Authenticate user
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // Validate input
    const validatedData = triageInputSchema.parse(body);
    
    // Preprocess input
    const processedInput = preprocessInput(validatedData.rawInput);
    
    // Process with Groq LLaMA
    const aiResult = await processTriageWithLLaMA(processedInput);
    
    // Create triage case with AI results
    const triageCase = await prisma.triageCase.create({
      data: {
        userId: payload.userId,
        rawInput: validatedData.rawInput,
        inputType: validatedData.inputType,
        transcript: validatedData.transcript,
        structuredData: aiResult.structuredData,
        urgencyLevel: aiResult.urgencyLevel,
        aiSummary: aiResult.aiSummary,
        redFlags: aiResult.redFlags,
        rationale: aiResult.rationale,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    
    // Log AI processing
    await prisma.aIOutput.create({
      data: {
        triageCaseId: triageCase.id,
        modelUsed: 'llama-3.3-70b-versatile',
        prompt: processedInput,
        response: JSON.stringify(aiResult),
        processingTime: Date.now() - startTime,
      },
    });
    
    return NextResponse.json({
      case: triageCase,
      message: 'Triage completed successfully',
      urgency: aiResult.urgencyLevel,
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Triage error:', error);
    return NextResponse.json(
      { error: error.message || 'Triage processing failed' },
      { status: 500 }
    );
  }
}
