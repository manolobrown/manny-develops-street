import manifest from "@/content/photos.generated.json";
import { SERIES, type Series } from "@/content/series";
import { PRINTS } from "@/content/shop";

type ManifestEntry = { width: number; height: number; blurDataURL: string; modified: string };
const MANIFEST = manifest as Record<string, ManifestEntry>;

export type Photo = {
  /** URL-safe id, e.g. "ttg-07" */
  id: string;
  /** Display catalogue number, e.g. "TTG·07" */
  label: string;
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  modified: string;
  alt: string;
  caption?: string;
  place?: string;
  year?: string;
  seriesSlug: string;
  seriesTitle: string;
  /** 0-based position within the series sequence */
  index: number;
  printId?: string;
};

function frameNumber(file: string): number {
  const m = file.match(/-(\d+)\.\w+$/);
  return m ? Number(m[1]) : 1;
}

function dims(src: string): ManifestEntry {
  const entry = MANIFEST[src];
  if (!entry) {
    throw new Error(`Photo ${src} is missing from content/photos.generated.json — run \`npm run photos\`.`);
  }
  return entry;
}

const PRINT_BY_SRC = new Map(PRINTS.map((p) => [p.image, p.id]));

function buildSeriesPhotos(series: Series): Photo[] {
  return series.frames.map((f, index) => {
    const src = `/images/work/${series.slug}/${f.file}`;
    const nn = String(frameNumber(f.file)).padStart(2, "0");
    return {
      id: `${series.code.toLowerCase()}-${nn}`,
      label: `${series.code}·${nn}`,
      src,
      ...dims(src),
      alt: f.alt,
      caption: f.caption,
      place: f.place,
      year: f.year,
      seriesSlug: series.slug,
      seriesTitle: series.title,
      index,
      printId: PRINT_BY_SRC.get(src),
    };
  });
}

const PHOTOS_BY_SERIES = new Map(SERIES.map((s) => [s.slug, buildSeriesPhotos(s)]));
const PHOTOS_BY_SRC = new Map(
  [...PHOTOS_BY_SERIES.values()].flat().map((p) => [p.src, p]),
);

export function getSeriesPhotos(slug: string): Photo[] {
  return PHOTOS_BY_SERIES.get(slug) ?? [];
}

export function getAllPhotos(): Photo[] {
  return [...PHOTOS_BY_SRC.values()];
}

export function findPhoto(slug: string, id: string): Photo | undefined {
  return getSeriesPhotos(slug).find((p) => p.id === id);
}

export function photoBySrc(src: string): Photo | undefined {
  return PHOTOS_BY_SRC.get(src);
}

export function seriesCover(series: Series): Photo {
  const photo = photoBySrc(`/images/work/${series.slug}/${series.cover}`);
  if (!photo) throw new Error(`Cover ${series.cover} for ${series.slug} is not in its frames list`);
  return photo;
}

export function photoHref(p: Pick<Photo, "seriesSlug" | "id">): string {
  return `/work/${p.seriesSlug}/${p.id}`;
}

/** Monospace contact-sheet line: "TTG·07 · Midtown · 2025" */
export function photoMeta(p: Photo): string {
  return [p.label, p.place, p.year].filter(Boolean).join(" · ");
}

export function seriesLastModified(slug: string): Date {
  const latest = getSeriesPhotos(slug).reduce((max, p) => (p.modified > max ? p.modified : max), "0000");
  return new Date(`${latest}T12:00:00Z`);
}
