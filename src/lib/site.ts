/**
 * Single source of truth for site-wide constants.
 *
 * Centralising this data keeps titles, canonical URLs, structured data, the
 * sitemap and the footer in sync — which is what prevents keyword
 * cannibalisation (every page derives its canonical URL from one base) and
 * NAP (name/address/phone) inconsistency across the schema graph.
 */

export const SITE_URL = "https://inventispharma.org";

export const SITE_NAME = "Inventis Pharma";
export const LEGAL_NAME = "Inventis Pharma (Pvt) Ltd";

export const BUSINESS = {
  legalName: LEGAL_NAME,
  telephone: "+94112734567",
  telephoneDisplay: "+94 11 273 4567",
  email: "info@inventispharma.lk",
  streetAddress: "No. 11/8, Kawdana Road",
  addressLocality: "Dehiwala",
  addressRegion: "Western Province",
  postalCode: "10350",
  addressCountry: "LK",
  latitude: 6.8517,
  longitude: 79.8731,
  openingHours: "Mo-Fr 08:30-17:30",
} as const;

// TODO: replace these placeholder platform homepages with Inventis Pharma's
// real social profile URLs, then re-enable `sameAs` in schema.ts and wire these
// into the Header/Footer social links.
export const SOCIAL_LINKS = [
  "https://www.facebook.com/",
  "https://twitter.com/",
  "https://www.instagram.com/",
];

/** Primary navigation — the canonical set of indexable routes. */
export const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
] as const;

/** Absolute URL helper for canonical/OG/schema references. */
export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
