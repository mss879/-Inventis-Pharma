"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function BlogClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fade-in-up",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const articles = [
    {
      title: "Addressing Dialysis Consumable Sourcing in Sri Lankan Hospitals",
      excerpt: "An in-depth look at how structured logistical networks overcome import limitations to supply bloodline sets, high-flux dialyzers, and concentrates to clinics in Colombo, Galle, and Kandy.",
      date: "May 28, 2026",
      readTime: "6 min read",
      category: "Dialysis Sourcing"
    },
    {
      title: "Regulatory Compliance in Disinfection: Navigating SLS ASTM E 2315 Standard",
      excerpt: "Explaining the importance of ITI testing and GMP certification for pharmaceutical formulas like Sterigen used in high-risk sanitization and surgical preparation environments.",
      date: "May 15, 2026",
      readTime: "5 min read",
      category: "Regulatory Standards"
    },
    {
      title: "How Smart Medical Devices Transform Elder Care Sourcing in Dehiwala",
      excerpt: "Examining how digital oximeters, Nebulizers, and clinical monitors improve health outcomes in local elder homes and NGO rehabilitation facilities in Sri Lanka.",
      date: "May 04, 2026",
      readTime: "4 min read",
      category: "Homecare Care"
    }
  ];

  return (
    <div ref={containerRef} className="bg-white text-brand-charcoal min-h-screen pb-24 selection:bg-brand-orange selection:text-white">
      
      {/* Page Header */}
      <section className="relative pt-32 pb-20 bg-brand-orange-light/35 border-b border-brand-orange/10 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-brand-orange/10 blur-[80px]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            Healthcare Insights
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-brand-charcoal sm:text-5xl uppercase">
            MEDICAL NEWS & BLOG
          </h1>
          <p className="text-base text-brand-charcoal-muted max-w-xl mx-auto font-light leading-relaxed">
            Latest trends in biomedical technology, logistics, and healthcare compliance across Sri Lanka.
          </p>
        </div>
      </section>

      {/* Featured Post Card */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="bg-brand-gray-light border border-brand-orange/15 rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-center p-6 sm:p-8 hover:border-brand-orange/30 transition-bezier fade-in-up">
            
            {/* Image block */}
            <div className="lg:col-span-5 relative h-[300px] rounded-2xl overflow-hidden">
              <Image
                src="/sri_lanka_distribution_v2.png"
                alt="Medical distribution van Colombo"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Content block */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-4 text-xs font-semibold text-brand-orange">
                <span className="bg-brand-orange-light px-3 py-1 rounded-full border border-brand-orange/10">Featured Article</span>
                <span>•</span>
                <span className="text-brand-charcoal-muted">June 02, 2026</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-charcoal hover:text-brand-orange transition-colors cursor-pointer uppercase">
                Optimizing Sri Lanka's Public Medical Tender Supply Lines
              </h2>
              
              <p className="text-sm text-brand-charcoal-muted leading-relaxed">
                As a keen player in the tender market of Sri Lanka, we examine the complexities of importing biomedical consumables, ensuring NMRA compliance, and matching procurement cycles with private and state-run clinical networks.
              </p>
              
              <div className="pt-2 flex items-center justify-between text-xs font-semibold text-brand-charcoal-muted">
                <span>By Inventis Sourcing Desk</span>
                <span>7 min read</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Grid Posts Section */}
      <section className="py-12 border-t border-brand-orange/10 bg-brand-gray-light/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((art, idx) => (
              <article
                key={idx}
                className="bg-white border border-brand-orange/10 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm hover:border-brand-orange/35 hover:shadow-md transition-bezier fade-in-up"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-brand-orange">
                  <span className="bg-brand-orange-light/50 px-2.5 py-1 rounded-full border border-brand-orange/5">{art.category}</span>
                  <span className="text-brand-charcoal-muted">{art.date}</span>
                </div>
                <h3 className="text-lg font-bold text-brand-charcoal hover:text-brand-orange transition-colors cursor-pointer line-clamp-2 leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-brand-charcoal-muted leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
                <div className="border-t border-brand-orange/5 pt-4 flex justify-between items-center text-[11px] font-semibold text-brand-charcoal-muted">
                  <span>Sourcing Insights</span>
                  <span>{art.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
