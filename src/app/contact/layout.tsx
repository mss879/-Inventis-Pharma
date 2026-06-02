import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Reach out to Inventis Pharma Pvt Ltd in Dehiwala, Sri Lanka. Contact us for medical product sourcing, hospital supply tenders, and partnerships."
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
