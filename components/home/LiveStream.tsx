"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Calendar } from "lucide-react";
import Link from "next/link";

export default function LiveStream() {
  const [isLive] = useState(false); // This would be dynamic in production

  return (
    <section className="py-16 md:py-24 bg-secondary-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Join Us for Worship
            </h2>
            <p className="text-lg text-secondary-600">
              Experience our services live or watch past sermons at your convenience
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center relative">
              {isLive ? (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                  LIVE NOW
                </div>
              ) : (
                <div className="absolute top-4 left-4 bg-secondary-900/80 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                  <Calendar size={16} className="mr-2" />
                  Next Service: Sunday 10:30 AM
                </div>
              )}

              <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl">
                <Play className="text-primary-600 ml-1" size={40} />
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                {isLive ? "Live Worship Service" : "Previous Service"}
              </h3>
              <p className="text-secondary-600 mb-4">
                {isLive
                  ? "Join us right now for our live worship service"
                  : "Watch our most recent sermon: \"Walking in Faith and Hope\""}
              </p>
              <Link
                href="/grow/sermons"
                className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700"
              >
                View All Sermons
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
