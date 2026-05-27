import Link from "next/link";
import { Baby, TreePine, Sparkles, ArrowRight } from "lucide-react";

const programs = [
  {
    icon: Baby,
    title: "Playgroup",
    age: "1.5 – 2.5 Years",
    description:
      "A gentle introduction to school life with sensory play, music, and motor skill activities in a warm, caring environment.",
    color: "from-pink-400 to-rose-400",
    features: ["Sensory Play", "Music & Movement", "Motor Skills", "Social Interaction"],
  },
  {
    icon: TreePine,
    title: "Pre-Primary",
    age: "2.5 – 4 Years",
    description:
      "Building foundational literacy, numeracy, and social skills through structured play and guided exploration.",
    color: "from-primary-400 to-orange-400",
    features: ["Phonics & Numbers", "Art & Craft", "Story Time", "Outdoor Play"],
  },
  {
    icon: Sparkles,
    title: "Day-Care",
    age: "1.5 – 6 Years",
    description:
      "Safe, engaging day-care with trained caregivers, nutritious meals, nap time, and age-appropriate activities.",
    color: "from-secondary-400 to-teal-400",
    features: ["Full-Day Care", "Nutritious Meals", "Nap Time", "Fun Activities"],
  },
];

export default function ProgramsOverview() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Programs
          </h2>
          <p className="text-gray-600 text-lg">
            Age-appropriate programs designed to nurture every stage of your child&apos;s development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <div
                key={program.title}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Header gradient */}
                <div
                  className={`bg-gradient-to-r ${program.color} p-6 text-white`}
                >
                  <Icon className="w-10 h-10 mb-3" />
                  <h3 className="text-xl font-bold">{program.title}</h3>
                  <p className="text-sm opacity-90 mt-1">{program.age}</p>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {program.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {program.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
          >
            View Full Program Details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
