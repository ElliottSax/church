import { Mail, Phone } from "lucide-react";

export const metadata = {
  title: "Leadership | Minneapolis Community of Christ",
  description: "Meet our pastoral team and congregational leadership.",
};

const pastoralTeam = [
  {
    name: "Pastor Jane Smith",
    role: "Lead Pastor",
    email: "pastor@minneapoliscofchrist.org",
    phone: "(612) 555-1234",
    bio: "Pastor Jane has served our congregation since 2015. She brings a passion for biblical preaching, pastoral care, and community engagement. Jane holds a Master of Divinity from Saint Paul School of Theology and has been ordained in Community of Christ for 20 years.",
  },
  {
    name: "Elder John Miller",
    role: "Associate Minister",
    email: "john@minneapoliscofchrist.org",
    bio: "John focuses on youth ministry and small group development. A lifelong member of Community of Christ, he was ordained in 2010 and has a heart for helping young people discover their faith journey.",
  },
  {
    name: "Elder Sarah Johnson",
    role: "Evangelist",
    email: "sarah@minneapoliscofchrist.org",
    bio: "Sarah leads our outreach and mission efforts, coordinating community partnerships and service projects. Ordained in 2018, she brings experience in social work and a passion for justice ministries.",
  },
];

const councilMembers = [
  { name: "Michael Chen", role: "Congregational Chair" },
  { name: "Rebecca Martinez", role: "Financial Officer" },
  { name: "David Anderson", role: "Children&apos;s Ministry Coordinator" },
  { name: "Lisa Thompson", role: "Worship Coordinator" },
  { name: "James Wilson", role: "Building & Grounds" },
  { name: "Maria Garcia", role: "Fellowship Coordinator" },
];

export default function LeadershipPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Leadership</h1>
            <p className="text-xl text-primary-100">
              Servant leaders called to guide and support our community
            </p>
          </div>
        </div>
      </section>

      {/* Pastoral Team */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4 text-center">
              Pastoral Team
            </h2>
            <p className="text-center text-secondary-600 mb-12 max-w-2xl mx-auto">
              Our pastors are here to support your spiritual journey through preaching,
              teaching, pastoral care, and community leadership.
            </p>

            <div className="space-y-8">
              {pastoralTeam.map((pastor) => (
                <div
                  key={pastor.name}
                  className="bg-secondary-50 rounded-lg p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Photo Placeholder */}
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                        {pastor.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-secondary-900 mb-1">
                        {pastor.name}
                      </h3>
                      <p className="text-primary-600 font-semibold mb-3">
                        {pastor.role}
                      </p>
                      <p className="text-secondary-700 mb-4">{pastor.bio}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <a
                          href={`mailto:${pastor.email}`}
                          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                        >
                          <Mail size={16} />
                          <span>{pastor.email}</span>
                        </a>
                        {pastor.phone && (
                          <a
                            href={`tel:${pastor.phone}`}
                            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                          >
                            <Phone size={16} />
                            <span>{pastor.phone}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Congregational Council */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4 text-center">
              Congregational Council
            </h2>
            <p className="text-center text-secondary-600 mb-12 max-w-2xl mx-auto">
              Elected lay leaders who guide our congregation&apos;s ministry, finances, and
              operations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {councilMembers.map((member) => (
                <div
                  key={member.name}
                  className="bg-white rounded-lg p-6 shadow-md text-center"
                >
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-2xl font-bold mx-auto mb-4">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <h3 className="font-semibold text-secondary-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-secondary-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Priesthood */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6 text-center">
              About Priesthood in Community of Christ
            </h2>
            <div className="bg-primary-50 rounded-lg p-8">
              <p className="text-secondary-700 mb-4">
                In Community of Christ, priesthood is understood as a calling to servant
                ministry, not a position of power or privilege. Both women and men are
                called and ordained to priesthood offices.
              </p>
              <p className="text-secondary-700 mb-4">
                Our congregation includes priests, elders, evangelists, and other
                priesthood members who serve in various capacities:
              </p>
              <ul className="space-y-2 text-secondary-700 mb-4">
                <li>• Presiding at sacraments (baptism, communion)</li>
                <li>• Preaching and teaching</li>
                <li>• Pastoral care and counseling</li>
                <li>• Blessing and anointing for healing</li>
                <li>• Administrative leadership</li>
                <li>• Community outreach and evangelism</li>
              </ul>
              <p className="text-secondary-700">
                If you feel called to priesthood ministry, please speak with one of our
                pastors. We&apos;ll walk with you in discerning and developing your calling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Leadership */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Connect with Our Leaders
            </h2>
            <p className="text-secondary-700 mb-8">
              Our pastoral team is available for counseling, spiritual direction,
              questions about faith, or just to talk. Don&apos;t hesitate to reach out!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:pastor@minneapoliscofchrist.org"
                className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Email Pastor Jane
              </a>
              <a
                href="tel:+16125551234"
                className="px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Call (612) 555-1234
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
