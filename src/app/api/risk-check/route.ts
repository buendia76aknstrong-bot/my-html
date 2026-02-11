import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { performRiskCheck } from '@/lib/claude';
import { buildRiskCheckPrompt } from '@/prompts/risk-check-prompt';
import type { ApiResponse, RiskCheckRequest, RiskCheckResult } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: RiskCheckRequest = await request.json();
    const { manuscriptId, content } = body;

    if (!manuscriptId || !content) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: '原稿IDと本文は必須です' },
        { status: 400 }
      );
    }

    // Build prompt and call Claude API
    const prompt = buildRiskCheckPrompt(content);
    const response = await performRiskCheck(prompt);

    // Parse the JSON response from Claude
    let riskCheckResult: RiskCheckResult;
    try {
      // Extract JSON from response (Claude may wrap it in markdown code blocks)
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      riskCheckResult = JSON.parse(jsonMatch[0]);
    } catch {
      console.error('Failed to parse risk check response:', response);
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'リスクチェック結果の解析に失敗しました' },
        { status: 500 }
      );
    }

    // Update manuscript with risk-checked content
    const manuscript = await prisma.manuscript.update({
      where: { id: manuscriptId },
      data: {
        riskCheckedContent: riskCheckResult.correctedContent,
        riskCheckLog: JSON.parse(JSON.stringify(riskCheckResult.log)),
        status: 'checked',
      },
    });

    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        manuscript,
        riskCheckLog: riskCheckResult.log,
      },
    });
  } catch (error) {
    console.error('Risk check error:', error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'リスクチェック中にエラーが発生しました' },
      { status: 500 }
    );
  }
}
