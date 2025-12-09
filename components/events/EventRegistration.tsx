"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  Mail,
  Phone,
  Baby,
  Utensils,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  XCircle,
  Loader2,
} from "lucide-react";

interface EventDetails {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  capacity: number;
  currentAttendees: number;
  image?: string;
  childcareAvailable?: boolean;
  mealProvided?: boolean;
}

interface EventRegistrationProps {
  event: EventDetails;
  onClose?: () => void;
  embedded?: boolean;
}

export default function EventRegistration({
  event,
  onClose,
  embedded = false,
}: EventRegistrationProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfAttendees: 1,
    specialRequests: "",
    dietaryRestrictions: "",
    childcare: false,
    childrenAges: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | "waitlist" | null;
    message: string;
    confirmationCode?: string;
  }>({ type: null, message: "" });

  const spotsAvailable = event.capacity - event.currentAttendees;
  const isNearCapacity = spotsAvailable < 10;
  const isFull = spotsAvailable <= 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          ...formData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: data.registration.status === "waitlist" ? "waitlist" : "success",
          message: data.message,
          confirmationCode: data.registration.confirmationCode,
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          numberOfAttendees: 1,
          specialRequests: "",
          dietaryRestrictions: "",
          childcare: false,
          childrenAges: "",
        });

        // Auto-close after success (if not embedded)
        if (!embedded && onClose) {
          setTimeout(onClose, 5000);
        }
      } else {
        setStatus({
          type: "error",
          message: data.error || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const RegistrationForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <User size={16} className="inline mr-1" />
          Full Name *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => updateFormData("name", e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="John Doe"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Mail size={16} className="inline mr-1" />
          Email Address *
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => updateFormData("email", e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="john@example.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Phone size={16} className="inline mr-1" />
          Phone Number
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => updateFormData("phone", e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="(555) 123-4567"
        />
      </div>

      {/* Number of Attendees */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Users size={16} className="inline mr-1" />
          Number of Attendees *
        </label>
        <select
          required
          value={formData.numberOfAttendees}
          onChange={(e) => updateFormData("numberOfAttendees", parseInt(e.target.value))}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
            <option key={num} value={num} disabled={!isFull && num > spotsAvailable}>
              {num} {num === 1 ? "person" : "people"}
              {!isFull && num > spotsAvailable && " (not enough spots)"}
            </option>
          ))}
        </select>
        {isNearCapacity && !isFull && (
          <p className="text-sm text-yellow-600 mt-1">
            Only {spotsAvailable} spots remaining!
          </p>
        )}
      </div>

      {/* Childcare */}
      {event.childcareAvailable && (
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.childcare}
              onChange={(e) => updateFormData("childcare", e.target.checked)}
              className="mr-2 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <Baby size={16} className="mr-1" />
            <span className="text-sm font-medium text-gray-700">
              I need childcare
            </span>
          </label>
          {formData.childcare && (
            <div className="mt-2">
              <input
                type="text"
                value={formData.childrenAges}
                onChange={(e) => updateFormData("childrenAges", e.target.value)}
                placeholder="Ages of children (e.g., 3, 5, 8)"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          )}
        </div>
      )}

      {/* Dietary Restrictions */}
      {event.mealProvided && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Utensils size={16} className="inline mr-1" />
            Dietary Restrictions
          </label>
          <input
            type="text"
            value={formData.dietaryRestrictions}
            onChange={(e) => updateFormData("dietaryRestrictions", e.target.value)}
            placeholder="Vegetarian, gluten-free, allergies, etc."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      )}

      {/* Special Requests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MessageSquare size={16} className="inline mr-1" />
          Special Requests or Comments
        </label>
        <textarea
          rows={3}
          value={formData.specialRequests}
          onChange={(e) => updateFormData("specialRequests", e.target.value)}
          placeholder="Any special accommodations or questions..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Submit Button */}
      <div className="flex gap-3">
        {!embedded && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 py-3 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {submitting ? (
            <>
              <Loader2 size={20} className="animate-spin mr-2" />
              Registering...
            </>
          ) : isFull ? (
            "Join Waitlist"
          ) : (
            "Complete Registration"
          )}
        </button>
      </div>
    </form>
  );

  const SuccessMessage = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <div className="mb-4">
        {status.type === "waitlist" ? (
          <AlertCircle size={64} className="mx-auto text-yellow-500" />
        ) : (
          <CheckCircle size={64} className="mx-auto text-green-500" />
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {status.type === "waitlist" ? "Added to Waitlist!" : "Registration Confirmed!"}
      </h3>
      <p className="text-gray-600 mb-4">{status.message}</p>
      {status.confirmationCode && (
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">Confirmation Code:</p>
          <p className="text-xl font-mono font-bold text-primary-600">
            {status.confirmationCode}
          </p>
        </div>
      )}
      <p className="text-sm text-gray-500">
        A confirmation email has been sent to your email address.
      </p>
      {!embedded && (
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Close
        </button>
      )}
    </motion.div>
  );

  const content = (
    <>
      {/* Event Details Header */}
      {!embedded && (
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-6 rounded-t-xl">
          <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
          <div className="space-y-2 text-primary-100">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              {event.date}
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              {event.time}
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="mr-2" />
              {event.location}
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-2" />
              {isFull
                ? "Event is full - Waitlist available"
                : `${spotsAvailable} of ${event.capacity} spots available`}
            </div>
          </div>
        </div>
      )}

      {/* Form or Status Message */}
      <div className={embedded ? "" : "p-6"}>
        {/* Status Messages */}
        {status.type === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg flex items-start"
          >
            <XCircle size={20} className="mr-2 mt-0.5" />
            <p>{status.message}</p>
          </motion.div>
        )}

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {status.type === "success" || status.type === "waitlist" ? (
            <SuccessMessage />
          ) : (
            <RegistrationForm />
          )}
        </AnimatePresence>
      </div>
    </>
  );

  if (embedded) {
    return <div className="bg-white rounded-xl shadow-lg overflow-hidden">{content}</div>;
  }

  // Modal version
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200 z-10"
        >
          <XCircle size={24} />
        </button>

        {content}
      </motion.div>
    </div>
  );
}