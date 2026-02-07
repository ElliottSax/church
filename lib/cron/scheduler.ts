/**
 * Scheduled Tasks / Cron Jobs
 *
 * Set up automated tasks that run on a schedule
 *
 * For production, use:
 * - Vercel Cron (vercel.json)
 * - GitHub Actions
 * - External cron service (like cron-job.org)
 */

import { eventService } from '@/lib/services/event.service';
import { prayerService } from '@/lib/services/prayer.service';
import { prisma } from '@/lib/db/client';
import { sendEmail } from '@/lib/email';
import siteConfig from '@/config/site-config';
import { logger, logError } from '@/lib/logger';

/**
 * Send event reminders (run daily)
 */
export async function sendEventRemindersTask() {
  logger.info('🔔 Running: Send event reminders');

  try {
    await eventService.sendEventReminders();
    logger.info('✅ Event reminders sent successfully');
  } catch (error) {
    logError('❌ Failed to send event reminders:', error);
    await notifyAdminOfError('Event Reminders', error);
  }
}

/**
 * Send weekly prayer digest (run weekly on Monday)
 */
export async function sendWeeklyPrayerDigestTask() {
  logger.info('📧 Running: Send weekly prayer digest');

  try {
    // Get all users who want prayer updates
    const users = await prisma.user.findMany({
      where: {
        // Add a field to track newsletter preferences
        // For now, get all users with verified emails
        emailVerified: { not: null },
      },
      select: { email: true },
    });

    const emails = users.map(u => u.email).filter(Boolean) as string[];

    if (emails.length > 0) {
      await prayerService.sendWeeklyDigest(emails);
      logger.info(`✅ Prayer digest sent to ${emails.length} recipients`);
    } else {
      logger.info('ℹ️  No recipients for prayer digest');
    }
  } catch (error) {
    logError('❌ Failed to send prayer digest:', error);
    await notifyAdminOfError('Prayer Digest', error);
  }
}

/**
 * Clean up old data (run weekly)
 */
export async function cleanupOldDataTask() {
  logger.info('🧹 Running: Cleanup old data');

  try {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    // Delete old cancelled RSVPs
    const deletedRSVPs = await prisma.rSVP.deleteMany({
      where: {
        status: 'cancelled',
        updatedAt: { lt: oneYearAgo },
      },
    });

    // Archive old completed events
    const archivedEvents = await prisma.event.updateMany({
      where: {
        status: 'completed',
        date: { lt: oneYearAgo },
      },
      data: {
        status: 'archived' as any, // Add 'archived' to your Event status enum
      },
    });

    logger.info(`✅ Cleanup complete: ${deletedRSVPs.count} RSVPs deleted`);
  } catch (error) {
    logError('❌ Cleanup failed:', error);
    await notifyAdminOfError('Data Cleanup', error);
  }
}

/**
 * Generate monthly reports (run monthly on 1st)
 */
export async function generateMonthlyReportsTask() {
  logger.info('📊 Running: Generate monthly reports');

  try {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    lastMonth.setDate(1);
    lastMonth.setHours(0, 0, 0, 0);

    const thisMonth = new Date(lastMonth);
    thisMonth.setMonth(thisMonth.getMonth() + 1);

    // Gather statistics
    const [eventsCount, rsvpsCount, prayersCount, donations] = await Promise.all([
      prisma.event.count({
        where: {
          createdAt: { gte: lastMonth, lt: thisMonth },
        },
      }),
      prisma.rSVP.count({
        where: {
          createdAt: { gte: lastMonth, lt: thisMonth },
          status: 'confirmed',
        },
      }),
      prisma.prayerRequest.count({
        where: {
          submittedAt: { gte: lastMonth, lt: thisMonth },
        },
      }),
      prisma.donation.aggregate({
        where: {
          createdAt: { gte: lastMonth, lt: thisMonth },
          status: 'completed',
        },
        _sum: { amount: true },
        _count: true,
      }),
    ]);

    // Send report to admins
    const adminEmails = siteConfig.admin.allowedAdminEmails;

    for (const email of adminEmails) {
      await sendMonthlyReport(email, {
        month: lastMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        eventsCount,
        rsvpsCount,
        prayersCount,
        donationsCount: donations._count,
        donationsTotal: donations._sum.amount || 0,
      });
    }

    logger.info('✅ Monthly reports sent to admins');
  } catch (error) {
    logError('❌ Failed to generate reports:', error);
    await notifyAdminOfError('Monthly Reports', error);
  }
}

/**
 * Update recurring events (run daily)
 */
export async function updateRecurringEventsTask() {
  logger.info('🔄 Running: Update recurring events');

  try {
    // Find recurring events that need new instances
    const recurringEvents = await prisma.event.findMany({
      where: {
        isRecurring: true,
        recurringEndDate: { gte: new Date() },
      },
    });

    for (const event of recurringEvents) {
      // Check if we need to generate next instance
      // This is a simplified version - you'd want more sophisticated logic
      const nextInstanceDate = calculateNextInstanceDate(event);

      if (nextInstanceDate) {
        await prisma.event.create({
          data: {
            ...event,
            id: undefined as any,
            date: nextInstanceDate,
            slug: `${event.slug}-${nextInstanceDate.getTime()}`,
            recurringParentId: event.id,
          },
        });
      }
    }

    logger.info(`✅ Updated ${recurringEvents.length} recurring events`);
  } catch (error) {
    logError('❌ Failed to update recurring events:', error);
    await notifyAdminOfError('Recurring Events', error);
  }
}

/**
 * Helper functions
 */

function calculateNextInstanceDate(event: any): Date | null {
  // Simplified - implement proper recurring date calculation
  return null;
}

async function sendMonthlyReport(email: string, stats: any) {
  const subject = `Monthly Report - ${stats.month}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
    .header { background: #667eea; color: white; padding: 30px; text-align: center; }
    .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
    .stat-box { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; }
    .stat-value { font-size: 32px; font-weight: bold; color: #667eea; }
    .stat-label { font-size: 14px; color: #666; margin-top: 5px; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0;">📊 Monthly Report</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">${stats.month}</p>
  </div>

  <div style="padding: 30px;">
    <p>Here's a summary of activity for ${stats.month}:</p>

    <div class="stat-grid">
      <div class="stat-box">
        <div class="stat-value">${stats.eventsCount}</div>
        <div class="stat-label">Events Created</div>
      </div>
      <div class="stat-box">
        <div class="stat-value">${stats.rsvpsCount}</div>
        <div class="stat-label">RSVPs</div>
      </div>
      <div class="stat-box">
        <div class="stat-value">${stats.prayersCount}</div>
        <div class="stat-label">Prayer Requests</div>
      </div>
      <div class="stat-box">
        <div class="stat-value">$${stats.donationsTotal.toFixed(0)}</div>
        <div class="stat-label">Donations (${stats.donationsCount})</div>
      </div>
    </div>

    <p style="margin-top: 30px; color: #666; font-size: 14px;">
      This is an automated monthly report from ${siteConfig.site.name}.
    </p>
  </div>
</body>
</html>
  `;

  await sendEmail({ to: email, subject, html });
}

async function notifyAdminOfError(taskName: string, error: any) {
  const adminEmails = siteConfig.admin.allowedAdminEmails;

  for (const email of adminEmails) {
    await sendEmail({
      to: email,
      subject: `Scheduled Task Failed: ${taskName}`,
      html: `
        <h2>Scheduled Task Error</h2>
        <p><strong>Task:</strong> ${taskName}</p>
        <p><strong>Error:</strong> ${error.message}</p>
        <pre>${error.stack}</pre>
      `,
    });
  }
}

/**
 * Register all scheduled tasks
 * Call this from your cron handler or scheduler
 */
export const scheduledTasks = {
  // Daily tasks
  daily: [
    sendEventRemindersTask,
    updateRecurringEventsTask,
  ],

  // Weekly tasks (run on Monday)
  weekly: [
    sendWeeklyPrayerDigestTask,
    cleanupOldDataTask,
  ],

  // Monthly tasks (run on 1st)
  monthly: [
    generateMonthlyReportsTask,
  ],
};
