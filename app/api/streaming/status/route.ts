import { NextResponse } from 'next/server';
import { checkStreamStatus } from '@/lib/streaming';
import { logger, logError, logWarn } from '@/lib/logger';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const status = await checkStreamStatus();
    return NextResponse.json(status);
  } catch (error) {
    logError('Error checking stream status:', error);
    return NextResponse.json(
      { isLive: false, platform: 'none', error: 'Failed to check stream status' },
      { status: 500 }
    );
  }
}