import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { RevealLine, FadeUp } from "@/components/Reveal";
import { ServiceCards } from "@/components/ServiceCards";
import { ScrollSectionWrapper } from "@/components/ScrollSectionWrapper";
import { 
  Play, 
  Volume2, 
  Check, 
  Copy, 
  ArrowRight, 
  BookOpen, 
  Download, 
  Sparkles,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Flame,
  Shield,
  Layers,
  Heart
} from "lucide-react";

// Assets hero & Jadiel
import heroVideo from "@/assets/hero-bg-scroll.mp4";
import heroJadiel from "@/assets/hero-jadiel-novo.jpg";
import mockupJadiel from "@/assets/media__1779744441557.png";
import moodboardJadiel from "@/assets/media__1779744441303.png";
import logoAtivo27 from "@/assets/Ativo 27.svg";
import logoAtivo28 from "@/assets/Ativo 28.svg";
import logoAtivo29 from "@/assets/Ativo 29.svg";
import logoAtivo30 from "@/assets/Ativo 30.svg";
import jadielAudio from "@/assets/Jadiel Oliveira, André Freitas, Donatinho, Erick Pontes, Felipe Pizzutiello, Tuto Ferraz - A Música.mp3";

// Assets Fornalha
import fornalhaGuia from "@/assets/Fornalha da Guilda - IDV/Guia de marca completo - Fornalha da guilda - extraia imagens dessa imagem para compor.png";
import fornalhaThumb from "@/assets/fornalha.jpg";

// Assets Starbrick
import pdfStarbrick from "@/assets/StarBrick e submarcas/Manual de marca - StarBrick (2).pdf";
import pdfMyIn from "@/assets/StarBrick e submarcas/Manual de marca - My In.pdf";
import pdfRiviera from "@/assets/StarBrick e submarcas/Riviera manual de marca.pdf";

// Assets Podtá / Tati Arruda
import tatiDor from "@/assets/PodTá ou Tati Arruda/A dor de começar do zero.png";
import tatiDecisoes from "@/assets/PodTá ou Tati Arruda/Como lidar com as decisões difíceis que só o dono toma_.png";
import tatiTweet from "@/assets/PodTá ou Tati Arruda/Frase de impacto de um convidado em formato de _tweet_ (imagem simples)_.png";
import tatiCircular from "@/assets/PodTá ou Tati Arruda/O que é Economia Circular.png";
import tatiQuem from "@/assets/PodTá ou Tati Arruda/Quem é a Tatiane.png";
import tatiRotina from "@/assets/PodTá ou Tati Arruda/Rotina de uma Mulher Multi.png";

// Assets Della Brianza — vídeos servidos via public/ para evitar limite de 25MB do Cloudflare
const dellaTirolez = "/videos/della-tirolez.mp4";
const dellaEntrada = "/videos/della-entrada.mp4";
const dellaPremiacoes = "/videos/della-premiacoes.mp4";
import dellaLogo from "@/assets/Della Brianza/Logo - Della Brianza.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gustavo Rangel — Designer Gráfico & Diretor de Arte" },
      { name: "description", content: "Portfólio selecionado: branding de alto padrão, identidades visuais marcantes e design estratégico para mídias sociais." },
      { property: "og:title", content: "Gustavo Rangel — Designer Gráfico" },
      { property: "og:description", content: "Direção de arte, identidades visuais de impacto e design estratégico." },
    ],
  }),
  component: Home,
});

function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // Jadiel States
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [vinylState, setVinylState] = useState<"idle" | "slid-out" | "playing">("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Podtá Slider
  const [currentPodtaIndex, setCurrentPodtaIndex] = useState(0);
  const podtaImages = [
    { src: tatiQuem, title: "Quem é a Tatiane" },
    { src: tatiCircular, title: "O que é Economia Circular" },
    { src: tatiRotina, title: "Rotina de uma Mulher Multi" },
    { src: tatiDor, title: "A dor de começar do zero" },
    { src: tatiDecisoes, title: "Tomada de decisões complexas" },
    { src: tatiTweet, title: "Pílula de conteúdo (Tweet)" }
  ];

  // Della Brianza Video Player
  const [currentDellaVideo, setCurrentDellaVideo] = useState("tirolez");
  const dellaVideoRef = useRef<HTMLVideoElement | null>(null);

  const dellaVideos = [
    { id: "tirolez", name: "Efeito Cheesepull (Tirolez)", src: dellaTirolez },
    { id: "entrada", name: "Montagem da Entrada", src: dellaEntrada },
    { id: "premiacoes", name: "Selos & Premiações", src: dellaPremiacoes }
  ];

  useEffect(() => {
    // Preload hero video
    fetch(heroVideo)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setVideoSrc(url);
      })
      .catch(() => setVideoSrc(heroVideo));

    // Audio setup
    audioRef.current = new Audio(jadielAudio);
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Scrub the hero video currentTime on scroll
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const y = useTransform(scrollYProgress, [0.8, 1], [0, -80]);
  const scale = useTransform(scrollYProgress, [0.8, 1], [1, 0.95]);
  const contentOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  const videoOpacity = useTransform(scrollYProgress, [0.8, 1], [0.35, 0]);

  const headlineOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.12], [0, -40]);

  const leftDescOpacity = useTransform(scrollYProgress, [0, 0.12, 0.8, 1.0], [0, 1.0, 1.0, 0]);
  const nameX = useTransform(scrollYProgress, [0.08, 0.65], ["18%", "-12%"]);
  const nameOpacity = useTransform(scrollYProgress, [0.08, 0.20, 0.52, 0.65], [0, 1, 1, 0]);
  const nameScale = useTransform(scrollYProgress, [0.08, 0.20, 0.52, 0.65], [0.88, 1.0, 1.05, 1.25]);
  const nameYOffset = useTransform(scrollYProgress, [0.08, 0.20, 0.52, 0.65], [30, 0, -10, -40]);
  const blurVal = useTransform(scrollYProgress, [0.08, 0.20, 0.52, 0.65], [20, 0, 0, 20]);
  const nameFilter = useTransform(blurVal, (v) => `blur(${v}px)`);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const scrubProgress = Math.min(latest / 0.8, 1);
    video.currentTime = scrubProgress * video.duration;
  });

  const startVinyl = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((e) => console.warn("Audio play blocked", e));
    }
  };

  const stopVinyl = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleVinylClick = () => {
    if (vinylState === "idle") {
      setVinylState("slid-out");
    } else if (vinylState === "slid-out") {
      setVinylState("playing");
      setTimeout(() => {
        startVinyl();
      }, 900);
    } else {
      stopVinyl();
      setVinylState("idle");
    }
  };

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  const nextPodta = () => {
    setCurrentPodtaIndex((prev) => (prev + 1) % podtaImages.length);
  };

  const prevPodta = () => {
    setCurrentPodtaIndex((prev) => (prev - 1 + podtaImages.length) % podtaImages.length);
  };

  const changeDellaVideo = (videoId: string) => {
    setCurrentDellaVideo(videoId);
    if (dellaVideoRef.current) {
      dellaVideoRef.current.load();
      dellaVideoRef.current.play().catch(e => console.warn("Della video error", e));
    }
  };

  const currentDellaSrc = dellaVideos.find(v => v.id === currentDellaVideo)?.src || dellaTirolez;

  return (
    <main className="overflow-x-hidden" id="top">
      {/* CUSTOM STYLE VARIABLES FOR THE EDITORIAL SECTIONS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,600;12..96,800&family=Plus+Jakarta+Sans:wght@300;400;500;700;800&family=Syne:wght@700;800&display=swap');
        .font-brand {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
        }
        .font-jakarta {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .vinyl-spin {
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* HERO WRAPPER FOR SCROLL TRACK */}
      <div ref={containerRef} className="relative h-[200vh]">
        <section className="sticky top-0 flex h-[100svh] w-full flex-col justify-between px-5 pb-10 pt-32 md:px-10 md:pt-40 overflow-hidden">
          <motion.div style={{ opacity: videoOpacity, scale }} className="absolute inset-0 z-0 pointer-events-none origin-top">
            <video
              key={videoSrc || "pending"}
              ref={videoRef}
              preload="auto"
              muted
              playsInline
              className="h-full w-full object-cover grayscale brightness-[0.4] contrast-[1.1]"
            >
              {videoSrc && <source src={videoSrc} type="video/mp4" />}
            </video>
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-background/40 to-background/90" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
          </motion.div>

          <motion.div
            style={{ x: nameX, y: nameYOffset, opacity: nameOpacity, scale: nameScale, filter: nameFilter }}
            className="absolute inset-x-0 top-[46%] -translate-y-1/2 z-10 pointer-events-none whitespace-nowrap text-center origin-center select-none"
          >
            <h2 className="font-display text-[14vw] md:text-[11vw] font-black uppercase tracking-tighter leading-none text-white mix-blend-plus-lighter drop-shadow-2xl">
              <span className="text-transparent" style={{ WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.8)" }}>GUSTAVO</span> <span className="text-primary italic drop-shadow-none">RANGEL</span>
            </h2>
            <p className="text-[1.5vw] md:text-[0.9vw] tracking-[0.6em] font-sans text-muted-foreground/60 mt-3 block font-semibold pl-[0.6em]">
              DIREÇÃO CRIATIVA • BRANDING • ARTES VISUAIS
            </p>
          </motion.div>

          <motion.div 
            style={{ opacity: leftDescOpacity }} 
            className="absolute left-6 md:left-12 top-[68%] md:top-[70%] z-20 max-w-[240px] md:max-w-[320px] pointer-events-none border-l-2 border-primary pl-4 md:pl-5"
          >
            <p className="text-sm md:text-[15px] leading-relaxed text-zinc-100 font-jakarta">
              Designer Gráfico com foco em criar marcas inesquecíveis, identidades de altíssimo padrão e posicionamentos estéticos estratégicos.
            </p>
          </motion.div>

          <motion.div style={{ y: headlineY, scale, opacity: headlineOpacity }} className="relative z-10 origin-top">
            <h1 className="font-display text-[19vw] leading-[0.85] md:text-[14vw] mix-blend-plus-lighter">
              <RevealLine>Design</RevealLine>
              <RevealLine delay={0.1}>com <span className="italic text-primary">propósito</span></RevealLine>
              <RevealLine delay={0.2}>e impacto.</RevealLine>
            </h1>
          </motion.div>

          <motion.div style={{ opacity: contentOpacity }} className="relative z-10 mt-12 flex justify-between items-end">
            <div className="hidden md:block text-[10px] uppercase tracking-widest text-muted-foreground/30">
              GUSTAVO RANGEL — DESIGN PORTFOLIO
            </div>
            <FadeUp delay={0.55} className="flex items-end">
              <a
                href="#identidades-visuais"
                className="group inline-flex items-center gap-3 text-xs uppercase tracking-widest text-foreground hover:text-primary transition-colors"
              >
                <span className="h-px w-12 bg-foreground transition-all group-hover:w-20 group-hover:bg-primary" />
                Explorar portfólio
              </a>
            </FadeUp>
          </motion.div>

          <motion.div
            style={{ opacity: headlineOpacity }}
            className="relative z-10 mx-auto mt-8 text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            scroll
          </motion.div>
        </section>
      </div>

      <Marquee items={["Branding", "Identidade Visual", "Direção de Arte", "Social Media Premium", "Design Editorial", "Skeuomorphism"]} />

      {/* ==================== SEÇÃO 1: IDENTIDADES VISUAIS ==================== */}
      <section id="identidades-visuais" className="relative z-10 bg-background pt-24 pb-12">
        <div className="px-5 md:px-10 mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-primary mb-3">// VERTENTE 01</p>
          <h2 className="font-display text-5xl md:text-8xl tracking-tighter leading-none text-white uppercase">
            Identidades<br/>
            <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>Visuais</span>
          </h2>
          <p className="mt-6 max-w-2xl text-muted-foreground text-sm md:text-base font-jakarta leading-relaxed">
            Sistemas gráficos modulares e sensoriais construídos para traduzir o invisível em marcas físicas imponentes, sofisticadas e com forte direcionamento de arte.
          </p>
        </div>

        {/* 1.1 JADIEL OLIVEIRA */}
        <ScrollSectionWrapper>
          <div className="bg-[#2C5E3B] text-[#FCE6B2] rounded-[3.5rem] p-6 md:p-16 mx-5 md:mx-10 mb-20 overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4613C]/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="grid gap-12 lg:grid-cols-12 items-start relative z-10">
              {/* Left text column */}
              <div className="lg:col-span-5 space-y-8">
                <div className="flex items-center gap-3">
                  <span className="bg-[#D4613C] text-white px-3 py-1 rounded-full text-[10px] font-jakarta font-bold uppercase tracking-wider">Identidade Visual</span>
                  <span className="text-xs tracking-widest uppercase font-bold text-white">2024</span>
                </div>

                <h3 className="font-brand text-5xl md:text-7xl leading-[0.9] text-white uppercase tracking-tighter">
                  Jadiel Oliveira <br/>
                  <span className="text-[#D4613C] italic font-normal font-sans">Baile Diferente</span>
                </h3>

                <p className="font-jakarta text-white/95 text-base md:text-lg leading-relaxed text-balance">
                  Artista e curador sonoro extraordinário, Jadiel demandava uma representação que vibrasse livremente entre o erudito e o popular. Inspirada na expressividade da cena acústica africana urbana e em Miró, nasceu uma identidade visual de ritmo livre e marcante.
                </p>

                {/* Earthy Color Palette block */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h4 className="text-xs uppercase tracking-[0.25em] text-[#D4613C] font-bold">Código Cromático Sensorial</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { hex: "#2C5E3B", name: "Floresta Opara" },
                      { hex: "#FCE6B2", name: "Creme Kilimanjaro" },
                      { hex: "#D4613C", name: "Terracota Baile" },
                      { hex: "#90593B", name: "Argila Seca" },
                    ].map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => handleCopyColor(c.hex)}
                        className="group flex items-center gap-2 bg-black/35 backdrop-blur-md hover:bg-black/60 transition-all border border-white/10 px-3 py-2 rounded-full text-[11px] font-bold tracking-wider font-jakarta text-white"
                      >
                        <span className="w-3.5 h-3.5 rounded-full shadow" style={{ backgroundColor: c.hex }} />
                        <span>{c.name}</span>
                        {copiedColor === c.hex ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Logos and Monograms Showcase */}
                <div className="pt-4 space-y-4">
                  <h4 className="text-xs uppercase tracking-[0.25em] text-[#D4613C] font-bold">Selo & Monogramas Modulares</h4>
                  <div className="grid grid-cols-4 gap-3">
                    {[logoAtivo27, logoAtivo28, logoAtivo29, logoAtivo30].map((logo, idx) => (
                      <div key={idx} className="bg-[#141416]/40 backdrop-blur border border-white/10 p-3 rounded-2xl flex items-center justify-center hover:scale-105 transition-transform">
                        <img src={logo} alt="Jadiel Stamp Logo" className="w-full h-auto max-h-[50px] object-contain drop-shadow" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right interactive vitrola + mockups */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-8">
                {/* Vinyl turntable section */}
                <div className="bg-[#141416] border border-white/10 rounded-[3rem] p-6 w-full flex flex-col items-center justify-center shadow-xl">
                  <div className="text-center mb-6">
                    <span className="text-[10px] tracking-widest text-[#D4613C] font-bold uppercase block">Dispositivo Analógico Interativo</span>
                    <h4 className="font-brand text-2xl text-white mt-1">Gire o Vinil do Baile</h4>
                    <p className="text-xs text-white/60 font-jakarta max-w-sm mt-1">
                      Passe o mouse ou clique no disco para movê-lo até o prato e ouvir "Quem Chegou Primeiro" no vinil.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-10 py-4 w-full">
                    {/* The Sleeve */}
                    <div className="relative w-[200px] h-[200px] shrink-0">
                      {/* Record */}
                      <motion.div
                        onClick={handleVinylClick}
                        animate={
                          vinylState === "idle"
                            ? { x: 0, y: 0, rotate: 0, zIndex: 10 }
                            : vinylState === "slid-out"
                            ? { x: 60, y: 0, rotate: 45, zIndex: 20 }
                            : { x: 170, y: -10, rotate: 360, zIndex: 20 }
                        }
                        transition={{ type: "spring", stiffness: 90, damping: 15 }}
                        className="absolute inset-1.5 bg-zinc-900 rounded-full border border-black shadow-xl flex items-center justify-center cursor-pointer group"
                      >
                        <div className={`w-full h-full absolute inset-0 flex items-center justify-center ${vinylState === "playing" ? "vinyl-spin" : ""}`}>
                          <div className="w-[70px] h-[70px] rounded-full bg-[#D4613C] border border-black flex items-center justify-center text-center">
                            <span className="font-brand text-[7px] text-[#FCE6B2] leading-none uppercase font-bold">
                              Jadiel Oliveira<br/><span className="text-[5px] opacity-75">Baile Diferente</span>
                            </span>
                          </div>
                        </div>
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-950 border border-zinc-800 z-10" />
                      </motion.div>

                      {/* Jacket Cover */}
                      <div
                        onClick={handleVinylClick}
                        className="absolute inset-0 bg-[#2C5E3B] border border-white/20 rounded-2xl p-4 flex flex-col justify-between shadow-2xl z-30 cursor-pointer overflow-hidden"
                      >
                        <span className="text-[8px] tracking-widest font-bold uppercase text-white/70">LP STEREO • 33 RPM</span>
                        <div>
                          <h5 className="font-brand text-xl text-white leading-tight">Baile Diferente</h5>
                          <p className="text-[9px] text-[#FCE6B2]/80 uppercase font-jakarta mt-1">Gustavo Rangel © 2024</p>
                        </div>
                      </div>
                    </div>

                    {/* Turntable Platter */}
                    <div className="relative w-[220px] h-[220px] bg-[#1d1d1f] border-2 border-zinc-800 rounded-[2rem] shadow-inner flex items-center justify-center overflow-hidden">
                      <div className="w-[180px] h-[180px] rounded-full bg-zinc-900 border-4 border-zinc-800 relative flex items-center justify-center">
                        <div className="w-[155px] h-[155px] rounded-full bg-zinc-950 border border-zinc-900 relative" />
                      </div>

                      {/* Tone arm */}
                      <motion.div
                        animate={vinylState === "playing" ? { rotate: 26, zIndex: 40 } : { rotate: 0, zIndex: 40 }}
                        transition={{ duration: 0.8 }}
                        style={{ originX: "80%", originY: "15%" }}
                        className="absolute top-4 right-4 w-16 h-32 pointer-events-none origin-top-right z-30"
                      >
                        <svg className="w-full h-full" viewBox="0 0 100 200" fill="none">
                          <circle cx="80" cy="25" r="10" fill="#3f3f46" />
                          <path d="M 80,25 Q 50,75 40,140" stroke="#d4d4d8" strokeWidth="3" strokeLinecap="round" />
                          <rect x="34" y="140" width="12" height="20" rx="3" transform="rotate(-15, 40, 140)" fill="#D4613C" />
                        </svg>
                      </motion.div>

                      {/* Button indicator */}
                      <button
                        onClick={handleVinylClick}
                        className={`absolute bottom-3 left-3 w-5 h-5 rounded-full border ${vinylState === "playing" ? "bg-red-500 border-red-400" : "bg-zinc-800 border-zinc-700"} transition-all`}
                      />

                      {vinylState === "playing" && (
                        <Volume2 className="absolute bottom-3 right-3 w-4 h-4 text-[#D4613C] animate-bounce" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Premium Mockups Grid */}
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="relative rounded-[2rem] overflow-hidden border border-white/10 cursor-zoom-in" onClick={() => setActiveImage(mockupJadiel)}>
                    <img src={mockupJadiel} alt="Mockup Jadiel" className="w-full h-[180px] object-cover hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/40 hover:opacity-0 transition-opacity flex items-center justify-center">
                      <span className="text-[10px] tracking-widest uppercase font-bold text-white bg-black/60 px-3 py-1.5 rounded-full flex items-center gap-1"><Maximize2 className="w-3 h-3" /> Mockup Real</span>
                    </div>
                  </div>
                  <div className="relative rounded-[2rem] overflow-hidden border border-white/10 cursor-zoom-in" onClick={() => setActiveImage(moodboardJadiel)}>
                    <img src={moodboardJadiel} alt="Moodboard Jadiel" className="w-full h-[180px] object-cover hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/40 hover:opacity-0 transition-opacity flex items-center justify-center">
                      <span className="text-[10px] tracking-widest uppercase font-bold text-white bg-black/60 px-3 py-1.5 rounded-full flex items-center gap-1"><Maximize2 className="w-3 h-3" /> Moodboard</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollSectionWrapper>

        {/* 1.2 A FORNALHA DA GUILDA */}
        <ScrollSectionWrapper>
          <div className="bg-[#141416] text-[#e4e4e7] rounded-[3.5rem] p-6 md:p-16 mx-5 md:mx-10 mb-20 border border-zinc-800 overflow-hidden shadow-2xl relative">
            <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="grid gap-12 lg:grid-cols-12 items-center">
              {/* Image Grid / Showcase */}
              <div className="lg:col-span-6 space-y-6">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 aspect-[4/3]">
                  <img 
                    src={fornalhaGuia} 
                    alt="Guia de Marca Fornalha da Guilda" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] tracking-widest uppercase text-amber-500 font-bold">Guia de Marca Completo</span>
                      <h4 className="font-brand text-2xl text-white mt-1">Cores, Escudo & Grimório</h4>
                    </div>
                    <button 
                      onClick={() => setActiveImage(fornalhaGuia)}
                      className="bg-black/80 hover:bg-black p-3 rounded-full text-white transition-colors"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Sub row showing food truck layout */}
                <div className="relative rounded-2xl overflow-hidden border border-zinc-800 h-[150px]">
                  <img src={fornalhaThumb} alt="Fornalha Foodtruck" className="w-full h-full object-cover brightness-[0.7] grayscale hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-black/45 flex items-center justify-center p-4">
                    <p className="text-xs text-center font-jakarta text-white/80 leading-relaxed italic">
                      "Comer na Fornalha é mais do que jantar, é embarcar em uma verdadeira campanha medieval de RPG."
                    </p>
                  </div>
                </div>
              </div>

              {/* Text / Copy Column */}
              <div className="lg:col-span-6 space-y-8">
                <div className="flex items-center gap-3">
                  <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-[10px] font-jakarta font-bold uppercase tracking-wider">Branding & Embalagem</span>
                  <span className="text-xs tracking-widest uppercase font-bold text-zinc-500">2025</span>
                </div>

                <h3 className="font-brand text-5xl md:text-7xl leading-[0.9] text-white uppercase tracking-tighter">
                  A Fornalha <br/>
                  <span className="text-amber-500 italic font-normal font-sans">da Guilda</span>
                </h3>

                <p className="font-jakarta text-zinc-300 text-base md:text-lg leading-relaxed text-balance">
                  Um food truck com o coração fincado no universo de RPG e alta fantasia precisava de mais do que apenas um logo bonito. Criamos uma marca com o peso e a textura de uma armadura medieval. O cardápio funciona como uma verdadeira ficha de personagem, brochuras divididas por classes (Guerreiro, Mago, Ladino) agem como menus e peças de colecionador, e a paleta em cobre martelado e azul-aço evoca a nobreza de uma forja antiga.
                </p>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800">
                  <div className="space-y-1">
                    <Flame className="w-5 h-5 text-amber-500" />
                    <h5 className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold mt-2">Tom de Voz</h5>
                    <p className="text-xs text-zinc-500 font-jakarta leading-normal">Lúdico, místico e acolhedor como uma taberna</p>
                  </div>
                  <div className="space-y-1">
                    <Shield className="w-5 h-5 text-amber-500" />
                    <h5 className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold mt-2">Identidade</h5>
                    <p className="text-xs text-zinc-500 font-jakarta leading-normal">Escudos de ferro, texturas rústicas e selos de cera</p>
                  </div>
                  <div className="space-y-1">
                    <Layers className="w-5 h-5 text-amber-500" />
                    <h5 className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold mt-2">Materiais</h5>
                    <p className="text-xs text-zinc-500 font-jakarta leading-normal">Papéis texturizados, gravuras metálicas e couro</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollSectionWrapper>

        {/* 1.3 STARBRICK E SUBMARCAS */}
        <ScrollSectionWrapper>
          <div className="bg-[#11161d] text-[#e2e8f0] rounded-[3.5rem] p-6 md:p-16 mx-5 md:mx-10 mb-20 border border-slate-800 overflow-hidden shadow-2xl relative">
            <div className="absolute right-0 bottom-0 w-[450px] h-[450px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="grid gap-12 lg:grid-cols-12 items-center">
              {/* Copy / Info */}
              <div className="lg:col-span-6 space-y-8">
                <div className="flex items-center gap-3">
                  <span className="bg-sky-750 border border-sky-400 text-sky-300 px-3 py-1 rounded-full text-[10px] font-jakarta font-bold uppercase tracking-wider">Alto Padrão & Incorporação</span>
                  <span className="text-xs tracking-widest uppercase font-bold text-slate-500">2026</span>
                </div>

                <h3 className="font-brand text-5xl md:text-7xl leading-[0.9] text-white uppercase tracking-tighter">
                  Starbrick <br/>
                  <span className="text-sky-300 font-light font-sans tracking-wide">Incorporações</span>
                </h3>

                <p className="font-jakarta text-slate-300 text-base md:text-lg leading-relaxed text-balance">
                  Como uma construtora e incorporadora de altíssimo padrão, a premissa conceitual da Starbrick está visceralmente atada ao bem-estar e à qualidade de vida absoluta. Essa assinatura reflete-se com imponência no empreendimento **Riviera Dolce Vita** (uma simbiose perfeita entre luxo leve e natureza) e no **My In** (curadoria de arquitetura de interiores sob medida). O design gráfico adota caminhos geométricos limpos, muita sofisticação tipográfica e materiais tangíveis premium.
                </p>

                <div className="flex flex-col gap-3 pt-6 border-t border-slate-800">
                  <h4 className="text-[11px] uppercase tracking-widest text-slate-400 font-bold font-jakarta">Manuais de Identidade (Arquivos de Projeto)</h4>
                  
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { title: "StarBrick Institucional", desc: "Manual de Marca Principal", file: pdfStarbrick },
                      { title: "Riviera Dolce Vita", desc: "Design do Empreendimento", file: pdfRiviera },
                      { title: "My In Interiores", desc: "Manual de Curadoria", file: pdfMyIn },
                    ].map((manual, idx) => (
                      <a 
                        key={idx}
                        href={manual.file} 
                        download
                        className="flex flex-col justify-between p-4 bg-slate-900/60 backdrop-blur border border-slate-800 rounded-2xl hover:border-sky-400/50 hover:bg-slate-900 transition-all text-left group"
                      >
                        <BookOpen className="w-5 h-5 text-sky-300 group-hover:scale-110 transition-transform mb-4" />
                        <div>
                          <h5 className="text-xs font-bold text-white tracking-tight">{manual.title}</h5>
                          <p className="text-[10px] text-slate-400 font-jakarta mt-1 leading-tight">{manual.desc}</p>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold text-sky-400 mt-4">
                          <Download className="w-3 h-3" /> PDF
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Graphic Display Panel */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="bg-slate-900/80 border border-slate-800 rounded-[2.5rem] p-8 space-y-8 relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-sky-400/10 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="space-y-2">
                    <span className="text-[10px] tracking-widest font-bold text-sky-300 uppercase font-jakarta block">Conceito de Wellness</span>
                    <h4 className="font-brand text-3xl text-white">Sofisticação Orgânica & Minimalista</h4>
                  </div>

                  <p className="text-sm font-jakarta text-slate-400 leading-relaxed">
                    A base geométrica de Starbrick utiliza linhas limpas, espaços em branco generosos inspirados em arquitetura de museus e papéis texturizados de algodão para todos os materiais físicos entregues aos clientes de alto padrão.
                  </p>

                  <div className="border-t border-slate-800 pt-6 grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">Riviera</span>
                      <p className="text-xs text-slate-300 font-jakarta mt-1 leading-snug">Identidade baseada na brisa mediterrânea e na calmaria das marés.</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">My In</span>
                      <p className="text-xs text-slate-300 font-jakarta mt-1 leading-snug">Design sóbrio que valoriza os materiais brutos de interiores.</p>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-center">
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950 px-4 py-2 border border-slate-800 rounded-full font-jakarta font-semibold select-none">
                      <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                      Wellness na Interação Visual
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollSectionWrapper>
      </section>

      {/* ==================== SEÇÃO 2: DESIGN ESTRATÉGICO INSTAGRAM ==================== */}
      <section id="social-media" className="relative z-10 bg-paper text-ink pt-24 pb-12 rounded-[4rem]">
        <div className="px-5 md:px-10 mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-primary mb-3">// VERTENTE 02</p>
          <h2 className="font-display text-5xl md:text-8xl tracking-tighter leading-none uppercase text-zinc-950">
            Instagram &<br/>
            <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(0,0,0,0.3)" }}>Social Media</span>
          </h2>
          <p className="mt-6 max-w-2xl text-zinc-600 text-sm md:text-base font-jakarta leading-relaxed">
            Direção criativa e criativos premium focados em atrair, reter e converter o público de alto padrão através de estética requintada e storytelling afiado.
          </p>
        </div>

        {/* 2.1 PODTÁ / TATI ARRUDA */}
        <ScrollSectionWrapper>
          <div className="bg-[#141416] text-[#e4e4e7] rounded-[3.5rem] p-6 md:p-16 mx-5 md:mx-10 mb-20 overflow-hidden shadow-2xl relative border border-zinc-800">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="grid gap-12 lg:grid-cols-12 items-center">
              {/* Text Copy */}
              <div className="lg:col-span-5 space-y-8">
                <div className="flex items-center gap-3">
                  <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-[10px] font-jakarta font-bold uppercase tracking-wider">Social Media & Posicionamento</span>
                  <span className="text-xs tracking-widest uppercase font-bold text-zinc-500">2026</span>
                </div>

                <h3 className="font-brand text-5xl md:text-7xl leading-[0.9] text-white uppercase tracking-tighter">
                  Podtá / <br/>
                  <span className="text-emerald-400 italic font-normal font-sans">Tati Arruda</span>
                </h3>

                <p className="font-jakarta text-zinc-300 text-base md:text-lg leading-relaxed text-balance">
                  Tati é uma empreendedora de frentes múltiplas: empresária, apresentadora, mãe de pet e defensora ativa da economia circular e sustentabilidade. No **PodTá**, ela constrói um espaço acolhedor e profundo que foge de fofocas ou jargões corporativos áridos para dar foco a histórias reais.
                  <br/><br/>
                  A identidade visual e os criativos construídos para seu Instagram utilizam um contraste editorial nítido, micro-layouts sofisticados e carrosséis com roteiros refinados que traduzem a sua atitude e dinamismo.
                </p>

                <div className="pt-6 border-t border-zinc-800 flex justify-between items-center">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-jakarta">
                    <Heart className="w-4 h-4 text-emerald-400" />
                    <span>Mulher de várias frentes</span>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold uppercase tracking-widest">Sustentável & Humano</span>
                </div>
              </div>

              {/* Instagram Carousel Sandbox */}
              <div className="lg:col-span-7 flex flex-col items-center">
                <div className="bg-[#1c1c1e] border border-zinc-800 p-6 rounded-[2.5rem] w-full max-w-lg relative shadow-2xl flex flex-col">
                  
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs text-white">
                        TA
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white font-jakarta">@podta.tatiarruda</h4>
                        <p className="text-[9px] text-zinc-500 font-jakarta">Instagram Premium Feed</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold uppercase">Criativo {currentPodtaIndex + 1}/6</span>
                  </div>

                  {/* Active carousel slide */}
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 group shadow-lg cursor-zoom-in" onClick={() => setActiveImage(podtaImages[currentPodtaIndex].src)}>
                    <img 
                      src={podtaImages[currentPodtaIndex].src} 
                      alt={podtaImages[currentPodtaIndex].title} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-xs text-white/95 font-jakarta flex items-center gap-1.5"><Maximize2 className="w-3.5 h-3.5" /> Ampliar Criativo</span>
                    </div>
                  </div>

                  {/* Nav controls */}
                  <div className="flex items-center justify-between mt-6">
                    <button 
                      onClick={prevPodta}
                      className="bg-[#242427] hover:bg-[#2c2c30] p-3 rounded-full text-white transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    <span className="text-xs text-zinc-400 font-jakarta font-semibold">
                      {podtaImages[currentPodtaIndex].title}
                    </span>

                    <button 
                      onClick={nextPodta}
                      className="bg-[#242427] hover:bg-[#2c2c30] p-3 rounded-full text-white transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollSectionWrapper>

        {/* 2.2 DELLA BRIANZA (VÍDEO SHOWCASE) */}
        <ScrollSectionWrapper>
          <div className="bg-[#141416] text-[#e4e4e7] rounded-[3.5rem] p-6 md:p-16 mx-5 md:mx-10 mb-20 overflow-hidden shadow-2xl relative border border-zinc-800">
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="grid gap-12 lg:grid-cols-12 items-center">
              {/* Media Player Column */}
              <div className="lg:col-span-7 flex flex-col items-center">
                <div className="bg-[#1a1a1c] border border-zinc-800 rounded-[2.5rem] p-5 w-full shadow-2xl flex flex-col">
                  
                  {/* Top bar with buttons */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dellaVideos.map((video) => (
                      <button
                        key={video.id}
                        onClick={() => changeDellaVideo(video.id)}
                        className={`text-xs font-jakarta font-bold px-4 py-2 rounded-full border transition-all ${currentDellaVideo === video.id ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30" : "bg-[#242427] border-zinc-800 text-zinc-400 hover:text-white"}`}
                      >
                        {video.name}
                      </button>
                    ))}
                  </div>

                  {/* Video player frame */}
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-zinc-850 shadow-inner">
                    <video
                      key={currentDellaSrc}
                      ref={dellaVideoRef}
                      src={currentDellaSrc}
                      preload="auto"
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between text-[11px] text-zinc-500 font-jakarta uppercase font-semibold">
                    <span>Della Brianza • Audiovisual Premium</span>
                    <span className="flex items-center gap-1 text-red-500"><Play className="w-3.5 h-3.5" /> Reproduzindo</span>
                  </div>
                </div>
              </div>

              {/* Text Info Column */}
              <div className="lg:col-span-5 space-y-8">
                <div className="flex items-center gap-3">
                  <span className="bg-red-650 border border-red-500 text-white px-3 py-1 rounded-full text-[10px] font-jakarta font-bold uppercase tracking-wider">Audiovisual & Posicionamento AVPN</span>
                  <span className="text-xs tracking-widest uppercase font-bold text-zinc-500">2026</span>
                </div>

                <div className="flex items-center gap-4">
                  <img src={dellaLogo} alt="Logo Della Brianza" className="w-12 h-12 object-contain bg-white rounded-xl p-1" />
                  <h3 className="font-brand text-5xl md:text-6xl leading-[0.9] text-white uppercase tracking-tighter">
                    Della <br/>
                    <span className="text-red-500 italic font-normal font-sans">Brianza</span>
                  </h3>
                </div>

                <p className="font-jakarta text-zinc-300 text-base md:text-lg leading-relaxed text-balance">
                  A Della Brianza vende uma autêntica viagem sensorial para Nápoles. Sendo a única pizzaria em Campinas e região metropolitana com a rigidíssima certificação internacional **AVPN (Vera Pizza Napoletana)**, ela valida com maestria e técnica a sua nobre proposta.
                  <br/><br/>
                  Para o Instagram, o foco foi estruturado em criativos em vídeo impecáveis, mostrando de forma suculenta a excelência das matérias-primas e a beleza dos rituais artesanais italianos.
                </p>

                <div className="pt-6 border-t border-zinc-800 flex justify-between items-center text-xs font-jakarta">
                  <span className="text-zinc-500 font-bold uppercase">Única Certificada AVPN em Campinas</span>
                  <span className="text-red-500 font-bold uppercase tracking-widest">Tradição & Paladar</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollSectionWrapper>
      </section>

      {/* ABOUT TEASER */}
      <ScrollSectionWrapper>
        <section className="border-t border-border bg-paper px-5 py-24 text-ink md:px-10 md:py-40">
          <div className="grid gap-12 md:grid-cols-12 items-start">
            <p className="text-xs uppercase tracking-[0.3em] md:col-span-2 text-muted-foreground/60">— Sobre</p>
            <div className="md:col-span-10 grid gap-16 md:grid-cols-12 items-center">
              {/* LEFT COLUMN: MANIFESTO TEXT & CTA */}
              <div className="md:col-span-5 lg:col-span-4">
                <p className="font-display text-3xl leading-tight md:text-5xl md:leading-[1.1]">
                  <RevealLine>Acredito que design</RevealLine>
                  <RevealLine delay={0.08}>é traduzir intenção</RevealLine>
                  <RevealLine delay={0.16}>em forma <span className="italic text-primary">visível</span>.</RevealLine>
                </p>
                <FadeUp delay={0.3} className="mt-10">
                  <a
                    href="/about"
                    className="inline-flex items-center gap-3 border-b border-ink pb-1 text-xs uppercase tracking-widest hover:text-primary hover:border-primary transition-colors"
                  >
                    Conheça meu processo →
                  </a>
                </FadeUp>
              </div>
              
              {/* RIGHT COLUMN: INTERACTIVE 3D DECK OF SERVICE CARDS */}
              <div className="md:col-span-7 lg:col-span-8 flex justify-center md:justify-end mt-16 md:mt-0 relative">
                <ServiceCards />
              </div>
            </div>
          </div>
        </section>
      </ScrollSectionWrapper>

      <ScrollSectionWrapper>
        <Footer />
      </ScrollSectionWrapper>

      {/* LIGHTBOX MODAL FOR IMAGES */}
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
                className="w-full h-auto max-h-[85vh] object-contain border border-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
