import { Users, Music, Book, Heart, Calendar, Star } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Youth Ministry | Minneapolis Community of Christ",
  description: "Youth programs for children and teens. Building faith, friendship, and fun.",
};

const programs = [
  {
    name: "Children's Church",
    ages: "Ages 4-11",
    time: "During Sunday worship",
    description: "Interactive Bible lessons, crafts, and activities designed just for kids",
    icon: Star,
    highlights: ["Bible stories", "Creative activities", "Music and movement", "Snacks provided"],
  },
  {
    name: "Youth Group",
    ages: "Ages 12-18",
    time: "Saturdays 6:00-8:00 PM",
    description: "Fun, fellowship, and faith formation for middle and high school students",
    icon: Users,
    highlights: ["Games and activities", "Service projects", "Pizza nights", "Summer camps"],
  },
  {
    name: "Confirmation Class",
    ages: "Ages 13-16",
    time: "Sundays 9:00 AM",
    description: "Exploring faith and preparing for church membership",
    icon: Book,
    highlights: ["Faith exploration", "Scripture study", "Mentorship", "Service learning"],
  },
];

const upcomingEvents = [
  {
    title: "Youth Lock-In",
    date: "January 20",
    description: "All-night fun with games, movies, and midnight pizza",
  },
  {
    title: "Winter Retreat",
    date: "February 10-12",
    description: "Weekend retreat at Camp Joy with skiing and worship",
  },
  {
    title: "Service Day",
    date: "March 4",
    description: "Serving at the local food shelf and homeless shelter",
  },
  {
    title: "Youth Sunday",
    date: "March 19",
    description: "Youth lead the entire worship service",
  },
];

export default function YouthPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Youth Ministry</h1>
            <p className="text-xl text-white/90">
              Nurturing the next generation through faith, friendship, and fun
            </p>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                Programs for Every Age
              </h2>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                From preschoolers to high school seniors, we have programs designed to help
                young people grow in faith and friendship.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {programs.map((program) => {
                const Icon = program.icon;
                return (
                  <div
                    key={program.name}
                    className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-white rounded-lg shadow-sm mr-4">
                        <Icon className="text-primary-600" size={32} />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-secondary-900">
                          {program.name}
                        </h3>
                        <p className="text-primary-600 font-semibold">{program.ages}</p>
                      </div>
                    </div>

                    <p className="text-secondary-600 mb-2">
                      <span className="font-semibold">When:</span> {program.time}
                    </p>

                    <p className="text-secondary-700 mb-4">{program.description}</p>

                    <div className="space-y-2">
                      <p className="font-semibold text-secondary-900">Highlights:</p>
                      <ul className="space-y-1">
                        {program.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-primary-600 mr-2">•</span>
                            <span className="text-secondary-600 text-sm">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              Upcoming Youth Events
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <div
                  key={event.title}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start">
                    <Calendar className="text-primary-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold text-lg text-secondary-900">
                        {event.title}
                      </h3>
                      <p className="text-primary-600 font-medium mb-2">{event.date}</p>
                      <p className="text-secondary-600 text-sm">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Youth Leaders */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
              Meet Our Youth Leaders
            </h2>
            <p className="text-center text-secondary-600 mb-12 max-w-2xl mx-auto">
              Our dedicated team of leaders is Safe Sanctuary certified and passionate
              about helping young people discover their faith and develop their gifts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-32 h-32 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-16 h-16 text-purple-600" />
                </div>
                <h3 className="font-bold text-xl mb-1">Pastor Mike Johnson</h3>
                <p className="text-primary-600 font-semibold mb-3">Youth Pastor</p>
                <p className="text-sm text-secondary-600 mb-4">
                  15 years of youth ministry experience. Passionate about helping teens
                  discover their purpose and identity in Christ.
                </p>
                <a
                  href="mailto:pastormike@example.com"
                  className="text-primary-600 hover:underline text-sm"
                >
                  pastormike@example.com
                </a>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-32 h-32 bg-pink-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Heart className="w-16 h-16 text-pink-600" />
                </div>
                <h3 className="font-bold text-xl mb-1">Rachel Thompson</h3>
                <p className="text-primary-600 font-semibold mb-3">Youth Coordinator</p>
                <p className="text-sm text-secondary-600 mb-4">
                  Coordinates events, missions, and small groups. Former youth group
                  member who loves giving back to the next generation.
                </p>
                <a
                  href="mailto:rachel.thompson@example.com"
                  className="text-primary-600 hover:underline text-sm"
                >
                  rachel.thompson@example.com
                </a>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-32 h-32 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Star className="w-16 h-16 text-blue-600" />
                </div>
                <h3 className="font-bold text-xl mb-1">David Miller</h3>
                <p className="text-primary-600 font-semibold mb-3">
                  Children&apos;s Ministry Director
                </p>
                <p className="text-sm text-secondary-600 mb-4">
                  Elementary teacher by day, children&apos;s ministry leader by calling.
                  Makes Bible stories come alive for kids.
                </p>
                <a
                  href="mailto:david.miller@example.com"
                  className="text-primary-600 hover:underline text-sm"
                >
                  david.miller@example.com
                </a>
              </div>
            </div>

            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/connect/events"
                  className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  View Calendar
                </Link>
                <a
                  href="mailto:youth@minneapoliscofchrist.org"
                  className="px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                >
                  Contact Youth Team
                </a>
                <a
                  href="tel:6125551234"
                  className="px-8 py-3 bg-gray-100 text-gray-900 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Call (612) 555-1234
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safe Sanctuary */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Committed to Safe Sanctuary
            </h2>
            <p className="text-secondary-700 leading-relaxed mb-6">
              The safety and well-being of our children and youth is our top priority.
              All volunteers are background-checked, Safe Sanctuary trained, and
              committed to providing a secure, nurturing environment where young people
              can grow in faith.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold mb-2">Background Checks</h3>
                <p className="text-sm text-secondary-600">
                  All volunteers complete comprehensive background screenings
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold mb-2">Two-Adult Rule</h3>
                <p className="text-sm text-secondary-600">
                  Two screened adults present in all activities with minors
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold mb-2">Ongoing Training</h3>
                <p className="text-sm text-secondary-600">
                  Annual training on safety protocols and abuse prevention
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Your Child Involved?</h2>
          <p className="text-xl mb-8 opacity-95">
            Registration is simple and free. We can&apos;t wait to welcome your family!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/connect/events"
              className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Register for Programs
            </Link>
            <Link
              href="/new-here"
              className="px-8 py-4 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors border-2 border-white/30"
            >
              First Time? Start Here
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}