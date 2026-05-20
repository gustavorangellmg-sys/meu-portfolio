import { createFileRoute, Link } from "@tanstack/react-router";
import { projects } from "@/lib/projects";
import { Footer } from "@/components/Footer";
import { RevealLine, FadeUp } from "@/components/Reveal";
import { motion } from "motion/react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projetos — Gustavo Rangel" },
      { name: "description", content: "Seleção de projetos de branding, identidade visual e direção de arte." },
      { property: "og:title", content: "Projetos — Gustavo Rangel" },
      { property: "og:description", content: "Cases recentes em branding e direção de arte." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <main>
      <section className="px-5 pt-32 pb-16 md:px-10 md:pt-48 md:pb-24">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">— Index 001/{projects.length.toString().padStart(3, "0")}</p>
        <h1 className="font-display text-[16vw] leading-[0.85] md:text-[10vw]">
          <RevealLine>Projetos</RevealLine>
        </h1>
        <FadeUp delay={0.3} className="mt-10 max-w-xl text-sm text-muted-foreground md:text-base">
          Cada projeto começa por uma escuta. Aqui estão seis dos que mais me marcaram nos últimos anos.
        </FadeUp>
      </section>

      <section>
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            to="/projects/$slug"
            params={{ slug: p.slug }}
            data-cursor="hover"
            className="group block border-t border-border"
          >
            <div className="relative grid items-center gap-6 px-5 py-10 md:grid-cols-12 md:gap-10 md:px-10 md:py-14">
              <span className="text-xs uppercase tracking-widest text-muted-foreground md:col-span-1">
                {(i + 1).toString().padStart(2, "0")}
              </span>
              <h2 className="font-display text-5xl leading-none transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-3 md:col-span-5 md:text-7xl">
                {p.title}
              </h2>
              <p className="text-xs uppercase tracking-widest text-muted-foreground md:col-span-3">
                {p.category}
              </p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground md:col-span-1">
                {p.year}
              </p>
              <motion.div
                className="pointer-events-none absolute right-10 top-1/2 hidden aspect-[4/5] w-56 -translate-y-1/2 overflow-hidden md:block"
                initial={{ opacity: 0, scale: 0.9 }}
                whileHover={{ opacity: 1, scale: 1 }}
              />
              <div className="pointer-events-none absolute right-10 top-1/2 hidden aspect-[3/4] w-64 -translate-y-1/2 origin-right scale-90 overflow-hidden opacity-0 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-100 group-hover:opacity-100 md:block">
                <img src={p.cover} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
              </div>
            </div>
          </Link>
        ))}
        <div className="border-t border-border" />
      </section>

      <Footer />
    </main>
  );
}
