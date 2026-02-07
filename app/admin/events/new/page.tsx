/**
 * Create New Event Page
 *
 * Form for creating a new church event with validation
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Validation schema matching the API
const createEventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.string().min(1, 'Date is required'),
  endDate: z.string().optional(),
  location: z.string().min(3, 'Location is required'),
  category: z.enum(['worship', 'youth', 'community', 'education', 'mission', 'social', 'special']),
  image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  maxCapacity: z.number().int().positive().optional().or(z.nan()),
  requiresRsvp: z.boolean(),
  rsvpDeadline: z.string().optional(),
  featured: z.boolean(),
  status: z.enum(['upcoming', 'ongoing', 'completed', 'cancelled']),

  // Recurring
  isRecurring: z.boolean(),
  recurringFrequency: z.enum(['daily', 'weekly', 'biweekly', 'monthly']).optional(),
  recurringEndDate: z.string().optional(),

  // Organizer
  organizerName: z.string().min(2, 'Organizer name is required'),
  organizerEmail: z.string().email('Valid email required'),
  organizerPhone: z.string().optional(),

  tags: z.string().optional(),
});

type CreateEventInput = z.infer<typeof createEventSchema>;

export default function NewEventPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateEventInput>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      requiresRsvp: false,
      featured: false,
      status: 'upcoming',
      isRecurring: false,
      tags: '',
    },
  });

  // Watch title to auto-generate slug
  const title = watch('title');
  React.useEffect(() => {
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setValue('slug', slug);
    }
  }, [title, setValue]);

  const onSubmit = async (data: CreateEventInput) => {
    setSubmitting(true);
    setError(null);

    try {
      // Transform data for API
      const payload = {
        ...data,
        image: data.image || undefined,
        maxCapacity: data.maxCapacity || undefined,
        rsvpDeadline: data.rsvpDeadline || undefined,
        endDate: data.endDate || undefined,
        recurringEndDate: data.recurringEndDate || undefined,
        recurringFrequency: data.isRecurring ? data.recurringFrequency : undefined,
        tags: data.tags ? data.tags.split(',').map(t => t.trim()) : [],
      };

      const response = await fetch('/api/v2/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create event');
      }

      // Redirect to events list on success
      router.push('/admin/events');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const isRecurring = watch('isRecurring');
  const requiresRsvp = watch('requiresRsvp');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
          >
            ← Back to Events
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
          <p className="mt-2 text-sm text-gray-600">
            Fill out the form below to create a new church event
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  {...register('title')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Sunday Morning Worship"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Slug *
                </label>
                <input
                  type="text"
                  {...register('slug')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="sunday-morning-worship"
                />
                {errors.slug && (
                  <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  {...register('description')}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the event..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  {...register('category')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  <option value="worship">Worship</option>
                  <option value="youth">Youth</option>
                  <option value="community">Community</option>
                  <option value="education">Education</option>
                  <option value="mission">Mission</option>
                  <option value="social">Social</option>
                  <option value="special">Special</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL (optional)
                </label>
                <input
                  type="url"
                  {...register('image')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Date & Time
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date & Time *
                </label>
                <input
                  type="datetime-local"
                  {...register('date')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                )}
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date & Time (optional)
                </label>
                <input
                  type="datetime-local"
                  {...register('endDate')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                {...register('location')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Main Sanctuary, 123 Church St"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
              )}
            </div>
          </div>

          {/* Capacity & RSVP */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Capacity & RSVP
            </h2>

            <div className="space-y-4">
              {/* Max Capacity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Capacity (optional)
                </label>
                <input
                  type="number"
                  {...register('maxCapacity', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 100"
                  min="1"
                />
                {errors.maxCapacity && (
                  <p className="mt-1 text-sm text-red-600">{errors.maxCapacity.message}</p>
                )}
              </div>

              {/* Requires RSVP */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('requiresRsvp')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Require RSVP
                </label>
              </div>

              {/* RSVP Deadline */}
              {requiresRsvp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    RSVP Deadline (optional)
                  </label>
                  <input
                    type="datetime-local"
                    {...register('rsvpDeadline')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Recurring Event */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recurring Event
            </h2>

            <div className="space-y-4">
              {/* Is Recurring */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('isRecurring')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  This is a recurring event
                </label>
              </div>

              {/* Recurring Options */}
              {isRecurring && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frequency
                    </label>
                    <select
                      {...register('recurringFrequency')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select frequency</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recurring End Date (optional)
                    </label>
                    <input
                      type="datetime-local"
                      {...register('recurringEndDate')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Organizer Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Organizer Information
            </h2>

            <div className="space-y-4">
              {/* Organizer Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organizer Name *
                </label>
                <input
                  type="text"
                  {...register('organizerName')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Pastor John Smith"
                />
                {errors.organizerName && (
                  <p className="mt-1 text-sm text-red-600">{errors.organizerName.message}</p>
                )}
              </div>

              {/* Organizer Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organizer Email *
                </label>
                <input
                  type="email"
                  {...register('organizerEmail')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="organizer@church.org"
                />
                {errors.organizerEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.organizerEmail.message}</p>
                )}
              </div>

              {/* Organizer Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organizer Phone (optional)
                </label>
                <input
                  type="tel"
                  {...register('organizerPhone')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Additional Settings
            </h2>

            <div className="space-y-4">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  {...register('status')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Featured */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('featured')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Feature this event on homepage
                </label>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (optional, comma-separated)
                </label>
                <input
                  type="text"
                  {...register('tags')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., family-friendly, outdoor, free"
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {submitting ? 'Creating Event...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
