/**
 * Next.js Instrumentation File
 *
 * This file is used to initialize Sentry on both the server and edge runtime.
 * It runs before any request handlers, allowing Sentry to capture all errors.
 *
 * Learn more: https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}
