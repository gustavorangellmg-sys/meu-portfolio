import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ScrollSectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function ScrollSectionWrapper({ children, className = "", id }: ScrollSectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll progress of this specific section relative to the viewport
  // "start end" means: when the top of the section enters the bottom of the viewport
  // "end start" means: when the bottom of the section leaves the top of the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth scroll transformations for high-fidelity entry and exit states:
  // - Entry phase (0.0 to 0.22): fade in, translate up from 80px, de-blur from 20px
  // - Active phase (0.22 to 0.78): fully solid, centered, crystal sharp
  // - Exit phase (0.78 to 1.0): fade out, translate up to -80px, blur out to 20px
  const opacity = useTransform(scrollYProgress, [0.0, 0.22, 0.78, 1.0], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.0, 0.22, 0.78, 1.0], [80, 0, 0, -80]);
  
  const blurVal = useTransform(scrollYProgress, [0.0, 0.22, 0.78, 1.0], [20, 0, 0, 20]);
  const filter = useTransform(blurVal, (v) => `blur(${v}px)`);

  return (
    <motion.div
      ref={ref}
      id={id}
      style={{ opacity, y, filter }}
      className={`origin-center will-change-transform will-change-opacity ${className}`}
    >
      {children}
    </motion.div>
  );
}
