import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowLeft, Copy, Check, Play, Square, RefreshCw, Volume2, Maximize2, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Project } from "@/lib/projects";

// Import real project assets
import heroImage from "@/assets/hero-jadiel-novo.jpg";
import originalMoodboard from "@/assets/media__1779744441303.png";
import mockupRealNovo from "@/assets/mockups-real-novo.jpg";
import logoAtivo27 from "@/assets/Ativo 27.svg";
import logoAtivo28 from "@/assets/Ativo 28.svg";
import logoAtivo29 from "@/assets/Ativo 29.svg";
import logoAtivo30 from "@/assets/Ativo 30.svg";
import jadielAudio from "@/assets/audio-jadiel.webm";

interface JadielProjectPageProps {
  project: Project;
}

export function JadielProjectPage({ project: p }: JadielProjectPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const moodboardRef = useRef<HTMLDivElement>(null);

  // Parallax Scroll Effects for Hero Image Background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroBgY = useTransform(scrollYProgress, [0, 0.4], ["0%", "20%"]);
  const heroContentY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  // Color Palette Copy State
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  // Typographic specimen state
  const [fontSize, setFontSize] = useState<number>(64);
  const [specimenText, setSpecimenText] = useState<string>("SUA GLÓRIA, PRESENÇA MESMO NA MINHA AUSÊNCIA LEMBRA DE MIM");

  // Vinyl Player State
  const [vinylState, setVinylState] = useState<"idle" | "slid-out" | "playing">("idle");
  const [vinylCrackle, setVinylCrackle] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Lightbox Modal State
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(jadielAudio);
    audioRef.current.loop = true;
  }, []);

  const startVinylSynth = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.warn("Audio play blocked", e));
      setVinylCrackle(true);
    }
  };

  const stopVinylSynth = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setVinylCrackle(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
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
        
        @font-face {
          font-family: 'Kilimanjaro Sans';
          src: local('Kilimanjaro Sans');
        }

        .font-display-kilimanjaro {
          font-family: 'Kilimanjaro Sans', 'Unbounded', sans-serif;
          font-weight: 900;
          letter-spacing: -0.04em;
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
      <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center mix-difference">
        <Link to="/projects" className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#FCE6B2] hover:opacity-75 transition-opacity" data-cursor="hover">
          <ArrowLeft className="w-4 h-4" />
          Projetos
        </Link>
        <span className="text-xs uppercase tracking-[0.35em] font-body-jakarta font-bold text-[#FCE6B2]">
          Gustavo Rangel
        </span>
      </nav>

      {/* HERO SECTION - PREMIUM FULL SCREEN BACKGROUND (with contrast enhancements) */}
      <section className="min-h-screen flex flex-col justify-between pt-40 px-6 md:px-12 pb-16 relative overflow-hidden">
        {/* Cinematic full screen background photo of Jadiel Oliveira */}
        <motion.div 
          style={{ y: heroBgY }}
          className="absolute inset-0 z-0 select-none origin-top pointer-events-none"
        >
          <img 
            src={heroImage} 
            alt="Jadiel Oliveira Hero background" 
            className="w-full h-full object-cover scale-[1.03]"
          />
          {/* Contrast-boosting premium overlays */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#2C5E3B]/45 to-[#2C5E3B]/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C5E3B] via-[#2C5E3B]/35 to-black/65" />
        </motion.div>

        {/* Hero typography overlay */}
        <motion.div style={{ y: heroContentY, opacity: heroOpacity }} className="w-full relative z-10 my-auto max-w-5xl">
          <div className="flex items-center gap-4 text-xs font-body-jakarta font-bold uppercase tracking-[0.25em] text-[#FCE6B2] mb-6">
            <span className="bg-[#D4613C] text-white px-3 py-1 rounded-full text-[10px]">{p.category}</span>
            <span>•</span>
            <span className="font-semibold text-white/95">{p.year}</span>
          </div>

          <h1 className="font-brand-editorial text-[13vw] md:text-[7.5vw] leading-[0.82] text-[#FCE6B2] tracking-tighter text-balance uppercase drop-shadow-2xl">
            Jadiel Oliveira
            <br />
            <span className="text-[#D4613C]">
              Baile Diferente
            </span>
          </h1>

          <p className="font-body-jakarta text-white text-lg md:text-2xl font-medium max-w-3xl leading-relaxed mt-8 drop-shadow-lg text-balance">
            {p.story[0]}
          </p>
        </motion.div>

        {/* Footer of the hero block */}
        <div className="relative z-10 flex justify-between items-end border-t border-[#FCE6B2]/15 pt-6 w-full">
          <span className="text-[10px] tracking-[0.2em] text-[#FCE6B2]/60 uppercase font-bold">Direção Criativa & Design</span>
          <span className="font-brand-editorial text-lg text-white">Gustavo Rangel © 2024</span>
        </div>
      </section>

      {/* MOODBOARD SECTION (Real original Moodboard image display with zoomable frame) */}
      <section ref={moodboardRef} className="py-24 px-6 md:px-12 bg-[#0d0d0f] text-[#FCE6B2] rounded-[3.5rem] border border-[#FCE6B2]/10 my-16">
        <div className="max-w-4xl mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-body-jakarta text-[#D4613C] font-bold block mb-4">REFERÊNCIAS E CONCEITO</span>
          <h2 className="font-brand-editorial text-4xl md:text-6xl text-[#FCE6B2] mb-6 leading-none">
            Moodboard Original.
          </h2>
          <p className="font-body-jakarta text-[#FCE6B2]/75 text-lg md:text-xl leading-relaxed">
            Esta é a colagem semântica original do projeto — reunindo as referências estéticas, contrastes cromáticos de terra e folha, tipografia expressiva e a essência da cultura afro-contemporânea urbana que pavimentou o caminho criativo.
          </p>
        </div>

        {/* Interactive moodboard container */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="relative rounded-[2.5rem] overflow-hidden border border-[#FCE6B2]/15 shadow-2xl bg-zinc-950 group cursor-zoom-in"
          onClick={() => setActiveImage(originalMoodboard)}
        >
          <img 
            src={originalMoodboard} 
            alt="Moodboard Original do Projeto Baile Diferente" 
            className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />
          
          {/* Zoom indicator overlay */}
          <div className="absolute top-6 right-6 bg-black/75 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-[#FCE6B2] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2">
            <Maximize2 className="w-3.5 h-3.5" />
            Expandir Moodboard
          </div>

          <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pointer-events-none">
            <div>
              <span className="text-[10px] tracking-widest font-bold uppercase text-[#D4613C]">Estudo Conceitual</span>
              <h3 className="font-brand-editorial text-2xl text-white mt-1">Conexões Visuais & Contrapontos</h3>
            </div>
            <p className="font-body-jakarta text-xs text-[#FCE6B2]/70 max-w-md leading-relaxed">
              O rio Opara, tipografia de peso em cartazes dos anos 70, e a expressividade modular da cena acústica africana urbana.
            </p>
          </div>
        </motion.div>
      </section>

      {/* LOGOS AND VARIATIONS SHOWCASE (Recreated to match the real branding lockups) */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-body-jakarta text-[#D4613C] font-bold block mb-4">SISTEMA GRÁFICO</span>
          <h2 className="font-brand-editorial text-4xl md:text-6xl text-[#FCE6B2] mb-6 leading-none">
            Logotipos e Variações.
          </h2>
          <p className="font-body-jakarta text-[#FCE6B2]/80 text-lg max-w-3xl leading-relaxed">
            O logotipo foi construído para transmitir o ritmo e a fluidez do próprio Baile. As variações passeiam entre o padrão cursivo, selo circular, e o monograma compacto de estrela com semi-círculos de argila.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch mt-12">
          <motion.div whileHover={{ scale: 1.02 }} className="bg-[#FCE6B2] p-8 rounded-[2.5rem] flex items-center justify-center min-h-[250px] shadow-xl">
            <img src={logoAtivo27} alt="Logo Variation 1" className="w-full h-auto max-h-[180px] object-contain drop-shadow-md" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="bg-[#D4613C] p-8 rounded-[2.5rem] flex items-center justify-center min-h-[250px] shadow-xl">
            <img src={logoAtivo28} alt="Logo Variation 2" className="w-full h-auto max-h-[180px] object-contain drop-shadow-md" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="bg-[#90593B] p-8 rounded-[2.5rem] flex items-center justify-center min-h-[250px] shadow-xl">
            <img src={logoAtivo29} alt="Logo Variation 3" className="w-full h-auto max-h-[180px] object-contain drop-shadow-md" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="bg-[#2C5E3B] p-8 rounded-[2.5rem] flex items-center justify-center min-h-[250px] shadow-xl">
            <img src={logoAtivo30} alt="Logo Variation 4" className="w-full h-auto max-h-[180px] object-contain drop-shadow-md" />
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

      {/* TYPOGRAPHY SPECIMEN SANDBOX (Updated to use Unbounded representing Kilimanjaro Sans) */}
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
                Usamos a fonte **Kilimanjaro Sans** (aqui aplicada) como tipografia display expressiva e marcante nos títulos gerais. Para o suporte editorial, aplicamos a clássica **Helvetica Neue**.
              </p>
            </div>

            {/* Interactive controls */}
            <div className="bg-[#0d0d0f]/60 border border-[#FCE6B2]/10 p-6 rounded-[2.5rem] space-y-6">
              <span className="text-[10px] font-bold tracking-widest text-[#D4613C] uppercase block">Espécime Interativo</span>
              
              {/* Font selector input */}
              <div className="space-y-2">
                <label className="text-xs font-body-jakarta text-[#FCE6B2]/70 uppercase font-bold">Texto de Teste</label>
                <textarea 
                  rows={3}
                  value={specimenText}
                  onChange={(e) => setSpecimenText(e.target.value)}
                  className="w-full bg-[#141416] border border-[#FCE6B2]/15 text-[#FCE6B2] px-4 py-3 rounded-xl focus:outline-none focus:border-[#D4613C] font-body-jakarta text-xs leading-normal transition-colors"
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
                  max="100" 
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
              <span className="text-xs tracking-widest font-body-jakarta text-[#D4613C] font-bold uppercase block mb-4">Display Principal / Kilimanjaro Sans</span>
              
              <div className="overflow-hidden py-4">
                <motion.div 
                  className="font-display-kilimanjaro text-white leading-tight tracking-tight break-words select-all"
                  style={{ fontSize: `${fontSize}px` }}
                  layout
                >
                  {specimenText || "Kilimanjaro"}
                </motion.div>
              </div>

              <div className="flex flex-wrap gap-4 text-xs font-body-jakarta text-[#FCE6B2]/60 mt-6 uppercase">
                <span>Display Sans</span>
                <span>•</span>
                <span>Ultra-Heavy weight</span>
                <span>•</span>
                <span>African Geometric Concept</span>
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

      {/* THE MASTERPIECE: INTERACTIVE TURNTABLE VINYL PLAYER (With Spotify Integration!) */}
      <section className="py-24 px-6 md:px-12 bg-[#0d0d0f] text-[#FCE6B2] border-t border-[#FCE6B2]/10 my-16 relative overflow-hidden">
        
        {/* Glow effect when playing */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4613C]/10 rounded-full blur-[140px] pointer-events-none transition-opacity duration-1000 ${vinylState === "playing" ? "opacity-100 animate-pulse" : "opacity-0"}`} />

        <div className="max-w-4xl mb-16 relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] font-body-jakarta text-[#D4613C] font-bold block mb-4">INTERATIVIDADE AUDIÓFILA</span>
          <h2 className="font-brand-editorial text-4xl md:text-6xl text-[#FCE6B2] mb-6 leading-none">
            Vitrola Interativa.
          </h2>
          <p className="font-body-jakarta text-[#FCE6B2]/75 text-lg leading-relaxed">
            Uma homenagem física e interativa às raízes sonoras do projeto. Passe o mouse para deslizar o disco, clique para levá-lo à vitrola e ligar o ruído quente de vinil analógico. Aproveite para escutar a faixa original "Quem Chegou Primeiro" no Spotify do artista!
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

        {/* Premium Spotify and audio links */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 relative z-10">
          <a 
            href="https://open.spotify.com/intl-pt/track/4Ofs1QBDXqGJMBxF9azCSn?si=48c187911014410f"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-[#1DB954] hover:bg-[#1ed760] text-black font-body-jakarta px-8 py-4 rounded-full text-xs uppercase tracking-widest font-black shadow-2xl transition-all hover:scale-105"
            data-cursor="hover"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.892-1.007-.334.074-.668-.137-.743-.472-.074-.334.137-.668.471-.742 3.853-.847 7.152-.466 9.822 1.17.295.18.387.563.203.844zm1.226-2.723c-.226.367-.707.487-1.074.26-2.717-1.67-6.86-2.154-10.063-1.183-.413.127-.85-.103-.977-.513-.127-.413.103-.85.513-.977 3.666-1.11 8.232-.573 11.34 1.34.367.227.487.708.26 1.073zm.105-2.833C14.462 8.762 8.784 8.574 5.51 9.566c-.502.152-1.03-.135-1.182-.638-.152-.502.135-1.03.638-1.182 3.77-1.144 10.024-.925 14.07 1.48.453.27.602.853.332 1.306-.27.453-.853.602-1.306.332z"/>
            </svg>
            Ouvir "Quem Chegou Primeiro" no Spotify →
          </a>
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

      {/* MOCKUPS SHOWCASE (Stunning interactive cards featuring real photographed mockups!) */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-body-jakarta text-[#D4613C] font-bold block mb-4">ENTREGAS DE PROJETO</span>
          <h2 className="font-brand-editorial text-4xl md:text-6xl text-[#FCE6B2] mb-6 leading-none">
            Mockups e Aplicações.
          </h2>
          <p className="font-body-jakarta text-[#FCE6B2]/80 text-lg max-w-3xl leading-relaxed">
            Veja as peças físicas desenvolvidas ganharem vida. Clique em qualquer aplicação para abrir o detalhe em alta definição e conferir os contrastes e a qualidade da serigrafia e wayfinding urbano.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 items-stretch">
          
          {/* Mockup 1: Real Mockups Collection */}
          <motion.div 
            whileHover={{ y: -6 }}
            onClick={() => setActiveImage(mockupRealNovo)}
            className="bg-[#0d0d0f] border border-[#FCE6B2]/10 rounded-[3rem] p-6 md:p-8 flex flex-col shadow-2xl group cursor-zoom-in min-h-[500px]"
          >
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg mb-6 bg-zinc-950 aspect-[16/9] md:aspect-video">
              <img 
                src={mockupRealNovo} 
                alt="Mockup Collection Premium" 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute top-4 right-4 bg-black/85 backdrop-blur-sm border border-white/5 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-4 h-4 text-[#FCE6B2]" />
              </div>
            </div>
            
            <div className="flex flex-col text-center items-center">
              <span className="text-[10px] tracking-widest font-bold uppercase text-[#D4613C] font-body-jakarta">Mockup Premium / Merchandising Físico</span>
              <h3 className="font-brand-editorial text-3xl text-white mt-2">Identidade Visual & Aplicações</h3>
              <p className="font-body-jakarta text-base text-[#FCE6B2]/70 mt-4 leading-relaxed max-w-2xl mx-auto">
                Uma visão abrangente de como a identidade visual do Baile Diferente se comporta no mundo físico. Das texturas e serigrafias aos envelopes de vinil, cada mockup é meticulosamente pensado para gerar valor.
              </p>
            </div>
          </motion.div>

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

      {/* LIGHTBOX MODAL FOR REAL MEDIA */}
      <AnimatePresence>
        {activeImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-7xl max-h-[90vh] overflow-hidden rounded-3xl"
            >
              <img 
                src={activeImage} 
                alt="Asset ampliado" 
                className="w-full h-auto max-h-[85vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
