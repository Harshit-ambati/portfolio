import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import profileImage from "./assets/profile.jpeg";

function getCanHover() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function ProjectCard({ project, index, enableHoverFocus }) {
  const [isHovered, setIsHovered] = useState(false);

  const isActive = enableHoverFocus && isHovered;
  const showExpandedContent = !enableHoverFocus || isActive;

  return (
    <Motion.article
      layout
      onHoverStart={enableHoverFocus ? () => setIsHovered(true) : undefined}
      onHoverEnd={enableHoverFocus ? () => setIsHovered(false) : undefined}
      onFocus={enableHoverFocus ? () => setIsHovered(true) : undefined}
      onBlur={enableHoverFocus ? () => setIsHovered(false) : undefined}
      animate={
        enableHoverFocus
          ? {
              y: isActive ? -10 : 0,
              scale: isActive ? 1.045 : 1,
            }
          : {
              y: 0,
              scale: 1,
            }
      }
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`reveal-up stagger-${(index % 3) + 1} relative overflow-visible rounded-[30px] ${
        isActive ? "z-30" : "z-0"
      }`}
      style={{
        transformOrigin: "center top",
      }}
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
        className="interactive-surface relative overflow-hidden rounded-[30px] border bg-white/[0.03]"
      >
        <Motion.div
          aria-hidden="true"
          animate={{
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-none absolute inset-0 rounded-[30px] bg-gradient-to-r ${project.accent}`}
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
        <div className={`h-1 w-full bg-gradient-to-r ${project.accent}`} />

        <Motion.div
          animate={{
            filter: isActive ? "brightness(1.05)" : "brightness(0.96)",
          }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#131722] via-[#0C1018] to-[#05070B] px-5 pb-5 pt-5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.1),transparent_30%)]" />
          <Motion.div
            animate={{
              opacity: isActive ? 0.95 : 0.7,
              scale: isActive ? 1.02 : 1,
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[24px] border border-white/10 bg-black/30 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/40">{project.category}</p>
                <h4 className="mt-3 text-2xl font-black uppercase">{project.title}</h4>
              </div>
              <div className={`rounded-full bg-gradient-to-r ${project.accent} px-3 py-1 text-[10px] font-black uppercase tracking-[0.28em] text-black`}>
                {project.status}
              </div>
            </div>
          </Motion.div>
        </Motion.div>

        <div className="p-5">
          <p className="text-sm leading-7 text-white/68">{project.description}</p>

          <div className="mt-5 space-y-3">
            {project.points.map((point) => (
              <div key={point} className="flex items-start gap-3 text-sm text-white/72">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#F59E0B]" />
                <p>{point}</p>
              </div>
            ))}
          </div>

          <AnimatePresence initial={false}>
            {showExpandedContent && (
              <Motion.div
                key="expanded-content"
                initial={enableHoverFocus ? { opacity: 0, y: 12 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-5 rounded-2xl border border-[#F59E0B]/15 bg-[#F59E0B]/[0.06] p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F59E0B]">Why This Project Matters</p>
                  <p className="mt-2 text-sm leading-6 text-white/75">
                    {project.impact ?? "Shows practical execution across product design, engineering, and delivery."}
                  </p>
                </div>

                <Motion.div
                  initial={enableHoverFocus ? { opacity: 0, y: 10 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.28, delay: enableHoverFocus ? 0.03 : 0, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {project.tech.map((techItem) => (
                    <span
                      key={techItem}
                      className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white/65"
                    >
                      {techItem}
                    </span>
                  ))}
                </Motion.div>

                {(project.github || project.demo) && (
                  <Motion.div
                    initial={enableHoverFocus ? { opacity: 0, y: 10 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.28, delay: enableHoverFocus ? 0.06 : 0, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-5 flex flex-wrap gap-3"
                  >
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="magnetic-button rounded-md border border-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-white/75 transition hover:border-white/30 hover:bg-white/5 hover:text-white"
                      >
                        GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="magnetic-button rounded-md bg-[#F59E0B] px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-black transition hover:brightness-110"
                      >
                        Live Demo
                      </a>
                    )}
                  </Motion.div>
                )}
              </Motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 border-t border-white/10 pt-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/35">{project.year}</span>
          </div>
        </div>
      </Motion.div>
    </Motion.article>
  );
}

function CertificateCard({ certificate, index, enableHoverFocus }) {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = enableHoverFocus && isHovered;

  return (
    <Motion.article
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
      className={`reveal-up stagger-${(index % 3) + 1} relative overflow-visible rounded-[28px] ${
        isActive ? "z-20" : "z-0"
      }`}
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
          animate={{
            filter: isActive ? "brightness(1.05)" : "brightness(0.98)",
          }}
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

export default function Portfolio() {
  const [enableProjectHover, setEnableProjectHover] = useState(getCanHover);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateHoverMode = (event) => {
      setEnableProjectHover(event.matches);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateHoverMode);
      return () => mediaQuery.removeEventListener("change", updateHoverMode);
    }

    mediaQuery.addListener(updateHoverMode);
    return () => mediaQuery.removeListener(updateHoverMode);
  }, []);

  const navItems = ["About", "Projects", "Certificates", "Skills", "Resume", "Contact"];
  const resume = {
    title: "Harshit Ambati Resume",
    file: "/resume/harshit-ambati-resume.pdf",
    updated: "2026",
    summary:
      "Download my latest CV to view my education, technical skills, projects, and experience in one place.",
  };

  const stats = [
    { label: "Projects Built", value: "05", accent: "border-l-[#2563EB]" },
    { label: "Technologies", value: "12+", accent: "border-l-[#10B981]" },
    { label: "ML Applications", value: "04", accent: "border-l-[#F59E0B]" },
    { label: "Active Learner", value: "Consistent", accent: "border-l-[#A855F7]" },
  ];

  const highlights = [
    {
      title: "Education",
      detail: "Computer Science student building practical projects across frontend and machine learning.",
      accent: "border-l-[#2563EB]",
    },
    {
      title: "Strengths",
      detail: "Adaptable, consistent, and focused on turning ideas into polished working products.",
      accent: "border-l-[#10B981]",
    },
    {
      title: "Interests",
      detail: "React interfaces, ML applications, and product-driven development workflows.",
      accent: "border-l-[#A855F7]",
    },
  ];

  const skills = {
    languages: ["Java", "Python", "JavaScript", "C++"],
    frontend: ["React", "Tailwind CSS", "HTML", "CSS"],
    backend: ["Node.js", "FastAPI", "Flask", "Express.js"],
    tools: ["Git", "GitHub", "Streamlit", "Vercel"],
  };

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

  const projects = [
    {
      title: "Diabetes Prediction System",
      category: "Healthcare Machine Learning",
      status: "Deployed",
      year: "2025",
      description:
        "A machine learning web application that predicts the likelihood of diabetes from user health inputs through a practical and interactive interface.",
      points: [
        "Developed a complete ML pipeline covering preprocessing, feature scaling, model training, and prediction.",
        "Created a user-friendly frontend for entering medical parameters and generating quick results.",
        "Integrated saved model and scaler files to support real-time inference in deployment.",
      ],
      impact: "Helps in early detection of diabetes risk using simple health inputs.",
      tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Streamlit"],
      github: "https://github.com/Harshit-ambati/diabetes_predictor",
      demo: "https://diabetespredictor-cbbtuxlthukqy2kyn4sedc.streamlit.app/",
      accent: "from-[#F59E0B] to-[#D97706]",
    },
    {
      title: "Disease Predictor",
      category: "Disease Classification",
      status: "Deployed",
      year: "2025",
      description:
        "A machine learning application that predicts possible diseases from user-provided symptoms or health-related inputs in an accessible web interface.",
      points: [
        "Built an end-to-end ML workflow from preprocessing and model training through deployment.",
        "Trained a predictive classification model for disease prediction from symptom-based inputs.",
        "Designed an interactive UI that presents fast, simple, and usable prediction results.",
      ],
      impact: "Provides quick disease insights based on symptoms for better awareness.",
      tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Streamlit"],
      github: "https://github.com/Harshit-ambati/disease-prediction-using-SVM",
      demo: "https://disease-prediction-using-svm-ki3hhgx32kkmzg6fvcddk8.streamlit.app/",
      accent: "from-[#10B981] to-[#059669]",
    },
    {
      title: "Age & Gender Detection Web App",
      category: "Computer Vision / Deep Learning / Web App",
      status: "Deployed",
      year: "2025",
      description:
        "A full-stack computer vision application that detects faces from uploaded images or webcam snapshots and estimates age range and gender using pretrained OpenCV DNN models.",
      points: [
        "Built real-time face detection with OpenCV DNN SSD plus age-bucket and gender prediction with smoothing.",
        "Added webcam snapshot mode, image upload mode, high-contrast annotations, and low-confidence uncertainty signaling.",
        "Implemented batch folder processing, CSV export, and annotated image download for practical workflows.",
        "Made the app portable to headless Linux using opencv-python-headless with resilient error handling for model and image failures.",
      ],
      impact:
        "Demonstrates end-to-end ML engineering across inference, UI, deployment, and transparent confidence-aware user experience.",
      tech: ["Python 3.14", "OpenCV DNN", "Streamlit", "NumPy", "Pillow", "Git", "opencv-python-headless"],
      github: "https://github.com/Harshit-ambati/age_gender_detector",
      demo: "https://agegenderdetector-8kmwgjqqlhix8cheh3xw9r.streamlit.app/",
      accent: "from-[#EC4899] to-[#BE185D]",
    },
    {
      title: "Teams & Tasks",
      category: "Full Stack Web Application",
      status: "In Progress",
      year: "2026",
      description:
        "A modern project management system designed to streamline collaboration between teams, manage tasks efficiently, and track project progress in real time.",
      points: [
        "Built a role-based workflow with Admin, Project Manager, Team Leader, and Member access patterns.",
        "Designed task management flows with subtasks, collaboration, and approval-based delegation.",
        "Structured team creation across departments with an organized approval process.",
      ],
      tech: ["React (Vite)", "Node.js", "Express.js", "MongoDB", "Socket.io", "JWT Auth"],
      github: "https://github.com/Harshit-ambati/teams-tasks",
      accent: "from-[#8B5CF6] to-[#6D28D9]",
    },
    {
      title: "E-Commerce Route Optimization & Delivery Prediction System",
      category: "Machine Learning + Optimization / System Design",
      status: "Deployed",
      year: "2026",
      description:
        "A production-grade logistics system that predicts delivery time using machine learning and optimizes delivery routes using Vehicle Routing Problem algorithms.",
      points: [
        "Built ML-based delivery time prediction using Random Forest and XGBoost on engineered logistics features.",
        "Optimized delivery routes with Google OR-Tools, Haversine distance calculations, and routing logic.",
        "Added real-time traffic simulation, carbon emission estimation, and CO2 savings analysis for sustainable operations.",
        "Created an interactive dashboard with Streamlit and Folium for maps, route visibility, and operational insights.",
      ],
      impact: "Improves delivery efficiency, forecasting accuracy, and eco-friendly decision-making for e-commerce logistics.",
      tech: ["Python", "Scikit-learn", "XGBoost", "Google OR-Tools", "Streamlit", "Pandas", "NumPy", "Folium", "OSRM"],
      github: "https://github.com/srinivasguptha81/FinalOptimization#",
      accent: "from-[#06B6D4] to-[#2563EB]",
    },
  ];

  const qualities = [
    "Strong fundamentals in programming, problem solving, and project execution.",
    "Comfortable building both user-facing interfaces and ML-backed applications.",
    "Focused on clear design, practical architecture, and steady improvement.",
  ];

  return (
    <div className="min-h-screen bg-[#05070B] text-white selection:bg-[#F59E0B] selection:text-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.08),transparent_22%),radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_18%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.12),transparent_45%)] blur-3xl animate-ambient-pulse" />

      <div className="relative flex min-h-screen">
        <aside className="hidden h-screen w-72 border-r border-white/10 bg-black/60 lg:sticky lg:top-0 lg:flex lg:flex-col reveal-up">
          <div className="border-b border-white/10 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="float-soft flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-[#06111E] text-sm font-black text-[#3B82F6] shadow-[0_0_30px_rgba(37,99,235,0.12)]">
                HA
              </div>
              <div>
                <h1 className="text-2xl font-black uppercase tracking-wide">Harshit Ambati</h1>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">Portfolio</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-5">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">Explore</p>
            <nav className="space-y-1.5">
              {navItems.map((itemName, index) => (
                <a
                  key={itemName}
                  href={`#${itemName.toLowerCase()}`}
                  className={`group flex items-center gap-3 px-4 py-2.5 text-sm font-bold uppercase tracking-[0.25em] transition-all duration-300 hover:-translate-y-0.5 ${
                    index === 0
                      ? "border-l-2 border-l-[#F59E0B] bg-[#1a1308] text-[#F59E0B]"
                      : "border-l-2 border-l-transparent text-white/70 hover:border-l-[#F59E0B] hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="text-base">{index + 1}.</span>
                  {itemName}
                </a>
              ))}
            </nav>
          </div>

          <div className="px-6">
            <div className="interactive-surface rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">Current Focus</p>
              <p className="mt-3 text-sm leading-6 text-white/70">
                Building polished frontend interfaces and practical ML applications for real-world use.
              </p>
            </div>
          </div>

          <div className="mt-auto border-t border-white/10 px-6 py-4">
            <p className="text-[13px] font-extrabold uppercase tracking-[0.16em]">Open to internships and junior roles</p>
            <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/40">Frontend, React, ML projects</p>
          </div>
        </aside>

        <main className="flex-1">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-[#06080D]/85 backdrop-blur reveal-down">
            <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8">
              <div className="flex items-center gap-3">
                <div className="float-soft flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-[#06111E] text-sm font-black text-[#3B82F6] lg:hidden">
                  HA
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/35">Personal Portfolio</p>
                  <h2 className="text-xl font-black uppercase tracking-wide md:text-2xl">Harshit Ambati</h2>
                </div>
              </div>

              <a
                href="#resume"
                className="magnetic-button inline-flex items-center justify-center rounded-md border border-[#F59E0B]/35 bg-[#F59E0B]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[#FCD34D] transition hover:border-[#F59E0B]/60 hover:bg-[#F59E0B]/15"
              >
                Resume
              </a>
            </div>
          </header>

          <section id="about" className="reveal-up px-5 py-8 md:px-8 md:py-10">
            <div className="grid gap-6 border-b border-white/10 pb-8 xl:grid-cols-[1.25fr_0.75fr]">
              <div className="stagger-1">
                <div className="mb-4 flex items-center gap-3 reveal-up stagger-2">
                  <div className="h-2 w-10 bg-[#F59E0B]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/35">About Me</span>
                </div>
                <h1 className="reveal-up stagger-3 text-4xl font-black uppercase leading-none md:text-6xl">Frontend Developer and AiML Engineer</h1>
                <p className="reveal-up stagger-4 mt-4 max-w-3xl text-sm leading-7 text-white/65 md:text-base">
                  I am a Computer Science student focused on building useful products with clean interfaces and
                  practical engineering. My work sits at the intersection of modern frontend development, machine
                  learning, and product-minded execution.
                </p>
                <div className="reveal-up stagger-5 mt-6 flex flex-wrap gap-3">
                  <a
                    href="#projects"
                    className="magnetic-button rounded-md bg-[#F59E0B] px-5 py-3 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:scale-[1.02]"
                  >
                    View Projects
                  </a>
                  <a
                    href="#skills"
                    className="magnetic-button rounded-md border border-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.25em] text-white/80 transition hover:border-white/30 hover:bg-white/5"
                  >
                    Explore Skills
                  </a>
                </div>
              </div>

              <div className="reveal-up stagger-3">
                <div className="interactive-surface reveal-up stagger-3 relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#10141D] via-[#0B0E14] to-black p-6">
                  <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#F59E0B]/15 blur-2xl float-slow" />
                  <div className="absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-[#2563EB]/15 blur-2xl float-soft" />
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">Snapshot</p>
                      <h3 className="mt-3 text-2xl font-black uppercase">Building for internships and growth</h3>
                      <p className="mt-3 text-sm leading-7 text-white/65">
                        I care about polished UI, practical project depth, and creating work that communicates both
                        technical ability and product thinking.
                      </p>
                    </div>
                    <div className="float-soft h-24 w-24 overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_0_35px_rgba(245,158,11,0.12)] transition duration-500 hover:scale-[1.05] hover:shadow-[0_0_45px_rgba(245,158,11,0.18)]">
                      <img src={profileImage} alt="Harshith Ambati" className="h-full w-full object-cover object-top" />
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="interactive-surface rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">Role</p>
                      <p className="mt-2 text-xs font-bold uppercase text-white/80">Developer</p>
                    </div>
                    <div className="interactive-surface rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">Focus</p>
                      <p className="mt-2 text-xs font-bold uppercase text-white/80">React and ML</p>
                    </div>
                    <div className="interactive-surface rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">Status</p>
                      <p className="mt-2 text-xs font-bold uppercase text-[#10B981]">Open to work</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`interactive-surface reveal-up stagger-${index + 1} group border border-white/10 border-l-4 ${stat.accent} bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">{stat.label}</p>
                  <p className={`mt-5 font-black leading-none ${stat.value === "Consistent" ? "text-3xl" : "text-5xl"}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="reveal-up px-5 pb-4 md:px-8">
            <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
              <div className="interactive-surface border border-white/10 bg-white/[0.03] p-6">
                <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <h3 className="text-2xl font-black uppercase">Profile</h3>
                  <span className="text-xs uppercase tracking-[0.35em] text-white/35">Overview</span>
                </div>

                <div className="space-y-5">
                  <div className="interactive-surface border border-white/5 bg-black/50 p-5">
                    <p className="text-sm font-black uppercase tracking-[0.25em] text-[#F59E0B]">What I am working toward</p>
                    <p className="mt-4 text-sm leading-7 text-white/70">
                      I am building a portfolio that reflects real problem solving, cleaner frontend craft, and steady
                      growth as an engineer. I enjoy projects where design quality and technical depth support each other.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="interactive-surface border border-white/5 bg-black/50 p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/35">Primary Focus</p>
                      <p className="mt-3 text-lg font-extrabold uppercase">Frontend and ML products</p>
                    </div>
                    <div className="interactive-surface border border-white/5 bg-black/50 p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/35">Current Goal</p>
                      <p className="mt-3 text-lg font-extrabold uppercase">Building for internships and growth</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="interactive-surface border border-white/10 bg-white/[0.03] p-6">
                <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <h3 className="text-2xl font-black uppercase">Highlights</h3>
                  <span className="text-xs uppercase tracking-[0.35em] text-white/35">Quick view</span>
                </div>

                <div className="space-y-4 text-sm text-white/70">
                  {highlights.map((item) => (
                    <div key={item.title} className={`interactive-surface border-l-2 ${item.accent} bg-black/40 p-4`}>
                      <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">{item.title}</p>
                      <p className="mt-2 font-semibold">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="projects" className="reveal-up px-5 py-8 md:px-8">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">Selected Work</p>
                <h3 className="text-3xl font-black uppercase">Projects</h3>
              </div>
              <span className="rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#F59E0B]">
                Personal portfolio picks
              </span>
            </div>

            <div className="grid gap-6 overflow-visible xl:grid-cols-2">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  enableHoverFocus={enableProjectHover}
                />
              ))}
            </div>
          </section>

          <section id="certificates" className="reveal-up px-5 pb-8 md:px-8">
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

              <div className="grid gap-5 lg:grid-cols-3">
                {certificates.map((certificate, index) => (
                  <CertificateCard
                    key={certificate.title}
                    certificate={certificate}
                    index={index}
                    enableHoverFocus={enableProjectHover}
                  />
                ))}
              </div>
            </div>
          </section>

          <section id="skills" className="reveal-up px-5 pb-8 md:px-8">
            <div className="grid gap-6 xl:grid-cols-2">
              <div className="interactive-surface border border-white/10 bg-white/[0.03] p-6">
                <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <h3 className="text-2xl font-black uppercase">Skills</h3>
                  <span className="text-xs uppercase tracking-[0.35em] text-white/35">Tech stack</span>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  {Object.entries(skills).map(([group, items], index) => {
                    const borders = ["border-l-[#2563EB]", "border-l-[#10B981]", "border-l-[#F59E0B]", "border-l-[#A855F7]"];
                    return (
                      <div key={group} className={`interactive-surface border border-white/5 border-l-4 ${borders[index]} bg-black/40 p-4`}>
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/35">{group}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {items.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-white/75"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="interactive-surface border border-white/10 bg-white/[0.03] p-6">
                <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <h3 className="text-2xl font-black uppercase">What I bring</h3>
                  <span className="text-xs uppercase tracking-[0.35em] text-white/35">Strengths</span>
                </div>

                <div className="space-y-4 text-sm leading-7 text-white/72">
                  {qualities.map((quality) => (
                    <div key={quality} className="interactive-surface border border-white/5 bg-black/40 p-4">
                      {quality}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="resume" className="reveal-up px-5 pb-8 md:px-8">
            <div className="interactive-surface border border-white/10 bg-gradient-to-r from-[#0B0D14] to-[#10141D] p-6 md:p-8">
              <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr] xl:items-center">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">Resume</p>
                  <h3 className="mt-2 text-3xl font-black uppercase">View My CV</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68">
                    {resume.summary}
                  </p>
                </div>

                <div className="interactive-surface rounded-[28px] border border-white/10 bg-black/35 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">Document</p>
                  <h4 className="mt-3 text-2xl font-black uppercase">{resume.title}</h4>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">Format</p>
                      <p className="mt-2 text-sm font-bold uppercase text-white/80">PDF</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">Updated</p>
                      <p className="mt-2 text-sm font-bold uppercase text-white/80">{resume.updated}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={resume.file}
                      target="_blank"
                      rel="noreferrer"
                      className="magnetic-button inline-flex items-center justify-center rounded-md bg-[#F59E0B] px-6 py-3 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:brightness-110"
                    >
                      Open Resume
                    </a>
                    <a
                      href={resume.file}
                      download
                      className="magnetic-button inline-flex items-center justify-center rounded-md border border-white/10 px-6 py-3 text-xs font-black uppercase tracking-[0.25em] text-white/80 transition hover:border-white/30 hover:bg-white/5 hover:text-white"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="reveal-up px-5 pb-10 md:px-8">
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="interactive-surface border border-white/10 bg-white/[0.03] p-6">
                <div className="mb-5 border-b border-white/10 pb-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">Contact</p>
                  <h3 className="mt-2 text-3xl font-black uppercase">Let&apos;s connect</h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="interactive-surface border border-white/5 bg-black/40 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/35">Email</p>
                    <a
                      href="mailto:harshit.ambati76@gmail.com"
                      className="mt-3 block text-sm font-semibold text-white/80 transition hover:text-[#F59E0B]"
                    >
                      harshit.ambati76@gmail.com
                    </a>
                  </div>
                  <div className="interactive-surface border border-white/5 bg-black/40 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/35">Location</p>
                    <p className="mt-3 text-sm font-semibold text-white/80">India</p>
                  </div>
                  <div className="interactive-surface border border-white/5 bg-black/40 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/35">GitHub</p>
                    <a
                      href="https://github.com/Harshit-ambati"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 block text-sm font-semibold text-white/80 transition hover:text-[#F59E0B]"
                    >
                      github.com/Harshit-ambati
                    </a>
                  </div>
                  <div className="interactive-surface border border-white/5 bg-black/40 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/35">LinkedIn</p>
                    <a
                      href="https://www.linkedin.com/in/ambati-harshit-3211s?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 block text-sm font-semibold text-white/80 transition hover:text-[#F59E0B]"
                    >
                      linkedin.com/in/ambati-harshit-3211s
                    </a>
                  </div>
                </div>
              </div>

              <div className="interactive-surface border border-white/10 bg-white/[0.03] p-6">
                <div className="mb-5 border-b border-white/10 pb-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">Availability</p>
                  <h3 className="mt-2 text-3xl font-black uppercase">Open for opportunities</h3>
                </div>
                <p className="text-sm leading-7 text-white/70">
                  I am currently looking for internships, junior developer roles, and collaborative opportunities
                  where I can keep learning while contributing to real products.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <span className="rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#10B981]">
                    Internship
                  </span>
                  <span className="rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#60A5FA]">
                    Frontend
                  </span>
                  <span className="rounded-full border border-[#A855F7]/30 bg-[#A855F7]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#C084FC]">
                    Machine Learning
                  </span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
