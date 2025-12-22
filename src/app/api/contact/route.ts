import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Contact API] Unexpected error:', error);
    return NextResponse.json({ error });
  }
}
