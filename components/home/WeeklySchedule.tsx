"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ChevronRight, Book, Church, Users } from "lucide-react";
import Link from "next/link";

const weeklyServices = [
  {
    day: "Sunday",
    services: [
      {
        time: "10:30 AM",
        title: "Worship Service",
        location: "Main Sanctuary",
        type: "worship",
      },
      {
        time: "11:45 AM",
        title: "Sunday School (All Ages)",
        location: "Education Wing",
        type: "education",
      },
    ],
  },
  {
    day: "Wednesday",
    services: [
      {
        time: "6:00 PM",
        title: "Prayer Meeting",
        location: "Prayer Chapel",
        type: "prayer",
      },
    ],
  },
  {
    day: "Friday",
    services: [
      {
        time: "7:00 PM",
        title: "Bible Study",
        location: "Fellowship Hall",
        type: "education",
      },
    ],
  },
  {
    day: "Thursday",
    services: [
      {
        time: "6:30 PM",
        title: "Youth Group",
        location: "Youth Center",
        type: "youth",
      },
    ],
  },
];

const upcomingBibleStudies = [
  {
    name: "New Testament Survey",
    day: "Monday",
    time: "7:00 PM",
    leader: "Dr. James Wilson",
    spotsLeft: 5,
  },
  {
    name: "Women&apos;s Heart to Heart",
    day: "Tuesday",
    time: "10:00 AM",
    leader: "Sarah Miller",
    spotsLeft: 8,
  },
  {
    name: "Marriage & Family",
    day: "Friday",
    time: "7:00 PM",
    leader: "Tom & Lisa Anderson",
    spotsLeft: 3,
  },
  {
    name: "Foundations of Faith",
    day: "Thursday",
    time: "6:30 PM",
    leader: "Pastor John",
    spotsLeft: 10,
  },
];

export default function WeeklySchedule() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "worship":
        return <Church size={16} className="text-purple-600" />;
      case "education":
        return <Book size={16} className="text-blue-600" />;
      case "youth":
        return <Users size={16} className="text-green-600" />;
      default:
        return <Calendar size={16} className="text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "worship":
        return "bg-purple-100 text-purple-700";
      case "education":
        return "bg-blue-100 text-blue-700";
      case "youth":
        return "bg-green-100 text-green-700";
      case "prayer":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Join Us for Worship & Study
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              We gather regularly for worship services and Bible study.
              Find a service or study group that fits your schedule.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Weekly Services */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-secondary-50 to-primary-50/30 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-secondary-900">
                  Weekly Services
                </h3>
                <Link
                  href="/calendar"
                  className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-semibold"
                >
                  Full Calendar
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>

              <div className="space-y-6">
                {weeklyServices.map((daySchedule, index) => (
                  <motion.div
                    key={daySchedule.day}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="font-semibold text-secondary-900 mb-3 flex items-center">
                      <Calendar size={18} className="mr-2 text-primary-600" />
                      {daySchedule.day}
                    </div>
                    <div className="space-y-2 ml-6">
                      {daySchedule.services.map((service) => (
                        <div
                          key={`${service.time}-${service.title}`}
                          className="bg-white rounded-lg p-3 shadow-sm"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {getTypeIcon(service.type)}
                                <span className="font-medium text-secondary-900">
                                  {service.title}
                                </span>
                              </div>
                              <div className="text-sm text-secondary-600 space-y-0.5">
                                <div className="flex items-center">
                                  <Clock size={14} className="mr-1.5" />
                                  {service.time}
                                </div>
                                <div className="flex items-center">
                                  <MapPin size={14} className="mr-1.5" />
                                  {service.location}
                                </div>
                              </div>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(service.type)}`}>
                              {service.type}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bible Study Groups */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-secondary-900">
                  Bible Study Groups
                </h3>
                <Link
                  href="/grow/bible-study"
                  className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-semibold"
                >
                  All Groups
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>

              <div className="space-y-4">
                {upcomingBibleStudies.map((study, index) => (
                  <motion.div
                    key={study.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="border-l-4 border-primary-500 pl-4 py-2 hover:bg-gray-50 rounded-r-lg transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-secondary-900">
                          {study.name}
                        </h4>
                        <div className="text-sm text-secondary-600 mt-1">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1.5" />
                            {study.day}s at {study.time}
                          </div>
                          <div className="flex items-center mt-0.5">
                            <Users size={14} className="mr-1.5" />
                            Led by {study.leader}
                          </div>
                        </div>
                      </div>
                      {study.spotsLeft > 0 ? (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full whitespace-nowrap">
                          {study.spotsLeft} spots
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
                          Full
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <Link
                  href="/calendar"
                  className="w-full block text-center px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  View Full Calendar
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Quick Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 bg-primary-600 text-white rounded-xl p-6"
          >
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-semibold mb-2">Sunday Services</h4>
                <p className="text-primary-100">10:30 AM Worship Service</p>
                <p className="text-primary-100">11:45 AM Sunday School</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Midweek Services</h4>
                <p className="text-primary-100">Wednesday 6:00 PM Prayer</p>
                <p className="text-primary-100">Friday 7:00 PM Bible Study</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Special Programs</h4>
                <p className="text-primary-100">Youth Group Thursday 6:30 PM</p>
                <p className="text-primary-100">Men&apos;s & Women&apos;s Studies</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}