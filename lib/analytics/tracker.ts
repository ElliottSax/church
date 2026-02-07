/**
 * Analytics Tracker
 *
 * Track important events and metrics for church website
 */

import { prisma } from '@/lib/db/client';
import { logger, logError, logWarn } from '@/lib/logger';

export interface AnalyticsEvent {
  event: string;
  userId?: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}

/**
 * Track custom event
 */
export async function trackEvent(
  event: string,
  metadata?: Record<string, any>,
  userId?: string
): Promise<void> {
  // In production, send to analytics service (Google Analytics, Mixpanel, etc.)
  if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    // Send to Google Analytics
    const win = window as Window & { gtag?: (...args: unknown[]) => void };
    if (typeof window !== 'undefined' && win.gtag) {
      win.gtag('event', event, metadata);
    }
  }

  // Store in database for custom analytics
  // You could create an Analytics table in schema.prisma for this
  if (process.env.NODE_ENV === 'development') {
    logger.info('📊 Analytics Event:', { event, metadata, userId });
  }
}

/**
 * Predefined tracking events
 */
export const Analytics = {
  // Events
  event: {
    viewed: (eventId: string) =>
      trackEvent('event_viewed', { eventId }),
    rsvped: (eventId: string, userId?: string) =>
      trackEvent('event_rsvp', { eventId }, userId),
    cancelled: (eventId: string) =>
      trackEvent('event_rsvp_cancelled', { eventId }),
  },

  // Prayer Wall
  prayer: {
    viewed: () =>
      trackEvent('prayer_wall_viewed'),
    submitted: (category: string, userId?: string) =>
      trackEvent('prayer_request_submitted', { category }, userId),
    prayed: (requestId: string, userId?: string) =>
      trackEvent('prayer_prayed', { requestId }, userId),
  },

  // Donations
  donation: {
    started: (amount: number, fund: string) =>
      trackEvent('donation_started', { amount, fund }),
    completed: (amount: number, fund: string, userId?: string) =>
      trackEvent('donation_completed', { amount, fund }, userId),
    failed: (amount: number, error: string) =>
      trackEvent('donation_failed', { amount, error }),
  },

  // Sermons
  sermon: {
    viewed: (sermonId: string) =>
      trackEvent('sermon_viewed', { sermonId }),
    audioPlayed: (sermonId: string) =>
      trackEvent('sermon_audio_played', { sermonId }),
    videoPlayed: (sermonId: string) =>
      trackEvent('sermon_video_played', { sermonId }),
    downloaded: (sermonId: string) =>
      trackEvent('sermon_downloaded', { sermonId }),
  },

  // User Actions
  user: {
    registered: (userId: string) =>
      trackEvent('user_registered', {}, userId),
    loggedIn: (userId: string) =>
      trackEvent('user_logged_in', {}, userId),
    profileUpdated: (userId: string) =>
      trackEvent('user_profile_updated', {}, userId),
  },

  // Volunteer
  volunteer: {
    viewed: (opportunityId: string) =>
      trackEvent('volunteer_opportunity_viewed', { opportunityId }),
    signedUp: (opportunityId: string, userId?: string) =>
      trackEvent('volunteer_signed_up', { opportunityId }, userId),
  },

  // Newsletter
  newsletter: {
    subscribed: (email: string) =>
      trackEvent('newsletter_subscribed', { email }),
    unsubscribed: (email: string) =>
      trackEvent('newsletter_unsubscribed', { email }),
  },
};

/**
 * Get analytics summary
 */
export async function getAnalyticsSummary(days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  // Get counts from database
  const [
    totalEvents,
    totalRsvps,
    totalPrayerRequests,
    totalDonations,
    newUsers,
  ] = await Promise.all([
    prisma.event.count({
      where: { createdAt: { gte: startDate } }
    }),
    prisma.rSVP.count({
      where: { createdAt: { gte: startDate }, status: 'confirmed' }
    }),
    prisma.prayerRequest.count({
      where: { submittedAt: { gte: startDate } }
    }),
    prisma.donation.aggregate({
      where: { createdAt: { gte: startDate }, status: 'completed' },
      _sum: { amount: true },
      _count: true,
    }),
    prisma.user.count({
      where: { createdAt: { gte: startDate } }
    }),
  ]);

  return {
    period: `Last ${days} days`,
    events: {
      total: totalEvents,
      averagePerWeek: (totalEvents / days) * 7,
    },
    rsvps: {
      total: totalRsvps,
      averagePerEvent: totalEvents > 0 ? totalRsvps / totalEvents : 0,
    },
    prayerRequests: {
      total: totalPrayerRequests,
      averagePerWeek: (totalPrayerRequests / days) * 7,
    },
    donations: {
      count: totalDonations._count,
      total: totalDonations._sum.amount || 0,
      average: totalDonations._count > 0
        ? (totalDonations._sum.amount || 0) / totalDonations._count
        : 0,
    },
    users: {
      new: newUsers,
      growthRate: (newUsers / days) * 30, // Monthly growth
    },
  };
}

/**
 * Get popular content
 */
export async function getPopularContent(days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const [popularEvents, popularSermons, trendingPrayers] = await Promise.all([
    // Most RSVP'd events
    prisma.event.findMany({
      where: { createdAt: { gte: startDate } },
      orderBy: { currentAttendees: 'desc' },
      take: 5,
      select: { id: true, title: true, currentAttendees: true },
    }),

    // Most viewed sermons (if you track views)
    prisma.sermon.findMany({
      where: { createdAt: { gte: startDate } },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, title: true, speaker: true },
    }),

    // Most prayed for requests
    prisma.prayerRequest.findMany({
      where: { submittedAt: { gte: startDate }, isPublic: true, approved: true },
      orderBy: { prayerCount: 'desc' },
      take: 5,
      select: { id: true, name: true, prayerCount: true },
    }),
  ]);

  return {
    events: popularEvents,
    sermons: popularSermons,
    prayers: trendingPrayers,
  };
}
