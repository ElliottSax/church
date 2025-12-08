# Deployment Guide

Complete guide to deploying your Minneapolis Community of Christ website.

## 🚀 Quick Deploy to Vercel (Recommended)

Vercel is the easiest and best hosting platform for Next.js sites. It's **free** for hobby projects!

### **Step 1: Push to GitHub**

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial Minneapolis Community of Christ website"

# Create repository on GitHub (https://github.com/new)
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/minneapolis-coc-website.git
git branch -M main
git push -u origin main
```

### **Step 2: Deploy to Vercel**

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Vercel auto-detects Next.js settings
5. Click **"Deploy"**

That's it! Your site will be live at `your-project.vercel.app` in ~2 minutes.

### **Step 3: Add Custom Domain (Optional)**

1. In Vercel project settings → Domains
2. Add your domain (e.g., `minneapoliscofchrist.org`)
3. Update DNS records as instructed
4. SSL certificate auto-configured!

## 🔧 Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME="Minneapolis Community of Christ"

# Contact Info
NEXT_PUBLIC_CHURCH_EMAIL=info@minneapoliscofchrist.org
NEXT_PUBLIC_CHURCH_PHONE=(612) 555-1234

# Optional: Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional: If you add OpenAI chatbot
OPENAI_API_KEY=sk-...
```

## 📱 Progressive Web App (PWA) Setup

Your site is already PWA-ready! Just add icons:

### **Create Icons**

1. Design a 512x512px icon (church logo or cross)
2. Use [RealFaviconGenerator](https://realfavicongenerator.net/) to create all sizes
3. Add to `/public` folder:
   - `icon-192.png`
   - `icon-512.png`
   - `favicon.ico`

Users can now "Add to Home Screen" on mobile!

## 🌐 Alternative Deployment Options

### **Netlify**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### **AWS Amplify**

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Connect GitHub repository
3. Configure build settings (auto-detected)
4. Deploy

### **DigitalOcean App Platform**

1. Create account at [DigitalOcean](https://www.digitalocean.com)
2. Apps → Create App
3. Connect GitHub
4. Select repository
5. Deploy (starts at $5/month)

### **Self-Hosting (VPS)**

If you have your own server:

```bash
# Build for production
npm run build

# Start server
npm start

# Or use PM2 for process management
npm install -g pm2
pm2 start npm --name "church-website" -- start
pm2 save
pm2 startup
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name minneapoliscofchrist.org;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔒 SSL/HTTPS Setup

### **Vercel/Netlify/Amplify**
✅ Automatic! SSL certificates auto-configured.

### **Self-Hosted**

Use Let's Encrypt (free):

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d minneapoliscofchrist.org -d www.minneapoliscofchrist.org

# Auto-renewal
sudo certbot renew --dry-run
```

## 📊 Analytics Setup

### **Google Analytics 4**

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to environment variables
4. Update `app/layout.tsx`:

```typescript
// Add to <head>
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
  `}
</Script>
```

### **Vercel Analytics** (Recommended)

Super simple, privacy-friendly, no cookies needed!

```bash
npm install @vercel/analytics

# Add to app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

// In return statement
<Analytics />
```

Free on Vercel! See page views, top pages, referrers.

## 🔍 SEO Optimization

### **Sitemap**

Create `app/sitemap.ts`:

```typescript
export default function sitemap() {
  return [
    {
      url: 'https://minneapoliscofchrist.org',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://minneapoliscofchrist.org/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Add all your pages
  ];
}
```

### **Robots.txt**

Create `app/robots.ts`:

```typescript
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://minneapoliscofchrist.org/sitemap.xml',
  };
}
```

### **Google Search Console**

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property for your domain
3. Verify ownership (via DNS or HTML file)
4. Submit sitemap

## 🐛 Debugging Deployments

### **Build Fails**

```bash
# Test build locally
npm run build

# Check for TypeScript errors
npm run lint

# Clear cache and rebuild
rm -rf .next
npm run build
```

### **Environment Variables Not Working**

- ✅ Prefix with `NEXT_PUBLIC_` for client-side
- ✅ Redeploy after adding vars in Vercel
- ✅ Restart dev server locally after changes

### **Images Not Loading**

- ✅ Check paths: `/images/photo.jpg` not `images/photo.jpg`
- ✅ Ensure files are in `/public` folder
- ✅ Add domain to `next.config.js` if external

## 📈 Performance Optimization

### **Already Optimized** ✅

- ✅ Next.js automatic code splitting
- ✅ Image optimization with next/image (when you add images)
- ✅ Font optimization with next/font
- ✅ React Server Components

### **Additional Optimizations**

**Enable compression in next.config.js:**
```javascript
module.exports = {
  compress: true,
  // ...
};
```

**Add caching headers (Vercel handles this automatically)**

## 🔔 Monitoring & Uptime

### **Free Monitoring Tools**

- **[UptimeRobot](https://uptimerobot.com)** - Free uptime monitoring
- **[Sentry](https://sentry.io)** - Error tracking (free tier)
- **Vercel Analytics** - Performance monitoring

### **Setup UptimeRobot**

1. Create account
2. Add new monitor
3. Type: HTTPS
4. URL: Your website
5. Get email alerts if site goes down

## 🔄 Continuous Deployment

**Vercel Auto-Deploys:**
- ✅ Push to `main` branch → Auto-deploys to production
- ✅ Push to other branches → Creates preview URL
- ✅ Pull requests → Automatic preview deployments

**GitHub Actions (Optional)**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test
```

## 📋 Pre-Launch Checklist

Before going live:

- [ ] All pages load correctly
- [ ] Contact info is accurate
- [ ] Service times are correct
- [ ] Links work (no 404s)
- [ ] Mobile responsive
- [ ] Chatbot works
- [ ] Forms submit successfully
- [ ] Images load
- [ ] PWA icons added
- [ ] SSL certificate active
- [ ] Google Analytics installed
- [ ] Search Console verified
- [ ] 404 page works
- [ ] Tested in Chrome, Firefox, Safari, Edge
- [ ] Accessibility tested (screen reader)

## 🎉 Launch Day

1. **Final Deploy**
   ```bash
   git add .
   git commit -m "Final pre-launch updates"
   git push origin main
   ```

2. **Verify Production**
   - Visit live site
   - Test all major features
   - Check on mobile

3. **Announce**
   - Update old website
   - Email congregation
   - Social media posts
   - Bulletin announcement

4. **Monitor**
   - Check analytics first week
   - Fix any reported issues
   - Gather feedback

## 🆘 Support

**Issues?**
- Check [Next.js Docs](https://nextjs.org/docs)
- Ask Vercel Support (excellent!)
- Community forums
- Contact web ministry team

---

**Congratulations! Your website is live! 🎊**

Remember: Deployment is not the end—keep your content fresh and updated!
