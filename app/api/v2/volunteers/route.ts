/**
 * Volunteer Opportunities API Route (v2)
 *
 * GET  /api/v2/volunteers - List volunteer opportunities
 * POST /api/v2/volunteers - Create opportunity (admin)
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db/client';
import { z } from 'zod';
import {
  apiSuccess,
  apiCreated,
  apiPaginated,
  withErrorHandling,
} from '@/lib/api/response';
import {
  validateMethod,
  validateBody,
  requireAdmin,
  checkRateLimit,
} from '@/lib/api/middleware';

const createVolunteerOpportunitySchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/),
  category: z.string(),
  description: z.string().min(10),
  commitment: z.string(),
  requirements: z.string().optional(),
  contactPerson: z.string(),
  contactEmail: z.string().email(),
  active: z.boolean().default(true),
  featured: z.boolean().default(false),
});

/**
 * GET /api/v2/volunteers
 */
export const GET = withErrorHandling(async (request: NextRequest) => {
  validateMethod(request, ['GET']);
  checkRateLimit(request);

  const { searchParams } = new URL(request.url);
  const activeOnly = searchParams.get('active') !== 'false';
  const featured = searchParams.get('featured') === 'true';
  const limit = parseInt(searchParams.get('limit') || '20');
  const offset = parseInt(searchParams.get('offset') || '0');

  const where: any = {};
  if (activeOnly) where.active = true;
  if (featured) where.featured = true;

  const opportunities = await prisma.volunteerOpportunity.findMany({
    where,
    orderBy: [
      { featured: 'desc' },
      { createdAt: 'desc' },
    ],
    take: limit,
    skip: offset,
    include: {
      _count: {
        select: { signups: true }
      }
    }
  });

  const total = await prisma.volunteerOpportunity.count({ where });

  return apiPaginated(opportunities, offset / limit + 1, limit, total);
});

/**
 * POST /api/v2/volunteers
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  validateMethod(request, ['POST']);
  await requireAdmin(request);
  checkRateLimit(request, 50);

  const data = await validateBody(request, createVolunteerOpportunitySchema);

  const opportunity = await prisma.volunteerOpportunity.create({
    data,
  });

  return apiCreated(opportunity);
});
