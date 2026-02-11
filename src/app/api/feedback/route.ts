import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { ApiResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerId,
      overallSatisfaction,
      accuracy,
      readability,
      interviewExperience,
      nps,
      improvements,
      fairPrice,
      desiredFeatures,
    } = body;

    if (!customerId) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: '顧客IDは必須です' },
        { status: 400 }
      );
    }

    const feedback = await prisma.feedback.create({
      data: {
        customerId,
        overallSatisfaction,
        accuracy,
        readability,
        interviewExperience,
        nps,
        improvements,
        fairPrice,
        desiredFeatures,
      },
    });

    return NextResponse.json<ApiResponse>(
      { success: true, data: feedback },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating feedback:', error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'フィードバックの登録に失敗しました' },
      { status: 500 }
    );
  }
}
