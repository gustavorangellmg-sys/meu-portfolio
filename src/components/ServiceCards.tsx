import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface ServiceCard {
  id: number;
  category: string;
  title: string;
  description: string;
  accent: string;
  illustration: React.ReactNode;
}

export function ServiceCards() {
  const [cardOrder, setCardOrder] = useState<number[]>([0, 1, 2]);
  const [cyclingId, setCyclingId] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleCycle = (id: number) => {
    const position = cardOrder.indexOf(id);
    if (position !== 0 || cyclingId !== null) return; // Only allow cycling the top card

    setCyclingId(id);
    setTimeout(() => {
      setCardOrder((prev) => {
        const next = [...prev];
        const first = next.shift()!;
        next.push(first);
        return next;
      });
      setCyclingId(null);
    }, 600); // Elegant transit time
  };

  // Automatic infinite cycling loop
  useEffect(() => {
    if (isHovered) return; // Pause automatic cycling when hovering

    const timer = setInterval(() => {
      // Only cycle if not currently in a transition
      if (cyclingId === null) {
        handleCycle(cardOrder[0]);
      }
    }, 4500); // Cycle every 4.5 seconds

    return () => clearInterval(timer);
  }, [cardOrder, cyclingId, isHovered]);

  const getCardStyle = (id: number) => {
    const position = cardOrder.indexOf(id);
    const isCycling = cyclingId === id;

    if (isCycling) {
      return {
        zIndex: 40,
        x: isHovered ? 480 : 440,
        y: -10,
        rotate: 12,
        scale: 0.96,
        opacity: 0,
        pointerEvents: "none" as const,
      };
    }

    if (position === 0) {
      return {
        zIndex: 30,
        x: 0,
        y: 0,
        rotate: isHovered ? -3 : 0,
        scale: isHovered ? 1.025 : 1.0,
        opacity: 1,
        pointerEvents: "auto" as const,
      };
    } else if (position === 1) {
      return {
        zIndex: 20,
        x: 0,
        y: isHovered ? -38 : -16,
        rotate: isHovered ? 3 : 2,
        scale: isHovered ? 0.98 : 0.94,
        opacity: 0.95,
        pointerEvents: "none" as const,
      };
    } else {
      return {
        zIndex: 10,
        x: 0,
        y: isHovered ? -76 : -32,
        rotate: isHovered ? -4 : -2,
        scale: isHovered ? 0.94 : 0.88,
        opacity: 0.75,
        pointerEvents: "none" as const,
      };
    }
  };

  const services: ServiceCard[] = [
    {
      id: 0,
      category: "IDENTIDADE VISUAL",
      title: "Branding de Impacto",
      description:
        "Criação de identidades de marca marcantes, logotipos premium, tipografias sob medida e manuais de marca completos que contam sua história.",
      accent: "text-primary",
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Grid lines background */}
          <g opacity="0.06">
            <line x1="20" y1="0" x2="20" y2="180" stroke="white" strokeWidth="1" />
            <line x1="60" y1="0" x2="60" y2="180" stroke="white" strokeWidth="1" />
            <line x1="100" y1="0" x2="100" y2="180" stroke="white" strokeWidth="1" />
            <line x1="140" y1="0" x2="140" y2="180" stroke="white" strokeWidth="1" />
            <line x1="180" y1="0" x2="180" y2="180" stroke="white" strokeWidth="1" />
            <line x1="220" y1="0" x2="220" y2="180" stroke="white" strokeWidth="1" />
            <line x1="260" y1="0" x2="260" y2="180" stroke="white" strokeWidth="1" />
            <line x1="300" y1="0" x2="300" y2="180" stroke="white" strokeWidth="1" />
            <line x1="0" y1="30" x2="320" y2="30" stroke="white" strokeWidth="1" />
            <line x1="0" y1="60" x2="320" y2="60" stroke="white" strokeWidth="1" />
            <line x1="0" y1="90" x2="320" y2="90" stroke="white" strokeWidth="1" />
            <line x1="0" y1="120" x2="320" y2="120" stroke="white" strokeWidth="1" />
            <line x1="0" y1="150" x2="320" y2="150" stroke="white" strokeWidth="1" />
          </g>

          {/* Golden/Orange ratio geometric circles */}
          <motion.circle
            cx="160"
            cy="90"
            r="55"
            stroke="var(--color-primary)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            opacity="0.25"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "160px 90px" }}
          />
          <circle cx="160" cy="90" r="35" stroke="white" strokeWidth="1" strokeDasharray="3 3" opacity="0.15" />

          {/* Abstract elegant monogram paths */}
          <motion.path
            d="M 125,120 C 125,70 195,70 195,90 C 195,110 125,100 125,120 Z"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.85"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M 125,120 L 195,120 C 195,120 195,75 160,75 C 125,75 125,120 125,120 Z"
            stroke="var(--color-primary)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, delay: 0.3, ease: "easeInOut" }}
          />

          {/* Construction nodes & guidelines */}
          <line x1="125" y1="60" x2="125" y2="140" stroke="white" strokeWidth="1" strokeDasharray="2 2" opacity="0.2" />
          <line x1="195" y1="60" x2="195" y2="140" stroke="white" strokeWidth="1" strokeDasharray="2 2" opacity="0.2" />
          <line x1="160" y1="40" x2="160" y2="140" stroke="var(--color-primary)" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />

          <circle cx="125" cy="120" r="4.5" fill="var(--color-primary)" />
          <circle cx="195" cy="90" r="4.5" fill="white" />
          <circle cx="160" cy="75" r="4" fill="white" stroke="var(--color-primary)" strokeWidth="1" />

          {/* Pen / drafting compass icon cursor */}
          <motion.g
            animate={{ 
              x: [0, 8, -4, 0],
              y: [0, -12, 4, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M 195,90 L 220,65 L 215,60 L 190,85 Z" fill="var(--color-primary)" opacity="0.8" />
            <circle cx="220" cy="65" r="2.5" fill="white" />
          </motion.g>
        </svg>
      ),
    },
    {
      id: 1,
      category: "DESIGN WEB & DE CONVERSÃO",
      title: "Landing Pages de Alta Conversão",
      description:
        "Interfaces digitais exclusivas voltadas para conversão de leads e vendas, projetadas com tipografia refinada e animações fluidas.",
      accent: "text-primary",
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Glassmorphic UI container outline */}
          <rect x="25" y="20" width="270" height="140" rx="10" stroke="white" strokeWidth="1.5" opacity="0.15" />
          <line x1="25" y1="45" x2="295" y2="45" stroke="white" strokeWidth="1.5" opacity="0.15" />
          
          {/* Header dots */}
          <circle cx="40" cy="32" r="3.5" fill="white" opacity="0.25" />
          <circle cx="52" cy="32" r="3.5" fill="white" opacity="0.25" />
          <circle cx="64" cy="32" r="3.5" fill="white" opacity="0.25" />

          {/* Browser content blocks */}
          <rect x="40" y="60" width="105" height="15" rx="3" fill="white" opacity="0.08" />
          <rect x="40" y="82" width="130" height="8" rx="2" fill="white" opacity="0.05" />
          <rect x="40" y="96" width="95" height="8" rx="2" fill="white" opacity="0.05" />

          {/* Mini analytics graph or glowing card */}
          <rect x="185" y="60" width="95" height="50" rx="6" fill="black" stroke="white" strokeWidth="1" strokeOpacity="0.1" />
          <path d="M 195,95 L 215,82 L 235,90 L 255,70 L 270,78" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="255" cy="70" r="3" fill="white" />
          
          {/* Glowing CTA Button */}
          <motion.g
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "90px 125px" }}
          >
            <rect x="40" y="115" width="100" height="22" rx="11" fill="var(--color-primary)" />
            <rect x="62" y="122" width="56" height="7" rx="3.5" fill="white" opacity="0.9" />
          </motion.g>

          {/* Custom vector hand cursor hovering */}
          <motion.g
            animate={{ 
              x: [0, 25, 0],
              y: [0, -10, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Elegant laser pointer dots */}
            <circle cx="120" cy="125" r="2" fill="var(--color-primary)" />
            <circle cx="120" cy="125" r="7" stroke="var(--color-primary)" strokeWidth="1" opacity="0.4" />
            <motion.circle 
              cx="120" 
              cy="125" 
              r="14" 
              stroke="var(--color-primary)" 
              strokeWidth="0.8" 
              opacity="0.2"
              animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            {/* Cursor body */}
            <path d="M 120,125 L 132,150 L 126,152 L 122,143 L 115,148 L 120,125 Z" fill="white" stroke="black" strokeWidth="1" />
          </motion.g>
        </svg>
      ),
    },
    {
      id: 2,
      category: "PERFORMANCE & ADS",
      title: "Social Media & Criativos de Tráfego",
      description:
        "Design de anúncios de alto impacto para campanhas de tráfego, criativos de alta conversão e estética refinada para mídias digitais.",
      accent: "text-primary",
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Isometric floating feed containers */}
          <g transform="translate(15, 0)">
            {/* Back Card (Post 2) */}
            <motion.g 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <rect x="145" y="25" width="105" height="105" rx="12" fill="#141416" stroke="white" strokeWidth="1.2" strokeOpacity="0.08" />
              <rect x="157" y="37" width="81" height="52" rx="6" fill="white" opacity="0.04" />
              <rect x="157" y="99" width="55" height="7" rx="3.5" fill="white" opacity="0.1" />
              <rect x="157" y="111" width="35" height="5" rx="2.5" fill="white" opacity="0.06" />
            </motion.g>

            {/* Front Card (Post 1: Ads) */}
            <motion.g 
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              <rect x="45" y="45" width="115" height="115" rx="14" fill="#09090b" stroke="var(--color-primary)" strokeWidth="1.5" strokeOpacity="0.4" />
              
              {/* Image box with design symbol */}
              <rect x="58" y="58" width="89" height="58" rx="8" fill="white" opacity="0.05" />
              <path d="M 92,72 L 112,87 L 92,102 Z" fill="var(--color-primary)" opacity="0.9" />

              {/* Text layers */}
              <rect x="58" y="126" width="60" height="7" rx="3.5" fill="white" opacity="0.25" />
              <rect x="58" y="139" width="40" height="5" rx="2.5" fill="white" opacity="0.1" />

              {/* Conversion mini sparks */}
              <path d="M 148,58 L 153,61 L 148,64 L 143,61 Z" fill="white" />
            </motion.g>

            {/* Scale arrow pointing up representing conversions */}
            <motion.g
              animate={{ 
                y: [0, -6, 0],
                opacity: [0.4, 0.9, 0.4]
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path 
                d="M 185,130 C 210,120 220,95 240,65" 
                stroke="var(--color-primary)" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeDasharray="4 3" 
              />
              <path d="M 240,65 L 230,68 M 240,65 L 237,75" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
            </motion.g>
            
            {/* Sparkles / dynamic shapes */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "260px 45px" }}
            >
              <path d="M 260,35 L 263,42 L 270,45 L 263,48 L 260,55 L 257,48 L 250,45 L 257,42 Z" fill="white" opacity="0.4" />
            </motion.g>
          </g>
        </svg>
      ),
    },
  ];

  return (
    <div
      className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[620px] lg:max-w-[680px] h-[440px] sm:h-[420px] md:h-[300px] select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {services.map((service) => {
        const style = getCardStyle(service.id);
        const isTop = cardOrder[0] === service.id;
        const position = cardOrder.indexOf(service.id);

        return (
          <motion.div
            key={service.id}
            style={style as any}
            animate={style as any}
            transition={{
              type: "spring",
              stiffness: 100, // Premium slow spring
              damping: 16,
              mass: 0.8,
            }}
            className="absolute inset-0 w-full h-full bg-[#0d0d0f] border border-white/[0.08] rounded-[2rem] p-6 md:p-8 flex flex-col justify-between shadow-2xl overflow-hidden cursor-pointer"
            onClick={() => isTop && handleCycle(service.id)}
            data-cursor={isTop ? "hover" : undefined}
          >
            {/* Ambient Card Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none" />

            <motion.div
              className="relative z-10 flex flex-col md:flex-row items-stretch justify-between h-full gap-6 md:gap-8 w-full"
              animate={{
                y: isTop 
                  ? [0, -6, 0] 
                  : position === 1 
                  ? [0, -4, 0] 
                  : [0, -2, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: position * 0.4
              }}
            >
              {/* LEFT COLUMN: TEXT CONTENT */}
              <div className="flex flex-col justify-between flex-1 relative z-10 text-left">
                <div>
                  <span className="text-[10px] md:text-xs tracking-[0.2em] font-sans font-bold text-zinc-500 uppercase block">
                    {service.category}
                  </span>
                  <h3 className="font-display text-2xl md:text-2xl lg:text-3xl font-bold text-white mt-2 leading-none">
                    {service.title}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-400 font-sans mt-3 md:mt-4 leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Status Bar Indicator */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/[0.04]">
                  {isTop ? (
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold animate-pulse">
                      Em exibição • Automático
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-medium">
                      Na pilha
                    </span>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: HIGH-FIDELITY VECTOR ILLUSTRATION CONTAINER */}
              <div className="w-full md:w-[200px] lg:w-[240px] shrink-0 h-[140px] md:h-full flex items-center justify-center bg-black/45 rounded-2xl border border-white/[0.04] p-1 overflow-hidden">
                {service.illustration}
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
