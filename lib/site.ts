export const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://mannydevelops.com";

export const SITE_NAME = "Manuel Peña";
export const SITE_TAGLINE = "Street Photography · New York";
export const INSTAGRAM = "https://instagram.com/manolobrown";

/** schema.org Person, reused by every JSON-LD block. */
export const PERSON = {
  "@type": "Person",
  name: SITE_NAME,
  jobTitle: "Street photographer",
  url: SITE,
  sameAs: [INSTAGRAM],
  address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY", addressCountry: "US" },
} as const;
