import { NextResponse } from 'next/server';
import { getPublicPrayerRequests } from '@/lib/prayer-wall';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const requests = await getPublicPrayerRequests();
    return NextResponse.json(requests);
  } catch (error) {
    console.error('Error fetching prayer requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prayer requests' },
      { status: 500 }
    );
  }
}