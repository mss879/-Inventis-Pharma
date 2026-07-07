import type { Metadata } from "next";
import BlogClient from "@/components/BlogClient";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const description =
  "Insights from the Inventis sourcing desk: biomedical logistics, medical tender compliance, NMRA and ITI regulations, and healthcare technology trends across Sri Lanka.";

export const metadata: Metadata = {
  title: "Blog — Biomedical Sourcing & Healthcare Insights",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Medical News & Sourcing Insights | Inventis Pharma",
    description,
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <>
      <JsonLd
        id="schema-blog-webpage"
        data={webPageSchema({
          type: "Blog",
          path: "/blog",
          name: "Inventis Pharma Blog",
          description,
        })}
      />
      <JsonLd
        id="schema-blog-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <BlogClient />
    </>
  );
}
