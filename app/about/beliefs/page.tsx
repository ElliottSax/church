import { BookOpen, Heart, Users, Globe, Sparkles, Scale, Lightbulb, HandHeart, Gem } from "lucide-react";

export const metadata = {
  title: "Our Beliefs | Minneapolis Community of Christ",
  description: "Learn about Community of Christ beliefs, Enduring Principles, and our Christ-centered mission.",
};

const principles = [
  {
    icon: HandHeart,
    title: "Grace and Generosity",
    description: "We experience God's grace and respond by sharing generously with others.",
  },
  {
    icon: Globe,
    title: "Sacredness of Creation",
    description: "All of creation has worth and purpose. We care for the earth as God's gift.",
  },
  {
    icon: Lightbulb,
    title: "Continuing Revelation",
    description: "God continues to reveal truth through scripture, Spirit, and community discernment.",
  },
  {
    icon: Heart,
    title: "Worth of All Persons",
    description: "Every person is of infinite worth, created in God's image and loved unconditionally.",
  },
  {
    icon: Sparkles,
    title: "All Are Called",
    description: "Everyone has gifts and is called to participate in God's mission.",
  },
  {
    icon: Scale,
    title: "Responsible Choices",
    description: "We are accountable for our choices and their impact on ourselves and others.",
  },
  {
    icon: Users,
    title: "Blessings of Community",
    description: "We find strength, support, and spiritual growth in Christian community.",
  },
  {
    icon: BookOpen,
    title: "Mission and Witness",
    description: "We share Christ's good news through word and deed in all the world.",
  },
  {
    icon: Gem,
    title: "Unity in Diversity",
    description: "We celebrate diversity and find unity in our shared mission to follow Jesus.",
  },
];

export default function BeliefsPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Beliefs</h1>
            <p className="text-xl text-primary-100">
              We are a Christ-centered community guided by grace, love, and the pursuit
              of peace and justice
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              Our Mission
            </h2>
            <p className="text-2xl text-primary-600 font-semibold mb-4">
              "We proclaim Jesus Christ and promote communities of joy, hope, love,
              and peace."
            </p>
            <p className="text-lg text-secondary-600">
              This simple yet profound mission guides everything we do as a congregation
              and as an international church.
            </p>
          </div>
        </div>
      </section>

      {/* Enduring Principles */}
      <section className="py-16 md:py-24 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                9 Enduring Principles
              </h2>
              <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
                These principles guide us in faithful discipleship and help us discern
                God's will in our contemporary world.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {principles.map((principle, index) => (
                <div
                  key={principle.title}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <principle.icon className="text-primary-600" size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 mb-2">
                        {index + 1}. {principle.title}
                      </h3>
                      <p className="text-sm text-secondary-600">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Beliefs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              What We Believe
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-primary-700 mb-3">
                  Jesus Christ
                </h3>
                <p className="text-secondary-700">
                  We believe Jesus Christ is the Living Word of God and Savior of the
                  world. Through his life, death, and resurrection, Jesus reveals God's
                  unconditional love and calls us to follow him in ministry and mission.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-700 mb-3">
                  Scripture
                </h3>
                <p className="text-secondary-700">
                  We affirm the Bible as the foundational scripture for the church. We
                  also use the Book of Mormon and Doctrine and Covenants as additional
                  witnesses of Jesus Christ. We interpret scripture through the lens of
                  Christ's love and in community discernment.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-700 mb-3">
                  Grace and Sacraments
                </h3>
                <p className="text-secondary-700">
                  We believe in God's grace freely given to all. We practice two
                  sacraments: Baptism (by immersion) and the Lord's Supper (communion).
                  These sacred acts symbolize our covenant relationship with God and one
                  another.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-700 mb-3">
                  Continuing Revelation
                </h3>
                <p className="text-secondary-700">
                  We believe God continues to reveal truth and guidance to the church
                  through the Holy Spirit. This revelation comes through scripture,
                  prophetic leadership, community discernment, and personal spiritual
                  experience.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-700 mb-3">
                  Peace and Justice
                </h3>
                <p className="text-secondary-700">
                  Following Jesus' example, we are called to be peacemakers and advocates
                  for justice. We work to end poverty, racism, violence, and oppression.
                  We affirm the worth of all persons and strive for the wholeness of
                  creation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-700 mb-3">
                  Inclusive Community
                </h3>
                <p className="text-secondary-700">
                  We celebrate diversity and welcome all people into Christian community.
                  Our priesthood includes both women and men. We believe all are called to
                  ministry according to their gifts and God's leading.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learn More */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              Want to Learn More?
            </h2>
            <p className="text-secondary-700 mb-8">
              We'd love to explore faith and questions with you. Join us for worship,
              attend a class, or contact our pastoral team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/about/location"
                className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Visit Us
              </a>
              <a
                href="https://cofchrist.org/beliefs"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Community of Christ International
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
