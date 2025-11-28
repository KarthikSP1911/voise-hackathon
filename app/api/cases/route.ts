import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';
import { getUrgencyPriority } from '@/lib/triage';

export async function GET(request: NextRequest) {
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
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const urgency = searchParams.get('urgency');
    const userId = searchParams.get('userId');
    
    // Build query
    const where: any = {};
    
    // Patients can only see their own cases
    if (payload.role === 'PATIENT') {
      where.userId = payload.userId;
    } else if (userId) {
      // Staff can filter by user
      where.userId = userId;
    }
    
    if (status) {
      where.status = status;
    }
    
    if (urgency) {
      where.urgencyLevel = urgency;
    }
    
    // Fetch cases
    const cases = await prisma.triageCase.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: [
        { createdAt: 'desc' },
      ],
    });
    
    // Sort by urgency priority if staff
    if (payload.role !== 'PATIENT') {
      cases.sort((a, b) => {
        const priorityA = a.urgencyLevel ? getUrgencyPriority(a.urgencyLevel) : 0;
        const priorityB = b.urgencyLevel ? getUrgencyPriority(b.urgencyLevel) : 0;
        return priorityB - priorityA;
      });
    }
    
    return NextResponse.json({ cases });
    
  } catch (error: any) {
    console.error('Fetch cases error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch cases' },
      { status: 500 }
    );
  }
}
