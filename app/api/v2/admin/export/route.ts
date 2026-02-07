/**
 * Data Export API Route (v2)
 *
 * GET /api/v2/admin/export?type=events - Export data to CSV/JSON
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import {
  validateMethod,
  requireAdmin,
  checkRateLimit,
} from '@/lib/api/middleware';

/**
 * GET /api/v2/admin/export
 * Export data in various formats
 */
export async function GET(request: NextRequest) {
  validateMethod(request, ['GET']);
  await requireAdmin(request);
  checkRateLimit(request, 10);

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'events';
  const format = searchParams.get('format') || 'csv';

  let data: any[];
  let filename: string;

  switch (type) {
    case 'events':
      data = await prisma.event.findMany({
        orderBy: { date: 'desc' },
      });
      filename = `events-${new Date().toISOString().split('T')[0]}.${format}`;
      break;

    case 'rsvps':
      data = await prisma.rSVP.findMany({
        include: { event: true },
        orderBy: { createdAt: 'desc' },
      });
      filename = `rsvps-${new Date().toISOString().split('T')[0]}.${format}`;
      break;

    case 'prayers':
      data = await prisma.prayerRequest.findMany({
        orderBy: { submittedAt: 'desc' },
      });
      filename = `prayers-${new Date().toISOString().split('T')[0]}.${format}`;
      break;

    case 'donations':
      data = await prisma.donation.findMany({
        where: { status: 'completed' },
        orderBy: { createdAt: 'desc' },
      });
      filename = `donations-${new Date().toISOString().split('T')[0]}.${format}`;
      break;

    case 'volunteers':
      data = await prisma.volunteerSignup.findMany({
        include: { opportunity: true },
        orderBy: { createdAt: 'desc' },
      });
      filename = `volunteers-${new Date().toISOString().split('T')[0]}.${format}`;
      break;

    default:
      return NextResponse.json(
        { error: 'Invalid export type' },
        { status: 400 }
      );
  }

  if (format === 'json') {
    return new NextResponse(JSON.stringify(data, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  }

  if (format === 'csv') {
    const csv = convertToCSV(data);
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  }

  return NextResponse.json(
    { error: 'Invalid format' },
    { status: 400 }
  );
}

function convertToCSV(data: any[]): string {
  if (data.length === 0) return '';

  // Get headers from first object
  const headers = Object.keys(flattenObject(data[0]));

  // Create CSV rows
  const rows = data.map(item => {
    const flattened = flattenObject(item);
    return headers.map(header => {
      let value = flattened[header];

      // Handle special types
      if (value instanceof Date) {
        value = value.toISOString();
      } else if (typeof value === 'object' && value !== null) {
        value = JSON.stringify(value);
      } else if (value === null || value === undefined) {
        value = '';
      }

      // Escape quotes and wrap in quotes if needed
      value = String(value).replace(/"/g, '""');
      if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        value = `"${value}"`;
      }

      return value;
    }).join(',');
  });

  // Combine headers and rows
  return [headers.join(','), ...rows].join('\n');
}

function flattenObject(obj: any, prefix = ''): any {
  const flattened: any = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
        // Skip nested objects for simplicity
        flattened[newKey] = JSON.stringify(value);
      } else {
        flattened[newKey] = value;
      }
    }
  }

  return flattened;
}
