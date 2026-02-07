# Backend Usage Examples

This document shows practical examples of how to use the new backend system in your church website.

## Table of Contents

1. [Configuration Examples](#configuration-examples)
2. [Database Queries](#database-queries)
3. [API Usage](#api-usage)
4. [Service Layer](#service-layer)
5. [Email Notifications](#email-notifications)
6. [Analytics Tracking](#analytics-tracking)
7. [Caching](#caching)
8. [Admin Operations](#admin-operations)

---

## Configuration Examples

### Accessing Site Configuration

```typescript
import siteConfig from '@/config/site-config';

// Get church information
const churchName = siteConfig.site.name;
const churchEmail = siteConfig.contact.email;
const churchPhone = siteConfig.contact.phone;

// Check if feature is enabled
import { isFeatureEnabled } from '@/config/site-config';

if (isFeatureEnabled('enablePrayerWall')) {
  // Show prayer wall
}

// Get event categories
const categories = siteConfig.events.categories;
// Returns: [{ value: 'worship', label: 'Worship', icon: '⛪', color: 'purple' }, ...]

// Get service times
const worshipTime = siteConfig.serviceTimes.sunday.worship.time; // "10:00 AM"
```

### Modifying Configuration

Simply edit `config/site-config.ts`:

```typescript
export const siteConfig = {
  site: {
    name: "My Awesome Church",  // ← Change this
    tagline: "Growing Together", // ← And this
  },

  features: {
    enablePrayerWall: true,      // ← Toggle features
    enableLiveStreaming: false,
  },

  events: {
    defaultMaxCapacity: 150,     // ← Change defaults
  }
};
```

---

## Database Queries

### Using Event Repository

```typescript
import { eventsRepository } from '@/lib/db/repositories/events.repository';

// Get upcoming events
const upcomingEvents = await eventsRepository.findUpcoming(10);

// Get event by slug
const event = await eventsRepository.findBySlug('sunday-worship-service');

// Get events by category
const worshipEvents = await eventsRepository.findAll({
  category: 'worship',
  status: 'upcoming',
  limit: 20
});

// Create new event
const newEvent = await eventsRepository.create({
  title: "Summer BBQ",
  slug: "summer-bbq-2024",
  description: "Join us for food and fellowship!",
  date: new Date('2024-07-15T17:00:00'),
  location: "Church Parking Lot",
  category: "social",
  organizerName: "Events Team",
  organizerEmail: "events@church.org",
  tags: ['summer', 'fellowship', 'food'],
  featured: true,
  requiresRsvp: true,
  maxCapacity: 100,
});

// Update event
await eventsRepository.update(event.id, {
  title: "Updated Title",
  featured: true
});

// Check capacity
const capacity = await eventsRepository.checkCapacity(event.id);
console.log(capacity);
// { available: true, spotsLeft: 75, waitlistAvailable: false }

// Get statistics
const stats = await eventsRepository.getStats();
console.log(stats);
// {
//   totalEvents: 45,
//   upcomingEvents: 12,
//   totalRsvps: 234,
//   averageAttendance: 67.5,
//   popularCategories: [...]
// }
```

### Using Prayer Repository

```typescript
import { prayerRepository } from '@/lib/db/repositories/prayer.repository';

// Get public prayers
const prayers = await prayerRepository.findPublic({
  category: 'healing',
  limit: 20
});

// Submit prayer request
const prayer = await prayerRepository.create({
  name: "Sarah",
  request: "Please pray for my family...",
  category: "healing",
  isAnonymous: false,
  isPublic: true,
  approved: false, // Will need admin approval
});

// Approve prayer (admin)
await prayerRepository.approve(prayer.id);

// Increment prayer count
const count = await prayerRepository.incrementPrayerCount(prayer.id, userId);

// Search prayers
const results = await prayerRepository.search('healing cancer');

// Get trending
const trending = await prayerRepository.findTrending(7, 5);
```

---

## API Usage

### From Frontend Components

```typescript
// Fetch upcoming events
async function fetchUpcomingEvents() {
  const response = await fetch('/api/v2/events?status=upcoming&limit=10');
  const data = await response.json();

  if (data.success) {
    return data.data; // Array of events
  }
}

// Submit RSVP
async function submitRSVP(eventId: string, formData: any) {
  const response = await fetch(`/api/v2/events/${eventId}/rsvp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (data.success) {
    alert(data.data.message); // "RSVP confirmed!"
    return data.data;
  } else {
    alert(data.error.message);
  }
}

// Submit prayer request
async function submitPrayerRequest(formData: any) {
  const response = await fetch('/api/v2/prayer-requests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  return data;
}

// Make donation
async function createDonation(amount: number, fund: string) {
  const response = await fetch('/api/v2/donations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount,
      fund,
      frequency: 'one-time',
      donorEmail: 'user@email.com'
    }),
  });

  const data = await response.json();

  if (data.success) {
    const { clientSecret } = data.data;
    // Use clientSecret with Stripe Elements
  }
}
```

### In Server Components (Next.js)

```typescript
// app/events/page.tsx
import { eventsRepository } from '@/lib/db/repositories/events.repository';

export default async function EventsPage() {
  // Fetch data directly from database
  const events = await eventsRepository.findUpcoming();

  return (
    <div>
      <h1>Upcoming Events</h1>
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
```

---

## Service Layer

### Event Service

```typescript
import { eventService } from '@/lib/services/event.service';

// Create event (handles slug generation, recurring instances)
const event = await eventService.createEvent({
  title: "Weekly Bible Study",
  description: "Join us every Wednesday...",
  date: new Date('2024-03-06T19:00:00'),
  location: "Fellowship Hall",
  category: "education",
  organizerName: "Pastor John",
  organizerEmail: "pastor@church.org",
  isRecurring: true,
  recurringFrequency: "weekly",
  recurringEndDate: new Date('2024-12-31'),
});

// Submit RSVP (handles capacity, waitlist, emails)
const rsvp = await eventService.submitRSVP(eventId, {
  name: "John Doe",
  email: "john@example.com",
  numberOfGuests: 2
});

// Cancel RSVP (handles waitlist promotion)
await eventService.cancelRSVP(confirmationCode);

// Send event reminders (called by cron)
await eventService.sendEventReminders();
```

### Prayer Service

```typescript
import { prayerService } from '@/lib/services/prayer.service';

// Submit prayer (handles moderation, notifications)
const prayer = await prayerService.submitPrayerRequest({
  name: "Anonymous",
  request: "Pray for peace...",
  category: "other",
  isAnonymous: true,
  userEmail: "user@example.com"
});

// Approve prayer (sends notification)
await prayerService.approvePrayerRequest(prayerId);

// Pray for request
await prayerService.prayForRequest(prayerId, userId);

// Send weekly digest
const subscribers = ['email1@example.com', 'email2@example.com'];
await prayerService.sendWeeklyDigest(subscribers);
```

---

## Email Notifications

### Send Custom Email

```typescript
import { sendEmail } from '@/lib/email';

await sendEmail({
  to: 'user@example.com',
  subject: 'Welcome to Our Church!',
  html: '<h1>Welcome!</h1><p>We\'re glad you\'re here.</p>'
});
```

### Use Email Templates

```typescript
import { EventRSVPConfirmation } from '@/lib/email/templates/event-rsvp';

const html = EventRSVPConfirmation({
  name: "John Doe",
  eventTitle: "Sunday Worship",
  eventDate: "March 10, 2024 at 10:00 AM",
  eventLocation: "Main Sanctuary",
  confirmationCode: "ABC123",
  numberOfGuests: 2,
  isWaitlisted: false,
  churchName: "My Church",
  churchEmail: "info@church.org"
});

await sendEmail({
  to: 'john@example.com',
  subject: 'RSVP Confirmed',
  html
});
```

---

## Analytics Tracking

```typescript
import { Analytics } from '@/lib/analytics/tracker';

// Track events
Analytics.event.viewed(eventId);
Analytics.event.rsvped(eventId, userId);

// Track prayers
Analytics.prayer.submitted('healing', userId);
Analytics.prayer.prayed(prayerId, userId);

// Track donations
Analytics.donation.started(100, 'missions');
Analytics.donation.completed(100, 'missions', userId);

// Track sermons
Analytics.sermon.viewed(sermonId);
Analytics.sermon.audioPlayed(sermonId);

// Get analytics summary
import { getAnalyticsSummary } from '@/lib/analytics/tracker';

const stats = await getAnalyticsSummary(30); // Last 30 days
console.log(stats);
// {
//   events: { total: 45, averagePerWeek: 10.5 },
//   rsvps: { total: 234, averagePerEvent: 5.2 },
//   donations: { count: 67, total: 5420, average: 80.90 },
//   ...
// }
```

---

## Caching

### Basic Caching

```typescript
import { cached, CacheKeys } from '@/lib/cache/redis';

// Cache function result
const events = await cached(
  CacheKeys.events.upcoming(10),
  () => eventsRepository.findUpcoming(10),
  60 // Cache for 60 seconds
);

// Invalidate cache
import { CacheInvalidation } from '@/lib/cache/redis';

// When event is updated
await CacheInvalidation.events.all();

// When specific event changes
await CacheInvalidation.events.single(eventId);
```

### Manual Cache Operations

```typescript
import { cache } from '@/lib/cache/redis';

// Set value
await cache.set('my-key', { data: 'value' }, 300); // 5 minutes

// Get value
const value = await cache.get('my-key');

// Delete value
await cache.del('my-key');

// Clear all
await cache.clear();
```

---

## Admin Operations

### Using CLI

```bash
# View statistics
npx tsx scripts/cli.ts stats

# Create admin user
npx tsx scripts/cli.ts admin:create admin@church.org "Admin Name"

# Send test email
npx tsx scripts/cli.ts email:test user@example.com

# Export data
# (Or use API: GET /api/v2/admin/export?type=events&format=csv)

# Send prayer digest
npx tsx scripts/cli.ts prayer:digest -e email1@test.com,email2@test.com
```

### Export Data

```typescript
// From code
const response = await fetch('/api/v2/admin/export?type=events&format=csv', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
});

const csv = await response.text();
// Download or save CSV file
```

### Manage Settings

```typescript
// Get settings
const response = await fetch('/api/v2/admin/settings');
const settings = await response.json();

// Update settings
await fetch('/api/v2/admin/settings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    category: 'site',
    settings: {
      name: 'New Church Name',
      email: 'new@church.org'
    }
  })
});
```

---

## Complete Example: Event Page

```typescript
// app/events/[slug]/page.tsx
import { eventsRepository } from '@/lib/db/repositories/events.repository';
import { notFound } from 'next/navigation';
import { EventRSVPForm } from '@/components/EventRSVPForm';

export default async function EventPage({
  params
}: {
  params: { slug: string }
}) {
  // Fetch event from database
  const event = await eventsRepository.findBySlug(params.slug);

  if (!event) {
    notFound();
  }

  // Check capacity
  const capacity = await eventsRepository.checkCapacity(event.id);

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>

      <div>
        <strong>Date:</strong> {event.date.toLocaleString()}
        <br />
        <strong>Location:</strong> {event.location}
        <br />
        <strong>Attendees:</strong> {event.currentAttendees}
        {event.maxCapacity && ` / ${event.maxCapacity}`}
      </div>

      {event.requiresRsvp && (
        <div>
          {capacity.available ? (
            <EventRSVPForm eventId={event.id} />
          ) : capacity.waitlistAvailable ? (
            <p>Event is full. Join waitlist?</p>
          ) : (
            <p>Event is full</p>
          )}
        </div>
      )}
    </div>
  );
}
```

---

## Tips & Best Practices

1. **Always use repositories** instead of direct Prisma queries for consistency
2. **Use service layer** for complex operations that involve multiple steps
3. **Cache frequently accessed data** with appropriate TTL
4. **Track analytics** for important user actions
5. **Validate all inputs** with Zod schemas
6. **Handle errors properly** with try-catch and user-friendly messages
7. **Use transactions** for operations that must succeed/fail together
8. **Send email confirmations** for important user actions
9. **Check permissions** before allowing admin operations
10. **Monitor performance** and optimize slow queries

---

For more examples, see the code in:
- `lib/services/*.service.ts` - Service layer examples
- `app/api/v2/**/*.ts` - API route examples
- `lib/db/repositories/*.repository.ts` - Database query examples
