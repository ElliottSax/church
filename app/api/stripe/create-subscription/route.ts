import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';
import { logger, logError, logWarn } from '@/lib/logger';

export async function POST(request: Request) {
  try {
    const { amount, category, email, paymentMethodId } = await request.json();

    // Validate inputs
    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    if (!email || !paymentMethodId) {
      return NextResponse.json(
        { error: 'Email and payment method required' },
        { status: 400 }
      );
    }

    // Create or retrieve customer
    let customer;
    const existingCustomers = await stripe.customers.list({ email, limit: 1 });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email,
        payment_method: paymentMethodId,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    }

    // Create product and price for recurring donation
    const product = await stripe.products.create({
      name: `Monthly Donation - ${category || 'General Fund'}`,
      metadata: {
        category: category || 'general',
      },
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(amount * 100),
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
    });

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      expand: ['latest_invoice.payment_intent'],
    });

    const invoice = subscription.latest_invoice as { payment_intent: { client_secret: string } };
    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: invoice.payment_intent.client_secret,
    });
  } catch (error: unknown) {
    logError('Stripe subscription error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
