import type { Metadata } from "next";
import ProductsClient from "@/components/ProductsClient";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const description =
  "Browse the Inventis Pharma catalog: dialysis consumables, rehabilitation aids, homecare devices, surgical consumables, and the SLS-certified Sterigen sanitizer — sourced from globally certified manufacturers for Sri Lanka.";

export const metadata: Metadata = {
  title: "Products — Biomedical Devices & Hospital Consumables Catalog",
  description,
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Medical Products & Biomedical Devices | Inventis Pharma",
    description,
    url: "/products",
    type: "website",
  },
};

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        id="schema-products-webpage"
        data={webPageSchema({
          type: "CollectionPage",
          path: "/products",
          name: "Biomedical & Hospital Product Catalog",
          description,
        })}
      />
      <JsonLd
        id="schema-products-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />
      <ProductsClient />
    </>
  );
}
