import { createFileRoute } from "@tanstack/react-router";
import { RevealLine, FadeUp } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contato — Gustavo Rangel" },
      { name: "description", content: "Vamos trabalhar juntos. Entre em contato com Gustavo Rangel." },
      { property: "og:title", content: "Contato — Gustavo Rangel" },
      { property: "og:description", content: "Vamos trabalhar juntos." },
    ],
  }),
  component: ContactPage,
});

const socials = [
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "Behance", href: "https://behance.net/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "WhatsApp", href: "https://wa.me/5511999684438" },
];

function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col justify-between px-5 pt-32 pb-10 md:px-10 md:pt-48">
      <section>
        <p className="mb-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">— Contato</p>
        <h1 className="font-display text-[10vw] leading-[0.9] md:text-[7vw]">
          <RevealLine>Tem um projeto</RevealLine>
          <RevealLine delay={0.1}>em mente?</RevealLine>
        </h1>
        <FadeUp delay={0.3} className="mt-10 max-w-xl text-base text-muted-foreground md:text-lg">
          Estou aberto para novos projetos, colaborações e trocas. Mande um email e respondo em até 48h.
        </FadeUp>

        <FadeUp delay={0.4} className="mt-16">
          <a
            href="mailto:gustavorangelmgi@gmail.com"
            data-cursor="hover"
            className="group inline-block font-display text-[9vw] leading-none tracking-tight text-foreground transition-colors duration-500 hover:text-primary md:text-[7vw]"
          >
            <span className="block overflow-hidden">
              <span className="inline-block transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-2">
                gustavorangelmgi
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-block transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-2">
                @gmail.com →
              </span>
            </span>
          </a>
        </FadeUp>
      </section>

      <section className="mt-20 grid gap-10 border-t border-border pt-10 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Onde estou</p>
          <p className="mt-3 font-display text-2xl">São Paulo · BR</p>
          <p className="mt-1 text-sm text-muted-foreground">Disponível remoto · GMT−3</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Redes</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="story-link text-base hover:text-primary"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mt-16 flex justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span>© {new Date().getFullYear()} Gustavo Rangel</span>
        <span>v1.0</span>
      </div>
    </main>
  );
}
