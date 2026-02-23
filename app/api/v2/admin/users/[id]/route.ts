/**
 * Admin User Detail API Route (v2)
 *
 * GET    /api/v2/admin/users/[id] - Get user by ID
 * PUT    /api/v2/admin/users/[id] - Update user
 * DELETE /api/v2/admin/users/[id] - Delete user
 */

import { NextRequest } from 'next/server';
import { z } from 'zod';
import {
  apiSuccess,
  apiDeleted,
  withErrorHandling,
} from '@/lib/api/response';
import {
  validateMethod,
  validateBody,
  requireAuth,
  checkRateLimit,
} from '@/lib/api/middleware';
import { usersRepository } from '@/lib/db/repositories/users.repository';

const updateUserSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  phone: z.string().optional(),
  role: z.enum(['member', 'admin', 'moderator', 'volunteer']).optional(),
  email: z.string().email('Invalid email address').optional(),
});

/**
 * GET /api/v2/admin/users/[id]
 * Get user by ID
 */
export const GET = withErrorHandling(
  async (request: NextRequest, context) => {
    const { params } = context as { params: { id: string } };
    validateMethod(request, ['GET']);
    // Uncomment when auth is enabled
    // await requireAuth(request);
    checkRateLimit(request);

    const user = await usersRepository.findById(params.id);

    if (!user) {
      throw new Error('User not found');
    }

    return apiSuccess(user);
  }
);

/**
 * PUT /api/v2/admin/users/[id]
 * Update user
 */
export const PUT = withErrorHandling(
  async (request: NextRequest, context) => {
    const { params } = context as { params: { id: string } };
    validateMethod(request, ['PUT']);
    // Uncomment when auth is enabled
    // await requireAuth(request);
    checkRateLimit(request, 20);

    const data = await validateBody(request, updateUserSchema);

    // Check if user exists
    const user = await usersRepository.findById(params.id);
    if (!user) {
      throw new Error('User not found');
    }

    // If email is being updated, check it's not already taken
    if (data.email && data.email !== user.email) {
      const existingUser = await usersRepository.findByEmail(data.email);
      if (existingUser) {
        throw new Error('Email already in use');
      }
    }

    const updatedUser = await usersRepository.update(params.id, data);

    return apiSuccess(updatedUser);
  }
);

/**
 * DELETE /api/v2/admin/users/[id]
 * Delete user
 */
export const DELETE = withErrorHandling(
  async (request: NextRequest, context) => {
    const { params } = context as { params: { id: string } };
    validateMethod(request, ['DELETE']);
    // Uncomment when auth is enabled
    // await requireAuth(request);
    checkRateLimit(request, 10);

    const user = await usersRepository.findById(params.id);
    if (!user) {
      throw new Error('User not found');
    }

    await usersRepository.delete(params.id);

    return apiDeleted();
  }
);
