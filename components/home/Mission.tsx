"use client";

import { motion } from "framer-motion";
import { Heart, Users, BookOpen, Hand, Star, Globe, Sparkles, Shield, Zap } from "lucide-react";

const enduringPrinciples = [
  {
    icon: Heart,
    title: "Grace and Generosity",
    description: "God&apos;s grace, especially as revealed in Jesus Christ, is generous and unconditional.",
  },
  {
    icon: Globe,
    title: "Sacredness of Creation",
    description: "God&apos;s creation is sacred. We join with God as stewards to care for, protect, and respect creation.",
  },
  {
    icon: Sparkles,
    title: "Continuing Revelation",
    description: "God continues to reveal divine will today. The Holy Spirit inspires and provides witness.",
  },
  {
    icon: Star,
    title: "Worth of All Persons",
    description: "All persons have great worth and should be respected as creations of God with basic human rights.",
  },
  {
    icon: Users,
    title: "All Are Called",
    description: "All are called according to their gifts to share in Christ&apos;s mission of love, reconciliation, and justice.",
  },
  {
    icon: Shield,
    title: "Responsible Choices",
    description: "We are called to make responsible choices within the circumstances of our lives.",
  },
  {
    icon: Hand,
    title: "Pursuit of Peace",
    description: "We pursue peace (shalom) on earth as the will of God for personal, social, and environmental harmony.",
  },
  {
    icon: Zap,
    title: "Unity in Diversity",
    description: "We seek agreement in basic witness while honoring diversity in our life together.",
  },
  {
    icon: BookOpen,
    title: "Blessings of Community",
    description: "We celebrate the blessings of community where we become our best selves through meaningful relationships.",
  },
];

export default function Mission() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Our Mission & Enduring Principles
          </h2>
          <p className="text-lg text-secondary-600 mb-2">
            We are a diverse community united in our commitment to follow Jesus Christ
            and share God&apos;s love with the world.
          </p>
          <p className="text-base text-secondary-500 italic">
            Guided by the Enduring Principles of the Community of Christ
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enduringPrinciples.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-secondary-50 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 rounded-full">
                  <principle.icon className="text-primary-600" size={28} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2 text-center">
                {principle.title}
              </h3>
              <p className="text-sm text-secondary-600 text-center">{principle.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
