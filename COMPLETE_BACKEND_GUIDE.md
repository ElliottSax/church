# Complete Backend System Guide

## 📚 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [File Structure](#file-structure)
4. [Getting Started](#getting-started)
5. [Features](#features)
6. [API Documentation](#api-documentation)
7. [Admin Tools](#admin-tools)
8. [Customization Guide](#customization-guide)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)

---

## Overview

Your church website now has a **production-ready backend system** with:

- ✅ Real database (PostgreSQL/MongoDB) - Data persists forever
- ✅ Centralized configuration - Change everything in one place
- ✅ Professional API - RESTful endpoints with validation
- ✅ Service layer - Business logic separated from data access
- ✅ Repository pattern - Clean, testable data access
- ✅ Input validation - Zod schemas prevent bad data
- ✅ Email notifications - Automated emails for events, prayers
- ✅ Analytics tracking - Monitor engagement and trends
- ✅ Caching system - Optional Redis support
- ✅ CLI tools - Manage database from command line
- ✅ Admin dashboard - Visual interface for management
- ✅ Migration utilities - Easy transition from old system

---

## Architecture

### Layered Architecture

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│    (Next.js Pages & Components)     │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│           API Routes (v2)           │
│  (Route handlers with validation)   │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         Service Layer               │
│    (Business logic & workflows)     │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Repository Layer               │
│    (Data access abstraction)        │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         Database (Prisma)           │
│   (PostgreSQL/MongoDB/MySQL)        │
└─────────────────────────────────────┘
```

### Data Flow

```
User Request
    ↓
API Route (validates input)
    ↓
Service Layer (business logic)
    ↓
Repository (database queries)
    ↓
Database
    ↓
Response (formatted JSON)
    ↓
User
```

---

## File Structure

```
church/
├── config/
│   └── site-config.ts              # 🎯 MAIN CONFIG FILE
│
├── lib/
│   ├── db/
│   │   ├── client.ts               # Prisma client
│   │   ├── schema.prisma           # Database schema
│   │   ├── seed.ts                 # Sample data
│   │   └── repositories/           # Data access layer
│   │       ├── events.repository.ts
│   │       └── prayer.repository.ts
│   │
│   ├── services/                   # Business logic
│   │   ├── event.service.ts
│   │   └── prayer.service.ts
│   │
│   ├── validations/                # Input validation
│   │   ├── event.schema.ts
│   │   └── prayer.schema.ts
│   │
│   ├── api/                        # API utilities
│   │   ├── response.ts
│   │   └── middleware.ts
│   │
│   ├── cache/                      # Caching system
│   │   └── redis.ts
│   │
│   ├── analytics/                  # Analytics tracking
│   │   └── tracker.ts
│   │
│   └── utils/                      # Utilities
│       └── migration.ts
│
├── app/
│   ├── api/
│   │   └── v2/                     # New API routes
│   │       ├── events/
│   │       ├── prayer-requests/
│   │       └── admin/
│   │
│   └── admin/
│       └── dashboard/              # Admin interface
│           └── page.tsx
│
├── components/
│   └── admin/                      # Admin components
│       ├── StatsCard.tsx
│       └── EventsTable.tsx
│
└── scripts/
    └── cli.ts                      # CLI management tool
```

---

## Getting Started

### 1. Install Dependencies

```bash
npm install @prisma/client
npm install -D prisma tsx
```

### 2. Configure Database

Add to `.env.local`:

```env
# PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/church_db"

# Or MongoDB
DATABASE_URL="mongodb://user:password@localhost:27017/church_db"

# Or MySQL
DATABASE_URL="mysql://user:password@localhost:3306/church_db"
```

### 3. Initialize Database

```bash
# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma db push

# Seed with sample data
npx tsx lib/db/seed.ts
```

### 4. Test Setup

```bash
# Open database GUI
npx prisma studio

# Check stats
npx tsx scripts/cli.ts stats

# Run dev server
npm run dev
```

---

## Features

### 1. Centralized Configuration

**File**: `config/site-config.ts`

Everything configurable in one place:

```typescript
export const siteConfig = {
  site: {
    name: "Your Church Name",        // ← Edit here
    email: "info@church.org",
    phone: "(555) 123-4567",
  },

  serviceTimes: {
    sunday: {
      worship: { time: "10:00 AM" }, // ← Edit here
    }
  },

  features: {
    enablePrayerWall: true,          // ← Toggle features
    enableOnlineGiving: true,
    enableLiveStreaming: false,
  },

  events: {
    defaultMaxCapacity: 100,         // ← Event defaults
    categories: [...],
  },

  // ... and much more!
};
```

### 2. Database Layer

**Prisma ORM** provides:
- Type-safe queries
- Automatic migrations
- Database GUI (Prisma Studio)
- Support for PostgreSQL, MongoDB, MySQL

**Example Usage**:
```typescript
import { eventsRepository } from '@/lib/db/repositories/events.repository';

// Get upcoming events
const events = await eventsRepository.findUpcoming(10);

// Create event
const event = await eventsRepository.create({
  title: "New Event",
  date: new Date(),
  // ...
});
```

### 3. Service Layer

Business logic separated from data access:

```typescript
import { eventService } from '@/lib/services/event.service';

// Submit RSVP (handles email, waitlist, capacity)
const rsvp = await eventService.submitRSVP(eventId, {
  name: "John Doe",
  email: "john@example.com"
});

// Send event reminders
await eventService.sendEventReminders();
```

### 4. API Routes (v2)

Modern RESTful API with:
- Input validation (Zod)
- Error handling
- Rate limiting
- Authentication
- Pagination

**Example**:
```bash
GET  /api/v2/events?category=worship&limit=20
POST /api/v2/events (admin only)
POST /api/v2/events/[id]/rsvp
```

### 5. Input Validation

All inputs validated with Zod schemas:

```typescript
import { createEventSchema } from '@/lib/validations/event.schema';

// Validates automatically
const data = createEventSchema.parse(userInput);
```

### 6. Email Notifications

Automated emails for:
- RSVP confirmations
- Event reminders
- Prayer request approvals
- Weekly prayer digest

### 7. Analytics

Track important metrics:

```typescript
import { Analytics } from '@/lib/analytics/tracker';

// Track events
Analytics.event.rsvped(eventId, userId);
Analytics.prayer.submitted(category, userId);
Analytics.donation.completed(amount, fund, userId);

// Get summary
const stats = await getAnalyticsSummary(30);
```

### 8. Caching

Optional Redis caching for performance:

```typescript
import { cached, CacheKeys } from '@/lib/cache/redis';

// Cached function
const events = await cached(
  CacheKeys.events.upcoming(),
  () => eventsRepository.findUpcoming(),
  60 // TTL in seconds
);
```

### 9. CLI Tools

Manage from command line:

```bash
# Seed database
npx tsx scripts/cli.ts seed

# Show stats
npx tsx scripts/cli.ts stats

# Backup database
npx tsx scripts/cli.ts backup -o backup.json

# Create admin user
npx tsx scripts/cli.ts admin:create admin@church.org "Admin User"

# Send prayer digest
npx tsx scripts/cli.ts prayer:digest -e user1@email.com,user2@email.com

# Clear cache
npx tsx scripts/cli.ts cache:clear
```

### 10. Admin Dashboard

Visual interface at `/admin/dashboard`:
- Overview statistics
- Upcoming events
- Pending prayer requests
- Popular content
- Quick actions

---

## API Documentation

### Events API

**List Events**
```http
GET /api/v2/events?category=worship&limit=20&offset=0

Response:
{
  "success": true,
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45
  }
}
```

**Create Event** (Admin)
```http
POST /api/v2/events
Content-Type: application/json

{
  "title": "New Event",
  "slug": "new-event",
  "description": "Event description",
  "date": "2024-03-01T10:00:00",
  "location": "Main Hall",
  "category": "worship",
  "organizerName": "Pastor John",
  "organizerEmail": "pastor@church.org"
}

Response:
{
  "success": true,
  "data": { ... }
}
```

**RSVP to Event**
```http
POST /api/v2/events/[id]/rsvp
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "numberOfGuests": 2
}
```

### Prayer Requests API

**List Prayer Requests**
```http
GET /api/v2/prayer-requests?category=healing&limit=20
```

**Submit Prayer Request**
```http
POST /api/v2/prayer-requests
Content-Type: application/json

{
  "name": "John Doe",
  "request": "Please pray for...",
  "category": "healing",
  "isAnonymous": false,
  "userEmail": "john@example.com"
}
```

### Admin API

**Get Settings** (Admin)
```http
GET /api/v2/admin/settings
```

**Update Settings** (Admin)
```http
POST /api/v2/admin/settings
Content-Type: application/json

{
  "category": "site",
  "settings": {
    "name": "New Church Name",
    "email": "new@church.org"
  }
}
```

---

## Admin Tools

### Prisma Studio

Visual database editor:

```bash
npx prisma studio
```

Opens at http://localhost:5555

Features:
- View all tables
- Edit records
- Filter and search
- Create/delete records

### CLI Tool

Command-line management:

```bash
# All commands
npx tsx scripts/cli.ts --help

# Useful commands
npx tsx scripts/cli.ts stats              # Statistics
npx tsx scripts/cli.ts backup             # Backup DB
npx tsx scripts/cli.ts migrate            # Migrate data
npx tsx scripts/cli.ts email:test <email> # Test email
```

### Admin Dashboard

Access at `/admin/dashboard`:

Features:
- Real-time statistics
- Event management
- Prayer request moderation
- User management
- Quick actions

---

## Customization Guide

### Change Church Information

Edit `config/site-config.ts`:

```typescript
export const siteConfig = {
  site: {
    name: "Your Church Name",     // ← Change
    email: "info@yourchurch.org",
    phone: "(555) 123-4567",
    address: {
      street: "123 Main St",
      city: "Your City",
      state: "ST",
      zip: "12345"
    }
  }
};
```

### Add Event Category

Edit `config/site-config.ts`:

```typescript
events: {
  categories: [
    // ... existing categories
    { value: 'retreat', label: 'Retreat', icon: '🏕️', color: 'teal' },
  ]
}
```

Then update Prisma schema if needed:

```prisma
// lib/db/schema.prisma
enum EventCategory {
  // ... existing
  retreat
}
```

Run: `npx prisma db push`

### Add Custom Field

1. Update Prisma schema:

```prisma
model Event {
  // ... existing fields
  customField  String?
}
```

2. Run migration:
```bash
npx prisma db push
```

3. Update validation schema:
```typescript
// lib/validations/event.schema.ts
export const createEventSchema = z.object({
  // ... existing
  customField: z.string().optional(),
});
```

### Add New Feature

1. **Create database model** (`lib/db/schema.prisma`)
2. **Create repository** (`lib/db/repositories/feature.repository.ts`)
3. **Create service** (`lib/services/feature.service.ts`)
4. **Create validation** (`lib/validations/feature.schema.ts`)
5. **Create API route** (`app/api/v2/feature/route.ts`)
6. **Create UI components**

---

## Deployment

### Environment Variables

Required in production:

```env
# Database
DATABASE_URL="postgresql://..."

# Auth
NEXTAUTH_URL="https://yourchurch.org"
NEXTAUTH_SECRET="<generate-secure-secret>"

# Email (SendGrid)
SENDGRID_API_KEY="SG...."
SENDGRID_FROM_EMAIL="noreply@yourchurch.org"

# Stripe (optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-..."

# Redis (optional)
REDIS_URL="redis://..."
```

### Database Migrations

Production deployment:

```bash
# Run migrations
npx prisma migrate deploy

# Generate client
npx prisma generate
```

### Vercel Deployment

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

Vercel will automatically:
- Install dependencies
- Run build
- Deploy

### Manual Deployment

```bash
# Build
npm run build

# Start production server
npm start
```

---

## Troubleshooting

### Database Issues

**Connection Error**
```bash
# Check DATABASE_URL in .env.local
# Ensure database is running
# Check network/firewall
```

**Schema Out of Sync**
```bash
npx prisma db push
npx prisma generate
```

**Migration Conflicts**
```bash
npx prisma migrate reset
npx tsx lib/db/seed.ts
```

### Prisma Client Issues

**Client Not Found**
```bash
npx prisma generate
```

**Type Errors**
```bash
# Regenerate after schema changes
npx prisma generate
```

### API Issues

**Validation Errors**
- Check request body matches schema
- Review validation error details

**Authentication Errors**
- Ensure user is logged in
- Check role permissions

**Rate Limiting**
- Wait before retrying
- Adjust limits in `lib/api/middleware.ts`

### Performance Issues

**Slow Queries**
- Add database indexes
- Enable caching
- Use pagination

**High Memory Usage**
- Implement Redis caching
- Optimize queries
- Use database connection pooling

---

## Best Practices

### Security

- ✅ Validate all inputs
- ✅ Use parameterized queries (Prisma does this)
- ✅ Implement rate limiting
- ✅ Sanitize user content
- ✅ Use HTTPS in production
- ✅ Keep dependencies updated
- ✅ Use environment variables for secrets

### Performance

- ✅ Use caching for frequently accessed data
- ✅ Implement pagination
- ✅ Optimize database queries
- ✅ Use CDN for static assets
- ✅ Enable compression

### Maintainability

- ✅ Use TypeScript everywhere
- ✅ Follow consistent naming conventions
- ✅ Write clear comments
- ✅ Keep functions small and focused
- ✅ Use the repository pattern
- ✅ Separate business logic from data access

---

## Support & Resources

### Documentation

- Prisma: https://www.prisma.io/docs
- Next.js: https://nextjs.org/docs
- Zod: https://zod.dev
- TypeScript: https://www.typescriptlang.org/docs

### Tools

- Prisma Studio: `npx prisma studio`
- CLI Tool: `npx tsx scripts/cli.ts --help`
- Database GUI: Use Prisma Studio or TablePlus/DBeaver

### Helpful Commands

```bash
# Development
npm run dev                    # Start dev server
npx prisma studio             # Open database GUI

# Database
npx prisma db push            # Update schema (dev)
npx prisma migrate dev        # Create migration
npx prisma generate           # Regenerate client

# Management
npx tsx scripts/cli.ts stats  # View statistics
npx tsx lib/db/seed.ts        # Seed data

# Deployment
npm run build                 # Build for production
npx prisma migrate deploy     # Run migrations
```

---

**🎉 You now have a world-class backend system for your church website!**

For additional help, refer to:
- `BACKEND_SETUP_GUIDE.md` - Setup instructions
- `IMPROVEMENTS_SUMMARY.md` - List of improvements
- `QUICK_REFERENCE.md` - Common tasks
- Code comments in each file
