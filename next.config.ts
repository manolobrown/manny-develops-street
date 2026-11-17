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

      // Squarespace legacy URLs. These are Squarespace's default collection
      // paths; replace/extend with the exact list from the old site's
      // /sitemap.xml before switching DNS.
      // TODO(manny): map each old Squarespace URL from its sitemap.xml.
      { source: "/blog", destination: "/journal", permanent: true },
      { source: "/blog/:slug*", destination: "/journal", permanent: true },
      { source: "/store", destination: "/shop", permanent: true },
      { source: "/store/:slug*", destination: "/shop", permanent: true },
      { source: "/portfolio", destination: "/work", permanent: true },
      { source: "/portfolio/:slug", destination: "/work/:slug", permanent: true },
      { source: "/galleries", destination: "/work", permanent: true },
      { source: "/galleries/:slug", destination: "/work/:slug", permanent: true },
      { source: "/contact-1", destination: "/contact", permanent: true },
      { source: "/about-1", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
