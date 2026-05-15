export type PressItem = { when: string; what: React.ReactNode; who: string };

export function PressList({ items }: { items: PressItem[] }) {
  return (
    <ul className="m-0 list-none p-0">
      {items.map((p, i) => (
        <li
          key={`${p.when}-${i}`}
          className="
            grid items-baseline gap-6 border-b border-line-hair py-5
            font-serif font-light text-[16.5px]
            md:grid-cols-[140px_1fr_auto]
          "
        >
          <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3">
            {p.when}
          </span>
          <span className="text-ink">{p.what}</span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3 md:justify-self-end">
            {p.who}
          </span>
        </li>
      ))}
    </ul>
  );
}
