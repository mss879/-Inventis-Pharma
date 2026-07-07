import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Allow full crawl. Query-string variants (e.g. /contact?subject=…) are
    // de-duplicated with per-page `rel=canonical` tags rather than a robots
    // block — a robots Disallow would stop crawlers from ever seeing the
    // canonical, and blocking `?` would also hide the /_next/image optimizer
    // URLs from image search.
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
