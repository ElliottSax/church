/**
 * Volunteer Shifts API Route (v2)
 *
 * GET  /api/v2/volunteers/shifts - List volunteer shifts
 * POST /api/v2/volunteers/shifts - Create shift (admin)
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db/client';
import { z } from 'zod';
import {
  apiSuccess,
  apiCreated,
  withErrorHandling,
} from '@/lib/api/response';
import {
  validateMethod,
  validateBody,
  requireAdmin,
  checkRateLimit,
} from '@/lib/api/middleware';

const createShiftSchema = z.object({
  roleId: z.string(),
  eventId: z.string().optional(),
  title: z.string().min(3).max(200),
  description: z.string().optional(),
  date: z.string().datetime(),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  location: z.string(),
  spotsNeeded: z.number().int().positive(),
  notes: z.string().optional(),
});

/**
 * GET /api/v2/volunteers/shifts
 */
export const GET = withErrorHandling(async (request: NextRequest) => {
  validateMethod(request, ['GET']);
  checkRateLimit(request);

  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const roleId = searchParams.get('roleId');
  const status = searchParams.get('status');
  const view = searchParams.get('view') || 'week';

  // Build date range based on view
  let dateFilter: any = {};

  if (startDate && endDate) {
    dateFilter = {
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      }
    };
  } else if (startDate) {
    const start = new Date(startDate);
    const end = new Date(start);

    if (view === 'week') {
      end.setDate(end.getDate() + 7);
    } else if (view === 'month') {
      end.setMonth(end.getMonth() + 1);
    } else {
      end.setDate(end.getDate() + 30);
    }

    dateFilter = {
      date: {
        gte: start,
        lt: end,
      }
    };
  }

  const where: any = {
    ...dateFilter,
  };

  if (roleId) {
    where.roleId = roleId;
  }

  if (status) {
    where.status = status;
  }

  const shifts = await prisma.volunteerShift.findMany({
    where,
    orderBy: [
      { date: 'asc' },
      { startTime: 'asc' },
    ],
    include: {
      role: true,
      volunteers: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
            }
          }
        }
      },
      _count: {
        select: { volunteers: true }
      }
    }
  });

  // Transform the data to match the component's expectations
  const transformedShifts = shifts.map(shift => ({
    id: shift.id,
    roleId: shift.roleId,
    eventId: shift.eventId,
    title: shift.title,
    description: shift.description,
    date: shift.date,
    startTime: shift.startTime,
    endTime: shift.endTime,
    location: shift.location,
    spotsNeeded: shift.spotsNeeded,
    spotsFilled: shift._count.volunteers,
    volunteers: shift.volunteers.map(v => ({
      id: v.id,
      volunteerId: v.userId,
      volunteerName: v.user?.name || v.name || 'Anonymous',
      shiftId: shift.id,
      roleId: shift.roleId,
      status: v.status,
      checkedIn: v.checkedIn,
      checkedInTime: v.checkedInTime,
      checkedOutTime: v.checkedOutTime,
      notes: v.notes,
      createdAt: v.createdAt,
      updatedAt: v.updatedAt,
    })),
    status: shift.status,
    notes: shift.notes,
    reminderSent: shift.reminderSent,
    createdAt: shift.createdAt,
    updatedAt: shift.updatedAt,
  }));

  return apiSuccess(transformedShifts);
});

/**
 * POST /api/v2/volunteers/shifts
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  validateMethod(request, ['POST']);
  await requireAdmin(request);
  checkRateLimit(request, 50);

  const data = await validateBody(request, createShiftSchema);

  const shift = await prisma.volunteerShift.create({
    data: {
      ...data,
      date: new Date(data.date),
      status: 'open',
      spotsFilled: 0,
      reminderSent: false,
    },
    include: {
      role: true,
      volunteers: true,
    }
  });

  return apiCreated(shift);
});
