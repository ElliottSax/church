# User Management - Quick Start

## 3-Minute Setup

### Step 1: Run Setup Script (1 minute)
```bash
cd /mnt/e/projects/church
./scripts/setup-database.sh
```

### Step 2: Start Dev Server (30 seconds)
```bash
npm run dev
```

### Step 3: Access User Management (30 seconds)
Open in browser:
```
http://localhost:3000/admin/users
```

That's it! You're ready to manage users.

## What You Can Do

### Create a User
1. Click "Create User" button
2. Fill in: Name, Email, Role
3. Click "Create User"

### Search Users
- Type in the search box
- Results update instantly

### Filter by Role
- Select role from dropdown
- Choose: Admin, Moderator, Volunteer, or Member

### Edit a User
1. Click "Edit" button
2. Update fields
3. Click "Update User"

### Delete a User
1. Click "Delete" button
2. Confirm deletion

## Default Test Users

After setup, you'll have:
- `admin@minneapoliscofchrist.org` (Admin)
- `member@test.com` (Member)

## Quick Troubleshooting

**Database error?**
```bash
npx prisma generate --schema=./lib/db/schema.prisma
npx prisma db push --schema=./lib/db/schema.prisma
```

**Page not loading?**
- Make sure dev server is running: `npm run dev`
- Check database is created: `ls -la dev.db`

**Can't create user?**
- Email must be unique
- All required fields must be filled

## Files Created

- `/app/admin/users/page.tsx` - User interface
- `/app/api/v2/admin/users/route.ts` - API endpoints
- `/lib/db/repositories/users.repository.ts` - Database layer

## Features

- User table with search & filters
- Create, edit, delete users
- Pagination (20 users/page)
- Role management
- Activity tracking
- Responsive design

## Next Steps

1. ✅ Run setup script
2. ✅ Test user creation
3. ✅ Try search & filters
4. ⏭️ Enable authentication (see USER_MANAGEMENT_README.md)
5. ⏭️ Customize roles (edit schema.prisma)

## Need More Help?

- Full docs: `USER_MANAGEMENT_README.md`
- Database setup: `DATABASE_SETUP.md`
- Summary: `USER_MANAGEMENT_SUMMARY.md`
