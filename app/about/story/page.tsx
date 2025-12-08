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
              Our Journey
            </h2>

            <div className="space-y-12">
              {/* 1950s */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <Calendar className="text-primary-600" size={28} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    1950s - Founding Years
                  </h3>
                  <p className="text-secondary-700">
                    A small group of faithful members began meeting in homes in
                    Minneapolis, part of the Reorganized Church of Jesus Christ of Latter
                    Day Saints. These pioneers laid the foundation for what would become a
                    vibrant congregation.
                  </p>
                </div>
              </div>

              {/* 1960s */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="text-primary-600" size={28} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    1960s-70s - Growth & Community
                  </h3>
                  <p className="text-secondary-700">
                    The congregation grew steadily, purchasing our first building on Main
                    Street. Families gathered for worship, youth programs flourished, and
                    deep friendships formed that continue to this day.
                  </p>
                </div>
              </div>

              {/* 1980s */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <Heart className="text-primary-600" size={28} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    1980s-90s - Expanding Ministry
                  </h3>
                  <p className="text-secondary-700">
                    Our congregation became known for community service, starting a food
                    shelf ministry and partnering with local shelters. We welcomed our
                    first women to priesthood, embracing the church's inclusive calling.
                  </p>
                </div>
              </div>

              {/* 2000s */}
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
                    Along with the international church, we adopted the name "Community of
                    Christ," reflecting our Christ-centered mission and commitment to
                    building communities of joy, hope, love, and peace.
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
                    2010s - Renewed Vision
                  </h3>
                  <p className="text-secondary-700">
                    We deepened our commitment to peace and justice ministries, became
                    more intentionally welcoming to LGBTQ+ persons, and strengthened our
                    partnerships with other Minneapolis faith communities.
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
                    Today - Living Our Mission
                  </h3>
                  <p className="text-secondary-700">
                    We continue to grow as a diverse, welcoming community. While
                    respecting our heritage, we're focused on the future - sharing
                    Christ's love, pursuing peace and justice, and inviting all to
                    experience God's grace.
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
                "Reorganized Church of Jesus Christ of Latter Day Saints" (RLDS).
              </p>
              <p className="text-secondary-700 mb-4">
                In 2001, the church adopted the name "Community of Christ" to better
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
              Our story continues with each person who joins our community. We'd love for
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
