import { Phone, Mail, MapPin, Clock, Calendar } from "lucide-react";

const workingHours = [
  { day: "Monday – Friday", hours: "8:00 AM – 6:30 PM" },
  { day: "Saturday", hours: "8:00 AM – 1:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact &amp; Location
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We&apos;d love to hear from you! Visit our campus, give us a call, or send us a
            message. Your child&apos;s bright future starts here.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Left column - Contact details */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 p-6 rounded-2xl border border-primary-200/50">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-500" />
                  Our Address
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Road no: 6, Plot No 42, Prashanth Nagar,
                  <br />
                  Medipally, Uppal,
                  <br />
                  Hyderabad, Telangana 500098
                </p>
                <a
                  href="https://maps.app.goo.gl/7aUEYAUNFsd2h6qu6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary-600 font-medium text-sm mt-3 hover:text-primary-700 transition-colors"
                >
                  View on Google Maps
                  <span>→</span>
                </a>
              </div>

              <div className="bg-gradient-to-br from-secondary-50 to-secondary-100/50 p-6 rounded-2xl border border-secondary-200/50">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-secondary-500" />
                  Working Hours
                </h2>
                <div className="space-y-2">
                  {workingHours.map((item) => (
                    <div
                      key={item.day}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-600">{item.day}</span>
                      <span className="font-medium text-gray-900">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-accent-50 to-accent-100/50 p-6 rounded-2xl border border-accent-200/50">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-accent-500" />
                  Contact Information
                </h2>
                <div className="space-y-3">
                  <a
                    href="tel:+919392669346"
                    className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-primary-500" />
                    <span>+91-9392669346</span>
                  </a>
                  <a
                    href="tel:+917013319920"
                    className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-primary-500" />
                    <span>+91-7013319920</span>
                  </a>
                  <a
                    href="mailto:info@wowkidsfirststeps.com"
                    className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-primary-500" />
                    <span>info@wowkidsfirststeps.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right column - Map */}
            <div className="h-[400px] md:h-auto rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <iframe
                src="https://www.google.com/maps?q=Plot+No+42+Road+no+6+Prashanth+Nagar+Medipally+Uppal+Hyderabad+500098&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="WowKids First Steps Location"
              />
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <div className="flex items-start gap-3">
              <Calendar className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Schedule a Visit
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We warmly invite you to visit our campus and see our learning
                  environment firsthand. Please call us or submit an enquiry to
                  schedule a tour at your convenience. We look forward to meeting
                  your family!
                </p>
                <a
                  href="/enquiry"
                  className="inline-flex items-center gap-1.5 text-primary-600 font-semibold text-sm mt-3 hover:text-primary-700 transition-colors"
                >
                  Submit an Enquiry
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
