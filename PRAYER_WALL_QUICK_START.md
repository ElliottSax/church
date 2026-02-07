# Prayer Wall Quick Start Guide

## What Was Changed

### ✅ Prayer Wall Component (`components/home/PrayerWall.tsx`)
- **Before**: Displayed 3 hardcoded mock prayers
- **After**: Fetches real prayers from API, allows form submission, shows loading/error states

### ✅ Admin Dashboard (`app/admin/dashboard/page.tsx`)
- **Before**: Showed pending prayers but buttons did nothing
- **After**: Functional approve/decline buttons that update the database

### ✅ New API Endpoint (`app/api/v2/prayer-requests/[id]/route.ts`)
- **Created**: GET, PATCH, DELETE endpoints for individual prayer requests

### ✅ New Admin Component (`components/admin/PendingPrayersCard.tsx`)
- **Created**: Client component with approval logic

## How to Test

### 1. Test Prayer Submission (Public User)

```bash
# Start the dev server
npm run dev
```

1. Open http://localhost:3000
2. Scroll to "Community Prayer Wall" section
3. Fill out the form:
   - Name: "Test User"
   - Category: "Healing"
   - Request: "Please pray for my family during this difficult time."
4. Click "Submit Prayer Request"
5. ✅ Should see: "Your prayer request has been submitted and is pending approval"

### 2. Test Prayer Approval (Admin)

1. Open http://localhost:3000/admin/dashboard
2. Find "Pending Prayer Requests" card
3. Click green "Approve" button on your test prayer
4. ✅ Should see: "Prayer request approved successfully!"
5. Prayer should disappear from pending list

### 3. Verify on Prayer Wall

1. Go back to http://localhost:3000
2. Scroll to "Community Prayer Wall"
3. ✅ Your approved prayer should now be visible!

## API Endpoints

### Get Public Prayers
```bash
curl http://localhost:3000/api/v2/prayer-requests
```

### Submit Prayer
```bash
curl -X POST http://localhost:3000/api/v2/prayer-requests \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "request": "Please pray for healing and strength.",
    "category": "healing",
    "isAnonymous": false,
    "isPublic": true
  }'
```

### Approve Prayer (replace ID)
```bash
curl -X PATCH http://localhost:3000/api/v2/prayer-requests/YOUR_ID \
  -H "Content-Type: application/json" \
  -d '{"approved": true}'
```

## File Structure

```
church/
├── app/
│   ├── api/v2/prayer-requests/
│   │   ├── route.ts              # GET, POST
│   │   └── [id]/route.ts         # GET, PATCH, DELETE (NEW)
│   └── admin/dashboard/
│       └── page.tsx               # Updated to use PendingPrayersCard
├── components/
│   ├── home/
│   │   └── PrayerWall.tsx        # Updated with API integration
│   └── admin/
│       └── PendingPrayersCard.tsx # NEW client component
├── lib/db/repositories/
│   └── prayer.repository.ts      # Existing (no changes)
└── scripts/
    └── test-prayer-api.ts         # NEW test script
```

## Common Issues

### "Failed to load prayer requests"
- Check if dev server is running
- Check browser console for errors
- Verify database connection

### "Failed to submit prayer request"
- Check form validation (min 10 chars, max 500)
- Check network tab for error details
- Verify API endpoint is accessible

### Approve button not working
- Check browser console for errors
- Verify you're on `/admin/dashboard` not `/admin`
- Check network tab for PATCH request

## Configuration

Edit `config/site-config.ts` to change settings:

```typescript
prayerWall: {
  requireApproval: true,    // false = auto-approve all
  allowAnonymous: true,     // false = require names
  maxRequestLength: 500,    // max characters
}
```

## Next Steps

1. ✅ Test the integration (see above)
2. Run automated tests: `npx ts-node scripts/test-prayer-api.ts`
3. Read full testing guide: `PRAYER_WALL_TESTING_GUIDE.md`
4. Review implementation: `PRAYER_WALL_IMPLEMENTATION_SUMMARY.md`
5. Deploy to staging/production

## Support

- **Testing Guide**: See `PRAYER_WALL_TESTING_GUIDE.md`
- **Full Details**: See `PRAYER_WALL_IMPLEMENTATION_SUMMARY.md`
- **Console Errors**: Press F12 in browser, check Console tab
- **Network Issues**: Press F12, check Network tab

---

**Last Updated**: 2026-02-01
**Status**: ✅ Ready for Testing
