/**
 * Event Service Layer
 *
 * Business logic for event operations
 * Sits between API routes and repositories
 */

import { eventsRepository, rsvpRepository } from '@/lib/db/repositories/events.repository';
import { sendEmail } from '@/lib/email';
import siteConfig from '@/config/site-config';
import type { Event, RSVP } from '@prisma/client';

export class EventService {
  /**
   * Create event with automatic slug generation
   */
  async createEvent(data: any): Promise<Event> {
    // Generate slug if not provided
    if (!data.slug) {
      data.slug = this.generateSlug(data.title);
    }

    // Ensure slug is unique
    const existingEvent = await eventsRepository.findBySlug(data.slug);
    if (existingEvent) {
      data.slug = `${data.slug}-${Date.now()}`;
    }

    const event = await eventsRepository.create(data);

    // If recurring, generate instances
    if (event.isRecurring && event.recurringEndDate) {
      await this.generateRecurringInstances(event);
    }

    return event;
  }

  /**
   * Submit RSVP with email confirmation
   */
  async submitRSVP(eventId: string, rsvpData: any): Promise<RSVP> {
    // Check event capacity
    const capacity = await eventsRepository.checkCapacity(eventId);
    const event = await eventsRepository.findById(eventId);

    if (!event) {
      throw new Error('Event not found');
    }

    // Determine status
    const status = capacity.available ? 'confirmed' :
                   capacity.waitlistAvailable ? 'waitlisted' : null;

    if (!status) {
      throw new Error('Event is full and waitlist is not available');
    }

    // Generate confirmation code
    const confirmationCode = this.generateConfirmationCode();

    // Create RSVP
    const rsvp = await rsvpRepository.create({
      event: { connect: { id: eventId } },
      ...rsvpData,
      status,
      confirmationCode,
    });

    // Update event attendee count if confirmed
    if (status === 'confirmed') {
      await eventsRepository.update(eventId, {
        currentAttendees: {
          increment: 1 + (rsvpData.numberOfGuests || 0)
        }
      });
    }

    // Send confirmation email
    await this.sendRSVPConfirmation(rsvp, event);

    return rsvp;
  }

  /**
   * Cancel RSVP and manage waitlist
   */
  async cancelRSVP(confirmationCode: string): Promise<void> {
    const rsvp = await rsvpRepository.findByConfirmationCode(confirmationCode);

    if (!rsvp) {
      throw new Error('RSVP not found');
    }

    const event = await eventsRepository.findById(rsvp.eventId);

    if (!event) {
      throw new Error('Event not found');
    }

    // Cancel the RSVP
    await rsvpRepository.cancel(confirmationCode);

    // Update attendee count
    if (rsvp.status === 'confirmed') {
      await eventsRepository.update(rsvp.eventId, {
        currentAttendees: {
          decrement: 1 + rsvp.numberOfGuests
        }
      });

      // Check if someone on waitlist can be promoted
      await this.promoteFromWaitlist(rsvp.eventId);
    }

    // Send cancellation email
    await this.sendRSVPCancellation(rsvp, event);
  }

  /**
   * Send event reminders
   */
  async sendEventReminders(): Promise<void> {
    const reminderDays = siteConfig.events.rsvpReminderDays;
    const reminderDate = new Date();
    reminderDate.setDate(reminderDate.getDate() + reminderDays);

    // Get events happening in X days
    const upcomingEvents = await eventsRepository.findAll({
      startDate: reminderDate,
      endDate: reminderDate,
      status: 'upcoming'
    });

    for (const event of upcomingEvents) {
      const rsvps = await rsvpRepository.findByEvent(event.id);

      for (const rsvp of rsvps) {
        if (rsvp.status === 'confirmed') {
          await this.sendEventReminder(rsvp, event);
        }
      }
    }
  }

  /**
   * Generate recurring event instances
   */
  private async generateRecurringInstances(baseEvent: Event): Promise<void> {
    if (!baseEvent.isRecurring || !baseEvent.recurringEndDate || !baseEvent.recurringFrequency) {
      return;
    }

    const instances: any[] = [];
    let currentDate = new Date(baseEvent.date);
    const endDate = new Date(baseEvent.recurringEndDate);

    while (currentDate <= endDate) {
      // Skip the base event date
      if (currentDate.getTime() !== baseEvent.date.getTime()) {
        instances.push({
          ...baseEvent,
          id: undefined,
          date: new Date(currentDate),
          endDate: baseEvent.endDate ? new Date(
            currentDate.getTime() +
            (new Date(baseEvent.endDate).getTime() - new Date(baseEvent.date).getTime())
          ) : undefined,
          recurringParentId: baseEvent.id,
          slug: `${baseEvent.slug}-${currentDate.getTime()}`,
        });
      }

      // Increment based on frequency
      switch (baseEvent.recurringFrequency) {
        case 'daily':
          currentDate.setDate(currentDate.getDate() + 1);
          break;
        case 'weekly':
          currentDate.setDate(currentDate.getDate() + 7);
          break;
        case 'biweekly':
          currentDate.setDate(currentDate.getDate() + 14);
          break;
        case 'monthly':
          currentDate.setMonth(currentDate.getMonth() + 1);
          break;
      }
    }

    // Create all instances
    for (const instance of instances) {
      await eventsRepository.create(instance);
    }
  }

  /**
   * Promote someone from waitlist
   */
  private async promoteFromWaitlist(eventId: string): Promise<void> {
    const event = await eventsRepository.findById(eventId);
    if (!event) return;

    const capacity = await eventsRepository.checkCapacity(eventId);
    if (!capacity.available) return;

    // Find first waitlisted RSVP
    const rsvps = await rsvpRepository.findByEvent(eventId);
    const waitlisted = rsvps.find(r => r.status === 'waitlisted');

    if (waitlisted) {
      // Promote to confirmed
      await rsvpRepository.updateStatus(waitlisted.id, 'confirmed');

      // Update attendee count
      await eventsRepository.update(eventId, {
        currentAttendees: {
          increment: 1 + waitlisted.numberOfGuests
        }
      });

      // Send promotion email
      await this.sendWaitlistPromotion(waitlisted, event);
    }
  }

  /**
   * Email notifications
   */
  private async sendRSVPConfirmation(rsvp: RSVP, event: Event): Promise<void> {
    const subject = `RSVP ${rsvp.status === 'confirmed' ? 'Confirmed' : 'Waitlisted'}: ${event.title}`;

    const html = `
      <h2>RSVP ${rsvp.status === 'confirmed' ? 'Confirmation' : 'Waitlist'}</h2>
      <p>Dear ${rsvp.name},</p>
      <p>Your RSVP for <strong>${event.title}</strong> has been ${rsvp.status === 'confirmed' ? 'confirmed' : 'added to the waitlist'}.</p>

      <h3>Event Details:</h3>
      <ul>
        <li><strong>Date:</strong> ${new Date(event.date).toLocaleString()}</li>
        <li><strong>Location:</strong> ${event.location}</li>
        <li><strong>Confirmation Code:</strong> ${rsvp.confirmationCode}</li>
        ${rsvp.numberOfGuests > 0 ? `<li><strong>Guests:</strong> ${rsvp.numberOfGuests}</li>` : ''}
      </ul>

      ${rsvp.status === 'waitlisted' ?
        '<p>You are on the waitlist. We will notify you if a spot becomes available.</p>' :
        '<p>We look forward to seeing you!</p>'
      }

      <p>To cancel your RSVP, use confirmation code: <strong>${rsvp.confirmationCode}</strong></p>

      <p>Blessings,<br>${siteConfig.site.name}</p>
    `;

    await sendEmail({
      to: rsvp.email,
      subject,
      html
    });
  }

  private async sendRSVPCancellation(rsvp: RSVP, event: Event): Promise<void> {
    const subject = `RSVP Cancelled: ${event.title}`;

    const html = `
      <h2>RSVP Cancellation</h2>
      <p>Dear ${rsvp.name},</p>
      <p>Your RSVP for <strong>${event.title}</strong> has been cancelled.</p>
      <p>If this was a mistake, please contact us at ${siteConfig.contact.email}.</p>
      <p>Blessings,<br>${siteConfig.site.name}</p>
    `;

    await sendEmail({
      to: rsvp.email,
      subject,
      html
    });
  }

  private async sendEventReminder(rsvp: RSVP, event: Event): Promise<void> {
    const subject = `Reminder: ${event.title} - Coming Up Soon!`;

    const html = `
      <h2>Event Reminder</h2>
      <p>Dear ${rsvp.name},</p>
      <p>This is a reminder that <strong>${event.title}</strong> is coming up soon!</p>

      <h3>Event Details:</h3>
      <ul>
        <li><strong>Date:</strong> ${new Date(event.date).toLocaleString()}</li>
        <li><strong>Location:</strong> ${event.location}</li>
      </ul>

      <p>${event.description}</p>

      <p>We look forward to seeing you!</p>
      <p>Blessings,<br>${siteConfig.site.name}</p>
    `;

    await sendEmail({
      to: rsvp.email,
      subject,
      html
    });
  }

  private async sendWaitlistPromotion(rsvp: RSVP, event: Event): Promise<void> {
    const subject = `Great News! You're Confirmed for ${event.title}`;

    const html = `
      <h2>Waitlist Promotion</h2>
      <p>Dear ${rsvp.name},</p>
      <p>Great news! A spot has opened up and you are now <strong>confirmed</strong> for ${event.title}!</p>

      <h3>Event Details:</h3>
      <ul>
        <li><strong>Date:</strong> ${new Date(event.date).toLocaleString()}</li>
        <li><strong>Location:</strong> ${event.location}</li>
        <li><strong>Confirmation Code:</strong> ${rsvp.confirmationCode}</li>
      </ul>

      <p>We look forward to seeing you!</p>
      <p>Blessings,<br>${siteConfig.site.name}</p>
    `;

    await sendEmail({
      to: rsvp.email,
      subject,
      html
    });
  }

  /**
   * Helper methods
   */
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private generateConfirmationCode(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }
}

export const eventService = new EventService();
