import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  motion as Motion,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import profileImage from "./assets/profile.jpeg";
import SectionSkeleton from "./components/SectionSkeleton";
import { staggerContainer, staggerItem } from "./components/portfolioMotion";

const ProjectsSection = lazy(() => import("./components/ProjectsSection"));
const CertificatesSection = lazy(() => import("./components/CertificatesSection"));
const EducationSection = lazy(() => import("./components/EducationSection"));
const SkillsSection = lazy(() => import("./components/SkillsSection"));
const ResumeSection = lazy(() => import("./components/ResumeSection"));
const ContactSection = lazy(() => import("./components/ContactSection"));

const navItems = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certificates", label: "Certificates" },
  { id: "education", label: "Education" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

const stats = [
  { label: "Projects Built", value: "05", accent: "border-l-[#2563EB]" },
  { label: "Technologies", value: "12+", accent: "border-l-[#10B981]" },
  { label: "ML Applications", value: "04", accent: "border-l-[#F59E0B]" },
  { label: "Active Learner", value: "Consistent", accent: "border-l-[#A855F7]" },
];

const highlights = [
  {
    title: "Education",
    detail: "B.Tech CSE student at Lovely Professional University specializing in Artificial Intelligence and Machine Learning.",
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

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function mix(start, end, progress) {
  return start + (end - start) * progress;
}

function easeOutCubic(value) {
  return 1 - (1 - value) ** 3;
}

function SnapshotCard({ className = "" }) {
  return (
    <div
      className={`interactive-surface relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#10141D] via-[#0B0E14] to-black p-6 ${className}`}
    >
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
          <img
            src={profileImage}
            alt="Harshith Ambati"
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover object-top"
          />
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
  );
}

export default function Portfolio() {
  const prefersReducedMotion = useReducedMotion();
  const snapshotTargetRef = useRef(null);
  const headerRef = useRef(null);
  const [activeSection, setActiveSection] = useState("about");
  const [introEnabled, setIntroEnabled] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const [introDismissed, setIntroDismissed] = useState(false);
  const [viewportSize, setViewportSize] = useState(() => {
    if (typeof window === "undefined") {
      return { width: 0, height: 0 };
    }

    return { width: window.innerWidth, height: window.innerHeight };
  });
  const { scrollY } = useScroll();

  useEffect(() => {
    const updateViewport = () => {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateActiveSection = () => {
      frameId = 0;

      const nextActiveSection = navItems.reduce((currentId, item) => {
        const section = document.getElementById(item.id);

        if (!section) {
          return currentId;
        }

        const { top } = section.getBoundingClientRect();
        return top <= 180 ? item.id : currentId;
      }, "about");

      setActiveSection((current) => (current === nextActiveSection ? current : nextActiveSection));
    };

    const scheduleUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    const hasHash = window.location.hash.length > 1;
    const introSessionKey = "portfolio-intro-seen";
    const hasSeenIntro = window.sessionStorage.getItem(introSessionKey) === "true";
    const shouldPlayIntro = !prefersReducedMotion && !hasHash && !hasSeenIntro;
    let frameOne = 0;
    let frameTwo = 0;

    const finalizeIntroState = () => {
      const shouldEnable = shouldPlayIntro && window.scrollY < 24;
      setIntroEnabled(shouldEnable);
      setIntroReady(true);
      setIntroDismissed(!shouldEnable);

      if (shouldPlayIntro) {
        window.sessionStorage.setItem(introSessionKey, "true");
      }
    };

    if ("scrollRestoration" in window.history) {
      const previous = window.history.scrollRestoration;
      window.history.scrollRestoration = hasHash ? previous : "manual";

      if (shouldPlayIntro) {
        window.scrollTo(0, 0);
      }

      frameOne = window.requestAnimationFrame(() => {
        frameTwo = window.requestAnimationFrame(finalizeIntroState);
      });

      return () => {
        window.cancelAnimationFrame(frameOne);
        window.cancelAnimationFrame(frameTwo);
        window.history.scrollRestoration = previous;
      };
    }

    if (shouldPlayIntro) {
      window.scrollTo(0, 0);
    }

    frameOne = window.requestAnimationFrame(() => {
      frameTwo = window.requestAnimationFrame(finalizeIntroState);
    });

    return () => {
      window.cancelAnimationFrame(frameOne);
      window.cancelAnimationFrame(frameTwo);
    };
  }, [prefersReducedMotion]);

  const isMobile = viewportSize.width > 0 && viewportSize.width < 768;
  const introDistance = isMobile ? 160 : 210;
  const introProgress = useTransform(scrollY, [0, introDistance], [0, 1]);
  const easedIntroProgress = useTransform(introProgress, easeOutCubic);
  const heroTextOpacity = useTransform(easedIntroProgress, [0, 0.55, 1], [0.14, 0.45, 1]);
  const heroTextY = useTransform(easedIntroProgress, [0, 1], [28, 0]);
  const heroTextBlur = useTransform(easedIntroProgress, [0, 1], [8, 0]);
  const heroStatsOpacity = useTransform(easedIntroProgress, [0, 0.45, 1], [0.12, 0.4, 1]);
  const introOverlayOpacity = useTransform(easedIntroProgress, [0, 0.72, 1], [0.58, 0.18, 0]);
  const introOverlayBlur = useTransform(easedIntroProgress, [0, 1], [10, 0]);
  const introCardOpacity = useTransform(easedIntroProgress, [0, 0.82, 1], [1, 0.94, 0]);
  const settledCardOpacity = useTransform(easedIntroProgress, [0, 0.62, 1], [0, 0.12, 1]);
  const introCardShadow = useTransform(easedIntroProgress, [0, 1], [0.32, 0.14]);
  const introCardScale = useTransform(easedIntroProgress, [0, 1], [1, 0.985]);
  const heroTextFilter = useTransform(heroTextBlur, (value) => `blur(${value}px)`);
  const introOverlayFilter = useTransform(introOverlayBlur, (value) => `blur(${value}px)`);
  const introCardBoxShadow = useTransform(
    introCardShadow,
    (value) => `0 40px 120px rgba(0, 0, 0, ${value}), 0 0 0 1px rgba(255,255,255,0.07)`
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!introEnabled || introDismissed) {
      return;
    }

    if (latest > introDistance * 0.92) {
      setIntroDismissed(true);
      setIntroEnabled(false);
    }
  });

  const introCardLeft = useTransform(scrollY, (latest) => {
    const targetRect = snapshotTargetRef.current?.getBoundingClientRect();

    if (!targetRect || viewportSize.width === 0) {
      return 0;
    }

    const progress = easeOutCubic(clamp(latest / introDistance, 0, 1));
    const expandedWidth = clamp(
      Math.max(targetRect.width * (isMobile ? 1.04 : 1.18), 320),
      Math.min(viewportSize.width - 24, isMobile ? viewportSize.width - 24 : 480),
      viewportSize.width - 16
    );
    const startLeft = (viewportSize.width - expandedWidth) / 2;

    return mix(startLeft, targetRect.left, progress);
  });

  const introCardTop = useTransform(scrollY, (latest) => {
    const targetRect = snapshotTargetRef.current?.getBoundingClientRect();
    const headerRect = headerRef.current?.getBoundingClientRect();

    if (!targetRect || viewportSize.height === 0) {
      return 0;
    }

    const progress = easeOutCubic(clamp(latest / introDistance, 0, 1));
    const safeTop = (headerRect?.height ?? 72) + 18;
    const expandedWidth = clamp(
      Math.max(targetRect.width * (isMobile ? 1.04 : 1.18), 320),
      Math.min(viewportSize.width - 24, isMobile ? viewportSize.width - 24 : 480),
      viewportSize.width - 16
    );
    const aspectRatio = targetRect.height / targetRect.width || 1;
    const expandedHeight = expandedWidth * aspectRatio;
    const startTop = Math.max((viewportSize.height - expandedHeight) / 2, safeTop);
    const endTop = Math.max(targetRect.top, safeTop);

    return mix(startTop, endTop, progress);
  });

  const introCardWidth = useTransform(scrollY, (latest) => {
    const targetRect = snapshotTargetRef.current?.getBoundingClientRect();

    if (!targetRect || viewportSize.width === 0) {
      return isMobile ? viewportSize.width - 24 : 420;
    }

    const progress = easeOutCubic(clamp(latest / introDistance, 0, 1));
    const expandedWidth = clamp(
      Math.max(targetRect.width * (isMobile ? 1.04 : 1.18), 320),
      Math.min(viewportSize.width - 24, isMobile ? viewportSize.width - 24 : 480),
      viewportSize.width - 16
    );

    return mix(expandedWidth, targetRect.width, progress);
  });

  const introCardHeight = useTransform(scrollY, (latest) => {
    const targetRect = snapshotTargetRef.current?.getBoundingClientRect();

    if (!targetRect || viewportSize.width === 0) {
      return isMobile ? 320 : 360;
    }

    const progress = easeOutCubic(clamp(latest / introDistance, 0, 1));
    const expandedWidth = clamp(
      Math.max(targetRect.width * (isMobile ? 1.04 : 1.18), 320),
      Math.min(viewportSize.width - 24, isMobile ? viewportSize.width - 24 : 480),
      viewportSize.width - 16
    );
    const aspectRatio = targetRect.height / targetRect.width || 1;
    const expandedHeight = expandedWidth * aspectRatio;

    return mix(expandedHeight, targetRect.height, progress);
  });

  const showIntroLayer = introReady && introEnabled && !introDismissed;

  return (
    <div className="min-h-screen bg-[#05070B] text-white selection:bg-[#F59E0B] selection:text-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.08),transparent_22%),radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_18%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.12),transparent_45%)] blur-3xl animate-ambient-pulse" />

      {showIntroLayer && (
        <>
          <Motion.div
            aria-hidden="true"
            style={{
              opacity: introOverlayOpacity,
              backdropFilter: introOverlayFilter,
            }}
            className="pointer-events-none fixed inset-0 z-30 bg-[rgba(3,6,12,0.72)]"
          />
          <Motion.div
            aria-hidden="true"
            style={{
              left: introCardLeft,
              top: introCardTop,
              width: introCardWidth,
              height: introCardHeight,
              opacity: introCardOpacity,
              boxShadow: introCardBoxShadow,
              scale: introCardScale,
            }}
            className="pointer-events-none fixed z-40"
          >
            <SnapshotCard className="h-full" />
          </Motion.div>
        </>
      )}

      <div className="relative flex min-h-screen">
        <Motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="hidden h-screen w-72 border-r border-white/10 bg-black/60 lg:sticky lg:top-0 lg:flex lg:flex-col"
        >
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
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`group flex items-center gap-3 px-4 py-2.5 text-sm font-bold uppercase tracking-[0.25em] transition-all duration-300 hover:-translate-y-0.5 ${
                      isActive
                        ? "border-l-2 border-l-[#F59E0B] bg-[#1a1308] text-[#F59E0B]"
                        : "border-l-2 border-l-transparent text-white/70 hover:border-l-[#F59E0B] hover:bg-white/5 hover:text-white"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className="text-base">{index + 1}.</span>
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto border-t border-white/10 px-6 py-4">
            <p className="text-[13px] font-extrabold uppercase tracking-[0.16em]">Open to internships and junior roles</p>
            <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/40">Frontend, React, ML projects</p>
          </div>
        </Motion.aside>

        <main className="flex-1">
          <Motion.header
            ref={headerRef}
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="sticky top-0 z-50 border-b border-white/10 bg-[#06080D]/85 backdrop-blur"
          >
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
          </Motion.header>

          <section id="about" className="px-5 py-8 md:px-8 md:py-10">
            <div className="grid gap-6 border-b border-white/10 pb-8 xl:grid-cols-[1.25fr_0.75fr] xl:items-center">
              <Motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer(0.08, 0.08)}
                style={
                  showIntroLayer
                    ? {
                        opacity: heroTextOpacity,
                        y: heroTextY,
                        filter: heroTextFilter,
                      }
                    : undefined
                }
              >
                <Motion.div variants={staggerItem} className="mb-4 flex items-center gap-3">
                  <div className="h-2 w-10 bg-[#F59E0B]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/35">About Me</span>
                </Motion.div>
                <Motion.h1 variants={staggerItem} className="text-4xl font-black uppercase leading-none md:text-6xl">
                  Frontend Developer and AI ML Engineer
                </Motion.h1>
                <Motion.p variants={staggerItem} className="mt-4 max-w-3xl text-sm leading-7 text-white/65 md:text-base">
                  I am a B.Tech Computer Science student at Lovely Professional University, specializing in
                  Artificial Intelligence and Machine Learning. My work sits at the intersection of modern frontend
                  development, machine learning, and product-minded execution.
                </Motion.p>
                <Motion.div variants={staggerItem} className="mt-6 flex flex-wrap gap-3">
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
                </Motion.div>
              </Motion.div>

              <div ref={snapshotTargetRef} className="relative">
                <Motion.div
                  style={showIntroLayer ? { opacity: settledCardOpacity } : undefined}
                  className={showIntroLayer ? "will-change-[opacity]" : ""}
                >
                  <SnapshotCard />
                </Motion.div>
              </div>
            </div>

            <Motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer(0.08, 0.24)}
              style={showIntroLayer ? { opacity: heroStatsOpacity } : undefined}
              className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
            >
              {stats.map((stat) => (
                <Motion.div
                  key={stat.label}
                  variants={staggerItem}
                  className={`interactive-surface group border border-white/10 border-l-4 ${stat.accent} bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">{stat.label}</p>
                  <p className={`mt-5 font-black leading-none ${stat.value === "Consistent" ? "text-3xl" : "text-5xl"}`}>
                    {stat.value}
                  </p>
                </Motion.div>
              ))}
            </Motion.div>
          </section>

          <Motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
            className="px-5 pb-4 md:px-8"
          >
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
                      I am building a portfolio that reflects real problem solving, strong frontend craft, and steady
                      growth as an AI and ML-focused engineer. I enjoy projects where design quality and technical depth
                      support each other.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="interactive-surface border border-white/5 bg-black/50 p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/35">Primary Focus</p>
                      <p className="mt-3 text-lg font-extrabold uppercase">Frontend and AI ML products</p>
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

                <Motion.div
                  variants={staggerContainer(0.08)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="space-y-4 text-sm text-white/70"
                >
                  {highlights.map((item) => (
                    <Motion.div
                      key={item.title}
                      variants={staggerItem}
                      className={`interactive-surface border-l-2 ${item.accent} bg-black/40 p-4`}
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">{item.title}</p>
                      <p className="mt-2 font-semibold">{item.detail}</p>
                    </Motion.div>
                  ))}
                </Motion.div>
              </div>
            </div>
          </Motion.section>

          <Suspense fallback={<SectionSkeleton title="Projects" cards={4} />}>
            <ProjectsSection />
          </Suspense>

          <Suspense fallback={<SectionSkeleton title="Skills" cards={4} />}>
            <SkillsSection />
          </Suspense>

          <Suspense fallback={<SectionSkeleton title="Certificates" cards={3} />}>
            <CertificatesSection />
          </Suspense>

          <Suspense fallback={<SectionSkeleton title="Education" cards={2} compact />}>
            <EducationSection />
          </Suspense>

          <Suspense fallback={<SectionSkeleton title="Resume" cards={2} compact />}>
            <ResumeSection />
          </Suspense>

          <Suspense fallback={<SectionSkeleton title="Contact" cards={2} compact />}>
            <ContactSection />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
