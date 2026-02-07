import * as Sentry from '@sentry/nextjs';

/**
 * Sentry Client-Side Configuration
 *
 * Monitors client-side errors and performance in the browser.
 */

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Environment (development, staging, production)
  environment: process.env.NODE_ENV,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Add release information
  release: process.env.npm_package_version || '1.0.0',

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    Sentry.replayIntegration({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Ignore certain errors
  ignoreErrors: [
    // Random plugins/extensions
    'top.GLOBALS',
    // Facebook borked
    'fb_xd_fragment',
    // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to reduce this. (thanks @acdha)
    'bmi_SafeAddOnload',
    'EBCallBackMessageReceived',
    // See http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
    'Can\'t find variable: ZiteReader',
    'jigsaw is not defined',
    'ComboSearch is not defined',
    // Facebook blocked
    'http://static.ak.facebook.com',
    'http://connect.facebook.net/en_US/all.js',
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
    // Other plugins
    'conduitPage',
    // Network errors
    'Network request failed',
    'NetworkError',
    'Failed to fetch',
  ],

  // Denyurls for scripts we don't control
  denyUrls: [
    // Facebook flakiness
    /graph\.facebook\.com/i,
    // Facebook blocked
    /connect\.facebook\.net\/en_US\/all\.js/i,
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
    // Other plugins
    /<anonymous>/i,
  ],

  // Before send hook to filter/modify events
  beforeSend(event, hint) {
    // Filter out local development errors
    if (event.request?.url?.includes('localhost')) {
      return null;
    }

    // Remove sensitive data
    if (event.request) {
      delete event.request.cookies;
    }

    return event;
  },
});
