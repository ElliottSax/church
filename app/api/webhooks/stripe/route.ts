/**
 * Stripe Webhook Handler
 *
 * Handles Stripe webhook events for payment confirmations
 */

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { prisma } from '@/lib/db/client';
import { sendEmail } from '@/lib/email';
import { Analytics } from '@/lib/analytics/tracker';
import siteConfig from '@/config/site-config';
import { logger, logError, logWarn } from '@/lib/logger';

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Stripe not configured' },
      { status: 500 }
    );
  }

  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const body = await request.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    logError('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSuccess(event.data.object);
      break;

    case 'payment_intent.payment_failed':
      await handlePaymentFailure(event.data.object);
      break;

    case 'charge.refunded':
      await handleRefund(event.data.object);
      break;

    default:
      logger.info(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

interface StripePaymentIntent {
  id: string;
  last_payment_error?: { message: string };
}

interface StripeCharge {
  id: string;
  payment_intent: string;
}

async function handlePaymentSuccess(paymentIntent: StripePaymentIntent) {
  logger.info('Payment succeeded:', paymentIntent.id);

  // Find donation record
  const donation = await prisma.donation.findFirst({
    where: { stripePaymentId: paymentIntent.id },
  });

  if (!donation) {
    logError('Donation not found for payment:', paymentIntent.id);
    return;
  }

  // Update donation status
  await prisma.donation.update({
    where: { id: donation.id },
    data: {
      status: 'completed',
      updatedAt: new Date(),
    },
  });

  // Track analytics
  Analytics.donation.completed(
    donation.amount,
    donation.fund,
    donation.userId || undefined
  );

  // Send receipt email
  await sendDonationReceipt(donation);

  logger.info('Donation completed:', donation.id);
}

async function handlePaymentFailure(paymentIntent: StripePaymentIntent) {
  logger.info('Payment failed:', paymentIntent.id);

  const donation = await prisma.donation.findFirst({
    where: { stripePaymentId: paymentIntent.id },
  });

  if (!donation) {
    return;
  }

  await prisma.donation.update({
    where: { id: donation.id },
    data: {
      status: 'failed',
      updatedAt: new Date(),
    },
  });

  // Track analytics
  Analytics.donation.failed(
    donation.amount,
    paymentIntent.last_payment_error?.message || 'Unknown error'
  );

  logger.info('Donation failed:', donation.id);
}

async function handleRefund(charge: StripeCharge) {
  logger.info('Charge refunded:', charge.id);

  const donation = await prisma.donation.findFirst({
    where: { stripePaymentId: charge.payment_intent },
  });

  if (!donation) {
    return;
  }

  await prisma.donation.update({
    where: { id: donation.id },
    data: {
      status: 'refunded',
      updatedAt: new Date(),
    },
  });

  logger.info('Donation refunded:', donation.id);
}

interface DonationRecord {
  donorEmail?: string | null;
  donorName?: string | null;
  user?: { email: string };
  amount: number;
  fund: string;
  frequency: string;
  createdAt: Date;
}

async function sendDonationReceipt(donation: DonationRecord) {
  const email = donation.donorEmail || donation.user?.email;

  if (!email) {
    return;
  }

  const subject = `Thank You for Your Donation - ${siteConfig.site.name}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
    .content { padding: 30px; background: #fff; }
    .receipt-box { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e0e0e0; }
    .total { font-size: 24px; font-weight: bold; color: #667eea; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0;">💝 Thank You!</h1>
  </div>

  <div class="content">
    <p>Dear ${donation.donorName || 'Friend'},</p>

    <p>
      Thank you for your generous donation to ${siteConfig.site.name}.
      Your gift makes a real difference in our community and ministry.
    </p>

    <div class="receipt-box">
      <h3 style="margin-top: 0;">Donation Receipt</h3>

      <div class="detail-row">
        <span>Date:</span>
        <strong>${new Date(donation.createdAt).toLocaleDateString()}</strong>
      </div>

      <div class="detail-row">
        <span>Fund:</span>
        <strong>${donation.fund.charAt(0).toUpperCase() + donation.fund.slice(1)}</strong>
      </div>

      <div class="detail-row">
        <span>Frequency:</span>
        <strong>${donation.frequency}</strong>
      </div>

      <div class="detail-row" style="border: none; margin-top: 10px;">
        <span>Total Amount:</span>
        <span class="total">$${donation.amount.toFixed(2)}</span>
      </div>
    </div>

    <p style="font-size: 12px; color: #666;">
      <strong>Tax Information:</strong> ${siteConfig.site.name} is a registered 501(c)(3) nonprofit organization.
      This donation is tax-deductible to the extent allowed by law. Please keep this receipt for your records.
    </p>

    <p style="margin-top: 30px;">
      <em>"Each of you should give what you have decided in your heart to give, not reluctantly
      or under compulsion, for God loves a cheerful giver."</em><br>
      <strong>- 2 Corinthians 9:7</strong>
    </p>

    <p style="margin-top: 30px;">
      Blessings,<br>
      <strong>${siteConfig.site.name}</strong>
    </p>
  </div>
</body>
</html>
  `;

  await sendEmail({
    to: email,
    subject,
    html,
  });
}
