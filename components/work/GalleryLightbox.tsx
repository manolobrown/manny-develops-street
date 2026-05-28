"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { SeriesFrame } from "@/content/series";

type Props = { frames: SeriesFrame[] };

export function GalleryLightbox({ frames }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const close = useCallback(() => setOpenIdx(null), []);
  const next = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i + 1) % frames.length)),
    [frames.length],
  );
  const prev = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i - 1 + frames.length) % frames.length)),
    [frames.length],
  );

  // ESC / arrow keys
  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx, close, next, prev]);

  // Lock body scroll while open
  useEffect(() => {
    if (openIdx === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [openIdx]);

  const active = openIdx === null ? null : frames[openIdx];

  return (
    <>
      <div className="grid gap-6 pt-7 md:grid-cols-2 lg:grid-cols-3">
        {frames.map((frame, i) => (
          <figure key={i} className="m-0 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setOpenIdx(i)}
              aria-label={`Open ${frame.alt} at full size`}
              className="group relative aspect-[4/5] w-full overflow-hidden bg-bg-2 cursor-zoom-in"
            >
              <Image
                src={frame.src}
                alt={frame.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[700ms] ease-editorial group-hover:scale-[1.03]"
              />
            </button>
            {frame.caption && (
              <figcaption className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3">
                {frame.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-[lightbox-in_180ms_cubic-bezier(0.2,0.6,0.2,1)]"
        >
          {/* Image — stop propagation so clicks on the image don't dismiss */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-full max-h-[90vh] w-full max-w-[90vw] flex-col items-center justify-center gap-4"
          >
            <div className="relative h-full w-full">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            {active.caption && (
              <p className="m-0 max-w-[64ch] text-center font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/70">
                {active.caption}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="Close viewer"
            className="absolute right-4 top-4 z-[110] flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-[16px] text-white transition-colors duration-[260ms] ease-editorial hover:border-white/60"
          >
            ✕
          </button>

          {frames.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous frame"
                className="absolute left-4 top-1/2 z-[110] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-[18px] text-white transition-colors duration-[260ms] ease-editorial hover:border-white/60"
              >
                ←
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next frame"
                className="absolute right-4 top-1/2 z-[110] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-[18px] text-white transition-colors duration-[260ms] ease-editorial hover:border-white/60"
              >
                →
              </button>
              <span className="absolute bottom-4 left-1/2 z-[110] -translate-x-1/2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/60">
                {String((openIdx ?? 0) + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}
              </span>
            </>
          )}
        </div>
      )}
    </>
  );
}
