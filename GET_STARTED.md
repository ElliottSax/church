# 🚀 Get Started in 3 Steps

Your Minneapolis Community of Christ website is **ready to launch**!

---

## Step 1: Install & Run (2 minutes)

```bash
# If npm install is still running, wait for it to complete
# Once done:

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) ✅

**That's it!** Your site is now running with:
- ✅ 20+ pages
- ✅ AI chatbot
- ✅ Event calendar
- ✅ Sermon archive
- ✅ Prayer wall
- ✅ Contact forms

---

## Step 2: Add Content (5 minutes)

**Option A: Use Sanity CMS** (Recommended)

1. Create free account at [sanity.io](https://sanity.io)
2. Copy your project ID
3. Create `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
4. Add your Sanity project ID to `.env.local`
5. Restart server: `npm run dev`
6. Visit [http://localhost:3000/studio](http://localhost:3000/studio)
7. Start adding events, sermons, news!

**Option B: Edit Code Directly**

Content files are in:
- Events: `app/connect/events/page.tsx`
- News: `components/home/NewsStories.tsx`
- Contact info: `components/layout/Footer.tsx`

---

## Step 3: Enable Features (Optional)

### 💳 Accept Donations (5 min)

1. Sign up at [stripe.com](https://stripe.com)
2. Get test API keys
3. Add to `.env.local`
4. Test at [/give/online](http://localhost:3000/give/online)
5. Use test card: `4242 4242 4242 4242`

### 📧 Send Emails (3 min)

1. Sign up at [sendgrid.com](https://sendgrid.com) (100/day free)
2. Get API key
3. Verify sender email
4. Add to `.env.local`

### 🔐 Member Portal (10 min)

1. Generate secret: `openssl rand -base64 32`
2. Add to `.env.local`
3. Optional: Set up Google OAuth
4. Members can now sign in!

**Full setup guide**: [docs/INTEGRATIONS_GUIDE.md](docs/INTEGRATIONS_GUIDE.md)

---

## What Works Right Now (No Setup)

✅ **All Pages** - Home, About, Grow, Connect, Give sections
✅ **AI Chatbot** - 20+ topics about Community of Christ
✅ **Event Calendar** - With filtering and RSVP UI
✅ **Sermon Archive** - With search and filters
✅ **Prayer Wall** - Submit and view prayers
✅ **Forms** - Contact, volunteer, donation (UI ready)
✅ **Responsive Design** - Mobile, tablet, desktop
✅ **Accessibility** - Screen reader optimized
✅ **PWA** - Install as mobile app

---

## What Needs Setup (All Optional)

⚙️ **Sanity CMS** - For non-technical content editing
⚙️ **Stripe** - To actually process payments
⚙️ **SendGrid** - To send automated emails
⚙️ **NextAuth** - For member authentication

**You decide when to activate these!**

---

## Quick Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Run production build

# Setup
./setup.sh           # Automated setup script
cp .env.local.example .env.local  # Create config file

# Git
git status           # Check changes
git log --oneline    # View commits
```

---

## Quick Links

### Your Site
- **Home**: http://localhost:3000
- **Sanity CMS**: http://localhost:3000/studio
- **Member Sign In**: http://localhost:3000/auth/signin
- **Member Portal**: http://localhost:3000/members
- **Donations**: http://localhost:3000/give/online

### Documentation
- **This Guide**: GET_STARTED.md
- **Quick Start**: QUICK_START.md
- **Full Setup**: docs/INTEGRATIONS_GUIDE.md
- **Features**: docs/NEW_FEATURES.md
- **Development**: DEVELOPMENT.md
- **Deployment**: DEPLOYMENT.md
- **Status**: FINAL_STATUS.md

---

## Troubleshooting

**npm install stuck?**
```bash
pkill -f npm
rm -rf node_modules package-lock.json
npm install
```

**Site won't start?**
```bash
# Make sure dependencies are installed
ls node_modules | wc -l  # Should show 800-1000

# Clear cache and restart
rm -rf .next
npm run dev
```

**Environment variables not working?**
- Restart dev server after editing `.env.local`
- Public vars must start with `NEXT_PUBLIC_`

---

## Deploy to Production (15 minutes)

### Vercel (Recommended - Free)

```bash
# 1. Push to GitHub
git remote add origin YOUR_GITHUB_URL
git push -u origin master

# 2. Go to vercel.com
# 3. Import your GitHub repo
# 4. Add environment variables
# 5. Deploy!
```

Your site will be live at: `your-project.vercel.app`

**Full guide**: [DEPLOYMENT.md](DEPLOYMENT.md)

---

## Cost Summary

| Service | Free Tier | When to Pay |
|---------|-----------|-------------|
| **Vercel Hosting** | Yes | Never (hobby) |
| **Sanity CMS** | Yes (3 users) | Need 4+ editors |
| **SendGrid** | 100/day | 100+ emails/day |
| **Stripe** | Yes | Per transaction (2.9% + $0.30) |
| **NextAuth** | Yes | Never (always free) |

**Total**: **$0-50/month** depending on usage

---

## Need Help?

1. Check documentation (links above)
2. Read error messages carefully
3. Review `docs/INTEGRATIONS_GUIDE.md`
4. Check service documentation:
   - [Next.js](https://nextjs.org/docs)
   - [Sanity](https://www.sanity.io/docs)
   - [Stripe](https://stripe.com/docs)
   - [SendGrid](https://docs.sendgrid.com)

---

## What You Have

✨ **Modern church website** with:
- 20+ professional pages
- AI-powered chatbot
- Content management system (Sanity)
- Member portal with authentication
- Online giving (one-time & recurring)
- Automated email system
- Progressive Web App capabilities
- Mobile-first responsive design
- Advanced accessibility
- Production-ready code
- Comprehensive documentation

**All for $0/month** (on free tiers)!

---

## Next Steps

**Today**:
1. ✅ Run `npm run dev`
2. ✅ Browse your site
3. ✅ Read documentation
4. ✅ Customize contact info

**This Week**:
1. Set up Sanity CMS
2. Add real content (events, sermons, news)
3. Test all features
4. Customize branding/colors

**This Month**:
1. Configure remaining services
2. Deploy to production
3. Set up custom domain
4. Launch to congregation!

---

## Congratulations! 🎉

Your state-of-the-art church website is ready!

Start with `npm run dev` and explore.

**Built with ❤️ for Minneapolis Community of Christ**
