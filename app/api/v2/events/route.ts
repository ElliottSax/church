/**
 * Events API Route (v2)
 *
 * Improved API with database support, validation, and error handling
 *
 * GET    /api/v2/events - Get all events (with filters)
 * POST   /api/v2/events - Create new event (admin only)
 */

import { NextRequest } from 'next/server';
import { eventsRepository } from '@/lib/db/repositories/events.repository';
import { createEventSchema, eventQuerySchema } from '@/lib/validations/event.schema';
import {
  apiSuccess,
  apiCreated,
  apiPaginated,
  withErrorHandling,
} from '@/lib/api/response';
import {
  validateMethod,
  validateBody,
  validateQuery,
  requireAdmin,
  checkRateLimit,
} from '@/lib/api/middleware';

/**
 * GET /api/v2/events
 * Get all events with optional filters
 */
export const GET = withErrorHandling(async (request: NextRequest) => {
  validateMethod(request, ['GET']);
  checkRateLimit(request);

  // Validate and parse query parameters
  const query = validateQuery(request, eventQuerySchema);

  // Fetch events from database
  const events = await eventsRepository.findAll({
    status: query.status,
    category: query.category,
    featured: query.featured,
    startDate: query.startDate ? new Date(query.startDate) : undefined,
    endDate: query.endDate ? new Date(query.endDate) : undefined,
    limit: query.limit,
    offset: query.offset,
  });

  // Get total count for pagination
  const total = events.length; // In production, do a separate count query

  return apiPaginated(events, query.offset / query.limit + 1, query.limit, total);
});

/**
 * POST /api/v2/events
 * Create a new event (admin only)
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  validateMethod(request, ['POST']);
  await requireAdmin(request);
  checkRateLimit(request, 50);

  // Validate request body
  const data = await validateBody(request, createEventSchema);

  // Create event in database
  const event = await eventsRepository.create({
    ...data,
    date: new Date(data.date),
    endDate: data.endDate ? new Date(data.endDate) : undefined,
    rsvpDeadline: data.rsvpDeadline ? new Date(data.rsvpDeadline) : undefined,
    recurringEndDate: data.recurringEndDate ? new Date(data.recurringEndDate) : undefined,
  });

  return apiCreated(event);
});
