"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  DollarSign,
  FileText,
  Heart,
  Video,
  Mail,
  Settings,
  TrendingUp,
  Clock,
  Bell,
  BarChart3,
  Database,
  Shield,
  Activity,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface DashboardStats {
  members: {
    total: number;
    newThisMonth: number;
    active: number;
  };
  events: {
    upcoming: number;
    totalRsvps: number;
    thisWeek: number;
  };
  donations: {
    monthTotal: number;
    yearTotal: number;
    averageDonation: number;
  };
  content: {
    sermons: number;
    articles: number;
    testimonies: number;
  };
  engagement: {
    prayerRequests: number;
    volunteers: number;
    smallGroups: number;
  };
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Load stats
      const statsResponse = await fetch('/api/admin/stats');
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      // Load recent activity
      const activityResponse = await fetch('/api/admin/activity');
      if (activityResponse.ok) {
        const activityData = await activityResponse.json();
        setRecentActivity(activityData);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Members",
      value: stats?.members.total || 0,
      change: `+${stats?.members.newThisMonth || 0} this month`,
      icon: Users,
      color: "bg-blue-500",
      href: "/admin/members",
    },
    {
      title: "Upcoming Events",
      value: stats?.events.upcoming || 0,
      change: `${stats?.events.totalRsvps || 0} RSVPs`,
      icon: Calendar,
      color: "bg-green-500",
      href: "/admin/events",
    },
    {
      title: "Monthly Donations",
      value: `$${(stats?.donations.monthTotal || 0).toLocaleString()}`,
      change: `Avg: $${stats?.donations.averageDonation || 0}`,
      icon: DollarSign,
      color: "bg-purple-500",
      href: "/admin/donations",
    },
    {
      title: "Prayer Requests",
      value: stats?.engagement.prayerRequests || 0,
      change: "Active requests",
      icon: Heart,
      color: "bg-pink-500",
      href: "/admin/prayer-wall",
    },
  ];

  const quickActions = [
    { label: "Add Event", icon: Calendar, href: "/admin/events/new", color: "text-green-600" },
    { label: "New Article", icon: FileText, href: "/admin/content/new", color: "text-blue-600" },
    { label: "Send Email", icon: Mail, href: "/admin/communications/email", color: "text-purple-600" },
    { label: "Upload Sermon", icon: Video, href: "/admin/sermons/new", color: "text-red-600" },
  ];

  const managementSections = [
    {
      title: "Content Management",
      icon: FileText,
      items: [
        { label: "Sermons", href: "/admin/sermons", count: stats?.content.sermons },
        { label: "News Articles", href: "/admin/news", count: stats?.content.articles },
        { label: "Testimonies", href: "/admin/testimonies", count: stats?.content.testimonies },
        { label: "Media Library", href: "/admin/media", count: null },
      ],
    },
    {
      title: "People & Groups",
      icon: Users,
      items: [
        { label: "Members", href: "/admin/members", count: stats?.members.total },
        { label: "Visitors", href: "/admin/visitors", count: null },
        { label: "Small Groups", href: "/admin/small-groups", count: stats?.engagement.smallGroups },
        { label: "Volunteers", href: "/admin/volunteers", count: stats?.engagement.volunteers },
      ],
    },
    {
      title: "Ministry Tools",
      icon: Heart,
      items: [
        { label: "Events", href: "/admin/events", count: stats?.events.upcoming },
        { label: "Prayer Wall", href: "/admin/prayer-wall", count: stats?.engagement.prayerRequests },
        { label: "Ministries", href: "/admin/ministries", count: null },
        { label: "Volunteer Schedule", href: "/admin/volunteer-schedule", count: null },
      ],
    },
    {
      title: "Communications",
      icon: Mail,
      items: [
        { label: "Email Campaigns", href: "/admin/communications/email", count: null },
        { label: "SMS Messages", href: "/admin/communications/sms", count: null },
        { label: "Push Notifications", href: "/admin/communications/push", count: null },
        { label: "Newsletter", href: "/admin/communications/newsletter", count: null },
      ],
    },
    {
      title: "Analytics & Reports",
      icon: BarChart3,
      items: [
        { label: "Attendance", href: "/admin/reports/attendance", count: null },
        { label: "Giving Reports", href: "/admin/reports/giving", count: null },
        { label: "Member Growth", href: "/admin/reports/growth", count: null },
        { label: "Export Data", href: "/admin/reports/export", count: null },
      ],
    },
    {
      title: "Settings",
      icon: Settings,
      items: [
        { label: "Church Info", href: "/admin/settings/church", count: null },
        { label: "Staff & Roles", href: "/admin/settings/staff", count: null },
        { label: "Integrations", href: "/admin/settings/integrations", count: null },
        { label: "Security", href: "/admin/settings/security", count: null },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome back, {session?.user?.name || 'Admin'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <Link
                href="/admin/settings"
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <Settings size={20} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={stat.href}>
                <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="text-white" size={24} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <action.icon className={`${action.color} mr-3`} size={20} />
                <span className="text-sm font-medium text-gray-700">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Management Sections */}
          <div className="lg:col-span-2 space-y-6">
            {managementSections.map((section) => (
              <div key={section.title} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <section.icon className="text-gray-600 mr-2" size={20} />
                  <h2 className="text-lg font-semibold text-gray-900">
                    {section.title}
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {section.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {item.label}
                      </span>
                      <div className="flex items-center">
                        {item.count !== null && item.count !== undefined && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full mr-2">
                            {item.count}
                          </span>
                        )}
                        <ChevronRight
                          className="text-gray-400 group-hover:text-gray-600"
                          size={16}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Activity
                </h2>
                <Activity className="text-gray-400" size={20} />
              </div>
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.slice(0, 8).map((activity, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-gray-200 pl-3 py-1"
                    >
                      <p className="text-sm text-gray-700">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No recent activity</p>
              )}
              <Link
                href="/admin/activity"
                className="block text-center text-sm text-primary-600 hover:text-primary-700 mt-4"
              >
                View All Activity
              </Link>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  System Status
                </h2>
                <Shield className="text-green-500" size={20} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    Healthy
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email Service</span>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Storage</span>
                  <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                    78% Used
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Backup</span>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
              </div>
              <Link
                href="/admin/settings/system"
                className="block text-center text-sm text-primary-600 hover:text-primary-700 mt-4"
              >
                System Settings
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-4">Year Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm opacity-90">Total Donations</span>
                  <span className="font-semibold">
                    ${(stats?.donations.yearTotal || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm opacity-90">New Members</span>
                  <span className="font-semibold">
                    {stats?.members.newThisMonth || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm opacity-90">Events Held</span>
                  <span className="font-semibold">
                    {stats?.events.upcoming || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}