/**
 * Structured-data (JSON-LD) builders.
 *
 * Anti-cannibalisation strategy: the business is described ONCE as a canonical
 * node with a stable `@id` (`#organization`). Every other page references that
 * node by `@id` instead of re-declaring the business, so search engines see a
 * single connected entity graph rather than five competing "businesses".
 */

import { SITE_URL, SITE_NAME, LEGAL_NAME, BUSINESS, absoluteUrl } from "./site";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const ARCAI_ID = "https://www.arcai.agency/#organization";

/**
 * The agency that designed and built the site, expressed as its own linked
 * entity so the WebSite/Organization can reference it by `@id`. This gives
 * arcai.agency a genuine, validated structured-data citation.
 */
export function agencySchema() {
  return {
    "@type": "Organization",
    "@id": ARCAI_ID,
    name: "ARC AI",
    url: "https://www.arcai.agency",
    description:
      "Premium AI and software development agency building custom AI solutions and high-performance websites.",
    slogan: "Custom AI Solutions & Software Development",
  };
}

export function organizationSchema() {
  return {
    "@type": "MedicalBusiness",
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/inventis_logo.png"),
      width: 512,
      height: 512,
    },
    image: absoluteUrl("/hero_poster.webp"),
    description:
      "Sri Lanka's leading importer and distributor of clinical biomedical devices, dialysis consumables, rehabilitation aids, homecare apparatus, and surgical equipment.",
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
    areaServed: {
      "@type": "Country",
      name: "Sri Lanka",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "17:30",
    },
    // `sameAs` intentionally omitted until real, verified social profile URLs
    // are available. Publishing links to bare platform homepages is an
    // unverifiable identity claim that adds no entity-linking value.
    // Populate SOCIAL_LINKS in site.ts with the real profiles, then add:
    //   sameAs: SOCIAL_LINKS,
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": ORG_ID },
    creator: { "@id": ARCAI_ID },
    inLanguage: "en-LK",
  };
}

/** Root graph: canonical organisation + website + the agency that built it. */
export function rootGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), agencySchema()],
  };
}

type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** A WebPage node linked back to the canonical org/website graph. */
export function webPageSchema({
  type = "WebPage",
  path,
  name,
  description,
}: {
  type?: string;
  path: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-LK",
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

/** Lightweight ItemList of products (no fabricated prices/offers). */
export function productListSchema(
  path: string,
  products: { name: string; description: string; categoryLabel: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl(path)}#collection`,
    url: absoluteUrl(path),
    name: "Biomedical & Hospital Product Catalog",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: p.name,
          description: p.description,
          category: p.categoryLabel,
          brand: { "@id": ORG_ID },
        },
      })),
    },
  };
}
