export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border py-6">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="font-display text-5xl md:text-7xl">
            {t}
            <span className="mx-12 text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
