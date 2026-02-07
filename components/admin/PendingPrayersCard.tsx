"use client";

import { useState } from "react";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { logger, logError, logWarn } from '@/lib/logger';

interface PrayerRequest {
  id: string;
  name: string;
  request: string;
  category: string;
  submittedAt: string;
}

interface PendingPrayersCardProps {
  initialPrayers: PrayerRequest[];
}

export function PendingPrayersCard({ initialPrayers }: PendingPrayersCardProps) {
  const [prayers, setPrayers] = useState<PrayerRequest[]>(initialPrayers);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleApprove = async (prayerId: string) => {
    setLoading(prayerId);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`/api/v2/prayer-requests/${prayerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approved: true }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to approve prayer request");
      }

      // Remove from pending list
      setPrayers(prayers.filter((p) => p.id !== prayerId));
      setSuccessMessage("Prayer request approved successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to approve");
      logError("Error approving prayer:", err);
    } finally {
      setLoading(null);
    }
  };

  const handleDecline = async (prayerId: string) => {
    if (!confirm("Are you sure you want to decline this prayer request?")) {
      return;
    }

    setLoading(prayerId);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`/api/v2/prayer-requests/${prayerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approved: false }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to decline prayer request");
      }

      // Remove from pending list
      setPrayers(prayers.filter((p) => p.id !== prayerId));
      setSuccessMessage("Prayer request declined");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to decline");
      logError("Error declining prayer:", err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Pending Prayer Requests
        </h2>
      </div>
      <div className="p-6">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-md flex items-center">
            <CheckCircle className="mr-2" size={16} />
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md flex items-center">
            <XCircle className="mr-2" size={16} />
            {error}
          </div>
        )}

        {prayers.length > 0 ? (
          <ul className="space-y-4">
            {prayers.slice(0, 5).map((prayer) => (
              <li key={prayer.id} className="border-l-2 border-purple-500 pl-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{prayer.name}</p>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {prayer.request}
                    </p>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {prayer.category}
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleApprove(prayer.id)}
                    disabled={loading === prayer.id}
                    className="text-xs px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                  >
                    {loading === prayer.id ? (
                      <Loader2 className="animate-spin mr-1" size={12} />
                    ) : (
                      <CheckCircle className="mr-1" size={12} />
                    )}
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecline(prayer.id)}
                    disabled={loading === prayer.id}
                    className="text-xs px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                  >
                    {loading === prayer.id ? (
                      <Loader2 className="animate-spin mr-1" size={12} />
                    ) : (
                      <XCircle className="mr-1" size={12} />
                    )}
                    Decline
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No pending requests</p>
        )}
      </div>
    </div>
  );
}
