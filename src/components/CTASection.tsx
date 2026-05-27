import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary-600 to-primary-700 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 text-center relative">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Give Your Child the Best Start?
        </h2>
        <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">
          Take the first step toward a bright future. Schedule a visit or submit an
          enquiry — we&apos;d love to meet your family!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/enquiry"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-3.5 rounded-xl text-base font-semibold shadow-lg hover:bg-primary-50 hover:-translate-y-0.5 transition-all duration-200"
          >
            Enquire Now
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="tel:+919392669346"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-200"
          >
            <Phone className="w-4 h-4" />
            Call Us
          </a>
        </div>
      </div>
    </section>
  );
}
