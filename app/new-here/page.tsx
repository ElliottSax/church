import { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  MapPin,
  Clock,
  Users,
  Coffee,
  HelpCircle,
  ArrowRight,
  Calendar,
  Home,
  Baby,
  Music,
  Book,
} from "lucide-react";

export const metadata: Metadata = {
  title: "New Here? | Minneapolis Community of Christ",
  description:
    "Welcome! We're glad you're interested in visiting. Learn what to expect, find answers to common questions, and discover how to get connected.",
  openGraph: {
    title: "New Here? Welcome to Minneapolis Community of Christ",
    description:
      "Your first visit guide - everything you need to know about worship, parking, what to wear, and more.",
  },
};

export default function NewHerePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-5xl font-bold mb-6">
            We&apos;re Glad You&apos;re Here
          </h1>
          <p className="text-xl leading-relaxed opacity-95 mb-8">
            Whether you&apos;re exploring faith for the first time, returning
            to church after some time away, or looking for a new spiritual home,
            you&apos;re welcome here. No perfect people, just real community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/about/location"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Plan Your Visit
            </Link>
            <Link
              href="/connect/events"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors border-2 border-white/30"
            >
              <Calendar className="w-5 h-5 mr-2" />
              View Events
            </Link>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 bg-white" id="what-to-expect">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What to Expect on Sunday
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We want your first visit to be comfortable and welcoming. Here&apos;s
              what a typical Sunday looks like.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* When We Meet */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <Clock className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                When We Meet
              </h3>
              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">Sunday Worship</p>
                <p className="text-lg">10:00 AM - 11:15 AM</p>
                <p className="text-sm text-gray-600 mt-3">
                  Coffee and fellowship before service (9:30 AM). Children&apos;s
                  programs during worship.
                </p>
              </div>
            </div>

            {/* Where to Park */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <MapPin className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Where to Park
              </h3>
              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">Free Parking Available</p>
                <p>Main lot behind the building</p>
                <p>Street parking on Oak Street</p>
                <p className="text-sm text-gray-600 mt-3">
                  Accessible parking spots near main entrance. We have volunteers
                  to help you find your way.
                </p>
              </div>
            </div>

            {/* What to Wear */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                What to Wear
              </h3>
              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">Come As You Are</p>
                <p>Casual to business casual</p>
                <p>Jeans are perfectly fine!</p>
                <p className="text-sm text-gray-600 mt-3">
                  We care more about your heart than your wardrobe. Wear what
                  makes you comfortable.
                </p>
              </div>
            </div>

            {/* Children & Youth */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <Baby className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Children &amp; Youth
              </h3>
              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">All Ages Welcome</p>
                <p>Nursery (0-3 years)</p>
                <p>Children&apos;s Church (4-12)</p>
                <p>Youth Group (13-18)</p>
                <p className="text-sm text-gray-600 mt-3">
                  Safe Sanctuary certified. Background-checked volunteers.
                </p>
              </div>
            </div>

            {/* The Service */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <Music className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                The Service
              </h3>
              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">Worship Format</p>
                <p>Contemporary worship music</p>
                <p>Scripture reading</p>
                <p>20-minute message</p>
                <p>Communion (1st Sunday)</p>
                <p className="text-sm text-gray-600 mt-3">
                  Welcoming, inclusive, and participatory worship experience.
                </p>
              </div>
            </div>

            {/* After Service */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <Coffee className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                After Service
              </h3>
              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">Fellowship Time</p>
                <p>Coffee and refreshments</p>
                <p>Meet the pastor</p>
                <p>Connect with members</p>
                <p className="text-sm text-gray-600 mt-3">
                  Stay as long as you like. No pressure, just friendly
                  conversation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Common Questions
            </h2>
            <p className="text-xl text-gray-600">
              Here are answers to questions first-time visitors often ask.
            </p>
          </div>

          <div className="space-y-6">
            <details className="bg-white rounded-lg shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-lg text-gray-900 hover:text-blue-600 transition-colors flex items-center justify-between">
                Do I need to register or RSVP?
                <ArrowRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                No registration needed! Just show up. However, if you&apos;d like us
                to expect you and have someone ready to greet you personally, you
                can{" "}
                <Link href="/contact" className="text-blue-600 hover:underline">
                  let us know you&apos;re coming
                </Link>
                .
              </div>
            </details>

            <details className="bg-white rounded-lg shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-lg text-gray-900 hover:text-blue-600 transition-colors flex items-center justify-between">
                What if I arrive late?
                <ArrowRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                No problem at all! Our greeters will welcome you and help you find
                a seat. We&apos;d rather have you come late than not come at all.
                Life happens, and we understand.
              </div>
            </details>

            <details className="bg-white rounded-lg shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-lg text-gray-900 hover:text-blue-600 transition-colors flex items-center justify-between">
                Will I be singled out as a visitor?
                <ArrowRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                We want you to feel welcome but not put on the spot. We don&apos;t ask
                visitors to stand or introduce themselves. You can participate as
                much or as little as you&apos;re comfortable with.
              </div>
            </details>

            <details className="bg-white rounded-lg shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-lg text-gray-900 hover:text-blue-600 transition-colors flex items-center justify-between">
                What about the offering? Do I need to give?
                <ArrowRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                Absolutely not! Giving is for members and regular attenders who want
                to support the church. As a guest, you&apos;re not expected to
                contribute. We&apos;re just glad you&apos;re here.
              </div>
            </details>

            <details className="bg-white rounded-lg shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-lg text-gray-900 hover:text-blue-600 transition-colors flex items-center justify-between">
                Is communion open to everyone?
                <ArrowRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                Yes! We practice open communion. All who seek Christ are welcome to
                participate, regardless of church membership or denomination. It&apos;s
                offered on the first Sunday of each month.
              </div>
            </details>

            <details className="bg-white rounded-lg shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-lg text-gray-900 hover:text-blue-600 transition-colors flex items-center justify-between">
                How can I learn more about your beliefs?
                <ArrowRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                We&apos;d love to share! Check out our{" "}
                <Link
                  href="/about/beliefs"
                  className="text-blue-600 hover:underline"
                >
                  beliefs page
                </Link>
                , chat with our AI assistant (bottom right), or schedule a coffee
                meeting with our pastor. We&apos;re an inclusive, progressive Christian
                community.
              </div>
            </details>

            <details className="bg-white rounded-lg shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-lg text-gray-900 hover:text-blue-600 transition-colors flex items-center justify-between">
                Can I bring my family/friends?
                <ArrowRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                Absolutely! Bring anyone you&apos;d like. We&apos;re a family-friendly
                church with programs for all ages. Everyone is welcome, regardless
                of background, orientation, or beliefs.
              </div>
            </details>

            <details className="bg-white rounded-lg shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-lg text-gray-900 hover:text-blue-600 transition-colors flex items-center justify-between">
                What if I have mobility challenges or special needs?
                <ArrowRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                Our facility is fully accessible with ramps, elevators, accessible
                restrooms, and reserved parking. We have hearing assistance devices
                available. Please let a greeter know if you need any accommodations.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Visit?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here are some ways to get connected and make the most of your first
              visit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Plan Your Visit */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 hover:shadow-xl transition-shadow">
              <MapPin className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Plan Your Visit
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Get directions, view our campus map, and find helpful information
                about parking and accessibility.
              </p>
              <Link
                href="/about/location"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
              >
                Location &amp; Directions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            {/* Explore Events */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 hover:shadow-xl transition-shadow">
              <Calendar className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Explore Events
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                See what&apos;s happening beyond Sunday worship. Bible studies, social
                events, service projects, and more.
              </p>
              <Link
                href="/connect/events"
                className="inline-flex items-center text-green-600 font-semibold hover:text-green-700"
              >
                View Calendar
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            {/* Join a Small Group */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 hover:shadow-xl transition-shadow">
              <Users className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Join a Small Group
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Small groups are where deep friendships form. Find a group that
                fits your interests and schedule.
              </p>
              <Link
                href="/connect/groups"
                className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700"
              >
                Browse Groups
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            {/* Learn About Us */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8 hover:shadow-xl transition-shadow">
              <Book className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Learn About Us
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Discover our story, mission, beliefs, and what makes Community of
                Christ unique and welcoming.
              </p>
              <Link
                href="/about/beliefs"
                className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700"
              >
                Our Beliefs
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Home className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-xl mb-8 leading-relaxed opacity-95">
            We&apos;d love to connect with you personally. Reach out anytime, and
            we&apos;ll get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@minneapoliscofchrist.org"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Email Us
            </a>
            <a
              href="tel:+16125551234"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors border-2 border-white/30"
            >
              Call (612) 555-1234
            </a>
          </div>
          <p className="mt-8 text-sm opacity-75">
            Or use our AI chatbot (bottom right) for instant answers!
          </p>
        </div>
      </section>
    </div>
  );
}
