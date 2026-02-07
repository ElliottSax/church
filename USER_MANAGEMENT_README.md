# User Management System

A comprehensive user management interface for the church website admin panel.

## Overview

This system provides a full-featured user management interface with role-based access control, search, filtering, and CRUD operations.

## Features

### User Interface (`/app/admin/users/page.tsx`)

- **User Listing**: Display all users in a paginated table
- **Search**: Search users by name or email
- **Filter by Role**: Filter users by their assigned role (admin, moderator, volunteer, member)
- **Create Users**: Add new users with a modal form
- **Edit Users**: Update user information and roles
- **Delete Users**: Remove users with confirmation
- **User Statistics**: View activity counts (RSVPs, prayer requests, donations, volunteer signups)
- **Pagination**: Navigate through large user lists efficiently

### API Endpoints

#### List Users
```
GET /api/v2/admin/users
```

Query Parameters:
- `limit` (number): Number of users per page (default: 20)
- `offset` (number): Offset for pagination (default: 0)
- `role` (string): Filter by role (admin, moderator, volunteer, member)
- `search` (string): Search by name or email

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe",
      "phone": "+1234567890",
      "role": "member",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "_count": {
        "rsvps": 5,
        "prayerRequests": 2,
        "donations": 3,
        "volunteerSignups": 1
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

#### Create User
```
POST /api/v2/admin/users
```

Request Body:
```json
{
  "email": "newuser@example.com",
  "name": "New User",
  "phone": "+1234567890",
  "role": "member"
}
```

#### Get User by ID
```
GET /api/v2/admin/users/[id]
```

#### Update User
```
PUT /api/v2/admin/users/[id]
```

Request Body:
```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "phone": "+0987654321",
  "role": "moderator"
}
```

#### Delete User
```
DELETE /api/v2/admin/users/[id]
```

### Database Schema

The User model includes:

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  phone         String?
  image         String?
  role          String    @default("member")
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  accounts      Account[]
  sessions      Session[]
  rsvps         RSVP[]
  prayerRequests PrayerRequest[]
  interactions  PrayerInteraction[]
  donations     Donation[]
  volunteerSignups VolunteerSignup[]
  volunteerAssignments VolunteerAssignment[]
}
```

### User Roles

- **admin**: Full system access, can manage all users
- **moderator**: Can moderate content and manage events
- **volunteer**: Has access to volunteer management features
- **member**: Basic member access

## File Structure

```
/mnt/e/projects/church/
├── app/
│   ├── admin/
│   │   └── users/
│   │       └── page.tsx              # User management UI
│   └── api/
│       └── v2/
│           └── admin/
│               └── users/
│                   ├── route.ts       # GET (list) and POST (create)
│                   └── [id]/
│                       └── route.ts   # GET, PUT, DELETE for individual users
├── lib/
│   ├── db/
│   │   ├── client.ts                 # Prisma client singleton
│   │   ├── schema.prisma             # Database schema
│   │   └── repositories/
│   │       └── users.repository.ts   # User data access layer
│   └── api/
│       ├── response.ts               # API response helpers
│       └── middleware.ts             # API middleware (auth, validation, rate limiting)
└── scripts/
    └── setup-database.sh             # Database setup script
```

## Setup Instructions

### Option 1: Automated Setup

Run the setup script:

```bash
cd /mnt/e/projects/church
chmod +x scripts/setup-database.sh
./scripts/setup-database.sh
```

### Option 2: Manual Setup

1. Install Prisma:
```bash
npm install prisma @prisma/client
npm install -D prisma
```

2. Add to `.env.local`:
```env
DATABASE_URL="file:./dev.db"
```

3. Generate Prisma Client:
```bash
npx prisma generate --schema=./lib/db/schema.prisma
```

4. Create database:
```bash
npx prisma db push --schema=./lib/db/schema.prisma
```

5. Seed initial data:
```bash
node scripts/seed-users.js
```

## Usage

### Accessing User Management

1. Start your development server:
```bash
npm run dev
```

2. Navigate to the user management page:
```
http://localhost:3000/admin/users
```

### Creating a User

1. Click the "Create User" button
2. Fill in the form:
   - Name (required)
   - Email (required)
   - Phone (optional)
   - Role (required)
3. Click "Create User"

### Editing a User

1. Click "Edit" next to the user
2. Update the fields you want to change
3. Click "Update User"

### Deleting a User

1. Click "Delete" next to the user
2. Confirm the deletion in the dialog

### Searching Users

- Type in the search box to search by name or email
- Results update automatically

### Filtering by Role

- Select a role from the dropdown
- Results update automatically

## Security Considerations

### Current State (Development)

- Authentication is currently disabled for development
- All API endpoints are accessible without authentication
- Rate limiting is in place (100 requests per 15 minutes per IP)

### Production Recommendations

1. **Enable Authentication**: Uncomment `requireAuth()` calls in API routes
2. **Role-Based Access**: Only allow admins to access user management
3. **Audit Logging**: Log all user management actions
4. **Input Validation**: Already implemented with Zod schemas
5. **Rate Limiting**: Consider using a production-grade solution like Upstash
6. **HTTPS Only**: Enforce HTTPS in production
7. **CSRF Protection**: Implement CSRF tokens for state-changing operations

### Enabling Authentication

In each API route file, uncomment the auth middleware:

```typescript
// Before (development)
// await requireAuth(request);

// After (production)
await requireAuth(request);
```

## Testing

### Manual Testing

1. Create a new user
2. Search for the user
3. Filter by role
4. Edit the user
5. Delete the user
6. Test pagination with 20+ users

### API Testing with curl

Create user:
```bash
curl -X POST http://localhost:3000/api/v2/admin/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "role": "member"
  }'
```

List users:
```bash
curl http://localhost:3000/api/v2/admin/users
```

Get user:
```bash
curl http://localhost:3000/api/v2/admin/users/USER_ID
```

Update user:
```bash
curl -X PUT http://localhost:3000/api/v2/admin/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "role": "admin"
  }'
```

Delete user:
```bash
curl -X DELETE http://localhost:3000/api/v2/admin/users/USER_ID
```

## Troubleshooting

### Error: Prisma Client not found

**Solution**: Run `npx prisma generate --schema=./lib/db/schema.prisma`

### Error: Database not found

**Solution**: Run `npx prisma db push --schema=./lib/db/schema.prisma`

### Error: User already exists

**Solution**: The email must be unique. Use a different email or update the existing user.

### Search not working

**Solution**: Ensure you have users in the database. The search uses case-insensitive matching.

### Pagination not showing

**Solution**: Pagination only shows when there are more than 20 users.

## Future Enhancements

- [ ] Bulk user operations (import/export CSV)
- [ ] User profile pictures upload
- [ ] Email verification workflow
- [ ] Password reset functionality
- [ ] Activity history log
- [ ] Advanced filtering (by date joined, activity level)
- [ ] User groups/teams
- [ ] Custom user fields
- [ ] Integration with NextAuth providers
- [ ] Two-factor authentication

## Related Documentation

- [DATABASE_SETUP.md](./DATABASE_SETUP.md) - Database setup guide
- [lib/db/schema.prisma](./lib/db/schema.prisma) - Full database schema
- [Prisma Documentation](https://www.prisma.io/docs)

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review the database setup guide
3. Check Next.js and Prisma documentation
4. Review the API response for error messages
