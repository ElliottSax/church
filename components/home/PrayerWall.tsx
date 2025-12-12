"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";

interface Prayer {
  id: number;
  author: string;
  request: string;
  date: string;
  prayers: number;
}

const samplePrayers: Prayer[] = [
  {
    id: 1,
    author: "Sarah M.",
    request: "Please pray for my family as we navigate a difficult health diagnosis.",
    date: "2 hours ago",
    prayers: 12,
  },
  {
    id: 2,
    author: "John D.",
    request: "Praying for guidance in my career transition and God&apos;s direction.",
    date: "5 hours ago",
    prayers: 8,
  },
  {
    id: 3,
    author: "Maria L.",
    request: "Grateful for this community. Prayers for those affected by recent storms.",
    date: "1 day ago",
    prayers: 24,
  },
];

export default function PrayerWall() {
  const [prayers] = useState<Prayer[]>(samplePrayers);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Community Prayer Wall
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Share your prayer requests and lift up others in prayer
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 mb-8">
            {prayers.map((prayer, index) => (
              <motion.div
                key={prayer.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-secondary-900">
                      {prayer.author}
                    </h3>
                    <p className="text-sm text-secondary-500">{prayer.date}</p>
                  </div>
                  <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
                    <Heart size={20} />
                    <span className="text-sm font-semibold">{prayer.prayers}</span>
                  </button>
                </div>
                <p className="text-secondary-700 mb-3">{prayer.request}</p>
                <button className="flex items-center text-primary-600 hover:text-primary-700 text-sm font-semibold">
                  <MessageCircle size={16} className="mr-1" />
                  Pray for this request
                </button>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">
              Submit a Prayer Request
            </h3>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-secondary-700 mb-1"
                >
                  Your Name (optional)
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Anonymous"
                />
              </div>
              <div>
                <label
                  htmlFor="request"
                  className="block text-sm font-medium text-secondary-700 mb-1"
                >
                  Prayer Request
                </label>
                <textarea
                  id="request"
                  rows={4}
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Share your prayer request with our community..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Submit Prayer Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
