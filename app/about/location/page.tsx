import InteractiveMap from "@/components/InteractiveMap";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata = {
  title: "Location & Times | Minneapolis Community of Christ",
  description: "Find us in Minneapolis. Service times, directions, and contact information.",
};

export default function LocationPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Visit Us</h1>
            <p className="text-xl text-primary-100">
              We'd love to welcome you to our community
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <InteractiveMap />
          </div>
        </div>
      </section>

      {/* Contact & Times */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-primary-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-secondary-900">Address</h3>
                    <p className="text-secondary-600">
                      123 Main Street<br />
                      Minneapolis, MN 55401
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="text-primary-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-secondary-900">Phone</h3>
                    <a
                      href="tel:+16125551234"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      (612) 555-1234
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="text-primary-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-secondary-900">Email</h3>
                    <a
                      href="mailto:info@minneapoliscofchrist.org"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      info@minneapoliscofchrist.org
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Times */}
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                Service Times
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="text-primary-600" size={20} />
                    <h3 className="font-semibold text-secondary-900">Sunday Worship</h3>
                  </div>
                  <p className="text-secondary-600 ml-7">10:00 AM</p>
                  <p className="text-sm text-secondary-500 ml-7">
                    Traditional worship service with communion
                  </p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="text-primary-600" size={20} />
                    <h3 className="font-semibold text-secondary-900">Wednesday Bible Study</h3>
                  </div>
                  <p className="text-secondary-600 ml-7">7:00 PM</p>
                  <p className="text-sm text-secondary-500 ml-7">
                    In-depth scripture study and discussion
                  </p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="text-primary-600" size={20} />
                    <h3 className="font-semibold text-secondary-900">Thursday Prayer Group</h3>
                  </div>
                  <p className="text-secondary-600 ml-7">6:30 PM</p>
                  <p className="text-sm text-secondary-500 ml-7">
                    Community prayer and spiritual support
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Directions */}
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">
                Directions & Parking
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-secondary-700">
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-2">
                    From Downtown Minneapolis
                  </h3>
                  <p>
                    Take I-35W North to Exit 17. Turn right on Main Street. The church
                    is on the left after 2 blocks.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-2">
                    Public Transportation
                  </h3>
                  <p>
                    Metro Transit Bus Routes 6 and 17 stop one block from the church.
                    Light rail: Take Green Line to Nicollet Mall station.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-2">Parking</h3>
                  <p>
                    Free parking is available in our lot behind the building. Street
                    parking is also available on Main Street.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-2">
                    Accessibility
                  </h3>
                  <p>
                    Our building is fully accessible. Accessible parking spaces are
                    located near the main entrance.
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
