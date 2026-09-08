import Link from "next/link";

export const metadata = {
  title: "1844 and Beyond: Two Paths After Joseph Smith | Community of Christ",
  description:
    "The documented history of the 1844 succession crisis, Brigham Young's leadership in Utah, and why the Reorganization -- now Community of Christ -- took a different path.",
};

export default function WhyCommunityOfChristPage() {
  return (
    <div className="w-full">
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              1844 and Beyond: Two Paths After Joseph Smith
            </h1>
            <p className="text-xl text-primary-100">
              The documented history of the succession crisis, Brigham Young&apos;s
              leadership in Utah, and why the Reorganization -- now Community of Christ --
              chose a different path
            </p>
          </div>
        </div>
      </section>

      {/* The succession crisis */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              The 1844 Succession Crisis
            </h2>
            <p className="text-secondary-700 mb-4">
              When Joseph Smith Jr. was killed in June 1844, no single successor had been
              publicly and unambiguously named, and several leaders claimed the right to
              lead. <strong>Brigham Young</strong>, as senior member of the Quorum of Twelve
              Apostles, won the leadership of the largest group at a Nauvoo conference in
              August 1844 and led most of that body west to Utah beginning in 1846 --
              eventually becoming what is now The Church of Jesus Christ of Latter-day
              Saints.
            </p>
            <p className="text-secondary-700 mb-4">
              Other claimants included Sidney Rigdon (a former counselor to Joseph Smith),
              James Strang (who claimed an angelic ordination), and Lyman Wight (who led a
              colony to Texas). None of these built a lasting church on the scale of
              Young&apos;s.
            </p>
            <p className="text-secondary-700">
              A separate group of Latter Day Saints -- concentrated in the Midwest and
              including Joseph Smith&apos;s widow, Emma Smith -- rejected Young&apos;s claim
              and did not go to Utah. In 1860, they organized around{" "}
              <strong>Joseph Smith III</strong>, the founder&apos;s eldest son, on the
              premise that leadership belonged to the Smith family line. This became the
              Reorganized Church of Jesus Christ of Latter Day Saints (RLDS), renamed
              Community of Christ in 2001.
            </p>
          </div>
        </div>
      </section>

      {/* Documented history under Young */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              What Happened Under Brigham Young&apos;s Leadership
            </h2>

            <div className="bg-white rounded-lg p-6 border border-secondary-200 mb-6">
              <h3 className="font-semibold text-secondary-900 mb-2">
                Plural Marriage Expanded, Not Ended
              </h3>
              <p className="text-secondary-700 text-sm">
                Joseph Smith had introduced plural marriage privately. Young institutionalized
                and dramatically expanded it as public church practice -- historians document
                Young himself as having roughly 55 wives. The Utah church did not formally
                disavow new plural marriages until the 1890 Manifesto, more than a decade
                after Young&apos;s death in 1877, under mounting federal pressure (the Morrill,
                Edmunds, and Edmunds-Tucker Acts).
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-secondary-200 mb-6">
              <h3 className="font-semibold text-secondary-900 mb-2">
                The Priesthood and Temple Ban on Black Members
              </h3>
              <p className="text-secondary-700 text-sm mb-2">
                Joseph Smith had ordained at least one Black man, Elijah Abel, an elder, in
                1836. Under Young, Black men were barred from priesthood ordination and Black
                members were denied full temple participation -- a restriction Young
                articulated publicly, including in a February 1852 address to the Utah
                territorial legislature. This ban continued for 126 years, until 1978. In
                2013, the LDS Church published a &ldquo;Race and the Priesthood&rdquo; essay
                formally disavowing the theories once used to justify it.
              </p>
              <p className="text-secondary-700 text-sm">
                Elijah Abel later affiliated with the Reorganization in 1872; his 1836
                ordination was recognized rather than treated as void.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-secondary-200 mb-6">
              <h3 className="font-semibold text-secondary-900 mb-2">
                The Mountain Meadows Massacre
              </h3>
              <p className="text-secondary-700 text-sm">
                On September 11, 1857, a Utah militia -- led by local church leader John D.
                Lee -- massacred roughly 120 emigrants of the Baker-Fancher wagon train in
                southern Utah. Young was Utah&apos;s territorial governor at the time.
                Historians (including the LDS Church&apos;s own 2008 study,{" "}
                <em>Massacre at Mountain Meadows</em>) generally conclude Young did not order
                the massacre and sent a message to let the emigrants pass in peace -- but it
                arrived two days too late, and Young&apos;s administration obstructed the
                federal investigation for nearly two decades afterward. Only John D. Lee was
                ever prosecuted; he was executed at the massacre site in 1877. In 2007, on the
                150th anniversary, the LDS Church formally acknowledged local church
                leaders&apos; role and expressed &ldquo;profound regret.&rdquo;
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-secondary-200">
              <h3 className="font-semibold text-secondary-900 mb-2">
                Theocratic Rule and the Utah War
              </h3>
              <p className="text-secondary-700 text-sm">
                Young governed Utah Territory with church and civil authority tightly fused
                for decades. Federal concern over that arrangement, along with reports of
                defiance of U.S. authority, led President Buchanan to send federal troops to
                Utah in 1857-58 (the &ldquo;Utah War&rdquo;), a crisis defused mostly through
                negotiation rather than open combat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why the Reorganization chose differently */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              Why the Reorganization Chose Differently
            </h2>
            <ul className="space-y-4">
              <li className="bg-accent-50 rounded-lg p-4 border border-accent-200">
                <strong className="text-secondary-900">Rejected polygamy from the start.</strong>{" "}
                <span className="text-secondary-700 text-sm">
                  The Reorganization&apos;s founding position, under Joseph Smith III, was
                  that Joseph Smith Jr. had not sanctioned plural marriage as public doctrine
                  and that the Utah church&apos;s practice of it was a departure, not a
                  continuation.
                </span>
              </li>
              <li className="bg-accent-50 rounded-lg p-4 border border-accent-200">
                <strong className="text-secondary-900">
                  Never adopted a priesthood ban targeting Black members.
                </strong>{" "}
                <span className="text-secondary-700 text-sm">
                  The Reorganization did not institute the restriction Young introduced in
                  Utah, and recognized Elijah Abel&apos;s ordination rather than nullifying
                  it.
                </span>
              </li>
              <li className="bg-accent-50 rounded-lg p-4 border border-accent-200">
                <strong className="text-secondary-900">
                  Favored shared governance over centralized theocracy.
                </strong>{" "}
                <span className="text-secondary-700 text-sm">
                  The Reorganization emphasized common consent and conference-based
                  decision-making rather than the fused church-state authority Young
                  exercised in Utah, and stayed rooted in the Midwest (Independence,
                  Missouri) rather than an isolated territory.
                </span>
              </li>
              <li className="bg-accent-50 rounded-lg p-4 border border-accent-200">
                <strong className="text-secondary-900">Continued to widen who could serve.</strong>{" "}
                <span className="text-secondary-700 text-sm">
                  In 1984, Community of Christ began ordaining women to all priesthood
                  offices (Doctrine and Covenants Section 156) -- 34 years before the modern
                  LDS Church would even begin reconsidering comparable questions, which it
                  has not adopted to date.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Learn more */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-secondary-700 max-w-2xl mx-auto mb-8">
            None of this is offered to say the people who followed Brigham Young west were
            not sincere. It&apos;s offered because the historical record is real, documented,
            and worth knowing -- and because it&apos;s a large part of why Community of
            Christ exists as a distinct church today, walking a different path from the same
            starting point.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/about/community-of-christ"
              className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              About Community of Christ Today
            </Link>
            <a
              href="https://mplscc.org"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Study the Book of Mormon, Bible &amp; D&amp;C
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
