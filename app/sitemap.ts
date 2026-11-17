import type { MetadataRoute } from "next";
import { getJournalPosts } from "@/lib/journal";
import { SERIES } from "@/content/series";
import { getSeriesPhotos, photoHref, seriesLastModified } from "@/lib/photos";
import { SITE } from "@/lib/site";

const STATIC_ROUTES = ["/", "/work", "/journal", "/shop", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const latestWork = new Date(Math.max(...SERIES.map((s) => seriesLastModified(s.slug).getTime())));

  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${SITE}${path}`,
    lastModified: latestWork,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const seriesEntries = SERIES.map((s) => ({
    url: `${SITE}/work/${s.slug}`,
    lastModified: seriesLastModified(s.slug),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const photoEntries = SERIES.flatMap((s) =>
    getSeriesPhotos(s.slug).map((p) => ({
      url: `${SITE}${photoHref(p)}`,
      lastModified: new Date(`${p.modified}T12:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.5,
      images: [`${SITE}${p.src}`],
    })),
  );

  const journalEntries = getJournalPosts().map((p) => ({
    url: `${SITE}/journal/${p.slug}`,
    lastModified: new Date(`${p.date}T12:00:00Z`),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...seriesEntries, ...photoEntries, ...journalEntries];
}
