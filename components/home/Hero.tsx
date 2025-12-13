"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10"></div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            A Welcoming, Loving Faith Community
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 text-balance">
            We proclaim Jesus Christ and promote communities of joy, hope, love, and peace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/about/location"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-700 rounded-lg font-semibold hover:bg-primary-50 transition-colors shadow-lg"
            >
              Visit Us
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              href="/grow/worship"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors border-2 border-white shadow-lg"
            >
              Watch Live
            </Link>
          </div>
        </motion.div>

        {/* Service Times */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
            <h3 className="font-semibold text-lg mb-2">Sunday Worship</h3>
            <p className="text-primary-100">10:30 AM</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
            <h3 className="font-semibold text-lg mb-2">Bible Study</h3>
            <p className="text-primary-100">Friday 7:00 PM</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
            <h3 className="font-semibold text-lg mb-2">Prayer Group</h3>
            <p className="text-primary-100">Thursday 6:30 PM</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
