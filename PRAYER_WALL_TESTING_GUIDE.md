# Prayer Wall Testing Guide

This guide provides step-by-step instructions for testing the Prayer Wall component and prayer approval functionality.

## Overview

The Prayer Wall system consists of:
1. **Public Prayer Wall** - Displays approved prayer requests on the homepage
2. **Prayer Submission Form** - Allows users to submit new prayer requests
3. **Admin Approval System** - Allows admins to approve/decline pending requests
4. **API Endpoints** - Backend API for managing prayer requests

## Components Modified

### 1. Prayer Wall Component
**File**: `/mnt/e/projects/church/components/home/PrayerWall.tsx`

**Changes**:
- ✅ Replaced mock data with real API calls to `/api/v2/prayer-requests`
- ✅ Added form submission handler with validation
- ✅ Implemented real-time refresh after submission
- ✅ Added loading states with spinner
- ✅ Added error handling with user-friendly messages
- ✅ Added success feedback messages
- ✅ Added character counter for prayer requests
- ✅ Added category selection
- ✅ Added anonymous submission option

### 2. Admin Dashboard
**File**: `/mnt/e/projects/church/app/admin/dashboard/page.tsx`

**Changes**:
- ✅ Created `PendingPrayersCard` client component
- ✅ Added click handlers for approve/decline buttons
- ✅ Implemented PATCH API calls to update prayer status
- ✅ Added success/error feedback with toast notifications
- ✅ Auto-refresh list after approval/decline

### 3. API Endpoints

**Created**: `/mnt/e/projects/church/app/api/v2/prayer-requests/[id]/route.ts`

**Endpoints**:
- `GET /api/v2/prayer-requests/[id]` - Get single prayer request
- `PATCH /api/v2/prayer-requests/[id]` - Update prayer request (approve/decline)
- `DELETE /api/v2/prayer-requests/[id]` - Delete prayer request

## Testing Checklist

### A. Prayer Wall Component (Public-Facing)

#### 1. Display Approved Prayers
- [ ] Navigate to homepage
- [ ] Scroll to "Community Prayer Wall" section
- [ ] Verify approved prayers are displayed
- [ ] Check that each prayer shows:
  - [ ] Author name (or "Anonymous")
  - [ ] Prayer request text
  - [ ] Category badge
  - [ ] Relative time (e.g., "2 hours ago")
  - [ ] Prayer count (heart icon)
- [ ] Verify prayers are sorted by most recent first

#### 2. Empty State
- [ ] If no approved prayers exist, verify empty state message shows:
  - "No prayer requests yet. Be the first to share!"

#### 3. Loading State
- [ ] On initial page load, verify loading spinner appears
- [ ] Verify prayers load within 2-3 seconds

#### 4. Submit Prayer Request Form

**Test Case 1: Valid Submission**
- [ ] Fill in "Your Name" field (e.g., "John Doe")
- [ ] Select a category (e.g., "Healing")
- [ ] Enter prayer request (min 10 characters)
- [ ] Click "Submit Prayer Request"
- [ ] Verify:
  - [ ] Button shows "Submitting..." with spinner
  - [ ] Success message appears: "Your prayer request has been submitted and is pending approval"
  - [ ] Form resets to empty state
  - [ ] Submit button is re-enabled

**Test Case 2: Anonymous Submission**
- [ ] Check "Submit anonymously" checkbox
- [ ] Verify name field is disabled
- [ ] Enter prayer request
- [ ] Submit form
- [ ] Verify submission succeeds

**Test Case 3: Validation**
- [ ] Try submitting with empty prayer request
  - [ ] Verify submit button is disabled
- [ ] Enter less than 10 characters
  - [ ] Verify validation error
- [ ] Enter more than 500 characters
  - [ ] Verify character counter shows red
  - [ ] Verify cannot type beyond 500 chars

**Test Case 4: Error Handling**
- [ ] Disconnect network/turn off API
- [ ] Try submitting prayer request
- [ ] Verify error message displays
- [ ] Verify form is not cleared

### B. Admin Dashboard - Prayer Approval

#### 1. View Pending Prayers
- [ ] Navigate to `/admin/dashboard`
- [ ] Locate "Pending Prayer Requests" card
- [ ] Verify pending prayers are listed (if any exist)
- [ ] Check each prayer displays:
  - [ ] Author name
  - [ ] Prayer request text (truncated with line-clamp)
  - [ ] Category badge
  - [ ] "Approve" button (green)
  - [ ] "Decline" button (red)

#### 2. Approve Prayer Request
- [ ] Click "Approve" button on a pending prayer
- [ ] Verify:
  - [ ] Button shows loading spinner
  - [ ] Success message appears: "Prayer request approved successfully!"
  - [ ] Prayer is removed from pending list
  - [ ] Success message disappears after 3 seconds
- [ ] Navigate to homepage
- [ ] Verify approved prayer now appears on Prayer Wall

#### 3. Decline Prayer Request
- [ ] Click "Decline" button on a pending prayer
- [ ] Verify confirmation dialog appears:
  - "Are you sure you want to decline this prayer request?"
- [ ] Click "Cancel" - verify nothing happens
- [ ] Click "Decline" again, then "OK"
- [ ] Verify:
  - [ ] Button shows loading spinner
  - [ ] Success message appears: "Prayer request declined"
  - [ ] Prayer is removed from pending list
  - [ ] Prayer does NOT appear on public Prayer Wall

#### 4. Empty State
- [ ] Approve/decline all pending prayers
- [ ] Verify message shows: "No pending requests"

#### 5. Error Handling
- [ ] Disconnect network
- [ ] Try approving a prayer
- [ ] Verify error message displays
- [ ] Verify prayer remains in list

### C. API Endpoint Testing

#### Using Browser DevTools
1. Open browser console (F12)
2. Test endpoints manually:

**Get all public prayers:**
```javascript
fetch('/api/v2/prayer-requests')
  .then(r => r.json())
  .then(console.log)
```

**Create prayer request:**
```javascript
fetch('/api/v2/prayer-requests', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    request: 'Please pray for my family during this difficult time.',
    category: 'healing',
    isAnonymous: false,
    isPublic: true
  })
}).then(r => r.json()).then(console.log)
```

**Approve prayer (replace ID):**
```javascript
fetch('/api/v2/prayer-requests/YOUR_PRAYER_ID', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ approved: true })
}).then(r => r.json()).then(console.log)
```

#### Using Test Script
```bash
# Run automated API tests
npx ts-node scripts/test-prayer-api.ts
```

Verify all tests pass:
- ✅ Prayer creation
- ✅ Approval workflow
- ✅ Public/Private filtering
- ✅ Prayer count tracking
- ✅ Search functionality
- ✅ Trending prayers
- ✅ Statistics

### D. Edge Cases & Security

#### 1. Rate Limiting
- [ ] Submit multiple prayer requests rapidly (>20 in 15 minutes)
- [ ] Verify rate limit error is returned

#### 2. Input Sanitization
- [ ] Try submitting with XSS payload: `<script>alert('XSS')</script>`
- [ ] Verify it's escaped and displayed as text

#### 3. SQL Injection
- [ ] Try submitting with SQL: `'; DROP TABLE PrayerRequest; --`
- [ ] Verify query is parameterized and safe

#### 4. Long Content
- [ ] Submit prayer with exactly 500 characters
- [ ] Verify it's accepted
- [ ] Try 501 characters
- [ ] Verify it's rejected or truncated

#### 5. Special Characters
- [ ] Submit prayer with emojis: `🙏 Praying for peace ✝️`
- [ ] Verify emojis display correctly
- [ ] Submit with international characters: `Señor, ayúdame 中文`
- [ ] Verify all characters display properly

### E. Mobile Testing

#### 1. Responsive Design
- [ ] Test on mobile viewport (375px width)
- [ ] Verify Prayer Wall is readable
- [ ] Verify form is usable
- [ ] Test on tablet viewport (768px)
- [ ] Test on desktop (1920px)

#### 2. Touch Interactions
- [ ] Test approve/decline buttons on touch device
- [ ] Verify buttons are large enough (min 44x44px)
- [ ] Test form inputs on touch keyboard

### F. Performance Testing

#### 1. Load Time
- [ ] Measure initial prayer load time
  - Target: < 2 seconds
- [ ] Check Network tab for API response time
  - Target: < 500ms

#### 2. Large Dataset
- [ ] Create 50+ prayer requests
- [ ] Verify pagination works
- [ ] Verify page doesn't slow down

#### 3. Concurrent Users
- [ ] Have multiple users submit prayers simultaneously
- [ ] Verify all submissions are recorded
- [ ] Verify no race conditions

## Expected Behavior Summary

### User Flow: Submit Prayer Request
1. User fills out form on homepage
2. Clicks "Submit Prayer Request"
3. API creates prayer with `approved: false`
4. User sees success message
5. Prayer appears in admin dashboard as "Pending"
6. Admin approves prayer
7. Prayer appears on public Prayer Wall

### User Flow: Admin Approval
1. Admin logs into dashboard
2. Sees pending prayers count in stats
3. Views pending prayers in dedicated card
4. Clicks "Approve" or "Decline"
5. Prayer status updates in database
6. Prayer removed from pending list
7. If approved, appears on public wall

## Troubleshooting

### Prayer Wall Not Loading
1. Check browser console for errors
2. Verify API endpoint is accessible: `/api/v2/prayer-requests`
3. Check database connection
4. Verify Prisma client is generated: `npx prisma generate`

### Approval Buttons Not Working
1. Check Network tab for PATCH request
2. Verify request body includes `{ approved: true/false }`
3. Check server logs for errors
4. Verify prayer ID is valid

### Form Submission Failing
1. Check validation errors in console
2. Verify all required fields are filled
3. Check request payload matches schema
4. Verify rate limiting isn't blocking request

## Configuration

Prayer Wall settings are in `config/site-config.ts`:

```typescript
prayerWall: {
  requireApproval: true,  // Set to false for auto-approval
  allowAnonymous: true,   // Set to false to require names
  maxRequestLength: 500,  // Maximum characters
  categories: [...]       // Available categories
}
```

## Database Schema

```prisma
model PrayerRequest {
  id          String   @id @default(cuid())
  name        String
  request     String
  category    String
  isAnonymous Boolean  @default(false)
  isPublic    Boolean  @default(true)
  approved    Boolean  @default(false)
  prayerCount Int      @default(0)
  userId      String?
  userEmail   String?
  submittedAt DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user         User?              @relation(...)
  interactions PrayerInteraction[]
}
```

## Success Criteria

✅ **Prayer Wall Component**
- Real API integration working
- Loading states implemented
- Error handling in place
- Form validation working
- Success messages displayed

✅ **Admin Dashboard**
- Approve/decline buttons functional
- Real-time updates working
- Success/error feedback implemented
- Pending count accurate

✅ **API Endpoints**
- GET returns public prayers only
- POST creates pending prayers
- PATCH updates approval status
- Proper error handling

✅ **User Experience**
- Fast load times (< 2s)
- Responsive design
- Clear feedback messages
- Intuitive workflow

## Next Steps

After testing is complete:
1. Deploy to staging environment
2. Perform user acceptance testing
3. Monitor error logs
4. Collect user feedback
5. Iterate on improvements

---

**Last Updated**: 2026-02-01
**Version**: 1.0
**Author**: Claude Code
