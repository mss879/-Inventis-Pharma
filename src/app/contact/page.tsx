import type { Metadata } from "next";
import ContactClient from "@/components/ContactClient";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const description =
  "Contact the Inventis Pharma sourcing desk in Dehiwala, Sri Lanka to discuss medical tenders, product distribution agreements, and global supplier partnerships.";

export const metadata: Metadata = {
  title: "Contact Us — Medical Sourcing & Tender Inquiries",
  description,
  // Canonicalise every /contact?subject=… variant to the clean URL so the
  // deep-link query strings from the products page don't fragment into
  // duplicate pages.
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Inventis Pharma | Dehiwala, Sri Lanka",
    description,
    url: "/contact",
    type: "website",
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const resolvedParams = await searchParams;
  return (
    <>
      <JsonLd
        id="schema-contact-webpage"
        data={webPageSchema({
          type: "ContactPage",
          path: "/contact",
          name: "Contact Inventis Pharma",
          description,
        })}
      />
      <JsonLd
        id="schema-contact-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <ContactClient initialSubject={resolvedParams.subject || ""} />
    </>
  );
}
