import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Inventis Pharma's corporate mission, vision, team operational framework, and quality assurance compliance in Sri Lanka."
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
