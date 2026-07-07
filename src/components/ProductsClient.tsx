"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const products = [
  // Dialysis Consumables
  {
    id: "hemodialysis-concentrates",
    name: "Hemodialysis Concentrates",
    category: "dialysis",
    categoryLabel: "Dialysis Consumables",
    description: "A-Formula & B-Formula acid/bicarbonate concentrates, manufactured with high-purity USP grade chemicals for safe dialysis therapy.",
    tags: ["USP Grade", "Liquid & Powder", "CE Certified"],
    specs: "Packaged in sterile, medical-grade canisters with color-coded caps for secure connection."
  },
  {
    id: "high-flux-dialyzers",
    name: "High-Flux Dialyzers",
    category: "dialysis",
    categoryLabel: "Dialysis Consumables",
    description: "Advanced polyethersulfone membrane dialyzers offering superior middle-molecule clearance, high biocompatibility, and low thrombogenicity.",
    tags: ["Biocompatible", "High Clearance", "Sterile EO"],
    specs: "Steam sterilized for optimal clinical safety. Available in multiple surface area sizes."
  },
  {
    id: "av-fistula-needles",
    name: "AV Fistula Needles",
    category: "dialysis",
    categoryLabel: "Dialysis Consumables",
    description: "Ultra-thin wall cannulas with siliconized needles for smooth arterial and venous access during dialysis treatments.",
    tags: ["Siliconized", "Twin-Pack", "Color-Coded"],
    specs: "Equipped with rotating hubs and flexible butterfly wings for easy manipulation."
  },
  {
    id: "bloodline-tubing-sets",
    name: "Bloodline Tubing Sets",
    category: "dialysis",
    categoryLabel: "Dialysis Consumables",
    description: "Medical-grade PVC bloodline tubing sets designed with universal pump segments for absolute compatibility with major dialysis machines.",
    tags: ["Phthalate-Free", "DEHP-Free", "High Strength"],
    specs: "Includes injection ports and blood filter chambers for bubble-free transfusion."
  },
  {
    id: "dialysis-catheters",
    name: "Dialysis Catheters",
    category: "dialysis",
    categoryLabel: "Dialysis Consumables",
    description: "Dual-lumen and triple-lumen hemodialysis catheters for temporary or long-term vascular access, made of thermosensitive polyurethane.",
    tags: ["Dual/Triple Lumen", "Radiopaque", "Heparin-Lock"],
    specs: "High flow rate profiles with kink-resistant designs and suture-friendly wing anchors."
  },

  // Rehabilitation & Allied Aids
  {
    id: "adjustable-wheelchairs",
    name: "Adjustable Wheelchairs",
    category: "rehabilitation",
    categoryLabel: "Rehabilitation Aids",
    description: "Lightweight steel frames with high-strength composite seats, featuring foldaway armrests and swing-away elevating footrests.",
    tags: ["Lightweight Steel", "Foldable", "Anti-Tipper"],
    specs: "Supports up to 135kg. Designed for both hospital ward transport and home usage."
  },
  {
    id: "axillary-elbow-crutches",
    name: "Axillary & Elbow Crutches",
    category: "rehabilitation",
    categoryLabel: "Rehabilitation Aids",
    description: "Ergonomic anodized aluminum crutches with push-button height adjustments and shock-absorbing heavy-duty rubber tips.",
    tags: ["Anodized Aluminum", "Adjustable Height", "Non-Slip"],
    specs: "Dual-molded handgrips reduce strain. Anti-rattle collars for silent operation."
  },
  {
    id: "walking-frames-rollators",
    name: "Walking Frames & Rollators",
    category: "rehabilitation",
    categoryLabel: "Rehabilitation Aids",
    description: "Four-wheeled rollators with integrated handbrakes, under-seat storage, and a padded comfort rest for active recovery support.",
    tags: ["Integrated Brakes", "Storage Pouch", "Wider Base"],
    specs: "Sturdy aluminum cross-brace frame. Foldable design for compact trunk storage."
  },
  {
    id: "orthopedic-braces",
    name: "Orthopedic Braces",
    category: "rehabilitation",
    categoryLabel: "Rehabilitation Aids",
    description: "Pre-shaped stabilizer splints for wrist, knee, and ankle support, crafted with breathable neoprene for clinical compression.",
    tags: ["Neoprene Breathable", "Adjustable Velcro", "Stabilizing Splints"],
    specs: "Removable anatomical stays. Ideal for post-surgical mobilization and support."
  },
  {
    id: "physiotherapy-apparatus",
    name: "Physiotherapy Apparatus",
    category: "rehabilitation",
    categoryLabel: "Rehabilitation Aids",
    description: "Portable TENS units and muscle stimulators designed for post-surgical pain relief, muscle education, and physical rehabilitation.",
    tags: ["Digital Control", "Battery Operated", "FDA Cleared"],
    specs: "Includes multi-channel settings and durable self-adhesive carbon electrode pads."
  },

  // Homecare Medical Devices
  {
    id: "digital-bp-monitors",
    name: "Digital BP Monitors",
    category: "homecare",
    categoryLabel: "Homecare Devices",
    description: "Fully automatic upper-arm monitors featuring irregular heartbeat detection, cuff wrap guides, and multi-user memory storage.",
    tags: ["Oscillometric", "LCD Backlit", "Dual User Memory"],
    specs: "One-touch fully automatic inflation. Certified by international hypertension societies."
  },
  {
    id: "infrared-thermometers",
    name: "Infrared Thermometers",
    category: "homecare",
    categoryLabel: "Homecare Devices",
    description: "Non-contact forehead thermometers with high-precision microchips for instantaneous, hygienic temperature reads within 1 second.",
    tags: ["Non-Contact 1s", "Fever Alert", "FDA & CE Approved"],
    specs: "Saves up to 32 readings. Tri-color backlit display for easy interpretation."
  },
  {
    id: "mesh-nebulizers",
    name: "Mesh Nebulizers",
    category: "homecare",
    categoryLabel: "Homecare Devices",
    description: "Silent, vibrating mesh technology nebulizers delivering micro-sized aerosol particles for efficient asthma and respiratory treatment.",
    tags: ["Vibrating Mesh", "Ultra-Silent", "Pocket Size"],
    specs: "Dual power options (USB/AA batteries). Low residue design minimizes medication waste."
  },
  {
    id: "pulse-oximeters",
    name: "Pulse Oximeters",
    category: "homecare",
    categoryLabel: "Homecare Devices",
    description: "Compact fingertip monitors measuring blood oxygen saturation levels (SpO2) and pulse rate with high-definition OLED displays.",
    tags: ["OLED Color Display", "Auto Power Off", "High Accuracy"],
    specs: "Plethysmograph wave visualizer. Real-time visual alarms for critical thresholds."
  },
  {
    id: "blood-glucose-meters",
    name: "Blood Glucose Meters",
    category: "homecare",
    categoryLabel: "Homecare Devices",
    description: "Fast-acting glucose monitoring systems requiring minimal blood samples, with automatic coding and test reminders.",
    tags: ["No-Coding", "5s Rapid Test", "Bluetooth Sync"],
    specs: "Stores up to 500 test results with pre/post-meal tagging and average analysis."
  },

  // Surgical & Hospital Consumables
  {
    id: "surgical-gowns-drapes",
    name: "Surgical Gowns & Drapes",
    category: "surgical",
    categoryLabel: "Surgical Consumables",
    description: "Waterproof SMS-polypropylene sterile gowns offering premium liquid barrier protection in high-fluid operating theater environments.",
    tags: ["SMS Material", "AAMI Level 3/4", "EO Sterile"],
    specs: "Compliant with EN 13795 standards. Ultrasonic seam sealing for maximum security."
  },
  {
    id: "surgical-sutures-blades",
    name: "Surgical Sutures & Blades",
    category: "surgical",
    categoryLabel: "Surgical Consumables",
    description: "Absorbable and non-absorbable sterile sutures with carbon steel surgical blades for clean incisions and wound closure.",
    tags: ["Ultra-Sharp Steel", "Monofilament/Braided", "USP Standards"],
    specs: "Blades individually foil-packed. Sutures equipped with high-tensile stainless needles."
  },
  {
    id: "iv-cannulas-catheters",
    name: "IV Cannulas & Catheters",
    category: "surgical",
    categoryLabel: "Surgical Consumables",
    description: "Safety-engineered peripheral IV cannulas featuring automated needle retraction to prevent accidental needlestick injuries.",
    tags: ["Safety Retractable", "PTFE/FEP Catheter", "Thin Wall"],
    specs: "Color-coded ports for gauge size identification. Hydrophobic filter caps."
  },
  {
    id: "sterile-syringes-needles",
    name: "Sterile Syringes & Needles",
    category: "surgical",
    categoryLabel: "Surgical Consumables",
    description: "Three-part plastic syringes with clear barrel graduation and ultra-fine bevel surgical needles for precise administration.",
    tags: ["Luer Lock/Slip", "Siliconized Bevel", "Non-Toxic Pyrogen-Free"],
    specs: "Strictly single-use, individually blister-packed. Plunger safety block design."
  },
  {
    id: "wound-care-dressings",
    name: "Wound Care Dressings",
    category: "surgical",
    categoryLabel: "Surgical Consumables",
    description: "High-absorption hydrocolloid and polyurethane foam dressings for sterile chronic, burn, and acute wound protection.",
    tags: ["Hydrocolloid", "Breathable Film", "Exudate Control"],
    specs: "Semi-permeable outer layer prevents bacterial ingress while allowing water vapor exchange."
  }
];

const DialysisIcon = () => (
  <svg className="h-6 w-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m-9-9h18" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 8l8 8m-8 0l8-8" />
  </svg>
);

const RehabIcon = () => (
  <svg className="h-6 w-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4a3 3 0 100-6 3 3 0 000 6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 10.5V17a2 2 0 01-2 2H7a2 2 0 01-2-2v-6.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 22v-3m6 3v-3M4 9h16" />
  </svg>
);

const HomecareIcon = () => (
  <svg className="h-6 w-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h1.5l2.462-6.155a1 1 0 011.854 0L12.5 18l2.184-5.459a1 1 0 011.854 0L19.5 12" />
  </svg>
);

const SurgicalIcon = () => (
  <svg className="h-6 w-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "dialysis":
      return <DialysisIcon />;
    case "rehabilitation":
      return <RehabIcon />;
    case "homecare":
      return <HomecareIcon />;
    case "surgical":
      return <SurgicalIcon />;
    default:
      return <SurgicalIcon />;
  }
};

export default function ProductsClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          ".hero-reveal, .featured-image, .featured-content > *, .catalog-header, .filter-hub",
          { opacity: 1, x: 0, y: 0, scale: 1, clipPath: "none" }
        );
        return;
      }
      // Hero elements reveal on page load
      gsap.fromTo(
        ".hero-reveal",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.1 }
      );

      // Featured product image smooth clip-path wipe & scale reveal
      gsap.fromTo(
        ".featured-image",
        { opacity: 0, scale: 0.95, clipPath: "inset(0% 100% 0% 0%)" },
        { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power3.inOut", delay: 0.2 }
      );

      // Featured product specifications text stagger
      gsap.fromTo(
        ".featured-content > *",
        { opacity: 0, x: 25 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out", stagger: 0.08, delay: 0.4 }
      );

      // Scroll reveal trigger for main catalog header
      gsap.fromTo(
        ".catalog-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".catalog-header",
            start: "top 85%"
          }
        }
      );

      // Scroll reveal trigger for search & tabs hub
      gsap.fromTo(
        ".filter-hub",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".filter-hub",
            start: "top 90%"
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Cascading stagger animation triggered every time filter search state updates
  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll(".product-card");
    if (!cards || cards.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(cards, { opacity: 1, scale: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.94, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.04,
        overwrite: "auto",
      }
    );
  }, [selectedCategory, searchQuery]);

  const categories = [
    { id: "all", label: "All Products" },
    { id: "dialysis", label: "Dialysis Consumables" },
    { id: "rehabilitation", label: "Rehabilitation Aids" },
    { id: "homecare", label: "Homecare Devices" },
    { id: "surgical", label: "Surgical Consumables" }
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div ref={containerRef} className="bg-white text-brand-charcoal min-h-screen pb-24 selection:bg-brand-orange selection:text-white">
      
      {/* Page Header */}
      <section className="relative pt-32 pb-20 bg-brand-orange-light/35 border-b border-brand-orange/10 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-brand-orange/10 blur-[80px]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange hero-reveal">
            Inventis Portfolio
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-brand-charcoal sm:text-5xl uppercase hero-reveal">
            OUR PRODUCTS
          </h1>
          <p className="text-base text-brand-charcoal-muted max-w-xl mx-auto font-light leading-relaxed hero-reveal">
            Supplying premium biomedical devices, surgical consumables, and sanitization formulas across Sri Lanka.
          </p>
        </div>
      </section>

      {/* Featured Product Section: Sterigen */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image Container */}
            <div className="lg:col-span-5 relative h-[450px] rounded-2xl overflow-hidden shadow-xl border border-brand-orange/15 featured-image">
              <Image
                src="/sterigen_product.webp"
                alt="Sterigen clinical-grade hand sanitizer bottle"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                preload
              />
            </div>
            
            {/* Spec Panel */}
            <div className="lg:col-span-7 space-y-6 featured-content">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                  Premium Sanitization Line
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-brand-charcoal sm:text-4xl uppercase">
                  STERIGEN SANITIZER
                </h2>
              </div>
              <p className="text-base text-brand-charcoal-muted leading-relaxed">
                Sterigen Hand Sanitizer is a clinical-grade formula manufactured under GMP compliant facilities. Built to achieve high-performance bacterial reduction, it features standard WHO recommended alcohol concentrations.
              </p>

              {/* Badges/Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "SLS Certified", val: "SLS ASTM E 2315 : 2020 Standard" },
                  { label: "Regulatory Sourcing", val: "ITI Certified formula" },
                  { label: "Safety Recommended", val: "WHO Recommended Alcohol Content" },
                  { label: "Manufacturing Facility", val: "GMP Compliant Factory" }
                ].map((spec, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-brand-gray-light border border-brand-orange/5 space-y-1">
                    <span className="text-xs font-bold text-brand-orange uppercase">{spec.label}</span>
                    <p className="text-sm font-semibold text-brand-charcoal">{spec.val}</p>
                  </div>
                ))}
              </div>

              {/* Lab Tested Highlight */}
              <div className="p-4 rounded-xl bg-brand-orange-light/40 border border-brand-orange/10 flex gap-3 items-start">
                <div className="h-5 w-5 rounded-full bg-brand-orange text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-brand-charcoal text-sm">Lab Tested Formula</h4>
                  <p className="text-xs text-brand-charcoal-muted mt-0.5">Meticulously evaluated for antimicrobial efficacy and user dermatological safety standards.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Catalog Sourcing Section */}
      <section className="py-20 bg-brand-gray-light border-y border-brand-orange/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 catalog-header">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              Biomedical Sourcing Catalog
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-charcoal uppercase">
              BIOMEDICAL & HOSPITAL SOLUTIONS
            </h2>
            <p className="text-base text-brand-charcoal-muted leading-relaxed">
              Search and filter our comprehensive list of clinical devices and hospital consumables imported from globally-certified manufacturers.
            </p>
          </div>

          {/* Search and Filters Hub */}
          <div className="mb-12 space-y-6 filter-hub">
            {/* Search input */}
            <div className="max-w-md mx-auto relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-brand-charcoal-muted/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                id="product-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, specifications, or tags..."
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-brand-orange/15 bg-white text-sm text-brand-charcoal placeholder-brand-charcoal-muted/50 focus:border-brand-orange focus:outline-none shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-brand-orange hover:text-brand-orange-dark transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto px-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  id={`cat-btn-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer border ${
                    selectedCategory === cat.id
                      ? "bg-brand-orange text-white border-brand-orange shadow-md shadow-brand-orange/15 scale-105"
                      : "bg-white text-brand-charcoal border-brand-orange/15 hover:border-brand-orange hover:text-brand-orange"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout of Products */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-card group relative bg-white rounded-2xl p-6 border border-brand-orange/10 shadow-sm hover:shadow-xl hover:shadow-brand-orange/5 hover:-translate-y-1.5 hover:border-brand-orange transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Highlight bar shown on hover */}
                  <div className="absolute top-0 left-0 w-1.5 h-0 group-hover:h-full bg-brand-orange transition-all duration-300" />
                  
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div className="p-2.5 rounded-xl bg-brand-orange-light/40 border border-brand-orange/5 group-hover:bg-brand-orange/10 group-hover:border-brand-orange/20 transition-all">
                        {getCategoryIcon(product.category)}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange bg-brand-orange-light/60 px-2 py-0.5 rounded-full border border-brand-orange/5">
                        {product.categoryLabel}
                      </span>
                    </div>

                    {/* Name & Desc */}
                    <div>
                      <h3 className="text-lg font-black text-brand-charcoal group-hover:text-brand-orange uppercase tracking-tight transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-brand-charcoal-muted leading-relaxed mt-2.5 line-clamp-3">
                        {product.description}
                      </p>
                    </div>

                    {/* Technical Specs box */}
                    <div className="p-3.5 rounded-xl bg-brand-gray-light border border-brand-orange/5 text-xs text-brand-charcoal-muted space-y-1.5 group-hover:bg-brand-orange-light/10 transition-colors">
                      <div className="flex items-center gap-1 text-brand-orange font-bold uppercase tracking-wider text-[10px]">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Specification
                      </div>
                      <p className="leading-relaxed text-brand-charcoal/80 font-medium">{product.specs}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {product.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="text-[9px] font-bold px-2 py-0.5 bg-brand-gray text-brand-charcoal-muted rounded border border-transparent group-hover:border-brand-orange/5 transition-all"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sourcing Action Button */}
                  <div className="pt-6">
                    <Link
                      id={`inquire-${product.id}`}
                      href={`/contact?subject=Sourcing%20Inquiry%3A%20${encodeURIComponent(product.name)}`}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-brand-orange/15 text-xs font-bold text-brand-orange bg-white hover:bg-brand-orange hover:text-white transition-all duration-300"
                    >
                      Inquire Sourcing <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-brand-orange/10 p-8">
              <svg className="mx-auto h-12 w-12 text-brand-charcoal-muted/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-base font-bold text-brand-charcoal uppercase">No matching products found</h3>
              <p className="text-xs text-brand-charcoal-muted mt-1 max-w-sm mx-auto">
                Try modifying your search keywords or choosing a different category filter.
              </p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
