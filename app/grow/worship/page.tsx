import { Clock, MapPin, Calendar, Music, Users, Heart } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Worship Services | Minneapolis Community of Christ",
  description: "Join us for worship Sundays at 10:00 AM. In-person and online options available.",
};

export default function WorshipPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Worship Services</h1>
            <p className="text-xl text-primary-100 mb-8">
              Join us in celebrating God&apos;s love through music, message, and community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/about/location"
                className="px-8 py-3 bg-white text-primary-700 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Plan Your Visit
              </Link>
              <a
                href="#"
                className="px-8 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors border-2 border-white"
              >
                Watch Live
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center">
              Service Times
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-primary-50 rounded-lg p-6 text-center">
                <Clock className="text-primary-600 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  Sunday Worship
                </h3>
                <p className="text-2xl font-bold text-primary-600 mb-2">10:00 AM</p>
                <p className="text-secondary-600 text-sm">
                  Traditional worship with contemporary elements
                </p>
              </div>

              <div className="bg-primary-50 rounded-lg p-6 text-center">
                <Calendar className="text-primary-600 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  First Sundays
                </h3>
                <p className="text-2xl font-bold text-primary-600 mb-2">Communion</p>
                <p className="text-secondary-600 text-sm">
                  We celebrate the Lord&apos;s Supper together
                </p>
              </div>

              <div className="bg-primary-50 rounded-lg p-6 text-center">
                <MapPin className="text-primary-600 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  Location
                </h3>
                <p className="text-lg font-semibold text-secondary-900 mb-2">
                  Main Sanctuary
                </p>
                <Link
                  href="/about/location"
                  className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
                >
                  Get Directions →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              What to Expect
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start space-x-4">
                  <Music className="text-primary-600 flex-shrink-0 mt-1" size={32} />
                  <div>
                    <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                      Inspiring Music
                    </h3>
                    <p className="text-secondary-700">
                      Our worship includes a blend of traditional hymns and contemporary
                      Christian music. We have a talented music team including piano,
                      guitar, and vocalists who lead us in praise.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start space-x-4">
                  <Users className="text-primary-600 flex-shrink-0 mt-1" size={32} />
                  <div>
                    <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                      Biblical Messages
                    </h3>
                    <p className="text-secondary-700">
                      Our pastors deliver thoughtful, relevant sermons that connect
                      scripture with daily life. Messages typically run 20-25 minutes and
                      focus on God&apos;s love and our call to discipleship.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start space-x-4">
                  <Heart className="text-primary-600 flex-shrink-0 mt-1" size={32} />
                  <div>
                    <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                      Welcoming Community
                    </h3>
                    <p className="text-secondary-700">
                      We believe worship is better together. You&apos;ll find a warm, friendly
                      congregation that genuinely cares about one another. Coffee and
                      fellowship follow the service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typical Service */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              Typical Service Flow
            </h2>

            <div className="bg-primary-50 rounded-lg p-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-20 text-right text-primary-600 font-semibold">
                    10:00 AM
                  </div>
                  <div className="flex-1 border-l-2 border-primary-600 pl-4">
                    <h4 className="font-semibold text-secondary-900">
                      Prelude & Welcome
                    </h4>
                    <p className="text-sm text-secondary-600">
                      Gathering music and greeting
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-20 text-right text-primary-600 font-semibold">
                    10:05
                  </div>
                  <div className="flex-1 border-l-2 border-primary-600 pl-4">
                    <h4 className="font-semibold text-secondary-900">Opening Song</h4>
                    <p className="text-sm text-secondary-600">
                      Congregation joins in worship
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-20 text-right text-primary-600 font-semibold">
                    10:10
                  </div>
                  <div className="flex-1 border-l-2 border-primary-600 pl-4">
                    <h4 className="font-semibold text-secondary-900">
                      Prayer & Scripture
                    </h4>
                    <p className="text-sm text-secondary-600">
                      Opening prayer and Bible reading
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-20 text-right text-primary-600 font-semibold">
                    10:20
                  </div>
                  <div className="flex-1 border-l-2 border-primary-600 pl-4">
                    <h4 className="font-semibold text-secondary-900">
                      Children&apos;s Moment
                    </h4>
                    <p className="text-sm text-secondary-600">
                      Kids come forward for a brief lesson
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-20 text-right text-primary-600 font-semibold">
                    10:25
                  </div>
                  <div className="flex-1 border-l-2 border-primary-600 pl-4">
                    <h4 className="font-semibold text-secondary-900">Message</h4>
                    <p className="text-sm text-secondary-600">Sermon by pastoral team</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-20 text-right text-primary-600 font-semibold">
                    10:50
                  </div>
                  <div className="flex-1 border-l-2 border-primary-600 pl-4">
                    <h4 className="font-semibold text-secondary-900">
                      Response & Closing
                    </h4>
                    <p className="text-sm text-secondary-600">
                      Final song, announcements, benediction
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-20 text-right text-primary-600 font-semibold">
                    11:00
                  </div>
                  <div className="flex-1 border-l-2 border-primary-600 pl-4">
                    <h4 className="font-semibold text-secondary-900">
                      Fellowship Time
                    </h4>
                    <p className="text-sm text-secondary-600">
                      Coffee, snacks, and conversation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Visitors */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              First Time Visitor?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-secondary-900 mb-3">What to Wear</h3>
                <p className="text-secondary-700 text-sm">
                  Come as you are! Some wear jeans and a t-shirt, others prefer business
                  casual. We care more about your presence than your clothes.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-secondary-900 mb-3">Parking</h3>
                <p className="text-secondary-700 text-sm">
                  Free parking in our lot behind the building. Accessible spaces near the
                  main entrance. Street parking also available.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-secondary-900 mb-3">Children</h3>
                <p className="text-secondary-700 text-sm">
                  Nursery available for infants-3 years. Children&apos;s Church for ages 4-11
                  starts after the Children&apos;s Moment. Kids are always welcome in worship!
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-secondary-900 mb-3">
                  Accessibility
                </h3>
                <p className="text-secondary-700 text-sm">
                  Our building is fully accessible. Large-print bulletins and assistive
                  listening devices available. Just ask an usher!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Worship */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Can&apos;t Join Us in Person?
            </h2>
            <p className="text-lg text-secondary-700 mb-8">
              Watch our worship services live online every Sunday at 10:00 AM, or catch up
              later with our sermon archive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Watch Live
              </a>
              <Link
                href="/grow/sermons"
                className="px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Sermon Archive
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
