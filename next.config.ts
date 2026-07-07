import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // Don't advertise the framework.
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,

  images: {
    // AVIF first (best compression), WebP fallback.
    formats: ["image/avif", "image/webp"],
    // Required allow-list in Next.js 16.
    qualities: [70, 75, 80, 90],
    // Cache optimised images for 31 days.
    minimumCacheTTL: 2678400,
    // Only our own local assets are ever optimised.
    localPatterns: [{ pathname: "/**", search: "" }],
  },

  async headers() {
    return [
      {
        // Security headers on every route.
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Long-lived cache for static media in /public (rarely changes).
        source: "/:file(.*\\.(?:webp|png|jpg|jpeg|svg|ico|mp4|webm))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
