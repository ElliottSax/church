# 🧪 Complete Testing Guide - Church Website

## ✅ Server Status
- **Server:** Running at http://localhost:3000
- **Status:** Compiling (may take 3-5 minutes first time)
- **Database:** SQLite at `lib/db/dev.db`

---

## 🎯 Testing Checklist

### 1️⃣ **Prayer Wall** (Homepage Integration)

**URL:** http://localhost:3000

**What to Test:**
- [ ] Scroll to "Prayer Wall" section on homepage
- [ ] View existing prayer requests (if any)
- [ ] Click "Submit a Prayer Request" button
- [ ] Fill out the form:
  - Name (optional - can be anonymous)
  - Email (optional)
  - Prayer request text (max 500 characters)
  - Select category (Healing, Guidance, Thanksgiving, etc.)
  - Toggle "Submit anonymously" checkbox
- [ ] Click "Submit Prayer Request"
- [ ] Verify success message appears
- [ ] Check that character counter works

**Admin Testing:**
- [ ] Go to http://localhost:3000/admin/dashboard
- [ ] Find "Pending Prayer Requests" section
- [ ] See your submitted prayer in the list
- [ ] Click "Approve" button
- [ ] Verify prayer disappears from pending list
- [ ] Go back to homepage
- [ ] Verify approved prayer now appears in Prayer Wall

**Expected Result:** ✅ Prayer Wall shows real data from database, admin can approve/decline

---

### 2️⃣ **Event Management** (Admin Interface)

**URL:** http://localhost:3000/admin/events

**What to Test:**

#### View Events List
- [ ] Navigate to `/admin/events`
- [ ] See events table (may be empty initially)
- [ ] Try filtering by:
  - Category dropdown
  - Status dropdown
  - Date range
- [ ] Try search functionality
- [ ] View statistics cards at top

#### Create New Event
- [ ] Click "Create New Event" button
- [ ] Fill out the form with test data:
  ```
  Title: Sunday Service Test
  Slug: sunday-service-test (auto-generated)
  Description: Weekly worship service
  Category: Worship
  Date: [Pick a future date]
  Time: 10:00 AM
  End Time: 11:30 AM
  Location: Main Sanctuary
  Max Capacity: 100
  Requires RSVP: Yes
  Organizer Name: Pastor John
  Organizer Email: pastor@church.org
  ```
- [ ] Click "Create Event"
- [ ] Verify redirect to events list
- [ ] See new event in the table

#### View Event Details
- [ ] Click "View" on any event
- [ ] See complete event details
- [ ] Check all fields are displayed correctly
- [ ] Note the event ID in URL

#### Edit Event
- [ ] Click "Edit" on any event
- [ ] Modify some fields (e.g., change title or capacity)
- [ ] Click "Save Changes"
- [ ] Verify changes saved
- [ ] Check updated event in list

#### Delete Event
- [ ] Click "Delete" on a test event
- [ ] Confirm deletion in dialog
- [ ] Verify event removed from list

**Expected Result:** ✅ Full CRUD operations work, all validations active

---

### 3️⃣ **Admin Settings Panel**

**URL:** http://localhost:3000/admin/settings

**What to Test:**

#### Site Information Section
- [ ] Navigate to `/admin/settings`
- [ ] Click "Site Information" in sidebar
- [ ] Modify fields:
  - Site Name
  - Contact Email
  - Phone Number
  - Address
  - Timezone
- [ ] Click "Save Changes"
- [ ] Verify success message
- [ ] Refresh page and check values persisted

#### Features Section
- [ ] Click "Features" in sidebar
- [ ] Toggle feature switches:
  - Enable Events Calendar
  - Enable Prayer Wall
  - Enable Donations
  - Enable Volunteer Portal
- [ ] Click "Save Changes"
- [ ] Verify toggles save correctly

#### Events Configuration
- [ ] Click "Events" in sidebar
- [ ] Modify settings:
  - Require event approval
  - Default capacity
  - RSVP reminder days
- [ ] Save and verify

#### Prayer Wall Configuration
- [ ] Click "Prayer Wall" in sidebar
- [ ] Modify:
  - Require moderation
  - Allow anonymous
  - Max character length
  - Auto-archive days
- [ ] Save and verify

#### Donations Configuration
- [ ] Click "Donations" in sidebar
- [ ] Modify:
  - Default amounts
  - Minimum amount
  - Allow recurring
- [ ] Save and verify

#### Notifications Configuration
- [ ] Click "Notifications" in sidebar
- [ ] Toggle email notifications:
  - Event reminders
  - Prayer updates
  - Donation receipts
- [ ] Save and verify

**Expected Result:** ✅ All settings save to database and persist across refreshes

---

### 4️⃣ **User Management**

**URL:** http://localhost:3000/admin/users

**What to Test:**

#### View Users List
- [ ] Navigate to `/admin/users`
- [ ] See users table (may be empty)
- [ ] Check statistics cards show user counts

#### Create New User
- [ ] Click "Create New User" button
- [ ] Fill out form:
  ```
  Name: Test User
  Email: test@example.com
  Role: Member
  Phone: (optional)
  ```
- [ ] Click "Create User"
- [ ] Verify new user appears in list

#### Search Users
- [ ] Type in search box
- [ ] Search by name or email
- [ ] Verify filtering works

#### Filter by Role
- [ ] Use role filter dropdown
- [ ] Select "Admin", "Moderator", "Volunteer", "Member"
- [ ] Verify list filters correctly

#### Edit User
- [ ] Click "Edit" on any user
- [ ] Change name or role
- [ ] Save changes
- [ ] Verify updated in list

#### Delete User
- [ ] Click "Delete" on a test user
- [ ] Confirm deletion
- [ ] Verify user removed

#### View Activity Stats
- [ ] Check activity columns in table
- [ ] See RSVPs, Prayers, Donations, Volunteer signups count
- [ ] Verify numbers match user's activity

**Expected Result:** ✅ Full user management with search, filter, and activity tracking

---

### 5️⃣ **Donation History** (Member Portal)

**URL:** http://localhost:3000/members/donations

**What to Test:**

#### View Donation History
- [ ] Navigate to `/members/donations`
- [ ] See donation history table (may be empty)
- [ ] Check statistics cards:
  - Year-to-date total
  - All-time total
  - Top fund

#### Add Test Data (Optional)
```bash
# Run this in terminal:
npx tsx scripts/seed-donations.ts
```
- [ ] Refresh page
- [ ] See populated donation data for last 12 months

#### Filter Donations
- [ ] Use date range filter
- [ ] Select start and end dates
- [ ] Click "Filter"
- [ ] Verify filtered results

#### Filter by Fund
- [ ] Use fund dropdown
- [ ] Select "General", "Missions", "Building", etc.
- [ ] Verify filtered results

#### Search Donations
- [ ] Type in search box
- [ ] Search by amount or notes
- [ ] Verify search works

#### View Charts
- [ ] Scroll to "Fund Breakdown" section
- [ ] See progress bars for each fund
- [ ] Scroll to "Donation Trends" chart
- [ ] See 12-month bar chart
- [ ] Hover over bars to see tooltips

#### Download Receipt
- [ ] Click "Receipt" button on any donation
- [ ] Verify receipt opens/downloads
- [ ] Check receipt contains:
  - Church name and info
  - Donation details
  - Tax information

**Expected Result:** ✅ Complete donation tracking with charts and receipts

---

### 6️⃣ **Volunteer Scheduler**

**URL:** http://localhost:3000/connect/volunteers (or wherever the scheduler is placed)

**What to Test:**

#### View Available Shifts
- [ ] Navigate to volunteer scheduler page
- [ ] See list of volunteer shifts (may be empty)
- [ ] Check view options: Week / Month / List

#### Create Test Shifts (Via API)
You may need to add shifts via API or admin interface first. Here's example data:

```javascript
// POST to /api/v2/volunteers/shifts
{
  "roleId": "...", // Need to create role first
  "date": "2026-02-15",
  "startTime": "09:00",
  "endTime": "12:00",
  "spotsAvailable": 5,
  "description": "Sunday setup team"
}
```

#### Sign Up for Shift
- [ ] Click "Sign Up" on available shift
- [ ] Verify confirmation message
- [ ] See shift marked as "Signed Up"
- [ ] Check "My Upcoming Shifts" section shows it

#### Cancel Signup
- [ ] Click "Cancel" on your signup
- [ ] Confirm cancellation
- [ ] Verify shift returns to available
- [ ] Check removed from "My Upcoming Shifts"

#### View My Signups
- [ ] Check "My Upcoming Shifts" section at top
- [ ] See all your active signups
- [ ] Verify dates and times correct

#### Conflict Detection
- [ ] Try signing up for overlapping shifts on same day
- [ ] Verify error message prevents duplicate signup
- [ ] Verify you can't double-book yourself

**Expected Result:** ✅ Full volunteer scheduling with conflict detection

---

## 🔍 Database Inspection

**View/Edit Database Directly:**

```bash
npx prisma@5.22.0 studio --schema=lib/db/schema.prisma
```

Opens at http://localhost:5555

**What to Check:**
- [ ] Open Prisma Studio
- [ ] Browse all tables:
  - User
  - Event
  - RSVP
  - PrayerRequest
  - Donation
  - VolunteerRole
  - VolunteerShift
  - VolunteerAssignment
  - Setting
  - Sermon
  - BlogPost
- [ ] Verify data matches what you see in UI
- [ ] Try editing records directly
- [ ] Refresh UI and see changes

---

## 🐛 Common Issues & Solutions

### Issue: Pages show "Loading..." forever
**Solution:** Check `/tmp/nextjs-dev.log` for compilation errors

### Issue: "Module not found: @prisma/client"
**Solution:** Run `npx prisma@5.22.0 generate --schema=lib/db/schema.prisma`

### Issue: Database errors
**Solution:** Verify `lib/db/dev.db` exists and run `npx prisma@5.22.0 db push --schema=lib/db/schema.prisma`

### Issue: Authentication errors
**Solution:** Check `.env.local` has `NEXTAUTH_SECRET` and `NEXTAUTH_URL`

### Issue: Forms don't submit
**Solution:** Check browser console for errors, verify API endpoints are responding

### Issue: Google Fonts timeout
**Solution:** This is just a warning, site still works. Font may not load immediately.

---

## ✅ Testing Checklist Summary

Quick checklist to verify everything works:

- [ ] ✅ Prayer Wall - Submit and approve prayers
- [ ] ✅ Event Management - Create, edit, delete events
- [ ] ✅ Settings Panel - Modify and save settings
- [ ] ✅ User Management - CRUD operations on users
- [ ] ✅ Donation History - View history and receipts
- [ ] ✅ Volunteer Scheduler - Sign up and cancel shifts
- [ ] ✅ Database - All data persists correctly
- [ ] ✅ Forms - All validation working
- [ ] ✅ API - All endpoints responding
- [ ] ✅ Authentication - Login/logout working

---

## 📊 Performance Check

**What to Monitor:**
- [ ] Page load times (should be < 3 seconds)
- [ ] API response times (should be < 500ms)
- [ ] Database queries (check logs for slow queries)
- [ ] Memory usage (monitor with `htop` or Activity Monitor)

---

## 🎉 Success Criteria

**All features pass testing when:**
1. ✅ All forms submit successfully
2. ✅ All data persists to database
3. ✅ All pages load without errors
4. ✅ All CRUD operations work
5. ✅ All validations prevent bad data
6. ✅ All error messages display correctly
7. ✅ All success messages show feedback
8. ✅ All charts and stats display
9. ✅ All filters and search work
10. ✅ Authentication protects admin routes

---

## 🚀 Ready for Production?

After testing, if all features work:

1. **Review Security:**
   - [ ] Authentication on all admin routes
   - [ ] Input validation on all forms
   - [ ] SQL injection prevention (Prisma handles this)
   - [ ] XSS prevention (React handles this)

2. **Configure Production:**
   - [ ] Set up PostgreSQL database
   - [ ] Update DATABASE_URL
   - [ ] Set NEXTAUTH_SECRET
   - [ ] Configure SendGrid
   - [ ] Configure Stripe

3. **Deploy:**
   - [ ] Commit all changes
   - [ ] Push to GitHub
   - [ ] Deploy to Vercel/AWS/etc
   - [ ] Run migrations on production DB
   - [ ] Test in production environment

---

**Happy Testing!** 🎉

If you encounter any issues, check:
1. Browser console for frontend errors
2. `/tmp/nextjs-dev.log` for server errors
3. `lib/db/dev.db` to verify database exists
4. Prisma Studio to inspect data directly

All 6 features are ready to test!
