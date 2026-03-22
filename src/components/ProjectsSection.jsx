import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { staggerContainer, staggerItem } from "./portfolioMotion";

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

function getCanHover() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function ProjectCard({ project, enableHoverFocus }) {
  const [isHovered, setIsHovered] = useState(false);

  const isActive = enableHoverFocus && isHovered;
  const showExpandedContent = !enableHoverFocus || isActive;

  return (
    <Motion.article
      variants={staggerItem}
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
      className={`relative overflow-visible rounded-[30px] ${isActive ? "z-30" : "z-0"}`}
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
        className="interactive-surface relative overflow-hidden rounded-[30px] border bg-white/[0.03]"
      >
        <Motion.div
          aria-hidden="true"
          animate={{ opacity: isActive ? 1 : 0 }}
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
          animate={{ filter: isActive ? "brightness(1.05)" : "brightness(0.96)" }}
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

export default function ProjectsSection() {
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

  return (
    <SectionWrapper id="projects" className="px-5 py-8 md:px-8">
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">Selected Work</p>
          <h3 className="text-3xl font-black uppercase">Projects</h3>
        </div>
        <span className="rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#F59E0B]">
          Personal portfolio picks
        </span>
      </div>

      <Motion.div
        variants={staggerContainer(0.1, 0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid gap-6 overflow-visible xl:grid-cols-2"
      >
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} enableHoverFocus={enableProjectHover} />
        ))}
      </Motion.div>
    </SectionWrapper>
  );
}
