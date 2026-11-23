"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/photos";
import { prefersReducedMotion, takeOrigin } from "@/lib/viewer-origin";

type ViewerPhoto = Pick<
  Photo,
  "id" | "label" | "src" | "width" | "height" | "blurDataURL" | "alt" | "caption" | "place" | "year" | "printId"
>;

type Props = {
  seriesSlug: string;
  seriesTitle: string;
  photos: ViewerPhoto[];
  /** The frame to open on. Stepping is handled locally from here. */
  index: number;
  /**
   * "modal" — opened from a gallery via an intercepted route; closing goes
   * back in history to the gallery underneath.
   * "page" — a direct/shared link; closing navigates to the series.
   * In both, stepping updates the URL in place (history.replaceState) so a
   * refresh or shared link still lands on the right frame.
   */
  mode: "modal" | "page";
};

const VIEW_SIZES = "(min-width: 1024px) 80vw, 100vw";
const EASE = "cubic-bezier(0.2, 0.6, 0.2, 1)";
const ZOOM_MS = 420;
const FADE_MS = 200;
const CROSSFADE_MS = 320;

const pad = (n: number) => String(n).padStart(2, "0");

type Rect = { left: number; top: number; width: number; height: number };

/** Transform that makes an element sitting at `to` appear at `from`. */
function flip(from: Rect, to: Rect) {
  return `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`;
}

/** The gallery tile for a photo, if it's on the page under the viewer. */
function findTile(src: string, dialog: HTMLElement | null): HTMLImageElement | null {
  const tiles = document.querySelectorAll<HTMLImageElement>(`img[data-photo="${CSS.escape(src)}"]`);
  for (const t of tiles) {
    if (dialog?.contains(t)) continue;
    const r = t.getBoundingClientRect();
    if (r.width > 0 && r.height > 0) return t;
  }
  return null;
}

export function Viewer({ seriesSlug, seriesTitle, photos, index: initialIndex, mode }: Props) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const currentImgRef = useRef<HTMLImageElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);
  const closing = useRef(false);

  const [index, setIndex] = useState(initialIndex);
  // The frame fading out while the new one fades in, and whether the new one is ready.
  const [outgoing, setOutgoing] = useState<ViewerPhoto | null>(null);
  const [ready, setReady] = useState(true);
  const [stepped, setStepped] = useState(false);

  const total = photos.length;
  const photo = photos[index];
  const prevIndex = (index - 1 + total) % total;
  const nextIndex = (index + 1) % total;
  const prev = photos[prevIndex];
  const next = photos[nextIndex];
  const seriesHref = `/work/${seriesSlug}`;

  const chrome = () => Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("[data-chrome]") ?? []);

  // ── Close: shrink back into the tile (or fade), then navigate ────────────
  const close = useCallback(async () => {
    if (closing.current) return;
    closing.current = true;
    const navigate = () => (mode === "modal" ? router.back() : router.push(seriesHref));

    if (prefersReducedMotion()) return navigate();

    const img = currentImgRef.current;
    const tile = mode === "modal" ? findTile(photo.src, dialogRef.current) : null;
    const fades = [backdropRef.current, ...chrome()]
      .filter((el): el is HTMLElement => !!el)
      .map((el) => el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: FADE_MS + 80, easing: EASE, fill: "forwards" }));

    if (img && tile) {
      // Bring the tile into view under the (still opaque) backdrop, and keep
      // that scroll position once the history entry pops.
      tile.scrollIntoView({ block: "nearest" });
      const y = window.scrollY;
      window.addEventListener("popstate", () => requestAnimationFrame(() => window.scrollTo(0, y)), { once: true });
      const from = img.getBoundingClientRect();
      const to = tile.getBoundingClientRect();
      img.style.transformOrigin = "0 0";
      await img.animate([{ transform: "none" }, { transform: flip(to, from) }], {
        duration: ZOOM_MS - 60,
        easing: EASE,
        fill: "forwards",
      }).finished;
    } else {
      if (img) img.animate([{ opacity: 1 }, { opacity: 0 }], { duration: FADE_MS, easing: EASE, fill: "forwards" });
      await Promise.all(fades.map((a) => a.finished));
    }
    navigate();
  }, [mode, photo.src, router, seriesHref]);

  // ── Step: crossfade in place and update the URL without navigating ───────
  const step = useCallback(
    (i: number) => {
      if (closing.current || i === index) return;
      const p = photos[i];
      // If the current frame hasn't finished fading in, keep the older one as
      // the outgoing layer so nothing flashes.
      if (ready) setOutgoing(photo);
      setReady(false);
      setStepped(true);
      setIndex(i);
      window.history.replaceState(null, "", `${seriesHref}/${p.id}`);
      document.title = `${p.label} · ${seriesTitle} · Manuel Peña`;
    },
    [index, photo, photos, ready, seriesHref, seriesTitle],
  );

  // ── Open: zoom out of the clicked tile, or fade up ────────────────────────
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const img = currentImgRef.current;
    const backdrop = backdropRef.current;
    if (!dialog || !img || !backdrop) return;
    const origin = takeOrigin(photos[initialIndex].src);
    if (prefersReducedMotion()) return;

    backdrop.animate([{ opacity: 0 }, { opacity: 1 }], { duration: ZOOM_MS, easing: EASE });
    for (const el of chrome()) {
      el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: CROSSFADE_MS, delay: 140, easing: EASE, fill: "backwards" });
    }

    if (!origin) {
      img.animate([{ opacity: 0, transform: "scale(0.98)" }, { opacity: 1, transform: "none" }], {
        duration: CROSSFADE_MS + 80,
        easing: EASE,
      });
      return;
    }

    // A ghost of the already-loaded tile image flies from the tile to where the
    // full image will sit, then dissolves into it once that has loaded.
    const to = img.getBoundingClientRect();
    if (to.width === 0 || to.height === 0) return;
    const ghost = document.createElement("img");
    ghost.src = origin.imgSrc;
    ghost.alt = "";
    ghost.setAttribute("aria-hidden", "true");
    Object.assign(ghost.style, {
      position: "fixed",
      left: `${to.left}px`,
      top: `${to.top}px`,
      width: `${to.width}px`,
      height: `${to.height}px`,
      transformOrigin: "0 0",
      pointerEvents: "none",
      zIndex: "1",
    });
    dialog.appendChild(ghost);
    img.style.opacity = "0";

    let cancelled = false;
    ghost
      .animate([{ transform: flip(origin.rect, to) }, { transform: "none" }], { duration: ZOOM_MS, easing: EASE })
      .finished.then(async () => {
        if (cancelled) return;
        if (!img.complete) await new Promise((r) => img.addEventListener("load", r, { once: true }));
        if (cancelled) return;
        img.style.opacity = "";
        await ghost.animate([{ opacity: 1 }, { opacity: 0 }], { duration: FADE_MS, easing: EASE }).finished;
        ghost.remove();
      })
      .catch(() => ghost.remove());
    return () => {
      cancelled = true;
      ghost.remove();
      img.style.opacity = "";
    };
    // Runs once, for the frame the viewer opened on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Remember what had focus and lock scroll; on unmount, return focus to the
  // tile of the frame being viewed (or whatever had focus before).
  const currentSrc = useRef(photo.src);
  useEffect(() => {
    currentSrc.current = photo.src;
  }, [photo.src]);
  useEffect(() => {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      const tileLink = findTile(currentSrc.current, dialog)?.closest("a");
      (tileLink ?? returnFocusRef.current)?.focus?.({ preventScroll: true });
    };
  }, []);

  // Keyboard: Esc closes, arrows step, Tab is trapped inside the dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (closing.current) return;
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        step(nextIndex);
      } else if (e.key === "ArrowLeft") {
        step(prevIndex);
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
  }, [close, step, nextIndex, prevIndex]);

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
      ?.scrollIntoView({ block: "nearest", inline: "center", behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [index]);

  const meta = [photo.label, photo.place, photo.year].filter(Boolean).join(" · ");
  const layer = "col-start-1 row-start-1 flex min-h-0 items-center justify-center";
  const imgClass = "h-auto max-h-full w-auto max-w-full object-contain";

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${seriesTitle}, frame ${index + 1} of ${total}`}
      tabIndex={-1}
      className="fixed inset-0 z-[100] grid grid-rows-[auto_1fr_auto_auto] text-white outline-none"
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) step(dx < 0 ? nextIndex : prevIndex);
      }}
    >
      <div ref={backdropRef} aria-hidden className="absolute inset-0 -z-10 bg-viewer" />

      {/* Top bar */}
      <div
        data-chrome
        className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-white/70 md:px-6"
      >
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

      {/* Stage: the current frame, with the previous one fading out on top of the same spot */}
      <div className="relative grid min-h-0 grid-cols-1 grid-rows-1 px-4 md:px-20">
        {outgoing && outgoing.src !== photo.src && (
          <div
            aria-hidden
            className={`${layer} pointer-events-none transition-opacity duration-[320ms] ease-editorial ${ready ? "opacity-0" : "opacity-100"}`}
            onTransitionEnd={() => setOutgoing(null)}
          >
            <Image
              src={outgoing.src}
              alt=""
              width={outgoing.width}
              height={outgoing.height}
              sizes={VIEW_SIZES}
              className={imgClass}
            />
          </div>
        )}
        <div
          className={`${layer} transition-opacity duration-[320ms] ease-editorial ${ready ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            key={photo.src}
            ref={currentImgRef}
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes={VIEW_SIZES}
            priority={!stepped}
            // The blur placeholder only for the first frame; after that the
            // previous frame stays visible until this one is ready.
            placeholder={stepped ? "empty" : "blur"}
            blurDataURL={photo.blurDataURL}
            onLoad={() => setReady(true)}
            className={imgClass}
          />
        </div>
        {total > 1 && (
          <>
            <button
              type="button"
              data-chrome
              onClick={() => step(prevIndex)}
              aria-label={`Previous frame, ${prev.label}`}
              className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white md:flex"
            >
              ←
            </button>
            <button
              type="button"
              data-chrome
              onClick={() => step(nextIndex)}
              aria-label={`Next frame, ${next.label}`}
              className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white md:flex"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Contact-sheet strip */}
      <div
        data-chrome
        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-4 pt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-white/60 md:px-6"
      >
        <span key={photo.src} className="text-white motion-safe:animate-[fade-in_var(--dur-base)_var(--ease-editorial)]">
          {meta}
        </span>
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
      <nav data-chrome aria-label="Frames in this series" className="overflow-x-auto px-4 pb-4 pt-3 md:px-6">
        <ol className="m-0 flex list-none gap-1.5 p-0">
          {photos.map((p, i) => (
            <li key={p.id} className="shrink-0">
              <button
                type="button"
                onClick={() => step(i)}
                aria-current={i === index ? "true" : undefined}
                aria-label={`Frame ${p.label}`}
                className={`block h-12 cursor-pointer border p-0 transition-[opacity,border-color] duration-[320ms] ease-editorial ${
                  i === index ? "border-white opacity-100" : "border-transparent opacity-50 hover:opacity-90"
                }`}
              >
                <Image src={p.src} alt="" width={p.width} height={p.height} sizes="80px" className="h-full w-auto" />
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
