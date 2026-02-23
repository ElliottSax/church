/**
 * Volunteer Roles API Route (v2)
 *
 * GET  /api/v2/volunteers/roles - List volunteer roles
 * POST /api/v2/volunteers/roles - Create role (admin)
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

const createRoleSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string(),
  ministry: z.string(),
  requirements: z.array(z.string()).optional(),
  training: z.string().optional(),
  commitment: z.enum(['one-time', 'weekly', 'monthly', 'as-needed']),
  minAge: z.number().int().min(0).optional(),
  backgroundCheckRequired: z.boolean().default(false),
  skills: z.array(z.string()).optional(),
});

/**
 * GET /api/v2/volunteers/roles
 */
export const GET = withErrorHandling(async (request: NextRequest) => {
  validateMethod(request, ['GET']);
  checkRateLimit(request);

  const { searchParams } = new URL(request.url);
  const activeOnly = searchParams.get('active') !== 'false';
  const ministry = searchParams.get('ministry');

  const where: any = {};
  if (activeOnly) where.isActive = true;
  if (ministry) where.ministry = ministry;

  const roles = await prisma.volunteerRole.findMany({
    where,
    orderBy: [
      { ministry: 'asc' },
      { name: 'asc' },
    ],
    include: {
      _count: {
        select: {
          shifts: true,
        }
      }
    }
  });

  return apiSuccess(roles);
});

/**
 * POST /api/v2/volunteers/roles
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  validateMethod(request, ['POST']);
  await requireAdmin(request);
  checkRateLimit(request, 50);

  const data = await validateBody(request, createRoleSchema);

  const role = await prisma.volunteerRole.create({
    data: {
      ...data,
      requirements: data.requirements ? JSON.stringify(data.requirements) : '[]',
      skills: data.skills ? JSON.stringify(data.skills) : '[]',
      isActive: true,
    },
  });

  return apiCreated(role);
});
