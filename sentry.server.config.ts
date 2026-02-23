import * as Sentry from '@sentry/nextjs';

/**
 * Sentry Server-Side Configuration
 *
 * Monitors server-side errors, API routes, and server components.
 */

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Environment (development, staging, production)
  environment: process.env.NODE_ENV,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Add release information
  release: process.env.npm_package_version || '1.0.0',

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === 'development',

  // Ignore certain errors
  ignoreErrors: [
    // Prisma connection errors during development
    /ECONNREFUSED/,
    /ETIMEDOUT/,
    // Common but harmless errors
    'NEXT_NOT_FOUND',
    'NEXT_REDIRECT',
  ],

  // Before send hook to filter/modify events
  beforeSend(event, hint) {
    // Filter out sensitive data from request
    if (event.request) {
      delete event.request.cookies;

      // Remove sensitive headers
      if (event.request.headers) {
        delete event.request.headers.cookie;
        delete event.request.headers.authorization;
      }

      // Sanitize query params (remove tokens, passwords, etc.)
      if (event.request.query_string && typeof event.request.query_string === 'string') {
        event.request.query_string = event.request.query_string
          .replace(/token=[^&]*/gi, 'token=[REDACTED]')
          .replace(/password=[^&]*/gi, 'password=[REDACTED]')
          .replace(/key=[^&]*/gi, 'key=[REDACTED]');
      }
    }

    // Add custom context
    event.tags = {
      ...event.tags,
      node_version: process.version,
    };

    return event;
  },

  // Performance monitoring is handled automatically by Sentry SDK
});
