import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generatePdf } from '@/lib/pdf-generator';
import type { ApiResponse, PdfGenerateRequest } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: PdfGenerateRequest = await request.json();
    const { customerId, authorName, title } = body;

    if (!customerId || !authorName) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: '顧客IDと著者名は必須です' },
        { status: 400 }
      );
    }

    // Fetch all checked manuscripts for this customer
    const manuscripts = await prisma.manuscript.findMany({
      where: {
        customerId,
        status: { in: ['checked', 'approved'] },
      },
      orderBy: { chapterNumber: 'asc' },
    });

    if (manuscripts.length === 0) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'リスクチェック済みの原稿がありません' },
        { status: 400 }
      );
    }

    // Build chapters data
    const chapters = manuscripts.map((m) => ({
      number: m.chapterNumber,
      content: m.riskCheckedContent || m.rawContent || '',
    }));

    // Generate PDF
    const pdfBuffer = await generatePdf({
      authorName,
      title,
      chapters,
    });

    // Create deliverable record
    await prisma.deliverable.create({
      data: {
        customerId,
        deliveredAt: new Date(),
      },
    });

    // Update customer status
    await prisma.customer.update({
      where: { id: customerId },
      data: { status: 'delivered' },
    });

    // Return PDF as download
    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(authorName)}_jibunshi.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'PDF生成中にエラーが発生しました' },
      { status: 500 }
    );
  }
}
