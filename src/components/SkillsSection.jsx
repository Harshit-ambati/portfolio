import { motion as Motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { staggerContainer, staggerItem } from "./portfolioMotion";

const skills = {
  languages: ["Java", "Python", "JavaScript", "C++"],
  frontend: ["React", "Tailwind CSS", "HTML", "CSS"],
  backend: ["Node.js", "FastAPI", "Flask", "Express.js"],
  tools: ["Git", "GitHub", "Streamlit", "Vercel"],
};

const qualities = [
  "Strong fundamentals in programming, problem solving, and project execution.",
  "Comfortable building both user-facing interfaces and ML-backed applications.",
  "Focused on clear design, practical architecture, and steady improvement.",
];

const borders = ["border-l-[#2563EB]", "border-l-[#10B981]", "border-l-[#F59E0B]", "border-l-[#A855F7]"];

export default function SkillsSection() {
  return (
    <SectionWrapper id="skills" className="px-5 pb-8 md:px-8">
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="interactive-surface border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
            <h3 className="text-2xl font-black uppercase">Skills</h3>
            <span className="text-xs uppercase tracking-[0.35em] text-white/35">Tech stack</span>
          </div>

          <Motion.div
            variants={staggerContainer(0.08, 0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-5 md:grid-cols-2"
          >
            {Object.entries(skills).map(([group, items], index) => (
              <Motion.div
                key={group}
                variants={staggerItem}
                className={`interactive-surface border border-white/5 border-l-4 ${borders[index]} bg-black/40 p-4`}
              >
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/35">{group}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <Motion.span
                      key={skill}
                      variants={staggerItem}
                      className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-white/75"
                    >
                      {skill}
                    </Motion.span>
                  ))}
                </div>
              </Motion.div>
            ))}
          </Motion.div>
        </div>

        <div className="interactive-surface border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
            <h3 className="text-2xl font-black uppercase">What I bring</h3>
            <span className="text-xs uppercase tracking-[0.35em] text-white/35">Strengths</span>
          </div>

          <Motion.div
            variants={staggerContainer(0.09, 0.04)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="space-y-4 text-sm leading-7 text-white/72"
          >
            {qualities.map((quality) => (
              <Motion.div key={quality} variants={staggerItem} className="interactive-surface border border-white/5 bg-black/40 p-4">
                {quality}
              </Motion.div>
            ))}
          </Motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
