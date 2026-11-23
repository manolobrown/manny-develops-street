"use client";

import { useEffect } from "react";
import { setOrigin } from "@/lib/viewer-origin";

const FRAME_HREF = /^\/work\/[^/]+\/[^/]+$/;

/**
 * Remembers which tile a photo was opened from (its position and loaded
 * image) so the viewer can zoom out of it. One listener covers every gallery.
 */
export function OriginTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = new URL((link as HTMLAnchorElement).href, window.location.href);
      if (href.origin !== window.location.origin || !FRAME_HREF.test(href.pathname)) return;
      const img = link.querySelector<HTMLImageElement>("img[data-photo]");
      if (!img || !img.currentSrc) return;
      const r = img.getBoundingClientRect();
      setOrigin({
        src: img.dataset.photo!,
        rect: { left: r.left, top: r.top, width: r.width, height: r.height },
        imgSrc: img.currentSrc,
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
