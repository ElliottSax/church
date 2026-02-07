import { NextResponse } from 'next/server';
import { getPrayerWallStats } from '@/lib/prayer-wall';
import { logger, logError, logWarn } from '@/lib/logger';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // Revalidate every 5 minutes

export async function GET() {
  try {
    const stats = await getPrayerWallStats();
    return NextResponse.json(stats);
  } catch (error) {
    logError('Error fetching prayer wall stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}