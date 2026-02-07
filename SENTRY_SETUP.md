# 🔍 Sentry Setup - Church Website

## Quick Start

### 1. Get Your Sentry DSN

1. Go to https://sentry.io and create a free account
2. Create a new project:
   - Platform: **Next.js**
   - Project name: **Church Website**
3. Copy the DSN (looks like: `https://abc123@o456.ingest.sentry.io/789`)

### 2. Add to Environment

Add to your `.env.local` file:

```bash
# Server-side error tracking
SENTRY_DSN=https://your-key-here@o123456.ingest.sentry.io/7890123

# Client-side error tracking (same DSN or different)
NEXT_PUBLIC_SENTRY_DSN=https://your-key-here@o123456.ingest.sentry.io/7890123

# Optional: For source map uploads in production
SENTRY_ORG=your-organization-slug
SENTRY_PROJECT=church-website
SENTRY_AUTH_TOKEN=your-auth-token
```

### 3. Start the Dev Server

```bash
npm run dev
```

### 4. Test Error Tracking

Open your browser console and type:

```javascript
throw new Error('Test error from browser');
```

Or create a test API error:

```bash
curl http://localhost:3000/api/test-error
```

Check your Sentry dashboard - you should see the errors!

## Features Enabled

### Client-Side (Browser)
- ✅ Automatic error capture
- ✅ Session replay (10% sample rate)
- ✅ User interaction tracking
- ✅ Console log capture
- ✅ Network request tracking

### Server-Side (API Routes, Server Components)
- ✅ Automatic error capture
- ✅ Performance monitoring
- ✅ Database query tracking
- ✅ Request context

### Edge Runtime (Middleware)
- ✅ Error capture in middleware
- ✅ Edge function monitoring

## Usage Examples

### API Routes

```typescript
// app/api/donations/route.ts
import { withSentry, captureException } from '@/lib/sentry';

export const POST = withSentry(async (req: Request) => {
  try {
    const body = await req.json();
    const result = await processDonation(body);
    return NextResponse.json(result);
  } catch (error) {
    captureException(error, {
      donation: body
    });
    throw error;
  }
});
```

### Server Actions

```typescript
// app/actions/prayer-requests.ts
'use server'

import { withServerAction } from '@/lib/sentry';

export const submitPrayerRequest = withServerAction(async (formData: FormData) => {
  const name = formData.get('name');
  const request = formData.get('request');

  await savePrayerRequest({ name, request });

  return { success: true };
});
```

### Client Components

```typescript
// components/DonationForm.tsx
'use client'

import { captureException, addBreadcrumb } from '@/lib/sentry';

export function DonationForm() {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    addBreadcrumb({
      category: 'donation',
      message: 'User initiated donation',
      data: { amount: formData.amount }
    });

    try {
      await submitDonation(formData);
    } catch (error) {
      captureException(error, {
        donation: formData
      });
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Set User Context

```typescript
// On login
import { setUser } from '@/lib/sentry';

setUser({
  id: user.id,
  email: user.email,
  username: user.name
});

// On logout
import { clearUser } from '@/lib/sentry';

clearUser();
```

## Configuration Files

### Client Config (`sentry.client.config.ts`)
- Browser error tracking
- Session replay
- User interaction monitoring

### Server Config (`sentry.server.config.ts`)
- API route error tracking
- Server component monitoring
- Database query tracking

### Edge Config (`sentry.edge.config.ts`)
- Middleware error tracking
- Edge function monitoring

### Helper Utilities (`lib/sentry.ts`)
- Convenient wrapper functions
- Type-safe error tracking
- Performance monitoring helpers

## Dashboard Features

Visit your Sentry dashboard to see:

1. **Issues Tab**
   - All errors grouped by type
   - Stack traces with source maps
   - Affected users and frequency

2. **Performance Tab**
   - API endpoint latency
   - Database query performance
   - Page load times

3. **Replays Tab**
   - Video-like replay of user sessions
   - See exactly what user did before error
   - Console logs and network requests

4. **Releases Tab**
   - Track errors by deployment
   - Compare error rates between versions
   - Automatic regression detection

## Privacy & Security

All configurations automatically:
- ✅ Remove cookies from error reports
- ✅ Redact authorization headers
- ✅ Filter sensitive query parameters
- ✅ Mask passwords and tokens
- ✅ Sanitize PII (Personally Identifiable Information)

## Sample Rates

### Development
- Errors: 100% (all errors)
- Performance: 100% (all transactions)
- Replays: 10% (sample of sessions)

### Production
- Errors: 100% (all errors)
- Performance: 10% (10% of transactions)
- Replays: 1% (minimize impact)

Edit in config files to adjust.

## Source Maps (Production)

For readable stack traces in production:

1. Get auth token from Sentry:
   - Settings → Account → API → Auth Tokens
   - Create token with `project:releases` and `org:read` scopes

2. Add to `.env.local`:
   ```bash
   SENTRY_AUTH_TOKEN=your-token-here
   SENTRY_ORG=your-org-slug
   SENTRY_PROJECT=church-website
   ```

3. Build for production:
   ```bash
   npm run build
   ```

Source maps will be automatically uploaded!

## Testing

### Test Client-Side Error

```typescript
// pages/test.tsx
export default function TestPage() {
  return (
    <button onClick={() => {
      throw new Error('Test client error');
    }}>
      Trigger Error
    </button>
  );
}
```

### Test Server-Side Error

```typescript
// app/api/test-error/route.ts
export async function GET() {
  throw new Error('Test server error');
}
```

### Test Performance

Performance is automatically tracked for all API routes and page loads.

## Alerts

Set up alerts in Sentry dashboard:

1. **New Issue Alert**
   - Get notified when new errors occur
   - Email or Slack notifications

2. **Issue Spike Alert**
   - Detect sudden increase in errors
   - Catch regressions quickly

3. **Performance Alert**
   - Get notified of slow endpoints
   - Track performance degradation

## Next Steps

1. ✅ Configure environment variables
2. ⏳ Test error tracking in development
3. ⏳ Set up Slack/email alerts
4. ⏳ Configure source map uploads
5. ⏳ Set up release tracking in CI/CD

## Troubleshooting

### Errors Not Appearing

1. Check DSN is set: `echo $SENTRY_DSN`
2. Check browser console for Sentry initialization
3. Verify error is actually thrown (not caught silently)

### Source Maps Not Working

1. Ensure `SENTRY_AUTH_TOKEN` is set
2. Check build output for "Uploading source maps"
3. Verify organization and project names

### Performance Overhead

If you notice slowdowns:
1. Reduce `tracesSampleRate` to 0.05 (5%)
2. Disable session replay in production
3. Use `beforeSend` to filter noisy errors

## Support

- **Docs**: https://docs.sentry.io/platforms/javascript/guides/nextjs/
- **Community**: https://discord.gg/sentry
- **GitHub**: https://github.com/getsentry/sentry-javascript

---

**Cost**: FREE up to 5,000 events/month
**Setup time**: 5 minutes
**Value**: Know about bugs before your congregation does! 🙏✨
