import Link from "next/link";

export const metadata = {
  title: "About Community of Christ | Minneapolis Community of Christ",
  description:
    "Community of Christ identity, sacraments, enduring principles, and history -- how we differ from the LDS (Utah) church, and where our name comes from.",
};

const sacraments = [
  { name: "Baptism", desc: "By immersion for believers" },
  { name: "Confirmation", desc: "Gift of the Holy Spirit" },
  { name: "Lord's Supper", desc: "Open communion, remembering Christ" },
  { name: "Laying on of Hands", desc: "For healing and blessing" },
  { name: "Ordination", desc: "To priesthood (all genders since 1984)" },
  { name: "Marriage", desc: "Sacred covenant relationship" },
  { name: "Blessing of Children", desc: "Welcome to community (not a saving ordinance)" },
  { name: "Evangelist Blessing", desc: "Personal ministry and guidance" },
];

const distinctions = [
  {
    title: "Women Ordained to Priesthood",
    desc: "Since 1984 (Section 156), women serve in all priesthood offices. Currently about 25% of Community of Christ priesthood are women.",
  },
  {
    title: "Eight Sacraments (Not Temple Ordinances)",
    desc: "We practice eight sacraments in congregations. There is no temple endowment or sealing ceremony.",
  },
  {
    title: "No Baptism for the Dead",
    desc: "We do not practice proxy ordinances or temple work for deceased persons.",
  },
  {
    title: "LGBTQ+ Inclusive Policies",
    desc: "LGBTQ+ members may be baptized, ordained, and married. Full inclusion is supported.",
  },
  {
    title: "Peace and Justice Mission",
    desc: "Central to our identity. The Independence Temple is dedicated to peace, and we're active in social justice work.",
  },
  {
    title: "Progressive Christianity",
    desc: "We're open to diverse interpretations of scripture, including non-literal readings of the Book of Mormon.",
  },
  {
    title: "Environmental Stewardship",
    desc: "Sacredness of creation is an enduring principle. We're active in climate and conservation efforts.",
  },
  {
    title: "Continuing Revelation",
    desc: "Latest revelation: Section 167 (2025). The canon is not closed -- we believe prophecy continues.",
  },
];

export default function CommunityOfChristPage() {
  return (
    <div className="w-full">
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Community of Christ</h1>
            <p className="text-xl text-primary-100">
              Our identity, sacraments, history, and how we differ from the LDS (Utah) church
            </p>
          </div>
        </div>
      </section>

      {/* Identity */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-accent-50 rounded-lg p-6 md:p-8 border border-accent-200">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Our Identity</h2>
            <p className="text-secondary-700 mb-3">
              <strong>Community of Christ</strong> (formerly the Reorganized Church of Jesus
              Christ of Latter Day Saints, 1860-2001) is an international Christian
              denomination with headquarters in Independence, Missouri.
            </p>
            <p className="text-secondary-700 mb-6">
              Founded in 1860 under the leadership of <strong>Joseph Smith III</strong> (son of
              Joseph Smith Jr.), Community of Christ continues the prophetic ministry through
              continuing revelation.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-secondary-900">Founded:</strong>
                <p className="text-secondary-600">1860 (Amboy, Illinois)</p>
              </div>
              <div>
                <strong className="text-secondary-900">Headquarters:</strong>
                <p className="text-secondary-600">Independence, Missouri</p>
              </div>
              <div>
                <strong className="text-secondary-900">Current President:</strong>
                <p className="text-secondary-600">Stephen M. Veazey (2005-present)</p>
              </div>
              <div>
                <strong className="text-secondary-900">Members:</strong>
                <p className="text-secondary-600">~250,000 worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eight Sacraments */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">
              Eight Sacraments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sacraments.map((s, i) => (
                <div key={s.name} className="bg-white p-4 rounded-lg border border-secondary-200">
                  <h3 className="font-semibold text-secondary-900">
                    {i + 1}. {s.name}
                  </h3>
                  <p className="text-sm text-secondary-600">{s.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-secondary-500 mt-4 italic text-center">
              These are sacraments, not &ldquo;saving ordinances.&rdquo; We do not practice
              temple work for the dead or proxy ordinances as in LDS tradition.
            </p>
          </div>
        </div>
      </section>

      {/* Key Distinctions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">
              Key Distinctions from the LDS Church
            </h2>
            <div className="space-y-3">
              {distinctions.map((d) => (
                <div
                  key={d.title}
                  className="bg-secondary-50 p-4 rounded-lg border border-secondary-200"
                >
                  <h3 className="font-semibold text-secondary-900 mb-1">{d.title}</h3>
                  <p className="text-sm text-secondary-600">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Historical Context */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">
              Historical Context: 1844 Succession Crisis
            </h2>
            <div className="bg-white rounded-lg p-6 border border-secondary-200">
              <p className="text-secondary-700 mb-3">
                After Joseph Smith Jr.&apos;s death in 1844, multiple succession claims
                emerged:
              </p>
              <ul className="list-disc list-inside space-y-1 text-secondary-600 ml-4 mb-4">
                <li>
                  <strong>Brigham Young</strong> - Led a group to Utah (became the LDS Church)
                </li>
                <li>
                  <strong>Sidney Rigdon</strong> - Claimed First Presidency succession
                </li>
                <li>
                  <strong>James Strang</strong> - Claimed angelic ordination (Strangite
                  movement)
                </li>
                <li>
                  <strong>Lyman Wight</strong> - Led a Texas colony
                </li>
                <li>
                  <strong>Joseph Smith III</strong> - Lineal succession (became RLDS/Community
                  of Christ)
                </li>
              </ul>
              <p className="text-secondary-600 mb-3">
                <strong>1860 Reorganization:</strong> Joseph Smith III (age 27) accepted
                leadership after 16 years of resistance. Emma Smith (his mother) and many who
                remained in the Midwest formed the Reorganized Church.
              </p>
              <p className="text-secondary-600">
                <strong>Key differences from the start:</strong> the RLDS church explicitly
                rejected polygamy, stayed in the Midwest (Independence focus), emphasized
                democratic governance, and continued prophetic ministry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Temples */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">
              Temple Theology
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-secondary-50 p-4 rounded-lg border border-secondary-200">
                <h3 className="font-semibold text-secondary-900 mb-2">Kirtland Temple</h3>
                <ul className="text-sm text-secondary-600 space-y-1">
                  <li>Owned by Community of Christ from 1880 to 2024</li>
                  <li>Sold to the LDS Church in 2024</li>
                  <li>Proceeds support our mission and historic preservation</li>
                  <li>Still open for tours under LDS Church stewardship</li>
                </ul>
              </div>
              <div className="bg-secondary-50 p-4 rounded-lg border border-secondary-200">
                <h3 className="font-semibold text-secondary-900 mb-2">Independence Temple</h3>
                <ul className="text-sm text-secondary-600 space-y-1">
                  <li>Dedicated 1994 to peace</li>
                  <li>Spiral design symbolizing a journey</li>
                  <li>Open to all people</li>
                  <li>A space for meditation and worship</li>
                  <li>Daily Prayer for Peace</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-secondary-500 mt-4 italic text-center">
              Our temples are for worship, meditation, and peace -- not for exclusive
              ordinances or work for the dead as in LDS tradition.
            </p>
          </div>
        </div>
      </section>

      {/* Learn More */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://cofchrist.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Visit the Official Website
              </a>
              <Link
                href="/about/beliefs"
                className="px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Our Beliefs &amp; Enduring Principles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
