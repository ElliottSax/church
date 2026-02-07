import * as Sentry from '@sentry/nextjs';

/**
 * Sentry Edge Runtime Configuration
 *
 * Monitors errors in Edge Runtime functions (middleware, edge API routes).
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
});
