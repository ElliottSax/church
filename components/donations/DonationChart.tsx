"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { format, startOfMonth, eachMonthOfInterval, subMonths } from "date-fns";

interface Donation {
  id: string;
  amount: number;
  fund: string;
  createdAt: string;
}

interface DonationChartProps {
  donations: Donation[];
  months?: number;
}

export default function DonationChart({
  donations,
  months = 12
}: DonationChartProps) {
  const chartData = useMemo(() => {
    const now = new Date();
    const startDate = startOfMonth(subMonths(now, months - 1));
    const monthsArray = eachMonthOfInterval({
      start: startDate,
      end: now,
    });

    return monthsArray.map((month) => {
      const monthStart = startOfMonth(month);
      const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);

      const monthDonations = donations.filter((d) => {
        const donationDate = new Date(d.createdAt);
        return donationDate >= monthStart && donationDate <= monthEnd;
      });

      const total = monthDonations.reduce((sum, d) => sum + d.amount, 0);

      return {
        month: format(month, "MMM"),
        year: format(month, "yyyy"),
        total,
        count: monthDonations.length,
      };
    });
  }, [donations, months]);

  const maxAmount = Math.max(...chartData.map((d) => d.total), 1);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Donations Over Time
      </h2>

      <div className="space-y-4">
        {/* Bar Chart */}
        <div className="flex items-end justify-between gap-2 h-64">
          {chartData.map((data, index) => {
            const heightPercentage = (data.total / maxAmount) * 100;

            return (
              <div
                key={`${data.month}-${data.year}`}
                className="flex-1 flex flex-col items-center gap-2"
              >
                {/* Bar */}
                <div className="w-full flex flex-col justify-end h-full">
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: `${heightPercentage}%`,
                      opacity: 1
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05,
                      ease: "easeOut"
                    }}
                    className="w-full bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-lg relative group cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-colors"
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                        <div className="font-semibold">
                          ${data.total.toFixed(2)}
                        </div>
                        <div className="text-gray-300">
                          {data.count} donation{data.count !== 1 ? "s" : ""}
                        </div>
                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                          <div className="border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Label */}
                <div className="text-xs text-gray-600 text-center">
                  <div className="font-medium">{data.month}</div>
                  {index === 0 || data.month === "Jan" ? (
                    <div className="text-gray-400">{data.year}</div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
            <span className="text-sm text-gray-600">Monthly Donations</span>
          </div>
          <div className="text-sm text-gray-500">
            Last {months} months
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              ${chartData.reduce((sum, d) => sum + d.total, 0).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              $
              {(
                chartData.reduce((sum, d) => sum + d.total, 0) / months
              ).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Avg/Month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {Math.max(...chartData.map((d) => d.total)).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Peak Month</div>
          </div>
        </div>
      </div>
    </div>
  );
}
