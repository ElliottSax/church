import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';

export async function POST(request: Request) {
  try {
    const { amount, category, isRecurring, email, name } = await request.json();

    // Validate amount
    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        category: category || 'general',
        isRecurring: isRecurring ? 'true' : 'false',
        email: email || '',
        name: name || '',
      },
      description: `Donation to ${category || 'General Fund'}`,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
