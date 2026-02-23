/**
 * RSVP API Route (v2)
 *
 * POST /api/v2/events/[id]/rsvp - Create RSVP for event
 */

import { NextRequest } from 'next/server';
import { eventsRepository, rsvpRepository } from '@/lib/db/repositories/events.repository';
import { createRSVPSchema } from '@/lib/validations/event.schema';
import { apiCreated, apiNotFound, apiError, withErrorHandling } from '@/lib/api/response';
import { validateMethod, validateBody, checkRateLimit } from '@/lib/api/middleware';
import { sendEmail } from '@/lib/email/sendgrid';
import { EventRSVPConfirmation } from '@/lib/email/templates/event-rsvp';
import { format } from 'date-fns';
import { logger, logError, logWarn } from '@/lib/logger';

/**
 * POST /api/v2/events/[id]/rsvp
 */
export const POST = withErrorHandling(async (
  request: NextRequest,
  context
) => {
  const { params } = context as { params: { id: string } };
  validateMethod(request, ['POST']);
  checkRateLimit(request);

  // Validate request body
  const data = await validateBody(request, createRSVPSchema);

  // Verify event exists and is open for RSVP
  const event = await eventsRepository.findById(params.id);
  if (!event) {
    return apiNotFound('Event');
  }

  if (!event.requiresRsvp) {
    return apiError('This event does not require RSVP', 'RSVP_NOT_REQUIRED');
  }

  if (event.rsvpDeadline && new Date() > event.rsvpDeadline) {
    return apiError('RSVP deadline has passed', 'DEADLINE_PASSED');
  }

  // Check capacity
  const capacity = await eventsRepository.checkCapacity(params.id);

  if (!capacity.available && !capacity.waitlistAvailable) {
    return apiError('Event is full and waitlist is unavailable', 'EVENT_FULL');
  }

  // Generate confirmation code
  const confirmationCode = generateConfirmationCode();

  // Create RSVP
  const rsvp = await rsvpRepository.create({
    event: { connect: { id: params.id } },
    name: data.name,
    email: data.email,
    phone: data.phone,
    numberOfGuests: data.numberOfGuests,
    dietaryRestrictions: data.dietaryRestrictions,
    specialNeeds: data.specialNeeds,
    notes: data.notes,
    status: capacity.available ? 'confirmed' : 'waitlisted',
    confirmationCode,
  });

  // Update event attendee count
  if (rsvp.status === 'confirmed') {
    await eventsRepository.update(params.id, {
      currentAttendees: {
        increment: 1 + (data.numberOfGuests ?? 0)
      }
    });
  }

  // Send confirmation email
  try {
    const emailHtml = EventRSVPConfirmation({
      name: data.name,
      eventTitle: event.title,
      eventDate: format(event.date, 'EEEE, MMMM d, yyyy \'at\' h:mm a'),
      eventLocation: event.location || 'Location TBA',
      confirmationCode,
      numberOfGuests: data.numberOfGuests || 0,
      isWaitlisted: rsvp.status === 'waitlisted',
      churchName: 'Minneapolis Community of Christ',
      churchEmail: 'info@minneapoliscofchrist.org',
    });

    await sendEmail({
      to: data.email,
      subject: rsvp.status === 'confirmed'
        ? `RSVP Confirmed: ${event.title}`
        : `Waitlisted: ${event.title}`,
      html: emailHtml,
    });
  } catch (emailError) {
    logError('Failed to send RSVP confirmation email:', emailError);
    // Don't fail the request if email fails - RSVP is still created
  }

  return apiCreated({
    ...rsvp,
    message: rsvp.status === 'confirmed'
      ? 'RSVP confirmed! Check your email for details.'
      : 'You have been added to the waitlist. We will notify you if a spot opens up.'
  });
});

function generateConfirmationCode(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}
