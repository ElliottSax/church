"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Book,
  Users,
  Clock,
  MapPin,
  Calendar,
  ChevronRight,
  Filter,
  Search,
  CheckCircle,
  AlertCircle,
  Video,
  User,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";

interface BibleStudyGroup {
  id: string;
  name: string;
  leader: string;
  schedule: string;
  location: string;
  description: string;
  currentBook: string;
  spotsAvailable: number;
  maxCapacity: number;
  materials?: string[];
  prerequisites?: string;
  ageGroup?: string;
  isOnline?: boolean;
  fillPercentage?: number;
  currentMembers?: number;
}

export default function BibleStudyPage() {
  const [groups, setGroups] = useState<BibleStudyGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<BibleStudyGroup | null>(null);
  const [registrationForm, setRegistrationForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const fetchGroups = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== "all") {
        if (filter === "hasSpace") params.append("hasSpace", "true");
        else if (filter === "online") params.append("isOnline", "true");
        else params.append("ageGroup", filter);
      }

      const response = await fetch(`/api/calendar/bible-study?${params}`).catch(() => null);
      if (response) {
        const data = await response.json();
        setGroups(data.groups);
      } else {
        // Use mock data for static deployment
        setGroups([
          {
            id: "demo-1",
            name: "Demo Bible Study Group",
            leader: "Demo Leader",
            schedule: "Wednesdays, 7:00 PM",
            location: "Room 101",
            description: "This is a demo group. In production, groups would load from a database.",
            currentBook: "Demo Book",
            spotsAvailable: 10,
            maxCapacity: 20,
            fillPercentage: 50,
            currentMembers: 10,
          }
        ]);
      }
    } catch (error) {
      console.error("Error fetching bible study groups:", error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGroup) return;

    setSubmitting(true);
    setRegistrationStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/calendar/bible-study", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupId: selectedGroup.id,
          ...registrationForm,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setRegistrationStatus({
          type: "success",
          message: `Successfully registered for ${selectedGroup.name}! Check your email for confirmation details.`,
        });
        setRegistrationForm({ name: "", email: "", phone: "", message: "" });

        // Refresh groups to update available spots
        fetchGroups();

        // Close modal after 3 seconds
        setTimeout(() => {
          setSelectedGroup(null);
          setRegistrationStatus({ type: null, message: "" });
        }, 3000);
      } else {
        setRegistrationStatus({
          type: "error",
          message: data.error || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      setRegistrationStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.leader.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.currentBook.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              Bible Study Groups
            </h1>
            <p className="text-xl text-primary-100">
              Join a community of believers as we dive deep into God&apos;s Word together.
              Find a group that fits your schedule and spiritual journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search groups, leaders, or books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 items-center">
              <Filter size={20} className="text-gray-600" />
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "all", label: "All Groups" },
                  { value: "hasSpace", label: "Available" },
                  { value: "Adults", label: "Adults" },
                  { value: "Women", label: "Women" },
                  { value: "Men", label: "Men" },
                  { value: "Young Adults", label: "Young Adults" },
                  { value: "online", label: "Online" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFilter(option.value)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      filter === option.value
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Groups Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              <p className="mt-4 text-gray-600">Loading bible study groups...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group, index) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {group.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Led by {group.leader}
                        </p>
                      </div>
                      {group.isOnline && (
                        <Video className="text-blue-600" size={20} />
                      )}
                    </div>

                    {/* Current Study */}
                    <div className="bg-primary-50 rounded-lg p-3 mb-4">
                      <p className="text-sm font-medium text-primary-900">
                        Currently Studying:
                      </p>
                      <p className="text-primary-700">{group.currentBook}</p>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-gray-400" />
                        {group.schedule}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2 text-gray-400" />
                        {group.location}
                      </div>
                      {group.ageGroup && (
                        <div className="flex items-center">
                          <Users size={16} className="mr-2 text-gray-400" />
                          {group.ageGroup}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {group.description}
                    </p>

                    {/* Capacity */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">
                          {group.currentMembers}/{group.maxCapacity} members
                        </span>
                        <span className={`font-medium ${
                          group.spotsAvailable > 5
                            ? "text-green-600"
                            : group.spotsAvailable > 0
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}>
                          {group.spotsAvailable > 0
                            ? `${group.spotsAvailable} spots left`
                            : "Full"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            (group.fillPercentage ?? 0) === 100
                              ? "bg-red-500"
                              : (group.fillPercentage ?? 0) >= 75
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                          style={{ width: `${group.fillPercentage ?? 0}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => setSelectedGroup(group)}
                      disabled={group.spotsAvailable === 0}
                      className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                        group.spotsAvailable > 0
                          ? "bg-primary-600 text-white hover:bg-primary-700"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {group.spotsAvailable > 0 ? "Register" : "Join Waiting List"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {filteredGroups.length === 0 && !loading && (
            <div className="text-center py-12">
              <Book size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">
                No bible study groups found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Registration Modal */}
      {selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Register for {selectedGroup.name}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Led by {selectedGroup.leader}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedGroup(null);
                    setRegistrationStatus({ type: null, message: "" });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              {/* Group Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Group Details</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Schedule:</strong> {selectedGroup.schedule}</p>
                  <p><strong>Location:</strong> {selectedGroup.location}</p>
                  <p><strong>Current Study:</strong> {selectedGroup.currentBook}</p>
                  {selectedGroup.materials && (
                    <div>
                      <strong>Materials Needed:</strong>
                      <ul className="list-disc list-inside mt-1">
                        {selectedGroup.materials.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedGroup.prerequisites && (
                    <p><strong>Prerequisites:</strong> {selectedGroup.prerequisites}</p>
                  )}
                </div>
              </div>

              {/* Registration Status */}
              {registrationStatus.type && (
                <div className={`mb-4 p-4 rounded-lg flex items-start ${
                  registrationStatus.type === "success"
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}>
                  {registrationStatus.type === "success" ? (
                    <CheckCircle size={20} className="mr-2 mt-0.5" />
                  ) : (
                    <AlertCircle size={20} className="mr-2 mt-0.5" />
                  )}
                  <p>{registrationStatus.message}</p>
                </div>
              )}

              {/* Registration Form */}
              {registrationStatus.type !== "success" && (
                <form onSubmit={handleRegistration}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <User size={16} className="inline mr-1" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={registrationForm.name}
                        onChange={(e) =>
                          setRegistrationForm({ ...registrationForm, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Mail size={16} className="inline mr-1" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={registrationForm.email}
                        onChange={(e) =>
                          setRegistrationForm({ ...registrationForm, email: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Phone size={16} className="inline mr-1" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={registrationForm.phone}
                        onChange={(e) =>
                          setRegistrationForm({ ...registrationForm, phone: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Questions or Special Needs
                      </label>
                      <textarea
                        rows={3}
                        value={registrationForm.message}
                        onChange={(e) =>
                          setRegistrationForm({ ...registrationForm, message: e.target.value })
                        }
                        placeholder="Let us know if you have any questions or special accommodations needed..."
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedGroup(null);
                        setRegistrationStatus({ type: null, message: "" });
                      }}
                      className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Registering..." : "Complete Registration"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}