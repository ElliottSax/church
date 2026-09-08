import Link from "next/link";

export const metadata = {
  title: "Study Resources | Minneapolis Community of Christ",
  description:
    "Official Community of Christ study resources, historical RLDS materials, and where to find the full Doctrine and Covenants online.",
};

const officialResources = [
  {
    href: "https://gathering.cofchrist.org/",
    title: "Gathering Resources",
    description: "FREE worship guides, weekly lessons, and study materials for all ages",
  },
  {
    href: "https://www.heraldhouse.org/",
    title: "Herald House Publications",
    description:
      "Official Community of Christ publisher -- D&C Commentary (Volumes 1-2), 'Sharing in Community of Christ' ($6.95), and study materials",
  },
  {
    href: "http://www.centerplace.org/",
    title: "Centerplace.org",
    description:
      "FREE access to D&C sections 114-167 with study notes, Inspired Version cross-references, and RLDS historical documents",
  },
  {
    href: "https://cofchrist.org/",
    title: "Community of Christ Official Website",
    description: "Who We Are, Mission, Enduring Principles, Find a Congregation",
  },
];

const historicalResources = [
  {
    href: "https://archiveviewer.org/collections/en/saints-herald-rlds",
    title: "Saints' Herald Archive (1860-1928)",
    description:
      "Official RLDS periodical with sermons, theological articles, conference reports, and historical documentation",
  },
  {
    href: "https://archive.org/details/historyofchurcho03smitrich",
    title: "Joseph Smith III: History of the Church (4 volumes)",
    description: "Complete official RLDS history during Joseph Smith III's 54-year presidency (1860-1914)",
  },
  {
    href: "https://archive.org/details/TheBookOfMormon1874",
    title: "1874 RLDS Book of Mormon Edition",
    description: "Historical RLDS edition showing textual variations and RLDS perspective from this era",
  },
  {
    href: "https://archive.org/details/josephsmithsnewt00smit",
    title: "Inspired Version Bible (1867 Parallel Edition)",
    description:
      "Joseph Smith Translation side-by-side with the King James Version -- preserved by Emma Smith and published by RLDS",
  },
  {
    href: "http://www.latterdaytruth.org/",
    title: "LatterDayTruth.org Historical Documents",
    description: "PDFs of conference minutes, sermon series (1892-1894), and historical tracts from the mid-1800s through 1970s",
  },
];

const dcAuthors = [
  "Joseph Smith III (1860-1914)",
  "Frederick M. Smith (1915-1946)",
  "Israel A. Smith (1946-1958)",
  "W. Wallace Smith (1958-1978, 1982-1984) -- Section 156: Women's Ordination",
  "Wallace B. Smith (1978-1982, 1984-1996)",
  "Grant McMurray (1996-2004)",
  "Stephen M. Veazey (2005-present) -- latest: Section 167 (2025)",
];

function ResourceLink({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-white hover:bg-secondary-50 rounded-lg transition-colors border border-secondary-200"
    >
      <h3 className="font-semibold text-secondary-900 mb-1">{title} &rarr;</h3>
      <p className="text-sm text-secondary-600">{description}</p>
    </a>
  );
}

export default function ResourcesPage() {
  return (
    <div className="w-full">
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Community of Christ Study Resources
            </h1>
            <p className="text-xl text-primary-100">
              Official curriculum, scripture, and historical RLDS materials -- always the
              Community of Christ (Authorized/RLDS) editions, never the LDS versions
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              Official Resources (Free/Purchase)
            </h2>
            <div className="space-y-3">
              {officialResources.map((r) => (
                <ResourceLink key={r.href} {...r} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              Historical RLDS Materials (Free, Public Domain)
            </h2>
            <div className="space-y-3">
              {historicalResources.map((r) => (
                <ResourceLink key={r.href} {...r} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              D&amp;C Sections 114-167 (Community-of-Christ-Specific Revelations)
            </h2>
            <div className="bg-accent-50 border border-accent-200 rounded-lg p-6">
              <p className="text-secondary-700 mb-3">
                Community of Christ&apos;s Doctrine and Covenants includes{" "}
                <strong>54 additional sections (114-167)</strong> beyond the 113 shared with
                the LDS tradition. These contain revelations from:
              </p>
              <ul className="list-disc list-inside space-y-1 text-secondary-600 ml-4">
                {dcAuthors.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
              <p className="text-secondary-600 mt-4">
                <strong>Access all 167 sections:</strong> study the full Doctrine and
                Covenants (and the Book of Mormon and Inspired Version Bible) in our{" "}
                <a
                  href="https://comeuntochris.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  Bible, Book of Mormon &amp; D&amp;C study tool
                </a>
                , or visit{" "}
                <a
                  href="http://www.centerplace.org/dc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  Centerplace.org
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Spotlight: Section 156 (Women&apos;s Ordination, 1984)
            </h2>
            <div className="bg-accent-50 border border-accent-300 rounded-lg p-6">
              <p className="text-secondary-700 mb-3">
                One of the most significant revelations in our history, Section 156 authorized
                women&apos;s ordination to priesthood:
              </p>
              <blockquote className="border-l-4 border-accent-500 pl-4 italic my-3 text-secondary-700">
                &ldquo;The time has come for you to respond to the need for a broader
                participation of women in the life of the church, including their ordination
                to priesthood.&rdquo;
              </blockquote>
              <ul className="list-disc list-inside space-y-1 text-secondary-600 ml-4">
                <li>
                  <strong>Received:</strong> April 1, 1984 (President W. Wallace Smith)
                </li>
                <li>
                  <strong>Sustained:</strong> April 5, 1984 World Conference
                </li>
                <li>
                  <strong>First women ordained:</strong> 1985 (Ginger Barfield, Linda L. Booth,
                  and others)
                </li>
                <li>
                  <strong>Impact:</strong> ~50,000 members left to form Restoration Branches
                </li>
                <li>
                  <strong>Current:</strong> approximately 25% of Community of Christ
                  priesthood are women (2024)
                </li>
              </ul>
              <a
                href="https://sites.smith.edu/womens-rites/season-1/background-essay-womens-ordination-in-community-of-christ/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-primary-600 hover:underline text-sm"
              >
                Read a detailed historical essay on women&apos;s ordination in Community of
                Christ &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/about/community-of-christ"
            className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Learn More: About Community of Christ
          </Link>
        </div>
      </section>
    </div>
  );
}
