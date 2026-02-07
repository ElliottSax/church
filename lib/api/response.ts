/**
 * Standardized API Response Utilities
 *
 * Provides consistent response format for all API routes
 */

import { NextRequest, NextResponse } from 'next/server';
import { logger, logError, logWarn } from '@/lib/logger';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

/**
 * Success response
 */
export function apiSuccess<T>(data: T, meta?: ApiResponse['meta'], status: number = 200) {
  const response: ApiResponse<T> = {
    success: true,
    data,
  };

  if (meta) {
    response.meta = meta;
  }

  return NextResponse.json(response, { status });
}

/**
 * Error response
 */
export function apiError(
  message: string,
  code?: string,
  details?: unknown,
  status: number = 400
) {
  const response: ApiResponse = {
    success: false,
    error: {
      message,
      code,
      details,
    },
  };

  return NextResponse.json(response, { status });
}

/**
 * Validation error
 */
export function apiValidationError(errors: unknown) {
  return apiError('Validation failed', 'VALIDATION_ERROR', errors, 422);
}

/**
 * Not found error
 */
export function apiNotFound(resource: string = 'Resource') {
  return apiError(`${resource} not found`, 'NOT_FOUND', null, 404);
}

/**
 * Bad request error
 */
export function apiBadRequest(message: string = 'Bad request') {
  return apiError(message, 'BAD_REQUEST', null, 400);
}

/**
 * Unauthorized error
 */
export function apiUnauthorized(message: string = 'Unauthorized') {
  return apiError(message, 'UNAUTHORIZED', null, 401);
}

/**
 * Forbidden error
 */
export function apiForbidden(message: string = 'Forbidden') {
  return apiError(message, 'FORBIDDEN', null, 403);
}

/**
 * Server error
 */
export function apiServerError(message: string = 'Internal server error', details?: unknown) {
  // Log the error details for debugging
  if (process.env.NODE_ENV === 'development') {
    logError('Server Error:', message, details);
  }

  return apiError(
    process.env.NODE_ENV === 'development' ? message : 'Internal server error',
    'SERVER_ERROR',
    process.env.NODE_ENV === 'development' ? details : undefined,
    500
  );
}

/**
 * Paginated response
 */
export function apiPaginated<T>(
  data: T[],
  page: number,
  limit: number,
  total: number,
  status: number = 200
) {
  return apiSuccess(
    data,
    {
      page,
      limit,
      total,
    },
    status
  );
}

/**
 * Created response
 */
export function apiCreated<T>(data: T) {
  return apiSuccess(data, undefined, 201);
}

/**
 * No content response
 */
export function apiNoContent() {
  return new NextResponse(null, { status: 204 });
}

/**
 * Deleted response
 */
export function apiDeleted() {
  return apiSuccess({ message: 'Resource deleted successfully' }, undefined, 200);
}

/**
 * Handle async API route with error handling
 */
export function withErrorHandling(
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    try {
      return await handler(request);
    } catch (error: unknown) {
      logError('API Error:', error);

      const err = error as Record<string, unknown>;

      // Handle Prisma errors
      if (err.code === 'P2002') {
        return apiError('A record with this value already exists', 'DUPLICATE_ERROR', null, 409);
      }

      if (err.code === 'P2025') {
        return apiNotFound();
      }

      // Handle validation errors
      if (error instanceof Error && error.name === 'ZodError') {
        return apiValidationError((err as { errors: unknown }).errors);
      }

      // Handle custom errors
      if (typeof err.statusCode === 'number') {
        return apiError(
          String(err.message),
          String(err.code ?? ''),
          err.details,
          err.statusCode,
        );
      }

      // Default server error
      const message = error instanceof Error ? error.message : 'Unknown error';
      return apiServerError(message, error);
    }
  };
}
