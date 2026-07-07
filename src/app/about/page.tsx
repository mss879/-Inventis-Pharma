import type { Metadata } from "next";
import AboutClient from "@/components/AboutClient";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const description =
  "Learn about Inventis Pharma (Pvt) Ltd — Sri Lanka's trusted importer and distributor of clinical systems, dialysis consumables, surgical equipment, and rehabilitation aids, and the team, mission, and quality standards behind it.";

export const metadata: Metadata = {
  title: "About Us — Our Mission, Team & Quality Standards",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Inventis Pharma | Medical Device Distributor Sri Lanka",
    description,
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        id="schema-about-webpage"
        data={webPageSchema({
          type: "AboutPage",
          path: "/about",
          name: "About Inventis Pharma",
          description,
        })}
      />
      <JsonLd
        id="schema-about-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <AboutClient />
    </>
  );
}
