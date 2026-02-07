# Donation History - Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Browser                             │
├─────────────────────────────────────────────────────────────────┤
│  URL: /members/donations                                         │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Page Component (page.tsx)                               │    │
│  │  ┌────────────────────────────────────────────────┐     │    │
│  │  │  Authentication Check (useSession)              │     │    │
│  │  │  ├─ Not authenticated → Redirect to sign-in    │     │    │
│  │  │  └─ Authenticated → Continue                   │     │    │
│  │  └────────────────────────────────────────────────┘     │    │
│  │                                                           │    │
│  │  ┌────────────────────────────────────────────────┐     │    │
│  │  │  Data Fetching (useEffect)                      │     │    │
│  │  │  └─ fetch('/api/v2/donations')                 │     │    │
│  │  └────────────────────────────────────────────────┘     │    │
│  │                                                           │    │
│  │  ┌────────────────────────────────────────────────┐     │    │
│  │  │  UI Components                                  │     │    │
│  │  │  ├─ Statistics Cards (YTD, All-time, Top)      │     │    │
│  │  │  ├─ Search & Filters                           │     │    │
│  │  │  ├─ Donations Table                            │     │    │
│  │  │  ├─ Fund Breakdown Chart                       │     │    │
│  │  │  └─ DonationChart Component                    │     │    │
│  │  └────────────────────────────────────────────────┘     │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Next.js Server                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  API Route: GET /api/v2/donations/route.ts              │    │
│  │  ┌────────────────────────────────────────────────┐     │    │
│  │  │  1. Validate Method (GET only)                 │     │    │
│  │  │  2. Check Authentication (requireAuth)         │     │    │
│  │  │  3. Apply Rate Limiting                        │     │    │
│  │  │  4. Query Database (Prisma)                    │     │    │
│  │  │     WHERE userId = session.user.id             │     │    │
│  │  │     AND status = 'completed'                   │     │    │
│  │  │  5. Return Paginated Results                   │     │    │
│  │  └────────────────────────────────────────────────┘     │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  API Route: GET /api/v2/donations/[id]/receipt/route.ts │    │
│  │  ┌────────────────────────────────────────────────┐     │    │
│  │  │  1. Validate Method (GET only)                 │     │    │
│  │  │  2. Check Authentication (requireAuth)         │     │    │
│  │  │  3. Fetch Donation by ID                       │     │    │
│  │  │  4. Verify Ownership                           │     │    │
│  │  │     (userId or donorEmail matches)             │     │    │
│  │  │  5. Generate Receipt HTML                      │     │    │
│  │  │     - Display format OR                        │     │    │
│  │  │     - Printable/PDF format                     │     │    │
│  │  │  6. Return HTML Response                       │     │    │
│  │  └────────────────────────────────────────────────┘     │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         Database (Prisma)                        │
├─────────────────────────────────────────────────────────────────┤
│  Table: Donation                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  id              String   (Primary Key)                  │    │
│  │  userId          String   (Foreign Key → User)           │    │
│  │  amount          Float                                   │    │
│  │  fund            String   (general|missions|building...) │    │
│  │  frequency       String   (one-time|weekly|monthly...)   │    │
│  │  createdAt       DateTime                                │    │
│  │  status          String   (pending|completed)            │    │
│  │  donorName       String   (optional)                     │    │
│  │  donorEmail      String   (optional)                     │    │
│  │  stripePaymentId String   (optional)                     │    │
│  │  notes           String   (optional)                     │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
page.tsx (Client Component)
├── Statistics Cards
│   ├── YTD Card
│   ├── All-Time Card
│   └── Top Fund Card
├── Filters Section
│   ├── Search Input
│   ├── Filter Toggle
│   └── Advanced Filters (Expandable)
│       ├── Fund Dropdown
│       ├── Start Date Input
│       └── End Date Input
├── Donations Table
│   ├── Table Header
│   └── Table Body
│       └── Donation Rows
│           ├── Date Cell
│           ├── Amount Cell
│           ├── Fund Cell
│           ├── Payment Method Cell
│           └── Receipt Actions
│               ├── Print Button
│               └── Download Button
├── Fund Breakdown Section
│   └── Progress Bars (by fund)
└── DonationChart Component
    ├── Bar Chart (12 months)
    ├── Tooltips (on hover)
    └── Summary Stats
```

## Data Flow

### 1. Page Load
```
User navigates to /members/donations
    ↓
useSession hook checks authentication
    ↓
If not authenticated → Redirect to /api/auth/signin
    ↓
If authenticated → Show loading state
    ↓
useEffect fetches from /api/v2/donations
    ↓
API validates session, queries database
    ↓
Returns donation data
    ↓
State updated, page renders with data
```

### 2. Filtering
```
User enters search query OR selects filter
    ↓
State updated (searchQuery, selectedFund, dateRange)
    ↓
useMemo recalculates filteredDonations
    ↓
Table re-renders with filtered results
    ↓
Shows count of filtered vs total
```

### 3. Receipt Download
```
User clicks download button
    ↓
handleDownloadReceipt called with donation.id
    ↓
fetch('/api/v2/donations/${id}/receipt')
    ↓
API validates ownership, generates HTML
    ↓
Returns HTML response
    ↓
Browser creates blob and triggers download
```

### 4. Receipt Print
```
User clicks print button
    ↓
handlePrintReceipt called with donation object
    ↓
Generate HTML in JavaScript (client-side)
    ↓
Open new window with HTML
    ↓
Trigger window.print()
```

## Security Flow

```
┌──────────────────────────────────────────────────┐
│  Every API Request                                │
├──────────────────────────────────────────────────┤
│  1. Check HTTP Method (validateMethod)           │
│     └─ Must be GET/POST as allowed               │
│                                                   │
│  2. Get Session (getServerSession)               │
│     └─ NextAuth validates JWT token              │
│                                                   │
│  3. Require Authentication (requireAuth)         │
│     └─ Throws 401 if no valid session            │
│                                                   │
│  4. Check Rate Limit (checkRateLimit)            │
│     └─ Throws 429 if too many requests           │
│                                                   │
│  5. Verify Ownership (for specific resources)    │
│     └─ userId matches OR donorEmail matches      │
│                                                   │
│  6. Execute Business Logic                       │
│     └─ Query database, process data              │
│                                                   │
│  7. Return Response                              │
│     └─ apiSuccess / apiPaginated / apiError      │
└──────────────────────────────────────────────────┘
```

## Technology Stack

```
Frontend Layer
├── Next.js 14 (App Router)
├── TypeScript
├── React 18
├── Tailwind CSS
├── Framer Motion (animations)
├── Lucide React (icons)
└── date-fns (date handling)

Backend Layer
├── Next.js API Routes
├── NextAuth.js (authentication)
├── Prisma ORM (database)
└── Zod (validation)

Database Layer
└── PostgreSQL / MySQL / SQLite (via Prisma)
```

## File Dependencies

```
page.tsx
├── Imports
│   ├── next-auth/react (useSession)
│   ├── next/navigation (useRouter)
│   ├── framer-motion (motion, AnimatePresence)
│   ├── lucide-react (icons)
│   ├── date-fns (format, parseISO, etc.)
│   └── @/components/donations/DonationChart
│
└── API Calls
    ├── GET /api/v2/donations
    └── GET /api/v2/donations/[id]/receipt

DonationChart.tsx
├── Imports
│   ├── framer-motion (motion)
│   └── date-fns (format, startOfMonth, etc.)
│
└── Props
    ├── donations: Donation[]
    └── months?: number

receipt/route.ts
├── Imports
│   ├── next/server (NextRequest)
│   ├── @/lib/db/client (prisma)
│   ├── @/lib/api/middleware (requireAuth, etc.)
│   └── date-fns (format)
│
└── Database Queries
    └── prisma.donation.findUnique
```

## Performance Optimizations

```
Client-Side
├── useMemo for filtered donations
├── useMemo for statistics calculations
├── Lazy loading animations (stagger delays)
├── Conditional rendering (empty states)
└── Efficient re-renders (React.memo potential)

Server-Side
├── Database indexing on userId, createdAt
├── Pagination support (limit/offset)
├── Rate limiting per IP
├── Caching strategies (optional)
└── Efficient SQL queries (Prisma optimization)
```

## State Management

```
page.tsx State
├── donations: Donation[]           (from API)
├── loading: boolean                (fetch state)
├── error: string | null            (error state)
├── searchQuery: string             (filter state)
├── selectedFund: string            (filter state)
├── dateRange: {start, end}         (filter state)
└── showFilters: boolean            (UI state)

Derived State (useMemo)
├── filteredDonations               (filtered by all criteria)
└── stats: DonationStats            (YTD, all-time, byFund)
```

## Error Handling

```
Try-Catch Blocks
├── fetchDonations()
│   └─ Catches API errors, sets error state
├── handleDownloadReceipt()
│   └─ Catches download errors, shows alert
└── API Routes
    └─ withErrorHandling wrapper catches all errors

User Feedback
├── Loading states (spinner)
├── Error messages (red text, retry button)
├── Empty states (helpful messages)
└── Success confirmations (smooth animations)
```

## Testing Strategy

```
Unit Tests (potential)
├── Filter logic (search, date range, fund)
├── Statistics calculations (YTD, all-time)
├── Date formatting
└── Receipt HTML generation

Integration Tests
├── API endpoint responses
├── Authentication flow
├── Database queries
└── Receipt generation

E2E Tests
├── Full user journey (login → view → filter)
├── Receipt download flow
├── Responsive design
└── Error scenarios
```

## Deployment Architecture

```
Production Environment
├── Frontend (Vercel / AWS / etc.)
│   ├── Static assets (images, fonts)
│   ├── Client components (hydrated)
│   └── Server components (SSR)
│
├── API (Next.js API Routes)
│   ├── Authentication middleware
│   ├── Business logic
│   └── Database connections
│
├── Database (PostgreSQL / MySQL)
│   ├── Donations table
│   ├── Users table
│   └── Related tables
│
└── External Services
    ├── NextAuth (session management)
    ├── Stripe (payment processing)
    └── Email service (receipt delivery)
```

## Summary

This architecture provides:
- ✅ Clean separation of concerns
- ✅ Secure authentication & authorization
- ✅ Efficient data fetching & filtering
- ✅ Responsive, animated UI
- ✅ Scalable component structure
- ✅ Production-ready error handling
- ✅ Extensible for future features

All components are modular and can be easily extended or modified as needed.
