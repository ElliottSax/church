import { Globe, Heart, School, Home, Droplets, Users } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Mission Projects | Minneapolis Community of Christ",
  description: "Support our local and global mission work. Making a difference together.",
};

const missions = [
  {
    name: "Haiti Education Initiative",
    location: "Port-au-Prince, Haiti",
    icon: School,
    description: "Supporting schools and providing educational supplies for 200+ children",
    goal: "$25,000",
    raised: "$18,500",
    percentage: 74,
    impact: "200 children receiving education",
  },
  {
    name: "Clean Water Project",
    location: "Kenya, East Africa",
    icon: Droplets,
    description: "Building wells and water purification systems in rural communities",
    goal: "$30,000",
    raised: "$22,000",
    percentage: 73,
    impact: "5 villages with clean water access",
  },
  {
    name: "Local Housing Support",
    location: "Minneapolis, MN",
    icon: Home,
    description: "Partnering with Habitat for Humanity to build affordable housing",
    goal: "$15,000",
    raised: "$12,000",
    percentage: 80,
    impact: "3 families housed this year",
  },
  {
    name: "Disaster Relief Fund",
    location: "Global",
    icon: Heart,
    description: "Rapid response to natural disasters and humanitarian crises",
    goal: "$20,000",
    raised: "$15,500",
    percentage: 77,
    impact: "Aid to 10 disaster areas",
  },
  {
    name: "Youth Peace Camp",
    location: "Independence, MO",
    icon: Users,
    description: "Sending youth to International Youth Forum for peace education",
    goal: "$10,000",
    raised: "$7,500",
    percentage: 75,
    impact: "15 youth attending camp",
  },
  {
    name: "Global Mission Tithes",
    location: "Worldwide",
    icon: Globe,
    description: "Supporting Community of Christ worldwide mission initiatives",
    goal: "$50,000",
    raised: "$41,000",
    percentage: 82,
    impact: "Supporting 50+ global projects",
  },
];

const upcomingTrips = [
  {
    destination: "Guatemala Medical Mission",
    dates: "March 15-25, 2024",
    focus: "Medical care and community health education",
    spotsAvailable: 3,
  },
  {
    destination: "Youth Service Trip - Chicago",
    dates: "June 10-17, 2024",
    focus: "Urban ministry and homeless services",
    spotsAvailable: 8,
  },
  {
    destination: "Haiti Construction Project",
    dates: "September 5-15, 2024",
    focus: "School building and repairs",
    spotsAvailable: 5,
  },
];

export default function MissionsPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-600 to-red-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Mission Projects</h1>
            <p className="text-xl text-white/90">
              Sharing Christ's mission locally and globally through service, compassion,
              and justice
            </p>
          </div>
        </div>
      </section>

      {/* Current Projects */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                Current Mission Projects
              </h2>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                Your generosity makes these life-changing projects possible. Every dollar
                directly impacts communities in need.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {missions.map((mission) => {
                const Icon = mission.icon;
                return (
                  <div
                    key={mission.name}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-primary-100 rounded-lg mr-3">
                          <Icon className="text-primary-600" size={28} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-secondary-900">
                            {mission.name}
                          </h3>
                          <p className="text-sm text-primary-600">{mission.location}</p>
                        </div>
                      </div>

                      <p className="text-secondary-700 mb-4">{mission.description}</p>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-secondary-600">
                            Raised: <span className="font-bold text-primary-600">{mission.raised}</span>
                          </span>
                          <span className="text-secondary-600">Goal: {mission.goal}</span>
                        </div>
                        <div className="bg-secondary-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-primary-500 to-primary-600 h-full rounded-full transition-all"
                            style={{ width: `${mission.percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-secondary-500 mt-1">
                          {mission.percentage}% funded
                        </p>
                      </div>

                      <div className="pt-3 border-t">
                        <p className="text-sm text-secondary-600">
                          <span className="font-semibold">Impact:</span> {mission.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Trips */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              Upcoming Mission Trips
            </h2>

            <div className="space-y-4 mb-12">
              {upcomingTrips.map((trip) => (
                <div
                  key={trip.destination}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-3 md:mb-0">
                      <h3 className="font-bold text-lg text-secondary-900">
                        {trip.destination}
                      </h3>
                      <p className="text-primary-600 font-semibold">{trip.dates}</p>
                      <p className="text-secondary-600">{trip.focus}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        {trip.spotsAvailable} spots available
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-secondary-700 mb-6">
                Mission trips are open to all members aged 16+. Financial assistance
                is available for those who need it.
              </p>
              <a
                href="mailto:missions@minneapoliscofchrist.org"
                className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Apply for Mission Trip
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How to Support */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              Ways to Support Our Missions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-primary-50 rounded-lg p-6">
                <Heart className="text-primary-600 mx-auto mb-3" size={40} />
                <h3 className="font-semibold mb-2">Give</h3>
                <p className="text-sm text-secondary-600">
                  One-time or monthly donations support ongoing projects
                </p>
              </div>

              <div className="bg-primary-50 rounded-lg p-6">
                <Users className="text-primary-600 mx-auto mb-3" size={40} />
                <h3 className="font-semibold mb-2">Go</h3>
                <p className="text-sm text-secondary-600">
                  Join a mission trip and serve hands-on
                </p>
              </div>

              <div className="bg-primary-50 rounded-lg p-6">
                <Globe className="text-primary-600 mx-auto mb-3" size={40} />
                <h3 className="font-semibold mb-2">Advocate</h3>
                <p className="text-sm text-secondary-600">
                  Share our mission and raise awareness
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/give/online"
                className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Donate to Missions
              </Link>
              <Link
                href="/connect/outreach"
                className="px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Learn About Local Outreach
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}