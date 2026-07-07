"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { NAV_ITEMS } from "@/lib/site";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolledDown, setScrolledDown] = useState(false);
  const pathname = usePathname();
  
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const burgerLine1 = useRef<SVGLineElement>(null);
  const burgerLine2 = useRef<SVGLineElement>(null);
  const burgerLine3 = useRef<SVGLineElement>(null);
  
  const tl = useRef<gsap.core.Timeline | null>(null);

  // On the homepage the navbar starts transparent over the hero and turns
  // solid on scroll; every other route uses the solid style immediately.
  useEffect(() => {
    if (pathname !== "/") return;
    const handleScroll = () => setScrolledDown(window.scrollY > 50);
    handleScroll(); // sync to current position (e.g. restored scroll)
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Non-home routes always use the solid navbar; the homepage only turns solid
  // once the user scrolls off the hero.
  const isScrolled = pathname !== "/" || scrolledDown;

  // Initialize GSAP Timeline for menu open/close
  useEffect(() => {
    const timeline = gsap.timeline({ paused: true });
    
    // Animate overlay backdrop
    timeline.fromTo(
      overlayRef.current,
      { opacity: 0, pointerEvents: "none" },
      { opacity: 1, pointerEvents: "auto", duration: 0.4, ease: "power2.out" }
    );
    
    // Animate side drawer panel
    timeline.fromTo(
      menuRef.current,
      { x: "100%" },
      { x: "0%", duration: 0.6, ease: "power4.out" },
      "-=0.3"
    );
    
    // Stagger reveal links
    if (linksRef.current) {
      timeline.fromTo(
        linksRef.current.children,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power3.out", stagger: 0.08 },
        "-=0.4"
      );
    }
    
    // Hamburger line animations
    timeline.to(burgerLine2.current, { opacity: 0, duration: 0.2 }, "-=0.6");
    timeline.to(burgerLine1.current, { y: 6, rotation: 45, transformOrigin: "50% 50%", duration: 0.3 }, "-=0.6");
    timeline.to(burgerLine3.current, { y: -6, rotation: -45, transformOrigin: "50% 50%", duration: 0.3 }, "-=0.6");

    tl.current = timeline;

    return () => {
      if (tl.current) tl.current.kill();
    };
  }, []);

  // Trigger animation when state changes
  useEffect(() => {
    if (isOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isOpen]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close the drawer with the Escape key.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Dialog focus management: move focus into the open drawer, trap Tab within
  // it, and return focus to the toggle button on close.
  useEffect(() => {
    if (!isOpen) return;
    const drawer = menuRef.current;
    if (!drawer) return;
    const toggleButton = menuButtonRef.current;

    const getFocusable = () =>
      Array.from(
        drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        )
      );

    getFocusable()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    drawer.addEventListener("keydown", onKeyDown);
    return () => {
      drawer.removeEventListener("keydown", onKeyDown);
      toggleButton?.focus();
    };
  }, [isOpen]);

  // Close the drawer on browser back/forward (navigations that don't go through
  // the drawer's own links).
  useEffect(() => {
    const onPopState = () => setIsOpen(false);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navItems = NAV_ITEMS;

  return (
    <>
      {/* Top Navbar with Scroll Reactive Styling */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "border-b border-brand-orange/10 glass-nav shadow-sm"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1500px] px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-xl overflow-hidden bg-white p-1.5 flex items-center justify-center shadow-md shadow-brand-orange/20 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/inventis_logo.webp"
                alt="Inventis Pharma logo"
                width={28}
                height={28}
                preload
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-lg font-bold tracking-tight transition-colors duration-300 ${
                  isOpen
                    ? "text-white group-hover:text-brand-orange"
                    : isScrolled
                    ? "text-brand-charcoal group-hover:text-brand-orange"
                    : "text-white group-hover:text-brand-orange"
                }`}
              >
                Inventis Pharma
              </span>
              <span
                className={`text-[10px] tracking-widest uppercase font-semibold transition-colors duration-300 ${
                  isOpen
                    ? "text-white/60"
                    : isScrolled
                    ? "text-brand-charcoal-muted"
                    : "text-white/60"
                }`}
              >
                Pvt Ltd
              </span>
            </div>
          </Link>

          {/* Menu Button with scroll-reactive text color */}
          <button
            ref={menuButtonRef}
            onClick={() => setIsOpen(!isOpen)}
            className={`group flex items-center gap-4 px-6 py-3 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange z-50 cursor-pointer ${
              isOpen
                ? "text-white hover:text-brand-orange hover:bg-white/10"
                : isScrolled
                ? "hover:bg-brand-orange-light text-brand-charcoal hover:text-brand-orange"
                : "hover:bg-white/10 text-white hover:text-brand-orange"
            }`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="site-menu"
          >
            <span
              className={`hidden sm:inline text-sm uppercase tracking-widest font-black transition-colors ${
                isOpen
                  ? "text-white group-hover:text-brand-orange"
                  : isScrolled
                  ? "text-brand-charcoal group-hover:text-brand-orange"
                  : "text-white group-hover:text-brand-orange"
              }`}
            >
              MENU
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="transition-colors duration-300"
            >
              <line ref={burgerLine1} x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
              <line ref={burgerLine2} x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
              <line ref={burgerLine3} x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Side Menu Overlay Container. `inert` when closed removes the drawer's
          links/buttons from both the tab order and the accessibility tree. */}
      <div className="fixed inset-0 z-40 pointer-events-none" inert={!isOpen}>
        {/* Backdrop overlay */}
        <div
          ref={overlayRef}
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-brand-charcoal/20 backdrop-blur-[2px] pointer-events-none opacity-0"
        />

        {/* Side Panel Drawer */}
        <div
          ref={menuRef}
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="absolute top-0 right-0 bottom-0 w-full max-w-xl glass-menu shadow-2xl flex flex-col justify-between p-8 sm:p-12 border-l border-white/10 transform translate-x-full pointer-events-auto overflow-y-auto"
        >
          {/* Decorative background element for menu */}
          <div className="absolute top-[-20%] right-[-20%] w-[400px] h-[400px] rounded-full bg-brand-orange/10 blur-[100px] pointer-events-none" />

          {/* Close Button Inside Drawer */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-8 flex items-center justify-center h-12 w-12 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-all duration-300 focus:outline-none cursor-pointer"
            aria-label="Close Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
              <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
            </svg>
          </button>

          {/* Side Menu Header */}
          <div className="flex items-center justify-between pb-8 border-b border-white/10 mt-16">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">
              Navigation Menu
            </span>
          </div>

          {/* Side Menu Links */}
          <div ref={linksRef} className="flex flex-col gap-8 my-auto">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className="group flex items-baseline gap-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-white hover:text-brand-orange transition-colors duration-300"
                >
                  <span className="text-sm font-semibold text-white/30 group-hover:text-brand-orange transition-colors duration-300">
                    0{index + 1}.
                  </span>
                  <span className="relative">
                    {item.name}
                    {isActive && (
                      <span className="absolute left-0 bottom-0 w-full h-[4px] bg-brand-orange" />
                    )}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Side Menu Footer */}
          <div className="pt-8 border-t border-white/10 space-y-4">
            <p className="text-xs text-white/50 leading-relaxed">
              Inventis Pharma Pvt Ltd<br />
              Dehiwala, Sri Lanka.
            </p>
            <div className="flex gap-4 text-xs font-semibold text-white/40">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange">FB</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange">TW</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange">IG</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
