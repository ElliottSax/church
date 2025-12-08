"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Users, Hand, Heart, BookOpen } from "lucide-react";

const opportunities = [
  {
    icon: Users,
    title: "Join a Small Group",
    description: "Connect with others through weekly fellowship and study groups.",
    link: "/connect/groups",
  },
  {
    icon: Hand,
    title: "Volunteer",
    description: "Use your gifts to serve our community and make a difference.",
    link: "/give/volunteer",
  },
  {
    icon: Heart,
    title: "Give",
    description: "Support our mission and ministry through generous giving.",
    link: "/give/online",
  },
  {
    icon: BookOpen,
    title: "Learn & Grow",
    description: "Deepen your faith through Bible studies and spiritual formation.",
    link: "/grow",
  },
];

export default function GetInvolved() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Involved
          </h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            There are many ways to connect, grow, and serve in our community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {opportunities.map((opportunity, index) => (
            <motion.div
              key={opportunity.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={opportunity.link}
                className="block bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all border border-white/20 h-full"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4">
                  <opportunity.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{opportunity.title}</h3>
                <p className="text-primary-100">{opportunity.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20"
        >
          <h3 className="text-2xl font-bold mb-4 text-center">
            Stay Connected
          </h3>
          <p className="text-primary-100 text-center mb-6">
            Subscribe to our newsletter for updates, events, and inspiration
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-secondary-900 focus:ring-2 focus:ring-white focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-primary-700 rounded-lg font-semibold hover:bg-primary-50 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
