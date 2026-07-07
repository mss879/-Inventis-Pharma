"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "@/components/Preloader";
import { HOME_FAQS } from "@/lib/faqs";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomeClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroBtnRef = useRef<HTMLDivElement>(null);

  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const whyUsSectionRef = useRef<HTMLDivElement>(null);
  const processSectionRef = useRef<HTMLDivElement>(null);
  const faqSectionRef = useRef<HTMLDivElement>(null);

  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const [ready, setReady] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [videoPaused, setVideoPaused] = useState(false);

  const prefersReduced = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Honor prefers-reduced-motion for the hero background video (WCAG 2.2.2):
  // pause it so only the poster shows. The onPlay/onPause handlers keep the
  // toggle button's state in sync.
  useEffect(() => {
    if (prefersReduced()) {
      heroVideoRef.current?.pause();
    }
  }, []);

  const toggleHeroVideo = () => {
    const v = heroVideoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
    } else {
      v.pause();
    }
  };

  // Hero intro — only once the preloader has lifted.
  useEffect(() => {
    if (!ready) return;
    const reduce = prefersReduced();
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [heroTitleRef.current, heroSubtitleRef.current, heroBtnRef.current],
          { opacity: 1, y: 0, scale: 1 }
        );
        return;
      }
      gsap.fromTo(
        heroTitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.1 }
      );
      gsap.fromTo(
        heroSubtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.35 }
      );
      gsap.fromTo(
        heroBtnRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)", delay: 0.6 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, [ready]);

  // Scroll-reveals + services choreography.
  useEffect(() => {
    const reduce = prefersReduced();
    const ctx = gsap.context(() => {
      const sections = [
        aboutSectionRef,
        servicesSectionRef,
        whyUsSectionRef,
        processSectionRef,
        faqSectionRef,
      ];

      if (reduce) {
        sections.forEach((secRef) => {
          if (secRef.current) {
            gsap.set(secRef.current.querySelectorAll(".reveal-item"), {
              opacity: 1,
              y: 0,
            });
          }
        });
        gsap.set(".services-card-1, .services-card-2, .services-card-3", {
          opacity: 1,
          y: 0,
        });
        return;
      }

      sections.forEach((secRef) => {
        if (secRef.current) {
          gsap.fromTo(
            secRef.current.querySelectorAll(".reveal-item"),
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.15,
              scrollTrigger: { trigger: secRef.current, start: "top 80%" },
            }
          );
        }
      });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!servicesSectionRef.current) return;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: servicesSectionRef.current,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: true,
            anticipatePin: 1,
          },
        });
        gsap.set(".services-card-1, .services-card-2, .services-card-3", {
          y: 150,
          opacity: 0,
        });
        tl.to(".services-card-1", { y: 0, opacity: 1, duration: 1, ease: "none" })
          .to(".services-card-2", { y: 0, opacity: 1, duration: 1, ease: "none" })
          .to(".services-card-3", { y: 0, opacity: 1, duration: 1, ease: "none" })
          .to({}, { duration: 0.5 });
      });

      mm.add("(max-width: 1023px)", () => {
        if (!servicesSectionRef.current) return;
        gsap.fromTo(
          ".services-card-1, .services-card-2, .services-card-3",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            scrollTrigger: {
              trigger: servicesSectionRef.current,
              start: "top 80%",
            },
          }
        );
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: "Biomedical Devices",
      desc: "Importers and distributors of high-end clinical systems, dialysis apparatus, and diagnostic devices to leading Sri Lankan healthcare institutes.",
      icon: (
        <svg className="h-6 w-6 text-brand-orange" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h2.5l2-5 3 10 2-7 1.5 2h4M12 2a10 10 0 110 20 10 10 0 010-20z" />
        </svg>
      ),
    },
    {
      title: "Tender Market Player",
      desc: "Keen and highly qualified participant in government tenders, supplying high-quality consumables and apparatus to state hospitals and entities.",
      icon: (
        <svg className="h-6 w-6 text-brand-orange" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 13.5L5.25 21l3.75-1.5 3 3M15.75 13.5l3 7.5-3.75-1.5-3 3" />
        </svg>
      ),
    },
    {
      title: "Logistical Sourcing",
      desc: "Our robust supply chain network links top-tier global manufacturers with healthcare facilities across Sri Lanka in real-time.",
      icon: (
        <svg className="h-6 w-6 text-brand-orange" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20" />
        </svg>
      ),
    },
  ];

  return (
    <div ref={heroRef} className="bg-white text-brand-charcoal selection:bg-brand-orange selection:text-white">
      <Preloader onComplete={() => setReady(true)} />

      {/* 1. Hero Section */}
      <section className="relative h-svh min-h-[600px] flex items-end overflow-hidden pb-4 sm:pb-8">
        {/* Background Visual Wrapper */}
        <div className="absolute inset-0 z-0">
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="/hero_poster.webp"
            preload="auto"
            aria-hidden="true"
            onPlay={() => setVideoPaused(false)}
            onPause={() => setVideoPaused(true)}
            className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
          >
            <source src="/hero_video.webm" type="video/webm" />
            <source src="/hero_video.mp4" type="video/mp4" />
          </video>
          {/* Deep dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/65 to-transparent" />
        </div>

        {/* Background-video pause/play control (WCAG 2.2.2 Pause, Stop, Hide) */}
        <button
          onClick={toggleHeroVideo}
          aria-label={videoPaused ? "Play background video" : "Pause background video"}
          aria-pressed={videoPaused}
          className="absolute bottom-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange cursor-pointer"
        >
          {videoPaused ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
            </svg>
          )}
        </button>

        {/* Hero Content aligned to bottom-left */}
        <div className="relative z-10 mx-auto max-w-[1500px] w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 pb-20 sm:pb-24 text-left flex flex-col items-start">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-orange mb-4 bg-brand-orange/10 px-4 py-1.5 rounded-full border border-brand-orange/30 backdrop-blur-sm">
            Pioneering Medical Care in Sri Lanka
          </span>
          <h1
            ref={heroTitleRef}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl uppercase leading-tight max-w-3xl"
          >
            Smart Biomedical Solutions
          </h1>
          <p
            ref={heroSubtitleRef}
            className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-white/95 max-w-2xl font-light"
          >
            Home to smart medical devices, rehabilitative equipment, and high-performance surgical consumables.
          </p>
          <div ref={heroBtnRef} className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/products"
              className="rounded-full bg-brand-orange px-8 py-4 text-sm font-bold text-white text-center shadow-lg shadow-brand-orange/20 hover:bg-brand-orange-dark transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Explore Products
            </Link>
            <a
              href="#about"
              className="rounded-full bg-white/10 px-8 py-4 text-sm font-bold text-white text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* 2. About Us Section */}
      <section id="about" ref={aboutSectionRef} className="py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange reveal-item">
                Corporate Profile
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-brand-charcoal sm:text-4xl reveal-item">
                ABOUT US
              </h2>
              <p className="text-base text-brand-charcoal-muted leading-relaxed reveal-item">
                Inventis Pharma Pvt Ltd is a leading importer and distributor of a wide variety of Biomedical devices including dialysis consumables, medical/hospital consumables, rehabilitation aids and allied products, homecare medical apparatus and surgical equipment.
              </p>
              <p className="text-base text-brand-charcoal-muted leading-relaxed reveal-item">
                The company has been leading the way proactively and responsively foreseeing that the market is continuously restructured with new and innovative technologies in the field, striving persistently to be a trustworthy partner to all stakeholders.
              </p>
              <p className="text-base text-brand-charcoal-muted leading-relaxed reveal-item">
                We strive for professional excellence and are committed to reliability and flexibility in all aspects of our business. We have experienced marketing and sales teams which are supported by a robust logistics network to ensure optimal penetration of the market and easy accessibility to our products for our customers.
              </p>
              <div className="reveal-item pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-orange hover:text-brand-orange-dark transition-colors"
                >
                  Discover Our Mission &amp; Team <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-[380px] sm:h-[450px] rounded-2xl overflow-hidden shadow-xl shadow-brand-orange/5 border border-brand-orange/10 reveal-item">
              <Image
                src="/sri_lanka_distribution_v2.webp"
                alt="Inventis Pharma medical sourcing and logistics across Sri Lanka"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Section */}
      <section
        id="services"
        ref={servicesSectionRef}
        className="py-24 lg:py-0 lg:h-svh flex flex-col justify-center bg-brand-orange-light/20 border-y border-brand-orange/10 overflow-hidden relative"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange reveal-item block">
              What We Do
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-charcoal sm:text-4xl reveal-item">
              OUR MAIN SOLUTIONS
            </h2>
            <p className="text-base text-brand-charcoal-muted reveal-item">
              Empowering clinics, elder care centres, pharmacies, and surgical teams in Sri Lanka with certified products.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {services.map((svc, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-3xl p-8 border border-brand-orange/10 shadow-lg hover:shadow-xl hover:border-brand-orange/30 transition-all duration-300 lg:opacity-0 lg:translate-y-[150px] services-card-${idx + 1}`}
              >
                <div className="h-12 w-12 rounded-xl bg-brand-orange-light flex items-center justify-center mb-6">
                  {svc.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-charcoal mb-3">{svc.title}</h3>
                <p className="text-sm text-brand-charcoal-muted leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section id="why-choose-us" ref={whyUsSectionRef} className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5 relative h-[380px] sm:h-[450px] rounded-2xl overflow-hidden shadow-xl shadow-brand-orange/5 border border-brand-orange/10 order-2 lg:order-1 reveal-item">
              <Image
                src="/sterigen_product.webp"
                alt="Sterigen clinical-grade hand sanitizer — GMP quality assurance"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange reveal-item">
                Our Advantage
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-brand-charcoal sm:text-4xl reveal-item">
                WHY CHOOSE INVENTIS PHARMA?
              </h2>
              <p className="text-base text-brand-charcoal-muted leading-relaxed reveal-item">
                At Inventis, in-depth understanding of the industry and personalised service is our primary advantage. We maintain strong professional relations with the Regulatory authorities and valued customers to ensure that all requirements are met satisfactorily.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 reveal-item pt-4">
                <div className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-[10px] font-bold" aria-hidden="true">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-charcoal text-sm">Regulatory Networks</h3>
                    <p className="text-xs text-brand-charcoal-muted mt-1">Strong professional ties with local regulatory bodies and NMRA.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-[10px] font-bold" aria-hidden="true">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-charcoal text-sm">Tender Market Leader</h3>
                    <p className="text-xs text-brand-charcoal-muted mt-1">Robust logistics enabling seamless entry and fulfillment of state tenders.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-[10px] font-bold" aria-hidden="true">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-charcoal text-sm">Diverse Client Base</h3>
                    <p className="text-xs text-brand-charcoal-muted mt-1">Partnerships with public &amp; private hospitals, pharmacies, NGOs, and elder homes.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-[10px] font-bold" aria-hidden="true">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-charcoal text-sm">Result-Driven Team</h3>
                    <p className="text-xs text-brand-charcoal-muted mt-1">A unified and experienced workforce dedicated to quality assurance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Process Section */}
      <section id="our-process" ref={processSectionRef} className="py-24 bg-brand-gray-light border-t border-brand-orange/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange reveal-item">
              Workflow
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-charcoal sm:text-4xl reveal-item">
              OUR STRATEGIC PROCESS
            </h2>
            <p className="text-base text-brand-charcoal-muted reveal-item">
              How we source, license, and deliver global biomedical technologies to Sri Lanka&apos;s healthcare hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Global Collaboration", desc: "Partnering with certified global manufacturers who share our quality objectives." },
              { num: "02", title: "Regulatory Clearance", desc: "Securing certifications, NMRA compliance, and ITI test clearances for active supply." },
              { num: "03", title: "Logistical Ingestion", desc: "Storing devices safely in climate-controlled hubs under strict quality inspection protocols." },
              { num: "04", title: "Wide Penetration", desc: "Distributing apparatus securely to pharmacies, hospitals, clinics, and elder facilities." },
            ].map((step) => (
              <div key={step.num} className="bg-white rounded-2xl p-6 border border-brand-orange/5 shadow-sm text-center relative reveal-item">
                <div className="h-10 w-10 rounded-full bg-brand-orange text-white font-bold flex items-center justify-center mx-auto mb-4 text-sm">
                  {step.num}
                </div>
                <h3 className="font-bold text-brand-charcoal mb-2">{step.title}</h3>
                <p className="text-xs text-brand-charcoal-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section id="faq" ref={faqSectionRef} className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange reveal-item">
              Support Center
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-charcoal sm:text-4xl reveal-item">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-base text-brand-charcoal-muted reveal-item">
              Common questions about our medical equipment sourcing, regulatory standards, and logistics.
            </p>
          </div>

          <div className="space-y-4 reveal-item">
            {HOME_FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className="border border-brand-orange/15 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    className="w-full flex items-center justify-between gap-4 p-6 bg-brand-gray-light hover:bg-brand-orange-light/10 text-left font-bold text-brand-charcoal text-base transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span
                      aria-hidden="true"
                      className={`transition-transform duration-300 font-normal text-brand-orange text-lg shrink-0 ${open ? "rotate-180" : ""}`}
                    >
                      ▼
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    className={`p-6 bg-white border-t border-brand-orange/10 text-sm text-brand-charcoal-muted leading-relaxed ${open ? "" : "hidden"}`}
                  >
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
