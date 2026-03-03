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
  Mail,
  Phone,
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
            <a
              href="mailto:joanne.kelty99@gmail.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact the Pastor, JoAnne Kelty
            </a>
            <a
              href="tel:+16123081615"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors border-2 border-white/30"
            >
              <Phone className="w-5 h-5 mr-2" />
              (612) 308-1615
            </a>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 bg-white" id="what-to-expect">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              A House Church Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are a home church without a sanctuary building. Our gatherings are intimate, focused on deep spiritual community and shared worship in someone&apos;s home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* When We Meet */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <Clock className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Flexible Gathering Times
              </h3>
              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">Contact Us to Learn About Meetings</p>
                <p className="text-sm text-gray-600 mt-3">
                  As a home church, we meet at times and locations that work for our community.
                  Contact Pastor JoAnne to find out when and where we&apos;ll be gathering next.
                </p>
              </div>
            </div>

            {/* Where We Gather */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <Home className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Home-Based Gatherings
              </h3>
              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">Intimate Community Setting</p>
                <p className="text-sm text-gray-600 mt-3">
                  We gather in homes throughout Minneapolis. This intimate setting fosters
                  deep friendships and meaningful spiritual exploration together.
                </p>
              </div>
            </div>

            {/* What to Expect */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <Heart className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Worship Experience
              </h3>
              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">Centered on Christ&apos;s Love</p>
                <p className="text-sm text-gray-600 mt-3">
                  Scripture, prayer, discussion, and fellowship centered on our shared faith in Christ.
                  All are welcome to participate fully in our worship.
                </p>
              </div>
            </div>

            {/* What to Wear */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Come As You Are
              </h3>
              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">Casual and Comfortable</p>
                <p>Wear whatever makes you comfortable</p>
                <p className="text-sm text-gray-600 mt-3">
                  We&apos;re a casual home church community. There&apos;s no dress code—
                  just come as you are.
                </p>
              </div>
            </div>

            {/* Children & Families */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <Baby className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                All Ages Welcome
              </h3>
              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">Families &amp; Children Encouraged</p>
                <p className="text-sm text-gray-600 mt-3">
                  We welcome children and families of all ages. Our home setting is
                  naturally accommodating for little ones.
                </p>
              </div>
            </div>

            {/* Fellowship */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <Coffee className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Deep Fellowship
              </h3>
              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">Community &amp; Connection</p>
                <p className="text-sm text-gray-600 mt-3">
                  Our small group setting fosters meaningful friendships and authentic
                  spiritual community. This is where real connection happens.
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
                Where and when do you meet?
                <ArrowRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                Contact the pastor, JoAnne Kelty at{" "}
                <a href="mailto:joanne.kelty99@gmail.com" className="text-blue-600 hover:underline">
                  joanne.kelty99@gmail.com
                </a>{" "}
                or call{" "}
                <a href="tel:+16123081615" className="text-blue-600 hover:underline">
                  (612) 308-1615
                </a>
                . She&apos;ll be happy to tell you where we&apos;re gathering and welcome you personally.
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
            {/* Contact Us */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 hover:shadow-xl transition-shadow">
              <MapPin className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Learn Our Meeting Location
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                As a home church, we meet in various locations. Contact the pastor, JoAnne Kelty to find out where we&apos;re gathering next.
              </p>
              <Link
                href="/about/location"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
              >
                Contact Information
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            {/* Join a Small Group */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 hover:shadow-xl transition-shadow">
              <Users className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Join Our Community
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our intimate home church setting fosters deep friendships and meaningful spiritual fellowship.
              </p>
              <Link
                href="/connect/groups"
                className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700"
              >
                Our Groups
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            {/* Learn About Our Faith */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8 hover:shadow-xl transition-shadow">
              <Book className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Our Beliefs &amp; Story
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Discover the rich history of Community of Christ and what we believe about God, faith, and building God&apos;s kingdom.
              </p>
              <Link
                href="/about/beliefs"
                className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700"
              >
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            {/* World Church History */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 hover:shadow-xl transition-shadow">
              <Heart className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                History of Our Church
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We&apos;re part of a global community of faith with roots in the Restoration movement. Explore our heritage.
              </p>
              <Link
                href="/about/story"
                className="inline-flex items-center text-green-600 font-semibold hover:text-green-700"
              >
                Our Story
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
          <h2 className="text-4xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-xl mb-8 leading-relaxed opacity-95">
            Contact the pastor, JoAnne Kelty to learn where we&apos;re gathering next. We&apos;d love
            to welcome you into our community!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:joanne.kelty99@gmail.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email JoAnne Kelty
            </a>
            <a
              href="tel:+16123081615"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors border-2 border-white/30"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call (612) 308-1615
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
