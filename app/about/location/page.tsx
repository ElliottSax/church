import InteractiveMap from "@/components/InteractiveMap";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us | Minneapolis Community of Christ",
  description: "We currently meet on Zoom. Email Pastor JoAnne Kelty for the link or to join our newsletter.",
};

export default function LocationPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Community</h1>
            <p className="text-xl text-primary-100">
              Email JoAnne Kelty for our Zoom link
            </p>
          </div>
        </div>
      </section>

      {/* Contact & Times */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Contact Info */}
            <div className="bg-white rounded-lg p-8 shadow-md mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                Contact the Pastor, JoAnne Kelty
              </h2>
              <p className="text-secondary-700 mb-6">
                We currently meet on Zoom. Visitors are welcome! Email our pastor for the meeting link or to be added to our newsletter.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="text-primary-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-secondary-900">Email</h3>
                    <a
                      href="mailto:joanne.kelty99@gmail.com"
                      className="text-primary-600 hover:text-primary-700 text-lg"
                    >
                      joanne.kelty99@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="text-primary-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-secondary-900">Phone</h3>
                    <a
                      href="tel:+16123081615"
                      className="text-primary-600 hover:text-primary-700 text-lg"
                    >
                      (612) 308-1615
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* What to Expect */}
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                What to Expect
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="text-primary-600" size={20} />
                    <h3 className="font-semibold text-secondary-900">Meeting on Zoom</h3>
                  </div>
                  <p className="text-secondary-600 ml-7">
                    We currently gather over Zoom, focused on deep fellowship and shared worship. Email JoAnne Kelty for the current meeting time and Zoom link.
                  </p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="text-primary-600" size={20} />
                    <h3 className="font-semibold text-secondary-900">Join From Anywhere</h3>
                  </div>
                  <p className="text-secondary-600 ml-7">
                    When you email JoAnne Kelty, she&apos;ll send you the Zoom link and add you to our newsletter so you always know how to join.
                  </p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="text-primary-600" size={20} />
                    <h3 className="font-semibold text-secondary-900">Intimate Community</h3>
                  </div>
                  <p className="text-secondary-600 ml-7">
                    Our close-knit Zoom gatherings foster deep friendships and meaningful spiritual exploration centered on Christ&apos;s teachings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
