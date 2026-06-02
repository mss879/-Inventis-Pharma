"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-brand-gray-light border-t border-brand-orange/10 relative overflow-hidden">
      {/* Decorative accent element */}
      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-brand-orange to-brand-orange-dark" />
      
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Logo / Column 1 */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="h-9 w-9 rounded-xl bg-brand-orange flex items-center justify-center shadow-md shadow-brand-orange/30 group-hover:scale-105 transition-transform duration-300">
                <span className="font-extrabold text-white text-sm">I</span>
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
          
          {/* Column 2 & 3 */}
          <div className="mt-8 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            {/* Quick Links */}
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
            
            {/* Contact Portal */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                Corporate Address
              </h3>
              <address className="mt-4 not-italic space-y-2 text-sm text-brand-charcoal-muted leading-relaxed">
                <p className="font-semibold text-brand-charcoal">Inventis Pharma (Pvt) Ltd</p>
                <p>No. 11/8, Kawdana Road,</p>
                <p>Dehiwala, Sri Lanka.</p>
              </address>
              <div className="mt-6 flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-charcoal-muted hover:text-brand-orange transition-colors"
                  aria-label="Facebook Link"
                >
                  Facebook
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-charcoal-muted hover:text-brand-orange transition-colors"
                  aria-label="Twitter Link"
                >
                  Twitter
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-charcoal-muted hover:text-brand-orange transition-colors"
                  aria-label="Instagram Link"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
          
        </div>
        
        <div className="mt-12 border-t border-brand-orange/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <p className="text-xs text-brand-charcoal-muted">
              &copy; {new Date().getFullYear()} Inventis Pharma Pvt Ltd. All rights reserved.
            </p>
            <div className="hidden md:block h-4 w-[1px] bg-brand-orange/20" />
            <a
              href="https://www.arcai.agency"
              target="_blank"
              rel="noopener"
              title="Arc AI - Professional AI & Software Solutions Agency"
              className="flex items-center gap-1.5 text-xs text-brand-charcoal-muted hover:text-brand-orange transition-colors group select-none pointer-events-auto"
            >
              <span>Built & designed by</span>
              <span className="relative flex items-center h-6 w-18 transition-all duration-300 opacity-95 group-hover:opacity-100 group-hover:scale-105">
                <Image
                  src="/logo-black.png"
                  alt="Arc AI logo"
                  fill
                  sizes="72px"
                  className="object-contain"
                />
              </span>
            </a>
          </div>
          <div className="flex gap-6 text-xs text-brand-charcoal-muted">
            <span className="hover:text-brand-orange cursor-pointer transition-colors">Regulatory Compliance</span>
            <span className="hover:text-brand-orange cursor-pointer transition-colors">ITI Certifications</span>
            <span className="hover:text-brand-orange cursor-pointer transition-colors">SLS Quality Assurance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
