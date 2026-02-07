/**
 * Prayer Request Validation Schemas
 */

import { z } from 'zod';

export const createPrayerRequestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  request: z.string().min(10, 'Prayer request must be at least 10 characters').max(500),
  category: z.enum(['healing', 'guidance', 'thanksgiving', 'salvation', 'provision', 'other']),
  isAnonymous: z.boolean().default(false),
  isPublic: z.boolean().default(true),
  userEmail: z.string().email().optional(),
});

export const updatePrayerRequestSchema = createPrayerRequestSchema.partial();

export const approvePrayerRequestSchema = z.object({
  id: z.string().cuid(),
});

export const prayForRequestSchema = z.object({
  requestId: z.string().cuid(),
});

export const prayerQuerySchema = z.object({
  category: z.enum(['healing', 'guidance', 'thanksgiving', 'salvation', 'provision', 'other']).optional(),
  approved: z.boolean().optional(),
  limit: z.number().int().positive().max(100).default(20),
  offset: z.number().int().min(0).default(0),
});

export const searchPrayerRequestSchema = z.object({
  query: z.string().min(2, 'Search query must be at least 2 characters'),
});

export type CreatePrayerRequestInput = z.infer<typeof createPrayerRequestSchema>;
export type UpdatePrayerRequestInput = z.infer<typeof updatePrayerRequestSchema>;
export type ApprovePrayerRequestInput = z.infer<typeof approvePrayerRequestSchema>;
export type PrayForRequestInput = z.infer<typeof prayForRequestSchema>;
export type PrayerQueryInput = z.infer<typeof prayerQuerySchema>;
export type SearchPrayerRequestInput = z.infer<typeof searchPrayerRequestSchema>;
