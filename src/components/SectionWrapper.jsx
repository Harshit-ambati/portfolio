import { motion as Motion } from "framer-motion";
import { sectionReveal, viewportOnce } from "./portfolioMotion";

export default function SectionWrapper({ id, className = "", children, amount = 0.2 }) {
  return (
    <Motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewportOnce, amount }}
      variants={sectionReveal}
      className={className}
    >
      {children}
    </Motion.section>
  );
}
