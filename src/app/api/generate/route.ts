import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateChapter } from '@/lib/claude';
import { buildWritingPrompt } from '@/prompts/writing-prompt';
import type { ApiResponse, GenerateRequest } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    const { customerId, chapterNumber, transcriptions } = body;

    if (!customerId || !chapterNumber || !transcriptions?.length) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: '顧客ID、章番号、文字起こしデータは必須です',
        },
        { status: 400 }
      );
    }

    if (chapterNumber < 1 || chapterNumber > 5) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: '章番号は1〜5の範囲で指定してください' },
        { status: 400 }
      );
    }

    // Build prompt and call Claude API
    const prompt = buildWritingPrompt(chapterNumber, transcriptions);
    const generatedContent = await generateChapter(prompt);

    // Upsert manuscript
    const existing = await prisma.manuscript.findFirst({
      where: { customerId, chapterNumber },
    });

    let manuscript;
    if (existing) {
      manuscript = await prisma.manuscript.update({
        where: { id: existing.id },
        data: {
          rawContent: generatedContent,
          status: 'draft',
        },
      });
    } else {
      manuscript = await prisma.manuscript.create({
        data: {
          customerId,
          chapterNumber,
          rawContent: generatedContent,
          status: 'draft',
        },
      });
    }

    // Update customer status
    await prisma.customer.update({
      where: { id: customerId },
      data: { status: 'writing' },
    });

    return NextResponse.json<ApiResponse>({
      success: true,
      data: manuscript,
    });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: '原稿生成中にエラーが発生しました' },
      { status: 500 }
    );
  }
}
