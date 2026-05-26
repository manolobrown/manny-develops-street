"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRINTS, PRINT_FILTERS, type Print } from "@/content/shop";

export function PrintsFilter() {
  const [active, setActive] = useState<string>("all");

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: PRINTS.length };
    for (const p of PRINTS) map[p.collection] = (map[p.collection] ?? 0) + 1;
    return map;
  }, []);

  const visible = useMemo<Print[]>(
    () => (active === "all" ? PRINTS : PRINTS.filter((p) => p.collection === active)),
    [active],
  );

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 pt-7">
        {PRINT_FILTERS.map((f) => {
          const count = counts[f.key] ?? 0;
          if (count === 0 && f.key !== "all") return null;
          const on = active === f.key;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(f.key)}
              className={`
                inline-flex items-center gap-2 rounded-full border px-3.5 py-2
                font-mono text-[10.5px] font-medium uppercase tracking-[0.14em]
                transition-colors duration-[260ms] ease-editorial
                ${on ? "bg-ink text-bg border-ink" : "border-line-soft text-ink-2 hover:border-line hover:text-ink"}
              `}
            >
              {f.label}
              <span className={`font-mono text-[10px] ${on ? "text-bg/70" : "text-ink-3"}`}>
                {count}
              </span>
            </button>
          );
        })}
        <span className="ml-auto font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
          {visible.length} prints · sorted by collection
        </span>
      </div>

      <div className="grid gap-7 pt-10 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <Link
            key={p.id}
            href={`/contact?type=print&id=${p.id}`}
            className="group flex flex-col gap-3 text-ink no-underline"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg-2">
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[700ms] ease-editorial group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex items-baseline justify-between font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3">
              <span className="font-semibold text-ink">{p.id}</span>
              <span>{p.edition}</span>
            </div>
            <div className="font-serif italic text-[19px] tracking-[-0.01em] text-ink">
              {p.title}
            </div>
            <div className="flex flex-wrap gap-2">
              {p.sizes.map((s) => (
                <span
                  key={s}
                  className="inline-block border border-line-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-2"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="flex items-baseline justify-between border-t border-line-hair pt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
              <span className="font-serif text-[16px] not-italic text-ink normal-case [text-transform:none]">
                From {p.price}
              </span>
              <span className="font-semibold text-ink transition-colors group-hover:text-accent">
                Add to cart ↗
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
