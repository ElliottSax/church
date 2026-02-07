/**
 * Centralized Site Configuration
 *
 * This file contains all configurable settings for the church website.
 * Modify values here instead of changing code throughout the application.
 */

export const siteConfig = {
  // ===========================
  // BASIC SITE INFORMATION
  // ===========================
  site: {
    name: process.env.NEXT_PUBLIC_SITE_NAME || "Minneapolis Community of Christ",
    shortName: "MCOC",
    tagline: "Growing in Faith, Serving in Love",
    description: "Welcome to Minneapolis Community of Christ - A vibrant community of faith.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    logo: "/images/logo.png",
    favicon: "/favicon.ico",
  },

  // ===========================
  // CONTACT INFORMATION
  // ===========================
  contact: {
    email: process.env.NEXT_PUBLIC_CHURCH_EMAIL || "info@minneapoliscofchrist.org",
    phone: process.env.NEXT_PUBLIC_CHURCH_PHONE || "(612) 555-1234",
    address: {
      street: "123 Main Street",
      city: "Minneapolis",
      state: "MN",
      zip: "55401",
      country: "USA",
      full: process.env.NEXT_PUBLIC_CHURCH_ADDRESS || "123 Main Street, Minneapolis, MN 55401"
    },
    socialMedia: {
      facebook: "https://facebook.com/your-church",
      instagram: "https://instagram.com/your-church",
      twitter: "https://twitter.com/your-church",
      youtube: "https://youtube.com/@your-church",
    },
  },

  // ===========================
  // SERVICE TIMES
  // ===========================
  serviceTimes: {
    sunday: {
      worship: {
        time: "10:00 AM",
        description: "Sunday Worship Service",
        duration: "90 minutes",
      },
      sundaySchool: {
        time: "9:00 AM",
        description: "Sunday School for all ages",
        duration: "45 minutes",
      },
    },
    wednesday: {
      bibleStudy: {
        time: "7:00 PM",
        description: "Midweek Bible Study",
        duration: "60 minutes",
      },
    },
    // Add more as needed
  },

  // ===========================
  // MAP CONFIGURATION
  // ===========================
  map: {
    latitude: parseFloat(process.env.NEXT_PUBLIC_MAP_LAT || "44.9778"),
    longitude: parseFloat(process.env.NEXT_PUBLIC_MAP_LNG || "-93.2650"),
    zoom: 15,
    mapProvider: "openstreetmap", // or "google" if using Google Maps API
  },

  // ===========================
  // FEATURES CONFIGURATION
  // ===========================
  features: {
    enableOnlineGiving: true,
    enableEventRSVP: true,
    enablePrayerWall: true,
    enableLiveStreaming: true,
    enableMemberPortal: true,
    enableVolunteerSignup: true,
    enableChatbot: false,
    enableNewsletter: true,
    enableBlogComments: false,
  },

  // ===========================
  // EVENT SETTINGS
  // ===========================
  events: {
    defaultMaxCapacity: 100,
    allowWaitlist: true,
    waitlistLimit: 10,
    rsvpReminderDays: 3, // Send reminder 3 days before event
    categories: [
      { value: 'worship', label: 'Worship', icon: '⛪', color: 'purple' },
      { value: 'youth', label: 'Youth', icon: '👥', color: 'blue' },
      { value: 'community', label: 'Community', icon: '🤝', color: 'green' },
      { value: 'education', label: 'Education', icon: '📚', color: 'yellow' },
      { value: 'mission', label: 'Mission', icon: '🌍', color: 'red' },
      { value: 'social', label: 'Social', icon: '🎉', color: 'pink' },
      { value: 'special', label: 'Special', icon: '⭐', color: 'indigo' },
    ],
  },

  // ===========================
  // PRAYER WALL SETTINGS
  // ===========================
  prayerWall: {
    requireApproval: true, // Admin must approve requests before public display
    allowAnonymous: true,
    maxRequestLength: 500,
    categories: [
      { value: 'healing', label: 'Healing', icon: '🏥', color: 'green' },
      { value: 'guidance', label: 'Guidance', icon: '🧭', color: 'blue' },
      { value: 'thanksgiving', label: 'Thanksgiving', icon: '🙏', color: 'yellow' },
      { value: 'salvation', label: 'Salvation', icon: '✝️', color: 'purple' },
      { value: 'provision', label: 'Provision', icon: '🍞', color: 'orange' },
      { value: 'other', label: 'Other', icon: '📿', color: 'gray' },
    ],
  },

  // ===========================
  // GIVING/DONATION SETTINGS
  // ===========================
  giving: {
    defaultAmounts: [25, 50, 100, 250, 500],
    recurringOptions: ['one-time', 'weekly', 'monthly', 'yearly'],
    funds: [
      { value: 'general', label: 'General Fund', description: 'Support church operations' },
      { value: 'missions', label: 'Missions', description: 'Support missionary work' },
      { value: 'building', label: 'Building Fund', description: 'Church building projects' },
      { value: 'youth', label: 'Youth Ministry', description: 'Support youth programs' },
      { value: 'benevolence', label: 'Benevolence', description: 'Help those in need' },
    ],
  },

  // ===========================
  // MEMBER SETTINGS
  // ===========================
  members: {
    requireEmailVerification: true,
    allowSelfRegistration: true,
    defaultRole: 'member',
    roles: [
      { value: 'member', label: 'Member', permissions: ['view'] },
      { value: 'volunteer', label: 'Volunteer', permissions: ['view', 'volunteer'] },
      { value: 'leader', label: 'Ministry Leader', permissions: ['view', 'volunteer', 'manage_ministry'] },
      { value: 'staff', label: 'Staff', permissions: ['view', 'volunteer', 'manage_ministry', 'manage_content'] },
      { value: 'admin', label: 'Admin', permissions: ['all'] },
    ],
  },

  // ===========================
  // EMAIL NOTIFICATION SETTINGS
  // ===========================
  notifications: {
    welcomeEmail: true,
    eventReminders: true,
    prayerRequestUpdates: true,
    newsletterSignup: true,
    donationReceipts: true,
    fromName: "Minneapolis Community of Christ",
    fromEmail: process.env.SENDGRID_FROM_EMAIL || "noreply@minneapoliscofchrist.org",
  },

  // ===========================
  // ADMIN SETTINGS
  // ===========================
  admin: {
    itemsPerPage: 25,
    allowedAdminEmails: [
      // Add admin emails here
      "admin@minneapoliscofchrist.org",
    ],
  },

  // ===========================
  // API SETTINGS
  // ===========================
  api: {
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 100, // limit each IP to 100 requests per windowMs
    },
    pagination: {
      defaultLimit: 20,
      maxLimit: 100,
    },
  },

  // ===========================
  // CACHE SETTINGS
  // ===========================
  cache: {
    events: 60, // Cache events for 60 seconds
    sermons: 300, // Cache sermons for 5 minutes
    prayerRequests: 30, // Cache prayer requests for 30 seconds
  },
} as const;

// Type helper for autocomplete
export type SiteConfig = typeof siteConfig;

// Helper function to get a config value
export function getConfig<T extends keyof SiteConfig>(key: T): SiteConfig[T] {
  return siteConfig[key];
}

// Helper to check if a feature is enabled
export function isFeatureEnabled(feature: keyof typeof siteConfig.features): boolean {
  return siteConfig.features[feature];
}

export default siteConfig;
