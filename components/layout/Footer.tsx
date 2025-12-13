import Link from "next/link";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Minneapolis Community of Christ</h3>
            <p className="text-secondary-300 mb-4">
              A welcoming, loving faith community. We proclaim Jesus Christ and promote
              communities of joy, hope, love, and peace.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-300 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-secondary-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/grow/worship" className="text-secondary-300 hover:text-white transition-colors">
                  Worship Services
                </Link>
              </li>
              <li>
                <Link href="/connect/events" className="text-secondary-300 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/give" className="text-secondary-300 hover:text-white transition-colors">
                  Give
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/grow/sermons" className="text-secondary-300 hover:text-white transition-colors">
                  Sermon Archive
                </Link>
              </li>
              <li>
                <Link href="/grow/bible-study" className="text-secondary-300 hover:text-white transition-colors">
                  Bible Study
                </Link>
              </li>
              <li>
                <Link href="/grow/prayer" className="text-secondary-300 hover:text-white transition-colors">
                  Prayer Wall
                </Link>
              </li>
              <li>
                <a
                  href="https://cofchrist.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-300 hover:text-white transition-colors"
                >
                  Community of Christ World Church
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span className="text-secondary-300">
                  123 Main Street<br />
                  Minneapolis, MN 55401
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="flex-shrink-0" />
                <a href="tel:+16125551234" className="text-secondary-300 hover:text-white transition-colors">
                  (612) 555-1234
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="flex-shrink-0" />
                <a
                  href="mailto:info@minneapoliscofchrist.org"
                  className="text-secondary-300 hover:text-white transition-colors"
                >
                  info@minneapoliscofchrist.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-700 mt-8 pt-8 text-center text-secondary-400">
          <p>
            &copy; {currentYear} Minneapolis Community of Christ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
