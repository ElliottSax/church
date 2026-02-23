/**
 * View Event Details Page
 *
 * Display detailed information about a specific event
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';

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
  currentAttendees: number;
  isRecurring: boolean;
  recurringFrequency?: string;
  recurringEndDate?: string;
  organizerName: string;
  organizerEmail: string;
  organizerPhone?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ViewEventPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/v2/events/${params.id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }

        const data = await response.json();
        setEvent(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      const response = await fetch(`/api/v2/events/${params.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      router.push('/admin/events');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete event');
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      upcoming: 'bg-blue-100 text-blue-800',
      ongoing: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    return (
      <span
        className={`px-3 py-1 text-sm font-medium rounded-full ${
          colors[status as keyof typeof colors] || colors.upcoming
        }`}
      >
        {status}
      </span>
    );
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      worship: 'bg-purple-100 text-purple-800',
      youth: 'bg-blue-100 text-blue-800',
      community: 'bg-green-100 text-green-800',
      education: 'bg-yellow-100 text-yellow-800',
      mission: 'bg-red-100 text-red-800',
      social: 'bg-pink-100 text-pink-800',
      special: 'bg-indigo-100 text-indigo-800',
    };

    return (
      <span
        className={`px-3 py-1 text-sm font-medium rounded ${
          colors[category as keyof typeof colors] || colors.worship
        }`}
      >
        {category}
      </span>
    );
  };

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

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Event not found'}</p>
          <button
            onClick={() => router.push('/admin/events')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/admin/events')}
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
          >
            ← Back to Events
          </button>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
                {event.featured && <span className="text-2xl">⭐</span>}
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(event.status)}
                {getCategoryBadge(event.category)}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push(`/admin/events/${event.id}/edit`)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Image */}
        {event.image && (
          <div className="mb-8 bg-white rounded-lg shadow overflow-hidden relative h-64">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Main Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-700 whitespace-pre-wrap">{event.description}</p>
            </div>

            {/* Date & Time */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Date & Time
              </h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-600 w-32">
                    Start:
                  </span>
                  <span className="text-gray-900">
                    {format(new Date(event.date), 'EEEE, MMMM d, yyyy')} at{' '}
                    {format(new Date(event.date), 'h:mm a')}
                  </span>
                </div>
                {event.endDate && (
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-600 w-32">
                      End:
                    </span>
                    <span className="text-gray-900">
                      {format(new Date(event.endDate), 'EEEE, MMMM d, yyyy')} at{' '}
                      {format(new Date(event.endDate), 'h:mm a')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Location
              </h2>
              <p className="text-gray-900">{event.location}</p>
            </div>

            {/* Recurring Information */}
            {event.isRecurring && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Recurring Event
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-600 w-32">
                      Frequency:
                    </span>
                    <span className="text-gray-900 capitalize">
                      {event.recurringFrequency}
                    </span>
                  </div>
                  {event.recurringEndDate && (
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-600 w-32">
                        Ends:
                      </span>
                      <span className="text-gray-900">
                        {format(new Date(event.recurringEndDate), 'MMMM d, yyyy')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* RSVP & Capacity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Attendance
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Current Attendees</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {event.currentAttendees}
                  </p>
                </div>
                {event.maxCapacity && (
                  <div>
                    <p className="text-sm text-gray-600">Maximum Capacity</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {event.maxCapacity}
                    </p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min(
                            (event.currentAttendees / event.maxCapacity) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
                {event.requiresRsvp && (
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600">RSVP Required</p>
                    {event.rsvpDeadline && (
                      <p className="text-sm text-gray-900 mt-1">
                        Deadline:{' '}
                        {format(new Date(event.rsvpDeadline), 'MMM d, yyyy')}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Organizer Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Organizer
              </h2>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="text-gray-900">{event.organizerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <a
                    href={`mailto:${event.organizerEmail}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {event.organizerEmail}
                  </a>
                </div>
                {event.organizerPhone && (
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <a
                      href={`tel:${event.organizerPhone}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {event.organizerPhone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Event Metadata */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Event Details
              </h2>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-600">Event ID</p>
                  <p className="text-gray-900 font-mono">{event.id}</p>
                </div>
                <div>
                  <p className="text-gray-600">URL Slug</p>
                  <p className="text-gray-900">{event.slug}</p>
                </div>
                <div>
                  <p className="text-gray-600">Created</p>
                  <p className="text-gray-900">
                    {format(new Date(event.createdAt), 'MMM d, yyyy')}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Last Updated</p>
                  <p className="text-gray-900">
                    {format(new Date(event.updatedAt), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
