import Link from "next/link";
import { BookOpen, Users, Heart, Video } from "lucide-react";

export const metadata = {
  title: "Grow in Faith | Minneapolis Community of Christ",
  description: "Explore opportunities for spiritual growth through worship, study, and prayer.",
};

export default function GrowPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Grow in Faith</h1>
            <p className="text-xl text-primary-100">
              Deepen your relationship with God through worship, study, and prayer
            </p>
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Link
              href="/grow/worship"
              className="bg-white border-2 border-secondary-200 rounded-lg p-8 hover:border-primary-500 hover:shadow-xl transition-all group"
            >
              <Video className="text-primary-600 mb-4 group-hover:scale-110 transition-transform" size={48} />
              <h2 className="text-2xl font-bold text-secondary-900 mb-3">
                Worship Services
              </h2>
              <p className="text-secondary-600 mb-4">
                Join us for meaningful worship every Sunday at 10:30 AM. Experience
                uplifting music, inspiring messages, and authentic community.
              </p>
              <span className="text-primary-600 font-semibold group-hover:underline">
                Learn More →
              </span>
            </Link>

            <Link
              href="/grow/bible-study"
              className="bg-white border-2 border-secondary-200 rounded-lg p-8 hover:border-primary-500 hover:shadow-xl transition-all group"
            >
              <BookOpen className="text-primary-600 mb-4 group-hover:scale-110 transition-transform" size={48} />
              <h2 className="text-2xl font-bold text-secondary-900 mb-3">
                Bible Study
              </h2>
              <p className="text-secondary-600 mb-4">
                Dive deep into Scripture with our weekly Bible study. Explore God&apos;s
                word together and discover its relevance for today.
              </p>
              <span className="text-primary-600 font-semibold group-hover:underline">
                Learn More →
              </span>
            </Link>

            <Link
              href="/grow/prayer"
              className="bg-white border-2 border-secondary-200 rounded-lg p-8 hover:border-primary-500 hover:shadow-xl transition-all group"
            >
              <Heart className="text-primary-600 mb-4 group-hover:scale-110 transition-transform" size={48} />
              <h2 className="text-2xl font-bold text-secondary-900 mb-3">
                Prayer Groups
              </h2>
              <p className="text-secondary-600 mb-4">
                Connect with others in prayer. Share concerns, celebrate blessings,
                and experience God&apos;s presence together.
              </p>
              <span className="text-primary-600 font-semibold group-hover:underline">
                Learn More →
              </span>
            </Link>

            <Link
              href="/grow/sermons"
              className="bg-white border-2 border-secondary-200 rounded-lg p-8 hover:border-primary-500 hover:shadow-xl transition-all group"
            >
              <Users className="text-primary-600 mb-4 group-hover:scale-110 transition-transform" size={48} />
              <h2 className="text-2xl font-bold text-secondary-900 mb-3">
                Sermon Archive
              </h2>
              <p className="text-secondary-600 mb-4">
                Access our library of past sermons. Watch, listen, and reflect on
                messages that inspire and challenge.
              </p>
              <span className="text-primary-600 font-semibold group-hover:underline">
                Browse Sermons →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              Spiritual Resources
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">
                      Daily Devotionals
                    </h3>
                    <p className="text-secondary-600">
                      Receive daily inspiration and reflection in your inbox
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">
                      Reading Plans
                    </h3>
                    <p className="text-secondary-600">
                      Structured guides for reading through the Bible
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">
                      Community of Christ Resources
                    </h3>
                    <p className="text-secondary-600">
                      Access denominational materials and curriculum
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
