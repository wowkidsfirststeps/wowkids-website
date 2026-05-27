import { Heart, BookOpen, Users, Lightbulb, Sparkles, ShieldCheck } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Love & Care",
    description:
      "Every child is unique and deserves to be nurtured with warmth, patience, and unconditional love in a safe environment.",
    color: "text-red-500 bg-red-50",
  },
  {
    icon: BookOpen,
    title: "Early Learning",
    description:
      "Research-based curriculum designed to stimulate cognitive, social, and emotional development during the crucial early years.",
    color: "text-blue-500 bg-blue-50",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We foster strong partnerships between teachers, parents, and the community to create a supportive learning ecosystem.",
    color: "text-green-500 bg-green-50",
  },
  {
    icon: Lightbulb,
    title: "Creativity",
    description:
      "Encouraging imaginative thinking through art, music, storytelling, and open-ended play that sparks curiosity.",
    color: "text-yellow-500 bg-yellow-50",
  },
  {
    icon: Sparkles,
    title: "Discovery",
    description:
      "Hands-on exploration and sensory-rich experiences that help children make sense of the world around them.",
    color: "text-purple-500 bg-purple-50",
  },
  {
    icon: ShieldCheck,
    title: "Safety First",
    description:
      "Child-safe infrastructure, trained staff, and strict safety protocols to ensure peace of mind for every parent.",
    color: "text-teal-500 bg-teal-50",
  },
];

export default function ValuesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-gray-600 text-lg">
            At WowKids First Steps, we believe in providing a foundation that helps
            every child grow into their fullest potential.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="group p-6 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-100/50 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${value.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
