import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowLeft, Copy, Check, Play, Square, RefreshCw, Volume2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Project } from "@/lib/projects";

interface JadielProjectPageProps {
  project: Project;
}

export function JadielProjectPage({ project: p }: JadielProjectPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const moodboardRef = useRef<HTMLDivElement>(null);

  // Parallax Scroll Effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 80]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Color Palette Copy State
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  // Typographic specimen state
  const [fontSize, setFontSize] = useState<number>(64);
  const [specimenText, setSpecimenText] = useState<string>("Kilimanjaro");

  // Vinyl Player State
  const [vinylState, setVinylState] = useState<"idle" | "slid-out" | "playing">("idle");
  const [vinylCrackle, setVinylCrackle] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const startVinylSynth = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Create a 2-second buffer of warm vinyl crackle sound
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        // Soft white noise floor
        let val = (Math.random() * 2 - 1) * 0.003;
        
        // Random popping impulses (vinyl pops)
        if (Math.random() < 0.00018) {
          val += (Math.random() * 2 - 1) * 0.12;
        }
        // Sub-bass rumble (turntable mechanical noise)
        val += Math.sin(i * 0.005) * 0.001;

        data[i] = val;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      // Filter to create warm low-fidelity retro sound
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 650;
      filter.Q.value = 1.2;

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.35, ctx.currentTime);

      source.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      source.start(0);
      noiseSourceRef.current = source;
      setVinylCrackle(true);
    } catch (e) {
      console.warn("Web Audio blockado ou não suportado:", e);
    }
  };

  const stopVinylSynth = () => {
    if (noiseSourceRef.current) {
      try {
        noiseSourceRef.current.stop();
      } catch (err) {}
      noiseSourceRef.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (err) {}
      audioCtxRef.current = null;
    }
    setVinylCrackle(false);
  };

  useEffect(() => {
    return () => {
      stopVinylSynth();
    };
  }, []);

  const handleVinylClick = () => {
    if (vinylState === "idle") {
      setVinylState("slid-out");
    } else if (vinylState === "slid-out") {
      setVinylState("playing");
      // Delay synth drop to sync with tone arm animation
      setTimeout(() => {
        startVinylSynth();
      }, 900);
    } else {
      stopVinylSynth();
      setVinylState("idle");
    }
  };

  const palette = [
    { name: "Floresta Opara", hex: "#2C5E3B", usage: "Cor Primária / Fundo institucional" },
    { name: "Creme Kilimanjaro", hex: "#FCE6B2", usage: "Fundo editorial / Tipografia" },
    { name: "Terracota Baile", hex: "#D4613C", usage: "Acentos gráficos / Comunicação" },
    { name: "Argila Seca", hex: "#90593B", usage: "Variações de marca secundárias" },
    { name: "Preto Absoluto", hex: "#0d0d0f", usage: "Contrastes intensos de suporte" },
  ];

  return (
    <main ref={containerRef} className="bg-[#2C5E3B] text-[#FCE6B2] min-h-screen relative overflow-x-hidden selection:bg-[#D4613C] selection:text-white pb-32">
      {/* Dynamic Font Styling Injected into Component */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,600;12..96,800&family=Plus+Jakarta+Sans:wght@300;400;500;700&family=Syne:wght@700;800&display=swap');
        
        .font-display-kilimanjaro {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          letter-spacing: -0.03em;
        }
        .font-brand-editorial {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
        }
        .font-body-jakarta {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .turntable-spin {
          animation: spin 1.8s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* FLOATING HEADER */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center mix-difference">
        <Link to="/projects" className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#FCE6B2] hover:opacity-75 transition-opacity" data-cursor="hover">
          <ArrowLeft className="w-4 h-4" />
          Projetos
        </Link>
        <span className="text-xs uppercase tracking-[0.35em] font-body-jakarta font-bold text-[#FCE6B2]">
          Gustavo Rangel
        </span>
      </nav>

      {/* HERO SECTION - ELEGANT EDITORIAL STYLE (vanschneider style) */}
      <section className="min-h-screen flex flex-col justify-between pt-36 px-6 md:px-12 pb-16 relative">
        <motion.div style={{ y: heroY, scale: heroScale }} className="w-full">
          <div className="flex items-center gap-4 text-xs font-body-jakarta font-bold uppercase tracking-[0.25em] text-[#D4613C] mb-6">
            <span>{p.category}</span>
            <span>•</span>
            <span>{p.year}</span>
          </div>

          <h1 className="font-brand-editorial text-[14vw] md:text-[8vw] leading-[0.82] text-[#FCE6B2] tracking-tighter text-balance">
            Jadiel Oliveira
            <br />
            <span className="text-transparent" style={{ WebkitTextStroke: "2px #FCE6B2" }}>
              Baile Diferente
            </span>
          </h1>
        </motion.div>

        {/* HERO IMAGE AND INTRO COLLAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mt-12">
          <div className="lg:col-span-5 space-y-6">
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-brand-editorial text-2xl md:text-4xl text-[#FCE6B2] leading-tight text-balance"
            >
              "Uma identidade que dança livremente entre o erudito e o popular."
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-body-jakarta text-[#FCE6B2]/80 text-base md:text-lg leading-relaxed max-w-xl"
            >
              {p.story[0]}
            </motion.p>
          </div>

          <div className="lg:col-span-7 w-full h-[50vh] lg:h-[70vh] rounded-[2.5rem] overflow-hidden border border-[#FCE6B2]/15 relative shadow-2xl">
            <motion.img
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={p.cover}
              alt="Jadiel Oliveira Portrait"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C5E3B]/70 to-transparent" />
            
            {/* Visual identity badge floating */}
            <div className="absolute bottom-8 left-8 flex flex-col">
              <span className="text-[10px] tracking-[0.2em] text-[#D4613C] uppercase font-bold">Direção Criativa</span>
              <span className="font-brand-editorial text-xl text-white">Gustavo Rangel © 2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* MOODBOARD SECTION (antonandirene / locomotive inspired collage) */}
      <section ref={moodboardRef} className="py-24 px-6 md:px-12 bg-[#0d0d0f] text-[#FCE6B2] rounded-[3.5rem] border border-[#FCE6B2]/10 my-16">
        <div className="max-w-4xl mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-body-jakarta text-[#D4613C] font-bold block mb-4">REFERÊNCIAS E CONCEITO</span>
          <h2 className="font-brand-editorial text-4xl md:text-6xl text-[#FCE6B2] mb-6 leading-none">
            Moodboard.
          </h2>
          <p className="font-body-jakarta text-[#FCE6B2]/75 text-lg md:text-xl leading-relaxed">
            Uma síntese das referências de imagem, estética e conceitos geométricos que pautaram a identidade visual africana contemporânea e urbana.
          </p>
        </div>

        {/* High-Fidelity SVG Interactive Moodboard Canvas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Opara Wave Canvas */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="bg-[#2C5E3B] border border-[#FCE6B2]/10 p-8 rounded-[2.5rem] h-[380px] flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FCE6B2_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="flex justify-between items-start relative z-10">
              <span className="text-xs font-bold tracking-widest text-[#FCE6B2]/60 uppercase">Ref 01 / Fluidez</span>
              <span className="text-2xl font-brand-editorial text-[#D4613C]">opara</span>
            </div>
            
            {/* Smooth dynamic wave drawing */}
            <div className="w-full h-[180px] flex items-center justify-center relative z-10">
              <svg className="w-full h-full" viewBox="0 0 240 120" fill="none">
                <motion.path 
                  d="M10,80 C50,20 80,100 120,40 C160,-20 190,70 230,20" 
                  stroke="#FCE6B2" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  animate={{ d: [
                    "M10,80 C50,20 80,100 120,40 C160,-20 190,70 230,20",
                    "M10,60 C50,90 90,30 130,70 C170,110 190,40 230,80",
                    "M10,80 C50,20 80,100 120,40 C160,-20 190,70 230,20"
                  ]}}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path 
                  d="M10,100 C60,40 70,120 130,50 C190,-20 180,90 230,40" 
                  stroke="#D4613C" 
                  strokeWidth="1.5" 
                  strokeLinecap="round"
                  strokeDasharray="6 4"
                  animate={{ d: [
                    "M10,100 C60,40 70,120 130,50 C190,-20 180,90 230,40",
                    "M10,80 C40,40 80,90 120,80 C160,70 190,10 230,60",
                    "M10,100 C60,40 70,120 130,50 C190,-20 180,90 230,40"
                  ]}}
                  transition={{ duration: 6, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
            </div>
            
            <p className="font-body-jakarta text-sm text-[#FCE6B2]/80 relative z-10 leading-relaxed">
              O rio Opara e o conceito de fluidez nas águas. Formas curvas inspiradas em design de posters dos anos 70.
            </p>
          </motion.div>

          {/* Card 2: Geometric Modular Bauhaus Art */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="bg-[#D4613C] border border-black/10 p-8 rounded-[2.5rem] h-[380px] flex flex-col justify-between relative overflow-hidden text-white"
          >
            <div className="absolute inset-0 bg-[#0d0d0f]/15" />
            <div className="flex justify-between items-start relative z-10">
              <span className="text-xs font-bold tracking-widest text-white/70 uppercase">Ref 02 / Bauhaus</span>
              <span className="text-[#FCE6B2] text-xl font-brand-editorial">Módulo</span>
            </div>

            {/* Retro grid collage of abstract vectors */}
            <div className="grid grid-cols-3 gap-2 w-full h-[180px] items-center relative z-10">
              <motion.div 
                className="aspect-square bg-[#FCE6B2] rounded-full"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="aspect-square bg-white rounded-2xl flex items-center justify-center text-black font-brand-editorial text-2xl">
                J
              </div>
              <div className="aspect-square bg-[#2C5E3B] rounded-2xl overflow-hidden relative">
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[#FCE6B2]" />
              </div>
              <div className="aspect-square bg-white/20 rounded-2xl" />
              <motion.div 
                className="aspect-square bg-white rounded-full overflow-hidden flex items-center justify-center text-[#D4613C] font-bold text-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                ✦
              </motion.div>
              <div className="aspect-square bg-[#FCE6B2] rounded-full" />
            </div>

            <p className="font-body-jakarta text-sm text-white/90 relative z-10 leading-relaxed">
              Módulos gráficos intercambiáveis. Bauhaus, Joan Miró e a mistura geométrica da tipografia de peso.
            </p>
          </motion.div>

          {/* Card 3: Afro Silhouette Poster */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="bg-[#FCE6B2] border border-black/10 p-8 rounded-[2.5rem] h-[380px] flex flex-col justify-between relative overflow-hidden text-[#0d0d0f] lg:col-span-1 md:col-span-2"
          >
            <div className="absolute inset-0 bg-[#90593B]/5" />
            <div className="flex justify-between items-start relative z-10">
              <span className="text-xs font-bold tracking-widest text-[#0d0d0f]/60 uppercase">Ref 03 / Identidade</span>
              <span className="text-[#2C5E3B] text-xl font-brand-editorial">Afro</span>
            </div>

            {/* Stylized high fidelity African vector layout */}
            <div className="w-full h-[180px] flex items-center justify-center relative z-10">
              <svg className="w-[140px] h-[140px] opacity-85" viewBox="0 0 120 120" fill="none">
                {/* Silhouette representing Afro-inspired culture */}
                <circle cx="60" cy="50" r="32" fill="#D4613C" />
                <path d="M60,18 C40,18 20,38 20,62 L100,62 C100,38 80,18 60,18 Z" fill="#2C5E3B" />
                {/* Geometric rings */}
                <circle cx="60" cy="50" r="44" stroke="#90593B" strokeWidth="1.5" strokeDasharray="4 2" />
                {/* Spark lines */}
                <line x1="60" y1="2" x2="60" y2="12" stroke="#2C5E3B" strokeWidth="2" />
                <line x1="12" y1="50" x2="2" y2="50" stroke="#D4613C" strokeWidth="2" />
                <line x1="108" y1="50" x2="118" y2="50" stroke="#D4613C" strokeWidth="2" />
              </svg>
            </div>

            <p className="font-body-jakarta text-sm text-[#0d0d0f]/85 relative z-10 leading-relaxed">
              Expressividade e tom quente. Fotografia com contrastes severos e elementos que remetem ao acústico.
            </p>
          </motion.div>

        </div>
      </section>

      {/* LOGOS AND VARIATIONS SHOWCASE */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-body-jakarta text-[#D4613C] font-bold block mb-4">SISTEMA GRÁFICO</span>
          <h2 className="font-brand-editorial text-4xl md:text-6xl text-[#FCE6B2] mb-6 leading-none">
            Logotipos e Variações.
          </h2>
          <p className="font-body-jakarta text-[#FCE6B2]/80 text-lg max-w-3xl leading-relaxed">
            Desenvolvemos um logotipo mutável baseado em pesos tipográficos fortes e variações geométricas. Passe o mouse para interagir com o sistema dinâmico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LOGO 1: JA DI (Green on Yellow-beige) */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="lg:col-span-4 bg-[#FCE6B2] text-[#2C5E3B] p-8 rounded-[2.5rem] min-h-[340px] flex flex-col justify-between border border-[#FCE6B2]/10"
          >
            <span className="text-[10px] tracking-widest font-bold uppercase opacity-60">Logotipo Padrão</span>
            
            <div className="flex-1 flex items-center justify-center py-6">
              <motion.div 
                className="text-center font-display-kilimanjaro text-7xl md:text-8xl leading-none flex items-center gap-1"
                whileHover={{ rotate: [-2, 2, -2, 0] }}
                transition={{ duration: 0.5 }}
              >
                <span>JA</span>
                <span className="text-[#D4613C]">Di</span>
              </motion.div>
            </div>

            <div className="flex justify-between items-center text-xs opacity-75 font-body-jakarta">
              <span>ESTILO CORRIDO</span>
              <span>JADI / JADIEL</span>
            </div>
          </motion.div>

          {/* LOGO 2: Ó JADIEL OLIVEIRA CIRCULAR STAMP (Orange background, spinning on hover) */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="lg:col-span-5 bg-[#D4613C] text-[#FCE6B2] p-8 rounded-[2.5rem] min-h-[340px] flex flex-col justify-between border border-white/5 relative overflow-hidden group"
          >
            <span className="text-[10px] tracking-widest font-bold uppercase text-white/70">Badge Circular</span>

            <div className="flex-1 flex items-center justify-center py-4 relative z-10">
              <motion.div 
                className="w-[180px] h-[180px]"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <path id="circlePath" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" fill="none" />
                  
                  {/* Decorative rotating background sun */}
                  <circle cx="100" cy="100" r="50" fill="#2C5E3B" opacity="0.4" />
                  <text fill="#FCE6B2" className="font-brand-editorial text-[13px] tracking-[0.25em] uppercase">
                    <textPath href="#circlePath" startOffset="0%">
                      • Ó JADIEL OLIVEIRA • BAILE DIFERENTE •
                    </textPath>
                  </text>
                  <text fill="#FCE6B2" className="font-display-kilimanjaro text-2xl" x="100" y="108" textAnchor="middle">
                    JAD
                  </text>
                </svg>
              </motion.div>
            </div>

            <div className="flex justify-between items-center text-xs text-white/80 font-body-jakarta relative z-10">
              <span>SELO ADICIONAL</span>
              <span>ROTATIVO</span>
            </div>
          </motion.div>

          {/* LOGO 3: JADI (Clay-brown with sunburst icon) */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="lg:col-span-3 bg-[#90593B] text-[#FCE6B2] p-8 rounded-[2.5rem] min-h-[340px] flex flex-col justify-between border border-[#FCE6B2]/10"
          >
            <span className="text-[10px] tracking-widest font-bold uppercase opacity-60">Logotipo Monograma</span>

            <div className="flex-1 flex flex-col items-center justify-center py-6 gap-2">
              <motion.div 
                className="font-display-kilimanjaro text-6xl leading-none"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                JADI
              </motion.div>
              {/* Pulsing Sunburst icon */}
              <svg className="w-8 h-8 opacity-75" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="4" fill="#D4613C" />
                <path d="M16,2 L16,6 M16,26 L16,30 M2,16 L6,16 M26,16 L30,16 M6,6 L10,10 M22,22 L26,26 M6,26 L10,22 M22,10 L26,6" stroke="#FCE6B2" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <div className="flex justify-between items-center text-xs opacity-75 font-body-jakarta">
              <span>VARIAÇÃO COMPACTA</span>
              <span>ÍCONE SOLAR</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* INTERACTIVE COLOR PALETTE */}
      <section className="py-24 px-6 md:px-12 bg-[#0d0d0f] text-[#FCE6B2] border-t border-[#FCE6B2]/10 my-16">
        <div className="max-w-4xl mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-body-jakarta text-[#D4613C] font-bold block mb-4">CÓDIGOS CROMÁTICOS</span>
          <h2 className="font-brand-editorial text-4xl md:text-6xl text-[#FCE6B2] mb-6 leading-none">
            Paleta de Cores.
          </h2>
          <p className="font-body-jakarta text-[#FCE6B2]/75 text-lg leading-relaxed">
            Uma harmonia cromática de tons terrosos, orgânicos e acústicos que refletem a sonoridade e o aconchego do MPB e do Jazz. Clique no bloco para copiar o código hexadecimal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {palette.map((color, index) => (
            <motion.div
              key={index}
              onClick={() => handleCopyColor(color.hex)}
              whileHover={{ y: -6 }}
              className="bg-[#141416] border border-[#FCE6B2]/10 rounded-[2rem] p-4 flex flex-col justify-between cursor-pointer group h-[300px] transition-all"
            >
              {/* Color Block Display */}
              <div 
                className="w-full h-[150px] rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: color.hex }}
              >
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {copiedColor === color.hex ? (
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-black/85 text-[#FCE6B2] px-3 py-1.5 rounded-full text-xs font-bold font-body-jakarta flex items-center gap-1.5 shadow-xl"
                      >
                        <Check className="w-3.5 h-3.5 text-green-400" />
                        Copiado!
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-black/75 text-[#FCE6B2] p-2.5 rounded-full"
                      >
                        <Copy className="w-4 h-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Text Info */}
              <div className="pt-4 flex flex-col">
                <span className="text-[#D4613C] font-bold text-[10px] tracking-widest uppercase">{color.hex}</span>
                <span className="font-brand-editorial text-lg text-white mt-1">{color.name}</span>
                <span className="text-xs text-[#FCE6B2]/60 font-body-jakarta mt-2">{color.usage}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TYPOGRAPHY SPECIMEN SANDBOX (Editorial styled specimen) */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Specimen Sandbox controls */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] font-body-jakarta text-[#D4613C] font-bold block mb-4">SISTEMA TIPOGRÁFICO</span>
              <h2 className="font-brand-editorial text-4xl md:text-5xl text-[#FCE6B2] mb-6 leading-none">
                Tipografia.
              </h2>
              <p className="font-body-jakarta text-[#FCE6B2]/85 text-base md:text-lg leading-relaxed">
                Usamos a fonte **Kilimanjaro Sans** como tipografia display expressiva e marcante nos títulos gerais. Para o conteúdo editorial e suporte, aplicamos a clássica **Helvetica Neue** em suas diferentes variações de peso.
              </p>
            </div>

            {/* Interactive controls */}
            <div className="bg-[#0d0d0f]/60 border border-[#FCE6B2]/10 p-6 rounded-[2.5rem] space-y-6">
              <span className="text-[10px] font-bold tracking-widest text-[#D4613C] uppercase block">Espécime Interativo</span>
              
              {/* Font selector input */}
              <div className="space-y-2">
                <label className="text-xs font-body-jakarta text-[#FCE6B2]/70 uppercase font-bold">Texto de Teste</label>
                <input 
                  type="text" 
                  value={specimenText}
                  onChange={(e) => setSpecimenText(e.target.value)}
                  className="w-full bg-[#141416] border border-[#FCE6B2]/15 text-[#FCE6B2] px-4 py-3 rounded-xl focus:outline-none focus:border-[#D4613C] font-body-jakarta text-sm transition-colors"
                />
              </div>

              {/* Font size range slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-body-jakarta text-[#FCE6B2]/70 uppercase font-bold">
                  <span>Tamanho da Fonte</span>
                  <span className="text-[#D4613C]">{fontSize}px</span>
                </div>
                <input 
                  type="range" 
                  min="24" 
                  max="120" 
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full accent-[#D4613C] bg-[#141416] rounded-lg cursor-pointer h-1.5"
                />
              </div>
            </div>
          </div>

          {/* Typography Specimen Sandbox */}
          <div className="lg:col-span-8 bg-[#0d0d0f] border border-[#FCE6B2]/10 rounded-[3rem] p-8 md:p-12 space-y-12">
            
            {/* Display specimen */}
            <div className="border-b border-[#FCE6B2]/10 pb-10">
              <span className="text-xs tracking-widest font-body-jakarta text-[#D4613C] font-bold uppercase block mb-4">Display Principal / Kilimanjaro Sans (Syne)</span>
              
              <div className="overflow-hidden py-4">
                <motion.div 
                  className="font-display-kilimanjaro text-white leading-none tracking-tight break-words select-all"
                  style={{ fontSize: `${fontSize}px` }}
                  layout
                >
                  {specimenText || "Kilimanjaro"}
                </motion.div>
              </div>

              <div className="flex flex-wrap gap-4 text-xs font-body-jakarta text-[#FCE6B2]/60 mt-6 uppercase">
                <span>Display Serif/Sans</span>
                <span>•</span>
                <span>Bold & Expressive</span>
                <span>•</span>
                <span>Afro-Aesthetic Weight</span>
              </div>
            </div>

            {/* Body specimen (Helvetica Neue) */}
            <div>
              <span className="text-xs tracking-widest font-body-jakarta text-[#D4613C] font-bold uppercase block mb-6">Suporte Editorial / Helvetica Neue</span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#FCE6B2]/95 font-body-jakarta">
                <div className="space-y-2">
                  <span className="text-[10px] tracking-widest font-bold text-white/50 block">HELVETICA NEUE LIGHT</span>
                  <p className="font-light text-base leading-relaxed">
                    ABCDEFGHIJKLM NOPQRSTUV WXYZ abcdefgh ijklmno pqrstuv wxyz 123456 7890
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] tracking-widest font-bold text-white/50 block">HELVETICA NEUE BOLD</span>
                  <p className="font-bold text-base leading-relaxed">
                    ABCDEFGHIJKLM NOPQRSTUV WXYZ abcdefgh ijklmno pqrstuv wxyz 123456 7890
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* THE MASTERPIECE: INTERACTIVE TURNTABLE VINYL PLAYER */}
      <section className="py-24 px-6 md:px-12 bg-[#0d0d0f] text-[#FCE6B2] border-t border-[#FCE6B2]/10 my-16 relative overflow-hidden">
        
        {/* Glow effect when playing */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4613C]/10 rounded-full blur-[140px] pointer-events-none transition-opacity duration-1000 ${vinylState === "playing" ? "opacity-100 animate-pulse" : "opacity-0"}`} />

        <div className="max-w-4xl mb-16 relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] font-body-jakarta text-[#D4613C] font-bold block mb-4">INTERATIVIDADE AUDIÓFILA</span>
          <h2 className="font-brand-editorial text-4xl md:text-6xl text-[#FCE6B2] mb-6 leading-none">
            Vitrola Interativa.
          </h2>
          <p className="font-body-jakarta text-[#FCE6B2]/75 text-lg leading-relaxed">
            Uma homenagem física e interativa às raízes sonoras do projeto. Passe o mouse para deslizar o disco, clique para levá-lo à vitrola e ligar o ruído quente de vinil analógico.
          </p>
        </div>

        {/* Flat Skeuomorphic Turntable Canvas */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 relative z-10 py-8">
          
          {/* Vinyl Album Cover Card (Sleeve) */}
          <div className="relative w-[300px] h-[300px] shrink-0 select-none">
            
            {/* The Vinyl Record */}
            <motion.div 
              onClick={handleVinylClick}
              animate={
                vinylState === "idle" 
                  ? { x: 0, y: 0, rotate: 0, zIndex: 10 }
                  : vinylState === "slid-out"
                  ? { x: 100, y: 0, rotate: 45, zIndex: 20 }
                  : { x: 260, y: -20, rotate: 360, zIndex: 20 } // Placed on turntable
              }
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 15,
                mass: 1.0
              }}
              className="absolute inset-2 bg-zinc-900 rounded-full border border-black shadow-2xl flex items-center justify-center cursor-pointer group"
            >
              {/* Record grooves */}
              <div className="absolute inset-1 border border-white/5 rounded-full" />
              <div className="absolute inset-3 border border-white/5 rounded-full" />
              <div className="absolute inset-6 border border-white/5 rounded-full" />
              <div className="absolute inset-10 border border-white/5 rounded-full" />
              <div className="absolute inset-16 border border-white/5 rounded-full" />

              {/* Spinning action class */}
              <div className={`w-full h-full absolute inset-0 flex items-center justify-center ${vinylState === "playing" ? "turntable-spin" : ""}`}>
                {/* Center label (same as circle stamp logo) */}
                <div className="w-[100px] h-[100px] rounded-full bg-[#D4613C] border-2 border-black flex items-center justify-center p-1 text-center select-none shadow-md">
                  <span className="font-brand-editorial text-[9px] text-[#FCE6B2] leading-none uppercase font-bold block">
                    Jadiel Oliveira
                    <br />
                    <span className="text-[7px] opacity-75">Baile Diferente</span>
                  </span>
                </div>
              </div>

              {/* Turntable spindle center hole */}
              <div className="w-3.5 h-3.5 rounded-full bg-zinc-950 border border-zinc-800 z-10" />
            </motion.div>

            {/* Outer Sleeve Cover (Printed Cardboard Jacket) */}
            <motion.div 
              onClick={handleVinylClick}
              whileHover={{ scale: 1.02 }}
              className="absolute inset-0 bg-[#2C5E3B] border border-[#FCE6B2]/15 rounded-3xl p-6 flex flex-col justify-between shadow-2xl z-30 cursor-pointer overflow-hidden"
            >
              {/* Geometric pattern on album jacket */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FCE6B2_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
              <div className="absolute top-0 right-0 w-[140px] h-[140px] bg-[#D4613C] rounded-full blur-[60px] opacity-25 pointer-events-none" />

              <div className="flex justify-between items-start relative z-10">
                <span className="text-[9px] tracking-widest font-bold uppercase text-[#FCE6B2]/70 font-body-jakarta">LP Stereo • 33 RPM</span>
                <span className="text-xs font-brand-editorial text-[#D4613C]">Volume I</span>
              </div>

              <div className="relative z-10 space-y-2">
                <h3 className="font-brand-editorial text-3xl text-white leading-tight">
                  Baile
                  <br />
                  Diferente.
                </h3>
                <p className="font-body-jakarta text-[11px] text-[#FCE6B2]/75 uppercase tracking-wider font-bold">
                  Curadoria & Branding por Gustavo Rangel
                </p>
              </div>
            </motion.div>
          </div>

          {/* TURNTABLE DECK PANEL */}
          <div className="relative w-[340px] md:w-[380px] h-[340px] bg-[#1a1a1c] border-4 border-zinc-800 rounded-[2.5rem] shadow-2xl p-6 flex items-center justify-center select-none overflow-hidden">
            
            {/* Turntable Platter (Metal/Rubber platter) */}
            <div className="w-[280px] h-[280px] rounded-full bg-zinc-900 border-[8px] border-zinc-800 shadow-inner relative flex items-center justify-center">
              <div className="w-[250px] h-[250px] rounded-full bg-zinc-950 border border-zinc-900 shadow-inner relative flex items-center justify-center">
                <div className="w-1.5 h-6 bg-zinc-400 rounded absolute z-30 pointer-events-none shadow" style={{ top: "calc(50% - 12px)", left: "calc(50% - 3px)" }} />
              </div>
            </div>

            {/* Turntable Tone Arm */}
            <motion.div 
              animate={
                vinylState === "playing" 
                  ? { rotate: 26, zIndex: 40 }
                  : { rotate: 0, zIndex: 40 }
              }
              transition={{ duration: 1.0, ease: "easeInOut" }}
              style={{ originX: "85%", originY: "15%" }}
              className="absolute top-8 right-8 w-24 h-48 pointer-events-none origin-top-right z-30"
            >
              {/* Tone Arm Body Drawing */}
              <svg className="w-full h-full" viewBox="0 0 100 200" fill="none">
                {/* Arm Pivot Base */}
                <circle cx="85" cy="30" r="16" fill="zinc-700" stroke="zinc-600" strokeWidth="2" />
                <circle cx="85" cy="30" r="6" fill="zinc-400" />
                {/* Metal Arm Stem */}
                <path d="M 85,30 Q 55,90 42,160" stroke="#d4d4d8" strokeWidth="4.5" strokeLinecap="round" />
                {/* Tone Arm Cartridge / Head shell */}
                <rect x="34" y="160" width="16" height="28" rx="4" transform="rotate(-15, 42, 160)" fill="#D4613C" stroke="zinc-800" strokeWidth="1" />
                {/* Needle stylus holder */}
                <circle cx="42" cy="174" r="2.5" fill="white" />
              </svg>
            </motion.div>

            {/* Controls (Power / Volume knobs) */}
            <div className="absolute bottom-6 left-6 flex gap-4 items-center">
              <div className="flex flex-col items-center gap-1 text-[8px] text-[#FCE6B2]/40 tracking-wider">
                <span className="uppercase font-bold">Power</span>
                <button 
                  onClick={handleVinylClick} 
                  className={`w-6 h-6 rounded-full border transition-all duration-300 ${vinylState === "playing" ? "bg-red-500 border-red-400 shadow-lg shadow-red-500/50" : "bg-zinc-800 border-zinc-700 hover:bg-zinc-700"}`}
                />
              </div>
              <div className="flex flex-col items-center gap-1 text-[8px] text-[#FCE6B2]/40 tracking-wider">
                <span className="uppercase font-bold">Speed</span>
                <div className="bg-zinc-800 border border-zinc-700 px-2 py-1 rounded text-white text-[8px] font-bold">
                  33 RPM
                </div>
              </div>
            </div>

            {/* Glowing soundwave visualization rises when playing */}
            <div className="absolute bottom-6 right-6 flex items-center gap-2">
              <div className="text-[8px] uppercase tracking-widest text-[#FCE6B2]/40 font-bold flex items-center gap-1">
                {vinylState === "playing" ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#D4613C] animate-bounce" />
                    <span className="text-[#D4613C]">Acústico</span>
                  </>
                ) : (
                  <span>Desligado</span>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Soundwave equalizer graph */}
        <AnimatePresence>
          {vinylState === "playing" && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 60, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full max-w-xl mx-auto flex items-end justify-between gap-1 h-[60px] relative z-10 pt-4"
            >
              {Array.from({ length: 48 }).map((_, i) => (
                <motion.div 
                  key={i}
                  className="bg-[#D4613C] rounded-full w-full max-w-[6px]"
                  animate={{
                    height: [
                      `${Math.random() * 85 + 15}%`,
                      `${Math.random() * 85 + 15}%`,
                      `${Math.random() * 85 + 15}%`
                    ]
                  }}
                  transition={{
                    duration: 0.8 + Math.random() * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ opacity: 0.35 + (i % 8) * 0.08 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </section>

      {/* MOCKUPS SHOWCASE (Tote bag / Street Banner) */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Mockup 1: Tote Bag Typography Showcase */}
          <div className="bg-[#90593B] border border-[#FCE6B2]/15 p-8 md:p-12 rounded-[3.5rem] flex flex-col justify-between min-h-[480px] overflow-hidden relative shadow-2xl group">
            {/* Background vector canvas pattern */}
            <div className="absolute inset-0 bg-[#0d0d0f]/10" />
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#FCE6B2_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
            
            <div className="relative z-10 flex justify-between items-start">
              <span className="text-[10px] tracking-widest font-bold uppercase text-white/60">Mockup 01 / Vestuário</span>
              <span className="text-xs text-[#FCE6B2] uppercase font-body-jakarta">Tote Bag Algodão</span>
            </div>

            {/* High-Fidelity SVG canvas of the Tote Bag Mockup */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-8">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="w-[200px] h-[240px] bg-[#FCE6B2] border-2 border-amber-950 rounded-b-xl rounded-t-sm shadow-xl p-4 flex flex-col justify-between text-[#90593B] relative"
              >
                {/* Tote Bag straps */}
                <div className="absolute -top-16 left-8 right-8 h-16 border-[4px] border-[#90593B]/75 border-b-0 rounded-t-full" />
                
                {/* Tote Bag Print */}
                <div className="border border-[#90593B]/20 rounded-lg p-2 h-full flex flex-col justify-between">
                  <span className="font-brand-editorial text-[9px] tracking-widest uppercase opacity-75">Jadiel Oliveira</span>
                  
                  <div className="text-center my-auto">
                    <span className="font-display-kilimanjaro text-4xl block leading-none">KILI</span>
                    <span className="text-[10px] tracking-[0.25em] font-body-jakarta font-bold block mt-1 uppercase text-[#D4613C]">MANJARO</span>
                  </div>

                  <div className="flex justify-between items-center text-[8px] opacity-60">
                    <span>BAILE DIFERENTE</span>
                    <span>© 2024</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <p className="relative z-10 font-body-jakarta text-sm text-[#FCE6B2]/80 leading-relaxed max-w-md">
              Aplicação de ecobag de algodão cru com impressão em serigrafia terracota, valorizando a robustez geométrica da tipografia Kilimanjaro.
            </p>
          </div>

          {/* Mockup 2: Street Banner / Postes */}
          <div className="bg-[#2C5E3B] border border-[#FCE6B2]/15 p-8 md:p-12 rounded-[3.5rem] flex flex-col justify-between min-h-[480px] overflow-hidden relative shadow-2xl group">
            {/* Background visual graphics */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FCE6B2_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

            <div className="relative z-10 flex justify-between items-start">
              <span className="text-[10px] tracking-widest font-bold uppercase text-white/60">Mockup 02 / Sinalização</span>
              <span className="text-xs text-[#FCE6B2] uppercase font-body-jakarta">Banners de Rua</span>
            </div>

            {/* High-Fidelity Street Banner graphic */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-8">
              <div className="relative flex gap-8">
                {/* Iron lamp post line */}
                <div className="absolute -top-10 bottom-0 left-[calc(50%-1px)] w-0.5 bg-zinc-700 pointer-events-none" />

                {/* Banner 1 */}
                <motion.div 
                  whileHover={{ rotate: 1 }}
                  className="w-[100px] h-[200px] bg-[#D4613C] border border-black/10 shadow-lg p-2.5 flex flex-col justify-between text-white rounded-sm origin-top"
                >
                  <span className="text-[6px] tracking-widest font-bold uppercase opacity-80">Jadiel Oliveira</span>
                  <div className="text-center my-auto">
                    <span className="font-display-kilimanjaro text-xl block leading-none">BAILE</span>
                    <span className="font-brand-editorial text-[9px] tracking-widest block uppercase text-[#FCE6B2]">DIFERENTE</span>
                  </div>
                  <span className="text-[6px] tracking-widest block opacity-75">POSTE DE SINALIZAÇÃO</span>
                </motion.div>

                {/* Banner 2 */}
                <motion.div 
                  whileHover={{ rotate: -1 }}
                  className="w-[100px] h-[200px] bg-[#FCE6B2] border border-black/10 shadow-lg p-2.5 flex flex-col justify-between text-[#2C5E3B] rounded-sm origin-top"
                >
                  <span className="text-[6px] tracking-widest font-bold uppercase opacity-80">Jadiel Oliveira</span>
                  <div className="text-center my-auto">
                    <span className="font-display-kilimanjaro text-xl block leading-none">OPARA</span>
                    <span className="font-brand-editorial text-[9px] tracking-widest block uppercase text-[#D4613C]">SINFONIA</span>
                  </div>
                  <span className="text-[6px] tracking-widest block opacity-75">POSTE DE SINALIZAÇÃO</span>
                </motion.div>
              </div>
            </div>

            <p className="relative z-10 font-body-jakarta text-sm text-[#FCE6B2]/80 leading-relaxed max-w-md">
              Banners urbanos suspensos em postes metálicos duplos, promovendo o evento em via pública com as cores primárias do moodboard.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER NAVIGATION */}
      <footer className="mt-24 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-[#FCE6B2]/15 pt-12 max-w-7xl mx-auto">
        <Link to="/projects/$slug" params={{ slug: "fundacao-mgi" }} className="group block text-left" data-cursor="hover">
          <span className="text-[10px] uppercase tracking-widest text-[#D4613C] font-bold">Próximo Projeto →</span>
          <h4 className="font-brand-editorial text-3xl md:text-5xl text-white group-hover:translate-x-2 transition-transform duration-500 mt-2">
            Fundação MGI
          </h4>
        </Link>
        <span className="text-xs uppercase tracking-widest font-body-jakarta text-[#FCE6B2]/50">
          © 2026 GUSTAVO RANGEL • FEITO COM AMOR & MÚSICA
        </span>
      </footer>

    </main>
  );
}
