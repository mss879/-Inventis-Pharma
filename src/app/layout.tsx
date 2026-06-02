import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Inventis Pharma | Smart Biomedical Solutions & Sourcing Sri Lanka",
    template: "%s | Inventis Pharma"
  },
  description: "Inventis Pharma Pvt Ltd is Sri Lanka's leading importer and distributor of clinical biomedical devices, dialysis consumables, rehabilitation aids, homecare apparatus, and surgical equipment.",
  keywords: [
    "Inventis Pharma",
    "Biomedical Devices Sri Lanka",
    "Dialysis Consumables Sri Lanka",
    "Rehabilitation Aids Colombo",
    "Surgical Equipment Distributor",
    "Homecare Medical Devices",
    "Sterigen Sanitizer Sri Lanka",
    "Medical Sourcing Sri Lanka",
    "Clinical Systems Distributor Colombo"
  ],
  authors: [{ name: "Inventis Pharma Team" }],
  creator: "Inventis Pharma Pvt Ltd",
  publisher: "Inventis Pharma Pvt Ltd",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "Inventis Pharma | Smart Biomedical Solutions & Sourcing Sri Lanka",
    description: "Sri Lanka's premier partner for medical equipment, clinical systems, dialysis consumables, and surgical apparatus sourcing.",
    url: "https://inventispharma.org",
    siteName: "Inventis Pharma",
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inventis Pharma | Smart Biomedical Solutions & Sourcing",
    description: "Sri Lanka's premier importer and distributor of biomedical devices and clinical equipment.",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-brand-charcoal">
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
