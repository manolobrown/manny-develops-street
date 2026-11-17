"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Photo } from "@/components/photo/Photo";
import { PRINT_FILTERS, type Print } from "@/content/shop";
import type { Photo as PhotoData } from "@/lib/photos";

export type PrintWithPhoto = Print & { photo: PhotoData };

export function PrintsFilter({ prints: PRINTS }: { prints: PrintWithPhoto[] }) {
  const [active, setActive] = useState<string>("all");

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: PRINTS.length };
    for (const p of PRINTS) map[p.collection] = (map[p.collection] ?? 0) + 1;
    return map;
  }, [PRINTS]);

  const visible = useMemo<PrintWithPhoto[]>(
    () => (active === "all" ? PRINTS : PRINTS.filter((p) => p.collection === active)),
    [active, PRINTS],
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
                inline-flex items-center gap-2 border px-3.5 py-2
                font-mono text-[10.5px] font-medium uppercase tracking-[0.08em]
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
        <span className="ml-auto font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
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
            {/* Uncropped: the frame sits on a fixed-height mat so the grid stays even. */}
            <div className="flex aspect-[5/4] w-full items-center justify-center bg-bg-2 p-[8%]">
              <Photo
                photo={p.photo}
                alt={p.photo.alt}
                sizes="(min-width: 1024px) 28vw, (min-width: 768px) 45vw, 90vw"
                className="max-h-full w-auto max-w-full shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] transition-transform duration-[700ms] ease-editorial group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex items-baseline justify-between font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
              <span className="text-ink">
                {p.id} · {p.photo.label}
              </span>
              <span>{p.edition}</span>
            </div>
            <div className="font-sans text-[19px] font-medium tracking-[-0.01em] text-ink">
              {p.title}
            </div>
            <div className="flex flex-wrap gap-2">
              {p.sizes.map((s) => (
                <span
                  key={s}
                  className="inline-block border border-line-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-2"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="flex items-baseline justify-between border-t border-line-hair pt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">
              <span className="font-sans text-[16px] not-italic text-ink normal-case [text-transform:none]">
                From {p.price}
              </span>
              <span className="font-semibold text-ink transition-colors group-hover:text-accent">
                Inquire ↗
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
