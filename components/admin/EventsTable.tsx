/**
 * Events Table Component
 *
 * Display and manage events in admin panel
 */

'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  date: Date;
  location: string;
  category: string;
  currentAttendees: number;
  maxCapacity?: number;
  status: string;
  featured: boolean;
}

interface EventsTableProps {
  events: Event[];
  onEdit?: (event: Event) => void;
  onDelete?: (eventId: string) => void;
  onToggleFeatured?: (eventId: string) => void;
}

export function EventsTable({
  events,
  onEdit,
  onDelete,
  onToggleFeatured
}: EventsTableProps) {
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());

  const toggleSelect = (eventId: string) => {
    const newSelected = new Set(selectedEvents);
    if (newSelected.has(eventId)) {
      newSelected.delete(eventId);
    } else {
      newSelected.add(eventId);
    }
    setSelectedEvents(newSelected);
  };

  const selectAll = () => {
    if (selectedEvents.size === events.length) {
      setSelectedEvents(new Set());
    } else {
      setSelectedEvents(new Set(events.map(e => e.id)));
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
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status as keyof typeof colors] || colors.upcoming}`}>
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
      <span className={`px-2 py-1 text-xs font-medium rounded ${colors[category as keyof typeof colors] || colors.worship}`}>
        {category}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Events</h3>
        <div className="flex items-center gap-2">
          {selectedEvents.size > 0 && (
            <span className="text-sm text-gray-600">
              {selectedEvents.size} selected
            </span>
          )}
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            + New Event
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedEvents.size === events.length && events.length > 0}
                  onChange={selectAll}
                  className="rounded"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attendees
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedEvents.has(event.id)}
                    onChange={() => toggleSelect(event.id)}
                    className="rounded"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {event.title}
                        {event.featured && (
                          <span className="ml-2 text-yellow-500">⭐</span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {format(new Date(event.date), 'MMM d, yyyy')}
                  </div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(event.date), 'h:mm a')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {event.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getCategoryBadge(event.category)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {event.currentAttendees}
                  {event.maxCapacity && ` / ${event.maxCapacity}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(event.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(event)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                    )}
                    {onToggleFeatured && (
                      <button
                        onClick={() => onToggleFeatured(event.id)}
                        className="text-yellow-600 hover:text-yellow-900"
                      >
                        {event.featured ? 'Unfeature' : 'Feature'}
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this event?')) {
                            onDelete(event.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No events found</p>
        </div>
      )}
    </div>
  );
}
