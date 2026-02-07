# Database Setup Guide

This guide will help you set up the database for user management and other dynamic features.

## Prerequisites

- Node.js installed
- Church project already set up

## Step 1: Install Prisma

```bash
cd /mnt/e/projects/church
npm install prisma @prisma/client
npm install -D prisma
```

## Step 2: Initialize Prisma

The Prisma schema is already created at `/lib/db/schema.prisma`.

## Step 3: Update .env.local

Add the following to your `.env.local` file:

```env
# Database
DATABASE_URL="file:./dev.db"
```

For production, you can use PostgreSQL:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/church_db"
```

## Step 4: Generate Prisma Client

```bash
npx prisma generate --schema=./lib/db/schema.prisma
```

## Step 5: Create Database

For SQLite (development):
```bash
npx prisma db push --schema=./lib/db/schema.prisma
```

For production with migrations:
```bash
npx prisma migrate dev --schema=./lib/db/schema.prisma --name init
```

## Step 6: Seed Initial Data (Optional)

You can create a seed script to add initial admin users:

```javascript
// scripts/seed-users.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.create({
    data: {
      email: 'admin@minneapoliscofchrist.org',
      name: 'Admin User',
      role: 'admin',
    },
  });

  console.log('Created admin user:', admin);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
```

Run it with:
```bash
node scripts/seed-users.js
```

## Step 7: Access User Management

Once the database is set up, you can access the user management interface at:
```
http://localhost:3000/admin/users
```

## Features Available

- User listing with search and filters
- Create new users with roles (admin, moderator, volunteer, member)
- Edit user details and roles
- Delete users
- View user activity (RSVPs, prayer requests, donations, volunteer signups)
- Pagination for large user lists

## API Endpoints

The following API endpoints are now available:

- `GET /api/v2/admin/users` - List all users with filters
- `POST /api/v2/admin/users` - Create new user
- `GET /api/v2/admin/users/[id]` - Get user by ID
- `PUT /api/v2/admin/users/[id]` - Update user
- `DELETE /api/v2/admin/users/[id]` - Delete user

## Troubleshooting

### Error: PrismaClient is unable to be run in the browser

Make sure all database calls are made in server-side code (API routes, server components).

### Error: Invalid `prisma.user.findMany()` invocation

Run `npx prisma generate --schema=./lib/db/schema.prisma` to regenerate the Prisma client.

### Database locked error (SQLite)

This can happen with SQLite in development. Restart your dev server or delete `dev.db` and re-run migrations.

## Production Considerations

For production deployment:

1. Use PostgreSQL instead of SQLite
2. Set up proper database backups
3. Enable authentication middleware in API routes (uncomment `requireAuth` calls)
4. Use environment variables for sensitive data
5. Set up rate limiting properly (consider using Upstash)

## Next Steps

After setting up the database:

1. Enable NextAuth for proper authentication
2. Uncomment the `requireAuth` middleware in user API routes
3. Add user profile pages
4. Implement password reset functionality
5. Add email verification for new users
