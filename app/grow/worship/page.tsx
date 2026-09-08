import { Clock, MapPin, Calendar, Music, Users, Heart } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Worship | Minneapolis Community of Christ",
  description: "We currently gather for worship on Zoom. Email JoAnne Kelty for the link and current meeting time.",
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
              <a
                href="mailto:joanne.kelty99@gmail.com"
                className="px-8 py-3 bg-white text-primary-700 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Email for the Zoom Link
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gathering Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center">
              How We Gather
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-primary-50 rounded-lg p-6 text-center">
                <Clock className="text-primary-600 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  Sunday Worship
                </h3>
                <p className="text-secondary-600 text-sm">
                  Email JoAnne Kelty for our current meeting time and Zoom link.
                </p>
              </div>

              <div className="bg-primary-50 rounded-lg p-6 text-center">
                <Calendar className="text-primary-600 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  First Sundays
                </h3>
                <p className="text-2xl font-bold text-primary-600 mb-2">Communion</p>
                <p className="text-secondary-600 text-sm">
                  We celebrate the Lord&apos;s Supper together. All are welcome at Christ&apos;s table.
                </p>
              </div>

              <div className="bg-primary-50 rounded-lg p-6 text-center">
                <MapPin className="text-primary-600 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  Where
                </h3>
                <p className="text-lg font-semibold text-secondary-900 mb-2">
                  On Zoom, Wherever You Are
                </p>
                <Link
                  href="/about/location"
                  className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
                >
                  Get the Link →
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
                      congregation that genuinely cares about one another, and we always
                      stay on the call for a few minutes of fellowship afterward.
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
              What a Gathering Looks Like
            </h2>

            <div className="bg-primary-50 rounded-lg p-8">
              <div className="space-y-4">
                <div className="flex-1 border-l-2 border-primary-600 pl-4">
                  <h4 className="font-semibold text-secondary-900">
                    Welcome
                  </h4>
                  <p className="text-sm text-secondary-600">
                    We check in with each other as folks join the Zoom.
                  </p>
                </div>

                <div className="flex-1 border-l-2 border-primary-600 pl-4">
                  <h4 className="font-semibold text-secondary-900">Song &amp; Prayer</h4>
                  <p className="text-sm text-secondary-600">
                    An opening song, prayer, and scripture reading.
                  </p>
                </div>

                <div className="flex-1 border-l-2 border-primary-600 pl-4">
                  <h4 className="font-semibold text-secondary-900">
                    Message &amp; Discussion
                  </h4>
                  <p className="text-sm text-secondary-600">
                    A message connecting scripture to daily life, often followed by discussion.
                  </p>
                </div>

                <div className="flex-1 border-l-2 border-primary-600 pl-4">
                  <h4 className="font-semibold text-secondary-900">
                    Closing &amp; Fellowship
                  </h4>
                  <p className="text-sm text-secondary-600">
                    A closing song and benediction, then time to catch up before we log off.
                  </p>
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
                  Come as you are! Camera on or off, jeans or pajamas — we care more
                  about your presence than your appearance.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-secondary-900 mb-3">Children</h3>
                <p className="text-secondary-700 text-sm">
                  Kids are always welcome on the call, wiggles and all.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 md:col-span-2">
                <h3 className="font-semibold text-secondary-900 mb-3">
                  Accessibility
                </h3>
                <p className="text-secondary-700 text-sm">
                  Since we meet entirely on Zoom, there&apos;s no physical building to
                  navigate. Let JoAnne know if there&apos;s anything we can do to help
                  you participate fully — captions, a phone dial-in option, or
                  anything else. We&apos;ll accommodate everyone who needs accommodating.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
