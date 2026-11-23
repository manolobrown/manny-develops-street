/**
 * Where a photo was clicked from, so the viewer can zoom out of that tile.
 * Set by OriginTracker on click, read once by the Viewer when it opens.
 */
export type Origin = {
  /** The photo's own src (matches Photo's data-photo attribute). */
  src: string;
  rect: { left: number; top: number; width: number; height: number };
  /** The tile's already-loaded image URL, shown while the full image loads. */
  imgSrc: string;
  at: number;
};

let current: Origin | null = null;

export function setOrigin(origin: Omit<Origin, "at">) {
  current = { ...origin, at: Date.now() };
}

/** Returns the origin for this photo once, if it was recorded in the last 1.5s. */
export function takeOrigin(src: string): Origin | null {
  const o = current;
  current = null;
  if (!o || o.src !== src || Date.now() - o.at > 1500) return null;
  return o;
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
