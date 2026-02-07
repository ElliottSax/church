/**
 * Event Validation Schemas
 *
 * Zod schemas for validating event-related data
 */

import { z } from 'zod';

export const createEventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.string().datetime().or(z.date()),
  endDate: z.string().datetime().or(z.date()).optional(),
  location: z.string().min(3, 'Location is required'),
  category: z.enum(['worship', 'youth', 'community', 'education', 'mission', 'social', 'special']),
  image: z.string().url().optional(),
  maxCapacity: z.number().int().positive().optional(),
  requiresRsvp: z.boolean().default(false),
  rsvpDeadline: z.string().datetime().or(z.date()).optional(),
  featured: z.boolean().default(false),
  status: z.enum(['upcoming', 'ongoing', 'completed', 'cancelled']).default('upcoming'),

  // Recurring
  isRecurring: z.boolean().default(false),
  recurringFrequency: z.enum(['daily', 'weekly', 'biweekly', 'monthly']).optional(),
  recurringEndDate: z.string().datetime().or(z.date()).optional(),

  // Organizer
  organizerName: z.string().min(2),
  organizerEmail: z.string().email(),
  organizerPhone: z.string().optional(),

  tags: z.array(z.string()).default([]),
});

export const updateEventSchema = createEventSchema.partial();

export const createRSVPSchema = z.object({
  eventId: z.string().cuid(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  numberOfGuests: z.number().int().min(0).max(10).default(0),
  dietaryRestrictions: z.string().max(500).optional(),
  specialNeeds: z.string().max(500).optional(),
  notes: z.string().max(1000).optional(),
});

export const cancelRSVPSchema = z.object({
  confirmationCode: z.string().min(6),
});

export const eventQuerySchema = z.object({
  status: z.enum(['upcoming', 'ongoing', 'completed', 'cancelled']).optional(),
  category: z.enum(['worship', 'youth', 'community', 'education', 'mission', 'social', 'special']).optional(),
  featured: z.boolean().optional(),
  startDate: z.string().datetime().or(z.date()).optional(),
  endDate: z.string().datetime().or(z.date()).optional(),
  limit: z.number().int().positive().max(100).default(20),
  offset: z.number().int().min(0).default(0),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type CreateRSVPInput = z.infer<typeof createRSVPSchema>;
export type CancelRSVPInput = z.infer<typeof cancelRSVPSchema>;
export type EventQueryInput = z.infer<typeof eventQuerySchema>;
