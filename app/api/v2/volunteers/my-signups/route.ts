/**
 * My Volunteer Signups API Route (v2)
 *
 * GET /api/v2/volunteers/my-signups - Get current user's signups
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db/client';
import {
  apiSuccess,
  withErrorHandling,
} from '@/lib/api/response';
import {
  validateMethod,
  requireAuth,
  checkRateLimit,
} from '@/lib/api/middleware';

/**
 * GET /api/v2/volunteers/my-signups
 */
export const GET = withErrorHandling(async (request: NextRequest) => {
  validateMethod(request, ['GET']);
  checkRateLimit(request);

  const session = await requireAuth(request);
  const { searchParams } = new URL(request.url);
  const includeCompleted = searchParams.get('includeCompleted') === 'true';
  const includeCancelled = searchParams.get('includeCancelled') === 'true';

  const statusFilter: any = {};
  if (!includeCompleted) {
    statusFilter.not = 'completed';
  }
  if (!includeCancelled) {
    if (statusFilter.not) {
      statusFilter.notIn = ['completed', 'cancelled'];
      delete statusFilter.not;
    } else {
      statusFilter.not = 'cancelled';
    }
  }

  const assignments = await prisma.volunteerAssignment.findMany({
    where: {
      userId: session.user.id,
      ...(Object.keys(statusFilter).length > 0 ? { status: statusFilter } : {}),
    },
    include: {
      shift: {
        include: {
          role: true,
        }
      },
    },
    orderBy: [
      { shift: { date: 'asc' } },
      { shift: { startTime: 'asc' } },
    ]
  });

  return apiSuccess(assignments);
});
