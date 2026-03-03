"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const galleryItems = [
  {
    id: 1,
    src: "/98ca42_78c4e0ddf12440098f3e44f5561fed2c.avif",
    alt: "Community gathering",
    title: "Gathering Together",
  },
  {
    id: 2,
    src: "/98ca42_6b094e063f4141409d2958f72d43c9dd~mv2.avif",
    alt: "Community of Christ",
    title: "Community Faith",
  },
  {
    id: 3,
    src: "/1ed0bb0d-e7f4-40da-b856-eac88c431179.png",
    alt: "Church community",
    title: "Spiritual Community",
  },
];

export default function CommunityGallery() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Our Community
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            A welcoming home church where we gather, worship, and grow together in faith
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group overflow-hidden rounded-lg shadow-lg"
            >
              <div className="relative h-64 w-full bg-secondary-100">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent flex items-end">
                  <h3 className="text-white font-semibold p-4 text-lg">
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
