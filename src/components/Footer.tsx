import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-5 pt-20 pb-10 md:px-10">
      <div className="font-display text-[11vw] leading-[0.85] md:text-[8vw]">
        Vamos<br />
        trabalhar<br />
        <span className="text-primary">juntos.</span>
      </div>
      <div className="mt-12 grid gap-10 border-t border-border pt-10 md:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Email</p>
          <a href="mailto:gustavorangelmgi@gmail.com" className="mt-2 block text-sm hover:text-primary">
            gustavorangelmgi@gmail.com
          </a>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</p>
          <a href="https://wa.me/5511999684438" className="mt-2 block text-sm hover:text-primary">
            +55 (11) 99968-4438
          </a>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Navegue</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <Link to="/projects" className="hover:text-primary">Projetos</Link>
            <Link to="/about" className="hover:text-primary">Sobre</Link>
            <Link to="/contact" className="hover:text-primary">Contato</Link>
          </div>
        </div>
      </div>
      <div className="mt-12 flex flex-col gap-2 text-xs uppercase tracking-widest text-muted-foreground md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} Gustavo Rangel</span>
        <span>Designer Gráfico — São Paulo, BR</span>
      </div>
    </footer>
  );
}
