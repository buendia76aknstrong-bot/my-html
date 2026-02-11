import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { ApiResponse, ApplicationFormData } from '@/types';

// GET: List all customers
export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        interviews: { orderBy: { sessionNumber: 'asc' } },
        manuscripts: { orderBy: { chapterNumber: 'asc' } },
        deliverables: true,
        feedbacks: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json<ApiResponse>({
      success: true,
      data: customers,
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: '顧客情報の取得に失敗しました' },
      { status: 500 }
    );
  }
}

// POST: Create a new customer (application)
export async function POST(request: NextRequest) {
  try {
    const body: ApplicationFormData = await request.json();
    const { name, age, email, phone, parentSituation, applicationReason } = body;

    if (!name || !email || !phone) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'お名前、メールアドレス、電話番号は必須です' },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        age,
        email,
        phone,
        parentSituation: parentSituation || null,
        applicationReason: applicationReason || null,
        status: 'applied',
      },
    });

    return NextResponse.json<ApiResponse>(
      { success: true, data: customer },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: '申込の登録に失敗しました' },
      { status: 500 }
    );
  }
}
