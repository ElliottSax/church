import { NextResponse } from 'next/server';
import { incrementPrayerCount } from '@/lib/prayer-wall';
import { logger, logError, logWarn } from '@/lib/logger';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await request.json();

    // In production, get userId from session
    const effectiveUserId = userId || 'anonymous-' + Date.now();

    const newCount = await incrementPrayerCount(params.id, effectiveUserId);

    return NextResponse.json({ prayerCount: newCount });
  } catch (error) {
    logError('Error recording prayer:', error);
    return NextResponse.json(
      { error: 'Failed to record prayer' },
      { status: 500 }
    );
  }
}