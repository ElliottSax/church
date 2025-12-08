"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const stories = [
  {
    id: 1,
    title: "Youth Mission Trip to Guatemala",
    excerpt: "Our youth group is preparing for an amazing mission trip to serve communities in Guatemala this summer.",
    date: "December 5, 2025",
    category: "Missions",
    image: "/images/news-1.jpg",
  },
  {
    id: 2,
    title: "New Bible Study Series Starting",
    excerpt: "Join us for a new 8-week study exploring the book of Acts and the early church.",
    date: "December 1, 2025",
    category: "Growth",
    image: "/images/news-2.jpg",
  },
  {
    id: 3,
    title: "Community Food Drive Success",
    excerpt: "Thanks to your generosity, we collected over 2,000 pounds of food for local families in need.",
    date: "November 28, 2025",
    category: "Outreach",
    image: "/images/news-3.jpg",
  },
];

export default function NewsStories() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            News & Stories
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Stay updated with the latest happenings in our community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stories.map((story, index) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-secondary-200"
            >
              <div className="aspect-video bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-6xl font-bold">
                {story.category.charAt(0)}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-primary-600 uppercase">
                    {story.category}
                  </span>
                  <span className="text-xs text-secondary-500">{story.date}</span>
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-2">
                  {story.title}
                </h3>
                <p className="text-secondary-600 mb-4">{story.excerpt}</p>
                <Link
                  href={`/news/${story.id}`}
                  className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700"
                >
                  Read More
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/news"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            View All News
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
