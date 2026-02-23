/**
 * Prayer Request by ID API Route (v2)
 *
 * GET    /api/v2/prayer-requests/[id] - Get single prayer request
 * PATCH  /api/v2/prayer-requests/[id] - Update prayer request (admin)
 * DELETE /api/v2/prayer-requests/[id] - Delete prayer request (admin)
 */

import { NextRequest } from 'next/server';
import { prayerRepository } from '@/lib/db/repositories/prayer.repository';
import { apiSuccess, apiError, withErrorHandling, RouteContext } from '@/lib/api/response';
import { validateMethod } from '@/lib/api/middleware';
import { z } from 'zod';

/**
 * GET /api/v2/prayer-requests/[id]
 */
export const GET = withErrorHandling(async (request: NextRequest, context) => {
  const { params } = context as { params: { id: string } };
  validateMethod(request, ['GET']);

  const prayerRequest = await prayerRepository.findById(params.id);

  if (!prayerRequest) {
    return apiError('Prayer request not found', 'NOT_FOUND', null, 404);
  }

  return apiSuccess(prayerRequest);
});

/**
 * PATCH /api/v2/prayer-requests/[id]
 * Update prayer request status (approve/decline)
 */
export const PATCH = withErrorHandling(async (request: NextRequest, context) => {
  const { params } = context as { params: { id: string } };
  validateMethod(request, ['PATCH']);

  // Validate request body
  const bodySchema = z.object({
    approved: z.boolean().optional(),
    isPublic: z.boolean().optional(),
    category: z.enum(['healing', 'guidance', 'thanksgiving', 'salvation', 'provision', 'other']).optional(),
  });

  const body = await request.json();
  const validatedData = bodySchema.parse(body);

  // Check if prayer request exists
  const existingRequest = await prayerRepository.findById(params.id);
  if (!existingRequest) {
    return apiError('Prayer request not found', 'NOT_FOUND', null, 404);
  }

  // Update the prayer request
  const updated = await prayerRepository.update(params.id, validatedData);

  return apiSuccess({
    ...updated,
    message: validatedData.approved !== undefined
      ? (validatedData.approved ? 'Prayer request approved' : 'Prayer request declined')
      : 'Prayer request updated'
  });
});

/**
 * DELETE /api/v2/prayer-requests/[id]
 * Delete prayer request (admin only)
 */
export const DELETE = withErrorHandling(async (request: NextRequest, context) => {
  const { params } = context as { params: { id: string } };
  validateMethod(request, ['DELETE']);

  // Check if prayer request exists
  const existingRequest = await prayerRepository.findById(params.id);
  if (!existingRequest) {
    return apiError('Prayer request not found', 'NOT_FOUND', null, 404);
  }

  // Delete the prayer request
  await prayerRepository.delete(params.id);

  return apiSuccess({ message: 'Prayer request deleted successfully' });
});
