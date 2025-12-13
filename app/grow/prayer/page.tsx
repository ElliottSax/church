import { Heart, Clock, Users, Phone, Mail, Calendar } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Prayer Groups | Minneapolis Community of Christ",
  description: "Join us in prayer. Prayer groups, prayer requests, and prayer resources.",
};

const prayerGroups = [
  {
    name: "Morning Prayer Circle",
    time: "Tuesdays, 6:30 AM",
    location: "Chapel",
    leader: "Mary Johnson",
    description: "Start your day with centering prayer and meditation",
    format: "In-person",
  },
  {
    name: "Intercessory Prayer Team",
    time: "Wednesdays, 6:00 PM",
    location: "Prayer Room",
    leader: "Elder Tom Wilson",
    description: "Lifting up the needs of our church and community",
    format: "In-person",
  },
  {
    name: "Healing Prayer Ministry",
    time: "First Sunday of month after worship",
    location: "Sanctuary",
    leader: "Pastor Sarah",
    description: "Prayer for physical, emotional, and spiritual healing",
    format: "In-person",
  },
  {
    name: "Online Prayer Group",
    time: "Thursdays, 7:00 PM",
    location: "Zoom",
    leader: "David Miller",
    description: "Join from anywhere for prayer and fellowship",
    format: "Online",
  },
  {
    name: "Prayer Walk",
    time: "Saturdays, 8:00 AM",
    location: "Meet at church",
    leader: "Various leaders",
    description: "Walking meditation and prayer around our neighborhood",
    format: "In-person",
  },
];

const prayerResources = [
  {
    title: "Daily Prayer Guide",
    description: "Daily scripture readings and prayer prompts",
    type: "PDF Download",
  },
  {
    title: "Prayer Journal Template",
    description: "Structure your personal prayer time",
    type: "Resource",
  },
  {
    title: "Breath Prayers",
    description: "Simple prayers for throughout the day",
    type: "Guide",
  },
  {
    title: "Prayer for Peace",
    description: "Community of Christ's daily prayer for peace",
    type: "Daily Practice",
  },
];

export default function PrayerPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Prayer Groups</h1>
            <p className="text-xl text-white/90">
              "Where two or three are gathered in my name, there I am among them."
              <br />
              <span className="text-sm">- Matthew 18:20</span>
            </p>
          </div>
        </div>
      </section>

      {/* Prayer Groups */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                Join a Prayer Group
              </h2>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                Prayer is at the heart of our spiritual life. Whether you're new to prayer
                or have been praying for years, you'll find a welcoming community here.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {prayerGroups.map((group) => (
                <div
                  key={group.name}
                  className="bg-white border border-secondary-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-xl text-secondary-900">
                      {group.name}
                    </h3>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        group.format === "Online"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {group.format}
                    </span>
                  </div>

                  <p className="text-secondary-700 mb-4">{group.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-secondary-600">
                      <Clock size={16} className="mr-2 text-primary-600" />
                      {group.time}
                    </div>
                    <div className="flex items-center text-secondary-600">
                      <Users size={16} className="mr-2 text-primary-600" />
                      Led by {group.leader}
                    </div>
                    <div className="flex items-center text-secondary-600">
                      <Heart size={16} className="mr-2 text-primary-600" />
                      {group.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Request */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">
                Submit a Prayer Request
              </h2>

              <p className="text-secondary-700 mb-6 text-center">
                Our prayer team would be honored to pray for you or your loved ones.
                All requests are kept confidential.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <a
                  href="mailto:prayer@minneapoliscofchrist.org"
                  className="flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Mail size={20} className="mr-2" />
                  Email Prayer Request
                </a>
                <a
                  href="tel:6125551234"
                  className="flex items-center justify-center px-6 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  <Phone size={20} className="mr-2" />
                  Call Prayer Line
                </a>
              </div>

              <p className="text-sm text-secondary-500 text-center">
                You can also submit prayer requests in person during any worship service
                or prayer group meeting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-secondary-900 mb-8 text-center">
              Prayer Resources
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {prayerResources.map((resource) => (
                <div
                  key={resource.title}
                  className="bg-secondary-50 rounded-lg p-6 hover:bg-secondary-100 transition-colors cursor-pointer"
                >
                  <h3 className="font-semibold text-lg text-secondary-900 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-secondary-600 text-sm mb-2">
                    {resource.description}
                  </p>
                  <span className="text-primary-600 font-semibold text-sm">
                    {resource.type} →
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <h3 className="font-semibold text-lg text-secondary-900 mb-4">
                Prayer for Peace
              </h3>
              <p className="text-secondary-700 italic max-w-2xl mx-auto">
                "God, where people are gathered together in anger or fear, we ask for your
                peace. Where there is discord and division, heal your children with love.
                Help us to be instruments of your peace, sharing Christ's mission in word
                and deed."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}