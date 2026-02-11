import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { transcribeAudio } from '@/lib/whisper';
import type { ApiResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const customerId = formData.get('customerId') as string;
    const sessionNumber = parseInt(formData.get('sessionNumber') as string, 10);
    const audioFile = formData.get('audioFile') as File | null;
    const manualText = formData.get('manualText') as string | null;

    if (!customerId || !sessionNumber) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: '顧客IDとセッション番号は必須です' },
        { status: 400 }
      );
    }

    let transcription: string;

    if (manualText) {
      // MVP: manual text input
      transcription = manualText;
    } else if (audioFile) {
      // Whisper API transcription
      transcription = await transcribeAudio(audioFile);
    } else {
      return NextResponse.json<ApiResponse>(
        { success: false, error: '音声ファイルまたはテキストが必要です' },
        { status: 400 }
      );
    }

    // Upsert interview record
    const existing = await prisma.interview.findFirst({
      where: { customerId, sessionNumber },
    });

    let interview;
    if (existing) {
      interview = await prisma.interview.update({
        where: { id: existing.id },
        data: {
          transcription,
          completedAt: new Date(),
          status: 'completed',
        },
      });
    } else {
      interview = await prisma.interview.create({
        data: {
          customerId,
          sessionNumber,
          transcription,
          completedAt: new Date(),
          status: 'completed',
        },
      });
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: interview,
    });
  } catch (error) {
    console.error('Transcription error:', error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: '文字起こし処理中にエラーが発生しました' },
      { status: 500 }
    );
  }
}
