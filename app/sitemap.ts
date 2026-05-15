import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://mannydevelops.com";

const ROUTES = ["/", "/work", "/portraits", "/workshops", "/shop", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((path) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "monthly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
