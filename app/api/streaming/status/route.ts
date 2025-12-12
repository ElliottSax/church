import { NextResponse } from 'next/server';
import { checkStreamStatus } from '@/lib/streaming';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every minute

export async function GET() {
  try {
    const status = await checkStreamStatus();
    return NextResponse.json(status);
  } catch (error) {
    console.error('Error checking stream status:', error);
    return NextResponse.json(
      { isLive: false, platform: 'none', error: 'Failed to check stream status' },
      { status: 500 }
    );
  }
}