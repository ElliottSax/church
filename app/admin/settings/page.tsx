'use client';

/**
 * Admin Settings Management Page
 *
 * Provides a comprehensive interface for managing church website settings
 * organized into logical sections with user-friendly controls
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { logger, logError, logWarn } from '@/lib/logger';

// Types
interface Settings {
  siteInfo: {
    siteName: string;
    tagline: string;
    email: string;
    phone: string;
    address: string;
    timezone: string;
  };
  features: {
    enableEvents: boolean;
    enablePrayerWall: boolean;
    enableDonations: boolean;
    enableLiveStream: boolean;
    enableSermons: boolean;
    enableBlog: boolean;
    enableNewsletter: boolean;
  };
  events: {
    requireApproval: boolean;
    maxAttendees: number;
    allowWaitlist: boolean;
    sendReminders: boolean;
    reminderHours: number;
  };
  prayerWall: {
    requireModeration: boolean;
    allowAnonymous: boolean;
    maxRequestLength: number;
    autoExpireDays: number;
  };
  donations: {
    defaultAmounts: number[];
    enableRecurring: boolean;
    taxDeductible: boolean;
    minimumAmount: number;
  };
  notifications: {
    emailNotifications: boolean;
    adminEmail: string;
    notifyNewEvents: boolean;
    notifyNewPrayers: boolean;
    notifyNewDonations: boolean;
  };
}

type SettingSection = keyof Settings;

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<SettingSection>('siteInfo');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Fetch settings on mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/v2/admin/settings');

      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }

      const data = await response.json();
      setSettings(data.data);
    } catch (error) {
      logError('Error fetching settings:', error);
      setMessage({ type: 'error', text: 'Failed to load settings' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;

    try {
      setSaving(true);
      setMessage(null);

      const response = await fetch('/api/v2/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: activeSection,
          settings: settings[activeSection],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      setMessage({ type: 'success', text: 'Settings saved successfully!' });
      setHasChanges(false);

      // Clear success message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      logError('Error saving settings:', error);
      setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (section: SettingSection, key: string, value: any) => {
    if (!settings) return;

    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [key]: value,
      },
    });
    setHasChanges(true);
  };

  const sections = [
    { id: 'siteInfo', name: 'Site Information', icon: '🏛️' },
    { id: 'features', name: 'Features', icon: '⚡' },
    { id: 'events', name: 'Events', icon: '📅' },
    { id: 'prayerWall', name: 'Prayer Wall', icon: '🙏' },
    { id: 'donations', name: 'Donations', icon: '💰' },
    { id: 'notifications', name: 'Notifications', icon: '📧' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow">
          <p className="text-red-600">Failed to load settings</p>
          <button
            onClick={fetchSettings}
            className="mt-4 bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your church website configuration and preferences
          </p>
        </div>

        {/* Message Banner */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-6 p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}
            >
              <div className="flex items-center">
                <span className="text-xl mr-3">
                  {message.type === 'success' ? '✓' : '⚠️'}
                </span>
                <span>{message.text}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow p-4 space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as SettingSection)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition ${
                    activeSection === section.id
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl mr-3">{section.icon}</span>
                  <span>{section.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {sections.find(s => s.id === activeSection)?.name}
                </h2>
              </div>

              <div className="p-6">
                {/* Site Info Section */}
                {activeSection === 'siteInfo' && (
                  <div className="space-y-6">
                    <InputField
                      label="Site Name"
                      value={settings.siteInfo.siteName}
                      onChange={(value) => updateSetting('siteInfo', 'siteName', value)}
                      helpText="The name of your church"
                      required
                    />
                    <InputField
                      label="Tagline"
                      value={settings.siteInfo.tagline}
                      onChange={(value) => updateSetting('siteInfo', 'tagline', value)}
                      helpText="A short description or motto"
                    />
                    <InputField
                      label="Email"
                      type="email"
                      value={settings.siteInfo.email}
                      onChange={(value) => updateSetting('siteInfo', 'email', value)}
                      helpText="Primary contact email"
                      required
                    />
                    <InputField
                      label="Phone"
                      type="tel"
                      value={settings.siteInfo.phone}
                      onChange={(value) => updateSetting('siteInfo', 'phone', value)}
                      helpText="Phone number with area code"
                    />
                    <TextAreaField
                      label="Address"
                      value={settings.siteInfo.address}
                      onChange={(value) => updateSetting('siteInfo', 'address', value)}
                      helpText="Full physical address"
                      rows={3}
                    />
                    <SelectField
                      label="Timezone"
                      value={settings.siteInfo.timezone}
                      onChange={(value) => updateSetting('siteInfo', 'timezone', value)}
                      options={[
                        { value: 'America/New_York', label: 'Eastern Time' },
                        { value: 'America/Chicago', label: 'Central Time' },
                        { value: 'America/Denver', label: 'Mountain Time' },
                        { value: 'America/Los_Angeles', label: 'Pacific Time' },
                        { value: 'America/Anchorage', label: 'Alaska Time' },
                        { value: 'Pacific/Honolulu', label: 'Hawaii Time' },
                      ]}
                      helpText="Used for event scheduling and reminders"
                    />
                  </div>
                )}

                {/* Features Section */}
                {activeSection === 'features' && (
                  <div className="space-y-6">
                    <ToggleField
                      label="Events Calendar"
                      checked={settings.features.enableEvents}
                      onChange={(checked) => updateSetting('features', 'enableEvents', checked)}
                      helpText="Enable the events calendar and RSVP system"
                    />
                    <ToggleField
                      label="Prayer Wall"
                      checked={settings.features.enablePrayerWall}
                      onChange={(checked) => updateSetting('features', 'enablePrayerWall', checked)}
                      helpText="Allow visitors to submit and view prayer requests"
                    />
                    <ToggleField
                      label="Online Donations"
                      checked={settings.features.enableDonations}
                      onChange={(checked) => updateSetting('features', 'enableDonations', checked)}
                      helpText="Enable the giving/donations page"
                    />
                    <ToggleField
                      label="Live Stream"
                      checked={settings.features.enableLiveStream}
                      onChange={(checked) => updateSetting('features', 'enableLiveStream', checked)}
                      helpText="Show live stream player on homepage"
                    />
                    <ToggleField
                      label="Sermon Library"
                      checked={settings.features.enableSermons}
                      onChange={(checked) => updateSetting('features', 'enableSermons', checked)}
                      helpText="Enable the sermon archive and audio player"
                    />
                    <ToggleField
                      label="Blog"
                      checked={settings.features.enableBlog}
                      onChange={(checked) => updateSetting('features', 'enableBlog', checked)}
                      helpText="Enable blog posts and news articles"
                    />
                    <ToggleField
                      label="Newsletter Signup"
                      checked={settings.features.enableNewsletter}
                      onChange={(checked) => updateSetting('features', 'enableNewsletter', checked)}
                      helpText="Show newsletter subscription forms"
                    />
                  </div>
                )}

                {/* Events Section */}
                {activeSection === 'events' && (
                  <div className="space-y-6">
                    <ToggleField
                      label="Require Admin Approval"
                      checked={settings.events.requireApproval}
                      onChange={(checked) => updateSetting('events', 'requireApproval', checked)}
                      helpText="New events must be approved before appearing"
                    />
                    <InputField
                      label="Max Attendees (Default)"
                      type="number"
                      value={String(settings.events.maxAttendees)}
                      onChange={(value) => updateSetting('events', 'maxAttendees', parseInt(value) || 0)}
                      helpText="Default maximum capacity for new events"
                      min={0}
                    />
                    <ToggleField
                      label="Allow Waitlist"
                      checked={settings.events.allowWaitlist}
                      onChange={(checked) => updateSetting('events', 'allowWaitlist', checked)}
                      helpText="Enable waitlist when events are full"
                    />
                    <ToggleField
                      label="Send Reminders"
                      checked={settings.events.sendReminders}
                      onChange={(checked) => updateSetting('events', 'sendReminders', checked)}
                      helpText="Automatically email reminders to attendees"
                    />
                    <InputField
                      label="Reminder Time (Hours Before)"
                      type="number"
                      value={String(settings.events.reminderHours)}
                      onChange={(value) => updateSetting('events', 'reminderHours', parseInt(value) || 24)}
                      helpText="How many hours before event to send reminder"
                      min={1}
                      max={168}
                      disabled={!settings.events.sendReminders}
                    />
                  </div>
                )}

                {/* Prayer Wall Section */}
                {activeSection === 'prayerWall' && (
                  <div className="space-y-6">
                    <ToggleField
                      label="Require Moderation"
                      checked={settings.prayerWall.requireModeration}
                      onChange={(checked) => updateSetting('prayerWall', 'requireModeration', checked)}
                      helpText="Prayer requests must be approved before showing"
                    />
                    <ToggleField
                      label="Allow Anonymous Posts"
                      checked={settings.prayerWall.allowAnonymous}
                      onChange={(checked) => updateSetting('prayerWall', 'allowAnonymous', checked)}
                      helpText="Users can submit prayers without providing a name"
                    />
                    <InputField
                      label="Max Request Length"
                      type="number"
                      value={String(settings.prayerWall.maxRequestLength)}
                      onChange={(value) => updateSetting('prayerWall', 'maxRequestLength', parseInt(value) || 500)}
                      helpText="Maximum characters allowed per request"
                      min={50}
                      max={2000}
                    />
                    <InputField
                      label="Auto-Archive After (Days)"
                      type="number"
                      value={String(settings.prayerWall.autoExpireDays)}
                      onChange={(value) => updateSetting('prayerWall', 'autoExpireDays', parseInt(value) || 30)}
                      helpText="Automatically archive old requests (0 = never)"
                      min={0}
                      max={365}
                    />
                  </div>
                )}

                {/* Donations Section */}
                {activeSection === 'donations' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Donation Amounts
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {settings.donations.defaultAmounts.map((amount, index) => (
                          <div key={index} className="flex items-center bg-gray-100 rounded px-3 py-2">
                            <span className="font-medium">${amount}</span>
                            <button
                              onClick={() => {
                                const newAmounts = settings.donations.defaultAmounts.filter((_, i) => i !== index);
                                updateSetting('donations', 'defaultAmounts', newAmounts);
                              }}
                              className="ml-2 text-red-600 hover:text-red-800"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">Quick select amounts for donors</p>
                    </div>
                    <InputField
                      label="Minimum Amount"
                      type="number"
                      value={String(settings.donations.minimumAmount)}
                      onChange={(value) => updateSetting('donations', 'minimumAmount', parseInt(value) || 1)}
                      helpText="Minimum donation allowed"
                      min={1}
                    />
                    <ToggleField
                      label="Enable Recurring Donations"
                      checked={settings.donations.enableRecurring}
                      onChange={(checked) => updateSetting('donations', 'enableRecurring', checked)}
                      helpText="Allow monthly/yearly recurring donations"
                    />
                    <ToggleField
                      label="Tax Deductible"
                      checked={settings.donations.taxDeductible}
                      onChange={(checked) => updateSetting('donations', 'taxDeductible', checked)}
                      helpText="Donations are tax-deductible (for 501(c)(3) organizations)"
                    />
                  </div>
                )}

                {/* Notifications Section */}
                {activeSection === 'notifications' && (
                  <div className="space-y-6">
                    <ToggleField
                      label="Enable Email Notifications"
                      checked={settings.notifications.emailNotifications}
                      onChange={(checked) => updateSetting('notifications', 'emailNotifications', checked)}
                      helpText="Send email notifications to administrators"
                    />
                    <InputField
                      label="Admin Email"
                      type="email"
                      value={settings.notifications.adminEmail}
                      onChange={(value) => updateSetting('notifications', 'adminEmail', value)}
                      helpText="Email address to receive notifications"
                      required
                      disabled={!settings.notifications.emailNotifications}
                    />
                    <ToggleField
                      label="New Event Notifications"
                      checked={settings.notifications.notifyNewEvents}
                      onChange={(checked) => updateSetting('notifications', 'notifyNewEvents', checked)}
                      helpText="Get notified when new events are created"
                      disabled={!settings.notifications.emailNotifications}
                    />
                    <ToggleField
                      label="New Prayer Request Notifications"
                      checked={settings.notifications.notifyNewPrayers}
                      onChange={(checked) => updateSetting('notifications', 'notifyNewPrayers', checked)}
                      helpText="Get notified of new prayer requests"
                      disabled={!settings.notifications.emailNotifications}
                    />
                    <ToggleField
                      label="Donation Notifications"
                      checked={settings.notifications.notifyNewDonations}
                      onChange={(checked) => updateSetting('notifications', 'notifyNewDonations', checked)}
                      helpText="Get notified when donations are received"
                      disabled={!settings.notifications.emailNotifications}
                    />
                  </div>
                )}
              </div>

              {/* Save Button */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <div>
                  {hasChanges && (
                    <span className="text-sm text-amber-600">
                      You have unsaved changes
                    </span>
                  )}
                </div>
                <button
                  onClick={handleSave}
                  disabled={saving || !hasChanges}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {saving ? (
                    <span className="flex items-center">
                      <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                      Saving...
                    </span>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Form Components

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'tel' | 'number';
  helpText?: string;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
}

function InputField({
  label,
  value,
  onChange,
  type = 'text',
  helpText,
  required,
  disabled,
  min,
  max,
}: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        min={min}
        max={max}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
      {helpText && <p className="mt-1 text-xs text-gray-500">{helpText}</p>}
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helpText?: string;
  required?: boolean;
  rows?: number;
}

function TextAreaField({
  label,
  value,
  onChange,
  helpText,
  required,
  rows = 3,
}: TextAreaFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      />
      {helpText && <p className="mt-1 text-xs text-gray-500">{helpText}</p>}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  helpText?: string;
  required?: boolean;
}

function SelectField({
  label,
  value,
  onChange,
  options,
  helpText,
  required,
}: SelectFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helpText && <p className="mt-1 text-xs text-gray-500">{helpText}</p>}
    </div>
  );
}

interface ToggleFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  helpText?: string;
  disabled?: boolean;
}

function ToggleField({
  label,
  checked,
  onChange,
  helpText,
  disabled,
}: ToggleFieldProps) {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-6">
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => onChange(!checked)}
          className={`
            relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
            transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            ${checked ? 'bg-primary-600' : 'bg-gray-200'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <span
            className={`
              pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
              transition duration-200 ease-in-out
              ${checked ? 'translate-x-5' : 'translate-x-0'}
            `}
          />
        </button>
      </div>
      <div className="ml-3">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
      </div>
    </div>
  );
}
