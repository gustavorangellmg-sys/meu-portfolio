import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const sy = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });
  const [hover, setHover] = useState(false);
  const [isLightBg, setIsLightBg] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t) return;

      // Verifica se o mouse está sobre um link ou botão
      if (t.closest("a, button, [data-cursor='hover']")) {
        setHover(true);
      } else {
        setHover(false);
      }

      // Verifica se o mouse está sobre uma seção com fundo claro (bg-paper) ou elemento claro
      if (t.closest(".bg-paper, [data-theme='light'], .bg-white")) {
        setIsLightBg(true);
      } else {
        setIsLightBg(false);
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-300 ${
          isLightBg ? "bg-primary" : "bg-paper mix-difference"
        }`}
        animate={{
          width: hover ? 56 : 12,
          height: hover ? 56 : 12,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}

