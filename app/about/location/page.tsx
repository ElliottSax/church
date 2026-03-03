import InteractiveMap from "@/components/InteractiveMap";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us | Minneapolis Community of Christ",
  description: "Contact the pastor, JoAnne Kelty. We're a home church in Minneapolis. Call or email to learn where we're gathering.",
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
              Contact JoAnne Kelty to learn where we&apos;re gathering
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
                We are a home church without a physical sanctuary. Visitors are welcome! Please contact our pastor to learn where we&apos;ll be meeting.
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
                    <h3 className="font-semibold text-secondary-900">Flexible Gathering Times</h3>
                  </div>
                  <p className="text-secondary-600 ml-7">
                    As a home church, we meet in intimate settings focused on deep fellowship and shared worship. Contact JoAnne Kelty for current meeting times and location.
                  </p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="text-primary-600" size={20} />
                    <h3 className="font-semibold text-secondary-900">Home-Based Gatherings</h3>
                  </div>
                  <p className="text-secondary-600 ml-7">
                    We gather in homes throughout Minneapolis. When you contact JoAnne Kelty, she&apos;ll provide the specific location for our next gathering.
                  </p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="text-primary-600" size={20} />
                    <h3 className="font-semibold text-secondary-900">Intimate Community</h3>
                  </div>
                  <p className="text-secondary-600 ml-7">
                    Our small group setting fosters deep friendships and meaningful spiritual exploration centered on Christ&apos;s teachings.
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
