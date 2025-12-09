// Google Analytics 4 integration
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// GA4 Measurement ID from environment variable
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Check if analytics should be loaded
export const isAnalyticsEnabled = Boolean(GA_MEASUREMENT_ID);

// Initialize GA4
export const initializeAnalytics = () => {
  if (!isAnalyticsEnabled) return;

  // Add gtag script to head
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    send_page_view: true,
  });
};

// Track page views
export const trackPageView = (url: string) => {
  if (!isAnalyticsEnabled || !window.gtag) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (!isAnalyticsEnabled || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Common event tracking functions

// Track prayer requests
export const trackPrayerRequest = (action: 'submit' | 'pray', category?: string) => {
  trackEvent(`prayer_${action}`, 'engagement', category);
};

// Track event RSVPs
export const trackEventRSVP = (eventName: string, status: 'confirmed' | 'waitlisted') => {
  trackEvent('event_rsvp', 'events', eventName, status === 'confirmed' ? 1 : 0);
};

// Track donations
export const trackDonation = (amount: number, type: 'one-time' | 'recurring') => {
  trackEvent('donation', 'giving', type, amount);
};

// Track content engagement
export const trackContentView = (contentType: string, title: string) => {
  trackEvent('content_view', contentType, title);
};

// Track live stream engagement
export const trackLiveStream = (action: 'start' | 'end' | 'join_chat', duration?: number) => {
  trackEvent(`livestream_${action}`, 'media', undefined, duration);
};

// Track sermon engagement
export const trackSermon = (action: 'play' | 'download' | 'share', sermonTitle: string) => {
  trackEvent(`sermon_${action}`, 'media', sermonTitle);
};

// Track member actions
export const trackMemberAction = (action: string, details?: string) => {
  trackEvent(action, 'member_portal', details);
};

// Track search
export const trackSearch = (searchTerm: string, resultCount: number) => {
  trackEvent('search', 'site_search', searchTerm, resultCount);
};

// Track form submissions
export const trackFormSubmission = (formName: string, success: boolean) => {
  trackEvent('form_submit', 'forms', formName, success ? 1 : 0);
};

// Track social shares
export const trackSocialShare = (platform: string, contentType: string) => {
  trackEvent('share', 'social', `${platform}_${contentType}`);
};

// Track navigation clicks
export const trackNavigation = (section: string, item: string) => {
  trackEvent('navigation_click', 'navigation', `${section}_${item}`);
};

// Track errors
export const trackError = (error: string, fatal: boolean = false) => {
  trackEvent('exception', 'errors', error, fatal ? 1 : 0);
};

// User timing (performance tracking)
export const trackTiming = (category: string, variable: string, value: number) => {
  if (!isAnalyticsEnabled || !window.gtag) return;

  window.gtag('event', 'timing_complete', {
    name: variable,
    value: value,
    event_category: category,
  });
};

// E-commerce tracking for donations
export const trackEcommerce = {
  // Track when user views donation options
  viewItem: (amount: number, category: string) => {
    if (!isAnalyticsEnabled || !window.gtag) return;

    window.gtag('event', 'view_item', {
      currency: 'USD',
      value: amount,
      items: [{
        item_id: `donation_${category}`,
        item_name: `${category} Fund Donation`,
        item_category: 'Donations',
        price: amount,
        quantity: 1,
      }],
    });
  },

  // Track when user initiates donation
  beginCheckout: (amount: number, category: string) => {
    if (!isAnalyticsEnabled || !window.gtag) return;

    window.gtag('event', 'begin_checkout', {
      currency: 'USD',
      value: amount,
      items: [{
        item_id: `donation_${category}`,
        item_name: `${category} Fund Donation`,
        item_category: 'Donations',
        price: amount,
        quantity: 1,
      }],
    });
  },

  // Track successful donation
  purchase: (transactionId: string, amount: number, category: string) => {
    if (!isAnalyticsEnabled || !window.gtag) return;

    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: amount,
      currency: 'USD',
      items: [{
        item_id: `donation_${category}`,
        item_name: `${category} Fund Donation`,
        item_category: 'Donations',
        price: amount,
        quantity: 1,
      }],
    });
  },
};

// User properties (for better segmentation)
export const setUserProperties = (properties: Record<string, any>) => {
  if (!isAnalyticsEnabled || !window.gtag) return;

  window.gtag('set', 'user_properties', properties);
};

// Set user ID (for cross-device tracking)
export const setUserId = (userId: string) => {
  if (!isAnalyticsEnabled || !window.gtag) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    user_id: userId,
  });
};

// Custom dimensions (must be configured in GA4)
export const setCustomDimension = (name: string, value: string) => {
  if (!isAnalyticsEnabled || !window.gtag) return;

  window.gtag('set', {
    [name]: value,
  });
};

// Consent management (for GDPR compliance)
export const updateConsent = (granted: boolean) => {
  if (!window.gtag) return;

  window.gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
  });
};

// Debug mode
export const enableDebugMode = () => {
  if (!isAnalyticsEnabled || !window.gtag) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    debug_mode: true,
  });
};