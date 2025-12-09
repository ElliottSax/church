// Event management and RSVP system utilities
import { cache } from 'react';

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: Date;
  endDate?: Date;
  location: string;
  category: 'worship' | 'youth' | 'community' | 'education' | 'mission' | 'social' | 'special';
  image?: string;
  maxCapacity?: number;
  currentAttendees: number;
  requiresRsvp: boolean;
  rsvpDeadline?: Date;
  featured: boolean;
  recurring?: {
    frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
    endDate?: Date;
    exceptions?: Date[]; // Dates to skip
  };
  organizer: {
    name: string;
    email: string;
    phone?: string;
  };
  tags: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface RSVP {
  id: string;
  eventId: string;
  userId?: string;
  name: string;
  email: string;
  phone?: string;
  numberOfGuests: number;
  dietaryRestrictions?: string;
  specialNeeds?: string;
  notes?: string;
  status: 'confirmed' | 'waitlisted' | 'cancelled';
  confirmationCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventStats {
  totalEvents: number;
  upcomingEvents: number;
  totalRsvps: number;
  averageAttendance: number;
  popularCategories: Array<{ category: string; count: number }>;
}

// Mock database for events (would use real database in production)
let mockEvents: Event[] = [
  {
    id: '1',
    title: 'Sunday Worship Service',
    slug: 'sunday-worship-service',
    description: 'Join us for our weekly worship service with inspiring messages, uplifting music, and fellowship.',
    date: new Date('2024-02-04T10:00:00'),
    endDate: new Date('2024-02-04T11:30:00'),
    location: 'Main Sanctuary',
    category: 'worship',
    maxCapacity: 300,
    currentAttendees: 145,
    requiresRsvp: false,
    featured: true,
    recurring: {
      frequency: 'weekly'
    },
    organizer: {
      name: 'Pastor John Smith',
      email: 'pastor@church.org',
      phone: '(555) 123-4567'
    },
    tags: ['worship', 'sunday', 'service'],
    status: 'upcoming',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    title: 'Youth Group Movie Night',
    slug: 'youth-group-movie-night',
    description: 'A fun evening for teens with movies, popcorn, and fellowship. Ages 13-18 welcome!',
    date: new Date('2024-02-09T18:00:00'),
    endDate: new Date('2024-02-09T21:00:00'),
    location: 'Youth Center',
    category: 'youth',
    maxCapacity: 50,
    currentAttendees: 23,
    requiresRsvp: true,
    rsvpDeadline: new Date('2024-02-08T17:00:00'),
    featured: false,
    organizer: {
      name: 'Sarah Johnson',
      email: 'youth@church.org'
    },
    tags: ['youth', 'social', 'teens'],
    status: 'upcoming',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '3',
    title: 'Community Food Drive',
    slug: 'community-food-drive',
    description: 'Help us serve our community by donating non-perishable food items for local families in need.',
    date: new Date('2024-02-10T09:00:00'),
    endDate: new Date('2024-02-10T15:00:00'),
    location: 'Church Parking Lot',
    category: 'community',
    maxCapacity: undefined,
    currentAttendees: 0,
    requiresRsvp: false,
    featured: true,
    organizer: {
      name: 'Mission Team',
      email: 'mission@church.org'
    },
    tags: ['community', 'service', 'outreach'],
    status: 'upcoming',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  }
];

let mockRSVPs: RSVP[] = [];

// Get all events
export const getAllEvents = cache(async (): Promise<Event[]> => {
  // In production, fetch from database
  return mockEvents.filter(e => e.status !== 'cancelled');
});

// Get upcoming events
export const getUpcomingEvents = cache(async (limit?: number): Promise<Event[]> => {
  const now = new Date();
  const upcoming = mockEvents
    .filter(e => e.date >= now && e.status === 'upcoming')
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return limit ? upcoming.slice(0, limit) : upcoming;
});

// Get event by ID
export async function getEventById(id: string): Promise<Event | null> {
  return mockEvents.find(e => e.id === id) || null;
}

// Get event by slug
export async function getEventBySlug(slug: string): Promise<Event | null> {
  return mockEvents.find(e => e.slug === slug) || null;
}

// Get events by category
export const getEventsByCategory = cache(async (category: Event['category']): Promise<Event[]> => {
  return mockEvents.filter(e => e.category === category && e.status !== 'cancelled');
});

// Check event capacity
export async function checkEventCapacity(eventId: string): Promise<{
  available: boolean;
  spotsLeft: number | null;
  waitlistAvailable: boolean;
}> {
  const event = await getEventById(eventId);
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

  const spotsLeft = event.maxCapacity - event.currentAttendees;
  return {
    available: spotsLeft > 0,
    spotsLeft,
    waitlistAvailable: spotsLeft <= 0 && spotsLeft > -10 // Allow 10 waitlist spots
  };
}

// Submit RSVP
export async function submitRSVP(rsvpData: Omit<RSVP, 'id' | 'confirmationCode' | 'createdAt' | 'updatedAt'>): Promise<RSVP> {
  const event = await getEventById(rsvpData.eventId);
  if (!event) {
    throw new Error('Event not found');
  }

  // Check capacity
  const capacity = await checkEventCapacity(rsvpData.eventId);

  const newRSVP: RSVP = {
    ...rsvpData,
    id: Date.now().toString(),
    status: capacity.available ? 'confirmed' : 'waitlisted',
    confirmationCode: generateConfirmationCode(),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Add to mock database
  mockRSVPs.push(newRSVP);

  // Update event attendee count
  if (newRSVP.status === 'confirmed') {
    event.currentAttendees += (1 + newRSVP.numberOfGuests);
  }

  return newRSVP;
}

// Cancel RSVP
export async function cancelRSVP(confirmationCode: string): Promise<boolean> {
  const rsvpIndex = mockRSVPs.findIndex(r => r.confirmationCode === confirmationCode);

  if (rsvpIndex === -1) {
    return false;
  }

  const rsvp = mockRSVPs[rsvpIndex];
  const event = await getEventById(rsvp.eventId);

  if (event && rsvp.status === 'confirmed') {
    event.currentAttendees -= (1 + rsvp.numberOfGuests);

    // Move waitlisted person to confirmed if space available
    const waitlisted = mockRSVPs.find(r =>
      r.eventId === rsvp.eventId &&
      r.status === 'waitlisted'
    );

    if (waitlisted) {
      waitlisted.status = 'confirmed';
      waitlisted.updatedAt = new Date();
      event.currentAttendees += (1 + waitlisted.numberOfGuests);
      // Would send confirmation email here
    }
  }

  // Mark as cancelled instead of deleting
  mockRSVPs[rsvpIndex].status = 'cancelled';
  mockRSVPs[rsvpIndex].updatedAt = new Date();

  return true;
}

// Get RSVPs for an event
export async function getEventRSVPs(eventId: string): Promise<RSVP[]> {
  return mockRSVPs.filter(r => r.eventId === eventId && r.status !== 'cancelled');
}

// Get RSVP by confirmation code
export async function getRSVPByConfirmationCode(code: string): Promise<RSVP | null> {
  return mockRSVPs.find(r => r.confirmationCode === code) || null;
}

// Get user's RSVPs
export async function getUserRSVPs(email: string): Promise<RSVP[]> {
  return mockRSVPs.filter(r => r.email === email && r.status !== 'cancelled');
}

// Get event statistics
export const getEventStats = cache(async (): Promise<EventStats> => {
  const allEvents = await getAllEvents();
  const upcomingEvents = await getUpcomingEvents();

  const categoryCount = allEvents.reduce((acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalEvents: allEvents.length,
    upcomingEvents: upcomingEvents.length,
    totalRsvps: mockRSVPs.filter(r => r.status === 'confirmed').length,
    averageAttendance: allEvents.reduce((sum, e) => sum + e.currentAttendees, 0) / allEvents.length,
    popularCategories: Object.entries(categoryCount)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  };
});

// Generate recurring events
export function generateRecurringEvents(baseEvent: Event, until: Date): Event[] {
  if (!baseEvent.recurring) {
    return [baseEvent];
  }

  const events: Event[] = [];
  let currentDate = new Date(baseEvent.date);
  const endDate = baseEvent.recurring.endDate || until;

  while (currentDate <= endDate) {
    // Skip exceptions
    if (!baseEvent.recurring.exceptions?.some(ex =>
      ex.toDateString() === currentDate.toDateString()
    )) {
      events.push({
        ...baseEvent,
        id: `${baseEvent.id}-${currentDate.getTime()}`,
        date: new Date(currentDate),
        endDate: baseEvent.endDate ? new Date(
          currentDate.getTime() +
          (baseEvent.endDate.getTime() - baseEvent.date.getTime())
        ) : undefined
      });
    }

    // Increment date based on frequency
    switch (baseEvent.recurring.frequency) {
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

  return events;
}

// Helper function to generate confirmation code
function generateConfirmationCode(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

// Event categories with metadata
export const eventCategories = {
  worship: {
    name: 'Worship',
    icon: '⛪',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  youth: {
    name: 'Youth',
    icon: '👥',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  community: {
    name: 'Community',
    icon: '🤝',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  education: {
    name: 'Education',
    icon: '📚',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  mission: {
    name: 'Mission',
    icon: '🌍',
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  },
  social: {
    name: 'Social',
    icon: '🎉',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100'
  },
  special: {
    name: 'Special',
    icon: '⭐',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100'
  }
};