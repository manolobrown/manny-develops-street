import type { MetadataRoute } from "next";
import { getJournalPosts } from "@/lib/journal";
import { SERIES } from "@/content/series";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://mannydevelops.com";

const STATIC_ROUTES = [
  "/",
  "/work",
  "/journal",
  "/portraits",
  "/workshops",
  "/shop",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const seriesEntries = SERIES.map((s) => ({
    url: `${SITE}/work/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const journalEntries = getJournalPosts().map((p) => ({
    url: `${SITE}/journal/${p.slug}`,
    lastModified: new Date(`${p.date}T12:00:00Z`),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...seriesEntries, ...journalEntries];
}
