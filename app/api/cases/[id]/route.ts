import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';
import { updateCaseSchema } from '@/lib/validators';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    // Fetch case
    const triageCase = await prisma.triageCase.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            dateOfBirth: true,
          },
        },
        aiOutputs: true,
        notifications: true,
      },
    });
    
    if (!triageCase) {
      return NextResponse.json(
        { error: 'Case not found' },
        { status: 404 }
      );
    }
    
    // Check authorization
    if (payload.role === 'PATIENT' && triageCase.userId !== payload.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    return NextResponse.json({ case: triageCase });
    
  } catch (error: any) {
    console.error('Fetch case error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch case' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    // Only staff can update cases
    if (payload.role === 'PATIENT') {
      return NextResponse.json(
        { error: 'Unauthorized - staff access required' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const validatedData = updateCaseSchema.parse(body);
    
    // Update case
    const updatedCase = await prisma.triageCase.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        resolvedAt: validatedData.status === 'RESOLVED' ? new Date() : undefined,
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
    
    return NextResponse.json({ case: updatedCase });
    
  } catch (error: any) {
    console.error('Update case error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update case' },
      { status: 500 }
    );
  }
}
