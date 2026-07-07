"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function AboutClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(".fade-in-up", { opacity: 1, y: 0 });
        return;
      }
      // Entry animations for lists and containers
      gsap.fromTo(
        ".fade-in-up",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white text-brand-charcoal min-h-screen pb-24 selection:bg-brand-orange selection:text-white">
      
      {/* Page Header Banner */}
      <section className="relative pt-32 pb-20 bg-brand-orange-light/35 border-b border-brand-orange/10 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-brand-orange/10 blur-[80px]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            Learn More
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-brand-charcoal sm:text-5xl uppercase">
            WHO WE ARE
          </h1>
          <p className="text-base text-brand-charcoal-muted max-w-xl mx-auto font-light leading-relaxed">
            Empowering healthcare standards in Sri Lanka through ethical leadership and cutting-edge biotechnology.
          </p>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="bg-brand-gray-light border border-brand-orange/15 rounded-2xl p-8 sm:p-10 shadow-sm hover:border-brand-orange/30 transition-bezier hover:shadow-md fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-lg bg-brand-orange flex items-center justify-center shrink-0">
                  <span className="font-extrabold text-white text-xs">V</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight text-brand-charcoal uppercase">
                  OUR VISION
                </h2>
              </div>
              <p className="text-base text-brand-charcoal-muted leading-relaxed">
                Is to empower users with advanced, smart and reliable medical devices which promote better solutions for clinical diagnostics, patient care, and overall healthcare wellness.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-brand-gray-light border border-brand-orange/15 rounded-2xl p-8 sm:p-10 shadow-sm hover:border-brand-orange/30 transition-bezier hover:shadow-md fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-lg bg-brand-orange flex items-center justify-center shrink-0">
                  <span className="font-extrabold text-white text-xs">M</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight text-brand-charcoal uppercase">
                  OUR MISSION
                </h2>
              </div>
              <ul className="space-y-4 text-sm text-brand-charcoal-muted leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-brand-orange font-bold">•</span>
                  <span>A firm commitment to bettering patient health, by providing patients and customers innovative biomedical solutions.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-orange font-bold">•</span>
                  <span>Creating outstanding shareholder value with disciplined implementation, strategic partnerships and ethical leadership.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Value Statement */}
      <section className="py-16 bg-brand-orange-light/15 border-y border-brand-orange/5">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center space-y-6 fade-in-up">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            Our Promise
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-charcoal uppercase">
            CORPORATE VALUE STATEMENT
          </h2>
          <blockquote className="text-lg sm:text-xl font-medium italic text-brand-charcoal-muted leading-relaxed">
            &ldquo;To be trusted by customers and society at large. To be known as a responsible partner, dedicated to offering superior quality solutions and technology.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* The Inventis Team */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-center">
            
            <div className="lg:col-span-7 space-y-6 fade-in-up">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                Operational Framework
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-brand-charcoal uppercase">
                THE INVENTIS TEAM
              </h2>
              <p className="text-base text-brand-charcoal-muted leading-relaxed">
                Our cohesive and effective teams balance the conflicting requirements of the diverse environment with each team member taking responsibility for achieving the targets required to make the overall mission a success.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  "Guided by elevating goals",
                  "Supported by a result driven structure",
                  "Unified in commitment",
                  "Quality oriented & safety conscious",
                  "Defined by principled leadership"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-brand-orange shrink-0" />
                    <span className="text-sm font-semibold text-brand-charcoal-muted">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 relative h-[300px] sm:h-[350px] rounded-2xl overflow-hidden shadow-lg border border-brand-orange/5 fade-in-up">
              <Image
                src="/hero_fallback.webp"
                alt="The Inventis Pharma team at work in a biomedical facility"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                loading="lazy"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-20 bg-brand-gray-light border-y border-brand-orange/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 fade-in-up">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              Regulatory Compliance
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-charcoal uppercase">
              QUALITY ASSURANCE
            </h2>
            <p className="text-base text-brand-charcoal-muted leading-relaxed">
              At Inventis, delivering quality is every employee’s responsibility and spans across the company and every functional unit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Continual Improvement",
                desc: "Implementing progressive modifications across all functional storage, testing, and delivery workflows in Sri Lanka."
              },
              {
                num: "02",
                title: "Enhanced User Experience",
                desc: "Focusing heavily on customers' quality requirements to enhance the ultimate biomedical device experience."
              },
              {
                num: "03",
                title: "Highest Standards",
                desc: "Adhering meticulously to all applicable regulatory requirements of the National Medicines Regulatory Authority (NMRA)."
              }
            ].map((qa, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-brand-orange/15 shadow-sm fade-in-up">
                <span className="text-sm font-extrabold text-brand-orange uppercase block mb-4">Priority {qa.num}</span>
                <h3 className="text-lg font-bold text-brand-charcoal mb-2">{qa.title}</h3>
                <p className="text-sm text-brand-charcoal-muted leading-relaxed">{qa.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Partners & CSR */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Global Partners */}
            <div className="space-y-4 fade-in-up">
              <h3 className="text-xl font-bold text-brand-charcoal uppercase">
                GLOBAL PARTNERS
              </h3>
              <p className="text-sm text-brand-charcoal-muted leading-relaxed">
                Today’s global economy is more complex and integrated than ever before. New technologies and quality manufacturing are creating new opportunities which we constantly strive to bring to our customers and patients through collaboration with suppliers throughout the world who share our objectives.
              </p>
            </div>

            {/* CSR */}
            <div className="space-y-4 fade-in-up">
              <h3 className="text-xl font-bold text-brand-charcoal uppercase">
                CORPORATE SOCIAL RESPONSIBILITY
              </h3>
              <p className="text-sm text-brand-charcoal-muted leading-relaxed">
                Inventis Pharma, as an accountable corporate citizen, maintains and promotes high standards of corporate responsibility. As a supplier of medical equipment, we believe that it is imperative to carry a positive record as a conscientious distributor, acting with genuine care and with integrity in all our dealings.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
