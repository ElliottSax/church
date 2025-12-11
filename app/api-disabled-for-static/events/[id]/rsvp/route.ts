import { NextResponse } from 'next/server';
import { submitRSVP } from '@/lib/events';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Submit RSVP
    const rsvp = await submitRSVP({
      eventId: params.id,
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      numberOfGuests: data.numberOfGuests || 0,
      dietaryRestrictions: data.dietaryRestrictions || '',
      specialNeeds: data.specialNeeds || '',
      notes: data.notes || '',
      status: 'confirmed' // Will be changed to waitlisted if needed by submitRSVP
    });

    // TODO: Send confirmation email using SendGrid

    return NextResponse.json(rsvp);
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return NextResponse.json(
      { error: 'Failed to submit RSVP' },
      { status: 500 }
    );
  }
}