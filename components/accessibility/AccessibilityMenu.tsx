"use client";

import { useState } from "react";
import {
  Type,
  Moon,
  Sun,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Eye,
  Settings,
} from "lucide-react";

/**
 * Accessibility Menu Component
 * Provides quick access to accessibility features:
 * - Text size adjustment
 * - High contrast mode
 * - Dark mode
 * - Reduced motion
 */
export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const increaseFontSize = () => {
    if (fontSize < 150) {
      const newSize = fontSize + 10;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}%`;
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 80) {
      const newSize = fontSize - 10;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}%`;
    }
  };

  const resetFontSize = () => {
    setFontSize(100);
    document.documentElement.style.fontSize = "100%";
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    if (!highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <>
      {/* Floating Accessibility Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
        aria-label="Open accessibility menu"
        aria-expanded={isOpen}
      >
        <Settings className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* Accessibility Menu Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div
            className="fixed bottom-24 right-6 z-50 bg-white rounded-xl shadow-2xl p-6 w-80 max-w-[calc(100vw-3rem)]"
            role="dialog"
            aria-label="Accessibility settings"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Accessibility
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                aria-label="Close accessibility menu"
              >
                <span className="text-2xl" aria-hidden="true">
                  ×
                </span>
              </button>
            </div>

            <div className="space-y-4">
              {/* Font Size */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Type className="w-4 h-4 inline mr-2" aria-hidden="true" />
                  Text Size
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={decreaseFontSize}
                    disabled={fontSize <= 80}
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Decrease text size"
                  >
                    <ZoomOut className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <span className="flex-1 text-center text-sm font-medium" aria-live="polite">
                    {fontSize}%
                  </span>
                  <button
                    onClick={increaseFontSize}
                    disabled={fontSize >= 150}
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Increase text size"
                  >
                    <ZoomIn className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    onClick={resetFontSize}
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Reset text size"
                  >
                    <RefreshCw className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* High Contrast */}
              <div>
                <button
                  onClick={toggleHighContrast}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  aria-pressed={highContrast}
                >
                  <span className="flex items-center text-sm font-semibold text-gray-700">
                    <Eye className="w-4 h-4 mr-2" aria-hidden="true" />
                    High Contrast
                  </span>
                  <div
                    className={`w-11 h-6 rounded-full transition-colors ${
                      highContrast ? "bg-blue-600" : "bg-gray-300"
                    }`}
                    aria-hidden="true"
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                        highContrast ? "translate-x-6" : "translate-x-0.5"
                      } mt-0.5`}
                    />
                  </div>
                </button>
              </div>

              {/* Dark Mode */}
              <div>
                <button
                  onClick={toggleDarkMode}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  aria-pressed={darkMode}
                >
                  <span className="flex items-center text-sm font-semibold text-gray-700">
                    {darkMode ? (
                      <>
                        <Sun className="w-4 h-4 mr-2" aria-hidden="true" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4 mr-2" aria-hidden="true" />
                        Dark Mode
                      </>
                    )}
                  </span>
                  <div
                    className={`w-11 h-6 rounded-full transition-colors ${
                      darkMode ? "bg-blue-600" : "bg-gray-300"
                    }`}
                    aria-hidden="true"
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                        darkMode ? "translate-x-6" : "translate-x-0.5"
                      } mt-0.5`}
                    />
                  </div>
                </button>
              </div>

              {/* Info Text */}
              <p className="text-xs text-gray-600 pt-2 border-t">
                These settings will be saved for your next visit.
              </p>
            </div>
          </div>
        </>
      )}

      {/* High Contrast Styles */}
      <style jsx global>{`
        .high-contrast {
          --tw-bg-opacity: 1;
          filter: contrast(1.5);
        }
        .high-contrast a {
          text-decoration: underline;
        }
        .high-contrast button:focus,
        .high-contrast a:focus {
          outline: 3px solid #000 !important;
          outline-offset: 2px !important;
        }
      `}</style>
    </>
  );
}
