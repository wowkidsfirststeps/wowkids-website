import { Baby, TreePine, Sparkles, Clock, Users, BookText, Music, Palette, Shield } from "lucide-react";
import Link from "next/link";

const programsData = [
  {
    id: "playgroup",
    icon: Baby,
    title: "Playgroup",
    age: "1.5 – 2.5 Years",
    ratio: "1:8",
    timing: "9:00 AM – 12:00 PM",
    description:
      "Our Playgroup program is a gentle, loving introduction to the world of school. At this stage, children learn primarily through sensory experiences, music, movement, and guided play. Our warm and patient caregivers ensure a smooth transition from home to school.",
    highlights: [
      "Sensory play with safe, age-appropriate materials",
      "Music & movement sessions for gross motor development",
      "Simple art activities for fine motor skills",
      "Story time with picture books and puppets",
      "Social interaction through group play",
      "Potty training support",
    ],
  },
  {
    id: "preprimary",
    icon: TreePine,
    title: "Pre-Primary",
    age: "2.5 – 4 Years",
    ratio: "1:10",
    timing: "9:00 AM – 12:30 PM",
    description:
      "The Pre-Primary program is designed to build a strong foundation for formal schooling. Children develop early literacy and numeracy skills through hands-on activities, while also growing socially and emotionally in a structured yet playful environment.",
    highlights: [
      "Phonics-based early reading program",
      "Number recognition and basic math concepts",
      "Art & craft for creative expression",
      "Show-and-tell to build confidence",
      "Outdoor play and nature exploration",
      "Basic life skills independence training",
    ],
  },
  {
    id: "daycare",
    icon: Sparkles,
    title: "Day-Care",
    age: "1.5 – 6 Years",
    ratio: "1:8",
    timing: "8:00 AM – 6:30 PM",
    description:
      "Our Day-Care program provides a safe, engaging, and loving environment for children while parents are at work. With a structured routine that includes learning activities, free play, meals, and rest, children thrive under the care of our trained staff.",
    highlights: [
      "Full-day care with flexible timings",
      "Nutritious breakfast, lunch & evening snacks",
      "Supervised nap/rest time",
      "Age-appropriate learning activities",
      "Indoor & outdoor play areas",
      "Trained & caring staff",
    ],
  },
];

const curriculumHighlights = [
  {
    icon: BookText,
    title: "Language & Literacy",
    description: "Storytelling, phonics, vocabulary building, and pre-writing skills through engaging activities.",
  },
  {
    icon: Palette,
    title: "Creative Arts",
    description: "Drawing, painting, craft, clay modeling, and role-play that spark imagination and self-expression.",
  },
  {
    icon: Music,
    title: "Music & Movement",
    description: "Songs, rhymes, dance, and yoga that develop rhythm, coordination, and body awareness.",
  },
  {
    icon: Shield,
    title: "Social & Emotional",
    description: "Sharing, turn-taking, empathy building, and emotional regulation through guided group activities.",
  },
];

export default function ProgramsPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Programs
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the perfect program for your child. Each of our offerings is
            thoughtfully designed to match your child&apos;s developmental stage and unique needs.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          {programsData.map((program, idx) => {
            const Icon = program.icon;
            return (
              <div
                key={program.id}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  idx % 2 === 1 ? "md:grid-flow-dense" : ""
                }`}
              >
                <div className={idx % 2 === 1 ? "md:col-start-2" : ""}>
                  <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    <Icon className="w-4 h-4" />
                    {program.age}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {program.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {program.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg">
                      <Users className="w-4 h-4 text-primary-500" />
                      Ratio: {program.ratio}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg">
                      <Clock className="w-4 h-4 text-primary-500" />
                      {program.timing}
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {program.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary-500 mt-2 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/enquiry"
                    className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-primary-600 transition-colors shadow-sm"
                  >
                    Enquire About {program.title}
                    <span>→</span>
                  </Link>
                </div>

                <div className="hidden md:flex justify-center">
                  <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center border border-primary-200/50">
                    <Icon className="w-24 h-24 text-primary-500/60" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Curriculum Approach</h2>
            <p className="text-gray-600 text-lg">
              A well-rounded curriculum that nurtures every aspect of your child&apos;s development.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {curriculumHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-primary-100 transition-all duration-300"
                >
                  <Icon className="w-10 h-10 text-primary-500 mb-4" />
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

      {/* CTA */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Not Sure Which Program Fits Best?
          </h2>
          <p className="text-primary-100 text-lg mb-8">
            Contact us for a free consultation. We&apos;ll help you find the perfect program
            for your child&apos;s age and needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-primary-50 transition-colors shadow-lg"
          >
            Get in Touch
            <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
