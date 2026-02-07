/**
 * Events Repository
 *
 * Centralized data access layer for events
 * All event-related database operations go through this repository
 */

import { prisma } from '../client';
import type { Event, RSVP, Prisma } from '@prisma/client';

export class EventsRepository {
  /**
   * Get all events with optional filters
   */
  async findAll(filters?: {
    status?: string;
    category?: string;
    featured?: boolean;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    offset?: number;
  }) {
    const where: Prisma.EventWhereInput = {};

    if (filters?.status) where.status = filters.status;
    if (filters?.category) where.category = filters.category;
    if (filters?.featured !== undefined) where.featured = filters.featured;

    if (filters?.startDate || filters?.endDate) {
      where.date = {};
      if (filters.startDate) where.date.gte = filters.startDate;
      if (filters.endDate) where.date.lte = filters.endDate;
    }

    return await prisma.event.findMany({
      where,
      orderBy: { date: 'asc' },
      take: filters?.limit,
      skip: filters?.offset,
      include: {
        _count: {
          select: { rsvps: true }
        }
      }
    });
  }

  /**
   * Get upcoming events
   */
  async findUpcoming(limit?: number) {
    return await prisma.event.findMany({
      where: {
        date: { gte: new Date() },
        status: 'upcoming'
      },
      orderBy: { date: 'asc' },
      take: limit,
      include: {
        _count: {
          select: { rsvps: true }
        }
      }
    });
  }

  /**
   * Get event by ID
   */
  async findById(id: string) {
    return await prisma.event.findUnique({
      where: { id },
      include: {
        rsvps: {
          where: {
            status: { not: 'cancelled' }
          }
        }
      }
    });
  }

  /**
   * Get event by slug
   */
  async findBySlug(slug: string) {
    return await prisma.event.findUnique({
      where: { slug },
      include: {
        rsvps: {
          where: {
            status: { not: 'cancelled' }
          }
        }
      }
    });
  }

  /**
   * Create new event
   */
  async create(data: Prisma.EventCreateInput) {
    return await prisma.event.create({
      data
    });
  }

  /**
   * Update event
   */
  async update(id: string, data: Prisma.EventUpdateInput) {
    return await prisma.event.update({
      where: { id },
      data
    });
  }

  /**
   * Delete event
   */
  async delete(id: string) {
    return await prisma.event.delete({
      where: { id }
    });
  }

  /**
   * Check event capacity
   */
  async checkCapacity(eventId: string) {
    const event = await this.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    if (!event.maxCapacity) {
      return {
        available: true,
        spotsLeft: null,
        waitlistAvailable: false
      };
    }

    const confirmedRsvps = event.rsvps.filter(r => r.status === 'confirmed');
    const totalAttendees = confirmedRsvps.reduce(
      (sum, rsvp) => sum + 1 + rsvp.numberOfGuests,
      0
    );

    const spotsLeft = event.maxCapacity - totalAttendees;

    return {
      available: spotsLeft > 0,
      spotsLeft,
      waitlistAvailable: spotsLeft <= 0 && spotsLeft > -10
    };
  }

  /**
   * Get event statistics
   */
  async getStats() {
    const [totalEvents, upcomingEvents, totalRsvps, categoryStats] = await Promise.all([
      prisma.event.count({
        where: { status: { not: 'cancelled' } }
      }),
      prisma.event.count({
        where: {
          status: 'upcoming',
          date: { gte: new Date() }
        }
      }),
      prisma.rSVP.count({
        where: { status: 'confirmed' }
      }),
      prisma.event.groupBy({
        by: ['category'],
        _count: true,
        orderBy: {
          _count: {
            category: 'desc'
          }
        },
        take: 5
      })
    ]);

    const events = await prisma.event.findMany({
      select: { currentAttendees: true }
    });

    const averageAttendance = events.length > 0
      ? events.reduce((sum, e) => sum + e.currentAttendees, 0) / events.length
      : 0;

    return {
      totalEvents,
      upcomingEvents,
      totalRsvps,
      averageAttendance,
      popularCategories: categoryStats.map(stat => ({
        category: stat.category,
        count: stat._count
      }))
    };
  }
}

export class RSVPRepository {
  /**
   * Create RSVP
   */
  async create(data: Prisma.RSVPCreateInput) {
    return await prisma.rSVP.create({
      data,
      include: {
        event: true
      }
    });
  }

  /**
   * Get RSVPs for an event
   */
  async findByEvent(eventId: string) {
    return await prisma.rSVP.findMany({
      where: {
        eventId,
        status: { not: 'cancelled' }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  /**
   * Get RSVP by confirmation code
   */
  async findByConfirmationCode(code: string) {
    return await prisma.rSVP.findUnique({
      where: { confirmationCode: code },
      include: { event: true }
    });
  }

  /**
   * Get user's RSVPs
   */
  async findByEmail(email: string) {
    return await prisma.rSVP.findMany({
      where: {
        email,
        status: { not: 'cancelled' }
      },
      include: { event: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  /**
   * Cancel RSVP
   */
  async cancel(confirmationCode: string) {
    return await prisma.rSVP.update({
      where: { confirmationCode },
      data: {
        status: 'cancelled',
        updatedAt: new Date()
      }
    });
  }

  /**
   * Update RSVP status
   */
  async updateStatus(id: string, status: 'confirmed' | 'waitlisted' | 'cancelled') {
    return await prisma.rSVP.update({
      where: { id },
      data: { status, updatedAt: new Date() }
    });
  }
}

// Export singleton instances
export const eventsRepository = new EventsRepository();
export const rsvpRepository = new RSVPRepository();
