import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { RevealLine, FadeUp } from "@/components/Reveal";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Sobre — Gustavo Rangel" },
      { name: "description", content: "Sobre Gustavo Rangel: 4+ anos de experiência em design, branding e marketing digital." },
      { property: "og:title", content: "Sobre — Gustavo Rangel" },
      { property: "og:description", content: "Designer gráfico na interseção entre design, branding e marketing." },
    ],
  }),
  component: AboutPage,
});

const disciplines = [
  "Branding",
  "Identidade Visual",
  "Direção de Arte",
  "Design Editorial",
  "UI / UX",
  "Embalagem",
  "Tipografia",
  "Motion",
];

const tools = ["Illustrator", "Photoshop", "InDesign", "After Effects", "Premiere", "Lightroom", "Figma"];

const clients = ["V4 Company", "Hpack Embalagens", "Fundação MGI", "Grupo Focar", "Sandra Lessa", "Jadiel Oliveira"];

const clientSlugMap: Record<string, string> = {
  "Fundação MGI": "fundacao-mgi",
  "Grupo Focar": "grupo-focar",
  "Sandra Lessa": "sandra-lessa",
  "Jadiel Oliveira": "jadiel-oliveira",
};

function AboutPage() {
  return (
    <main>
      <section className="px-5 pt-32 pb-16 md:px-10 md:pt-48 md:pb-24">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">— Sobre</p>
        <h1 className="font-display text-[14vw] leading-[0.85] md:text-[10vw]">
          <RevealLine>Gustavo</RevealLine>
          <RevealLine delay={0.1}><span className="italic text-primary">Rangel</span>.</RevealLine>
        </h1>
      </section>

      <section className="grid gap-12 px-5 pb-20 md:grid-cols-12 md:gap-10 md:px-10 md:pb-32">
        <div className="md:col-span-5">
          <FadeUp>
            <div className="aspect-[4/5] overflow-hidden bg-muted">
              <img src={portrait} alt="Gustavo Rangel" className="h-full w-full object-cover grayscale" />
            </div>
          </FadeUp>
        </div>
        <div className="space-y-8 md:col-span-7">
          <FadeUp>
            <p className="text-balance text-2xl leading-snug md:text-4xl">
              Sou Designer Gráfico com mais de <span className="text-primary">4 anos</span> de experiência atuando na interseção entre design, branding e marketing digital.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Já passei por estúdios, agências e times de marketing — incluindo a V4 Company, uma das maiores agências do Brasil, e a Hpack Embalagens. Esse trânsito me ensinou que design não é decorar, é construir percepção.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Trabalho buscando um equilíbrio entre rigor visual e estratégia de marca. Acredito que um bom projeto começa em entender o problema antes de desenhar a solução.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* DISCIPLINES */}
      <section className="border-t border-border px-5 py-20 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground md:col-span-3">— Disciplinas</p>
          <div className="md:col-span-9">
            <ul className="grid gap-x-10 gap-y-3 md:grid-cols-2">
              {disciplines.map((d, i) => (
                <FadeUp key={d} delay={i * 0.04}>
                  <li className="flex items-baseline justify-between border-b border-border py-3 font-display text-2xl md:text-3xl">
                    {d}
                    <span className="text-xs text-muted-foreground">{(i + 1).toString().padStart(2, "0")}</span>
                  </li>
                </FadeUp>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="border-t border-border px-5 py-20 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground md:col-span-3">— Ferramentas</p>
          <p className="font-display text-3xl leading-tight md:col-span-9 md:text-5xl">
            {tools.join(" · ")}
          </p>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="border-t border-border px-5 py-20 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground md:col-span-3">— Clientes</p>
          <div className="md:col-span-9">
            <ul className="space-y-1">
              {clients.map((c, i) => {
                const slug = clientSlugMap[c];
                return (
                  <FadeUp key={c} delay={i * 0.05}>
                    <li className="border-b border-border py-4 font-display text-3xl md:text-5xl group">
                      {slug ? (
                        <Link
                          to="/projects/$slug"
                          params={{ slug }}
                          className="flex items-center justify-between hover:text-primary transition-colors w-full"
                          data-cursor="hover"
                        >
                          <span>{c}</span>
                          <span className="text-xs font-sans tracking-widest text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]">
                            Ver Projeto →
                          </span>
                        </Link>
                      ) : (
                        <span className="text-muted-foreground/40">{c}</span>
                      )}
                    </li>
                  </FadeUp>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
