import { Heart, Home, Utensils, BookOpen, Users, Globe } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Community Outreach | Minneapolis Community of Christ",
  description: "Serving our neighbors and community through love and action.",
};

const ministries = [
  {
    name: "Food Pantry",
    icon: Utensils,
    description: "Providing groceries and meals to families in need",
    schedule: "Every Saturday, 9:00 AM - 12:00 PM",
    impact: "150+ families served monthly",
    needs: ["Non-perishable foods", "Volunteers for distribution", "Financial support"],
  },
  {
    name: "Homeless Ministry",
    icon: Home,
    description: "Supporting our unhoused neighbors with dignity and care",
    schedule: "Sundays after worship",
    impact: "50+ care packages distributed weekly",
    needs: ["Hygiene products", "Warm clothing", "Blankets and sleeping bags"],
  },
  {
    name: "Tutoring Program",
    icon: BookOpen,
    description: "Free tutoring for elementary and middle school students",
    schedule: "Tuesdays & Thursdays, 3:30-5:30 PM",
    impact: "30+ students tutored weekly",
    needs: ["Volunteer tutors", "School supplies", "Healthy snacks"],
  },
  {
    name: "Senior Support",
    icon: Heart,
    description: "Visiting and supporting elderly community members",
    schedule: "Flexible scheduling",
    impact: "40+ seniors visited monthly",
    needs: ["Volunteer visitors", "Transportation help", "Meal delivery drivers"],
  },
  {
    name: "Community Garden",
    icon: Globe,
    description: "Growing fresh produce for the community and food pantry",
    schedule: "April - October",
    impact: "500+ pounds of produce donated",
    needs: ["Gardening volunteers", "Seeds and supplies", "Garden tools"],
  },
  {
    name: "Refugee Support",
    icon: Users,
    description: "Welcoming and supporting refugee families",
    schedule: "Ongoing",
    impact: "12 families supported this year",
    needs: ["ESL teachers", "Furniture donations", "Job placement help"],
  },
];

export default function OutreachPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-teal-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Community Outreach</h1>
            <p className="text-xl text-white/90">
              Following Jesus by serving our neighbors with love, compassion, and justice
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-secondary-700 italic">
              &quot;We believe God calls us to create communities of Christ&apos;s peace and justice.
              Through our outreach ministries, we work to end suffering, promote peace,
              and develop communities where all can flourish.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                Our Outreach Ministries
              </h2>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                Join us in making a difference in our community. Every act of service,
                no matter how small, creates ripples of hope.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ministries.map((ministry) => {
                const Icon = ministry.icon;
                return (
                  <div
                    key={ministry.name}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-t-4 border-primary-500"
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-primary-100 rounded-lg mr-3">
                        <Icon className="text-primary-600" size={28} />
                      </div>
                      <h3 className="font-bold text-xl text-secondary-900">
                        {ministry.name}
                      </h3>
                    </div>

                    <p className="text-secondary-700 mb-4">{ministry.description}</p>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm">
                        <span className="font-semibold text-secondary-900">When: </span>
                        <span className="text-secondary-600">{ministry.schedule}</span>
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold text-secondary-900">Impact: </span>
                        <span className="text-primary-600">{ministry.impact}</span>
                      </p>
                    </div>

                    <div className="border-t pt-3">
                      <p className="text-sm font-semibold text-secondary-900 mb-2">
                        Current Needs:
                      </p>
                      <ul className="space-y-1">
                        {ministry.needs.map((need, idx) => (
                          <li key={idx} className="text-sm text-secondary-600 flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            {need}
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

      {/* Get Involved */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">
              How You Can Help
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6">
                <Heart className="text-primary-600 mx-auto mb-3" size={40} />
                <h3 className="font-semibold text-lg mb-2">Volunteer</h3>
                <p className="text-secondary-600 text-sm">
                  Share your time and talents in one of our ministries
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <Users className="text-primary-600 mx-auto mb-3" size={40} />
                <h3 className="font-semibold text-lg mb-2">Donate</h3>
                <p className="text-secondary-600 text-sm">
                  Support our ministries with financial gifts or supplies
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <Globe className="text-primary-600 mx-auto mb-3" size={40} />
                <h3 className="font-semibold text-lg mb-2">Advocate</h3>
                <p className="text-secondary-600 text-sm">
                  Stand up for justice and speak for those without a voice
                </p>
              </div>
            </div>

            <p className="text-secondary-700 mb-8">
              Whether you have an hour a week or a day a month, your contribution makes
              a real difference in the lives of our neighbors.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/give/volunteer"
                className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Sign Up to Volunteer
              </Link>
              <Link
                href="/give"
                className="px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Make a Donation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}