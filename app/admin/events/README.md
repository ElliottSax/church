# Event Management Interface

Complete CRUD (Create, Read, Update, Delete) interface for managing church events.

## Pages Created

### 1. Event List Page (`/admin/events`)
**File:** `app/admin/events/page.tsx`

**Features:**
- Displays all events in a sortable table
- Advanced filtering by:
  - Category (worship, youth, community, education, mission, social, special)
  - Status (upcoming, ongoing, completed, cancelled)
  - Date range (start date and end date)
- Real-time stats dashboard showing:
  - Total events
  - Upcoming events count
  - Ongoing events count
  - Total attendees
- Actions for each event:
  - View - Navigate to detail page
  - Edit - Navigate to edit form
  - Delete - Remove event with confirmation
- "Create Event" button
- Loading states and error handling
- Responsive design for mobile and desktop

**API Endpoint:** `GET /api/v2/events`

### 2. Create Event Page (`/admin/events/new`)
**File:** `app/admin/events/new/page.tsx`

**Features:**
- Comprehensive form with all event fields:
  - **Basic Information:**
    - Title (auto-generates URL slug)
    - URL Slug
    - Description
    - Category
    - Image URL
  - **Date & Time:**
    - Start date/time
    - End date/time (optional)
  - **Location:**
    - Physical location or address
  - **Capacity & RSVP:**
    - Maximum capacity (optional)
    - Require RSVP checkbox
    - RSVP deadline (conditional)
  - **Recurring Event:**
    - Is recurring checkbox
    - Frequency (daily, weekly, biweekly, monthly)
    - Recurring end date
  - **Organizer Information:**
    - Name
    - Email
    - Phone (optional)
  - **Additional Settings:**
    - Status (upcoming, ongoing, completed, cancelled)
    - Featured checkbox
    - Tags (comma-separated)

- **Validation:**
  - Client-side validation using React Hook Form + Zod
  - Matches API validation schema exactly
  - Real-time error messages
  - Auto-slug generation from title

- **UX Features:**
  - Conditional field display (RSVP deadline, recurring options)
  - Loading states during submission
  - Error handling with user-friendly messages
  - Cancel button to go back
  - Redirects to event list on success

**API Endpoint:** `POST /api/v2/events`

### 3. Edit Event Page (`/admin/events/[id]/edit`)
**File:** `app/admin/events/[id]/edit/page.tsx`

**Features:**
- Pre-populated form with existing event data
- Same comprehensive form fields as create page
- Partial updates (only changed fields sent to API)
- Date formatting for datetime-local inputs
- Loading state while fetching event data
- Error handling for missing events
- Auto-slug update when title changes
- Save and cancel buttons

**API Endpoints:**
- `GET /api/v2/events/[id]` - Fetch event
- `PATCH /api/v2/events/[id]` - Update event

### 4. View Event Details Page (`/admin/events/[id]`)
**File:** `app/admin/events/[id]/page.tsx`

**Features:**
- Beautiful detail view with organized sections:
  - **Header:** Title, status, category badges, featured indicator
  - **Image:** Full-width event image (if provided)
  - **Main Content (Left Column):**
    - Description
    - Date & time information
    - Location
    - Recurring event details (if applicable)
    - Tags
  - **Sidebar (Right Column):**
    - Attendance stats with progress bar
    - RSVP information
    - Organizer contact details
    - Event metadata (ID, slug, created, updated)

- **Actions:**
  - Edit button - Navigate to edit page
  - Delete button - Remove event with confirmation
  - Back to events list

- **Visual Elements:**
  - Color-coded status badges
  - Category badges
  - Featured star indicator
  - Capacity progress bar
  - Responsive grid layout

**API Endpoint:** `GET /api/v2/events/[id]`

## Design Patterns Used

### 1. Consistent Styling
- Tailwind CSS utility classes
- Gray-100 background for pages
- White cards with rounded corners and shadows
- Blue primary color for buttons and links
- Consistent spacing and typography

### 2. Component Structure
All pages follow this pattern:
```tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// ... other imports

export default function PageName() {
  // State management
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Effects and handlers

  // Render
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Content */}
    </div>
  );
}
```

### 3. Form Validation
- React Hook Form for form state management
- Zod for schema validation
- @hookform/resolvers to connect them
- Inline error messages below each field
- Disabled submit button during submission

### 4. Error Handling
- Try-catch blocks for all API calls
- User-friendly error messages
- Retry buttons for failed requests
- Loading states for async operations
- Graceful fallbacks for missing data

### 5. Navigation
- useRouter from next/navigation
- Programmatic navigation after actions
- Back buttons on all subpages
- Consistent breadcrumb-style navigation

## API Integration

All pages integrate with the `/api/v2/events` API endpoints:

### Event List
```typescript
GET /api/v2/events?category=worship&status=upcoming
```

### Create Event
```typescript
POST /api/v2/events
Content-Type: application/json

{
  "title": "Sunday Worship",
  "slug": "sunday-worship",
  "description": "...",
  "date": "2024-01-15T10:00:00Z",
  "location": "Main Sanctuary",
  "category": "worship",
  "organizerName": "Pastor Smith",
  "organizerEmail": "pastor@church.org"
}
```

### Get Event
```typescript
GET /api/v2/events/[id]
```

### Update Event
```typescript
PATCH /api/v2/events/[id]
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "completed"
}
```

### Delete Event
```typescript
DELETE /api/v2/events/[id]
```

## Validation Schema

The forms use the following Zod schema (from `lib/validations/event.schema.ts`):

```typescript
{
  title: string (min 3, max 200)
  slug: string (lowercase alphanumeric with hyphens)
  description: string (min 10)
  date: datetime string
  endDate?: datetime string
  location: string (min 3)
  category: enum ['worship', 'youth', 'community', 'education', 'mission', 'social', 'special']
  image?: URL string
  maxCapacity?: positive integer
  requiresRsvp: boolean
  rsvpDeadline?: datetime string
  featured: boolean
  status: enum ['upcoming', 'ongoing', 'completed', 'cancelled']
  isRecurring: boolean
  recurringFrequency?: enum ['daily', 'weekly', 'biweekly', 'monthly']
  recurringEndDate?: datetime string
  organizerName: string (min 2)
  organizerEmail: email string
  organizerPhone?: string
  tags: array of strings
}
```

## Dependencies

- **React Hook Form** (`react-hook-form`) - Form state management
- **Zod** (`zod`) - Schema validation
- **@hookform/resolvers** - Connect RHF with Zod
- **date-fns** (`date-fns`) - Date formatting
- **Next.js** - Routing and navigation
- **Tailwind CSS** - Styling

## File Structure

```
app/admin/events/
├── page.tsx                    # List all events
├── new/
│   └── page.tsx               # Create new event
├── [id]/
│   ├── page.tsx               # View event details
│   └── edit/
│       └── page.tsx           # Edit event
└── README.md                  # This file
```

## Usage

### Accessing the Interface
1. Navigate to `/admin/events` to see the event list
2. Click "Create Event" to add a new event
3. Click "View" to see event details
4. Click "Edit" to modify an event
5. Click "Delete" to remove an event

### Creating an Event
1. Go to `/admin/events/new`
2. Fill in all required fields (marked with *)
3. Optionally fill in additional fields
4. Click "Create Event"
5. You'll be redirected to the events list

### Editing an Event
1. From the events list, click "Edit" on any event
2. Modify the desired fields
3. Click "Save Changes"
4. You'll be redirected to the events list

### Filtering Events
1. On the events list page, use the filter section
2. Select category, status, or date range
3. Events update automatically
4. Click "Clear all filters" to reset

## Features Highlights

1. **Auto-slug Generation**: Title automatically generates URL-friendly slug
2. **Conditional Fields**: RSVP deadline and recurring options appear only when needed
3. **Real-time Validation**: Form validates as you type
4. **Optimistic UI**: Immediate feedback on actions
5. **Responsive Design**: Works on mobile, tablet, and desktop
6. **Accessibility**: Semantic HTML and keyboard navigation
7. **Error Recovery**: Retry buttons and helpful error messages
8. **Data Integrity**: Type-safe with TypeScript and Zod validation

## Security Considerations

- All API endpoints should verify admin authentication
- Input sanitization handled by Zod schemas
- CSRF protection via Next.js
- No sensitive data in client-side code
- Confirmation dialogs for destructive actions

## Future Enhancements

Potential improvements:
- [ ] Bulk actions (delete multiple events)
- [ ] Export events to CSV
- [ ] Duplicate event functionality
- [ ] Event templates
- [ ] Image upload instead of URL
- [ ] Calendar view integration
- [ ] RSVP management interface
- [ ] Email notifications for attendees
- [ ] Event check-in system
- [ ] Attendance reports

## Troubleshooting

### Events not loading
- Check API endpoint is running
- Verify authentication is valid
- Check browser console for errors

### Form validation errors
- Ensure all required fields are filled
- Check date formats are valid
- Verify URLs are properly formatted
- Ensure slug is lowercase with hyphens only

### Date/time issues
- Use datetime-local input format
- Dates stored as ISO strings in database
- Display formatted using date-fns

## Support

For issues or questions:
1. Check this README
2. Review API documentation
3. Check browser console for errors
4. Verify validation schema matches API
