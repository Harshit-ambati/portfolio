import { motion as Motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { staggerContainer, staggerItem } from "./portfolioMotion";

const contactCards = [
  {
    title: "Email",
    value: "harshit.ambati76@gmail.com",
    href: "mailto:harshit.ambati76@gmail.com",
  },
  {
    title: "Location",
    value: "India",
  },
  {
    title: "GitHub",
    value: "github.com/Harshit-ambati",
    href: "https://github.com/Harshit-ambati",
    external: true,
  },
  {
    title: "LinkedIn",
    value: "linkedin.com/in/ambati-harshit-3211s",
    href: "https://www.linkedin.com/in/ambati-harshit-3211s?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    external: true,
  },
];

const toneClasses = {
  Internship: "border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981]",
  Frontend: "border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#60A5FA]",
  "Machine Learning": "border-[#A855F7]/30 bg-[#A855F7]/10 text-[#C084FC]",
};

export default function ContactSection() {
  return (
    <SectionWrapper id="contact" className="px-5 pb-10 md:px-8">
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="interactive-surface border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-5 border-b border-white/10 pb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">Contact</p>
            <h3 className="mt-2 text-3xl font-black uppercase">Let&apos;s connect</h3>
          </div>

          <Motion.div
            variants={staggerContainer(0.08, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-4 md:grid-cols-2"
          >
            {contactCards.map((card) => (
              <Motion.div key={card.title} variants={staggerItem} className="interactive-surface border border-white/5 bg-black/40 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/35">{card.title}</p>
                {card.href ? (
                  <a
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noreferrer" : undefined}
                    className="mt-3 block text-sm font-semibold text-white/80 transition hover:text-[#F59E0B]"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="mt-3 text-sm font-semibold text-white/80">{card.value}</p>
                )}
              </Motion.div>
            ))}
          </Motion.div>
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
          <Motion.div
            variants={staggerContainer(0.08, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="mt-5 flex flex-wrap gap-3"
          >
            {["Internship", "Frontend", "Machine Learning"].map((label) => (
              <Motion.span
                key={label}
                variants={staggerItem}
                className={`rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] ${toneClasses[label]}`}
              >
                {label}
              </Motion.span>
            ))}
          </Motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
