import { Heart, Target, Eye, Award, Users, BookOpen } from "lucide-react";

const highlights = [
  {
    icon: Users,
    title: "Experienced Educators",
    description:
      "Our teachers are carefully selected, trained, and passionate about early childhood education. Each educator brings warmth, patience, and expertise to the classroom.",
  },
  {
    icon: BookOpen,
    title: "Research-Based Curriculum",
    description:
      "We follow a play-based, child-centered curriculum that balances structured learning with free exploration, ensuring holistic development across all domains.",
  },
  {
    icon: Heart,
    title: "Nurturing Environment",
    description:
      "Every child is treated with respect and kindness. We create a home-like atmosphere where children feel safe, valued, and confident to express themselves.",
  },
  {
    icon: Award,
    title: "Focus on Life Skills",
    description:
      "Beyond academics, we emphasize social skills, emotional intelligence, independence, and a lifelong love for learning.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About WowKids First Steps
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            At WowKids First Steps, we believe that early childhood is the most
            important period of human development. Our mission is to provide a
            foundation that helps every child blossom into a confident, curious,
            and compassionate individual.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 p-8 rounded-2xl border border-primary-200/50">
              <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To provide a safe, loving, and stimulating environment where every child
                discovers the joy of learning. We nurture each child&apos;s unique potential
                through play-based education, fostering curiosity, creativity, and
                confidence that will serve as the foundation for lifelong success.
              </p>
            </div>

            <div className="bg-gradient-to-br from-secondary-50 to-secondary-100/50 p-8 rounded-2xl border border-secondary-200/50">
              <div className="w-12 h-12 bg-secondary-500 rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To be a leading preschool that sets the standard for early childhood
                education in Hyderabad — where children are happy, parents are confident,
                and every child&apos;s first steps toward education are filled with wonder,
                discovery, and joy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Philosophy</h2>
            <p className="text-gray-600 text-lg">
              Everything we do is guided by a simple belief — children learn best when
              they feel loved, safe, and free to explore.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-primary-100 transition-all duration-300"
                >
                  <Icon className="w-8 h-8 text-primary-500 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Why Parents Choose WowKids
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "🌿 Safe & Loving Environment",
                a: "Our premises are child-proofed, clean, and designed to make children feel at home. All staff are trained in child safety and first aid.",
              },
              {
                q: "👩‍🏫 Low Teacher-Student Ratio",
                a: "We maintain small class sizes to ensure every child receives individual attention and care tailored to their unique needs.",
              },
              {
                q: "🎨 Holistic Development",
                a: "Our curriculum covers cognitive, social, emotional, physical, and creative development through a perfect blend of structured and unstructured activities.",
              },
              {
                q: "📞 Regular Parent Updates",
                a: "We believe in strong parent-teacher partnerships. You'll receive regular updates, photos, and progress reports about your child's journey.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group bg-gray-50 rounded-xl p-4 cursor-pointer hover:bg-primary-50/50 transition-colors"
              >
                <summary className="font-semibold text-gray-900 list-none flex items-center justify-between">
                  {item.q}
                  <span className="text-primary-500 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed pl-2">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
