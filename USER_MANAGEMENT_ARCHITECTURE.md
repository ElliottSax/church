# User Management System - Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                          │
│                    http://localhost:3000                     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ HTTP Requests
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     Frontend Layer                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  /app/admin/users/page.tsx                            │  │
│  │  - User table display                                 │  │
│  │  - Search & filter UI                                 │  │
│  │  - Create/Edit/Delete modals                          │  │
│  │  - Pagination controls                                │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ fetch() API calls
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Layer                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  /app/api/v2/admin/users/route.ts                     │  │
│  │  - GET  /api/v2/admin/users (list with filters)       │  │
│  │  - POST /api/v2/admin/users (create)                  │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  /app/api/v2/admin/users/[id]/route.ts                │  │
│  │  - GET    /api/v2/admin/users/[id] (get by ID)        │  │
│  │  - PUT    /api/v2/admin/users/[id] (update)           │  │
│  │  - DELETE /api/v2/admin/users/[id] (delete)           │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ Uses Middleware
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   Middleware Layer                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  /lib/api/middleware.ts                                │  │
│  │  - validateMethod()    (HTTP method validation)        │  │
│  │  - requireAuth()       (authentication check)          │  │
│  │  - validateBody()      (Zod schema validation)         │  │
│  │  - checkRateLimit()    (rate limiting)                 │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  /lib/api/response.ts                                  │  │
│  │  - apiSuccess()        (200 success response)          │  │
│  │  - apiCreated()        (201 created response)          │  │
│  │  - apiDeleted()        (delete success response)       │  │
│  │  - apiPaginated()      (paginated response)            │  │
│  │  - apiError()          (error response)                │  │
│  │  - withErrorHandling() (error wrapper)                 │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ Calls Repository
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  Repository Layer                            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  /lib/db/repositories/users.repository.ts              │  │
│  │                                                         │  │
│  │  UsersRepository {                                     │  │
│  │    findAll()        - Get all users with filters       │  │
│  │    findById()       - Get user by ID                   │  │
│  │    findByEmail()    - Get user by email                │  │
│  │    create()         - Create new user                  │  │
│  │    update()         - Update user                      │  │
│  │    updateRole()     - Update user role                 │  │
│  │    delete()         - Delete user                      │  │
│  │    getStats()       - Get user statistics              │  │
│  │    search()         - Search users                     │  │
│  │  }                                                      │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ Uses Prisma Client
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   Database Layer                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  /lib/db/client.ts                                     │  │
│  │  - Prisma Client singleton                             │  │
│  │  - Connection pooling                                  │  │
│  │  - Query logging (dev mode)                            │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  /lib/db/schema.prisma                                 │  │
│  │  - User model definition                               │  │
│  │  - Relations to other models                           │  │
│  │  - Indexes for performance                             │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ SQL Queries
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      SQLite Database                         │
│                        dev.db                                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  User Table                                            │  │
│  │  - id, email, name, phone, role, image                │  │
│  │  - createdAt, updatedAt, emailVerified                │  │
│  │  - Relations: accounts, sessions, rsvps, etc.         │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Creating a User

```
1. User clicks "Create User" button
   ↓
2. Modal form opens
   ↓
3. User fills form (name, email, phone, role)
   ↓
4. User clicks "Create User"
   ↓
5. Frontend: POST /api/v2/admin/users
   ↓
6. API: validateMethod(['POST'])
   ↓
7. API: checkRateLimit(request)
   ↓
8. API: validateBody(request, createUserSchema)
   ↓
9. Repository: usersRepository.findByEmail(email)
   ↓
10. Check: Email exists?
    ├─ Yes → Throw error "User already exists"
    └─ No  → Continue
   ↓
11. Repository: usersRepository.create(data)
    ↓
12. Prisma: INSERT INTO User ...
    ↓
13. Database: Returns new user record
    ↓
14. API: apiCreated(user) [201 response]
    ↓
15. Frontend: Close modal, refresh user list
```

### Listing Users with Search

```
1. User types in search box: "john"
   ↓
2. Frontend: Debounced state update
   ↓
3. Frontend: GET /api/v2/admin/users?search=john&limit=20&offset=0
   ↓
4. API: validateMethod(['GET'])
   ↓
5. API: checkRateLimit(request)
   ↓
6. API: Parse query params (search, limit, offset, role)
   ↓
7. Repository: usersRepository.findAll({ search: "john", limit: 20, offset: 0 })
   ↓
8. Prisma: SELECT * FROM User WHERE (name LIKE '%john%' OR email LIKE '%john%')
   ↓
9. Prisma: COUNT(*) FROM User WHERE ...
   ↓
10. Database: Returns users array + total count
    ↓
11. API: apiPaginated(users, page, limit, total)
    ↓
12. Frontend: Update users state, render table
```

### Updating a User

```
1. User clicks "Edit" button
   ↓
2. Modal opens with pre-filled data
   ↓
3. User changes role: "member" → "admin"
   ↓
4. User clicks "Update User"
   ↓
5. Frontend: PUT /api/v2/admin/users/[id]
   ↓
6. API: validateMethod(['PUT'])
   ↓
7. API: validateBody(request, updateUserSchema)
   ↓
8. Repository: usersRepository.findById(id)
   ↓
9. Check: User exists?
    ├─ No  → Throw error "User not found"
    └─ Yes → Continue
   ↓
10. Check: Email changed?
    ├─ Yes → Check if new email exists
    └─ No  → Continue
   ↓
11. Repository: usersRepository.update(id, data)
    ↓
12. Prisma: UPDATE User SET ... WHERE id = ?
    ↓
13. Database: Returns updated user record
    ↓
14. API: apiSuccess(user)
    ↓
15. Frontend: Close modal, refresh user list
```

## Component Hierarchy

```
AdminUsersPage
├── Header
│   ├── Title & Description
│   └── Create User Button
│
├── Filters Section
│   ├── Search Input
│   ├── Role Filter Dropdown
│   └── Clear Filters Button
│
├── Users Table
│   ├── Table Header
│   └── Table Body
│       └── User Rows
│           ├── User Avatar/Initials
│           ├── Name & Phone
│           ├── Email
│           ├── Role Badge
│           ├── Activity Stats
│           ├── Join Date
│           └── Actions (Edit, Delete)
│
├── Pagination
│   ├── Current Page Info
│   ├── Previous Button
│   └── Next Button
│
├── Statistics Cards
│   ├── Total Users
│   ├── Admins Count
│   ├── Moderators Count
│   └── Members Count
│
├── Create User Modal
│   ├── Form Fields
│   │   ├── Name Input
│   │   ├── Email Input
│   │   ├── Phone Input
│   │   └── Role Select
│   └── Action Buttons
│       ├── Create Button
│       └── Cancel Button
│
└── Edit User Modal
    ├── Form Fields (same as Create)
    └── Action Buttons
        ├── Update Button
        └── Cancel Button
```

## Security Layers

```
Request
  ↓
┌──────────────────────────┐
│   Rate Limiting          │  ← 100 requests per 15 min per IP
└──────────────────────────┘
  ↓
┌──────────────────────────┐
│   Authentication         │  ← requireAuth() (currently disabled)
└──────────────────────────┘
  ↓
┌──────────────────────────┐
│   Authorization          │  ← Role checking (when enabled)
└──────────────────────────┘
  ↓
┌──────────────────────────┐
│   Input Validation       │  ← Zod schema validation
└──────────────────────────┘
  ↓
┌──────────────────────────┐
│   Business Logic         │  ← Duplicate check, etc.
└──────────────────────────┘
  ↓
┌──────────────────────────┐
│   Database Query         │  ← Prisma (SQL injection safe)
└──────────────────────────┘
  ↓
Response
```

## Error Handling Flow

```
Try {
  API Request
    ↓
  Middleware Validation
    ↓
  Repository Call
    ↓
  Database Operation
}
Catch (error) {
  ↓
  Error Type Detection
    ├─ ZodError        → apiValidationError()    [422]
    ├─ P2002 (Prisma)  → apiError() "Duplicate"  [409]
    ├─ P2025 (Prisma)  → apiNotFound()           [404]
    ├─ Custom Error    → apiError()              [error.statusCode]
    └─ Unknown         → apiServerError()        [500]
  ↓
  Standard JSON Response
    {
      "success": false,
      "error": {
        "message": "...",
        "code": "...",
        "details": {...}
      }
    }
}
```

## Technology Stack

```
┌─────────────────────────────────────┐
│         Frontend Stack              │
├─────────────────────────────────────┤
│ React 18                            │
│ Next.js 14 (App Router)             │
│ TypeScript                          │
│ Tailwind CSS                        │
│ date-fns (date formatting)          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│         Backend Stack               │
├─────────────────────────────────────┤
│ Next.js API Routes                  │
│ Prisma ORM                          │
│ Zod (validation)                    │
│ NextAuth (auth - optional)          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│         Database Stack              │
├─────────────────────────────────────┤
│ SQLite (development)                │
│ PostgreSQL (production ready)       │
│ Prisma Client                       │
└─────────────────────────────────────┘
```

## Performance Optimizations

1. **Database Level**
   - Indexed email field for fast lookups
   - Indexed createdAt for sorting
   - Connection pooling via Prisma

2. **API Level**
   - Pagination (20 users per page)
   - Rate limiting to prevent abuse
   - Efficient queries with Prisma

3. **Frontend Level**
   - Client-side state management
   - Optimistic UI updates
   - Debounced search input
   - Conditional rendering
   - Modal lazy loading

## Scalability Considerations

- **Pagination**: Handles large user datasets
- **Indexing**: Database indexes for search performance
- **Repository Pattern**: Easy to swap data source
- **Rate Limiting**: Prevents API abuse
- **Caching**: Ready for Redis integration
- **Database**: Can switch to PostgreSQL for production

## Monitoring Points

```
┌─────────────────────────────────────┐
│ What to Monitor                     │
├─────────────────────────────────────┤
│ • API response times                │
│ • Database query performance        │
│ • Rate limit hits                   │
│ • Error rates by type               │
│ • User creation/deletion rate       │
│ • Search query patterns             │
│ • Database connection pool          │
└─────────────────────────────────────┘
```
