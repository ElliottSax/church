# 🚀 Improvement Action Plan - Church Website

**Quick Start Guide**: Prioritized tasks with step-by-step instructions

---

## 🎯 Start Here: Choose Your Path

### Path A: Quick Wins (1-2 Days) ⚡
For immediate impact with minimal effort

### Path B: Production Critical (2 Weeks) 🔴
Must-do before production launch

### Path C: Long-Term Excellence (12 Weeks) 🏆
Full transformation to production-grade application

---

## ⚡ PATH A: QUICK WINS (1-2 Days)

### 1. Add Error Monitoring with Sentry (4 hours)

```bash
# Install Sentry
npm install @sentry/nextjs

# Initialize (follow prompts)
npx @sentry/wizard@latest -i nextjs

# Add to .env.local
SENTRY_DSN=your_dsn_here
NEXT_PUBLIC_SENTRY_DSN=your_dsn_here

# Test it
# Sentry will auto-capture errors now!
```

**Impact**: Immediate visibility into production errors ✅

---

### 2. Add Security Headers (2 hours)

```javascript
// next.config.js - Add this
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
        },
      ],
    },
  ];
}
```

**Impact**: Better security posture ✅

---

### 3. Replace console.log with Winston Logger (1 day)

```bash
# Install Winston
npm install winston

# Create lib/logger.ts
```

```typescript
// lib/logger.ts
import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
```

```typescript
// Replace everywhere:
// Before: console.log('User logged in', user)
// After:
import { logger } from '@/lib/logger';
logger.info('User logged in', { userId: user.id });
```

**Impact**: Professional logging, easier debugging ✅

---

### 4. Add Database Indexes (4 hours)

```prisma
// lib/db/schema.prisma - Add indexes

model Event {
  // ... existing fields ...

  // Add these indexes
  @@index([date, status])
  @@index([category])
  @@index([slug])
  @@index([createdAt])
}

model PrayerRequest {
  // ... existing fields ...

  @@index([status])
  @@index([createdAt])
}

model User {
  // ... existing fields ...

  @@index([email])
  @@index([role])
}
```

```bash
# Apply migrations
npx prisma migrate dev --name add_performance_indexes
```

**Impact**: Faster database queries (2-5x improvement) ✅

---

### 5. Add Rate Limiting (4 hours)

```bash
npm install express-rate-limit
```

```typescript
// middleware/rate-limit.ts
import { NextRequest, NextResponse } from 'next/server';

const rateLimitMap = new Map();

export function rateLimit(limit: number = 10) {
  return (req: NextRequest) => {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowMs = 60000; // 1 minute

    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, { count: 0, resetTime: now + windowMs });
    }

    const rateData = rateLimitMap.get(ip);

    if (now > rateData.resetTime) {
      rateData.count = 0;
      rateData.resetTime = now + windowMs;
    }

    rateData.count++;

    if (rateData.count > limit) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    return null;
  };
}
```

```typescript
// Use in API routes
// app/api/prayer-wall/submit/route.ts
import { rateLimit } from '@/middleware/rate-limit';

export async function POST(req: Request) {
  const rateLimitResponse = rateLimit(5)(req); // 5 requests per minute
  if (rateLimitResponse) return rateLimitResponse;

  // ... rest of your code
}
```

**Impact**: Prevent API abuse ✅

---

## 🔴 PATH B: PRODUCTION CRITICAL (2 Weeks)

### Week 1: Fix Build & Security

#### Day 1-2: Enable TypeScript Strict Mode

```javascript
// next.config.js - Remove these dangerous flags
module.exports = {
  // ... other config
  typescript: {
    ignoreBuildErrors: false, // ✅ FIX THIS
  },
  eslint: {
    ignoreDuringBuilds: false, // ✅ FIX THIS
  },
};
```

```bash
# See all errors
npm run build

# Fix them one by one
# Common fixes:
# 1. Add missing types
# 2. Fix "any" types
# 3. Add null checks
# 4. Fix unused variables
```

#### Day 3: Add Input Validation

```bash
npm install dompurify validator
```

```typescript
// lib/validators.ts
import DOMPurify from 'dompurify';
import validator from 'validator';

export function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input);
}

export function validateEmail(email: string): boolean {
  return validator.isEmail(email);
}

export function validateURL(url: string): boolean {
  return validator.isURL(url);
}
```

#### Day 4-5: Migrate to PostgreSQL

```bash
# 1. Choose provider (Vercel Postgres, Neon, Supabase, Railway)

# 2. Update schema
# lib/db/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

# 3. Get connection string from provider
# Add to .env.local
DATABASE_URL="postgresql://..."

# 4. Run migration
npx prisma migrate dev

# 5. Test all database operations
npm run dev
```

---

### Week 2: Logging & Monitoring

#### Day 6-7: Set Up Complete Logging

- Implement Winston (see Quick Win #3)
- Add request logging middleware
- Set up log rotation
- Configure log levels per environment

#### Day 8-9: Implement Sentry Fully

- Add Sentry (see Quick Win #1)
- Add custom error boundaries
- Set up performance monitoring
- Configure source maps for better debugging
- Add user context to errors
- Set up alerts for critical errors

#### Day 10: Security Audit

```bash
# Run security audit
npm audit

# Fix vulnerabilities
npm audit fix

# Check for outdated packages
npm outdated

# Update critical packages
npm update
```

---

## 🏆 PATH C: LONG-TERM EXCELLENCE (12 Weeks)

### Phase 1: Critical (Week 1-2) ✅ Above

### Phase 2: Testing Infrastructure (Week 3-5)

```bash
# Week 3: Setup
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event msw happy-dom

# vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
```

```typescript
// test/setup.ts
import '@testing-library/jest-dom';
```

```json
// package.json - Add scripts
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

**Week 4: Write Tests**
- Unit tests for components
- API route integration tests
- Database repository tests

**Week 5: E2E Tests**
```bash
npm install -D playwright
npx playwright install

# Write E2E tests for:
# - Prayer wall submission
# - Event RSVP
# - Admin login and CRUD
# - Donation flow
```

---

### Phase 3: Performance (Week 6-7)

**Week 6: Image Optimization**
```bash
# Replace all <img> with Next.js Image
# Add proper widths and heights
# Configure image loader

# Install image optimization tools
npm install sharp
```

**Week 7: Bundle Optimization**
```bash
npm install -D @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // ... your config
});

# Analyze
ANALYZE=true npm run build
```

---

### Phase 4: Enhancements (Week 8-12)

**Week 8: API Documentation**
```bash
npm install swagger-jsdoc swagger-ui-react next-swagger-doc

# Create /api/docs route
# Generate OpenAPI spec
# Add JSDoc comments to API routes
```

**Week 9-10: SEO Optimization**
- Add sitemap.xml generation
- Add robots.txt
- Implement structured data (Schema.org)
- Meta tags for all pages
- Open Graph images
- Twitter Cards

**Week 11: Accessibility Audit**
```bash
npm install -D @axe-core/react

# Run audit
# Fix issues
# Test with screen reader
# Ensure WCAG 2.1 AA compliance
```

**Week 12: Final Polish**
- Code refactoring
- Documentation updates
- Performance optimization
- Final testing
- Production deployment

---

## 📋 Checklist: Production Readiness

### Must Have ✅
- [ ] TypeScript errors fixed
- [ ] ESLint warnings fixed
- [ ] PostgreSQL configured
- [ ] Sentry monitoring active
- [ ] Security headers configured
- [ ] Rate limiting on public APIs
- [ ] Input validation and sanitization
- [ ] Logging system implemented
- [ ] Environment variables secured
- [ ] Database backups configured

### Should Have 🟡
- [ ] Test coverage >70%
- [ ] Images optimized
- [ ] Bundle size optimized
- [ ] Database indexes added
- [ ] API documentation
- [ ] SEO optimization
- [ ] Accessibility audit passed

### Nice to Have 🟢
- [ ] E2E tests
- [ ] Performance monitoring
- [ ] Analytics dashboard
- [ ] Email template redesign
- [ ] Advanced caching
- [ ] CDN configured

---

## 🛠️ Tools & Resources

### Testing
- Vitest: https://vitest.dev/
- React Testing Library: https://testing-library.com/react
- Playwright: https://playwright.dev/
- MSW (API mocking): https://mswjs.io/

### Monitoring
- Sentry: https://sentry.io/
- Vercel Analytics: https://vercel.com/analytics
- LogRocket: https://logrocket.com/

### Performance
- Lighthouse: https://developer.chrome.com/docs/lighthouse
- WebPageTest: https://www.webpagetest.org/
- Next.js Analytics: Built-in

### Security
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- npm audit: Built-in
- Snyk: https://snyk.io/

---

## 💡 Pro Tips

1. **Start Small**: Pick one quick win and complete it today
2. **Measure First**: Run Lighthouse before/after optimizations
3. **Test in Production**: Use feature flags for gradual rollouts
4. **Automate**: Set up CI/CD to run tests on every commit
5. **Monitor**: Set up alerts for errors and performance issues
6. **Document**: Update docs as you make changes
7. **Celebrate**: Mark tasks complete and celebrate progress!

---

## 🆘 Need Help?

**Common Issues**:

### "npm run build fails"
- Check TypeScript errors: `npx tsc --noEmit`
- Check ESLint: `npm run lint`
- Clear .next: `rm -rf .next`

### "Tests fail"
- Check test setup
- Verify mocks are working
- Run with --reporter=verbose

### "Database connection fails"
- Verify DATABASE_URL
- Check Prisma schema
- Run `npx prisma generate`

---

## 📊 Track Progress

Create a project board with these columns:
- **Backlog**: All improvement tasks
- **In Progress**: Currently working on
- **Testing**: Needs verification
- **Done**: Completed and verified

Use this to track your improvement journey!

---

**Ready to start? Pick a quick win and get going! 🚀**
