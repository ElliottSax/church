/**
 * Single Event API Route (v2)
 *
 * GET    /api/v2/events/[id] - Get event by ID
 * PATCH  /api/v2/events/[id] - Update event (admin only)
 * DELETE /api/v2/events/[id] - Delete event (admin only)
 */

import { NextRequest } from 'next/server';
import { eventsRepository } from '@/lib/db/repositories/events.repository';
import { updateEventSchema } from '@/lib/validations/event.schema';
import {
  apiSuccess,
  apiNotFound,
  apiNoContent,
  withErrorHandling,
} from '@/lib/api/response';
import {
  validateMethod,
  validateBody,
  requireAdmin,
  checkRateLimit,
} from '@/lib/api/middleware';

/**
 * GET /api/v2/events/[id]
 */
export const GET = withErrorHandling(async (
  request: NextRequest,
  context
) => {
  const { params } = context as { params: { id: string } };
  validateMethod(request, ['GET']);
  checkRateLimit(request);

  const event = await eventsRepository.findById(params.id);

  if (!event) {
    return apiNotFound('Event');
  }

  return apiSuccess(event);
});

/**
 * PATCH /api/v2/events/[id]
 */
export const PATCH = withErrorHandling(async (
  request: NextRequest,
  context
) => {
  const { params } = context as { params: { id: string } };
  validateMethod(request, ['PATCH']);
  await requireAdmin(request);
  checkRateLimit(request, 50);

  // Check if event exists
  const existing = await eventsRepository.findById(params.id);
  if (!existing) {
    return apiNotFound('Event');
  }

  // Validate request body
  const data = await validateBody(request, updateEventSchema);

  // Update event
  const updated = await eventsRepository.update(params.id, {
    ...data,
    date: data.date ? new Date(data.date) : undefined,
    endDate: data.endDate ? new Date(data.endDate) : undefined,
    rsvpDeadline: data.rsvpDeadline ? new Date(data.rsvpDeadline) : undefined,
    recurringEndDate: data.recurringEndDate ? new Date(data.recurringEndDate) : undefined,
    tags: data.tags ? JSON.stringify(data.tags) : undefined,
  });

  return apiSuccess(updated);
});

/**
 * DELETE /api/v2/events/[id]
 */
export const DELETE = withErrorHandling(async (
  request: NextRequest,
  context
) => {
  const { params } = context as { params: { id: string } };
  validateMethod(request, ['DELETE']);
  await requireAdmin(request);
  checkRateLimit(request, 50);

  // Check if event exists
  const existing = await eventsRepository.findById(params.id);
  if (!existing) {
    return apiNotFound('Event');
  }

  // Delete event
  await eventsRepository.delete(params.id);

  return apiNoContent();
});
