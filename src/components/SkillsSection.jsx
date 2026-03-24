import { motion as Motion } from "framer-motion";
import { FaCode, FaCss3Alt, FaJava, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import {
  SiExpress,
  SiFastapi,
  SiFlask,
  SiFolium,
  SiGit,
  SiGithub,
  SiGooglecolab,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiJupyter,
  SiMongodb,
  SiNumpy,
  SiOpencv,
  SiPandas,
  SiScikitlearn,
  SiSocketdotio,
  SiStreamlit,
  SiTailwindcss,
  SiVercel,
  SiVite,
} from "react-icons/si";
import { TbBrain, TbMathFunction, TbMessages, TbPhoto, TbRoute, TbTargetArrow, TbUsers, TbVectorBezier2 } from "react-icons/tb";
import SectionWrapper from "./SectionWrapper";
import { staggerContainer, staggerItem } from "./portfolioMotion";

const skills = [
  {
    group: "Languages",
    accent: "border-l-[#2563EB]",
    items: [
      { name: "C", icon: FaCode, color: "text-[#A5B4FC]" },
      { name: "C++", icon: TbVectorBezier2, color: "text-[#60A5FA]" },
      { name: "Java", icon: FaJava, color: "text-[#F97316]" },
      { name: "Python", icon: FaPython, color: "text-[#FACC15]" },
      { name: "JavaScript", icon: SiJavascript, color: "text-[#FACC15]" },
    ],
  },
  {
    group: "Frontend",
    accent: "border-l-[#10B981]",
    items: [
      { name: "React", icon: FaReact, color: "text-[#38BDF8]" },
      { name: "Vite", icon: SiVite, color: "text-[#A78BFA]" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#22D3EE]" },
      { name: "HTML", icon: SiHtml5, color: "text-[#F97316]" },
      { name: "CSS", icon: FaCss3Alt, color: "text-[#60A5FA]" },
    ],
  },
  {
    group: "Backend",
    accent: "border-l-[#F59E0B]",
    items: [
      { name: "Node.js", icon: FaNodeJs, color: "text-[#22C55E]" },
      { name: "Express.js", icon: SiExpress, color: "text-white" },
      { name: "FastAPI", icon: SiFastapi, color: "text-[#10B981]" },
      { name: "Flask", icon: SiFlask, color: "text-white" },
      { name: "Socket.io", icon: SiSocketdotio, color: "text-white" },
      { name: "JWT Auth", icon: SiJsonwebtokens, color: "text-[#F59E0B]" },
    ],
  },
  {
    group: "Data and ML",
    accent: "border-l-[#A855F7]",
    items: [
      { name: "Pandas", icon: SiPandas, color: "text-[#A78BFA]" },
      { name: "NumPy", icon: SiNumpy, color: "text-[#60A5FA]" },
      { name: "Scikit-learn", icon: SiScikitlearn, color: "text-[#F97316]" },
      { name: "OpenCV", icon: SiOpencv, color: "text-[#8B5CF6]" },
      { name: "XGBoost", icon: TbMathFunction, color: "text-[#10B981]" },
      { name: "Streamlit", icon: SiStreamlit, color: "text-[#F87171]" },
    ],
  },
  {
    group: "Tools",
    accent: "border-l-[#EC4899]",
    items: [
      { name: "MongoDB", icon: SiMongodb, color: "text-[#22C55E]" },
      { name: "Git", icon: SiGit, color: "text-[#F97316]" },
      { name: "GitHub", icon: SiGithub, color: "text-white" },
      { name: "Vercel", icon: SiVercel, color: "text-white" },
      { name: "Jupyter", icon: SiJupyter, color: "text-[#F97316]" },
      { name: "Google Colab", icon: SiGooglecolab, color: "text-[#F59E0B]" },
    ],
  },
  {
    group: "Project Stack",
    accent: "border-l-[#06B6D4]",
    items: [
      { name: "Pillow", icon: TbPhoto, color: "text-[#F9A8D4]" },
      { name: "Folium", icon: SiFolium, color: "text-[#22C55E]" },
      { name: "Google OR-Tools", icon: TbRoute, color: "text-[#38BDF8]" },
      { name: "OSRM", icon: TbMathFunction, color: "text-[#FACC15]" },
    ],
  },
];

const softSkills = [
  {
    title: "Problem Solving",
    detail: "Applied across ML prediction systems, optimization logic, and debugging real-world workflow issues.",
    icon: TbBrain,
    color: "text-[#60A5FA]",
  },
  {
    title: "Collaboration Thinking",
    detail: "Reflected in role-based flows, team management ideas, and communication features inside Teams & Tasks.",
    icon: TbUsers,
    color: "text-[#22C55E]",
  },
  {
    title: "Communication",
    detail: "Focused on building clear interfaces that turn technical models into usable user experiences.",
    icon: TbMessages,
    color: "text-[#F59E0B]",
  },
  {
    title: "Execution",
    detail: "Comfortable taking projects from idea to deployment with practical iteration and product focus.",
    icon: TbTargetArrow,
    color: "text-[#A78BFA]",
  },
];

function SkillBadge({ skill }) {
  const Icon = skill.icon;

  return (
    <Motion.div
      variants={staggerItem}
      className="interactive-surface flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/40">
        <Icon className={`text-lg ${skill.color}`} />
      </div>
      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/78">{skill.name}</span>
    </Motion.div>
  );
}

export default function SkillsSection() {
  return (
    <SectionWrapper id="skills" className="px-5 pb-8 md:px-8">
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
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
            className="grid gap-5 xl:grid-cols-2"
          >
            {skills.map((group) => (
              <Motion.div
                key={group.group}
                variants={staggerItem}
                className={`interactive-surface border border-white/5 border-l-4 ${group.accent} bg-black/40 p-4`}
              >
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/35">{group.group}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {group.items.map((skill) => (
                    <SkillBadge key={skill.name} skill={skill} />
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
            className="grid gap-4"
          >
            {softSkills.map((skill) => {
              const Icon = skill.icon;

              return (
                <Motion.div
                  key={skill.title}
                  variants={staggerItem}
                  className="interactive-surface border border-white/5 bg-black/40 p-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                      <Icon className={`text-xl ${skill.color}`} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/40">{skill.title}</p>
                      <p className="mt-2 text-sm leading-6 text-white/72">{skill.detail}</p>
                    </div>
                  </div>
                </Motion.div>
              );
            })}
          </Motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
