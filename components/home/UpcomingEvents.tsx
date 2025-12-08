"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import Link from "next/link";

const events = [
  {
    id: 1,
    title: "Community Meal & Fellowship",
    date: "December 15, 2025",
    time: "6:00 PM",
    location: "Fellowship Hall",
    description: "Join us for a potluck dinner and time of fellowship.",
  },
  {
    id: 2,
    title: "Christmas Eve Service",
    date: "December 24, 2025",
    time: "7:00 PM",
    location: "Main Sanctuary",
    description: "Celebrate the birth of Christ with candlelight and carols.",
  },
  {
    id: 3,
    title: "New Year Prayer Vigil",
    date: "December 31, 2025",
    time: "10:00 PM",
    location: "Prayer Chapel",
    description: "Welcome the new year with prayer and reflection.",
  },
];

export default function UpcomingEvents() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Connect with our community through worship, fellowship, and service
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white border border-secondary-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center text-primary-600 mb-3">
                <Calendar size={20} className="mr-2" />
                <span className="font-semibold">{event.date}</span>
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2">
                {event.title}
              </h3>
              <div className="space-y-2 mb-4 text-secondary-600">
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span className="text-sm">{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>
              <p className="text-secondary-600 mb-4">{event.description}</p>
              <button className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                RSVP
              </button>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/connect/events"
            className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700"
          >
            View All Events
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
