import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Biomedical Products",
  description: "Browse our medical sourcing catalog including dialysis consumables, rehabilitation aids, homecare medical devices, and certified surgical consumables in Sri Lanka."
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
