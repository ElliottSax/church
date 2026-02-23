import { NextResponse } from 'next/server';
import { submitRSVP } from '@/lib/events';
import { sendEmail } from '@/lib/email/sendgrid';
import { EventRSVPConfirmation } from '@/lib/email/templates/event-rsvp';
import { format } from 'date-fns';
import { logger, logError, logWarn } from '@/lib/logger';

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

    // Fetch event details for email
    const { getEventById } = await import('@/lib/events');
    const event = await getEventById(params.id);
    const eventTitle = event?.title || 'Event';
    const eventDate = event?.date ? format(new Date(event.date), 'EEEE, MMMM d, yyyy \'at\' h:mm a') : 'Date TBA';
    const eventLocation = event?.location || 'Location TBA';

    // Send confirmation email
    try {
      // Generate a simple confirmation code
      const confirmationCode = Math.random().toString(36).substring(2, 10).toUpperCase();

      const emailHtml = EventRSVPConfirmation({
        name: data.name,
        eventTitle,
        eventDate,
        eventLocation,
        confirmationCode: rsvp.confirmationCode || confirmationCode,
        numberOfGuests: data.numberOfGuests || 0,
        isWaitlisted: rsvp.status === 'waitlisted',
        churchName: 'Minneapolis Community of Christ',
        churchEmail: 'info@minneapoliscofchrist.org',
      });

      await sendEmail({
        to: data.email,
        subject: rsvp.status === 'confirmed'
          ? `RSVP Confirmed: ${eventTitle}`
          : `Waitlisted: ${eventTitle}`,
        html: emailHtml,
      });
    } catch (emailError) {
      logError('Failed to send RSVP confirmation email:', emailError);
      // Don't fail the request if email fails - RSVP is still created
    }

    return NextResponse.json(rsvp);
  } catch (error) {
    logError('Error submitting RSVP:', error);
    return NextResponse.json(
      { error: 'Failed to submit RSVP' },
      { status: 500 }
    );
  }
}