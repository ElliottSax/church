import { NextResponse } from 'next/server';
import { getMemberStats } from '@/lib/members';
import { getEventStats } from '@/lib/events';
import { getPrayerWallStats } from '@/lib/prayer-wall';
import { getVolunteerStats } from '@/lib/volunteers';
import { logger, logError, logWarn } from '@/lib/logger';

export async function GET() {
  try {
    // Note: Auth is disabled for static deployment
    // In production, implement proper admin authentication

    // Fetch all stats in parallel
    const [memberStats, eventStats, prayerStats, volunteerStats] = await Promise.all([
      getMemberStats(),
      getEventStats(),
      getPrayerWallStats(),
      getVolunteerStats(),
    ]);

    // Mock donation stats (would come from Stripe in production)
    const donationStats = {
      monthTotal: 12500,
      yearTotal: 145000,
      averageDonation: 125,
    };

    // Mock content stats (would come from Sanity in production)
    const contentStats = {
      sermons: 52,
      articles: 24,
      testimonies: 18,
    };

    return NextResponse.json({
      members: {
        total: memberStats.total,
        newThisMonth: memberStats.newThisMonth,
        active: memberStats.members,
      },
      events: {
        upcoming: eventStats.upcomingEvents,
        totalRsvps: eventStats.totalRsvps,
        thisWeek: 3, // Would calculate from events
      },
      donations: donationStats,
      content: contentStats,
      engagement: {
        prayerRequests: prayerStats.totalRequests,
        volunteers: volunteerStats.activeVolunteers,
        smallGroups: 8, // Would come from small groups data
      },
    });
  } catch (error) {
    logError('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}