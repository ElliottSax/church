"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  AlertCircle,
  Loader,
  ExternalLink,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
  getDay,
} from "date-fns";
import Link from "next/link";
import {
  fetchCommunityOfChristCalendar,
  ParsedCalendarEvent,
} from "@/lib/calendar-feed";

interface ChurchCalendarProps {
  compact?: boolean;
}

export default function ChurchCalendar({ compact = false }: ChurchCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<ParsedCalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEventDetails, setShowEventDetails] =
    useState<ParsedCalendarEvent | null>(null);

  // Fetch calendar feed on mount
  useEffect(() => {
    const loadCalendar = async () => {
      setLoading(true);
      try {
        const fetchedEvents = await fetchCommunityOfChristCalendar();
        setEvents(fetchedEvents);
        setError(null);
      } catch (err) {
        setError("Failed to load calendar. Please try again later.");
        console.error("Calendar fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCalendar();
  }, []);

  // Get events for a specific date
  const getEventsForDate = (date: Date): ParsedCalendarEvent[] => {
    return events.filter((event) => {
      const eventDate = new Date(event.startDate);
      return isSameDay(eventDate, date);
    });
  };

  // Generate calendar days
  const calendarDays = (() => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    const days = [];

    let day = start;
    while (day <= end) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  })();

  // Upcoming events (next 7 days)
  const upcomingEvents = events
    .filter(
      (event) =>
        new Date(event.startDate) >= new Date() &&
        new Date(event.startDate) <=
          addDays(new Date(), 7)
    )
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )
    .slice(0, 5);

  if (compact) {
    return (
      <div className="space-y-6">
        {/* Mini Calendar */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4 text-secondary-900">
            Calendar
          </h3>

          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 text-red-700 rounded">
              <AlertCircle size={20} />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="animate-spin text-primary-600" size={24} />
            </div>
          ) : (
            <>
              {/* Upcoming Events */}
              {upcomingEvents.length > 0 ? (
                <div className="space-y-2">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-2 bg-primary-50 rounded text-sm"
                    >
                      <p className="font-semibold text-primary-700">
                        {event.title}
                      </p>
                      <p className="text-primary-600 text-xs">
                        {format(new Date(event.startDate), "MMM d, h:mm a")}
                      </p>
                      {event.location && (
                        <p className="text-primary-600 text-xs flex items-center gap-1 mt-1">
                          <MapPin size={12} />
                          {event.location}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-secondary-600 text-sm">
                  No upcoming events in the next week.
                </p>
              )}

              <Link
                href="/calendar"
                className="inline-block mt-4 text-primary-600 hover:text-primary-700 text-sm font-semibold"
              >
                View Full Calendar →
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }

  // Full calendar view
  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-900">Calendar Notice</h3>
            <p className="text-yellow-700 text-sm mt-1">{error}</p>
            <p className="text-yellow-600 text-xs mt-2">
              For the latest Community of Christ events, visit{" "}
              <a
                href="https://gathering.cofchrist.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-yellow-900"
              >
                gathering.cofchrist.org
              </a>
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-primary-600 text-white p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Calendar className="w-8 h-8" />
              <h2 className="text-3xl font-bold">
                {format(currentDate, "MMMM yyyy")}
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                className="p-2 hover:bg-primary-700 rounded transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2 hover:bg-primary-700 rounded transition-colors text-sm font-semibold"
              >
                Today
              </button>
              <button
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                className="p-2 hover:bg-primary-700 rounded transition-colors"
                aria-label="Next month"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Community of Christ Reference */}
          <p className="text-primary-100 text-sm">
            Events from Community of Christ worldwide calendar
          </p>
        </div>

        {/* Calendar Grid */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <Loader className="animate-spin text-primary-600 mx-auto mb-4" size={32} />
                <p className="text-secondary-600">Loading calendar events...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div
                    key={day}
                    className="text-center font-semibold text-secondary-700 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day) => {
                  const dayEvents = getEventsForDate(day);
                  const isCurrentMonth = isSameMonth(day, currentDate);
                  const isCurrentDay = isToday(day);

                  return (
                    <motion.div
                      key={day.toISOString()}
                      className={`min-h-24 p-2 rounded-lg border-2 cursor-pointer transition-all ${
                        isCurrentMonth
                          ? isCurrentDay
                            ? "border-primary-500 bg-primary-50"
                            : "border-secondary-200 bg-white hover:border-primary-400"
                          : "border-secondary-100 bg-gray-50"
                      }`}
                      onClick={() => setSelectedDate(day)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div
                        className={`text-sm font-semibold mb-1 ${
                          isCurrentDay
                            ? "text-primary-700"
                            : isCurrentMonth
                            ? "text-secondary-900"
                            : "text-secondary-400"
                        }`}
                      >
                        {format(day, "d")}
                      </div>

                      {/* Event indicators */}
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <motion.div
                            key={event.id}
                            className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded truncate hover:bg-primary-200 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowEventDetails(event);
                            }}
                            title={event.title}
                          >
                            {event.title}
                          </motion.div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-primary-600 px-2 font-semibold">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {showEventDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEventDetails(null)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6"
            >
              <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                {showEventDetails.title}
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-secondary-700">
                  <Clock size={20} className="text-primary-600" />
                  <div>
                    <p className="text-sm text-secondary-600">Date & Time</p>
                    <p className="font-semibold">
                      {format(
                        new Date(showEventDetails.startDate),
                        "EEEE, MMMM d, yyyy"
                      )}
                      {!showEventDetails.allDay && (
                        <>
                          <br />
                          {format(
                            new Date(showEventDetails.startDate),
                            "h:mm a"
                          )}
                          {showEventDetails.endDate && (
                            <> - {format(new Date(showEventDetails.endDate), "h:mm a")}</>
                          )}
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {showEventDetails.location && (
                  <div className="flex items-start gap-3 text-secondary-700">
                    <MapPin size={20} className="text-primary-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-secondary-600">Location</p>
                      <p className="font-semibold">
                        {showEventDetails.location}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {showEventDetails.description && (
                <div className="mb-6 pb-6 border-b border-secondary-200">
                  <p className="text-sm text-secondary-600 mb-2">Description</p>
                  <p className="text-secondary-700">
                    {showEventDetails.description}
                  </p>
                </div>
              )}

              {showEventDetails.url && (
                <a
                  href={showEventDetails.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors mb-4"
                >
                  Learn More
                  <ExternalLink size={16} />
                </a>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => setShowEventDetails(null)}
                  className="flex-1 px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors font-semibold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info section */}
      <div className="mt-8 p-6 bg-primary-50 rounded-lg border border-primary-200">
        <h3 className="font-semibold text-primary-900 mb-2">
          Community of Christ Events
        </h3>
        <p className="text-primary-800 text-sm mb-3">
          This calendar displays events from Community of Christ worldwide. For
          the complete event schedule and more details, visit the official
          gathering site.
        </p>
        <a
          href="https://gathering.cofchrist.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm"
        >
          Visit Community of Christ Gathering
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}
