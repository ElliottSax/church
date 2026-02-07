/**
 * Cron Job Endpoint
 *
 * This endpoint is called by external cron services or Vercel Cron
 * to run scheduled tasks
 *
 * Vercel Cron configuration (add to vercel.json):
 * {
 *   "crons": [
 *     {
 *       "path": "/api/cron?task=daily",
 *       "schedule": "0 8 * * *"
 *     },
 *     {
 *       "path": "/api/cron?task=weekly",
 *       "schedule": "0 9 * * 1"
 *     },
 *     {
 *       "path": "/api/cron?task=monthly",
 *       "schedule": "0 10 1 * *"
 *     }
 *   ]
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import { scheduledTasks } from '@/lib/cron/scheduler';
import { logger, logError } from '@/lib/logger';

export async function GET(request: NextRequest) {
  // Verify authorization (Vercel Cron sends a secret header)
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET || 'your-secret-here';

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const task = searchParams.get('task');

  logger.info(`🕐 Cron job triggered: ${task}`);

  try {
    switch (task) {
      case 'daily':
        for (const fn of scheduledTasks.daily) {
          await fn();
        }
        break;

      case 'weekly':
        for (const fn of scheduledTasks.weekly) {
          await fn();
        }
        break;

      case 'monthly':
        for (const fn of scheduledTasks.monthly) {
          await fn();
        }
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid task' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      task,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    logError('Cron job failed', error, { task });
    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        success: false,
        task,
        error: message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
