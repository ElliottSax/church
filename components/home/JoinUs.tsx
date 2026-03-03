"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, Users, Home, Heart, Sparkles } from "lucide-react";

const joinOptions = [
  {
    icon: Mail,
    title: "Email the Pastor",
    description: "Reach out to JoAnne Kelty at joanne.kelty99@gmail.com",
    action: "mailto:joanne.kelty99@gmail.com",
    cta: "Send Email",
  },
  {
    icon: Phone,
    title: "Call the Pastor",
    description: "Talk directly with JoAnne Kelty about our gatherings",
    action: "tel:+16123081615",
    cta: "Call (612) 308-1615",
  },
  {
    icon: Home,
    title: "Learn About House Church",
    description: "Understand what it means to be part of our home-based community",
    action: "/about/location",
    cta: "Learn More",
  },
  {
    icon: Heart,
    title: "Explore Our Faith",
    description: "Discover Community of Christ beliefs and mission",
    action: "/about/beliefs",
    cta: "Our Beliefs",
  },
];

export default function JoinUs() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
            Join Our Community
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            We&apos;re a welcoming home church in Minneapolis. Contact the pastor, JoAnne Kelty, to learn where we&apos;re gathering and become part of our spiritual family.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {joinOptions.map((option, index) => {
            const Icon = option.icon;
            const isLink = option.action.startsWith("/");

            return (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {isLink ? (
                  <Link href={option.action}>
                    <div className="bg-primary-50 hover:bg-primary-100 rounded-lg p-6 h-full cursor-pointer transition-all transform hover:scale-105 border border-primary-200">
                      <Icon className="text-primary-600 mb-4" size={32} />
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">
                        {option.title}
                      </h3>
                      <p className="text-secondary-600 mb-4">
                        {option.description}
                      </p>
                      <span className="text-primary-600 font-semibold hover:text-primary-700">
                        {option.cta} →
                      </span>
                    </div>
                  </Link>
                ) : (
                  <a href={option.action}>
                    <div className="bg-primary-50 hover:bg-primary-100 rounded-lg p-6 h-full cursor-pointer transition-all transform hover:scale-105 border border-primary-200">
                      <Icon className="text-primary-600 mb-4" size={32} />
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">
                        {option.title}
                      </h3>
                      <p className="text-secondary-600 mb-4">
                        {option.description}
                      </p>
                      <span className="text-primary-600 font-semibold hover:text-primary-700">
                        {option.cta} →
                      </span>
                    </div>
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Community Focus Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-center text-secondary-900 mb-8">
            What We Value
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Sparkles className="text-primary-600 mx-auto mb-3" size={40} />
              <h4 className="text-lg font-semibold text-secondary-900 mb-2">
                Spiritual Growth
              </h4>
              <p className="text-secondary-600">
                Deepen your faith through study, prayer, and Christian community
              </p>
            </div>
            <div className="text-center">
              <Users className="text-primary-600 mx-auto mb-3" size={40} />
              <h4 className="text-lg font-semibold text-secondary-900 mb-2">
                Deep Connection
              </h4>
              <p className="text-secondary-600">
                Build meaningful relationships in our intimate home church setting
              </p>
            </div>
            <div className="text-center">
              <Heart className="text-primary-600 mx-auto mb-3" size={40} />
              <h4 className="text-lg font-semibold text-secondary-900 mb-2">
                Shared Mission
              </h4>
              <p className="text-secondary-600">
                Work together to share Christ&apos;s love and pursue peace and justice
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
