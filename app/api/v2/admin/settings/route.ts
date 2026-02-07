/**
 * Admin Settings API Route (v2)
 *
 * GET    /api/v2/admin/settings - Get all settings
 * POST   /api/v2/admin/settings - Update settings
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db/client';
import { apiSuccess, withErrorHandling } from '@/lib/api/response';
import { validateMethod, requireAdmin, checkRateLimit } from '@/lib/api/middleware';

/**
 * GET /api/v2/admin/settings
 */
export const GET = withErrorHandling(async (request: NextRequest) => {
  validateMethod(request, ['GET']);
  await requireAdmin(request);
  checkRateLimit(request);

  // Get all settings grouped by category
  const settings = await prisma.setting.findMany({
    orderBy: { category: 'asc' }
  });

  // Group by category
  const grouped = settings.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = {};
    }

    // Parse value based on type
    let value: string | number | boolean | unknown = setting.value;
    if (setting.type === 'number') {
      value = parseFloat(setting.value);
    } else if (setting.type === 'boolean') {
      value = setting.value === 'true';
    } else if (setting.type === 'json') {
      try {
        value = JSON.parse(setting.value);
      } catch {
        value = setting.value;
      }
    }

    acc[setting.category][setting.key] = value;
    return acc;
  }, {} as Record<string, Record<string, unknown>>);

  return apiSuccess(grouped);
});

/**
 * POST /api/v2/admin/settings
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  validateMethod(request, ['POST']);
  await requireAdmin(request);
  checkRateLimit(request, 50);

  const body = await request.json();
  const { category, settings } = body;

  if (!category || !settings) {
    throw new Error('Category and settings are required');
  }

  // Update settings
  const updates = Object.entries(settings).map(([key, value]) => {
    // Determine type
    let type = 'string';
    let stringValue = String(value);

    if (typeof value === 'number') {
      type = 'number';
    } else if (typeof value === 'boolean') {
      type = 'boolean';
    } else if (typeof value === 'object') {
      type = 'json';
      stringValue = JSON.stringify(value);
    }

    return prisma.setting.upsert({
      where: {
        key: `${category}.${key}`
      },
      create: {
        key: `${category}.${key}`,
        value: stringValue,
        category,
        type
      },
      update: {
        value: stringValue,
        type
      }
    });
  });

  await Promise.all(updates);

  return apiSuccess({ message: 'Settings updated successfully' });
});
