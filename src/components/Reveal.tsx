import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const v: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

export function RevealLine({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        variants={v}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        transition={{ delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
