import * as Sentry from '@sentry/nextjs';

/**
 * Sentry Helper Utilities
 *
 * Provides convenient functions for error tracking and performance monitoring
 * throughout the Church website application.
 */

/**
 * Capture an exception with additional context
 *
 * @example
 * ```ts
 * try {
 *   await processPayment(donation);
 * } catch (error) {
 *   captureException(error, {
 *     donation: { amount: donation.amount, type: donation.type },
 *     user: { id: user.id }
 *   });
 * }
 * ```
 */
export function captureException(error: Error, context?: Record<string, any>) {
  if (context) {
    Sentry.withScope((scope) => {
      Object.entries(context).forEach(([key, value]) => {
        scope.setContext(key, value);
      });
      Sentry.captureException(error);
    });
  } else {
    Sentry.captureException(error);
  }
}

/**
 * Capture a message (for warnings, info, etc.)
 *
 * @example
 * ```ts
 * captureMessage('Payment webhook received but signature invalid', 'warning');
 * ```
 */
export function captureMessage(
  message: string,
  level: 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug' = 'info'
) {
  Sentry.captureMessage(message, level);
}

/**
 * Set user context for error tracking
 *
 * @example
 * ```ts
 * // In authentication callback
 * setUser({
 *   id: user.id,
 *   email: user.email,
 *   username: user.name
 * });
 * ```
 */
export function setUser(user: {
  id: string;
  email?: string;
  username?: string;
}) {
  Sentry.setUser(user);
}

/**
 * Clear user context (e.g., on logout)
 */
export function clearUser() {
  Sentry.setUser(null);
}

/**
 * Add breadcrumb for debugging context
 *
 * @example
 * ```ts
 * addBreadcrumb({
 *   category: 'donation',
 *   message: 'User initiated donation flow',
 *   level: 'info',
 *   data: { amount: 100, type: 'one-time' }
 * });
 * ```
 */
export function addBreadcrumb(breadcrumb: {
  message: string;
  category?: string;
  level?: 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug';
  data?: Record<string, any>;
}) {
  Sentry.addBreadcrumb(breadcrumb);
}

/**
 * Set custom tag for filtering in Sentry
 *
 * @example
 * ```ts
 * setTag('payment_provider', 'stripe');
 * setTag('feature', 'online-giving');
 * ```
 */
export function setTag(key: string, value: string) {
  Sentry.setTag(key, value);
}

/**
 * Set custom context
 *
 * @example
 * ```ts
 * setContext('donation', {
 *   amount: 100,
 *   currency: 'USD',
 *   recurring: false
 * });
 * ```
 */
export function setContext(name: string, context: Record<string, any>) {
  Sentry.setContext(name, context);
}

/**
 * Start a performance transaction
 *
 * @example
 * ```ts
 * const transaction = startTransaction('process-donation', 'payment');
 * try {
 *   await processDonation();
 *   transaction.setStatus('ok');
 * } catch (error) {
 *   transaction.setStatus('internal_error');
 *   throw error;
 * } finally {
 *   transaction.finish();
 * }
 * ```
 */
export function startTransaction(name: string, op: string) {
  return Sentry.startSpan({ name, op }, () => {});
}

/**
 * Wrap an API route handler with Sentry error tracking
 *
 * @example
 * ```ts
 * export const POST = withSentry(async (req: Request) => {
 *   // Your API route logic
 *   return NextResponse.json({ success: true });
 * });
 * ```
 */
export function withSentry<T extends (...args: any[]) => any>(handler: T): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await handler(...args);
    } catch (error) {
      captureException(error as Error);
      throw error;
    }
  }) as T;
}

/**
 * Wrap a server action with Sentry error tracking
 *
 * @example
 * ```ts
 * 'use server'
 *
 * export const submitPrayerRequest = withServerAction(async (formData: FormData) => {
 *   // Your server action logic
 * });
 * ```
 */
export function withServerAction<T extends (...args: any[]) => any>(
  action: T
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await action(...args);
    } catch (error) {
      captureException(error as Error, {
        action: action.name,
        args: args.map((arg) =>
          arg instanceof FormData ? 'FormData' : typeof arg
        ),
      });
      throw error;
    }
  }) as T;
}
