import { Metadata } from "next";
import AboutClient from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Inventis Pharma Pvt Ltd, Sri Lanka's leading importer and distributor of high-end clinical systems, dialysis consumables, surgical equipment, and rehabilitation aids.",
  keywords: [
    "About Inventis Pharma",
    "Medical Distributor Sri Lanka",
    "Clinical Systems Team Colombo",
    "NMRA Certified Importer",
    "Biomedical Sourcing Ethics"
  ],
};

export default function AboutPage() {
  return <AboutClient />;
}
