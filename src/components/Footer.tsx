import Link from "next/link";
import { Phone, Mail, MapPin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/Logo.png"
                alt="WowKids First Steps"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-bold text-white">WowKids</h3>
                <p className="text-xs text-gray-400">First Steps</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Nurturing young minds with love, care, and excellence in early childhood education.
              Where every child&apos;s first steps toward learning are celebrated.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/programs", label: "Programs" },
                { href: "/contact", label: "Contact" },
                { href: "/enquiry", label: "Enquire Now" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://maps.app.goo.gl/7aUEYAUNFsd2h6qu6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-500" />
                  <span>
                    Road no: 6, Plot No 42, Prashanth Nagar,
                    <br />
                    Medipally, Uppal, Hyderabad - 500098
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919392669346"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0 text-primary-500" />
                  +91-9392669346
                </a>
              </li>
              <li>
                <a
                  href="tel:+917013319920"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0 text-primary-500" />
                  +91-7013319920
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wowkidsfirststeps.com"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0 text-primary-500" />
                  info@wowkidsfirststeps.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
            &copy; {new Date().getFullYear()} WowKids First Steps. All rights reserved.
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for every child.
          </p>
        </div>
      </div>
    </footer>
  );
}
