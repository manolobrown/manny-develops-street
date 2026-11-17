import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      // Retired practices.
      { source: "/portraits", destination: "/work", permanent: true },
      { source: "/workshops", destination: "/work", permanent: true },

      // Squarespace URLs, mapped from the old site's sitemap.xml
      // (www.mannydevelops.com). /about and /contact keep their paths.
      { source: "/home", destination: "/", permanent: true },
      { source: "/blog", destination: "/journal", permanent: true },
      // Blog category and tag archives have no equivalent.
      { source: "/blog/category/:path*", destination: "/journal", permanent: true },
      { source: "/blog/tag/:path*", destination: "/journal", permanent: true },
      // The three Squarespace posts, imported into the journal with the same slugs.
      { source: "/blog/mastering-candid-street-photography", destination: "/journal/mastering-candid-street-photography", permanent: true },
      { source: "/blog/the-best-street-photography-cameras-2025", destination: "/journal/the-best-street-photography-cameras-2025", permanent: true },
      { source: "/blog/getting-started-with-street-photography", destination: "/journal/getting-started-with-street-photography", permanent: true },
      // Anything else under /blog.
      { source: "/blog/:path*", destination: "/journal", permanent: true },
    ];
  },
};

export default nextConfig;
