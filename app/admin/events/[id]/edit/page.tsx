/**
 * Edit Event Page
 *
 * Form for editing an existing church event with validation
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Validation schema matching the API
const updateEventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200).optional(),
  slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens').optional(),
  description: z.string().min(10, 'Description must be at least 10 characters').optional(),
  date: z.string().optional(),
  endDate: z.string().optional(),
  location: z.string().min(3, 'Location is required').optional(),
  category: z.enum(['worship', 'youth', 'community', 'education', 'mission', 'social', 'special']).optional(),
  image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  maxCapacity: z.number().int().positive().optional().or(z.nan()),
  requiresRsvp: z.boolean().optional(),
  rsvpDeadline: z.string().optional(),
  featured: z.boolean().optional(),
  status: z.enum(['upcoming', 'ongoing', 'completed', 'cancelled']).optional(),

  // Recurring
  isRecurring: z.boolean().optional(),
  recurringFrequency: z.enum(['daily', 'weekly', 'biweekly', 'monthly']).optional(),
  recurringEndDate: z.string().optional(),

  // Organizer
  organizerName: z.string().min(2, 'Organizer name is required').optional(),
  organizerEmail: z.string().email('Valid email required').optional(),
  organizerPhone: z.string().optional(),

  tags: z.string().optional(),
});

type UpdateEventInput = z.infer<typeof updateEventSchema>;

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  category: string;
  image?: string;
  maxCapacity?: number;
  requiresRsvp: boolean;
  rsvpDeadline?: string;
  featured: boolean;
  status: string;
  isRecurring: boolean;
  recurringFrequency?: string;
  recurringEndDate?: string;
  organizerName: string;
  organizerEmail: string;
  organizerPhone?: string;
  tags: string[];
}

export default function EditEventPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [event, setEvent] = useState<Event | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateEventInput>({
    resolver: zodResolver(updateEventSchema),
  });

  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/v2/events/${params.id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }

        const data = await response.json();
        const eventData = data.data;
        setEvent(eventData);

        // Format dates for datetime-local inputs
        const formatDateForInput = (dateString: string) => {
          if (!dateString) return '';
          const date = new Date(dateString);
          return date.toISOString().slice(0, 16);
        };

        // Set form values
        reset({
          title: eventData.title,
          slug: eventData.slug,
          description: eventData.description,
          date: formatDateForInput(eventData.date),
          endDate: eventData.endDate ? formatDateForInput(eventData.endDate) : '',
          location: eventData.location,
          category: eventData.category,
          image: eventData.image || '',
          maxCapacity: eventData.maxCapacity,
          requiresRsvp: eventData.requiresRsvp,
          rsvpDeadline: eventData.rsvpDeadline ? formatDateForInput(eventData.rsvpDeadline) : '',
          featured: eventData.featured,
          status: eventData.status,
          isRecurring: eventData.isRecurring,
          recurringFrequency: eventData.recurringFrequency,
          recurringEndDate: eventData.recurringEndDate ? formatDateForInput(eventData.recurringEndDate) : '',
          organizerName: eventData.organizerName,
          organizerEmail: eventData.organizerEmail,
          organizerPhone: eventData.organizerPhone || '',
          tags: eventData.tags?.join(', ') || '',
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id, reset]);

  // Watch title to auto-update slug
  const title = watch('title');
  React.useEffect(() => {
    if (title && event && title !== event.title) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setValue('slug', slug);
    }
  }, [title, setValue, event]);

  const onSubmit = async (data: UpdateEventInput) => {
    setSubmitting(true);
    setError(null);

    try {
      // Transform data for API
      const payload: any = {};

      // Only include changed fields
      Object.keys(data).forEach((key) => {
        const value = data[key as keyof UpdateEventInput];
        if (value !== undefined && value !== '') {
          payload[key] = value;
        }
      });

      // Transform tags
      if (payload.tags) {
        payload.tags = payload.tags.split(',').map((t: string) => t.trim());
      }

      const response = await fetch(`/api/v2/events/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update event');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading event...</p>
        </div>
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-gray-900">Edit Event</h1>
          <p className="mt-2 text-sm text-gray-600">
            Update the event details below
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
                  Event Title
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
                  URL Slug
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
                  Description
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
                  Category
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
                  Start Date & Time
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
                Location
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
                  Organizer Name
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
                  Organizer Email
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
                  Status
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
              {submitting ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
