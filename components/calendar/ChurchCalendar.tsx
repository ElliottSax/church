"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  Book,
  Church,
  Video,
  Coffee,
  Heart,
  Music,
  Baby,
  Users2,
  Sparkles,
  Filter,
  List,
  Grid3X3,
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
  setHours,
  setMinutes,
} from "date-fns";
import Link from "next/link";

interface CalendarEvent {
  id: string;
  title: string;
  type: "service" | "bible-study" | "event" | "meeting" | "youth" | "special";
  date: Date;
  startTime: string;
  endTime?: string;
  location: string;
  description?: string;
  recurring?: {
    frequency: "weekly" | "biweekly" | "monthly";
    daysOfWeek?: number[]; // 0 = Sunday, 6 = Saturday
    endDate?: Date;
  };
  leader?: string;
  capacity?: number;
  attendees?: number;
  category?: string;
  isOnline?: boolean;
  zoomLink?: string;
  color?: string;
}

// Regular weekly schedule
const weeklySchedule: CalendarEvent[] = [
  // Sunday Services
  {
    id: "sun-worship-1",
    title: "Traditional Worship Service",
    type: "service",
    date: new Date(),
    startTime: "09:00",
    endTime: "10:15",
    location: "Main Sanctuary",
    description: "Traditional hymns and liturgy",
    recurring: {
      frequency: "weekly",
      daysOfWeek: [0], // Sunday
    },
    leader: "Pastor John Smith",
    category: "worship",
  },
  {
    id: "sun-worship-2",
    title: "Contemporary Worship Service",
    type: "service",
    date: new Date(),
    startTime: "11:00",
    endTime: "12:15",
    location: "Main Sanctuary",
    description: "Modern worship with contemporary music",
    recurring: {
      frequency: "weekly",
      daysOfWeek: [0],
    },
    leader: "Pastor John Smith",
    category: "worship",
  },
  {
    id: "sun-school",
    title: "Sunday School (All Ages)",
    type: "bible-study",
    date: new Date(),
    startTime: "10:30",
    endTime: "11:00",
    location: "Education Wing",
    description: "Bible study classes for all age groups",
    recurring: {
      frequency: "weekly",
      daysOfWeek: [0],
    },
    category: "education",
  },

  // Wednesday Services
  {
    id: "wed-bible",
    title: "Wednesday Bible Study",
    type: "bible-study",
    date: new Date(),
    startTime: "19:00",
    endTime: "20:30",
    location: "Fellowship Hall",
    description: "In-depth Bible study and discussion",
    recurring: {
      frequency: "weekly",
      daysOfWeek: [3], // Wednesday
    },
    leader: "Pastor Sarah Johnson",
    category: "education",
  },
  {
    id: "wed-prayer",
    title: "Prayer Meeting",
    type: "meeting",
    date: new Date(),
    startTime: "18:00",
    endTime: "18:45",
    location: "Prayer Chapel",
    description: "Corporate prayer time",
    recurring: {
      frequency: "weekly",
      daysOfWeek: [3],
    },
    category: "prayer",
  },

  // Tuesday Groups
  {
    id: "tue-womens",
    title: "Women&apos;s Bible Study",
    type: "bible-study",
    date: new Date(),
    startTime: "10:00",
    endTime: "11:30",
    location: "Room 201",
    description: "Women&apos;s fellowship and Bible study",
    recurring: {
      frequency: "weekly",
      daysOfWeek: [2], // Tuesday
    },
    leader: "Mary Williams",
    category: "womens",
  },
  {
    id: "tue-mens",
    title: "Men&apos;s Bible Study",
    type: "bible-study",
    date: new Date(),
    startTime: "06:00",
    endTime: "07:00",
    location: "Room 103",
    description: "Early morning men&apos;s Bible study and prayer",
    recurring: {
      frequency: "weekly",
      daysOfWeek: [2],
    },
    leader: "David Brown",
    category: "mens",
  },

  // Thursday Groups
  {
    id: "thu-youth",
    title: "Youth Group",
    type: "youth",
    date: new Date(),
    startTime: "18:30",
    endTime: "20:30",
    location: "Youth Center",
    description: "Teen worship, games, and Bible study",
    recurring: {
      frequency: "weekly",
      daysOfWeek: [4], // Thursday
    },
    leader: "Youth Pastor Mike",
    category: "youth",
  },
  {
    id: "thu-choir",
    title: "Choir Practice",
    type: "meeting",
    date: new Date(),
    startTime: "19:00",
    endTime: "20:30",
    location: "Choir Room",
    description: "Worship team and choir rehearsal",
    recurring: {
      frequency: "weekly",
      daysOfWeek: [4],
    },
    leader: "Music Director Jane",
    category: "worship",
  },

  // Friday Groups
  {
    id: "fri-youth-bible",
    title: "Young Adults Bible Study",
    type: "bible-study",
    date: new Date(),
    startTime: "19:00",
    endTime: "21:00",
    location: "Coffee House",
    description: "Bible study for ages 18-30",
    recurring: {
      frequency: "weekly",
      daysOfWeek: [5], // Friday
    },
    leader: "Pastor Mike",
    category: "young-adults",
  },

  // Saturday Groups
  {
    id: "sat-mens-breakfast",
    title: "Men&apos;s Breakfast & Bible Study",
    type: "meeting",
    date: new Date(),
    startTime: "08:00",
    endTime: "10:00",
    location: "Fellowship Hall",
    description: "Monthly men&apos;s breakfast and devotional",
    recurring: {
      frequency: "monthly",
      daysOfWeek: [6], // First Saturday
    },
    leader: "Men&apos;s Ministry Team",
    category: "mens",
  },
];

// Bible Study Groups
const bibleStudyGroups = [
  {
    id: "bs-1",
    name: "New Testament Survey",
    leader: "Dr. James Wilson",
    schedule: "Mondays, 7:00 PM",
    location: "Room 204",
    currentBook: "Gospel of John",
    spotsAvailable: 5,
    maxCapacity: 20,
  },
  {
    id: "bs-2",
    name: "Women&apos;s Heart to Heart",
    leader: "Sarah Miller",
    schedule: "Tuesdays, 10:00 AM",
    location: "Room 201",
    currentBook: "Proverbs 31",
    spotsAvailable: 8,
    maxCapacity: 15,
  },
  {
    id: "bs-3",
    name: "Marriage & Family",
    leader: "Tom & Lisa Anderson",
    schedule: "Wednesdays, 7:00 PM",
    location: "Conference Room",
    currentBook: "Love & Respect",
    spotsAvailable: 3,
    maxCapacity: 12,
  },
  {
    id: "bs-4",
    name: "Foundations of Faith",
    leader: "Pastor John",
    schedule: "Thursdays, 6:30 PM",
    location: "Chapel",
    currentBook: "Basic Christianity",
    spotsAvailable: 10,
    maxCapacity: 25,
  },
  {
    id: "bs-5",
    name: "Senior Saints",
    leader: "Bob Thompson",
    schedule: "Thursdays, 10:00 AM",
    location: "Library",
    currentBook: "Psalms",
    spotsAvailable: 6,
    maxCapacity: 15,
  },
];

interface ChurchCalendarProps {
  showOnlyServices?: boolean;
  showOnlyBibleStudy?: boolean;
  compact?: boolean;
}

export default function ChurchCalendar({
  showOnlyServices = false,
  showOnlyBibleStudy = false,
  compact = false,
}: ChurchCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<"month" | "week" | "list">("month");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [showEventDetails, setShowEventDetails] = useState<CalendarEvent | null>(null);

  // Get events for a specific date
  const getEventsForDate = (date: Date): CalendarEvent[] => {
    const events: CalendarEvent[] = [];
    const dayOfWeek = getDay(date);

    // Add recurring events
    weeklySchedule.forEach((event) => {
      if (event.recurring?.daysOfWeek?.includes(dayOfWeek)) {
        // Check if it's monthly and if it's the right week
        if (event.recurring.frequency === "monthly") {
          const weekOfMonth = Math.ceil(date.getDate() / 7);
          if (weekOfMonth !== 1) return; // Only first week of month
        }

        events.push({
          ...event,
          date: date,
        });
      }
    });

    // Filter by category
    if (showOnlyServices) {
      return events.filter(e => e.type === "service");
    }
    if (showOnlyBibleStudy) {
      return events.filter(e => e.type === "bible-study");
    }
    if (filterCategory !== "all") {
      return events.filter(e => e.category === filterCategory);
    }

    return events;
  };

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    const days = [];

    let day = start;
    while (day <= end) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  }, [currentDate]);

  // Get week view days
  const weekDays = useMemo(() => {
    const start = startOfWeek(currentDate);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [currentDate]);

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case "service":
        return <Church size={14} />;
      case "bible-study":
        return <Book size={14} />;
      case "youth":
        return <Users2 size={14} />;
      case "meeting":
        return <Coffee size={14} />;
      case "special":
        return <Sparkles size={14} />;
      default:
        return <Calendar size={14} />;
    }
  };

  const getCategoryColor = (type: string) => {
    switch (type) {
      case "service":
        return "bg-purple-100 text-purple-700 border-purple-300";
      case "bible-study":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "youth":
        return "bg-green-100 text-green-700 border-green-300";
      case "meeting":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "special":
        return "bg-pink-100 text-pink-700 border-pink-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  // Month View
  const MonthView = () => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Days of week header */}
      <div className="grid grid-cols-7 bg-gray-50 border-b">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="px-2 py-3 text-center text-sm font-semibold text-gray-700">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {calendarDays.map((day, index) => {
          const events = getEventsForDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isSelected = selectedDate && isSameDay(day, selectedDate);

          return (
            <motion.div
              key={day.toISOString()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.01 }}
              className={`
                min-h-[100px] p-2 border-r border-b cursor-pointer transition-colors
                ${!isCurrentMonth ? "bg-gray-50 text-gray-400" : ""}
                ${isToday(day) ? "bg-blue-50" : ""}
                ${isSelected ? "bg-primary-50" : "hover:bg-gray-50"}
              `}
              onClick={() => setSelectedDate(day)}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-sm font-medium ${isToday(day) ? "text-primary-600" : ""}`}>
                  {format(day, "d")}
                </span>
                {events.length > 0 && (
                  <span className="text-xs bg-primary-100 text-primary-600 px-1.5 py-0.5 rounded-full">
                    {events.length}
                  </span>
                )}
              </div>

              {/* Event dots */}
              <div className="space-y-1">
                {events.slice(0, compact ? 2 : 3).map((event) => (
                  <div
                    key={event.id}
                    className={`text-xs px-1.5 py-0.5 rounded border ${getCategoryColor(event.type)} truncate`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowEventDetails(event);
                    }}
                  >
                    <span className="flex items-center gap-1">
                      {getCategoryIcon(event.type)}
                      <span className="truncate">{event.startTime} - {event.title}</span>
                    </span>
                  </div>
                ))}
                {events.length > (compact ? 2 : 3) && (
                  <div className="text-xs text-gray-500">
                    +{events.length - (compact ? 2 : 3)} more
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  // Week View
  const WeekView = () => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="grid grid-cols-8 border-b">
        <div className="p-3 bg-gray-50 font-semibold text-sm text-gray-600">
          Time
        </div>
        {weekDays.map((day) => (
          <div
            key={day.toISOString()}
            className={`p-3 text-center border-l ${
              isToday(day) ? "bg-primary-50 font-semibold" : "bg-gray-50"
            }`}
          >
            <div className="text-xs text-gray-600">{format(day, "EEE")}</div>
            <div className="text-lg">{format(day, "d")}</div>
          </div>
        ))}
      </div>

      <div className="overflow-y-auto max-h-[600px]">
        {/* Time slots from 6 AM to 10 PM */}
        {Array.from({ length: 17 }, (_, i) => i + 6).map((hour) => (
          <div key={hour} className="grid grid-cols-8 border-b">
            <div className="p-2 bg-gray-50 text-xs text-gray-600">
              {format(setHours(new Date(), hour), "h:mm a")}
            </div>
            {weekDays.map((day) => {
              const events = getEventsForDate(day).filter((event) => {
                const eventHour = parseInt(event.startTime.split(":")[0]);
                return eventHour === hour;
              });

              return (
                <div key={day.toISOString()} className="p-1 border-l min-h-[60px]">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 rounded border ${getCategoryColor(event.type)} cursor-pointer`}
                      onClick={() => setShowEventDetails(event)}
                    >
                      <div className="font-semibold truncate">{event.title}</div>
                      <div className="text-xs opacity-75">{event.location}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  // List View
  const ListView = () => {
    const upcomingEvents: CalendarEvent[] = [];
    for (let i = 0; i < 30; i++) {
      const date = addDays(new Date(), i);
      const events = getEventsForDate(date);
      events.forEach((event) => {
        upcomingEvents.push({ ...event, date });
      });
    }

    return (
      <div className="bg-white rounded-lg shadow-sm divide-y">
        {upcomingEvents.slice(0, 20).map((event) => (
          <div
            key={`${event.id}-${event.date.toISOString()}`}
            className="p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => setShowEventDetails(event)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(event.type)}`}>
                    {getCategoryIcon(event.type)}
                    <span className="ml-1">{event.type.replace("-", " ")}</span>
                  </span>
                  <h3 className="font-semibold text-gray-900">{event.title}</h3>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-2" />
                    {format(event.date, "EEEE, MMMM d, yyyy")}
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-2" />
                    {event.startTime} {event.endTime && `- ${event.endTime}`}
                  </div>
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-2" />
                    {event.location}
                  </div>
                  {event.leader && (
                    <div className="flex items-center">
                      <Users size={14} className="mr-2" />
                      {event.leader}
                    </div>
                  )}
                </div>
              </div>
              {event.isOnline && (
                <Video className="text-blue-600" size={20} />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={compact ? "" : "max-w-7xl mx-auto"}>
      {/* Header */}
      {!compact && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Church Calendar
          </h2>
          <p className="text-gray-600">
            View our worship services, Bible studies, and special events
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Date Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="text-center min-w-[150px]">
              <div className="font-semibold text-gray-900">
                {format(currentDate, "MMMM yyyy")}
              </div>
            </div>
            <button
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight size={20} />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200"
            >
              Today
            </button>
          </div>

          {/* View Mode and Filters */}
          <div className="flex gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm"
            >
              <option value="all">All Categories</option>
              <option value="worship">Worship Services</option>
              <option value="education">Bible Study</option>
              <option value="youth">Youth</option>
              <option value="mens">Men&apos;s Ministry</option>
              <option value="womens">Women&apos;s Ministry</option>
              <option value="prayer">Prayer</option>
            </select>

            <div className="flex gap-1 border rounded-lg p-1">
              <button
                onClick={() => setViewMode("month")}
                className={`px-3 py-1 rounded text-sm ${
                  viewMode === "month"
                    ? "bg-primary-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode("week")}
                className={`px-3 py-1 rounded text-sm ${
                  viewMode === "week"
                    ? "bg-primary-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 rounded text-sm ${
                  viewMode === "list"
                    ? "bg-primary-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === "month" && <MonthView />}
      {viewMode === "week" && <WeekView />}
      {viewMode === "list" && <ListView />}

      {/* Bible Study Groups Section */}
      {!showOnlyServices && !compact && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Ongoing Bible Study Groups
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bibleStudyGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white rounded-lg shadow-sm p-4 border hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-gray-900 mb-2">{group.name}</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <Users size={14} className="mr-2 text-gray-400" />
                    {group.leader}
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-2 text-gray-400" />
                    {group.schedule}
                  </div>
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-2 text-gray-400" />
                    {group.location}
                  </div>
                  <div className="flex items-center">
                    <Book size={14} className="mr-2 text-gray-400" />
                    Currently studying: {group.currentBook}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    group.spotsAvailable > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {group.spotsAvailable > 0
                      ? `${group.spotsAvailable} spots available`
                      : "Full"}
                  </span>
                  {group.spotsAvailable > 0 && (
                    <button className="text-xs text-primary-600 hover:text-primary-700 font-semibold">
                      Join Group
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      <AnimatePresence>
        {showEventDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowEventDetails(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {showEventDetails.title}
                </h3>
                <button
                  onClick={() => setShowEventDetails(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${getCategoryColor(showEventDetails.type)}`}>
                {getCategoryIcon(showEventDetails.type)}
                <span className="ml-1">{showEventDetails.type.replace("-", " ")}</span>
              </div>

              <div className="space-y-3 text-gray-700">
                <div className="flex items-center">
                  <Calendar size={18} className="mr-3 text-gray-400" />
                  {format(showEventDetails.date, "EEEE, MMMM d, yyyy")}
                </div>
                <div className="flex items-center">
                  <Clock size={18} className="mr-3 text-gray-400" />
                  {showEventDetails.startTime}
                  {showEventDetails.endTime && ` - ${showEventDetails.endTime}`}
                </div>
                <div className="flex items-center">
                  <MapPin size={18} className="mr-3 text-gray-400" />
                  {showEventDetails.location}
                </div>
                {showEventDetails.leader && (
                  <div className="flex items-center">
                    <Users size={18} className="mr-3 text-gray-400" />
                    Led by {showEventDetails.leader}
                  </div>
                )}
                {showEventDetails.isOnline && showEventDetails.zoomLink && (
                  <div className="flex items-center">
                    <Video size={18} className="mr-3 text-gray-400" />
                    <a href={showEventDetails.zoomLink} className="text-primary-600 hover:text-primary-700">
                      Join Online
                    </a>
                  </div>
                )}
              </div>

              {showEventDetails.description && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-gray-600">{showEventDetails.description}</p>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <Link
                  href="/connect/events"
                  className="flex-1 px-4 py-2 bg-primary-600 text-white text-center rounded-lg hover:bg-primary-700"
                >
                  View All Events
                </Link>
                <button
                  onClick={() => setShowEventDetails(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}