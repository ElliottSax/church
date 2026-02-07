# 🎉 Church Website - Modern Backend System

## What's New?

Your church website now has a **professional, production-ready backend** with everything easily modifiable through configuration files and a database.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install @prisma/client
npm install -D prisma tsx
```

### 2. Set Up Database
Add to `.env.local`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/church_db"
```

### 3. Initialize
```bash
npx prisma generate
npx prisma db push
npx tsx lib/db/seed.ts
```

### 4. Explore
```bash
# Open database GUI
npx prisma studio

# View statistics
npx tsx scripts/cli.ts stats

# Start development
npm run dev
```

## 📁 Key Files

### To Modify Church Settings

| What to Change | File to Edit |
|---|---|
| Church name, contact info | `config/site-config.ts` |
| Service times | `config/site-config.ts` |
| Enable/disable features | `config/site-config.ts` |
| Event categories | `config/site-config.ts` |
| Prayer wall settings | `config/site-config.ts` |
| Donation amounts | `config/site-config.ts` |
| Map location | `config/site-config.ts` |

### Database

| Task | Command |
|---|---|
| View/edit data | `npx prisma studio` |
| Add sample data | `npx tsx lib/db/seed.ts` |
| Backup database | `npx tsx scripts/cli.ts backup` |
| View statistics | `npx tsx scripts/cli.ts stats` |

## 🎯 Major Improvements

### Before ❌
- Mock data in memory (lost on restart)
- Settings hardcoded throughout code
- No input validation
- Inconsistent error handling
- No admin interface
- No email notifications
- Manual data management

### After ✅
- Real database (PostgreSQL/MongoDB)
- Centralized configuration
- Input validation (Zod schemas)
- Professional error handling
- Admin dashboard
- Automated emails
- CLI management tools
- Analytics tracking
- Caching support
- Migration utilities

## 📚 Documentation

| Document | Purpose |
|---|---|
| `BACKEND_SETUP_GUIDE.md` | **Start here** - Complete setup instructions |
| `COMPLETE_BACKEND_GUIDE.md` | In-depth guide to all features |
| `IMPROVEMENTS_SUMMARY.md` | List of all improvements made |
| `QUICK_REFERENCE.md` | Common tasks and commands |

## 🛠️ Common Tasks

### Change Church Name
Edit `config/site-config.ts`:
```typescript
site: {
  name: "Your Church Name", // ← Change here
}
```

### Add Event
Two ways:

**1. Using Prisma Studio (Visual)**
```bash
npx prisma studio
# Go to Event table → Add Record
```

**2. Using API**
```bash
POST /api/v2/events
{
  "title": "New Event",
  "date": "2024-03-01T10:00:00",
  "location": "Main Hall",
  ...
}
```

### View Database
```bash
npx prisma studio
# Opens at http://localhost:5555
```

### Backup Database
```bash
npx tsx scripts/cli.ts backup -o backup.json
```

### Create Admin User
```bash
npx tsx scripts/cli.ts admin:create admin@church.org "Admin Name"
```

### Send Test Email
```bash
npx tsx scripts/cli.ts email:test your@email.com
```

## 🎨 What You Can Easily Modify

### 1. Site Information
- Church name, tagline
- Contact information (email, phone, address)
- Social media links
- Logo and favicon paths

### 2. Service Times
- Sunday worship times
- Bible study times
- Any custom service times

### 3. Features On/Off
- Prayer wall
- Online giving
- Live streaming
- Member portal
- Event RSVP
- Volunteer signup

### 4. Event Settings
- Default capacity
- RSVP reminder days
- Event categories (add/remove)
- Category colors and icons

### 5. Prayer Wall
- Require approval (yes/no)
- Allow anonymous requests
- Maximum request length
- Categories

### 6. Giving/Donations
- Default donation amounts
- Available funds
- Recurring options

### 7. Email Notifications
- Welcome emails
- Event reminders
- Prayer updates
- Newsletter
- Donation receipts

## 🔧 CLI Commands

```bash
# Database
npx tsx scripts/cli.ts seed              # Add sample data
npx tsx scripts/cli.ts migrate           # Migrate from old system
npx tsx scripts/cli.ts backup            # Backup to JSON
npx tsx scripts/cli.ts stats             # View statistics

# Administration
npx tsx scripts/cli.ts admin:create      # Create admin user
npx tsx scripts/cli.ts cache:clear       # Clear caches

# Communication
npx tsx scripts/cli.ts email:test        # Send test email
npx tsx scripts/cli.ts prayer:digest     # Send prayer digest
npx tsx scripts/cli.ts events:remind     # Send event reminders

# Help
npx tsx scripts/cli.ts --help            # Show all commands
```

## 📊 Admin Dashboard

Access at `/admin/dashboard` (requires admin login)

Features:
- Real-time statistics
- Upcoming events overview
- Pending prayer request approvals
- Popular content analytics
- Quick action buttons
- User management
- Settings management

## 🔌 API Endpoints (v2)

### Events
```
GET    /api/v2/events              # List events
POST   /api/v2/events              # Create event (admin)
GET    /api/v2/events/[id]         # Get event
PATCH  /api/v2/events/[id]         # Update event (admin)
DELETE /api/v2/events/[id]         # Delete event (admin)
POST   /api/v2/events/[id]/rsvp    # RSVP to event
```

### Prayer Requests
```
GET    /api/v2/prayer-requests     # List requests
POST   /api/v2/prayer-requests     # Submit request
```

### Admin
```
GET    /api/v2/admin/settings      # Get settings (admin)
POST   /api/v2/admin/settings      # Update settings (admin)
```

All endpoints return standardized JSON:
```json
{
  "success": true,
  "data": { ... },
  "meta": { "page": 1, "limit": 20, "total": 45 }
}
```

## 💡 Pro Tips

1. **Always use Prisma Studio** for quick database edits - it's visual and safe
2. **Keep `config/site-config.ts` as your single source of truth** - don't hardcode settings elsewhere
3. **Use the CLI tool** for routine tasks - it's faster than manual operations
4. **Backup regularly** with `npx tsx scripts/cli.ts backup`
5. **Test emails** before sending to congregation
6. **Monitor analytics** to understand what's working

## 🚀 Next Steps

1. ✅ Set up your database (PostgreSQL recommended)
2. ✅ Update `config/site-config.ts` with your church info
3. ✅ Run migrations: `npx prisma db push`
4. ✅ Seed sample data: `npx tsx lib/db/seed.ts`
5. ✅ Explore with Prisma Studio
6. ✅ Test API endpoints
7. ✅ Customize as needed
8. ✅ Deploy to production

## 📞 Need Help?

1. **Check the documentation** in the files listed above
2. **Look at code comments** - all files are well-documented
3. **Use Prisma Studio** to explore the database structure
4. **Run `--help` on CLI commands** for usage information

## 🎓 Learning Resources

- **Prisma**: https://www.prisma.io/docs
- **Next.js**: https://nextjs.org/docs
- **TypeScript**: https://www.typescriptlang.org/docs
- **Zod**: https://zod.dev

---

## Summary of Files Created

### Configuration (1 file)
- `config/site-config.ts` - Everything configurable

### Database (4 files)
- `lib/db/schema.prisma` - Database structure
- `lib/db/client.ts` - Prisma client
- `lib/db/seed.ts` - Sample data
- `lib/db/repositories/` - Data access (2 files)

### Business Logic (2 files)
- `lib/services/event.service.ts` - Event operations
- `lib/services/prayer.service.ts` - Prayer operations

### Validation (2 files)
- `lib/validations/event.schema.ts`
- `lib/validations/prayer.schema.ts`

### API Layer (2 files)
- `lib/api/response.ts` - Response formatting
- `lib/api/middleware.ts` - Auth, validation, rate limiting

### API Routes (4 files)
- `app/api/v2/events/route.ts`
- `app/api/v2/events/[id]/route.ts`
- `app/api/v2/events/[id]/rsvp/route.ts`
- `app/api/v2/prayer-requests/route.ts`
- `app/api/v2/admin/settings/route.ts`

### Additional Features (4 files)
- `lib/cache/redis.ts` - Caching system
- `lib/analytics/tracker.ts` - Analytics
- `lib/utils/migration.ts` - Migration tools
- `scripts/cli.ts` - CLI management

### Admin Interface (3 files)
- `app/admin/dashboard/page.tsx` - Dashboard
- `components/admin/StatsCard.tsx` - Statistics card
- `components/admin/EventsTable.tsx` - Event management

### Documentation (4 files)
- `BACKEND_SETUP_GUIDE.md` - Setup guide
- `COMPLETE_BACKEND_GUIDE.md` - Complete reference
- `IMPROVEMENTS_SUMMARY.md` - All improvements
- `QUICK_REFERENCE.md` - Quick commands

**Total: 26+ new files** 🎉

---

**Ready to use!** Your church website now has a professional backend that's easy to manage and modify.

Start with `BACKEND_SETUP_GUIDE.md` for detailed setup instructions.
