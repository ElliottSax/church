"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Loader2, AlertCircle } from "lucide-react";
import { logger, logError, logWarn } from '@/lib/logger';

interface Prayer {
  id: string;
  name: string;
  request: string;
  category: string;
  prayerCount: number;
  submittedAt: string;
  isAnonymous: boolean;
  _count?: {
    interactions: number;
  };
}

interface FormData {
  name: string;
  request: string;
  category: string;
  isAnonymous: boolean;
  isPublic: boolean;
}

export default function PrayerWall() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    request: "",
    category: "other",
    isAnonymous: false,
    isPublic: true,
  });

  // Fetch prayer requests
  const fetchPrayers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/v2/prayer-requests");

      if (!response.ok) {
        throw new Error("Failed to load prayer requests");
      }

      const data = await response.json();
      setPrayers(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load prayers");
      logError("Error fetching prayers:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load prayers on mount
  useEffect(() => {
    fetchPrayers();
  }, []);

  // Format relative time
  const formatRelativeTime = (date: string) => {
    const now = new Date();
    const submitted = new Date(date);
    const diffMs = now.getTime() - submitted.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/v2/prayer-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.isAnonymous ? "Anonymous" : formData.name || "Anonymous",
          request: formData.request,
          category: formData.category,
          isAnonymous: formData.isAnonymous,
          isPublic: formData.isPublic,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit prayer request");
      }

      const result = await response.json();
      setSuccessMessage(result.message || "Prayer request submitted successfully!");

      // Reset form
      setFormData({
        name: "",
        request: "",
        category: "other",
        isAnonymous: false,
        isPublic: true,
      });

      // Refresh prayer list after a delay
      setTimeout(() => {
        fetchPrayers();
        setSuccessMessage(null);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit prayer request");
      logError("Error submitting prayer:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Community Prayer Wall
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Share your prayer requests and lift up others in prayer
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Error Display */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
              <AlertCircle className="mr-2" size={20} />
              {error}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              {successMessage}
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-primary-600" size={40} />
            </div>
          ) : (
            <div className="grid gap-6 mb-8">
              {prayers.length === 0 ? (
                <div className="text-center py-12 text-secondary-500">
                  No prayer requests yet. Be the first to share!
                </div>
              ) : (
                prayers.map((prayer, index) => (
                  <motion.div
                    key={prayer.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-secondary-900">
                          {prayer.name}
                        </h3>
                        <p className="text-sm text-secondary-500">
                          {formatRelativeTime(prayer.submittedAt)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 text-primary-600">
                        <Heart size={20} />
                        <span className="text-sm font-semibold">
                          {prayer.prayerCount}
                        </span>
                      </div>
                    </div>
                    <p className="text-secondary-700 mb-3">{prayer.request}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-secondary-500 bg-secondary-100 px-2 py-1 rounded">
                        {prayer.category}
                      </span>
                      <button className="flex items-center text-primary-600 hover:text-primary-700 text-sm font-semibold">
                        <MessageCircle size={16} className="mr-1" />
                        Pray for this request
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {/* Submit Form */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">
              Submit a Prayer Request
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-secondary-700 mb-1"
                >
                  Your Name {formData.isAnonymous ? "(Hidden)" : "(optional)"}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={formData.isAnonymous}
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="Anonymous"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm text-secondary-700">
                  <input
                    type="checkbox"
                    checked={formData.isAnonymous}
                    onChange={(e) =>
                      setFormData({ ...formData, isAnonymous: e.target.checked })
                    }
                    className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span>Submit anonymously</span>
                </label>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-secondary-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="healing">Healing</option>
                  <option value="guidance">Guidance</option>
                  <option value="thanksgiving">Thanksgiving</option>
                  <option value="salvation">Salvation</option>
                  <option value="provision">Provision</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="request"
                  className="block text-sm font-medium text-secondary-700 mb-1"
                >
                  Prayer Request *
                </label>
                <textarea
                  id="request"
                  rows={4}
                  value={formData.request}
                  onChange={(e) =>
                    setFormData({ ...formData, request: e.target.value })
                  }
                  required
                  maxLength={500}
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Share your prayer request with our community..."
                ></textarea>
                <p className="text-xs text-secondary-500 mt-1">
                  {formData.request.length}/500 characters
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting || !formData.request.trim()}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Submitting...
                  </>
                ) : (
                  "Submit Prayer Request"
                )}
              </button>
              <p className="text-xs text-secondary-500 text-center">
                Requests are reviewed before appearing on the prayer wall
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
