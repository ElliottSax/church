# Church Website Backend Setup Guide

## Overview

This guide will help you set up the new improved backend system for your church website. The new architecture includes:

- ✅ **Centralized Configuration** - All settings in one place
- ✅ **Real Database** - PostgreSQL/MongoDB with Prisma ORM
- ✅ **Repository Pattern** - Clean data access layer
- ✅ **Validation** - Input validation with Zod schemas
- ✅ **Error Handling** - Standardized API responses
- ✅ **Type Safety** - Full TypeScript support

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install @prisma/client
npm install -D prisma tsx
```

### 2. Set Up Database

#### Option A: PostgreSQL (Recommended)

1. Install PostgreSQL or use a hosted service (Supabase, Railway, Neon, etc.)

2. Add to `.env.local`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/church_db"
```

#### Option B: MongoDB

1. Use MongoDB Atlas or local MongoDB

2. Update `lib/db/schema.prisma`:
```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

3. Add to `.env.local`:
```env
DATABASE_URL="mongodb://username:password@localhost:27017/church_db"
```

### 3. Initialize Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database (development)
npx prisma db push

# Or create migration (production)
npx prisma migrate dev --name init
```

### 4. Seed Database

```bash
npx tsx lib/db/seed.ts
```

### 5. Update Your Application

Replace old data fetching with new repositories:

#### Before (Old):
```typescript
import { getAllEvents } from '@/lib/events';

const events = await getAllEvents();
```

#### After (New):
```typescript
import { eventsRepository } from '@/lib/db/repositories/events.repository';

const events = await eventsRepository.findAll();
```

## 📁 New File Structure

```
church/
├── config/
│   └── site-config.ts          # Centralized configuration
├── lib/
│   ├── db/
│   │   ├── client.ts           # Prisma client
│   │   ├── schema.prisma       # Database schema
│   │   ├── seed.ts             # Seed data script
│   │   └── repositories/       # Data access layer
│   │       ├── events.repository.ts
│   │       └── prayer.repository.ts
│   ├── validations/            # Zod validation schemas
│   │   ├── event.schema.ts
│   │   └── prayer.schema.ts
│   └── api/                    # API utilities
│       ├── response.ts         # Standardized responses
│       └── middleware.ts       # Auth, validation, etc.
├── app/
│   └── api/
│       └── v2/                 # New API routes
│           ├── events/
│           ├── prayer-requests/
│           └── admin/
```

## 🎯 Configuration Management

### Site Configuration

Edit `config/site-config.ts` to modify:

- Site information (name, logo, contact info)
- Service times
- Map location
- Feature flags (enable/disable features)
- Event settings (categories, capacity defaults)
- Prayer wall settings
- Donation settings
- And much more!

Example:
```typescript
import siteConfig from '@/config/site-config';

// Access configuration
const churchName = siteConfig.site.name;
const isPrayerWallEnabled = siteConfig.features.enablePrayerWall;

// Check feature flags
import { isFeatureEnabled } from '@/config/site-config';
if (isFeatureEnabled('enableLiveStreaming')) {
  // Show live streaming
}
```

### Dynamic Settings (Database)

Some settings can be changed at runtime via the admin panel:

```bash
GET  /api/v2/admin/settings
POST /api/v2/admin/settings
```

## 🔄 Migration Guide

### Migrating from Mock Data to Database

1. **Events**: Replace `lib/events.ts` usage with `eventsRepository`

```typescript
// Old
import { getUpcomingEvents } from '@/lib/events';
const events = await getUpcomingEvents();

// New
import { eventsRepository } from '@/lib/db/repositories/events.repository';
const events = await eventsRepository.findUpcoming();
```

2. **Prayer Requests**: Replace `lib/prayer-wall.ts` usage

```typescript
// Old
import { getPublicPrayerRequests } from '@/lib/prayer-wall';
const requests = await getPublicPrayerRequests();

// New
import { prayerRepository } from '@/lib/db/repositories/prayer.repository';
const requests = await prayerRepository.findPublic();
```

## 📡 New API Routes

### Events API (v2)

```bash
GET    /api/v2/events              # List events (with filters)
POST   /api/v2/events              # Create event (admin)
GET    /api/v2/events/[id]         # Get event
PATCH  /api/v2/events/[id]         # Update event (admin)
DELETE /api/v2/events/[id]         # Delete event (admin)
POST   /api/v2/events/[id]/rsvp    # RSVP to event
```

### Prayer Requests API (v2)

```bash
GET    /api/v2/prayer-requests     # List prayer requests
POST   /api/v2/prayer-requests     # Submit prayer request
PATCH  /api/v2/prayer-requests/[id] # Update (admin)
POST   /api/v2/prayer-requests/[id]/pray # Increment prayer count
```

### Admin API

```bash
GET    /api/v2/admin/settings      # Get settings (admin)
POST   /api/v2/admin/settings      # Update settings (admin)
```

## 🛠️ Development Tools

### Prisma Studio (Database GUI)

```bash
npx prisma studio
```

Opens a web interface at http://localhost:5555 to view and edit database records.

### Database Migrations

```bash
# Create a new migration
npx prisma migrate dev --name add_new_field

# Apply migrations in production
npx prisma migrate deploy

# Reset database (warning: deletes all data)
npx prisma migrate reset
```

## 🔒 Security Features

- **Input Validation**: All API inputs validated with Zod schemas
- **Rate Limiting**: Prevents API abuse
- **Authentication**: NextAuth integration
- **Authorization**: Role-based access control
- **SQL Injection Protection**: Prisma prevents SQL injection
- **XSS Protection**: Input sanitization

## 📊 Repository Pattern Benefits

The repository pattern provides:

1. **Single Responsibility**: Each repository handles one entity
2. **Testability**: Easy to mock for testing
3. **Maintainability**: Business logic separated from data access
4. **Flexibility**: Easy to switch databases

Example usage:
```typescript
import { eventsRepository } from '@/lib/db/repositories/events.repository';

// Simple queries
const allEvents = await eventsRepository.findAll();
const upcomingEvents = await eventsRepository.findUpcoming(10);
const event = await eventsRepository.findById('event_id');

// Filtered queries
const events = await eventsRepository.findAll({
  category: 'worship',
  featured: true,
  limit: 20
});

// Create/Update/Delete
const newEvent = await eventsRepository.create({ /* data */ });
await eventsRepository.update('event_id', { /* data */ });
await eventsRepository.delete('event_id');

// Complex operations
const capacity = await eventsRepository.checkCapacity('event_id');
const stats = await eventsRepository.getStats();
```

## 🎨 Customization

### Adding New Features

1. **Add to Schema** (`lib/db/schema.prisma`)
2. **Create Repository** (`lib/db/repositories/feature.repository.ts`)
3. **Add Validation** (`lib/validations/feature.schema.ts`)
4. **Create API Route** (`app/api/v2/feature/route.ts`)

### Example: Adding Blog

```prisma
// schema.prisma
model BlogPost {
  id        String   @id @default(cuid())
  title     String
  slug      String   @unique
  content   String   @db.Text
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Then run:
```bash
npx prisma db push
```

## 🐛 Troubleshooting

### Prisma Client Not Found
```bash
npx prisma generate
```

### Database Connection Error
- Check `DATABASE_URL` in `.env.local`
- Ensure database server is running
- Check firewall/network settings

### Migration Conflicts
```bash
npx prisma migrate reset
npx prisma db push
```

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Zod Documentation](https://zod.dev)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## 🎉 Next Steps

1. ✅ Set up database connection
2. ✅ Run migrations
3. ✅ Seed sample data
4. ✅ Update API calls to use v2 endpoints
5. ✅ Test all features
6. ✅ Deploy to production

## 💡 Tips

- Use `npx prisma studio` to inspect/edit data visually
- Keep `config/site-config.ts` in version control
- Never commit `.env.local` (use `.env.example` instead)
- Use migrations in production, `db push` in development
- Monitor API rate limits in production

---

Need help? Check the code comments or create an issue!
