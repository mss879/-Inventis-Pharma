import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Blog & Insights",
  description: "Read updates on Sri Lankan medical device importing, NMRA regulatory compliance, ITI testing standards, and logistics."
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
