import { motion as Motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { staggerContainer, staggerItem } from "./portfolioMotion";

const educationEntries = [
  {
    institution: "Lovely Professional University",
    location: "Phagwara, Punjab",
    program: "B.Tech in Computer Science (Artificial Intelligence & Machine Learning)",
    period: "Since Aug 2023",
    scoreLabel: "CGPA",
    score: "8.4",
    accent: "from-[#2563EB] to-[#06B6D4]",
  },
  {
    institution: "Sri Chaitanya Junior College",
    location: "Vijayawada, Andhra Pradesh",
    program: "Intermediate",
    period: "Jun 2021 - Apr 2023",
    scoreLabel: "Percentage",
    score: "96.7%",
    accent: "from-[#F59E0B] to-[#D97706]",
  },
  {
    institution: "Vasavi Ideal Public School",
    location: "Tadepalligudem, Andhra Pradesh",
    program: "Matriculation (CBSE)",
    period: "Apr 2021",
    scoreLabel: "Percentage",
    score: "90%",
    accent: "from-[#10B981] to-[#059669]",
  },
];

const focusAreas = [
  {
    title: "AI and ML Specialization",
    detail: "Building a stronger foundation in machine learning concepts, model thinking, and applied AI workflows.",
    accent: "border-l-[#2563EB]",
  },
  {
    title: "Software Development",
    detail: "Strengthening problem solving, programming logic, and practical engineering through hands-on project work.",
    accent: "border-l-[#10B981]",
  },
  {
    title: "Frontend Product Building",
    detail: "Applying academic learning to modern React interfaces, responsive layouts, and user-focused implementation.",
    accent: "border-l-[#F59E0B]",
  },
];

const coursework = [
  "Data Structures",
  "Algorithms",
  "Object-Oriented Programming",
  "Database Management Systems",
  "Operating Systems",
  "Computer Networks",
  "Machine Learning",
  "Artificial Intelligence",
];

const outcomes = [
  { label: "Current Degree", value: "B.Tech CSE (AI & ML)", accent: "border-l-[#2563EB]" },
  { label: "Intermediate", value: "Sri Chaitanya", accent: "border-l-[#F59E0B]" },
  { label: "Matriculation", value: "CBSE", accent: "border-l-[#A855F7]" },
];

export default function EducationSection() {
  return (
    <SectionWrapper id="education" className="px-5 pb-8 md:px-8">
      <div className="grid items-start gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="interactive-surface self-start border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">Academic Journey</p>
              <h3 className="text-3xl font-black uppercase">Education</h3>
            </div>
            <span className="rounded-full border border-[#2563EB]/35 bg-[#2563EB]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#93C5FD]">
              Student profile
            </span>
          </div>

          <Motion.div
            variants={staggerContainer(0.08, 0.04)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-4"
          >
            {educationEntries.map((entry) => (
              <Motion.div
                key={entry.institution}
                variants={staggerItem}
                className="interactive-surface overflow-hidden rounded-[28px] border border-white/10 bg-black/35"
              >
                <div className={`h-1 w-full bg-gradient-to-r ${entry.accent}`} />
                <div className="p-4">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/35">{entry.location}</p>
                      <h4 className="mt-2 text-xl font-black uppercase">{entry.institution}</h4>
                      <p className="mt-2 text-sm leading-6 text-white/72">{entry.program}</p>
                      {entry.score ? (
                        <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-[#86EFAC]">
                          {entry.scoreLabel}: {entry.score}
                        </p>
                      ) : null}
                    </div>
                    <span className="rounded-full bg-[#F59E0B]/12 px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-[#FCD34D]">
                      {entry.period}
                    </span>
                  </div>
                </div>
              </Motion.div>
            ))}

            <Motion.div variants={staggerItem} className="grid gap-4 md:grid-cols-3">
              {outcomes.map((item) => (
                <div
                  key={item.label}
                  className={`interactive-surface border border-white/5 border-l-4 ${item.accent} bg-black/40 p-4`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/35">{item.label}</p>
                  <p className="mt-3 text-sm font-bold uppercase leading-6 text-white/82">{item.value}</p>
                </div>
              ))}
            </Motion.div>
          </Motion.div>
        </div>

        <div className="interactive-surface border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
            <h3 className="text-2xl font-black uppercase">Focus Areas</h3>
            <span className="text-xs uppercase tracking-[0.35em] text-white/35">Coursework</span>
          </div>

          <Motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="space-y-5"
          >
            <div className="space-y-3">
              {focusAreas.map((area) => (
                <Motion.div
                  key={area.title}
                  variants={staggerItem}
                  className={`interactive-surface border border-white/5 border-l-4 ${area.accent} bg-black/40 p-4`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/35">{area.title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/72">{area.detail}</p>
                </Motion.div>
              ))}
            </div>

            <Motion.div variants={staggerItem} className="interactive-surface border border-white/5 bg-black/40 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/35">Relevant Coursework</p>
                <span className="text-[10px] uppercase tracking-[0.28em] text-white/30">Academic base</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {coursework.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/72"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Motion.div>
          </Motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
