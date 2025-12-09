"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  Filter,
  Search,
  Tag,
  ArrowRight,
  Heart,
  Globe,
  Music,
  Book,
  Coffee,
  Users2,
  Baby,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EventRegistration from "@/components/events/EventRegistration";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  description: string;
  category: string;
  image?: string;
  capacity: number;
  currentAttendees: number;
  price?: number;
  childcareAvailable?: boolean;
  mealProvided?: boolean;
  tags?: string[];
}

// Mock data for upcoming events
const upcomingEvents: Event[] = [
  {
    id: "christmas-eve-2024",
    title: "Christmas Eve Candlelight Service",
    date: "December 24, 2024",
    time: "7:00 PM",
    endTime: "8:30 PM",
    location: "Main Sanctuary",
    description: "Join us for a beautiful candlelight service as we celebrate the birth of our Savior. Features traditional carols, scripture readings, and communion.",
    category: "worship",
    image: "/images/events/christmas-eve.jpg",
    capacity: 400,
    currentAttendees: 125,
    tags: ["Family Friendly", "Special Service", "Holiday"],
  },
  {
    id: "new-year-prayer-2025",
    title: "New Year's Eve Prayer Service",
    date: "December 31, 2024",
    time: "11:00 PM",
    endTime: "12:30 AM",
    location: "Prayer Chapel",
    description: "Welcome the new year with prayer, worship, and reflection. We'll pray for our church, community, and the year ahead.",
    category: "prayer",
    capacity: 100,
    currentAttendees: 45,
    tags: ["Prayer", "New Year"],
  },
  {
    id: "mens-breakfast-2025",
    title: "Men's Breakfast & Fellowship",
    date: "January 4, 2025",
    time: "8:00 AM",
    endTime: "10:00 AM",
    location: "Fellowship Hall",
    description: "Start your Saturday with great food, fellowship, and an inspiring message. Guest speaker: Pastor Mike Thompson.",
    category: "fellowship",
    capacity: 50,
    currentAttendees: 22,
    mealProvided: true,
    price: 10,
    tags: ["Men's Ministry", "Breakfast"],
  },
  {
    id: "youth-winter-retreat-2025",
    title: "Youth Winter Retreat",
    date: "January 17-19, 2025",
    time: "6:00 PM",
    location: "Camp Courage",
    description: "A weekend of fun, fellowship, and spiritual growth for teens. Activities include worship, games, and outdoor adventures.",
    category: "youth",
    capacity: 60,
    currentAttendees: 38,
    price: 125,
    tags: ["Youth", "Retreat", "Weekend"],
  },
  {
    id: "marriage-conference-2025",
    title: "Strong Marriages Conference",
    date: "February 14-15, 2025",
    time: "6:00 PM",
    location: "Main Sanctuary",
    description: "Strengthen your marriage with biblical teaching and practical workshops. Childcare provided.",
    category: "education",
    capacity: 100,
    currentAttendees: 62,
    childcareAvailable: true,
    price: 50,
    tags: ["Marriage", "Conference", "Couples"],
  },
  {
    id: "womens-retreat-2025",
    title: "Women's Spring Retreat",
    date: "March 14-15, 2025",
    time: "6:00 PM",
    location: "Camp Courage",
    description: "A refreshing weekend for women to connect, worship, and grow in faith. Theme: 'Blooming Where You're Planted'",
    category: "womens",
    capacity: 75,
    currentAttendees: 38,
    price: 95,
    tags: ["Women's Ministry", "Retreat", "Weekend"],
  },
  {
    id: "easter-sunrise-2025",
    title: "Easter Sunrise Service",
    date: "April 20, 2025",
    time: "6:30 AM",
    endTime: "7:30 AM",
    location: "Outdoor Amphitheater",
    description: "Celebrate the resurrection at sunrise with worship and communion. Breakfast to follow.",
    category: "worship",
    capacity: 200,
    currentAttendees: 0,
    mealProvided: true,
    tags: ["Easter", "Special Service", "Outdoor"],
  },
  {
    id: "vbs-2025",
    title: "Vacation Bible School",
    date: "June 16-20, 2025",
    time: "9:00 AM",
    endTime: "12:00 PM",
    location: "Education Wing",
    description: "A week of fun, games, and Bible lessons for kids ages 4-12. Theme: 'God's Great Adventure'",
    category: "children",
    capacity: 150,
    currentAttendees: 87,
    tags: ["Children", "VBS", "Summer"],
  },
];

const categoryIcons: { [key: string]: JSX.Element } = {
  worship: <Music size={20} />,
  prayer: <Heart size={20} />,
  fellowship: <Coffee size={20} />,
  youth: <Users2 size={20} />,
  education: <Book size={20} />,
  womens: <Users size={20} />,
  children: <Baby size={20} />,
  special: <Sparkles size={20} />,
  online: <Globe size={20} />,
};

const categoryColors: { [key: string]: string } = {
  worship: "bg-purple-100 text-purple-700 border-purple-300",
  prayer: "bg-yellow-100 text-yellow-700 border-yellow-300",
  fellowship: "bg-green-100 text-green-700 border-green-300",
  youth: "bg-blue-100 text-blue-700 border-blue-300",
  education: "bg-indigo-100 text-indigo-700 border-indigo-300",
  womens: "bg-pink-100 text-pink-700 border-pink-300",
  children: "bg-orange-100 text-orange-700 border-orange-300",
  special: "bg-red-100 text-red-700 border-red-300",
  online: "bg-gray-100 text-gray-700 border-gray-300",
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(upcomingEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(upcomingEvents);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    // Filter events based on category and search
    let filtered = [...events];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredEvents(filtered);
  }, [selectedCategory, searchQuery, events]);

  const categories = [
    { value: "all", label: "All Events", count: events.length },
    { value: "worship", label: "Worship", count: events.filter(e => e.category === "worship").length },
    { value: "education", label: "Education", count: events.filter(e => e.category === "education").length },
    { value: "fellowship", label: "Fellowship", count: events.filter(e => e.category === "fellowship").length },
    { value: "youth", label: "Youth", count: events.filter(e => e.category === "youth").length },
    { value: "womens", label: "Women's", count: events.filter(e => e.category === "womens").length },
    { value: "children", label: "Children", count: events.filter(e => e.category === "children").length },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Upcoming Events
            </h1>
            <p className="text-xl text-primary-100">
              Join us for worship, fellowship, and community events.
              There's something for everyone at Minneapolis Community of Christ!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="bg-white border-b sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
              <Filter size={20} className="text-gray-600 flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedCategory === category.value
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid"
                    ? "bg-primary-100 text-primary-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list"
                    ? "bg-primary-100 text-primary-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid/List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredEvents.length > 0 ? (
            <div className={viewMode === "grid"
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6 max-w-4xl mx-auto"
            }>
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all ${
                    viewMode === "list" ? "flex gap-6" : ""
                  }`}
                >
                  {/* Event Image */}
                  {event.image && (
                    <div className={viewMode === "list" ? "w-48 flex-shrink-0" : ""}>
                      <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-t-xl overflow-hidden">
                        {/* Placeholder for event image */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          {categoryIcons[event.category] || <Calendar size={48} />}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Event Content */}
                  <div className="p-6 flex-1">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                        categoryColors[event.category] || categoryColors.special
                      }`}>
                        {categoryIcons[event.category]}
                        <span className="ml-1">
                          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                        </span>
                      </span>
                      {event.price && (
                        <span className="text-sm font-semibold text-gray-600">
                          ${event.price}
                        </span>
                      )}
                    </div>

                    {/* Event Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {event.title}
                    </h3>

                    {/* Event Details */}
                    <div className="space-y-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-gray-400" />
                        {event.time}
                        {event.endTime && ` - ${event.endTime}`}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2 text-gray-400" />
                        {event.location}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.childcareAvailable && (
                        <span className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          <Baby size={12} className="mr-1" />
                          Childcare
                        </span>
                      )}
                      {event.mealProvided && (
                        <span className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          🍽️ Meal Provided
                        </span>
                      )}
                      {event.tags?.map(tag => (
                        <span key={tag} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Capacity Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>{event.currentAttendees} registered</span>
                        <span>{event.capacity - event.currentAttendees} spots left</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            (event.currentAttendees / event.capacity) >= 0.9
                              ? "bg-red-500"
                              : (event.currentAttendees / event.capacity) >= 0.7
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                          style={{
                            width: `${(event.currentAttendees / event.capacity) * 100}%`
                          }}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="flex-1 py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
                      >
                        Register
                        <ArrowRight size={16} className="ml-1" />
                      </button>
                      <Link
                        href={`/events/${event.id}`}
                        className="py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No events found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Registration Modal */}
      {selectedEvent && (
        <EventRegistration
          event={{
            ...selectedEvent,
            currentAttendees: selectedEvent.currentAttendees,
          }}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* Newsletter CTA */}
      <section className="bg-primary-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Don't Miss Out!
            </h2>
            <p className="text-xl mb-6 text-primary-100">
              Subscribe to our newsletter to get notified about upcoming events and church news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}