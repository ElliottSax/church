import { NextRequest, NextResponse } from 'next/server';
import { sendEventRegistrationEmail } from '@/lib/email';
import { logger, logError, logWarn } from '@/lib/logger';

// Type definitions
interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  name: string;
  email: string;
  phone?: string;
  numberOfAttendees: number;
  specialRequests?: string;
  dietaryRestrictions?: string;
  childcare?: boolean;
  childrenAges?: string;
  registrationDate: string;
  confirmationCode: string;
  status: 'confirmed' | 'pending' | 'waitlist' | 'cancelled';
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  currentAttendees: number;
  waitlistEnabled: boolean;
}

// Mock event data (would come from database)
const events: Map<string, Event> = new Map([
  ['christmas-eve-2024', {
    id: 'christmas-eve-2024',
    title: 'Christmas Eve Service',
    date: '2024-12-24',
    time: '7:00 PM',
    location: 'Main Sanctuary',
    capacity: 400,
    currentAttendees: 125,
    waitlistEnabled: true,
  }],
  ['new-year-prayer-2025', {
    id: 'new-year-prayer-2025',
    title: 'New Year Prayer Service',
    date: '2024-12-31',
    time: '11:00 PM',
    location: 'Prayer Chapel',
    capacity: 100,
    currentAttendees: 45,
    waitlistEnabled: true,
  }],
  ['mens-breakfast-2025', {
    id: 'mens-breakfast-2025',
    title: "Men's Breakfast & Fellowship",
    date: '2025-01-04',
    time: '8:00 AM',
    location: 'Fellowship Hall',
    capacity: 50,
    currentAttendees: 22,
    waitlistEnabled: false,
  }],
  ['womens-retreat-2025', {
    id: 'womens-retreat-2025',
    title: "Women's Spring Retreat",
    date: '2025-03-14',
    time: '6:00 PM',
    location: 'Camp Courage',
    capacity: 75,
    currentAttendees: 38,
    waitlistEnabled: true,
  }],
  ['easter-sunrise-2025', {
    id: 'easter-sunrise-2025',
    title: 'Easter Sunrise Service',
    date: '2025-04-20',
    time: '6:30 AM',
    location: 'Outdoor Amphitheater',
    capacity: 200,
    currentAttendees: 0,
    waitlistEnabled: false,
  }],
  ['vbs-2025', {
    id: 'vbs-2025',
    title: 'Vacation Bible School',
    date: '2025-06-16',
    time: '9:00 AM',
    location: 'Education Wing',
    capacity: 150,
    currentAttendees: 87,
    waitlistEnabled: true,
  }],
]);

// Store registrations in memory (would be database in production)
const registrations: Map<string, EventRegistration[]> = new Map();

// Generate confirmation code
function generateConfirmationCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'EVT-';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// GET endpoint - fetch registrations for an event or user
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const eventId = searchParams.get('eventId');
    const email = searchParams.get('email');
    const confirmationCode = searchParams.get('confirmationCode');

    let results: EventRegistration[] = [];

    if (confirmationCode) {
      // Search by confirmation code
      for (const eventRegs of Array.from(registrations.values())) {
        const reg = eventRegs.find(r => r.confirmationCode === confirmationCode);
        if (reg) {
          results.push(reg);
          break;
        }
      }
    } else if (eventId) {
      // Get all registrations for an event
      results = registrations.get(eventId) || [];
    } else if (email) {
      // Get all registrations for a user
      for (const eventRegs of Array.from(registrations.values())) {
        const userRegs = eventRegs.filter(r => r.email === email);
        results.push(...userRegs);
      }
    }

    return NextResponse.json({
      registrations: results,
      total: results.length,
    });
  } catch (error) {
    logError('Error fetching registrations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}

// POST endpoint - create a new registration
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.eventId || !data.name || !data.email || !data.numberOfAttendees) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if event exists
    const event = events.get(data.eventId);
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Check capacity
    const spotsAvailable = event.capacity - event.currentAttendees;
    const isWaitlist = data.numberOfAttendees > spotsAvailable;

    if (isWaitlist && !event.waitlistEnabled) {
      return NextResponse.json(
        {
          error: 'Not enough spots available',
          spotsAvailable,
          requested: data.numberOfAttendees
        },
        { status: 400 }
      );
    }

    // Create registration
    const registration: EventRegistration = {
      id: `reg-${Date.now()}`,
      eventId: data.eventId,
      eventTitle: event.title,
      name: data.name,
      email: data.email,
      phone: data.phone,
      numberOfAttendees: data.numberOfAttendees,
      specialRequests: data.specialRequests,
      dietaryRestrictions: data.dietaryRestrictions,
      childcare: data.childcare || false,
      childrenAges: data.childrenAges,
      registrationDate: new Date().toISOString(),
      confirmationCode: generateConfirmationCode(),
      status: isWaitlist ? 'waitlist' : 'confirmed',
    };

    // Store registration
    if (!registrations.has(data.eventId)) {
      registrations.set(data.eventId, []);
    }
    registrations.get(data.eventId)!.push(registration);

    // Update event attendance count (in production, this would update database)
    if (!isWaitlist) {
      event.currentAttendees += data.numberOfAttendees;
    }

    // Send confirmation email (mock for now)
    try {
      await sendEventRegistrationEmail({
        to: registration.email,
        name: registration.name,
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: event.time,
        eventLocation: event.location,
        confirmationCode: registration.confirmationCode,
        numberOfAttendees: registration.numberOfAttendees,
        isWaitlist,
      });
    } catch (emailError) {
      logError('Error sending confirmation email:', emailError);
      // Continue with registration even if email fails
    }

    return NextResponse.json({
      success: true,
      registration: {
        ...registration,
        eventDetails: {
          title: event.title,
          date: event.date,
          time: event.time,
          location: event.location,
        },
      },
      message: isWaitlist
        ? `You've been added to the waitlist. We'll notify you if spots become available.`
        : `Registration confirmed! Check your email for details.`,
    });
  } catch (error) {
    logError('Error creating registration:', error);
    return NextResponse.json(
      { error: 'Failed to process registration' },
      { status: 500 }
    );
  }
}

// PUT endpoint - update registration
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.confirmationCode) {
      return NextResponse.json(
        { error: 'Confirmation code required' },
        { status: 400 }
      );
    }

    // Find registration
    let registration: EventRegistration | null = null;
    let eventRegs: EventRegistration[] | null = null;

    for (const [eventId, regs] of Array.from(registrations.entries())) {
      const index = regs.findIndex(r => r.confirmationCode === data.confirmationCode);
      if (index !== -1) {
        registration = regs[index];
        eventRegs = regs;

        // Update fields
        if (data.numberOfAttendees !== undefined) {
          const event = events.get(eventId);
          if (event) {
            const oldAttendees = registration.numberOfAttendees;
            const diff = data.numberOfAttendees - oldAttendees;

            if (diff > 0 && event.currentAttendees + diff > event.capacity) {
              return NextResponse.json(
                { error: 'Not enough spots available' },
                { status: 400 }
              );
            }

            event.currentAttendees += diff;
            registration.numberOfAttendees = data.numberOfAttendees;
          }
        }

        if (data.specialRequests !== undefined) {
          registration.specialRequests = data.specialRequests;
        }

        if (data.dietaryRestrictions !== undefined) {
          registration.dietaryRestrictions = data.dietaryRestrictions;
        }

        if (data.childcare !== undefined) {
          registration.childcare = data.childcare;
        }

        if (data.childrenAges !== undefined) {
          registration.childrenAges = data.childrenAges;
        }

        regs[index] = registration;
        break;
      }
    }

    if (!registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      registration,
      message: 'Registration updated successfully',
    });
  } catch (error) {
    logError('Error updating registration:', error);
    return NextResponse.json(
      { error: 'Failed to update registration' },
      { status: 500 }
    );
  }
}

// DELETE endpoint - cancel registration
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const confirmationCode = searchParams.get('confirmationCode');

    if (!confirmationCode) {
      return NextResponse.json(
        { error: 'Confirmation code required' },
        { status: 400 }
      );
    }

    // Find and remove registration
    let deleted = false;

    for (const [eventId, regs] of Array.from(registrations.entries())) {
      const index = regs.findIndex(r => r.confirmationCode === confirmationCode);
      if (index !== -1) {
        const registration = regs[index];
        const event = events.get(eventId);

        // Update event attendance
        if (event && registration.status === 'confirmed') {
          event.currentAttendees -= registration.numberOfAttendees;

          // Check if we can move someone from waitlist
          const waitlistRegs = regs.filter(r => r.status === 'waitlist');
          for (const waitlistReg of waitlistRegs) {
            if (waitlistReg.numberOfAttendees <= (event.capacity - event.currentAttendees)) {
              waitlistReg.status = 'confirmed';
              event.currentAttendees += waitlistReg.numberOfAttendees;

              // Send notification email (mock)
              try {
                await sendEventRegistrationEmail({
                  to: waitlistReg.email,
                  name: waitlistReg.name,
                  eventTitle: event.title,
                  eventDate: event.date,
                  eventTime: event.time,
                  eventLocation: event.location,
                  confirmationCode: waitlistReg.confirmationCode,
                  numberOfAttendees: waitlistReg.numberOfAttendees,
                  isWaitlist: false,
                });
              } catch (emailError) {
                logError('Error sending waitlist promotion email:', emailError);
              }
              break;
            }
          }
        }

        // Remove registration
        regs.splice(index, 1);
        deleted = true;
        break;
      }
    }

    if (!deleted) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Registration cancelled successfully',
    });
  } catch (error) {
    logError('Error cancelling registration:', error);
    return NextResponse.json(
      { error: 'Failed to cancel registration' },
      { status: 500 }
    );
  }
}