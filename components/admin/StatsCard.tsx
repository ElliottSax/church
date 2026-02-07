/**
 * Stats Card Component
 *
 * Displays a metric card for admin dashboard
 */

import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number; // Percentage change
  icon?: string;
  color?: 'blue' | 'green' | 'purple' | 'yellow' | 'red';
  footer?: string;
}

export function StatsCard({
  title,
  value,
  change,
  icon,
  color = 'blue',
  footer
}: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
  };

  const bgClass = colorClasses[color];
  const isPositiveChange = change !== undefined && change >= 0;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        {icon && (
          <div className={`${bgClass} rounded-full p-3 text-white text-2xl`}>
            {icon}
          </div>
        )}
      </div>

      {change !== undefined && (
        <div className="flex items-center text-sm">
          <span className={isPositiveChange ? 'text-green-600' : 'text-red-600'}>
            {isPositiveChange ? '↑' : '↓'} {Math.abs(change)}%
          </span>
          <span className="text-gray-600 ml-2">vs last period</span>
        </div>
      )}

      {footer && (
        <p className="text-sm text-gray-500 mt-2">{footer}</p>
      )}
    </div>
  );
}
