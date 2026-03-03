"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"></div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Church Seal - now as the main heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex justify-center"
          >
            <Image
              src="/295734f9-903b-46b0-af54-0e2d78ff5511.png"
              alt="Minneapolis Community of Christ"
              width={180}
              height={180}
              className="rounded-full shadow-2xl"
              priority
            />
          </motion.div>

          {/* Mission statement */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl md:text-3xl text-gray-200 mb-8 max-w-3xl mx-auto font-semibold"
          >
            We proclaim Jesus Christ and promote communities of joy, hope, love, and peace.
          </motion.p>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-300 font-medium"
          >
            A welcoming home church community in Minneapolis
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom accent */}
      <div className="relative z-10 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
    </section>
  );
}
