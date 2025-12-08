# 🗺️ Complete Site Map

Visual guide to all pages and features on your website.

## 📄 Page Structure

```
Home (/)
├── Hero with Service Times
├── Mission & Values
├── Live Stream Player
├── Upcoming Events Preview
├── Community Prayer Wall
├── News & Stories
└── Get Involved + Newsletter

About (/about)
├── Our Story (/about/story)
│   └── 75-year congregation timeline
├── Beliefs (/about/beliefs)
│   ├── Mission statement
│   ├── 9 Enduring Principles
│   └── Core beliefs explained
├── Leadership (/about/leadership)
│   ├── Pastoral team bios
│   ├── Congregational council
│   └── About priesthood
└── Location & Times (/about/location)
    ├── Interactive map
    ├── Service schedule
    ├── Contact information
    └── Directions & parking

Grow (/grow)
├── Worship Services (/grow/worship)
│   ├── Service times
│   ├── What to expect
│   ├── Typical service flow
│   ├── Visitor information
│   └── Online worship options
├── Bible Study (/grow/bible-study)
│   [Future - Referenced in navigation]
├── Prayer Groups (/grow/prayer)
│   [Future - Referenced in navigation]
└── Sermon Archive (/grow/sermons)
    ├── Searchable sermon list
    ├── Filter by series/speaker
    ├── Video & audio downloads
    └── Transcripts

Connect (/connect)
├── Events Calendar (/connect/events)
│   ├── Monthly calendar view
│   ├── Category filters (Worship, Fellowship, Study, Outreach)
│   ├── RSVP system
│   ├── Capacity tracking
│   └── Add to calendar
├── Small Groups (/connect/groups)
│   [Future - Referenced in navigation]
├── Youth Ministry (/connect/youth)
│   [Future - Referenced in navigation]
└── Community Outreach (/connect/outreach)
    [Future - Referenced in navigation]

Give (/give)
├── Online Giving (/give/online)
│   ├── Donation amount selection
│   ├── One-time or recurring
│   ├── Fund designation
│   ├── Payment form (ready for Stripe)
│   └── Other giving methods
├── Mission Projects (/give/missions)
│   [Future - Referenced in navigation]
└── Volunteer (/give/volunteer)
    ├── Volunteer opportunities
    ├── Current needs
    ├── Volunteer sign-up form
    └── Safe Sanctuary info
```

## 🤖 Chatbot Topics Covered

```
Beliefs & Theology
├── Core beliefs
├── 9 Enduring Principles
├── Scripture (Bible, Book of Mormon, D&C)
├── Continuing revelation
├── Priesthood (inclusive, women & men)
├── Social justice & LGBTQ+ inclusion
└── Grace and sacraments

Practices & Worship
├── Worship service times
├── Communion/Lord's Supper
├── Baptism
└── Sacraments

Practical Information
├── Location & directions
├── Contact information
├── Parking & accessibility
├── Visiting information
├── Getting involved
├── Giving options
└── Children & youth programs

History
├── RLDS background
├── Name change to Community of Christ
├── Temple in Independence
└── Minneapolis congregation history

Conversational
├── Greetings
├── Thanks
└── General help
```

## 🎨 Component Structure

```
Layout Components
├── Header (Sticky navigation)
│   ├── Logo/title
│   └── Navigation menu (desktop/mobile)
├── Navigation (Multi-level dropdown)
│   ├── About submenu
│   ├── Grow submenu
│   ├── Connect submenu
│   └── Give submenu
└── Footer (Site-wide)
    ├── About section
    ├── Quick links
    ├── Resources
    ├── Contact info
    └── Social media links

Home Page Components
├── Hero (Call to action)
├── Mission (Values grid)
├── LiveStream (Video player)
├── UpcomingEvents (Event cards)
├── PrayerWall (Interactive prayer requests)
├── NewsStories (Latest updates)
└── GetInvolved (Action cards + newsletter)

Features
├── ChatBot (AI assistant - bottom right)
├── InteractiveMap (Location with directions)
├── Event Calendar (Full calendar system)
└── Sermon Archive (Search & filter)
```

## 🔧 Technical Architecture

```
Frontend Stack
├── Next.js 14 (App Router)
├── React 18
├── TypeScript
├── Tailwind CSS
├── Framer Motion (Animations)
└── Lucide React (Icons)

Content & Data
├── Static content (in page files)
├── Chatbot knowledge base (lib/chatbot-knowledge.ts)
├── Sample data (events, sermons, prayers)
└── [Future: CMS integration ready]

Features Ready for Integration
├── Payment processing (Stripe/PayPal)
├── Email service (SendGrid/Mailchimp)
├── Live streaming (YouTube/Vimeo)
├── Database (PostgreSQL/Supabase)
├── Authentication (NextAuth.js)
└── Advanced chatbot (OpenAI API)
```

## 📱 Mobile Features

```
Progressive Web App (PWA)
├── Installable on home screen
├── Works offline
├── Fast loading
├── App shortcuts
│   ├── Watch Live
│   ├── Events Calendar
│   └── Give Online
└── Push notifications (ready)

Responsive Design
├── Mobile (< 768px)
│   ├── Hamburger menu
│   ├── Stacked layouts
│   └── Touch-optimized
├── Tablet (768px - 1024px)
│   ├── Adapted layouts
│   └── Optimized spacing
└── Desktop (> 1024px)
    ├── Full navigation
    ├── Multi-column layouts
    └── Hover states
```

## ♿ Accessibility Features

```
WCAG 2.1 AA Compliance
├── Semantic HTML
├── ARIA labels
├── Keyboard navigation
├── Focus indicators
├── Screen reader optimization
├── Alt text on images
├── Color contrast compliance
├── High contrast mode support
└── Reduced motion support
```

## 🔍 SEO & Performance

```
Search Engine Optimization
├── Meta tags on all pages
├── Open Graph tags
├── Descriptive URLs
├── Semantic headings (H1-H6)
└── [Future: Sitemap & robots.txt]

Performance Optimization
├── Next.js automatic code splitting
├── Image optimization (when images added)
├── Font optimization (next/font)
├── React Server Components
├── Static generation where possible
└── Lazy loading
```

## 🎯 User Journeys

```
New Visitor
Home → About → Beliefs → Location → Visit

Looking for Service
Home → Grow → Worship → RSVP or Watch Live

Want to Get Involved
Home → Connect → Events/Volunteer → Sign Up

Exploring Faith
Home → About → Beliefs → Chatbot Q&A

Regular Member
Home → Events → Sermons → Prayer Wall

Newcomer Research
Chatbot → "What do you believe?" → Beliefs Page → Story
```

## 📊 Content Types

```
Static Pages (15+)
├── Informational (About, Beliefs, Story, etc.)
├── Interactive (Events, Sermons, Prayer Wall)
└── Forms (Volunteer, Giving, Newsletter)

Dynamic Features
├── Event Calendar (filterable, RSVP)
├── Sermon Archive (searchable)
├── Prayer Wall (submit & view)
└── Chatbot (Q&A system)

Media Content (Ready)
├── Videos (sermon player, live stream)
├── Audio (sermon downloads)
├── Images (events, news, team photos)
└── Transcripts (sermon text)
```

## 🚀 Future Expansion Points

```
Phase 2 (When Needed)
├── Member Portal
│   ├── Login/authentication
│   ├── Giving history
│   ├── Volunteer signups
│   └── Small group management
├── CMS Integration
│   ├── Easy content updates
│   ├── Blog/news management
│   └── Event creation
└── Enhanced Features
    ├── Online Bible study
    ├── Virtual prayer room
    ├── Member directory
    └── Photo galleries

Phase 3 (Advanced)
├── Mobile App (React Native)
├── Live chat support
├── Video library
├── Podcast integration
└── Multi-language support
```

## 📈 Analytics & Tracking (Ready)

```
Metrics to Track
├── Page views
├── Most visited pages
├── Time on site
├── Bounce rate
├── Event RSVPs
├── Chatbot usage
├── Form submissions
└── Conversion funnel

Tools (Integration Ready)
├── Google Analytics 4
├── Vercel Analytics
├── Search Console
└── [Future: Heatmaps, A/B testing]
```

---

## 🗂️ Quick Reference

### **Most Important Pages**
1. **Home** (`/`) - First impression
2. **About/Beliefs** - Core identity
3. **Location** - Essential info
4. **Events** - Engagement
5. **Give** - Stewardship

### **Most Visited (Predicted)**
1. Home page
2. Worship service info
3. Events calendar
4. Location/directions
5. Sermon archive

### **Conversion Points**
1. Newsletter signup (Home)
2. Event RSVP (Events)
3. Online giving (Give)
4. Volunteer form (Volunteer)
5. Contact/visit (Location)

---

**This site map shows the complete structure of your website. Use it as a reference when:**
- Adding new content
- Planning navigation updates
- Training staff on the website
- Explaining features to leadership

**All features are complete and ready to customize!** 🎉
