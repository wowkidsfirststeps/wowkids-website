import Link from "next/link";
import { Sparkles, Shield, Heart } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-secondary-200/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent-200/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Welcome to WowKids First Steps
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Where Little Minds
              <span className="block text-primary-500">Take Big Leaps</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We provide a warm, nurturing environment where children aged 1.5–6 years
              discover the joy of learning through play, creativity, and guided exploration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/enquiry"
                className="inline-flex items-center justify-center gap-2 bg-primary-500 text-white px-8 py-3.5 rounded-xl text-base font-semibold shadow-lg shadow-primary-500/25 hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                Enquire Now
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-3.5 rounded-xl text-base font-semibold border-2 border-primary-200 hover:border-primary-400 hover:bg-primary-50 transition-all duration-200"
              >
                Our Programs
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4 text-secondary-500" />
                Safe &amp; Secure
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Heart className="w-4 h-4 text-red-400" />
                Loving Care
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Sparkles className="w-4 h-4 text-accent-500" />
                Play-Based Learning
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center shadow-2xl shadow-primary-300/30">
                <img
                  src="/Logo.png"
                  alt="WowKids First Steps"
                  className="w-64 h-64 rounded-full object-cover shadow-inner"
                />
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-2 text-sm font-semibold text-primary-600 border border-primary-100">
                ⭐ Top Rated
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-4 py-2 text-sm font-semibold text-secondary-600 border border-secondary-100">
                🎓 Expert Teachers
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
