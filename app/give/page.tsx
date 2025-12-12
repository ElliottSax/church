import Link from "next/link";
import { Heart, Globe, Hand } from "lucide-react";

export const metadata = {
  title: "Give | Minneapolis Community of Christ",
  description: "Support our mission through generous giving and volunteering.",
};

export default function GivePage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Give</h1>
            <p className="text-xl text-primary-100">
              Your generosity helps us share Christ&apos;s love and serve our community
            </p>
          </div>
        </div>
      </section>

      {/* Ways to Give */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-12 text-center">
            Ways to Give
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <div className="bg-secondary-50 rounded-lg p-8 text-center">
              <Heart className="text-primary-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-secondary-900 mb-3">
                Financial Giving
              </h3>
              <p className="text-secondary-600 mb-6">
                Support our ministry through one-time or recurring donations
              </p>
              <Link
                href="/give/online"
                className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Give Online
              </Link>
            </div>

            <div className="bg-secondary-50 rounded-lg p-8 text-center">
              <Hand className="text-primary-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-secondary-900 mb-3">
                Volunteer
              </h3>
              <p className="text-secondary-600 mb-6">
                Share your time and talents to serve others
              </p>
              <Link
                href="/give/volunteer"
                className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Get Involved
              </Link>
            </div>

            <div className="bg-secondary-50 rounded-lg p-8 text-center">
              <Globe className="text-primary-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-secondary-900 mb-3">
                Mission Projects
              </h3>
              <p className="text-secondary-600 mb-6">
                Support specific outreach and mission initiatives
              </p>
              <Link
                href="/give/missions"
                className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                View Projects
              </Link>
            </div>
          </div>

          {/* Impact */}
          <div className="max-w-4xl mx-auto bg-primary-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-secondary-900 mb-6 text-center">
              Your Impact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">200+</div>
                <p className="text-secondary-700">Families Served Monthly</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">12</div>
                <p className="text-secondary-700">Active Mission Projects</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
                <p className="text-secondary-700">Volunteer Hours/Month</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              Other Ways to Give
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-secondary-900 text-lg mb-2">
                    Mail a Check
                  </h3>
                  <p className="text-secondary-600">
                    Make checks payable to "Minneapolis Community of Christ" and mail to:<br />
                    123 Main Street, Minneapolis, MN 55401
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 text-lg mb-2">
                    Stock or Securities
                  </h3>
                  <p className="text-secondary-600">
                    Contact our office at (612) 555-1234 for information about donating
                    stocks or securities.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 text-lg mb-2">
                    Planned Giving
                  </h3>
                  <p className="text-secondary-600">
                    Include our congregation in your estate planning. Contact us to learn
                    about legacy giving options.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
