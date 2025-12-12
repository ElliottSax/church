import Link from "next/link";
import { Calendar, Users, Heart, Globe } from "lucide-react";

export const metadata = {
  title: "Connect | Minneapolis Community of Christ",
  description: "Connect with our community through events, small groups, and outreach.",
};

export default function ConnectPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Connect</h1>
            <p className="text-xl text-primary-100">
              Build meaningful relationships and grow together in faith
            </p>
          </div>
        </div>
      </section>

      {/* Connection Opportunities */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Link
              href="/connect/events"
              className="bg-white border-2 border-secondary-200 rounded-lg p-8 hover:border-primary-500 hover:shadow-xl transition-all group"
            >
              <Calendar className="text-primary-600 mb-4 group-hover:scale-110 transition-transform" size={48} />
              <h2 className="text-2xl font-bold text-secondary-900 mb-3">
                Events & Calendar
              </h2>
              <p className="text-secondary-600 mb-4">
                Discover upcoming events, workshops, and special services. Join us for
                fellowship and community building activities.
              </p>
              <span className="text-primary-600 font-semibold group-hover:underline">
                View Calendar →
              </span>
            </Link>

            <Link
              href="/connect/groups"
              className="bg-white border-2 border-secondary-200 rounded-lg p-8 hover:border-primary-500 hover:shadow-xl transition-all group"
            >
              <Users className="text-primary-600 mb-4 group-hover:scale-110 transition-transform" size={48} />
              <h2 className="text-2xl font-bold text-secondary-900 mb-3">
                Small Groups
              </h2>
              <p className="text-secondary-600 mb-4">
                Connect in a more intimate setting through our small groups. Find
                community, support, and spiritual growth.
              </p>
              <span className="text-primary-600 font-semibold group-hover:underline">
                Find a Group →
              </span>
            </Link>

            <Link
              href="/connect/youth"
              className="bg-white border-2 border-secondary-200 rounded-lg p-8 hover:border-primary-500 hover:shadow-xl transition-all group"
            >
              <Heart className="text-primary-600 mb-4 group-hover:scale-110 transition-transform" size={48} />
              <h2 className="text-2xl font-bold text-secondary-900 mb-3">
                Youth Ministry
              </h2>
              <p className="text-secondary-600 mb-4">
                Engaging programs for children and teens. Fun activities, service
                projects, and faith formation for young people.
              </p>
              <span className="text-primary-600 font-semibold group-hover:underline">
                Learn More →
              </span>
            </Link>

            <Link
              href="/connect/outreach"
              className="bg-white border-2 border-secondary-200 rounded-lg p-8 hover:border-primary-500 hover:shadow-xl transition-all group"
            >
              <Globe className="text-primary-600 mb-4 group-hover:scale-110 transition-transform" size={48} />
              <h2 className="text-2xl font-bold text-secondary-900 mb-3">
                Community Outreach
              </h2>
              <p className="text-secondary-600 mb-4">
                Serve our neighbors through food drives, shelter support, and
                community partnerships.
              </p>
              <span className="text-primary-600 font-semibold group-hover:underline">
                Get Involved →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Connections */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              This Month&apos;s Highlights
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  New Members Welcome
                </h3>
                <p className="text-secondary-600">
                  Interested in learning more about our congregation? Join us for a new
                  members orientation on the first Sunday of each month after worship.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  Community Meal
                </h3>
                <p className="text-secondary-600">
                  Third Thursday of every month at 6:00 PM. All are welcome for a free
                  meal and fellowship. No reservations needed!
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  Monthly Service Project
                </h3>
                <p className="text-secondary-600">
                  Join us on the second Saturday of each month as we serve at local
                  food shelves and community centers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
