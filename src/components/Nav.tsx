import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const items = [
  { to: "/", label: "Index" },
  { to: "/projects", label: "Projetos" },
  { to: "/about", label: "Sobre" },
  { to: "/contact", label: "Contato" },
];

export function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[80] mix-difference">
        <div className="flex items-center justify-between px-5 py-5 md:px-10 md:py-7">
          <Link to="/" className="font-display text-lg text-paper tracking-tight">
            Gustavo Rangel<span className="text-primary">.</span>
          </Link>
          <nav className="hidden gap-8 md:flex">
            {items.map((i) => (
              <Link
                key={i.to}
                to={i.to}
                className="group relative inline-block overflow-hidden text-sm uppercase tracking-widest text-paper"
              >
                <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-full">
                  {i.label}
                </span>
                <span className="absolute left-0 top-full inline-block text-primary transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-full">
                  {i.label}
                </span>
              </Link>
            ))}
          </nav>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-end justify-center gap-1.5 md:hidden"
          >
            <span className={`h-px w-7 bg-paper transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-paper transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-7 bg-paper transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[70] flex flex-col bg-background px-5 pt-24 transition-transform duration-700 ease-[cubic-bezier(.87,0,.13,1)] md:hidden ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="flex flex-col gap-2">
          {items.map((i, idx) => (
            <Link
              key={i.to}
              to={i.to}
              className="font-display text-[14vw] leading-none text-foreground"
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              {i.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
