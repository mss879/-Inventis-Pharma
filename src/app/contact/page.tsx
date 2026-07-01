import { Metadata } from "next";
import ContactClient from "@/components/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Inventis Sourcing Desk in Dehiwala, Sri Lanka. Discuss medical tenders, product distribution agreements, and global supplier partnership models.",
  keywords: [
    "Contact Inventis Pharma",
    "Sourcing Inquiry Sri Lanka",
    "Dehiwala Office Contact",
    "Medical Equipment Sourcing Partnerships"
  ],
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const resolvedParams = await searchParams;
  return <ContactClient initialSubject={resolvedParams.subject || ""} />;
}
