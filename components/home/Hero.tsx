"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";

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
          {/* Church Seal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex justify-center"
          >
            <Image
              src="/295734f9-903b-46b0-af54-0e2d78ff5511.png"
              alt="Minneapolis Community of Christ"
              width={120}
              height={120}
              className="rounded-full shadow-2xl"
              priority
            />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Minneapolis<br />Community of Christ
          </motion.h1>

          {/* Mission statement */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
          >
            We proclaim Jesus Christ and promote communities of joy, hope, love, and peace.
          </motion.p>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-300 mb-12 font-medium"
          >
            A welcoming home church community in Minneapolis
          </motion.p>

          {/* Call to action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="mailto:joanne.kelty99@gmail.com"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors shadow-lg"
            >
              <Mail className="mr-2" size={20} />
              Contact the Pastor
            </a>
            <a
              href="tel:+16123081615"
              className="inline-flex items-center justify-center px-8 py-3 bg-white hover:bg-gray-100 text-slate-900 font-semibold rounded transition-colors shadow-lg"
            >
              <Phone className="mr-2" size={20} />
              (612) 308-1615
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom accent */}
      <div className="relative z-10 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
    </section>
  );
}
