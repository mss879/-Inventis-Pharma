import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { rootGraph } from "@/lib/schema";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Inventis Pharma | Biomedical Device Importer & Distributor Sri Lanka",
    template: "%s | Inventis Pharma",
  },
  description:
    "Inventis Pharma (Pvt) Ltd is Sri Lanka's leading importer and distributor of clinical biomedical devices, dialysis consumables, rehabilitation aids, homecare apparatus, and surgical equipment.",
  applicationName: SITE_NAME,
  category: "Medical Equipment Supplier",
  keywords: [
    "Inventis Pharma",
    "Biomedical Devices Sri Lanka",
    "Medical Equipment Distributor Sri Lanka",
    "Dialysis Consumables Sri Lanka",
    "Surgical Equipment Supplier Colombo",
  ],
  authors: [
    { name: "Inventis Pharma Team" },
    { name: "ARC AI", url: "https://www.arcai.agency" },
  ],
  creator: "ARC AI",
  publisher: "Inventis Pharma (Pvt) Ltd",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "Inventis Pharma | Smart Biomedical Solutions & Sourcing Sri Lanka",
    description:
      "Sri Lanka's premier partner for medical equipment, clinical systems, dialysis consumables, and surgical apparatus sourcing.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inventis Pharma | Smart Biomedical Solutions & Sourcing",
    description:
      "Sri Lanka's premier importer and distributor of biomedical devices and clinical equipment.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#c19530",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-LK"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-brand-charcoal">
        <JsonLd data={rootGraph()} id="schema-organization" />
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
