import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { staggerContainer, staggerItem } from "./portfolioMotion";

const certificates = [
  {
    title: "Machine Learning with Data Science",
    issuer: "Cipher Schools",
    year: "2025",
    detail:
      "Built a strong foundation in machine learning and data science, focusing on real-world model building and data-driven problem solving.",
    accent: "from-[#F59E0B] to-[#D97706]",
    link: "/certificates/ambati-harshit-machine-learning-data-science.pdf",
  },
  {
    title: "ChatGPT-4 Prompt Engineering: ChatGPT, Generative AI & LLM",
    issuer: "Infosys Springboard",
    year: "2025",
    detail:
      "Developed practical skills in prompt engineering and working with large language models for real-world AI applications.",
    accent: "from-[#2563EB] to-[#06B6D4]",
    link: "/certificates/infosys-springboard-chatgpt-4-prompt-engineering.pdf",
  },
  {
    title: "Build Generative AI Apps and Solutions with No-Code Tools",
    issuer: "Infosys Springboard",
    year: "2025",
    detail:
      "Showcases practical exposure to building generative AI workflows and app solutions using no-code tools for faster prototyping and delivery.",
    accent: "from-[#10B981] to-[#059669]",
    link: "/certificates/infosys-springboard-build-generative-ai-no-code-tools.pdf",
  },
  {
    title: "Principles of Generative AI Certification",
    issuer: "Infosys Springboard",
    year: "2025",
    detail:
      "Covers foundational concepts behind generative AI, including core principles, model behavior, and practical understanding of modern AI systems.",
    accent: "from-[#8B5CF6] to-[#6D28D9]",
    link: "/certificates/infosys-springboard-principles-of-generative-ai.pdf",
  },
  {
    title: "Graphic Design",
    issuer: "Udemy",
    year: "2024",
    detail:
      "Reflects foundational graphic design learning across visual composition, design principles, and creative communication for digital content.",
    accent: "from-[#EC4899] to-[#BE185D]",
    link: "/certificates/udemy-graphic-design.pdf",
  },
];

function getCanHover() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function CertificateCard({ certificate, enableHoverFocus }) {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = enableHoverFocus && isHovered;

  return (
    <Motion.article
      variants={staggerItem}
      onHoverStart={enableHoverFocus ? () => setIsHovered(true) : undefined}
      onHoverEnd={enableHoverFocus ? () => setIsHovered(false) : undefined}
      onFocus={enableHoverFocus ? () => setIsHovered(true) : undefined}
      onBlur={enableHoverFocus ? () => setIsHovered(false) : undefined}
      animate={
        enableHoverFocus
          ? {
              y: isActive ? -10 : 0,
              scale: isActive ? 1.03 : 1,
            }
          : {
              y: 0,
              scale: 1,
            }
      }
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-visible rounded-[28px] ${isActive ? "z-20" : "z-0"}`}
      style={{ transformOrigin: "center top" }}
      tabIndex={enableHoverFocus ? 0 : undefined}
    >
      <Motion.div
        animate={{
          boxShadow: isActive
            ? "0 34px 72px rgba(0, 0, 0, 0.44), 0 0 0 1px rgba(255, 255, 255, 0.06)"
            : "0 18px 40px rgba(0, 0, 0, 0.16)",
          borderColor: isActive ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.1)",
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="interactive-surface relative flex h-full flex-col overflow-hidden rounded-[28px] border bg-black/40"
      >
        <Motion.div
          aria-hidden="true"
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-r ${certificate.accent}`}
          style={{
            inset: "-1px",
            padding: "2px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            filter: "blur(3px)",
          }}
        />
        <div className={`h-1 w-full bg-gradient-to-r ${certificate.accent}`} />
        <Motion.div
          animate={{ filter: isActive ? "brightness(1.05)" : "brightness(0.98)" }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="flex h-full flex-col p-5"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/35">{certificate.issuer}</p>
          <h4 className="mt-3 text-2xl font-black uppercase">{certificate.title}</h4>
          <p className="mt-4 text-sm leading-7 text-white/68">{certificate.detail}</p>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-4">
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-[#F59E0B]">{certificate.year}</span>
            <a
              href={certificate.link}
              target="_blank"
              rel="noreferrer"
              className="magnetic-button rounded-md border border-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/75 transition hover:border-white/30 hover:bg-white/5 hover:text-white"
            >
              View Certificate
            </a>
          </div>
        </Motion.div>
      </Motion.div>
    </Motion.article>
  );
}

export default function CertificatesSection() {
  const [enableHoverFocus, setEnableHoverFocus] = useState(getCanHover);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateHoverMode = (event) => {
      setEnableHoverFocus(event.matches);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateHoverMode);
      return () => mediaQuery.removeEventListener("change", updateHoverMode);
    }

    mediaQuery.addListener(updateHoverMode);
    return () => mediaQuery.removeListener(updateHoverMode);
  }, []);

  return (
    <SectionWrapper id="certificates" className="px-5 pb-8 md:px-8">
      <div className="interactive-surface border border-white/10 bg-white/[0.03] p-6">
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">Credentials</p>
            <h3 className="text-3xl font-black uppercase">Certificates</h3>
          </div>
          <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-white/55">
            Verified learning
          </span>
        </div>

        <Motion.div
          variants={staggerContainer(0.08, 0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="grid gap-5 lg:grid-cols-3"
        >
          {certificates.map((certificate) => (
            <CertificateCard key={certificate.title} certificate={certificate} enableHoverFocus={enableHoverFocus} />
          ))}
        </Motion.div>
      </div>
    </SectionWrapper>
  );
}
