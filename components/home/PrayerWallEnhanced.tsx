"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, Filter, TrendingUp, Search, X, Users, Clock } from "lucide-react";
import { PrayerRequest, prayerEvents, prayerCategories } from "@/lib/prayer-wall";
import { format, formatDistanceToNow } from "date-fns";

interface PrayerWallEnhancedProps {
  initialRequests?: PrayerRequest[];
}

export default function PrayerWallEnhanced({ initialRequests = [] }: PrayerWallEnhancedProps) {
  const [requests, setRequests] = useState<PrayerRequest[]>(initialRequests);
  const [filteredRequests, setFilteredRequests] = useState<PrayerRequest[]>(initialRequests);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [prayedRequests, setPrayedRequests] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({ totalRequests: 0, totalPrayers: 0 });
  const [newRequestHighlight, setNewRequestHighlight] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    request: '',
    category: 'other' as PrayerRequest['category'],
    isAnonymous: false,
    isPublic: true
  });

  // Set up real-time event listeners
  useEffect(() => {
    // New request listener
    const handleNewRequest = (request: PrayerRequest) => {
      setRequests(prev => [request, ...prev]);
      setNewRequestHighlight(request.id);
      setTimeout(() => setNewRequestHighlight(null), 3000);
      updateStats();
    };

    // Prayer count update listener
    const handlePrayerCountUpdate = ({ requestId, newCount }: { requestId: string; newCount: number }) => {
      setRequests(prev =>
        prev.map(r => r.id === requestId ? { ...r, prayerCount: newCount } : r)
      );
      updateStats();
    };

    // Add event listeners
    prayerEvents.on('new-request', handleNewRequest);
    prayerEvents.on('prayer-count-update', handlePrayerCountUpdate);

    // Cleanup
    return () => {
      prayerEvents.off('new-request', handleNewRequest);
      prayerEvents.off('prayer-count-update', handlePrayerCountUpdate);
    };
  }, []);

  // Filter requests based on category and search
  useEffect(() => {
    let filtered = requests;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(r => r.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.request.toLowerCase().includes(query) ||
        r.name.toLowerCase().includes(query)
      );
    }

    setFilteredRequests(filtered);
  }, [requests, selectedCategory, searchQuery]);

  // Load initial data
  useEffect(() => {
    loadPrayerRequests();
    updateStats();
  }, []);

  const loadPrayerRequests = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/prayer-wall/requests');
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch (error) {
      console.error('Error loading prayer requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStats = async () => {
    try {
      const response = await fetch('/api/prayer-wall/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handlePray = async (requestId: string) => {
    if (prayedRequests.has(requestId)) return;

    // Optimistic UI update
    setPrayedRequests(prev => new Set([...Array.from(prev), requestId]));
    setRequests(prev =>
      prev.map(r => r.id === requestId ? { ...r, prayerCount: r.prayerCount + 1 } : r)
    );

    try {
      const response = await fetch(`/api/prayer-wall/pray/${requestId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'anonymous' }) // Would use actual user ID from session
      });

      if (!response.ok) {
        // Revert on error
        setPrayedRequests(prev => {
          const next = new Set(prev);
          next.delete(requestId);
          return next;
        });
        setRequests(prev =>
          prev.map(r => r.id === requestId ? { ...r, prayerCount: r.prayerCount - 1 } : r)
        );
      }
    } catch (error) {
      console.error('Error recording prayer:', error);
    }
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/prayer-wall/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          approved: false // Requires moderation
        })
      });

      if (response.ok) {
        setShowSubmitForm(false);
        setFormData({
          name: '',
          request: '',
          category: 'other',
          isAnonymous: false,
          isPublic: true
        });
        // Show success message
        alert('Your prayer request has been submitted and will be reviewed shortly.');
      }
    } catch (error) {
      console.error('Error submitting prayer request:', error);
      alert('Failed to submit prayer request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-secondary-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Community Prayer Wall
            </h2>
            <p className="text-lg text-secondary-600 mb-4">
              Join us in prayer. Submit requests and pray for one another.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 text-center mb-6">
              <div>
                <div className="text-2xl font-bold text-primary-600">{stats.totalRequests}</div>
                <div className="text-sm text-secondary-600">Active Requests</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-600">{stats.totalPrayers}</div>
                <div className="text-sm text-secondary-600">Prayers Offered</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-600">
                  <Users className="inline" size={24} />
                </div>
                <div className="text-sm text-secondary-600">Praying Together</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search prayer requests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <X size={20} className="text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {Object.entries(prayerCategories).map(([key, info]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === key
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-1">{info.icon}</span>
                    {info.name}
                  </button>
                ))}
              </div>

              {/* Submit Button */}
              <button
                onClick={() => setShowSubmitForm(true)}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Submit Request
              </button>
            </div>
          </div>

          {/* Prayer Requests Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredRequests.map((request) => (
                <motion.div
                  key={request.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    boxShadow: newRequestHighlight === request.id
                      ? '0 0 20px rgba(59, 130, 246, 0.5)'
                      : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${prayerCategories[request.category].bgColor} ${prayerCategories[request.category].color}`}>
                      {prayerCategories[request.category].icon} {prayerCategories[request.category].name}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {formatDistanceToNow(new Date(request.submittedAt), { addSuffix: true })}
                    </span>
                  </div>

                  {/* Request Content */}
                  <h3 className="font-semibold text-secondary-900 mb-2">
                    {request.isAnonymous ? 'Anonymous' : request.name}
                  </h3>
                  <p className="text-secondary-700 mb-4 line-clamp-3">
                    {request.request}
                  </p>

                  {/* Prayer Button */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handlePray(request.id)}
                      disabled={prayedRequests.has(request.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        prayedRequests.has(request.id)
                          ? 'bg-green-100 text-green-700 cursor-default'
                          : 'bg-primary-100 text-primary-700 hover:bg-primary-200 hover:scale-105'
                      }`}
                    >
                      <Heart
                        size={18}
                        className={prayedRequests.has(request.id) ? 'fill-current' : ''}
                      />
                      <span>
                        {prayedRequests.has(request.id) ? 'Prayed' : 'Pray'}
                      </span>
                    </button>

                    <span className="text-sm text-secondary-600">
                      {request.prayerCount} {request.prayerCount === 1 ? 'prayer' : 'prayers'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No results message */}
          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No prayer requests found.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Submit Prayer Request Modal */}
      <AnimatePresence>
        {showSubmitForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowSubmitForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-secondary-900 mb-4">Submit Prayer Request</h3>

              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required={!formData.isAnonymous}
                    disabled={formData.isAnonymous}
                    placeholder={formData.isAnonymous ? "Anonymous" : "Enter your name"}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prayer Request
                  </label>
                  <textarea
                    value={formData.request}
                    onChange={(e) => setFormData({ ...formData, request: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows={4}
                    required
                    placeholder="Share your prayer request..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as PrayerRequest['category'] })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {Object.entries(prayerCategories).map(([key, info]) => (
                      <option key={key} value={key}>
                        {info.icon} {info.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isAnonymous}
                      onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Submit anonymously</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isPublic}
                      onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Make public on prayer wall</span>
                  </label>
                </div>

                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowSubmitForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
                  >
                    {isLoading ? 'Submitting...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}