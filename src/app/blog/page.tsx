import { Metadata } from "next";
import BlogClient from "@/components/BlogClient";

export const metadata: Metadata = {
  title: "Medical News & Blog",
  description: "Read the latest news and professional updates on biomedical logistics, tender compliance, NMRA regulations, and healthcare advancements in Sri Lanka from the Inventis Desk.",
  keywords: [
    "Medical News Sri Lanka",
    "Sourcing Insights Colombo",
    "Tender Compliance Sourcing",
    "Healthcare Regulations Blog"
  ],
};

export default function BlogPage() {
  return <BlogClient />;
}
