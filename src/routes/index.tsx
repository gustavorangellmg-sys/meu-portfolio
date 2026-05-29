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

// Assets Starbrick — Links externos de download (Evita o limite de 25MB da Cloudflare)
// Assets Starbrick — Links externos de download (Evita o limite de 25MB da Cloudflare)
const pdfStarbrick = "https://drive.google.com/drive/folders/1l-aOKrDcDRTLRsl2gprJZR_kZp1OFfpU?usp=sharing"; // Link da pasta compartilhada
const pdfMyIn = "https://drive.google.com/drive/folders/1l-aOKrDcDRTLRsl2gprJZR_kZp1OFfpU?usp=sharing";       // Link da pasta compartilhada
const pdfRiviera = "https://drive.google.com/drive/folders/1l-aOKrDcDRTLRsl2gprJZR_kZp1OFfpU?usp=sharing";    // Link da pasta compartilhada

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
            Sistemas gráficos modulares e sensoriais construídos para traduzir o invisível em marcas físicas imponentes, sofisticadas.
          </p>
        </div>

        {/* 1.1 JADIEL OLIVEIRA */}
        <ScrollSectionWrapper>
          <div className="bg-[#2C5E3B] text-[#FCE6B2] rounded-[3.5rem] p-6 md:p-16 mx-5 md:mx-10 mb-24 overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4613C]/10 rounded-full blur-[140px] pointer-events-none" />
            
            <div className="grid gap-12 lg:grid-cols-12 items-start relative z-10">
              {/* Left text column */}
              <div className="lg:col-span-5 space-y-8">
                <div className="flex items-center gap-3">
                  <span className="bg-[#D4613C] text-white px-3 py-1 rounded-full text-[10px] font-jakarta font-bold uppercase tracking-wider">Identidade Visual & Curadoria</span>
                  <span className="text-xs tracking-widest uppercase font-bold text-white/80">2024</span>
                </div>

                <h3 className="font-brand text-6xl md:text-8xl leading-[0.85] text-white uppercase tracking-tighter">
                  Jadiel Oliveira <br/>
                  <span className="text-[#D4613C] italic font-normal font-sans">Baile Diferente</span>
                </h3>

                <p className="font-jakarta text-white/90 text-base md:text-lg leading-relaxed text-balance">
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

        {/* 1.2 A FORNALHA DA GUILDA — HAMBURGUERIA FÍSICA PREMIUM COM ESTÉTICA DE RPG */}
        <ScrollSectionWrapper>
          <div className="bg-[#0f0e13] text-[#e4e4e7] rounded-[3.5rem] p-6 md:p-16 mx-5 md:mx-10 mb-24 border border-amber-900/30 overflow-hidden shadow-2xl relative">
            {/* Skeuomorphic visual details in background */}
            <div className="absolute -left-20 -bottom-20 w-[500px] h-[500px] bg-[#d97706]/5 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="grid gap-12 lg:grid-cols-12 items-center relative z-10">
              
              {/* Text / Copy Column on the Left for Variation */}
              <div className="lg:col-span-6 space-y-8 lg:pr-6">
                <div className="flex items-center gap-3">
                  <span className="bg-gradient-to-r from-amber-600 to-[#d97706] text-black font-jakarta font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">Identidade Completa & Ambientação</span>
                  <span className="text-xs tracking-widest uppercase font-bold text-amber-500/80">2025</span>
                </div>

                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-[0.3em] text-amber-500 font-bold font-jakarta block">// PROJETO DE MARCA & EMBALAGEM</span>
                  <h3 className="font-brand text-6xl md:text-7xl leading-[0.85] text-white uppercase tracking-tighter">
                    Fornalha <br/>
                    <span className="text-transparent" style={{ WebkitTextStroke: "1px #d97706" }}>da Guilda</span>
                  </h3>
                </div>

                <p className="font-jakarta text-zinc-300 text-base md:text-lg leading-relaxed text-balance">
                  A **Fornalha da Guilda** não é um food truck comum. Trata-se de uma **hamburgueria física de alto nível conceitual** que une a gastronomia rústica a uma experiência de RPG de alta fantasia. 
                  <br/><br/>
                  A marca foi desenhada com a robustez e o requinte de uma forja antiga. O cardápio funciona como uma **ficha de personagem**, as brochuras se dividem pelas classes clássicas (Guerreiro, Mago, Ladino) e a ambientação utiliza cobre envelhecido, selos de cera autênticos e ilustrações medievais gravadas a ácido.
                </p>

                {/* RPG Characteristics Grid */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-500" />
                      <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold font-jakarta">A Taverna</span>
                    </div>
                    <p className="text-xs text-zinc-500 leading-normal">Espaço físico imersivo que evoca tabernas lendárias de alta fantasia.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-amber-500" />
                      <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold font-jakarta">O Selo</span>
                    </div>
                    <p className="text-xs text-zinc-500 leading-normal">Escudo heráldico forjado a ferro e cera vermelha nos lacres.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-500" />
                      <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold font-jakarta">Grimório</span>
                    </div>
                    <p className="text-xs text-zinc-500 leading-normal">Menus e embalagens impressas em papéis kraft rústicos texturizados.</p>
                  </div>
                </div>
              </div>

              {/* RPG-Inspired Brand Elements Interactive Deck */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Main Hero Emblem Showcase with Medieval border framing */}
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-amber-900/40 aspect-[4/3] group bg-black/60">
                  <img 
                    src={fornalhaGuia} 
                    alt="Identidade Visual Fornalha da Guilda" 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700 cursor-zoom-in"
                    onClick={() => setActiveImage(fornalhaGuia)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent pointer-events-none" />
                  
                  {/* Skeuomorphic tag on top-left */}
                  <div className="absolute top-4 left-4 bg-amber-950/90 border border-amber-500/30 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                    <span className="text-[9px] uppercase tracking-widest font-black text-amber-400 font-jakarta flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" /> Escudo da Forja • IDV
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] tracking-widest uppercase text-amber-500 font-bold">Guia Heráldico Completo</span>
                      <h4 className="font-brand text-2xl text-white mt-1">Manual de Logotipos & Ilustrações</h4>
                    </div>
                    <button 
                      onClick={() => setActiveImage(fornalhaGuia)}
                      className="bg-amber-600 hover:bg-amber-500 text-black p-3.5 rounded-full transition-transform duration-300 hover:scale-115"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Sub row showing Tavern detail & copy */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative rounded-3xl overflow-hidden border border-zinc-800 h-[140px] group cursor-zoom-in" onClick={() => setActiveImage(fornalhaThumb)}>
                    <img src={fornalhaThumb} alt="Fornalha Hamburgueria" className="w-full h-full object-cover brightness-[0.6] group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-amber-950/20 group-hover:bg-transparent transition-colors" />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[8px] uppercase tracking-widest text-amber-400 font-bold block">A Taverna Física</span>
                      <span className="text-xs text-white font-bold">Fotografia do Ponto</span>
                    </div>
                  </div>

                  <div className="bg-[#141416] border border-zinc-800 p-5 rounded-3xl flex flex-col justify-between h-[140px]">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Sparkles key={star} className="w-3 h-3 text-amber-500" />
                      ))}
                    </div>
                    <p className="text-[11px] font-jakarta text-zinc-400 leading-relaxed italic">
                      "Desenvolvemos toda a atmosfera do local para que o cliente se sinta um herói de sua própria campanha ao cruzar as portas."
                    </p>
                    <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">— DIRETRIZES DE ARTESANATO CRÍTICO</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </ScrollSectionWrapper>

        {/* 1.3 STARBRICK E SUBMARCAS — ARQUITETURA E INCORPORAÇÃO DE ALTO PADRÃO (RIVIERA & MY IN) */}
        <ScrollSectionWrapper>
          <div className="bg-[#0b0f14] text-[#e2e8f0] rounded-[3.5rem] p-6 md:p-16 mx-5 md:mx-10 mb-24 border border-sky-950/50 overflow-hidden shadow-2xl relative">
            <div className="absolute right-0 bottom-0 w-[550px] h-[550px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-0 left-10 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="grid gap-12 lg:grid-cols-12 items-center relative z-10">
              
              {/* Image / Graphic Display Panel on the Left for Variation */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-[#101720] border border-slate-800 rounded-[2.5rem] p-8 space-y-8 relative overflow-hidden shadow-inner">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="space-y-2">
                    <span className="text-[10px] tracking-widest font-bold text-sky-400 uppercase font-jakarta block">// PILAR CONCEITUAL</span>
                    <h4 className="font-brand text-3xl text-white">Wellness & Geometria Pura</h4>
                    <p className="text-xs text-slate-400 font-jakarta leading-relaxed">
                      A arquitetura visual da StarBrick baseia-se na sofisticação do "menos é luxo". O design valoriza espaços vazios e harmônicos inspirados no minimalismo europeu.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-850 hover:border-sky-500/30 transition-all group">
                      <div className="w-7 h-7 rounded-lg bg-sky-500/10 flex items-center justify-center mb-3">
                        <Layers className="w-4 h-4 text-sky-400" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Riviera Dolce Vita</span>
                      <p className="text-xs text-slate-500 font-jakarta mt-2 leading-relaxed group-hover:text-slate-350 transition-colors">
                        Identidade visual baseada na brisa mediterrânea e na calmaria das marés, com tons de areia e azul sutil.
                      </p>
                    </div>

                    <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-850 hover:border-emerald-500/30 transition-all group">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">My In Interiores</span>
                      <p className="text-xs text-slate-500 font-jakarta mt-2 leading-relaxed group-hover:text-slate-350 transition-colors">
                        Design contemporâneo e sóbrio com foco em materiais brutos, concreto exposto e madeiras nobres.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-center">
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950 px-4 py-2 border border-slate-850 rounded-full font-jakarta font-semibold select-none">
                      <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                      Harmonia, Equilíbrio e Pureza
                    </span>
                  </div>
                </div>
              </div>

              {/* Copy / Info and Download Buttons on the Right */}
              <div className="lg:col-span-6 space-y-8">
                <div className="flex items-center gap-3">
                  <span className="bg-sky-500/10 border border-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-[10px] font-jakarta font-bold uppercase tracking-wider">Design de Alto Padrão • Real Estate</span>
                  <span className="text-xs tracking-widest uppercase font-bold text-slate-500">2026</span>
                </div>

                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-[0.3em] text-sky-400 font-bold font-jakarta block">// BRANDING DE INCORPORAÇÃO</span>
                  <h3 className="font-brand text-6xl md:text-8xl leading-[0.85] text-white uppercase tracking-tighter">
                    Starbrick <br/>
                    <span className="text-sky-400 italic font-normal font-sans">Incorporações</span>
                  </h3>
                </div>

                <p className="font-jakarta text-slate-300 text-base md:text-lg leading-relaxed text-balance">
                  Como uma incorporadora de altíssimo padrão, a premissa de marca da Starbrick e submarcas (**Riviera Dolce Vita** e **My In**) está visceralmente ligada à qualidade de vida absoluta. O design gráfico adota caminhos arquitetônicos limpos, tipografias requintadas de origem suíça e papéis texturizados de algodão puro.
                  <br/><br/>
                  Extraímos as essências conceituais de cada uma de suas subdivisões no portfólio, estruturando materiais físicos e manuais que refletem a nobreza de cada empreendimento de luxo.
                </p>

                {/* Shared Folder PDFs link wrapper */}
                <div className="flex flex-col gap-3 pt-6 border-t border-slate-800">
                  <h4 className="text-[11px] uppercase tracking-widest text-slate-400 font-bold font-jakarta">Acesse os Manuais de Identidade Estruturados</h4>
                  
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { title: "StarBrick Principal", desc: "Manual Institucional", file: pdfStarbrick },
                      { title: "Riviera Dolce Vita", desc: "Design & Conceito", file: pdfRiviera },
                      { title: "My In Interiores", desc: "Curadoria de Estilo", file: pdfMyIn },
                    ].map((manual, idx) => (
                      <a 
                        key={idx}
                        href={manual.file} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col justify-between p-4 bg-slate-950/80 backdrop-blur border border-slate-850 rounded-2xl hover:border-sky-450 hover:bg-slate-950 transition-all text-left group"
                      >
                        <BookOpen className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform mb-4" />
                        <div>
                          <h5 className="text-xs font-bold text-white tracking-tight">{manual.title}</h5>
                          <p className="text-[10px] text-slate-500 font-jakarta mt-1 leading-tight">{manual.desc}</p>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold text-sky-400 mt-4">
                          <Download className="w-3 h-3" /> Acessar PDF
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </ScrollSectionWrapper>
      </section>

      {/* ==================== SEÇÃO 2: DESIGN ESTRATÉGICO INSTAGRAM ==================== */}
      <section id="social-media" className="relative z-10 bg-[#0c0c0e] text-[#f4f4f5] pt-24 pb-12 rounded-[4rem] border-t border-zinc-900">
        <div className="px-5 md:px-10 mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-400 mb-3">// VERTENTE 02</p>
          <h2 className="font-brand text-5xl md:text-8xl tracking-tighter leading-none uppercase text-white">
            Instagram &<br/>
            <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>Social Media</span>
          </h2>
          <p className="mt-6 max-w-2xl text-zinc-400 text-sm md:text-base font-jakarta leading-relaxed">
            Direção criativa e criativos premium focados em atrair, reter e converter o público de alto padrão através de estética requintada e storytelling afiado.
          </p>
        </div>

        {/* 2.1 PODTÁ / TATI ARRUDA — MULTI-GRID EDITORIAL DE FOTOS E CARROSSEL INTERATIVO */}
        <ScrollSectionWrapper>
          <div className="bg-[#141416] text-[#e4e4e7] rounded-[3.5rem] p-6 md:p-16 mx-5 md:mx-10 mb-24 overflow-hidden shadow-2xl relative border border-zinc-800">
            <div className="absolute top-0 left-0 w-[550px] h-[550px] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none" />
            
            <div className="grid gap-12 lg:grid-cols-12 items-start relative z-10">
              
              {/* Text Copy & Social details on Left */}
              <div className="lg:col-span-5 space-y-8">
                <div className="flex items-center gap-3">
                  <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-[10px] font-jakarta font-bold uppercase tracking-wider">Estratégia de Feed & Direção de Arte</span>
                  <span className="text-xs tracking-widest uppercase font-bold text-zinc-500">2026</span>
                </div>

                <h3 className="font-brand text-6xl md:text-8xl leading-[0.85] text-white uppercase tracking-tighter">
                  Podtá / <br/>
                  <span className="text-emerald-400 italic font-normal font-sans">Tati Arruda</span>
                </h3>

                <p className="font-jakarta text-zinc-300 text-base md:text-lg leading-relaxed text-balance">
                  Tati é uma empresária de frentes múltiplas: defensora da **economia circular**, empresária de moda e apresentadora de podcast. No **PodTá**, ela constrói narrativas profundas e descomplicadas.
                  <br/><br/>
                  Para o Instagram, projetamos um **micro-layout editorial arrojado**. Longe de blocos de textos monótonos, os criativos usam frases fortes em tipografia de impacto, carrosséis educativos dinâmicos e fotos de bastidores tratadas com grão analógico elegante.
                </p>

                {/* Key Metrics or pillars block */}
                <div className="space-y-4 pt-6 border-t border-zinc-800">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-emerald-400 font-bold">Pilares de Conteúdo do Feed</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs text-zinc-400 font-jakarta">
                    <div className="bg-[#1c1c1e] p-4 rounded-xl border border-zinc-800">
                      <span className="text-emerald-400 font-bold block mb-1">#EconomiaCircular</span>
                      Educação sustentável descomplicada em formato carrossel.
                    </div>
                    <div className="bg-[#1c1c1e] p-4 rounded-xl border border-zinc-800">
                      <span className="text-emerald-400 font-bold block mb-1">#MulherMulti</span>
                      Rotina, insights reais e bastidores sem filtros.
                    </div>
                  </div>
                </div>
              </div>

              {/* Instagram Feed Grid + Carrossel Sandbox on Right */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Instagram interactive carrossel sandbox */}
                <div className="bg-[#1c1c1e] border border-zinc-800 p-6 rounded-[2.5rem] shadow-2xl flex flex-col">
                  
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
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold uppercase">Carrossel {currentPodtaIndex + 1}/6</span>
                  </div>

                  {/* Active carousel slide */}
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 group shadow-lg cursor-zoom-in" onClick={() => setActiveImage(podtaImages[currentPodtaIndex].src)}>
                    <img 
                      src={podtaImages[currentPodtaIndex].src} 
                      alt={podtaImages[currentPodtaIndex].title} 
                      className="w-full h-full object-cover transition-transform duration-75 hover:scale-102" 
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
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

                {/* Sub grid showing other posts in grid style to avoid just having the carousel */}
                <div className="grid grid-cols-3 gap-3">
                  {podtaImages.slice(0, 3).map((item, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setActiveImage(item.src)}
                      className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800 cursor-pointer group"
                    >
                      <img src={item.src} alt={item.title} className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors flex items-center justify-center">
                        <span className="text-[8px] tracking-wider uppercase font-bold text-white bg-black/60 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">Ver</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </div>
        </ScrollSectionWrapper>

        {/* 2.2 DELLA BRIANZA — VÍDEOS VERTICAIS 9:16 APPARENTES SIMULTANEAMENTE NA TELA */}
        <ScrollSectionWrapper>
          <div className="bg-[#141416] text-[#e4e4e7] rounded-[3.5rem] p-6 md:p-16 mx-5 md:mx-10 mb-24 overflow-hidden shadow-2xl relative border border-zinc-800">
            <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-red-500/5 rounded-full blur-[110px] pointer-events-none" />
            
            <div className="grid gap-12 lg:grid-cols-12 items-start relative z-10">
              
              {/* Text Info Column on the Left for Variation */}
              <div className="lg:col-span-4 space-y-8 lg:pr-4">
                <div className="flex items-center gap-3">
                  <span className="bg-red-650 border border-red-500 text-white px-3 py-1 rounded-full text-[10px] font-jakarta font-bold uppercase tracking-wider">Direção de Arte & Audiovisual AVPN</span>
                  <span className="text-xs tracking-widest uppercase font-bold text-zinc-500">2026</span>
                </div>

                <div className="flex items-center gap-4">
                  <img src={dellaLogo} alt="Logo Della Brianza" className="w-12 h-12 object-contain bg-white rounded-xl p-1" />
                  <h3 className="font-brand text-6xl md:text-7xl leading-[0.85] text-white uppercase tracking-tighter">
                    Della <br/>
                    <span className="text-red-500 italic font-normal font-sans font-brand">Brianza</span>
                  </h3>
                </div>

                <p className="font-jakarta text-zinc-300 text-base md:text-lg leading-relaxed text-balance">
                  A única pizzaria em Campinas e região metropolitana com a rigidíssima certificação internacional **AVPN (Vera Pizza Napoletana)**.
                  <br/><br/>
                  Para transmitir a autenticidade napoletana, estruturamos uma **grade tripla de vídeos verticais Reels (9:16)** exibidos simultaneamente. Esse mosaico dinâmico e síncrono capta a suculência das coberturas, a montagem artesanal e a tradição dos selos históricos da marca de forma instantânea.
                </p>

                <div className="pt-6 border-t border-zinc-800 flex justify-between items-center text-xs font-jakarta">
                  <span className="text-zinc-500 font-bold uppercase">Napoletana Certificada</span>
                  <span className="text-red-500 font-bold uppercase tracking-widest">Tradição & Paladar</span>
                </div>
              </div>

              {/* Three 9:16 Video Reels columns visible simultaneously */}
              <div className="lg:col-span-8 grid grid-cols-3 gap-4">
                {dellaVideos.map((video) => (
                  <div key={video.id} className="bg-[#1c1c1e] border border-zinc-850 rounded-[2rem] p-3 shadow-2xl flex flex-col relative group">
                    <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold text-center block mb-2 font-jakarta truncate">
                      {video.name.split(" ")[0]}
                    </span>
                    
                    {/* Video Player Box in strict 9:16 Aspect Ratio */}
                    <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-inner">
                      <video
                        src={video.src}
                        preload="auto"
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="mt-2 text-center">
                      <span className="text-[8px] text-zinc-400 font-jakarta block leading-tight truncate">
                        {video.name}
                      </span>
                    </div>
                  </div>
                ))}
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
