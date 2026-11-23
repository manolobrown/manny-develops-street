"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Photo } from "@/components/photo/Photo";
import type { Photo as PhotoData } from "@/lib/photos";

type View = "sequence" | "grid" | "index";

const VIEWS: { id: View; label: string }[] = [
  { id: "sequence", label: "Sequence" },
  { id: "grid", label: "Grid" },
  { id: "index", label: "Index" },
];

const STORAGE_KEY = "series-view";

export function SeriesViews({ photos }: { photos: PhotoData[] }) {
  const [view, setView] = useState<View>("sequence");

  // Remember the reader's preferred view across series (per browser only).
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as View | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage after mount
      if (saved && VIEWS.some((v) => v.id === saved)) setView(saved);
    } catch {}
  }, []);

  const choose = (v: View) => {
    setView(v);
    try {
      window.localStorage.setItem(STORAGE_KEY, v);
    } catch {}
  };

  return (
    <section aria-label="Frames" className="px-pad pb-pad-y">
      <div className="mb-10 flex items-center justify-between gap-4 border-b border-line-soft pb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">
        <span className="tabular-nums">{String(photos.length).padStart(2, "0")} frames</span>
        <div role="group" aria-label="Layout" className="flex gap-5">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              type="button"
              aria-pressed={view === v.id}
              onClick={() => choose(v.id)}
              className={`relative py-1 transition-colors ${
                view === v.id ? "text-ink" : "hover:text-ink-2"
              }`}
            >
              {view === v.id && (
                <span aria-hidden className="absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent" />
              )}
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Keyed so a view switch fades the new layout in instead of swapping it. */}
      <div key={view} className="motion-safe:animate-[fade-in_var(--dur-base)_var(--ease-editorial)]">
        {view === "sequence" && <Sequence photos={photos} />}
        {view === "grid" && <Grid photos={photos} />}
        {view === "index" && <Index photos={photos} />}
      </div>
    </section>
  );
}

function hrefFor(p: PhotoData) {
  return `/work/${p.seriesSlug}/${p.id}`;
}

function Meta({ photo, className = "" }: { photo: PhotoData; className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3 ${className}`}
    >
      <span className="text-ink">{photo.label}</span>
      <span className="flex items-baseline gap-3">
        {[photo.place, photo.year].filter(Boolean).join(" · ")}
        {photo.printId && (
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-accent" />
            Print
          </span>
        )}
      </span>
    </div>
  );
}

/**
 * One frame at a time, at its natural shape and never taller than the
 * viewport. Landscapes run centered; portraits alternate sides so the page has a
 * pace to it instead of a grid rhythm.
 */
function Sequence({ photos }: { photos: PhotoData[] }) {
  let portraitCount = 0;
  return (
    <ol className="m-0 flex list-none flex-col gap-[clamp(64px,10vw,160px)] p-0">
      {photos.map((p) => {
        const portrait = p.height > p.width;
        const side = portrait ? (portraitCount++ % 2 === 0 ? "md:justify-start md:pl-[8%]" : "md:justify-end md:pr-[8%]") : "";
        return (
          <li key={p.id} id={p.id} className={`flex justify-center ${side}`}>
            <figure className="m-0 w-fit max-w-full">
              <Link href={hrefFor(p)} scroll={false} className="block cursor-zoom-in">
                <Photo
                  photo={p}
                  sizes={portrait ? "(min-width: 768px) 60vh, 100vw" : "(min-width: 768px) 130vh, 100vw"}
                  priority={p.index === 0}
                  className="max-h-[86vh] w-auto max-w-full"
                />
              </Link>
              <figcaption className="mt-3">
                <Meta photo={p} />
                {p.caption && <p className="m-0 mt-2 max-w-[60ch] text-[15px] text-ink-2">{p.caption}</p>}
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}

/** Justified rows — every frame uncropped, rows flush to the measure. */
function Grid({ photos }: { photos: PhotoData[] }) {
  return (
    <ol className="justified m-0 list-none p-0 [--gap:10px] [--row:200px] md:[--row:280px]">
      {photos.map((p) => (
        <li key={p.id} style={{ "--ar": (p.width / p.height).toFixed(4) } as React.CSSProperties}>
          <Link href={hrefFor(p)} scroll={false} className="group block cursor-zoom-in">
            <Photo
              photo={p}
              sizes="(min-width: 768px) 33vw, 50vw"
              className="w-full transition-opacity duration-[260ms] group-hover:opacity-85"
            />
            <span className="pointer-events-none absolute bottom-2 left-2 bg-black/60 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {p.label}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

/** Catalogue table: number · subject · place · year · print. */
function Index({ photos }: { photos: PhotoData[] }) {
  return (
    <ol className="m-0 list-none p-0">
      {photos.map((p) => (
        <li key={p.id} className="border-b border-line-hair">
          <Link
            href={hrefFor(p)}
            scroll={false}
            className="group grid grid-cols-[56px_1fr] items-center gap-x-5 gap-y-1 py-3 md:grid-cols-[72px_88px_1fr_160px_64px_56px]"
          >
            <span className="row-span-2 flex h-14 w-14 items-center justify-center md:row-span-1 md:h-12 md:w-[72px]">
              <Photo photo={p} alt="" sizes="72px" className="max-h-full w-auto" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink">{p.label}</span>
            <span className="text-[15px] leading-snug text-ink-2 transition-colors group-hover:text-ink md:line-clamp-1">
              {p.alt}
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3 md:block">
              {p.place ?? "—"}
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3 md:block">
              {p.year ?? "—"}
            </span>
            <span className="hidden justify-self-end font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3 md:block">
              {p.printId ? (
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Print
                </span>
              ) : null}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
