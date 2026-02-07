import { Users, Heart, Book, Coffee, Home, Globe } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Small Groups | Minneapolis Community of Christ",
  description: "Find your community in our small groups. Bible studies, fellowship groups, and more.",
};

const groups = [
  {
    name: "Young Adults Group",
    schedule: "Thursdays, 7:00 PM",
    location: "Coffee House Ministry Center",
    leader: "Mike & Rachel Thompson",
    description: "Fellowship and faith discussions for ages 18-30",
    icon: Coffee,
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Women's Heart to Heart",
    schedule: "Tuesdays, 10:00 AM",
    location: "Fellowship Hall",
    leader: "Sarah Miller",
    description: "Women supporting women through prayer and study",
    icon: Heart,
    color: "bg-pink-100 text-pink-600",
  },
  {
    name: "Men's Fellowship",
    schedule: "Saturday mornings, 8:00 AM",
    location: "Church Library",
    leader: "David Brown",
    description: "Men gathering for breakfast, Bible study, and brotherhood",
    icon: Users,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Marriage & Family",
    schedule: "Fridays, 7:00 PM",
    location: "Conference Room",
    leader: "Tom & Lisa Anderson",
    description: "Strengthening marriages and family relationships",
    icon: Home,
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Seekers & Questions",
    schedule: "Wednesdays, 6:30 PM",
    location: "Pastor's Office",
    leader: "Pastor John",
    description: "Exploring faith, asking questions, finding answers",
    icon: Book,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    name: "Global Missions Group",
    schedule: "First Sunday of month, 12:00 PM",
    location: "Room 201",
    leader: "Mission Team",
    description: "Supporting our mission work locally and globally",
    icon: Globe,
    color: "bg-indigo-100 text-indigo-600",
  },
];

export default function GroupsPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Small Groups</h1>
            <p className="text-xl text-primary-100">
              Life is better together. Find your community in one of our small groups.
            </p>
          </div>
        </div>
      </section>

      {/* Groups Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                Find Your Group
              </h2>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                Our small groups meet throughout the week for fellowship, Bible study,
                and mutual support. Everyone is welcome!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => {
                const Icon = group.icon;
                return (
                  <div
                    key={group.name}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-secondary-100"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${group.color}`}>
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-secondary-900 mb-2">
                          {group.name}
                        </h3>
                        <p className="text-sm text-secondary-600 mb-3">
                          {group.description}
                        </p>
                        <div className="space-y-1 text-sm">
                          <p className="text-secondary-700">
                            <span className="font-medium">When:</span> {group.schedule}
                          </p>
                          <p className="text-secondary-700">
                            <span className="font-medium">Where:</span> {group.location}
                          </p>
                          <p className="text-secondary-700">
                            <span className="font-medium">Leader:</span> {group.leader}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Ready to Join a Group?
            </h2>
            <p className="text-secondary-700 mb-8">
              We&apos;d love to help you find the right group for you. Contact us to learn more
              about our small groups or to sign up.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/connect/events"
                className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                View Upcoming Events
              </Link>
              <a
                href="tel:6125551234"
                className="px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Call Us: (612) 555-1234
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}