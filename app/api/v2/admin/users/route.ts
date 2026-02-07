/**
 * Admin Users API Route (v2)
 *
 * GET  /api/v2/admin/users - Get all users with filters
 * POST /api/v2/admin/users - Create new user
 */

import { NextRequest } from 'next/server';
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
  requireAuth,
  checkRateLimit,
} from '@/lib/api/middleware';
import { usersRepository } from '@/lib/db/repositories/users.repository';

const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required'),
  phone: z.string().optional(),
  role: z.enum(['member', 'admin', 'moderator', 'volunteer']).default('member'),
});

/**
 * GET /api/v2/admin/users
 * Get all users with optional filters
 */
export const GET = withErrorHandling(async (request: NextRequest) => {
  validateMethod(request, ['GET']);
  // Uncomment when auth is enabled
  // await requireAuth(request);
  checkRateLimit(request);

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '20');
  const offset = parseInt(searchParams.get('offset') || '0');
  const role = searchParams.get('role') || undefined;
  const search = searchParams.get('search') || undefined;

  const { users, total } = await usersRepository.findAll({
    role,
    search,
    limit,
    offset,
  });

  return apiPaginated(users, Math.floor(offset / limit) + 1, limit, total);
});

/**
 * POST /api/v2/admin/users
 * Create new user
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  validateMethod(request, ['POST']);
  // Uncomment when auth is enabled
  // await requireAuth(request);
  checkRateLimit(request, 10);

  const data = await validateBody(request, createUserSchema);

  // Check if user already exists
  const existingUser = await usersRepository.findByEmail(data.email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const user = await usersRepository.create({
    email: data.email,
    name: data.name,
    phone: data.phone,
    role: data.role,
  });

  return apiCreated(user);
});
