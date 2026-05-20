import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useRef } from "react";
import { projects } from "@/lib/projects";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { RevealLine, FadeUp } from "@/components/Reveal";
import { ServiceCards } from "@/components/ServiceCards";
import { ScrollSectionWrapper } from "@/components/ScrollSectionWrapper";
import heroVideo from "@/assets/hero-bg-scroll.mp4";



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gustavo Rangel — Designer Gráfico" },
      { name: "description", content: "Branding, identidade visual e direção de arte por Gustavo Rangel." },
      { property: "og:title", content: "Gustavo Rangel — Designer Gráfico" },
      { property: "og:description", content: "Portfólio selecionado: branding, identidade e direção de arte." },
    ],
  }),
  component: Home,
});

function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Track scroll progress of the entire 200vh track
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  // Premium transition values during the exit phase (from 0.8 to 1.0 scroll progress)
  const y = useTransform(scrollYProgress, [0.8, 1], [0, -80]);
  const scale = useTransform(scrollYProgress, [0.8, 1], [1, 0.95]);
  const contentOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  const videoOpacity = useTransform(scrollYProgress, [0.8, 1], [0.35, 0]);

  // 1. Landing Headline & Scroll Indicator: fade and slide out early as user starts scrolling
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.12], [0, -40]);

  // 2. Subtle Left Description Footnote: fades in as headline fades out, fades out at the exit (increased active opacity to 1.0)
  const leftDescOpacity = useTransform(scrollYProgress, [0, 0.12, 0.8, 1.0], [0, 1.0, 1.0, 0]);

  // 3. Giant Sliding Name Overlay: reveals beautifully in the first half of scrubbing
  const nameX = useTransform(scrollYProgress, [0.08, 0.65], ["18%", "-12%"]);
  
  // Smooth name opacity with nice extended fade-in and fade-out
  const nameOpacity = useTransform(scrollYProgress, [0.08, 0.20, 0.52, 0.65], [0, 1, 1, 0]);
  
  // Custom non-linear scale for cinematic entry, hover zoom, and pass-through exit
  const nameScale = useTransform(scrollYProgress, [0.08, 0.20, 0.52, 0.65], [0.88, 1.0, 1.05, 1.25]);

  // Custom name Y translation to add floating parallax depth
  const nameYOffset = useTransform(scrollYProgress, [0.08, 0.20, 0.52, 0.65], [30, 0, -10, -40]);

  // 4. Cinematic Gaussian Blur focus/defocus scroll animation
  const blurVal = useTransform(scrollYProgress, [0.08, 0.20, 0.52, 0.65], [20, 0, 0, 20]);
  const nameFilter = useTransform(blurVal, (v) => `blur(${v}px)`);

  // Scrub the video currentTime directly to avoid delay
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    
    // Scrub the video fully between 0 and 0.8 scroll progress
    // This leaves a clean 0.8 to 1.0 transition for exit animations
    const scrubProgress = Math.min(latest / 0.8, 1);
    video.currentTime = scrubProgress * video.duration;
  });

  // Handle case where user reloads or starts partway down the page
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    const latest = scrollYProgress.get();
    const scrubProgress = Math.min(latest / 0.8, 1);
    video.currentTime = scrubProgress * video.duration;
  };

  return (
    <main>
      {/* HERO WRAPPER FOR SCROLL TRACK */}
      <div ref={containerRef} className="relative h-[200vh]">
        {/* HERO SECTION STICKY VIEWPORT CONTAINER */}
        <section className="sticky top-0 flex h-[100svh] w-full flex-col justify-between px-5 pb-10 pt-32 md:px-10 md:pt-40 overflow-hidden">
          {/* CINEMATIC VIDEO BACKGROUND */}
          <motion.div 
            style={{ opacity: videoOpacity, scale }}
            className="absolute inset-0 z-0 pointer-events-none origin-top"
          >
            <video
              ref={videoRef}
              onLoadedMetadata={handleLoadedMetadata}
              preload="auto"
              muted
              playsInline
              className="h-full w-full object-cover grayscale brightness-[0.4] contrast-[1.1]"
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
            {/* Vignette & Gradients to guarantee high text readability */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-background/40 to-background/90" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
          </motion.div>

          {/* DYNAMIC SCROLL OVERLAY NAME (GUSTAVO RANGEL) */}
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

          {/* SUBTLE DESCRIPTION COLUMN ON THE LEFT */}
          <motion.div 
            style={{ opacity: leftDescOpacity }} 
            className="absolute left-6 md:left-12 top-[68%] md:top-[70%] z-20 max-w-[240px] md:max-w-[320px] pointer-events-none border-l-2 border-primary pl-4 md:pl-5"
          >
            <p className="text-sm md:text-[15px] leading-relaxed text-zinc-100">
              Sou <span className="text-white font-semibold">Gustavo Rangel</span>, Designer Gráfico com mais de 4 anos na interseção entre design, branding e marketing digital.
            </p>
          </motion.div>

          {/* ORIGINAL LANDING HEADLINE (FADES OUT EARLY ON SCROLL) */}
          <motion.div style={{ y: headlineY, scale, opacity: headlineOpacity }} className="relative z-10 origin-top">
            <h1 className="font-display text-[19vw] leading-[0.85] md:text-[14vw] mix-blend-plus-lighter">
              <RevealLine>Design</RevealLine>
              <RevealLine delay={0.1}>com <span className="italic text-primary">propósito</span></RevealLine>
              <RevealLine delay={0.2}>e ritmo.</RevealLine>
            </h1>
          </motion.div>

          {/* BOTTOM GRID BAR (AIRY & CLEAN MINIMALIST FOOTER) */}
          <motion.div style={{ opacity: contentOpacity }} className="relative z-10 mt-12 flex justify-between items-end">
            <div className="hidden md:block text-[10px] uppercase tracking-widest text-muted-foreground/30">
              Gustavo Rangel — Portfólio
            </div>
            <FadeUp delay={0.55} className="flex items-end">
              <Link
                to="/projects"
                className="group inline-flex items-center gap-3 text-xs uppercase tracking-widest text-foreground hover:text-primary transition-colors"
              >
                <span className="h-px w-12 bg-foreground transition-all group-hover:w-20 group-hover:bg-primary" />
                Ver projetos
              </Link>
            </FadeUp>
          </motion.div>

          {/* BOTTOM SCROLL INDICATOR */}
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

      {/* MARQUEE */}
      <Marquee items={["Branding", "Identidade", "Direção de arte", "Editorial", "UI/UX", "Embalagem"]} />

      {/* PROJECTS PREVIEW */}
      <ScrollSectionWrapper>
        <section className="px-5 py-24 md:px-10 md:py-40">
          <div className="mb-20 flex items-end justify-between">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">— Selecionados</p>
              <h2 className="font-display text-5xl md:text-7xl">Trabalhos<br/>recentes</h2>
            </div>
            <Link to="/projects" className="hidden text-xs uppercase tracking-widest hover:text-primary md:block">
              Todos →
            </Link>
          </div>

          <div className="grid gap-16 md:grid-cols-2 md:gap-x-10 md:gap-y-32">
            {projects.slice(0, 4).map((p, i) => (
              <Link
                key={p.slug}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className={`group block ${i % 2 === 1 ? "md:mt-32" : ""}`}
                data-cursor="hover"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <motion.img
                    src={p.cover}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition-all duration-1000 ease-[cubic-bezier(.16,1,.3,1)] group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/30 transition-opacity duration-700 group-hover:opacity-0" />
                </div>
                <div className="mt-5 flex items-baseline justify-between">
                  <h3 className="font-display text-2xl md:text-4xl">{p.title}</h3>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">{p.year}</span>
                </div>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{p.category}</p>
              </Link>
            ))}
          </div>
        </section>
      </ScrollSectionWrapper>

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
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-3 border-b border-ink pb-1 text-xs uppercase tracking-widest hover:text-primary hover:border-primary transition-colors"
                  >
                    Conheça meu processo →
                  </Link>
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
    </main>
  );
}
