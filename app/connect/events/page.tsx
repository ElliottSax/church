"use client";

import { useState } from "react";
import { Calendar, MapPin, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: "worship" | "fellowship" | "outreach" | "study";
  capacity?: number;
  registered?: number;
}

const events: Event[] = [
  {
    id: 1,
    title: "Sunday Worship Service",
    date: "December 10, 2025",
    time: "10:00 AM",
    location: "Main Sanctuary",
    description: "Join us for our weekly worship service with communion.",
    category: "worship",
  },
  {
    id: 2,
    title: "Community Meal & Fellowship",
    date: "December 15, 2025",
    time: "6:00 PM",
    location: "Fellowship Hall",
    description: "Potluck dinner and time of fellowship. All are welcome!",
    category: "fellowship",
    capacity: 100,
    registered: 45,
  },
  {
    id: 3,
    title: "Bible Study: Book of Acts",
    date: "December 13, 2025",
    time: "7:00 PM",
    location: "Room 201",
    description: "Week 3 of our study on the early church.",
    category: "study",
  },
  {
    id: 4,
    title: "Food Shelf Volunteer Day",
    date: "December 16, 2025",
    time: "9:00 AM",
    location: "Minneapolis Food Shelf",
    description: "Help sort and distribute food to families in need.",
    category: "outreach",
    capacity: 20,
    registered: 12,
  },
  {
    id: 5,
    title: "Christmas Eve Service",
    date: "December 24, 2025",
    time: "7:00 PM",
    location: "Main Sanctuary",
    description: "Celebrate the birth of Christ with candlelight and carols.",
    category: "worship",
  },
];

const categoryColors = {
  worship: "bg-purple-100 text-purple-700",
  fellowship: "bg-blue-100 text-blue-700",
  outreach: "bg-green-100 text-green-700",
  study: "bg-orange-100 text-orange-700",
};

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentMonth] = useState("December 2025");

  const filteredEvents = selectedCategory === "all"
    ? events
    : events.filter((e) => e.category === selectedCategory);

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Events Calendar</h1>
            <p className="text-xl text-primary-100">
              Join us for worship, fellowship, and service opportunities
            </p>
          </div>
        </div>
      </section>

      {/* Calendar Header */}
      <section className="py-8 bg-white border-b border-secondary-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <button className="p-2 hover:bg-secondary-100 rounded transition-colors">
                <ChevronLeft size={24} />
              </button>
              <h2 className="text-2xl font-bold text-secondary-900">{currentMonth}</h2>
              <button className="p-2 hover:bg-secondary-100 rounded transition-colors">
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === "all"
                    ? "bg-primary-600 text-white"
                    : "bg-secondary-100 text-secondary-700 hover:bg-secondary-200"
                }`}
              >
                All Events
              </button>
              <button
                onClick={() => setSelectedCategory("worship")}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === "worship"
                    ? "bg-purple-600 text-white"
                    : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                }`}
              >
                Worship
              </button>
              <button
                onClick={() => setSelectedCategory("fellowship")}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === "fellowship"
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
              >
                Fellowship
              </button>
              <button
                onClick={() => setSelectedCategory("study")}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === "study"
                    ? "bg-orange-600 text-white"
                    : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                }`}
              >
                Study
              </button>
              <button
                onClick={() => setSelectedCategory("outreach")}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === "outreach"
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                Outreach
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="md:flex">
                  {/* Date Box */}
                  <div className="bg-primary-600 text-white p-6 md:w-32 flex md:flex-col items-center justify-center text-center">
                    <Calendar className="mb-2 hidden md:block" size={32} />
                    <div className="text-3xl font-bold">
                      {event.date.split(" ")[1].replace(",", "")}
                    </div>
                    <div className="text-sm">{event.date.split(" ")[0]}</div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                          {event.title}
                        </h3>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            categoryColors[event.category]
                          }`}
                        >
                          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                        </span>
                      </div>
                    </div>

                    <p className="text-secondary-600 mb-4">{event.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-secondary-600 mb-4">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2" />
                        {event.location}
                      </div>
                      {event.capacity && (
                        <div className="flex items-center">
                          <Users size={16} className="mr-2" />
                          {event.registered}/{event.capacity} registered
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <button className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                        RSVP
                      </button>
                      <button className="px-6 py-2 bg-secondary-100 text-secondary-700 rounded-lg font-semibold hover:bg-secondary-200 transition-colors">
                        Add to Calendar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-secondary-600 text-lg">
                  No events found in this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
