# ✅ Priority Task List - Church Website Improvements

**Use this as your working checklist**

---

## 🔴 CRITICAL - Do First (This Week)

### 1. Error Monitoring
- [ ] Install Sentry: `npm install @sentry/nextjs`
- [ ] Run setup wizard: `npx @sentry/wizard@latest -i nextjs`
- [ ] Add DSN to .env.local
- [ ] Test error capture
- [ ] Configure alerts
**Time**: 4 hours | **Impact**: High

### 2. Security Headers
- [ ] Add headers() to next.config.js
- [ ] Test with https://securityheaders.com
- [ ] Verify CSP doesn't break functionality
**Time**: 2 hours | **Impact**: High

### 3. Fix Build Configuration
- [ ] Remove `ignoreBuildErrors: true` from next.config.js
- [ ] Remove `ignoreDuringBuilds: true` from next.config.js
- [ ] Run `npm run build` to see errors
- [ ] Fix all TypeScript errors
- [ ] Fix all ESLint warnings
**Time**: 1-2 days | **Impact**: Critical

### 4. Replace Console.log
- [ ] Install Winston: `npm install winston`
- [ ] Create lib/logger.ts
- [ ] Replace console.log in 42 files
- [ ] Test logging in development
- [ ] Configure production logs
**Time**: 1 day | **Impact**: Medium

### 5. Database Migration
- [ ] Choose PostgreSQL provider (Vercel/Neon/Supabase)
- [ ] Update schema.prisma to use postgresql
- [ ] Get connection string
- [ ] Run `npx prisma migrate dev`
- [ ] Test all database operations
- [ ] Update deployment config
**Time**: 1-2 days | **Impact**: Critical

---

## 🟡 HIGH PRIORITY - Do Next (Week 2)

### 6. Rate Limiting
- [ ] Create middleware/rate-limit.ts
- [ ] Apply to public API routes
- [ ] Test rate limits
- [ ] Add monitoring
**Time**: 4 hours | **Impact**: High

### 7. Input Validation
- [ ] Install: `npm install dompurify validator`
- [ ] Create lib/validators.ts
- [ ] Add validation to all form inputs
- [ ] Sanitize user content
- [ ] Test XSS prevention
**Time**: 1 day | **Impact**: High

### 8. Security Audit
- [ ] Run `npm audit`
- [ ] Fix vulnerabilities: `npm audit fix`
- [ ] Check for outdated packages: `npm outdated`
- [ ] Update critical dependencies
- [ ] Test after updates
**Time**: 4 hours | **Impact**: High

### 9. Database Indexes
- [ ] Add indexes to Event model
- [ ] Add indexes to PrayerRequest model
- [ ] Add indexes to User model
- [ ] Run migration
- [ ] Test query performance
**Time**: 4 hours | **Impact**: Medium

### 10. Environment Variables
- [ ] Audit .env files
- [ ] Ensure .env in .gitignore
- [ ] Move secrets to Vercel env vars
- [ ] Document required env vars
- [ ] Add .env.example validation
**Time**: 2 hours | **Impact**: High

---

## 🟢 MEDIUM PRIORITY - Do Soon (Week 3-4)

### 11. Testing Infrastructure
- [ ] Install Vitest: `npm install -D vitest @vitest/ui @testing-library/react`
- [ ] Create vitest.config.ts
- [ ] Create test/setup.ts
- [ ] Add test scripts to package.json
- [ ] Write first test
**Time**: 1 day | **Impact**: Critical (long-term)

### 12. Component Unit Tests
- [ ] Test PrayerWall component
- [ ] Test EventCard component
- [ ] Test forms (RSVP, Prayer submission)
- [ ] Test admin components
- [ ] Achieve 50% coverage
**Time**: 3 days | **Impact**: High

### 13. API Integration Tests
- [ ] Test /api/v2/events routes
- [ ] Test /api/v2/prayer-requests routes
- [ ] Test /api/v2/donations routes
- [ ] Test authentication flows
- [ ] Achieve 70% API coverage
**Time**: 3 days | **Impact**: High

### 14. Image Optimization
- [ ] Audit all <img> tags
- [ ] Replace with Next.js <Image>
- [ ] Add width/height to all images
- [ ] Configure image loader
- [ ] Test all images render correctly
**Time**: 1 day | **Impact**: Medium

### 15. Bundle Analysis
- [ ] Install: `npm install -D @next/bundle-analyzer`
- [ ] Configure in next.config.js
- [ ] Run: `ANALYZE=true npm run build`
- [ ] Identify large dependencies
- [ ] Implement code splitting where needed
**Time**: 1 day | **Impact**: Medium

---

## 🔵 LOWER PRIORITY - Nice to Have (Week 5+)

### 16. API Documentation
- [ ] Install Swagger tools
- [ ] Create /api/docs route
- [ ] Add JSDoc to all API routes
- [ ] Generate OpenAPI spec
- [ ] Test interactive docs
**Time**: 2 days | **Impact**: Medium

### 17. SEO Optimization
- [ ] Generate sitemap.xml
- [ ] Create robots.txt
- [ ] Add structured data (Schema.org)
- [ ] Audit meta tags
- [ ] Add Open Graph images
**Time**: 2 days | **Impact**: Medium

### 18. Accessibility Audit
- [ ] Install @axe-core/react
- [ ] Run automated audit
- [ ] Fix critical issues
- [ ] Test with screen reader
- [ ] Ensure WCAG 2.1 AA compliance
**Time**: 1 week | **Impact**: High

### 19. E2E Tests
- [ ] Install Playwright
- [ ] Write E2E for prayer submission
- [ ] Write E2E for event RSVP
- [ ] Write E2E for admin workflows
- [ ] Add to CI/CD pipeline
**Time**: 1 week | **Impact**: Medium

### 20. Performance Monitoring
- [ ] Set up Vercel Analytics
- [ ] Configure Core Web Vitals tracking
- [ ] Set performance budgets
- [ ] Monitor API response times
- [ ] Set up alerts
**Time**: 1 day | **Impact**: Medium

---

## 📊 Progress Tracking

### Week 1 Target: Tasks 1-5 ✅
**Focus**: Critical fixes (Sentry, Security, TypeScript, Logging, Database)

### Week 2 Target: Tasks 6-10 ✅
**Focus**: Security hardening (Rate limiting, Validation, Audits)

### Week 3-4 Target: Tasks 11-15 ✅
**Focus**: Testing & Performance

### Week 5+ Target: Tasks 16-20 ✅
**Focus**: Polish & Enhancements

---

## 🎯 Quick Wins (Do Today!)

Pick ONE of these and complete it today:

1. **Add Sentry** (4 hours)
   - Immediate error visibility
   - Easy setup with wizard

2. **Security Headers** (2 hours)
   - Copy/paste config
   - Instant security boost

3. **Database Indexes** (4 hours)
   - Add @@index to models
   - Run migration
   - Immediate performance boost

4. **Rate Limiting** (4 hours)
   - Create simple middleware
   - Apply to public routes
   - Prevent abuse

---

## 💡 Working Notes

### Completed Tasks
_Track your progress here_

- [ ]
- [ ]
- [ ]

### Blockers
_Note any issues_

-

### Questions
_Things to research_

-

---

## 🔗 Quick Links

- **Project**: /mnt/e/projects/church
- **Main Analysis**: AREAS_OF_IMPROVEMENT.md
- **Action Plan**: IMPROVEMENT_ACTION_PLAN.md
- **This Checklist**: PRIORITY_TASK_LIST.md

---

## 📝 Daily Standup Template

**What did I complete yesterday?**


**What am I working on today?**


**Any blockers?**


---

**Remember**: Done is better than perfect. Ship incrementally! 🚀
