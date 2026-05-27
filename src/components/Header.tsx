"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { contact } from "@/lib/contact-config";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/programs", label: "Programs" },
  { href: "/contact", label: "Contact" },
  { href: "/enquiry", label: "Enquire Now" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      {/* Top bar */}
      <div className="hidden lg:block bg-primary-500 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-end gap-6">
          {contact.phones.map((phone) => (
            <a
              key={phone.href}
              href={`tel:${phone.href}`}
              className="flex items-center gap-1.5 hover:text-primary-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {phone.label}
            </a>
          ))}
          <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 hover:text-primary-100 transition-colors">
            <Mail className="w-3.5 h-3.5" />
            {contact.email}
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/Logo.png"
              alt="WowKids First Steps"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <h1 className="text-lg font-bold text-primary-600 leading-tight">
                {contact.schoolShortName}
              </h1>
              <p className="text-[10px] font-medium text-gray-500 leading-tight">
                {contact.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  link.href === "/enquiry"
                    ? "bg-primary-500 text-white hover:bg-primary-600 shadow-sm hover:shadow-md"
                    : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 pb-4 space-y-1 border-t border-gray-100 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                link.href === "/enquiry"
                  ? "bg-primary-500 text-white text-center"
                  : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {/* Mobile contact info */}
          <div className="pt-3 mt-3 border-t border-gray-100 space-y-2 text-sm text-gray-500">
            {contact.phones.map((phone) => (
              <a key={phone.href} href={`tel:${phone.href}`} className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-500" />
                {phone.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
