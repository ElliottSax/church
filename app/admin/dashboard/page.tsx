/**
 * Admin Dashboard Page
 *
 * Overview of church website statistics and quick actions
 */

import React from 'react';
import { StatsCard } from '@/components/admin/StatsCard';
import { PendingPrayersCard } from '@/components/admin/PendingPrayersCard';
import { getAnalyticsSummary, getPopularContent } from '@/lib/analytics/tracker';
import { eventsRepository } from '@/lib/db/repositories/events.repository';
import { prayerRepository } from '@/lib/db/repositories/prayer.repository';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Fetch analytics data
  const [analytics, popular, upcomingEvents, pendingPrayers] = await Promise.all([
    getAnalyticsSummary(30),
    getPopularContent(30),
    eventsRepository.findUpcoming(5),
    prayerRepository.findAll({ approved: false, limit: 10 }),
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back! Here's what's happening with your church website.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Events"
            value={analytics.events.total}
            change={15}
            icon="📅"
            color="blue"
            footer={`${analytics.events.averagePerWeek.toFixed(1)} per week`}
          />
          <StatsCard
            title="Total RSVPs"
            value={analytics.rsvps.total}
            change={8}
            icon="✓"
            color="green"
            footer={`${analytics.rsvps.averagePerEvent.toFixed(1)} per event`}
          />
          <StatsCard
            title="Prayer Requests"
            value={analytics.prayerRequests.total}
            change={-3}
            icon="🙏"
            color="purple"
            footer={`${pendingPrayers.length} pending approval`}
          />
          <StatsCard
            title="Donations"
            value={`$${analytics.donations.total.toFixed(0)}`}
            change={12}
            icon="💰"
            color="yellow"
            footer={`${analytics.donations.count} donations`}
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Upcoming Events
              </h2>
            </div>
            <div className="p-6">
              {upcomingEvents.length > 0 ? (
                <ul className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <li key={event.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{event.title}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(event.date).toLocaleDateString()} • {event.location}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {event.currentAttendees} attending
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No upcoming events</p>
              )}
            </div>
          </div>

          {/* Pending Prayer Requests */}
          <PendingPrayersCard initialPrayers={pendingPrayers} />

          {/* Popular Content */}
          <div className="bg-white rounded-lg shadow lg:col-span-2">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Popular Content (Last 30 Days)
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Popular Events */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Top Events</h3>
                <ul className="space-y-2">
                  {popular.events.map((event, index) => (
                    <li key={event.id} className="text-sm">
                      <span className="text-gray-500">{index + 1}.</span>{' '}
                      <span className="text-gray-900">{event.title}</span>
                      <span className="text-gray-500 ml-2">
                        ({event.currentAttendees})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Sermons */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Recent Sermons</h3>
                <ul className="space-y-2">
                  {popular.sermons.map((sermon, index) => (
                    <li key={sermon.id} className="text-sm">
                      <span className="text-gray-500">{index + 1}.</span>{' '}
                      <span className="text-gray-900">{sermon.title}</span>
                      <p className="text-gray-500 text-xs">{sermon.speaker}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Top Prayers */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Most Prayed For</h3>
                <ul className="space-y-2">
                  {popular.prayers.map((prayer, index) => (
                    <li key={prayer.id} className="text-sm">
                      <span className="text-gray-500">{index + 1}.</span>{' '}
                      <span className="text-gray-900">{prayer.name}</span>
                      <span className="text-gray-500 ml-2">
                        🙏 {prayer.prayerCount}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="/admin/events/new"
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <span className="text-2xl mb-2">📅</span>
              <span className="text-sm font-medium">New Event</span>
            </a>
            <a
              href="/admin/prayer-requests"
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <span className="text-2xl mb-2">🙏</span>
              <span className="text-sm font-medium">Review Prayers</span>
            </a>
            <a
              href="/admin/settings"
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <span className="text-2xl mb-2">⚙️</span>
              <span className="text-sm font-medium">Settings</span>
            </a>
            <a
              href="/admin/users"
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <span className="text-2xl mb-2">👥</span>
              <span className="text-sm font-medium">Manage Users</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
