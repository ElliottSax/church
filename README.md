# Minneapolis Community of Christ Website

A modern, feature-rich congregation website built with Next.js 14, TypeScript, and Tailwind CSS. This site combines traditional church website features with cutting-edge web technologies to create an engaging, accessible, and performant experience.

## 🌟 Features

### 🎯 NEW: Enterprise Integrations

#### **Sanity.io CMS** 📝
- Professional content management system
- No-code content editing for non-technical users
- Manage events, sermons, news, prayer requests, volunteers
- Real-time content updates
- Access at `/studio`

#### **NextAuth.js Member Portal** 🔐
- Secure member authentication with Google OAuth
- Personalized member dashboard
- Track events, giving history, and group memberships
- Protected member-only resources
- Profile management

#### **Stripe Payment Processing** 💳
- One-time and recurring donations
- Multiple giving categories
- Secure PCI-compliant processing
- Automatic tax receipts
- 2.9% + $0.30 per transaction

#### **SendGrid Email Automation** 📧
- Automated donation receipts
- Event reminders
- Welcome emails for new members
- Newsletter distribution
- Beautiful HTML templates

**📖 Setup Guide**: See [`docs/INTEGRATIONS_GUIDE.md`](docs/INTEGRATIONS_GUIDE.md)
**🆕 What's New**: See [`docs/NEW_FEATURES.md`](docs/NEW_FEATURES.md)

---

### Core Features (Based on cofchrist.org)
- **Responsive Design** - Mobile-first, fully responsive layout
- **Navigation** - Intuitive navigation with About, Grow, Connect, and Give sections
- **Events Calendar** - Upcoming events with RSVP functionality
- **News & Stories** - Latest congregation updates and testimonials
- **Contact Information** - Easy access to location, times, and contact details

### Cutting-Edge Features

#### 1. **Interactive Location Map** 🗺️
- Interactive map with directions and transit information
- Quick action buttons for driving, transit, and parking info
- Fully accessible with keyboard navigation

#### 2. **Live Streaming Hub** 📹
- Live worship service streaming
- Searchable sermon archive with video, audio, and transcripts
- Filter by series, speaker, or scripture reference

#### 3. **AI-Powered Chat Assistant** 🤖
- **Extensive Community of Christ knowledge base** - 20+ topics covering beliefs, practices, history
- Answers questions about worship times, beliefs, getting involved, and more
- Quick answer buttons for frequent inquiries
- Easy to expand with new content (see [Chatbot Training Guide](docs/CHATBOT_TRAINING.md))
- Located: Bottom right corner of every page
- **Try asking:** "What do you believe?", "Tell me about Community of Christ", "How can I get involved?"

#### 4. **Progressive Web App (PWA)** 📱
- Install on mobile devices like a native app
- Works offline with cached content
- Push notifications for events and updates
- App shortcuts for quick access to key features

#### 5. **Community Prayer Wall** 🙏
- Submit anonymous or named prayer requests
- Community can pray for and respond to requests
- Moderated for safety and appropriateness
- Real-time updates with engaging animations

#### 6. **Smart Event System** 📅
- Category filtering (Worship, Fellowship, Study, Outreach)
- RSVP with capacity tracking
- Calendar export (Google Calendar, Apple Calendar)
- Automated email reminders

#### 7. **Advanced Accessibility** ♿
- WCAG 2.1 AA compliant
- Screen reader optimized
- High contrast mode support
- Keyboard navigation throughout
- Focus visible indicators
- Reduced motion support

#### 8. **Modern Animations** ✨
- Smooth scroll animations with Framer Motion
- Interactive hover states
- Performance-optimized transitions
- Respects prefers-reduced-motion

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Maps**: Leaflet / React Leaflet (ready to integrate)
- **PWA**: Next.js PWA configuration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
/app                    # Next.js app directory
  /about               # About pages
  /grow                # Spiritual growth resources
  /connect             # Community connection pages
  /give                # Giving and volunteer pages
  layout.tsx           # Root layout with header, footer
  page.tsx             # Home page

/components            # Reusable components
  /home               # Home page sections
  /layout             # Header, Footer, Navigation
  ChatBot.tsx         # AI assistant
  InteractiveMap.tsx  # Map component

/public               # Static assets
  manifest.json       # PWA manifest

/styles               # Global styles
```

## 🎨 Color Palette

The site uses a blue and white color scheme matching Community of Christ branding:

- **Primary Blue**: `#3b82f6` (Tailwind blue-600)
- **Primary Dark**: `#1e40af` (Tailwind blue-800)
- **Secondary**: Shades of gray for text and backgrounds
- **Accent Colors**: Category-specific colors for events

## ✅ Accessibility Features

- Semantic HTML throughout
- ARIA labels on interactive elements
- Alt text on all images
- Keyboard navigation support
- Focus visible indicators
- High contrast mode
- Reduced motion support
- Screen reader tested

## 🔮 Future Enhancements

- **Member Portal** - Secure login for members
  - Giving history
  - Volunteer signup
  - Small group registration

- **Headless CMS Integration** - Easy content management
  - Sanity.io or Contentful
  - Non-technical staff can update content

- **Advanced Analytics** - Track engagement and conversions
  - Vercel Analytics
  - Google Analytics 4

- **Email Integration** - Automated communications
  - Newsletter system
  - Event reminders
  - Welcome emails

- **Payment Integration** - Secure online giving
  - Stripe or Pushpay
  - Recurring donations
  - Impact tracking

## 📚 Documentation

- **[Development Guide](DEVELOPMENT.md)** - Setup, workflow, and best practices
- **[Chatbot Training Guide](docs/CHATBOT_TRAINING.md)** - Comprehensive guide to training and expanding the AI chatbot
- **[Quick Chatbot Add](docs/QUICK_CHATBOT_ADD.md)** - Fast reference for adding new chatbot knowledge
- **[Assets Guide](public/README_ASSETS.md)** - How to add images and icons

## 📄 License

This project is built for Minneapolis Community of Christ congregation.

## 🤝 Contributing

This is a congregation-specific website. For improvements or bug fixes, please contact the web ministry team.

## 📞 Support

For technical support or questions:
- Email: info@minneapoliscofchrist.org
- Phone: (612) 555-1234

---

**Built with ❤️ for Minneapolis Community of Christ**

*Proclaiming Jesus Christ and promoting communities of joy, hope, love, and peace.*
