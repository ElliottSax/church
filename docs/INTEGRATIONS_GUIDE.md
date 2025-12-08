# Integrations Guide

Complete guide for setting up all integrations for the Minneapolis Community of Christ website.

## Table of Contents

1. [Sanity.io CMS](#sanityio-cms)
2. [NextAuth.js Authentication](#nextauthjs-authentication)
3. [Stripe Payment Processing](#stripe-payment-processing)
4. [SendGrid Email Automation](#sendgrid-email-automation)

---

## Sanity.io CMS

Sanity.io provides a headless CMS for managing your content (events, sermons, news, prayer requests, volunteer opportunities).

### Setup Steps

1. **Create Sanity Account**
   - Go to [sanity.io](https://www.sanity.io)
   - Sign up for a free account
   - Create a new project

2. **Get Project Credentials**
   - Copy your Project ID
   - Set dataset name (usually `production`)
   - Generate an API token with Editor permissions

3. **Configure Environment Variables**
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token
   ```

4. **Access Sanity Studio**
   - After starting your dev server, go to: `http://localhost:3000/studio`
   - Log in with your Sanity credentials
   - Start adding content!

### Content Types Available

- **Events** - Manage church events with RSVP capabilities
- **Sermons** - Upload sermon audio/video with metadata
- **News Articles** - Post announcements and stories
- **Prayer Requests** - Moderate prayer wall submissions
- **Volunteer Opportunities** - Manage volunteer positions

### Deployment

When deploying to production:
1. Deploy Sanity Studio: `npx sanity deploy` (creates `yourproject.sanity.studio`)
2. Or use the embedded studio at `yoursite.com/studio`

### Cost

- **Free tier**: 3 users, unlimited API requests
- **Growth**: $99/month - 5 users, priority support

---

## NextAuth.js Authentication

NextAuth provides secure member authentication with multiple providers.

### Setup Steps

1. **Generate NextAuth Secret**
   ```bash
   openssl rand -base64 32
   ```
   Copy the output to your `.env.local`:
   ```
   NEXTAUTH_SECRET=your_generated_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

2. **Configure Google OAuth** (Optional but recommended)

   a. Go to [Google Cloud Console](https://console.cloud.google.com)

   b. Create a new project or select existing

   c. Enable Google+ API

   d. Go to Credentials → Create OAuth 2.0 Client ID

   e. Add authorized redirect URIs:
      - Development: `http://localhost:3000/api/auth/callback/google`
      - Production: `https://yourdomain.com/api/auth/callback/google`

   f. Add to `.env.local`:
   ```
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   ```

3. **Set Up Database** (For credential-based auth)

   The current setup includes a placeholder for credential authentication. To implement:

   - Install Prisma or your preferred ORM
   - Create a users table with email/password fields
   - Implement password hashing (bcrypt)
   - Update `app/api/auth/[...nextauth]/route.ts` with your auth logic

### Member Portal Features

- **Dashboard** - Personalized member overview
- **My Events** - View registered events
- **Giving History** - Donation tracking and tax statements
- **Groups** - Small group connections
- **Resources** - Member-only materials
- **Profile Settings** - Update preferences

### Protected Routes

Pages under `/members/*` require authentication. Unauthenticated users are redirected to `/auth/signin`.

### Cost

- **Free** - No cost for NextAuth
- **Google OAuth** - Free
- **Database hosting** - Varies by provider (Supabase free tier available)

---

## Stripe Payment Processing

Stripe handles secure online donations with one-time and recurring options.

### Setup Steps

1. **Create Stripe Account**
   - Go to [stripe.com](https://stripe.com)
   - Sign up for an account
   - Complete business verification

2. **Get API Keys**

   a. Go to Developers → API Keys

   b. Copy your keys (use test keys for development):
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
   STRIPE_SECRET_KEY=sk_test_xxxxx
   ```

3. **Set Up Webhook** (For production)

   a. Go to Developers → Webhooks → Add endpoint

   b. Add webhook URL: `https://yourdomain.com/api/stripe/webhook`

   c. Select events to listen for:
      - `payment_intent.succeeded`
      - `payment_intent.failed`
      - `customer.subscription.created`
      - `customer.subscription.updated`
      - `customer.subscription.deleted`

   d. Copy webhook secret:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```

4. **Configure Giving Form**

   The giving form at `/give/online` is ready to use. Features:
   - One-time donations
   - Monthly recurring donations
   - Multiple giving categories (General, Missions, Youth, Building, Benevolence)
   - Secure payment processing
   - Automatic email receipts

### Testing

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

Any future expiry date and any 3-digit CVC.

### Tax Receipts

Donation receipts are automatically sent via SendGrid when a payment succeeds. Ensure SendGrid is configured (see below).

### Cost

- **Transaction Fee**: 2.9% + $0.30 per transaction
- **Monthly Recurring**: Same rate
- **No monthly fee** on standard plan

---

## SendGrid Email Automation

SendGrid handles all email communications including receipts, reminders, and newsletters.

### Setup Steps

1. **Create SendGrid Account**
   - Go to [sendgrid.com](https://sendgrid.com)
   - Sign up (free tier: 100 emails/day)
   - Verify your email

2. **Create API Key**

   a. Go to Settings → API Keys → Create API Key

   b. Choose "Full Access" or "Restricted Access" (needs Mail Send permissions)

   c. Copy API key:
   ```
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

3. **Verify Sender Identity**

   a. Go to Settings → Sender Authentication

   b. Option 1: Single Sender Verification
      - Add and verify: `noreply@yourdomain.com`

   c. Option 2: Domain Authentication (recommended for production)
      - Verify your entire domain
      - Add DNS records as instructed

4. **Configure From Email**
   ```
   SENDGRID_FROM_EMAIL=noreply@minneapoliscofchrist.org
   ```

### Email Templates

Pre-built templates included:

1. **Welcome Email** - Sent to new members
   - Includes portal login link
   - Lists member benefits

2. **Event Reminder** - Sent before registered events
   - Event details (date, time, location)
   - Customizable timing

3. **Donation Receipt** - Sent after successful donation
   - Tax receipt format
   - Includes amount, date, category
   - Distinguishes one-time vs recurring

4. **Newsletter** - Bulk email to congregation
   - Custom HTML content
   - Unsubscribe link included

### Sending Emails

Use the API endpoint:

```typescript
await fetch('/api/email/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'welcome', // or 'event-reminder', 'donation-receipt', 'newsletter'
    data: {
      email: 'member@example.com',
      name: 'John Doe',
      // ... other template-specific data
    }
  })
});
```

### Email Triggers

Automatic emails can be triggered on:
- New member registration → Welcome email
- Event RSVP → Confirmation + reminder (24hrs before)
- Donation → Receipt email
- Newsletter publication → Bulk send

### Cost

- **Free tier**: 100 emails/day forever
- **Essentials**: $19.95/month - 50,000 emails
- **Pro**: $89.95/month - 100,000 emails

---

## Production Deployment

### Pre-Deployment Checklist

- [ ] All environment variables set in Vercel/hosting provider
- [ ] Sanity project created and configured
- [ ] NextAuth secret generated
- [ ] Google OAuth configured (if using)
- [ ] Stripe account verified
- [ ] Stripe webhook configured
- [ ] SendGrid sender verified
- [ ] Domain email configured for SendGrid

### Environment Variables

Ensure ALL environment variables from `.env.example` are set in your production environment:

**Vercel Deployment:**
1. Go to Project Settings → Environment Variables
2. Add all variables from `.env.example` with production values
3. Redeploy

**Important Security Notes:**
- NEVER commit `.env.local` to git
- Use production API keys in production
- Keep `NEXTAUTH_SECRET` and `STRIPE_SECRET_KEY` secure
- Rotate API keys periodically

---

## Testing the Integrations

### Sanity CMS
1. Go to `/studio`
2. Add a test event
3. View it on `/connect/events`

### NextAuth
1. Visit `/auth/signin`
2. Sign in with Google
3. Access `/members` portal

### Stripe
1. Go to `/give/online`
2. Use test card: `4242 4242 4242 4242`
3. Check email for receipt

### SendGrid
1. Submit a donation
2. Check inbox for receipt
3. Verify email formatting

---

## Troubleshooting

### Sanity Studio won't load
- Check `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Verify API token has correct permissions
- Clear browser cache

### NextAuth errors
- Ensure `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Verify Google OAuth redirect URIs

### Stripe payment fails
- Use test card numbers in development
- Check Stripe dashboard for error details
- Verify webhook secret in production

### Emails not sending
- Check SendGrid API key is valid
- Verify sender email is authenticated
- Check SendGrid activity log

---

## Support Resources

- **Sanity**: [sanity.io/docs](https://www.sanity.io/docs)
- **NextAuth**: [next-auth.js.org/getting-started](https://next-auth.js.org/getting-started)
- **Stripe**: [stripe.com/docs](https://stripe.com/docs)
- **SendGrid**: [docs.sendgrid.com](https://docs.sendgrid.com)

---

## Cost Summary

| Service | Free Tier | Paid Plan | When to Upgrade |
|---------|-----------|-----------|-----------------|
| **Sanity** | 3 users, unlimited API | $99/month | Need more users/advanced features |
| **NextAuth** | Free | Free | N/A |
| **Stripe** | No monthly fee | No monthly fee | N/A (pay per transaction) |
| **SendGrid** | 100 emails/day | $19.95/month | Sending 100+ emails/day |

**Estimated Monthly Cost**: $0-150 depending on usage

---

**Questions?** Contact the web ministry team or refer to the official documentation for each service.
