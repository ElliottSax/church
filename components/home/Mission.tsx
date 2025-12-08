"use client";

import { motion } from "framer-motion";
import { Heart, Users, BookOpen, Hand } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Love",
    description: "We embrace all people with Christ's unconditional love and grace.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We build strong, supportive relationships that nurture spiritual growth.",
  },
  {
    icon: BookOpen,
    title: "Growth",
    description: "We encourage continuous learning and deepening faith through study and practice.",
  },
  {
    icon: Hand,
    title: "Service",
    description: "We serve our community and world, working for justice and peace.",
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
            Our Mission & Values
          </h2>
          <p className="text-lg text-secondary-600">
            We are a diverse community united in our commitment to follow Jesus Christ
            and share God's love with the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <value.icon className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                {value.title}
              </h3>
              <p className="text-secondary-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
