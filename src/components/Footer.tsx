"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-brand-gray-light border-t border-brand-orange/10 relative overflow-hidden">
      {/* Decorative accent element */}
      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-brand-orange to-brand-orange-dark" />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8">

          {/* Brand / Column 1 */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="h-9 w-9 rounded-xl overflow-hidden bg-white p-1.5 flex items-center justify-center shadow-md shadow-brand-orange/20 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/inventis_logo.webp"
                  alt="Inventis Pharma logo"
                  width={24}
                  height={24}
                  loading="lazy"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-brand-charcoal group-hover:text-brand-orange transition-colors duration-300">
                  Inventis Pharma
                </span>
                <span className="text-[9px] text-brand-charcoal-muted tracking-widest uppercase font-semibold">
                  Pvt Ltd
                </span>
              </div>
            </Link>
            <p className="text-sm text-brand-charcoal-muted max-w-xs leading-relaxed">
              Empowering healthcare and wellness in Sri Lanka with smart, innovative, and reliable biomedical solutions.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              Quick Navigation
            </h3>
            <ul role="list" className="mt-4 space-y-3">
              <li>
                <Link href="/" className="text-sm text-brand-charcoal-muted hover:text-brand-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-brand-charcoal-muted hover:text-brand-orange transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-brand-charcoal-muted hover:text-brand-orange transition-colors">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-brand-charcoal-muted hover:text-brand-orange transition-colors">
                  Medical Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate Address */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              Corporate Address
            </h3>
            <address className="mt-4 not-italic space-y-2 text-sm text-brand-charcoal-muted leading-relaxed">
              <p className="font-semibold text-brand-charcoal">Inventis Pharma (Pvt) Ltd</p>
              <p>No. 11/8, Kawdana Road,</p>
              <p>Dehiwala, Sri Lanka.</p>
            </address>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand-charcoal-muted hover:text-brand-orange transition-colors"
                aria-label="Inventis Pharma on Facebook"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand-charcoal-muted hover:text-brand-orange transition-colors"
                aria-label="Inventis Pharma on Twitter"
              >
                Twitter
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand-charcoal-muted hover:text-brand-orange transition-colors"
                aria-label="Inventis Pharma on Instagram"
              >
                Instagram
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-brand-orange/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
            <p className="text-xs text-brand-charcoal-muted">
              &copy; {new Date().getFullYear()} Inventis Pharma Pvt Ltd. All rights reserved.
            </p>
            <div className="hidden sm:block h-4 w-[1px] bg-brand-orange/20" />
            <a
              href="https://www.arcai.agency"
              target="_blank"
              rel="noopener"
              title="ARC AI — AI & Software Development Agency"
              className="group inline-flex items-center gap-2 text-xs text-brand-charcoal-muted hover:text-brand-orange transition-colors"
            >
              <span>Built &amp; Designed by</span>
              <span className="relative flex items-center h-5 w-16 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
                <Image
                  src="/logo-black.webp"
                  alt="ARC AI — AI Agency & Software Development Company"
                  fill
                  sizes="64px"
                  className="object-contain"
                  loading="lazy"
                />
              </span>
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-brand-charcoal-muted">
            <span className="hover:text-brand-orange transition-colors">Regulatory Compliance</span>
            <span className="hover:text-brand-orange transition-colors">ITI Certifications</span>
            <span className="hover:text-brand-orange transition-colors">SLS Quality Assurance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
