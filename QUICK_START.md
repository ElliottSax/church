# Quick Start Guide

## For the Impatient 🚀

Get your site running in 5 minutes.

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Dev Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) ✅

---

## Want the Full Features?

Your site already has 15+ pages working. To unlock the **enterprise features**, set up these services:

### Priority 1: Sanity CMS (5 minutes)

**Why**: Edit content without touching code

1. Go to [sanity.io](https://sanity.io) → Sign up (free)
2. Create new project
3. Copy project ID
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
5. Visit `http://localhost:3000/studio`
6. Start adding events, sermons, news! 🎉

### Priority 2: SendGrid Email (3 minutes)

**Why**: Send automated emails

1. Go to [sendgrid.com](https://sendgrid.com) → Sign up (100/day free)
2. Create API key (Settings → API Keys)
3. Verify sender email
4. Add to `.env.local`:
   ```
   SENDGRID_API_KEY=SG.xxxxxxx
   SENDGRID_FROM_EMAIL=noreply@yourchurch.org
   ```

### Priority 3: Stripe Payments (5 minutes)

**Why**: Accept donations online

1. Go to [stripe.com](https://stripe.com) → Sign up
2. Use test mode (get test keys from Developers → API Keys)
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
   STRIPE_SECRET_KEY=sk_test_xxxxx
   ```
4. Visit `/give/online`
5. Test with card: `4242 4242 4242 4242` 💳

### Priority 4: Member Portal (10 minutes)

**Why**: Member authentication and dashboard

1. Generate secret:
   ```bash
   openssl rand -base64 32
   ```
2. Add to `.env.local`:
   ```
   NEXTAUTH_SECRET=your_generated_secret
   NEXTAUTH_URL=http://localhost:3000
   ```
3. *Optional*: Set up Google OAuth ([guide](docs/INTEGRATIONS_GUIDE.md#nextauthjs-authentication))

---

## Environment Variables Template

Create `.env.local`:

```bash
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Sanity (Optional - for CMS)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# NextAuth (Optional - for member portal)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Stripe (Optional - for donations)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# SendGrid (Optional - for emails)
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=noreply@yourchurch.org
```

**Tip**: Start with just Sanity. Add others as needed.

---

## What Works Without Setup?

Everything except:
- Content management (Sanity)
- Member login (NextAuth)
- Online payments (Stripe)
- Automated emails (SendGrid)

These features are **ready to activate** when you are!

---

## Deployment (When Ready)

### Vercel (Recommended - Free)

```bash
# 1. Push to GitHub
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main

# 2. Deploy
vercel
```

Or use [Vercel Dashboard](https://vercel.com/new):
1. Import your GitHub repo
2. Add environment variables
3. Deploy!

**Your site will be live at**: `your-project.vercel.app`

---

## Need More Help?

- **Full Setup**: [`docs/INTEGRATIONS_GUIDE.md`](docs/INTEGRATIONS_GUIDE.md)
- **Features Overview**: [`docs/NEW_FEATURES.md`](docs/NEW_FEATURES.md)
- **Development**: [`DEVELOPMENT.md`](DEVELOPMENT.md)
- **Deployment**: [`DEPLOYMENT.md`](DEPLOYMENT.md)

---

## Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Run production build
npm run lint         # Check for errors

# Git
git status           # Check changes
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
git push             # Push to remote
```

---

## Troubleshooting

**Port 3000 in use?**
```bash
npm run dev -- -p 3001
```

**Styles not working?**
```bash
rm -rf .next
npm run dev
```

**Environment variables not loading?**
- Restart dev server after editing `.env.local`
- Public vars must start with `NEXT_PUBLIC_`

---

## Cost Summary

| Feature | Cost |
|---------|------|
| **Basic site** | FREE (Vercel) |
| **Sanity CMS** | FREE (3 users) |
| **SendGrid** | FREE (100 emails/day) |
| **Stripe** | 2.9% per donation |
| **NextAuth** | FREE |
| **Total** | **$0/month** + transaction fees |

---

**You're all set!** 🎉

Start with `npm run dev` and explore your new site.

Configure integrations when you're ready - they're all optional but powerful!
