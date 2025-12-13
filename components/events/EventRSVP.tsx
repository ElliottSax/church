"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Mail,
  Phone,
  User,
  AlertCircle,
  Check,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Event, RSVP, eventCategories } from "@/lib/events";
import { format, isPast, addDays } from "date-fns";

interface EventRSVPProps {
  event: Event;
  initialCapacity?: {
    available: boolean;
    spotsLeft: number | null;
    waitlistAvailable: boolean;
  };
}

export default function EventRSVP({ event, initialCapacity }: EventRSVPProps) {
  const [showRSVPForm, setShowRSVPForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [capacity, setCapacity] = useState(initialCapacity);
  const [confirmation, setConfirmation] = useState<RSVP | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfGuests: 0,
    dietaryRestrictions: '',
    specialNeeds: '',
    notes: ''
  });

  // Check capacity periodically
  useEffect(() => {
    const checkCapacity = async () => {
      try {
        const response = await fetch(`/api/events/${event.id}/capacity`);
        if (response.ok) {
          const data = await response.json();
          setCapacity(data);
        }
      } catch (error) {
        console.error('Error checking capacity:', error);
      }
    };

    if (event.requiresRsvp && event.maxCapacity) {
      const interval = setInterval(checkCapacity, 30000); // Check every 30 seconds
      return () => clearInterval(interval);
    }
  }, [event.id, event.requiresRsvp, event.maxCapacity]);

  const handleSubmitRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/events/${event.id}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          eventId: event.id
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit RSVP');
      }

      const rsvpData = await response.json();
      setConfirmation(rsvpData);
      setShowRSVPForm(false);
      setShowConfirmation(true);

      // Update capacity
      if (capacity && capacity.spotsLeft !== null) {
        setCapacity({
          ...capacity,
          spotsLeft: Math.max(0, capacity.spotsLeft - (1 + formData.numberOfGuests))
        });
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        numberOfGuests: 0,
        dietaryRestrictions: '',
        specialNeeds: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setError(error instanceof Error ? error.message : 'Failed to submit RSVP');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCapacityDisplay = () => {
    if (!event.maxCapacity) return null;

    const percentage = (event.currentAttendees / event.maxCapacity) * 100;
    let color = 'bg-green-500';
    let textColor = 'text-green-600';

    if (percentage >= 90) {
      color = 'bg-red-500';
      textColor = 'text-red-600';
    } else if (percentage >= 70) {
      color = 'bg-yellow-500';
      textColor = 'text-yellow-600';
    }

    return (
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Capacity</span>
          <span className={`text-sm font-semibold ${textColor}`}>
            {event.currentAttendees} / {event.maxCapacity}
            {capacity && capacity.spotsLeft !== null && capacity.spotsLeft > 0 && (
              <span className="ml-2 text-gray-500">
                ({capacity.spotsLeft} spots left)
              </span>
            )}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${color}`}
            style={{ width: `${Math.min(100, percentage)}%` }}
          />
        </div>
        {capacity?.waitlistAvailable && (
          <p className="text-xs text-yellow-600 mt-2 flex items-center">
            <AlertCircle size={12} className="mr-1" />
            Event is full - you&apos;ll be added to the waitlist
          </p>
        )}
      </div>
    );
  };

  const isPastEvent = isPast(event.date);
  const isRSVPClosed = event.rsvpDeadline && isPast(event.rsvpDeadline);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Event Header */}
      <div className="relative h-64 bg-gradient-to-br from-primary-600 to-primary-800">
        {event.image && (
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-white/90 ${eventCategories[event.category].color}`}>
            {eventCategories[event.category].icon} {eventCategories[event.category].name}
          </span>
        </div>

        {/* Event Status */}
        {event.featured && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-400 text-yellow-900">
              Featured Event
            </span>
          </div>
        )}

        {/* Event Title */}
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-3xl font-bold text-white mb-2">{event.title}</h2>
        </div>
      </div>

      {/* Event Details */}
      <div className="p-6">
        {/* Date & Time */}
        <div className="flex items-center mb-4">
          <Calendar className="text-primary-600 mr-3" size={20} />
          <div>
            <p className="font-semibold text-gray-900">
              {format(event.date, 'EEEE, MMMM d, yyyy')}
            </p>
            <p className="text-sm text-gray-600">
              {format(event.date, 'h:mm a')}
              {event.endDate && ` - ${format(event.endDate, 'h:mm a')}`}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center mb-4">
          <MapPin className="text-primary-600 mr-3" size={20} />
          <p className="text-gray-700">{event.location}</p>
        </div>

        {/* Organizer */}
        <div className="flex items-center mb-4">
          <User className="text-primary-600 mr-3" size={20} />
          <div>
            <p className="text-gray-700">{event.organizer.name}</p>
            <p className="text-sm text-gray-500">{event.organizer.email}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">{event.description}</p>
        </div>

        {/* Tags */}
        {event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {event.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Capacity Display */}
        {event.requiresRsvp && getCapacityDisplay()}

        {/* RSVP Section */}
        {event.requiresRsvp && (
          <div className="mt-6 pt-6 border-t">
            {isPastEvent ? (
              <p className="text-gray-500 text-center">This event has already occurred</p>
            ) : isRSVPClosed ? (
              <p className="text-red-600 text-center">RSVP deadline has passed</p>
            ) : (
              <>
                {event.rsvpDeadline && (
                  <p className="text-sm text-gray-600 mb-4 text-center">
                    RSVP by {format(event.rsvpDeadline, 'MMMM d, h:mm a')}
                  </p>
                )}
                <button
                  onClick={() => setShowRSVPForm(true)}
                  disabled={capacity?.spotsLeft === 0 && !capacity?.waitlistAvailable}
                  className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {capacity?.spotsLeft === 0 && !capacity?.waitlistAvailable
                    ? 'Event Full'
                    : capacity?.waitlistAvailable
                    ? 'Join Waitlist'
                    : 'RSVP Now'}
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* RSVP Form Modal */}
      <AnimatePresence>
        {showRSVPForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowRSVPForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">RSVP for {event.title}</h3>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center">
                  <AlertCircle size={20} className="mr-2" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmitRSVP} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Guests
                  </label>
                  <select
                    value={formData.numberOfGuests}
                    onChange={(e) => setFormData({ ...formData, numberOfGuests: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {[0, 1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dietary Restrictions
                  </label>
                  <input
                    type="text"
                    value={formData.dietaryRestrictions}
                    onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                    placeholder="e.g., Vegetarian, Gluten-free"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Needs
                  </label>
                  <input
                    type="text"
                    value={formData.specialNeeds}
                    onChange={(e) => setFormData({ ...formData, specialNeeds: e.target.value })}
                    placeholder="e.g., Wheelchair access"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setShowRSVPForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : capacity?.waitlistAvailable ? 'Join Waitlist' : 'Submit RSVP'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && confirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="text-green-600" size={32} />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                RSVP {confirmation.status === 'confirmed' ? 'Confirmed!' : 'Waitlisted'}
              </h3>

              <p className="text-gray-600 mb-4">
                {confirmation.status === 'confirmed'
                  ? `Your spot for ${event.title} has been confirmed.`
                  : `You've been added to the waitlist for ${event.title}.`}
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-1">Confirmation Code</p>
                <p className="text-lg font-mono font-bold text-gray-900">
                  {confirmation.confirmationCode}
                </p>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                A confirmation email has been sent to {confirmation.email}
              </p>

              <button
                onClick={() => setShowConfirmation(false)}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}