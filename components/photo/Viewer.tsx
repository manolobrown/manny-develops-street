"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import type { Photo } from "@/lib/photos";

type ViewerPhoto = Pick<
  Photo,
  "id" | "label" | "src" | "width" | "height" | "blurDataURL" | "alt" | "caption" | "place" | "year" | "printId"
>;

type Props = {
  seriesSlug: string;
  seriesTitle: string;
  photos: ViewerPhoto[];
  index: number;
  /**
   * "modal" — opened from a gallery via an intercepted route; closing goes
   * back in history and prev/next replace the URL in place.
   * "page" — a direct/shared link; closing and prev/next are real navigations.
   */
  mode: "modal" | "page";
};

const VIEW_SIZES = "(min-width: 1024px) 80vw, 100vw";

const pad = (n: number) => String(n).padStart(2, "0");

export function Viewer({ seriesSlug, seriesTitle, photos, index, mode }: Props) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const total = photos.length;
  const photo = photos[index];
  const prev = photos[(index - 1 + total) % total];
  const next = photos[(index + 1) % total];
  const seriesHref = `/work/${seriesSlug}`;
  const hrefFor = (p: ViewerPhoto) => `${seriesHref}/${p.id}`;

  const close = useCallback(() => {
    if (mode === "modal") router.back();
    else router.push(seriesHref);
  }, [mode, router, seriesHref]);

  const go = useCallback(
    (p: ViewerPhoto) => {
      // Page mode does a document navigation so the next frame renders as a
      // full page rather than being intercepted into the modal slot.
      if (mode === "modal") router.replace(`${seriesHref}/${p.id}`, { scroll: false });
      else window.location.assign(`${seriesHref}/${p.id}`);
    },
    [mode, router, seriesHref],
  );

  // Remember what had focus (the gallery tile) and restore it when we unmount.
  useEffect(() => {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      returnFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, []);

  // Keyboard: Esc closes, arrows step, Tab is trapped inside the dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        go(next);
      } else if (e.key === "ArrowLeft") {
        go(prev);
      } else if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, go, next, prev]);

  // Warm the cache for the neighbours so stepping feels instant.
  useEffect(() => {
    for (const p of [prev, next]) {
      const { props } = getImageProps({ src: p.src, alt: "", width: p.width, height: p.height, sizes: VIEW_SIZES });
      const img = new window.Image();
      if (props.sizes) img.sizes = props.sizes;
      if (props.srcSet) img.srcset = props.srcSet;
      img.src = props.src;
    }
  }, [prev, next]);

  // Keep the active filmstrip thumb in view.
  useEffect(() => {
    dialogRef.current
      ?.querySelector<HTMLElement>('[aria-current="true"]')
      ?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [index]);

  const meta = [photo.label, photo.place, photo.year].filter(Boolean).join(" · ");

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${seriesTitle}, frame ${index + 1} of ${total}`}
      tabIndex={-1}
      className="fixed inset-0 z-[100] grid grid-rows-[auto_1fr_auto_auto] bg-viewer text-white outline-none motion-safe:animate-[lightbox-in_180ms_cubic-bezier(0.2,0.6,0.2,1)]"
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? next : prev);
      }}
    >
      {/* Top bar */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-white/70 md:px-6">
        <button
          type="button"
          onClick={close}
          className="inline-flex items-center gap-2 justify-self-start py-2 text-white hover:text-white/70"
        >
          <span aria-hidden>✕</span> Close
        </button>
        <span aria-live="polite" className="tabular-nums">
          {pad(index + 1)} / {pad(total)}
        </span>
        <Link href={seriesHref} className="hidden justify-self-end py-2 hover:text-white sm:inline">
          {seriesTitle}
        </Link>
      </div>

      {/* Stage */}
      <div className="relative flex min-h-0 items-center justify-center px-4 md:px-20">
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={VIEW_SIZES}
          priority
          placeholder="blur"
          blurDataURL={photo.blurDataURL}
          className="h-auto max-h-full w-auto max-w-full object-contain"
        />
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(prev)}
              aria-label={`Previous frame, ${prev.label}`}
              className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white md:flex"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(next)}
              aria-label={`Next frame, ${next.label}`}
              className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white md:flex"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Contact-sheet strip */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-4 pt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-white/60 md:px-6">
        <span className="text-white">{meta}</span>
        {photo.caption && <span className="normal-case tracking-normal text-white/80">{photo.caption}</span>}
        {photo.printId && (
          <Link
            href={`/contact?type=print&id=${photo.printId}`}
            className="inline-flex items-center gap-2 text-white hover:text-white/70"
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            Available as a print
          </Link>
        )}
      </div>

      {/* Filmstrip */}
      <nav aria-label="Frames in this series" className="overflow-x-auto px-4 pb-4 pt-3 md:px-6">
        <ol className="m-0 flex list-none gap-1.5 p-0">
          {photos.map((p, i) => {
            const thumb = (
              <Image src={p.src} alt="" width={p.width} height={p.height} sizes="80px" className="h-full w-auto" />
            );
            const linkProps = {
              "aria-current": i === index ? ("true" as const) : undefined,
              "aria-label": `Frame ${p.label}`,
              className: `block h-12 border transition-opacity ${
                i === index ? "border-white opacity-100" : "border-transparent opacity-50 hover:opacity-90"
              }`,
            };
            return (
              <li key={p.id} className="shrink-0">
                {mode === "modal" ? (
                  <Link href={hrefFor(p)} replace scroll={false} {...linkProps}>
                    {thumb}
                  </Link>
                ) : (
                  <a href={hrefFor(p)} {...linkProps}>
                    {thumb}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
