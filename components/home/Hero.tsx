"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10"></div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
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
              width={140}
              height={140}
              className="rounded-full shadow-2xl border-4 border-white/30"
              priority
            />
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">
            Minneapolis Community of Christ
          </h1>
          <p className="text-lg md:text-2xl mb-2 text-primary-100 text-balance font-semibold">
            A Home Church in Minneapolis
          </p>
          <p className="text-xl md:text-lg mb-8 text-primary-100 text-balance">
            We proclaim Jesus Christ and promote communities of joy, hope, love, and peace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:joanne.kelty99@gmail.com"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-700 rounded-lg font-semibold hover:bg-primary-50 transition-colors shadow-lg"
            >
              <Mail className="mr-2" size={20} />
              Contact the Pastor
              <ArrowRight className="ml-2" size={20} />
            </a>
            <a
              href="tel:+16123081615"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors border-2 border-white shadow-lg"
            >
              <Phone className="mr-2" size={20} />
              (612) 308-1615
            </a>
          </div>
        </motion.div>

        {/* About the Community */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
            <h2 className="text-2xl font-bold mb-4 text-center">Who We Are</h2>
            <p className="text-primary-100 text-lg text-center mb-6">
              We are a welcoming, intimate home church community in Minneapolis. Part of a global
              movement of Community of Christ with 250,000+ members in 60 countries, we gather in
              homes to worship, study scripture, and build deep spiritual friendships.
            </p>
            <div className="text-center">
              <Link
                href="/about/location"
                className="inline-flex items-center text-white font-semibold hover:text-primary-100 transition-colors"
              >
                Learn More About Our Community
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
