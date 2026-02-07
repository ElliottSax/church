/**
 * Prayer Requests API Route (v2)
 *
 * GET  /api/v2/prayer-requests - Get all prayer requests
 * POST /api/v2/prayer-requests - Submit new prayer request
 */

import { NextRequest } from 'next/server';
import { prayerRepository } from '@/lib/db/repositories/prayer.repository';
import { createPrayerRequestSchema, prayerQuerySchema } from '@/lib/validations/prayer.schema';
import { apiSuccess, apiCreated, apiPaginated, withErrorHandling } from '@/lib/api/response';
import { validateMethod, validateBody, validateQuery, checkRateLimit } from '@/lib/api/middleware';
import siteConfig from '@/config/site-config';

/**
 * GET /api/v2/prayer-requests
 */
export const GET = withErrorHandling(async (request: NextRequest) => {
  validateMethod(request, ['GET']);
  checkRateLimit(request);

  // Validate query parameters
  const query = validateQuery(request, prayerQuerySchema);

  // Fetch prayer requests (public only, unless admin)
  const requests = await prayerRepository.findPublic({
    category: query.category,
    limit: query.limit,
    offset: query.offset,
  });

  const total = requests.length;

  return apiPaginated(requests, query.offset / query.limit + 1, query.limit, total);
});

/**
 * POST /api/v2/prayer-requests
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  validateMethod(request, ['POST']);
  checkRateLimit(request, 20); // Stricter rate limit for submissions

  // Validate request body
  const data = await validateBody(request, createPrayerRequestSchema);

  // Check if approval is required
  const requireApproval = siteConfig.prayerWall.requireApproval;

  // Create prayer request
  const prayerRequest = await prayerRepository.create({
    name: data.isAnonymous ? 'Anonymous' : data.name,
    request: data.request,
    category: data.category,
    isAnonymous: data.isAnonymous,
    isPublic: data.isPublic,
    approved: !requireApproval, // Auto-approve if not required
    userEmail: data.userEmail,
  });

  return apiCreated({
    ...prayerRequest,
    message: requireApproval
      ? 'Your prayer request has been submitted and is pending approval.'
      : 'Your prayer request has been posted to the prayer wall.'
  });
});
