"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Filter,
  Calendar,
  DollarSign,
  FileText,
  TrendingUp,
  Search,
  X,
  ChevronDown,
  Printer,
  Heart,
} from "lucide-react";
import { format, startOfYear, endOfYear, isWithinInterval, parseISO } from "date-fns";
import DonationChart from "@/components/donations/DonationChart";
import { logger, logError, logWarn } from '@/lib/logger';

interface Donation {
  id: string;
  amount: number;
  fund: string;
  frequency: string;
  createdAt: string;
  status: string;
  donorName?: string;
  donorEmail?: string;
  stripePaymentId?: string;
  notes?: string;
}

interface DonationStats {
  ytd: number;
  allTime: number;
  count: number;
  byFund: Record<string, number>;
}

const FUND_LABELS: Record<string, string> = {
  general: "General Fund",
  missions: "Missions",
  building: "Building Fund",
  youth: "Youth Ministry",
  benevolence: "Benevolence",
};

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  card: "Credit/Debit Card",
  bank_account: "Bank Transfer",
  cash: "Cash",
  check: "Check",
};

export default function DonationHistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFund, setSelectedFund] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin?callbackUrl=/members/donations");
    }
  }, [status, router]);

  // Fetch donations
  useEffect(() => {
    if (status === "authenticated") {
      fetchDonations();
    }
  }, [status]);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/v2/donations");

      if (!response.ok) {
        throw new Error("Failed to fetch donations");
      }

      const data = await response.json();
      setDonations(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      logError("Error fetching donations:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter donations
  const filteredDonations = useMemo(() => {
    return donations.filter((donation) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          donation.amount.toString().includes(query) ||
          FUND_LABELS[donation.fund]?.toLowerCase().includes(query) ||
          donation.notes?.toLowerCase().includes(query);

        if (!matchesSearch) return false;
      }

      // Fund filter
      if (selectedFund !== "all" && donation.fund !== selectedFund) {
        return false;
      }

      // Date range filter
      if (dateRange.start || dateRange.end) {
        const donationDate = parseISO(donation.createdAt);

        if (dateRange.start && dateRange.end) {
          const start = parseISO(dateRange.start);
          const end = parseISO(dateRange.end);
          if (!isWithinInterval(donationDate, { start, end })) {
            return false;
          }
        } else if (dateRange.start) {
          const start = parseISO(dateRange.start);
          if (donationDate < start) return false;
        } else if (dateRange.end) {
          const end = parseISO(dateRange.end);
          if (donationDate > end) return false;
        }
      }

      return true;
    });
  }, [donations, searchQuery, selectedFund, dateRange]);

  // Calculate statistics
  const stats: DonationStats = useMemo(() => {
    const now = new Date();
    const yearStart = startOfYear(now);
    const yearEnd = endOfYear(now);

    const ytdDonations = donations.filter((d) => {
      const date = parseISO(d.createdAt);
      return isWithinInterval(date, { start: yearStart, end: yearEnd });
    });

    const byFund: Record<string, number> = {};
    donations.forEach((d) => {
      byFund[d.fund] = (byFund[d.fund] || 0) + d.amount;
    });

    return {
      ytd: ytdDonations.reduce((sum, d) => sum + d.amount, 0),
      allTime: donations.reduce((sum, d) => sum + d.amount, 0),
      count: donations.length,
      byFund,
    };
  }, [donations]);

  // Handle receipt download
  const handleDownloadReceipt = async (donation: Donation) => {
    try {
      const response = await fetch(`/api/v2/donations/${donation.id}/receipt`);

      if (!response.ok) {
        throw new Error("Failed to generate receipt");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `receipt-${donation.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      logError("Error downloading receipt:", err);
      alert("Failed to download receipt. Please try again.");
    }
  };

  // Handle print receipt
  const handlePrintReceipt = (donation: Donation) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Donation Receipt - ${donation.id}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 40px auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
            }
            .header h1 {
              margin: 0;
              color: #333;
            }
            .details {
              margin: 20px 0;
            }
            .row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #ddd;
            }
            .label {
              font-weight: bold;
              color: #666;
            }
            .amount {
              font-size: 24px;
              font-weight: bold;
              color: #2563eb;
              margin: 20px 0;
              text-align: center;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 2px solid #333;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Minneapolis Community of Christ</h1>
            <p>Donation Receipt</p>
          </div>

          <div class="details">
            <div class="row">
              <span class="label">Receipt #:</span>
              <span>${donation.id}</span>
            </div>
            <div class="row">
              <span class="label">Date:</span>
              <span>${format(parseISO(donation.createdAt), "MMMM d, yyyy")}</span>
            </div>
            <div class="row">
              <span class="label">Donor:</span>
              <span>${donation.donorName || session?.user?.name || "Anonymous"}</span>
            </div>
            <div class="row">
              <span class="label">Fund:</span>
              <span>${FUND_LABELS[donation.fund]}</span>
            </div>
            <div class="row">
              <span class="label">Payment Method:</span>
              <span>${donation.stripePaymentId ? "Card" : "Other"}</span>
            </div>
            ${donation.notes ? `
            <div class="row">
              <span class="label">Notes:</span>
              <span>${donation.notes}</span>
            </div>
            ` : ""}
          </div>

          <div class="amount">
            Amount: $${donation.amount.toFixed(2)}
          </div>

          <div class="footer">
            <p>Thank you for your generous donation!</p>
            <p>Minneapolis Community of Christ is a tax-exempt organization under section 501(c)(3).</p>
            <p>This receipt serves as proof of your donation for tax purposes.</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedFund("all");
    setDateRange({ start: "", end: "" });
  };

  const hasActiveFilters = searchQuery || selectedFund !== "all" || dateRange.start || dateRange.end;

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Donation History</h1>
          </div>
          <p className="text-gray-600">
            Track your giving and download receipts for tax purposes
          </p>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 font-medium">Year to Date</span>
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              ${stats.ytd.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {new Date().getFullYear()} total
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 font-medium">All Time</span>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              ${stats.allTime.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {stats.count} donation{stats.count !== 1 ? "s" : ""}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 font-medium">Top Fund</span>
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {Object.entries(stats.byFund).length > 0
                ? FUND_LABELS[
                    Object.entries(stats.byFund).sort((a, b) => b[1] - a[1])[0][0]
                  ]
                : "N/A"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Most supported fund
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search donations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
                Clear
              </button>
            )}
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="grid md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
                  {/* Fund Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fund
                    </label>
                    <select
                      value={selectedFund}
                      onChange={(e) => setSelectedFund(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Funds</option>
                      {Object.entries(FUND_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date Range Start */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, start: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Date Range End */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, end: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 text-gray-600"
          >
            Showing {filteredDonations.length} of {donations.length} donations
          </motion.div>
        )}

        {/* Donations Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
        >
          {error ? (
            <div className="p-8 text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchDonations}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="p-12 text-center">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {hasActiveFilters ? "No donations found" : "No donations yet"}
              </h3>
              <p className="text-gray-600">
                {hasActiveFilters
                  ? "Try adjusting your filters"
                  : "Your donation history will appear here"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Fund
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Receipt
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <AnimatePresence>
                    {filteredDonations.map((donation, index) => (
                      <motion.tr
                        key={donation.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-900">
                              {format(parseISO(donation.createdAt), "MMM d, yyyy")}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-lg font-semibold text-green-600">
                            ${donation.amount.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {FUND_LABELS[donation.fund]}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">
                            {donation.stripePaymentId ? "Card" : "Other"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handlePrintReceipt(donation)}
                              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Print Receipt"
                            >
                              <Printer className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDownloadReceipt(donation)}
                              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Download PDF"
                            >
                              <Download className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Fund Breakdown */}
        {Object.entries(stats.byFund).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Giving by Fund
            </h2>
            <div className="space-y-4">
              {Object.entries(stats.byFund)
                .sort((a, b) => b[1] - a[1])
                .map(([fund, amount]) => {
                  const percentage = (amount / stats.allTime) * 100;
                  return (
                    <div key={fund}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-700">
                          {FUND_LABELS[fund]}
                        </span>
                        <span className="font-semibold text-gray-900">
                          ${amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {percentage.toFixed(1)}% of total
                      </p>
                    </div>
                  );
                })}
            </div>
          </motion.div>
        )}

        {/* Donation Chart - Optional visual representation over time */}
        {donations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <DonationChart donations={donations} months={12} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
