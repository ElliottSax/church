import { Calendar, Users, Heart, Sparkles } from "lucide-react";

export const metadata = {
  title: "Our Story | Minneapolis Community of Christ",
  description: "Learn about the history of our Minneapolis congregation and Community of Christ.",
};

export default function StoryPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-primary-100">
              Over 75 years of faithful witness in Minneapolis
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-12 text-center">
              History of the World Church
            </h2>

            <div className="space-y-12">
              {/* 1830s */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <Calendar className="text-primary-600" size={28} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    1830 - The Restoration Movement
                  </h3>
                  <p className="text-secondary-700">
                    Community of Christ traces its roots to the Restoration movement, when Joseph Smith Jr. sought to restore the early Christian church. The faith community that emerged embraced scripture, spiritual experience, and a vision of building God&apos;s kingdom on earth.
                  </p>
                </div>
              </div>

              {/* 1860 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="text-primary-600" size={28} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    1860 - Reorganization
                  </h3>
                  <p className="text-secondary-700">
                    Following Joseph Smith Jr.&apos;s death, the church reorganized under the leadership of Joseph Smith III. For 141 years, we were known as the &quot;Reorganized Church of Jesus Christ of Latter Day Saints&quot; (RLDS), establishing congregations across North America and eventually worldwide.
                  </p>
                </div>
              </div>

              {/* 1960s */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <Heart className="text-primary-600" size={28} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    1960s-70s - Expanding Inclusion
                  </h3>
                  <p className="text-secondary-700">
                    The church began opening priesthood roles to women and deepening its commitment to peace and justice. Worldwide, Community of Christ congregations engaged in civil rights, environmental stewardship, and reconciliation work.
                  </p>
                </div>
              </div>

              {/* 2000 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <Sparkles className="text-primary-600" size={28} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    2001 - Community of Christ
                  </h3>
                  <p className="text-secondary-700">
                    The church adopted the name &quot;Community of Christ&quot; to better reflect its Christ-centered identity and mission. This name change signified our commitment to building communities of joy, hope, love, and peace across the globe.
                  </p>
                </div>
              </div>

              {/* 2010s */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="text-primary-600" size={28} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    2010s - Deepening Welcome
                  </h3>
                  <p className="text-secondary-700">
                    Community of Christ continued expanding its vision of radical inclusivity, fully welcoming LGBTQ+ persons into all aspects of church life and leadership. Congregations worldwide intensified their focus on peacemaking and justice work.
                  </p>
                </div>
              </div>

              {/* Today */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                    <Heart className="text-white" size={28} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    Today - A Global Community
                  </h3>
                  <p className="text-secondary-700">
                    With approximately 250,000 members in 60 countries, Community of Christ continues its mission to embody Christ&apos;s love, pursue justice and peace, and welcome all God&apos;s children. We remain committed to continuing revelation, faithful discipleship, and building the beloved community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community of Christ Story */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6 text-center">
              Part of a Larger Story
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <p className="text-secondary-700 mb-4">
                Our Minneapolis congregation is part of <strong>Community of Christ</strong>,
                an international Christian denomination with approximately 250,000 members
                in 60 countries.
              </p>
              <p className="text-secondary-700 mb-4">
                The church traces its roots to the Restoration movement of the 1830s.
                After the death of Joseph Smith Jr., we reorganized in 1860 under the
                leadership of Joseph Smith III. For 141 years we were known as the
                &quot;Reorganized Church of Jesus Christ of Latter Day Saints&quot; (RLDS).
              </p>
              <p className="text-secondary-700 mb-4">
                In 2001, the church adopted the name &quot;Community of Christ&quot; to better
                reflect our identity and mission. Today, we are a Christ-centered,
                peace-loving church committed to the worth of all persons and the pursuit
                of justice.
              </p>
              <p className="text-secondary-700">
                Our worldwide headquarters is in Independence, Missouri, home to the
                beautiful Temple dedicated to peace and reconciliation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Heritage */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              Our Heritage, Our Future
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-primary-700 mb-3">
                  We Honor Our Past
                </h3>
                <ul className="space-y-2 text-secondary-700">
                  <li>• Rich theological heritage</li>
                  <li>• Restoration principles</li>
                  <li>• Prophetic leadership tradition</li>
                  <li>• Scripture-centered faith</li>
                  <li>• Sacramental worship</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-700 mb-3">
                  We Embrace Our Future
                </h3>
                <ul className="space-y-2 text-secondary-700">
                  <li>• Christ-centered mission</li>
                  <li>• Inclusive community</li>
                  <li>• Peace and justice focus</li>
                  <li>• Environmental stewardship</li>
                  <li>• Continuing revelation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Story */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Be Part of Our Story
            </h2>
            <p className="text-lg text-secondary-700 mb-8">
              Our story continues with each person who joins our community. We&apos;d love for
              you to become part of what God is doing through Minneapolis Community of
              Christ.
            </p>
            <a
              href="/about/location"
              className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Visit Us This Sunday
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
