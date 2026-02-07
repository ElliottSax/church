/**
 * API Middleware
 *
 * Reusable middleware for API routes
 */

import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import type { ZodType } from 'zod';
import { authOptions } from '@/lib/auth';
import { apiUnauthorized, apiForbidden, apiError } from './response';

/**
 * Validate request method
 */
export function validateMethod(request: NextRequest, allowedMethods: string[]) {
  if (!allowedMethods.includes(request.method)) {
    throw new Error(`Method ${request.method} not allowed`);
  }
}

/**
 * Require authentication
 */
export async function requireAuth(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw { statusCode: 401, message: 'Authentication required' };
  }

  return session;
}

/**
 * Require admin role
 */
export async function requireAdmin(request: NextRequest) {
  const session = await requireAuth(request);

  if (session.user.role !== 'admin' && session.user.role !== 'staff') {
    throw { statusCode: 403, message: 'Admin access required' };
  }

  return session;
}

/**
 * Validate request body with Zod schema
 */
export async function validateBody<T>(request: NextRequest, schema: ZodType<T>): Promise<T> {
  try {
    const body = await request.json();
    const validated = schema.parse(body);
    return validated;
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'ZodError') {
      throw {
        statusCode: 422,
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: (error as Error & { errors: unknown }).errors,
      };
    }
    throw error;
  }
}

/**
 * Validate query parameters with Zod schema
 */
export function validateQuery<T>(request: NextRequest, schema: ZodType<T>): T {
  try {
    const { searchParams } = new URL(request.url);
    const rawParams = Object.fromEntries(searchParams.entries());
    const params: Record<string, string | number | boolean> = { ...rawParams };

    // Convert string numbers to actual numbers
    Object.keys(params).forEach(key => {
      const val = params[key];
      if (typeof val === 'string' && !isNaN(Number(val)) && val !== '') {
        params[key] = Number(val);
      }
      // Convert string booleans to actual booleans
      if (val === 'true') params[key] = true;
      if (val === 'false') params[key] = false;
    });

    const validated = schema.parse(params);
    return validated;
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'ZodError') {
      throw {
        statusCode: 422,
        message: 'Invalid query parameters',
        code: 'VALIDATION_ERROR',
        details: (error as Error & { errors: unknown }).errors,
      };
    }
    throw error;
  }
}

/**
 * Rate limiting (simple implementation)
 * For production, use a proper rate limiting solution like upstash/ratelimit
 */
const requestCounts = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  identifier: string,
  maxRequests: number = 100,
  windowMs: number = 15 * 60 * 1000
): boolean {
  const now = Date.now();
  const record = requestCounts.get(identifier);

  if (!record || now > record.resetAt) {
    requestCounts.set(identifier, {
      count: 1,
      resetAt: now + windowMs
    });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

/**
 * Get client IP address
 */
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  return ip;
}

/**
 * Apply rate limiting to request
 */
export function checkRateLimit(request: NextRequest, maxRequests: number = 100) {
  const ip = getClientIp(request);

  if (!rateLimit(ip, maxRequests)) {
    throw {
      statusCode: 429,
      message: 'Too many requests',
      code: 'RATE_LIMIT_EXCEEDED'
    };
  }
}
