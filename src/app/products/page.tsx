import { Metadata } from "next";
import ProductsClient from "@/components/ProductsClient";

export const metadata: Metadata = {
  title: "Our Products",
  description: "Explore the medical product portfolio of Inventis Pharma: clinical dialysis consumables, surgical gowns, rehabilitation aids, homecare devices, and SLS-certified Sterigen sanitizer.",
  keywords: [
    "Medical Products Sri Lanka",
    "Surgical Consumables Colombo",
    "Sterigen Sanitizer SLS",
    "Hemodialysis concentrates",
    "Rehabilitation aids",
    "Homecare Medical Devices"
  ],
};

export default function ProductsPage() {
  return <ProductsClient />;
}
