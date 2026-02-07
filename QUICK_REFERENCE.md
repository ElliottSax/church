# Quick Reference Guide

## 🔧 Common Tasks

### Modify Church Information
Edit `config/site-config.ts`:
```typescript
export const siteConfig = {
  site: {
    name: "Your Church Name",    // ← Change here
    tagline: "Your Tagline",     // ← Change here
    email: "email@church.org",   // ← Change here
    phone: "(555) 123-4567",     // ← Change here
  }
}
```

### Change Service Times
Edit `config/site-config.ts`:
```typescript
serviceTimes: {
  sunday: {
    worship: {
      time: "10:00 AM",  // ← Change here
      description: "Sunday Worship Service",
    }
  }
}
```

### Enable/Disable Features
Edit `config/site-config.ts`:
```typescript
features: {
  enableOnlineGiving: true,     // ← Toggle features
  enablePrayerWall: true,
  enableLiveStreaming: false,
}
```

### Add Event Category
Edit `config/site-config.ts`:
```typescript
events: {
  categories: [
    // Add new category here
    { value: 'retreat', label: 'Retreat', icon: '🏕️', color: 'teal' },
  ]
}
```

### View/Edit Database
```bash
npx prisma studio
```
Opens GUI at http://localhost:5555

### Create New Event (via API)
```bash
POST /api/v2/events
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
```

### Get All Events
```bash
GET /api/v2/events?category=worship&limit=20
```

### Submit Prayer Request
```bash
POST /api/v2/prayer-requests
{
  "name": "John Doe",
  "request": "Please pray for...",
  "category": "healing",
  "isAnonymous": false,
  "isPublic": true
}
```

---

## 📁 File Locations

### Configuration
- **Main Config**: `config/site-config.ts`
- **Environment**: `.env.local`
- **Database Schema**: `lib/db/schema.prisma`

### Database
- **Prisma Client**: `lib/db/client.ts`
- **Seed Data**: `lib/db/seed.ts`
- **Event Repository**: `lib/db/repositories/events.repository.ts`
- **Prayer Repository**: `lib/db/repositories/prayer.repository.ts`

### Validation
- **Event Schemas**: `lib/validations/event.schema.ts`
- **Prayer Schemas**: `lib/validations/prayer.schema.ts`

### API Utilities
- **Response Helpers**: `lib/api/response.ts`
- **Middleware**: `lib/api/middleware.ts`

### API Routes (v2)
- **Events**: `app/api/v2/events/route.ts`
- **Prayer Requests**: `app/api/v2/prayer-requests/route.ts`
- **Admin Settings**: `app/api/v2/admin/settings/route.ts`

---

## 🗄️ Database Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create/Update database schema (dev)
npx prisma db push

# Create migration (production)
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Reset database (WARNING: Deletes all data!)
npx prisma migrate reset

# Open database GUI
npx prisma studio

# Seed database with sample data
npx tsx lib/db/seed.ts
```

---

## 🔐 Authentication

### Check if User is Logged In
```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const session = await getServerSession(authOptions);
if (session?.user) {
  // User is logged in
}
```

### Require Admin Access
```typescript
import { requireAdmin } from '@/lib/api/middleware';

export async function GET(request: NextRequest) {
  await requireAdmin(request); // Throws error if not admin
  // Admin-only code here
}
```

---

## 📊 Using Repositories

### Events
```typescript
import { eventsRepository } from '@/lib/db/repositories/events.repository';

// Get all events
const events = await eventsRepository.findAll();

// Get upcoming events
const upcoming = await eventsRepository.findUpcoming(10);

// Get event by ID
const event = await eventsRepository.findById('event_id');

// Get event by slug
const event = await eventsRepository.findBySlug('event-slug');

// Create event
const newEvent = await eventsRepository.create({
  title: "New Event",
  slug: "new-event",
  // ... other fields
});

// Update event
await eventsRepository.update('event_id', {
  title: "Updated Title"
});

// Delete event
await eventsRepository.delete('event_id');

// Check capacity
const capacity = await eventsRepository.checkCapacity('event_id');

// Get statistics
const stats = await eventsRepository.getStats();
```

### Prayer Requests
```typescript
import { prayerRepository } from '@/lib/db/repositories/prayer.repository';

// Get public approved requests
const requests = await prayerRepository.findPublic();

// Get all requests (admin)
const all = await prayerRepository.findAll();

// Create prayer request
const request = await prayerRepository.create({
  name: "John Doe",
  request: "Please pray for...",
  category: "healing",
  isAnonymous: false,
  isPublic: true,
  approved: false
});

// Approve request
await prayerRepository.approve('request_id');

// Increment prayer count
const count = await prayerRepository.incrementPrayerCount('request_id', 'user_id');

// Search requests
const results = await prayerRepository.search('healing');

// Get trending
const trending = await prayerRepository.findTrending(7, 5);

// Get statistics
const stats = await prayerRepository.getStats();
```

---

## ✅ Validation Schemas

### Validate Event Data
```typescript
import { createEventSchema } from '@/lib/validations/event.schema';

try {
  const validated = createEventSchema.parse(data);
  // Data is valid
} catch (error) {
  // Validation failed
  console.log(error.errors);
}
```

### In API Routes
```typescript
import { validateBody } from '@/lib/api/middleware';
import { createEventSchema } from '@/lib/validations/event.schema';

export async function POST(request: NextRequest) {
  const data = await validateBody(request, createEventSchema);
  // data is validated and typed
}
```

---

## 🎨 API Response Helpers

```typescript
import {
  apiSuccess,
  apiError,
  apiCreated,
  apiNotFound,
  apiUnauthorized,
  apiForbidden,
  apiPaginated,
  apiServerError,
  withErrorHandling
} from '@/lib/api/response';

// Success response
return apiSuccess({ message: "Success!" });

// Created response (201)
return apiCreated(newResource);

// Error response
return apiError("Something went wrong", "ERROR_CODE");

// Not found (404)
return apiNotFound("Resource");

// Unauthorized (401)
return apiUnauthorized();

// Forbidden (403)
return apiForbidden();

// Paginated response
return apiPaginated(data, page, limit, total);

// Server error (500)
return apiServerError("Error message");

// Wrap handler with error handling
export const GET = withErrorHandling(async (request) => {
  // Your code - errors are caught automatically
});
```

---

## 🚀 Development Workflow

1. **Make changes** to code
2. **Update database** if schema changed:
   ```bash
   npx prisma db push
   ```
3. **Restart dev server**:
   ```bash
   npm run dev
   ```
4. **Test changes** in browser or API client
5. **Check database** in Prisma Studio if needed

---

## 🐛 Troubleshooting

### "Prisma Client not found"
```bash
npx prisma generate
```

### "Database connection failed"
- Check `DATABASE_URL` in `.env.local`
- Ensure database server is running

### "Migration failed"
```bash
npx prisma migrate reset
npx prisma db push
```

### "Port already in use"
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Clear Next.js cache
```bash
rm -rf .next
npm run dev
```

---

## 📖 Learn More

- Main Guide: `BACKEND_SETUP_GUIDE.md`
- Improvements: `IMPROVEMENTS_SUMMARY.md`
- Prisma Docs: https://www.prisma.io/docs
- Next.js Docs: https://nextjs.org/docs

---

**Pro Tips**:
- Use Prisma Studio for quick database edits
- Keep `config/site-config.ts` as single source of truth
- Always validate input with Zod schemas
- Use repositories instead of direct Prisma queries
- Check API responses match the standard format
- Test with different user roles (admin, member, guest)
