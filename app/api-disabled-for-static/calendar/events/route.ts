import { NextRequest, NextResponse } from 'next/server';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, getDay, isWithinInterval, setHours, setMinutes, parseISO } from 'date-fns';

// Type definitions
interface CalendarEvent {
  id: string;
  title: string;
  type: "service" | "bible-study" | "event" | "meeting" | "youth" | "special";
  date: string;
  startTime: string;
  endTime?: string;
  location: string;
  description?: string;
  recurring?: {
    frequency: "weekly" | "biweekly" | "monthly";
    daysOfWeek?: number[];
    endDate?: string;
  };
  leader?: string;
  capacity?: number;
  attendees?: number;
  category?: string;
  isOnline?: boolean;
  zoomLink?: string;
}

// Weekly recurring events
const recurringEvents: CalendarEvent[] = [
  // Sunday Services
  {
    id: "sun-traditional",
    title: "Traditional Worship Service",
    type: "service",
    date: new Date().toISOString(),
    startTime: "09:00",
    endTime: "10:15",
    location: "Main Sanctuary",
    description: "Traditional hymns and liturgy with organ accompaniment",
    recurring: {
      frequency: "weekly",
      daysOfWeek: [0], // Sunday
    },
    leader: "Pastor John Smith",
    category: "worship",
    capacity: 300,
    attendees: 185,
  },
  {
    id: "sun-contemporary",
    title: "Contemporary Worship Service",
    type: "service",
    date: new Date().toISOString(),
    startTime: "11:00",
    endTime: "12:15",
    location: "Main Sanctuary",
    description: "Modern worship with praise band and multimedia",
    recurring: {
      frequency: "weekly",
      daysOfWeek: [0],
    },
    leader: "Pastor John Smith",
    category: "worship",
    capacity: 300,
    attendees: 225,
  },
  {
    id: "sun-school",
    title: "Sunday School (All Ages)",
    type: "bible-study",
    date: new Date().toISOString(),
    startTime: "10:30",
    endTime: "11:00",
    location: "Education Wing",
    description: "Age-appropriate Bible lessons for children, youth, and adults",
    recurring: {
      frequency: "weekly",
      daysOfWeek: [0],
    },
    category: "education",
    capacity: 150,
    attendees: 95,
  },

  // Monday Groups
  {
    id: "mon-nt-survey",
    title: "New Testament Survey",
    type: "bible-study",
    date: new Date().toISOString(),
    startTime: "19:00",
    endTime: "20:30",
    location: "Room 204",
    description: "Comprehensive study through the New Testament books",
    recurring: {
      frequency: "weekly",
      daysOfWeek: [1],
    },
    leader: "Dr. James Wilson",
    category: "education",
    capacity: 20,
    attendees: 15,
  },

  // Tuesday Groups
  {
    id: "tue-womens",
    title: "Women's Heart to Heart",
    type: "bible-study",
    date: new Date().toISOString(),
    startTime: "10:00",
    endTime: "11:30",
    location: "Room 201",
    description: "Women's fellowship, prayer, and Bible study",
    recurring: {
      frequency: "weekly",
      daysOfWeek: [2],
    },
    leader: "Sarah Miller",
    category: "womens",
    capacity: 15,
    attendees: 7,
  },
  {
    id: "tue-mens",
    title: "Men's Bible Study",
    type: "bible-study",
    date: new Date().toISOString(),
    startTime: "06:00",
    endTime: "07:00",
    location: "Room 103",
    description: "Early morning men's Bible study and accountability",
    recurring: {
      frequency: "weekly",
      daysOfWeek: [2],
    },
    leader: "David Brown",
    category: "mens",
    capacity: 25,
    attendees: 18,
  },

  // Wednesday Services
  {
    id: "wed-prayer",
    title: "Prayer Meeting",
    type: "meeting",
    date: new Date().toISOString(),
    startTime: "18:00",
    endTime: "18:45",
    location: "Prayer Chapel",
    description: "Corporate prayer for our church, community, and world",
    recurring: {
      frequency: "weekly",
      daysOfWeek: [3],
    },
    category: "prayer",
    capacity: 50,
    attendees: 35,
    isOnline: true,
    zoomLink: "https://zoom.us/j/123456789",
  },
  {
    id: "wed-bible",
    title: "Wednesday Night Bible Study",
    type: "bible-study",
    date: new Date().toISOString(),
    startTime: "19:00",
    endTime: "20:30",
    location: "Fellowship Hall",
    description: "Verse-by-verse study through books of the Bible",
    recurring: {
      frequency: "weekly",
      daysOfWeek: [3],
    },
    leader: "Pastor Sarah Johnson",
    category: "education",
    capacity: 75,
    attendees: 52,
  },
  {
    id: "wed-awana",
    title: "AWANA Kids Club",
    type: "youth",
    date: new Date().toISOString(),
    startTime: "18:30",
    endTime: "20:00",
    location: "Children's Wing",
    description: "Bible memorization, games, and activities for K-5th grade",
    recurring: {
      frequency: "weekly",
      daysOfWeek: [3],
    },
    leader: "Children's Ministry Team",
    category: "children",
    capacity: 60,
    attendees: 42,
  },

  // Thursday Groups
  {
    id: "thu-youth",
    title: "Youth Group",
    type: "youth",
    date: new Date().toISOString(),
    startTime: "18:30",
    endTime: "20:30",
    location: "Youth Center",
    description: "Middle and high school worship, teaching, and fellowship",
    recurring: {
      frequency: "weekly",
      daysOfWeek: [4],
    },
    leader: "Youth Pastor Mike",
    category: "youth",
    capacity: 40,
    attendees: 28,
  },
  {
    id: "thu-choir",
    title: "Choir Practice",
    type: "meeting",
    date: new Date().toISOString(),
    startTime: "19:00",
    endTime: "20:30",
    location: "Choir Room",
    description: "Worship team and choir rehearsal for Sunday services",
    recurring: {
      frequency: "weekly",
      daysOfWeek: [4],
    },
    leader: "Music Director Jane",
    category: "worship",
    capacity: 30,
    attendees: 22,
  },
  {
    id: "thu-seniors",
    title: "Senior Saints Bible Study",
    type: "bible-study",
    date: new Date().toISOString(),
    startTime: "10:00",
    endTime: "11:30",
    location: "Library",
    description: "Bible study and fellowship for seniors",
    recurring: {
      frequency: "weekly",
      daysOfWeek: [4],
    },
    leader: "Bob Thompson",
    category: "seniors",
    capacity: 15,
    attendees: 9,
  },

  // Friday Groups
  {
    id: "fri-young-adults",
    title: "Young Adults Bible Study",
    type: "bible-study",
    date: new Date().toISOString(),
    startTime: "19:00",
    endTime: "21:00",
    location: "Coffee House",
    description: "Bible study and fellowship for ages 18-30",
    recurring: {
      frequency: "weekly",
      daysOfWeek: [5],
    },
    leader: "Pastor Mike",
    category: "young-adults",
    capacity: 25,
    attendees: 17,
    isOnline: true,
    zoomLink: "https://zoom.us/j/987654321",
  },

  // Saturday Groups
  {
    id: "sat-mens-breakfast",
    title: "Men's Breakfast & Fellowship",
    type: "meeting",
    date: new Date().toISOString(),
    startTime: "08:00",
    endTime: "10:00",
    location: "Fellowship Hall",
    description: "Monthly men's breakfast with speaker and fellowship",
    recurring: {
      frequency: "monthly",
      daysOfWeek: [6], // First Saturday
    },
    leader: "Men's Ministry Team",
    category: "mens",
    capacity: 50,
    attendees: 35,
  },
];

// Special events (one-time)
const specialEvents: CalendarEvent[] = [
  {
    id: "christmas-eve-2024",
    title: "Christmas Eve Service",
    type: "special",
    date: "2024-12-24T19:00:00",
    startTime: "19:00",
    endTime: "20:30",
    location: "Main Sanctuary",
    description: "Candlelight service with carols and communion",
    leader: "Pastor John Smith",
    category: "holiday",
    capacity: 400,
    attendees: 0,
  },
  {
    id: "christmas-day-2024",
    title: "Christmas Day Service",
    type: "special",
    date: "2024-12-25T10:00:00",
    startTime: "10:00",
    endTime: "11:00",
    location: "Main Sanctuary",
    description: "Christmas morning celebration service",
    leader: "Pastor John Smith",
    category: "holiday",
    capacity: 200,
    attendees: 0,
  },
  {
    id: "new-years-eve-2024",
    title: "New Year's Eve Prayer Service",
    type: "special",
    date: "2024-12-31T23:00:00",
    startTime: "23:00",
    endTime: "00:30",
    location: "Prayer Chapel",
    description: "Prayer and worship to welcome the new year",
    leader: "Ministry Team",
    category: "holiday",
    capacity: 100,
    attendees: 0,
  },
];

// Helper function to generate events for a date range
function generateEventsForRange(startDate: Date, endDate: Date): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  let currentDate = new Date(startDate);

  // Add special events that fall within the range
  specialEvents.forEach(event => {
    const eventDate = parseISO(event.date);
    if (isWithinInterval(eventDate, { start: startDate, end: endDate })) {
      events.push(event);
    }
  });

  // Generate recurring events for each day in the range
  while (currentDate <= endDate) {
    const dayOfWeek = getDay(currentDate);

    recurringEvents.forEach(event => {
      if (event.recurring?.daysOfWeek?.includes(dayOfWeek)) {
        // Check if it's a monthly event and if it's the right week
        if (event.recurring.frequency === 'monthly') {
          const weekOfMonth = Math.ceil(currentDate.getDate() / 7);
          if (weekOfMonth !== 1) return; // Only first week of month
        }

        // Create an instance of the recurring event for this date
        const eventInstance = {
          ...event,
          id: `${event.id}-${currentDate.toISOString().split('T')[0]}`,
          date: currentDate.toISOString(),
        };
        events.push(eventInstance);
      }
    });

    currentDate = addDays(currentDate, 1);
  }

  return events;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const view = searchParams.get('view') || 'month';
    const dateParam = searchParams.get('date');
    const category = searchParams.get('category');
    const type = searchParams.get('type');

    const baseDate = dateParam ? parseISO(dateParam) : new Date();
    let startDate: Date;
    let endDate: Date;

    // Determine date range based on view
    switch (view) {
      case 'week':
        startDate = startOfWeek(baseDate);
        endDate = endOfWeek(baseDate);
        break;
      case 'month':
        startDate = startOfWeek(startOfMonth(baseDate));
        endDate = endOfWeek(endOfMonth(baseDate));
        break;
      case 'day':
        startDate = baseDate;
        endDate = baseDate;
        break;
      default:
        // Default to month view
        startDate = startOfWeek(startOfMonth(baseDate));
        endDate = endOfWeek(endOfMonth(baseDate));
    }

    // Generate events for the date range
    let events = generateEventsForRange(startDate, endDate);

    // Filter by category if specified
    if (category && category !== 'all') {
      events = events.filter(event => event.category === category);
    }

    // Filter by type if specified
    if (type && type !== 'all') {
      events = events.filter(event => event.type === type);
    }

    // Sort events by date and time
    events.sort((a, b) => {
      const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime();
      if (dateCompare !== 0) return dateCompare;

      // If same date, sort by start time
      const timeA = parseInt(a.startTime.replace(':', ''));
      const timeB = parseInt(b.startTime.replace(':', ''));
      return timeA - timeB;
    });

    return NextResponse.json({
      events,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      total: events.length,
    });
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch calendar events' },
      { status: 500 }
    );
  }
}

// POST endpoint to create a new event
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // In a real application, this would save to a database
    // For now, return the created event
    const newEvent: CalendarEvent = {
      id: `event-${Date.now()}`,
      ...data,
      date: new Date(data.date).toISOString(),
      attendees: 0,
    };

    return NextResponse.json({
      success: true,
      event: newEvent,
    });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}