import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Users, Globe, BookOpen } from "lucide-react";

export const metadata = {
  title: "About Us | Minneapolis Community of Christ",
  description: "Learn about our congregation, beliefs, and mission in Minneapolis.",
};

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-xl text-primary-100">
              We are a diverse, welcoming community of faith dedicated to following
              Jesus Christ and sharing God&apos;s love with the world.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-secondary-700">
              <p>
                The Minneapolis Community of Christ congregation has been serving our
                community for over 75 years. Our roots trace back to the Restoration
                movement, and we continue to honor that heritage while embracing God&apos;s
                call to be a prophetic people in today&apos;s world.
              </p>
              <p>
                We are part of Community of Christ, an international Christian
                denomination with approximately 250,000 members in 60 countries. Our
                mission is to proclaim Jesus Christ and promote communities of joy,
                hope, love, and peace.
              </p>
              <p>
                Here in Minneapolis, we strive to be a beacon of Christ&apos;s love in our
                neighborhood and beyond, working for justice, peace, and the worth of
                all persons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <Heart className="text-primary-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                Grace & Love
              </h3>
              <p className="text-secondary-600">
                We extend Christ&apos;s unconditional love and grace to all people,
                embracing diversity and promoting inclusion.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <Users className="text-primary-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                Community
              </h3>
              <p className="text-secondary-600">
                We build authentic relationships that nurture spiritual growth and
                mutual support.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <Globe className="text-primary-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                Mission
              </h3>
              <p className="text-secondary-600">
                We actively work for justice, peace, and the worth of all persons in
                our community and world.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <BookOpen className="text-primary-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                Learning
              </h3>
              <p className="text-secondary-600">
                We encourage continuous spiritual growth through study, prayer, and
                service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
            Learn More
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              href="/about/beliefs"
              className="block p-6 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <h3 className="text-xl font-semibold text-primary-700 mb-2">
                Our Beliefs
              </h3>
              <p className="text-secondary-600">
                Explore our faith and theological perspectives
              </p>
            </Link>
            <Link
              href="/about/leadership"
              className="block p-6 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <h3 className="text-xl font-semibold text-primary-700 mb-2">
                Leadership
              </h3>
              <p className="text-secondary-600">
                Meet our pastoral team and congregation leaders
              </p>
            </Link>
            <Link
              href="/about/location"
              className="block p-6 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <h3 className="text-xl font-semibold text-primary-700 mb-2">
                Visit Us
              </h3>
              <p className="text-secondary-600">
                Find our location and worship times
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
