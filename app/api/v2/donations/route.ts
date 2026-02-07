/**
 * Donations API Route (v2)
 *
 * POST /api/v2/donations - Create donation/payment intent
 * GET  /api/v2/donations - Get donation history (authenticated)
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
  requireAuth,
  checkRateLimit,
} from '@/lib/api/middleware';
import { Analytics } from '@/lib/analytics/tracker';
import { logger, logError, logWarn } from '@/lib/logger';

const createDonationSchema = z.object({
  amount: z.number().positive().min(1, 'Amount must be at least $1'),
  fund: z.enum(['general', 'missions', 'building', 'youth', 'benevolence']),
  frequency: z.enum(['one-time', 'weekly', 'monthly', 'yearly']),
  donorName: z.string().optional(),
  donorEmail: z.string().email().optional(),
  notes: z.string().max(500).optional(),
});

/**
 * POST /api/v2/donations
 * Create payment intent and donation record
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  validateMethod(request, ['POST']);
  checkRateLimit(request, 20);

  const data = await validateBody(request, createDonationSchema);

  // Try to get authenticated user
  let userId: string | undefined;
  try {
    const session = await requireAuth(request);
    userId = session.user.id;
  } catch {
    // Allow anonymous donations
  }

  // Track analytics
  Analytics.donation.started(data.amount, data.fund);

  // Create Stripe payment intent (if Stripe is configured)
  let paymentIntentId: string | undefined;
  let clientSecret: string | undefined;

  if (process.env.STRIPE_SECRET_KEY) {
    try {
      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(data.amount * 100), // Convert to cents
        currency: 'usd',
        metadata: {
          fund: data.fund,
          frequency: data.frequency,
          donorEmail: data.donorEmail || 'anonymous',
        },
      });

      paymentIntentId = paymentIntent.id;
      clientSecret = paymentIntent.client_secret;
    } catch (error) {
      logError('Stripe error:', error);
      throw new Error('Failed to create payment intent');
    }
  }

  // Create donation record
  const donation = await prisma.donation.create({
    data: {
      userId,
      amount: data.amount,
      fund: data.fund,
      frequency: data.frequency,
      donorName: data.donorName,
      donorEmail: data.donorEmail,
      notes: data.notes,
      status: 'pending',
      stripePaymentId: paymentIntentId,
    },
  });

  return apiCreated({
    donation,
    clientSecret, // Send to frontend for Stripe Elements
  });
});

/**
 * GET /api/v2/donations
 * Get donation history for authenticated user
 */
export const GET = withErrorHandling(async (request: NextRequest) => {
  validateMethod(request, ['GET']);
  const session = await requireAuth(request);
  checkRateLimit(request);

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '20');
  const offset = parseInt(searchParams.get('offset') || '0');

  const donations = await prisma.donation.findMany({
    where: {
      OR: [
        { userId: session.user.id },
        { donorEmail: session.user.email },
      ],
      status: 'completed',
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: offset,
  });

  const total = await prisma.donation.count({
    where: {
      OR: [
        { userId: session.user.id },
        { donorEmail: session.user.email },
      ],
      status: 'completed',
    },
  });

  return apiPaginated(donations, offset / limit + 1, limit, total);
});
