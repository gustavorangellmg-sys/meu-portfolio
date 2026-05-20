import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProject, projects, type Project } from "@/lib/projects";
import { Footer } from "@/components/Footer";
import { RevealLine, FadeUp } from "@/components/Reveal";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const p = getProject(params.slug);
    return {
      meta: [
        { title: `${p?.title ?? "Projeto"} — Gustavo Rangel` },
        { name: "description", content: p?.tagline ?? "" },
        { property: "og:title", content: `${p?.title ?? "Projeto"} — Gustavo Rangel` },
        { property: "og:description", content: p?.tagline ?? "" },
        ...(p?.cover ? [{ property: "og:image", content: p.cover }] : []),
      ],
    };
  },
  loader: ({ params }): { project: Project } => {
    const p = getProject(params.slug);
    if (!p) throw notFound();
    return { project: p };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-5 text-center">
      <div>
        <p className="font-display text-6xl">Projeto não encontrado</p>
        <Link to="/projects" className="mt-6 inline-block text-xs uppercase tracking-widest text-primary">
          Ver todos os projetos →
        </Link>
      </div>
    </div>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project: p } = Route.useLoaderData() as { project: Project };
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <main>
      {/* INTRO */}
      <section className="px-5 pt-32 pb-12 md:px-10 md:pt-48 md:pb-20">
        <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span>{p.category}</span>
          <span>·</span>
          <span>{p.client}</span>
          <span>·</span>
          <span>{p.year}</span>
        </div>
        <h1 className="font-display text-[14vw] leading-[0.85] md:text-[9vw]">
          <RevealLine>{p.title}</RevealLine>
        </h1>
        <FadeUp delay={0.3} className="mt-10 max-w-2xl text-balance text-xl leading-snug md:text-3xl">
          {p.tagline}
        </FadeUp>
      </section>

      {/* COVER with parallax */}
      <div ref={imgRef} className="relative h-[80vh] overflow-hidden md:h-screen">
        <motion.img
          src={p.cover}
          alt={p.title}
          style={{ y }}
          className="absolute inset-0 h-[120%] w-full object-cover"
        />
      </div>

      {/* STORY */}
      <section className="px-5 py-24 md:px-10 md:py-40">
        <div className="grid gap-12 md:grid-cols-12">
          <aside className="space-y-10 md:col-span-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Papel</p>
              <ul className="mt-3 space-y-1 text-sm">
                {p.role.map((r) => <li key={r}>— {r}</li>)}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Ferramentas</p>
              <ul className="mt-3 space-y-1 text-sm">
                {p.tools.map((t) => <li key={t}>— {t}</li>)}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Ano</p>
              <p className="mt-3 text-sm">{p.year}</p>
            </div>
          </aside>
          <div className="space-y-8 md:col-span-8">
            {p.story.map((para, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <p className={`text-balance leading-relaxed ${i === 0 ? "text-2xl md:text-4xl" : "text-base md:text-lg text-muted-foreground"}`}>
                  {para}
                </p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Accent band */}
      <div className="h-32" style={{ background: p.accent }} />

      {/* NEXT */}
      <Link
        to="/projects/$slug"
        params={{ slug: next.slug }}
        data-cursor="hover"
        className="group block border-t border-border bg-background px-5 py-24 md:px-10 md:py-40"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Próximo projeto →</p>
        <h2 className="mt-6 font-display text-6xl leading-none transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-4 md:text-9xl">
          {next.title}
        </h2>
        <p className="mt-4 text-sm uppercase tracking-widest text-muted-foreground">{next.category}</p>
      </Link>

      <Footer />
    </main>
  );
}
