import { Users, Hand, Heart, Calendar, BookOpen, Coffee, Music, Baby } from "lucide-react";

export const metadata = {
  title: "Volunteer | Minneapolis Community of Christ",
  description: "Discover volunteer opportunities and ways to serve in our community.",
};

const opportunities = [
  {
    icon: Music,
    title: "Worship Team",
    description: "Share your musical gifts or serve as a greeter, usher, or communion server.",
    commitment: "1-2 Sundays per month",
    contact: "worship@minneapoliscofchrist.org",
  },
  {
    icon: Baby,
    title: "Children's Ministry",
    description: "Teach Sunday School, help with nursery, or assist with children's programs.",
    commitment: "Flexible schedule",
    contact: "children@minneapoliscofchrist.org",
  },
  {
    icon: Users,
    title: "Youth Ministry",
    description: "Mentor teens, lead activities, or chaperone youth events and mission trips.",
    commitment: "2-4 hours per month",
    contact: "youth@minneapoliscofchrist.org",
  },
  {
    icon: Hand,
    title: "Community Outreach",
    description: "Serve at food shelves, homeless shelters, or community service projects.",
    commitment: "Varies by project",
    contact: "outreach@minneapoliscofchrist.org",
  },
  {
    icon: Coffee,
    title: "Hospitality Team",
    description: "Help with fellowship coffee, community meals, and special events.",
    commitment: "Once per month",
    contact: "hospitality@minneapoliscofchrist.org",
  },
  {
    icon: BookOpen,
    title: "Education & Small Groups",
    description: "Facilitate Bible studies, lead small groups, or teach adult classes.",
    commitment: "Weekly or bi-weekly",
    contact: "education@minneapoliscofchrist.org",
  },
  {
    icon: Heart,
    title: "Pastoral Care",
    description: "Visit homebound members, send cards, or make phone calls to stay connected.",
    commitment: "Flexible schedule",
    contact: "care@minneapoliscofchrist.org",
  },
  {
    icon: Calendar,
    title: "Special Events",
    description: "Help plan and execute VBS, retreats, seasonal events, and fundraisers.",
    commitment: "Project-based",
    contact: "events@minneapoliscofchrist.org",
  },
];

export default function VolunteerPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Volunteer</h1>
            <p className="text-xl text-primary-100">
              Use your gifts to make a difference in our community
            </p>
          </div>
        </div>
      </section>

      {/* Why Volunteer */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              Why Volunteer?
            </h2>
            <p className="text-lg text-secondary-700 mb-8">
              Volunteering is more than just helping out—it's a way to live out our faith,
              build community, and discover our unique gifts in service to God and others.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div>
                <Heart className="text-primary-600 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  Live Your Faith
                </h3>
                <p className="text-secondary-600">
                  Put your beliefs into action through service and ministry
                </p>
              </div>
              <div>
                <Users className="text-primary-600 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  Build Community
                </h3>
                <p className="text-secondary-600">
                  Connect with others and form meaningful relationships
                </p>
              </div>
              <div>
                <Hand className="text-primary-600 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  Make an Impact
                </h3>
                <p className="text-secondary-600">
                  See the direct difference your service makes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section className="py-16 md:py-24 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-12 text-center">
              Volunteer Opportunities
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {opportunities.map((opp) => (
                <div
                  key={opp.title}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <opp.icon className="text-primary-600" size={24} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                        {opp.title}
                      </h3>
                      <p className="text-secondary-600 mb-3">{opp.description}</p>
                      <div className="text-sm space-y-1">
                        <p className="text-secondary-500">
                          <strong>Time:</strong> {opp.commitment}
                        </p>
                        <a
                          href={`mailto:${opp.contact}`}
                          className="text-primary-600 hover:text-primary-700 font-semibold"
                        >
                          Contact: {opp.contact}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Current Needs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              Immediate Needs
            </h2>

            <div className="bg-primary-50 rounded-lg p-8">
              <p className="text-secondary-700 mb-6">
                We're currently seeking volunteers for these specific roles:
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1">
                      Sunday School Teachers
                    </h3>
                    <p className="text-secondary-600 text-sm">
                      Help teach our elementary-age kids on Sunday mornings. Curriculum
                      provided. Team-teaching available.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1">
                      Food Shelf Volunteers
                    </h3>
                    <p className="text-secondary-600 text-sm">
                      Join our monthly service team at the local food shelf. Second
                      Saturday of each month, 9:00 AM - 12:00 PM.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1">
                      Tech Team Members
                    </h3>
                    <p className="text-secondary-600 text-sm">
                      Help with livestreaming, sound, or presentation slides during worship
                      services. Training provided.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1">
                      Greeters & Ushers
                    </h3>
                    <p className="text-secondary-600 text-sm">
                      Welcome visitors and members on Sunday mornings. Help people feel at
                      home in our congregation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6 text-center">
              Ready to Get Started?
            </h2>

            <div className="bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                Volunteer Sign-Up
              </h3>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Areas of Interest (check all that apply)
                  </label>
                  <div className="space-y-2">
                    {["Worship", "Children", "Youth", "Outreach", "Hospitality", "Education", "Pastoral Care", "Events"].map((area) => (
                      <label key={area} className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                        />
                        <span className="ml-2 text-secondary-700">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Tell us about your interests or skills
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="What are you passionate about? What gifts do you bring?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Submit Volunteer Interest
                </button>
              </form>

              <p className="text-sm text-secondary-500 mt-4 text-center">
                Someone from our volunteer coordination team will contact you within 2-3
                business days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Background Checks */}
      <section className="py-12 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg p-6 border-l-4 border-primary-600">
              <h3 className="font-semibold text-secondary-900 mb-2">
                Safe Sanctuary Policy
              </h3>
              <p className="text-sm text-secondary-700">
                For the safety of our children and youth, all volunteers working with minors
                are required to complete a background check and attend our Safe Sanctuary
                training. This free process takes about 15 minutes and helps us maintain a
                safe environment for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
