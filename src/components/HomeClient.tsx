"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  useEffect(() => {
    // Initial hero animations
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroTitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
      );
      
      gsap.fromTo(
        heroSubtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.5 }
      );
      
      gsap.fromTo(
        heroBtnRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)", delay: 0.8 }
      );

      // Simple intersection observer or manual stagger setup for scroll reveals
      const sections = [aboutSectionRef, servicesSectionRef, whyUsSectionRef, processSectionRef, faqSectionRef];
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
              scrollTrigger: {
                trigger: secRef.current,
                start: "top 80%",
              },
            }
          );
        }
      });

      // Responsive animation for services scroll stagger and pinning
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!servicesSectionRef.current) return;

        // Pin the entire section and slide cards up one by one in a row
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: servicesSectionRef.current,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: true,
            anticipatePin: 1,
          }
        });

        // Set initial state (offset cards off the bottom of the viewport area)
        gsap.set(".services-card-1, .services-card-2, .services-card-3", { y: 150, opacity: 0 });

        // Sequence cards moving up one at a time to form the row
        tl.to(".services-card-1", { y: 0, opacity: 1, duration: 1, ease: "none" })
          .to(".services-card-2", { y: 0, opacity: 1, duration: 1, ease: "none" })
          .to(".services-card-3", { y: 0, opacity: 1, duration: 1, ease: "none" })
          .to({}, { duration: 0.5 }); // Buffer to hold final state visible on screen
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
            }
          }
        );
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Simple Accordion state logic
  const toggleFaq = (index: number) => {
    const panels = document.querySelectorAll(".faq-panel");
    const icons = document.querySelectorAll(".faq-icon");
    panels.forEach((panel, i) => {
      if (i === index) {
        panel.classList.toggle("hidden");
        icons[i].classList.toggle("rotate-180");
      } else {
        panel.classList.add("hidden");
        icons[i].classList.remove("rotate-180");
      }
    });
  };

  const services = [
    {
      title: "Biomedical Devices",
      desc: "Importers and distributors of high-end clinical systems, dialysis apparatus, and diagnostic devices to leading Sri Lankan healthcare institutes.",
      icon: (
        <svg className="h-6 w-6 text-brand-orange" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h2.5l2-5 3 10 2-7 1.5 2h4M12 2a10 10 0 110 20 10 10 0 010-20z" />
        </svg>
      )
    },
    {
      title: "Tender Market Player",
      desc: "Keen and highly qualified participant in government tenders, supplying high-quality consumables and apparatus to state hospitals and entities.",
      icon: (
        <svg className="h-6 w-6 text-brand-orange" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 13.5L5.25 21l3.75-1.5 3 3M15.75 13.5l3 7.5-3.75-1.5-3 3" />
        </svg>
      )
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
      )
    }
  ];

  return (
    <div ref={heroRef} className="bg-white text-brand-charcoal selection:bg-brand-orange selection:text-white">
      {/* 1. Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden pb-4 sm:pb-8">
        {/* Background Visual Wrapper */}
        <div className="absolute inset-0 z-0">
          {/* Loop Background Video container */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
          >
            <source src="/hero_video.mp4" type="video/mp4" />
          </video>
          {/* Deep dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/65 to-transparent" />
        </div>

        {/* Hero Content aligned to bottom-left (shifted right on desktop) */}
        <div className="relative z-10 mx-auto max-w-[1500px] w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 pb-20 sm:pb-24 text-left flex flex-col items-start">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-orange mb-4 bg-brand-orange/10 px-4 py-1.5 rounded-full border border-brand-orange/30 backdrop-blur-sm animate-pulse">
            Pioneering Medical Care in Sri Lanka
          </span>
          <h1
            ref={heroTitleRef}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl uppercase leading-tight max-w-3xl"
          >
            SMART BIOMEDICAL SOLUTIONS
          </h1>
          <p
            ref={heroSubtitleRef}
            className="mt-6 text-lg leading-8 text-white/95 max-w-2xl font-light"
          >
            Home to smart medical devices, rehabilitative equipment, and high-performance surgical consumables.
          </p>
          <div ref={heroBtnRef} className="mt-10 flex gap-4">
            <Link
              href="/products"
              className="rounded-full bg-brand-orange px-8 py-4 text-sm font-bold text-white shadow-lg shadow-brand-orange/20 hover:bg-brand-orange-dark transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Explore Products
            </Link>
            <a
              href="#about"
              className="rounded-full bg-white/10 px-8 py-4 text-sm font-bold text-white border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              LEARN MORE
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
                  Discover Our Mission & Team <span>→</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-[380px] sm:h-[450px] rounded-2xl overflow-hidden shadow-xl shadow-brand-orange/5 border border-brand-orange/10 reveal-item">
              <Image
                src="/sri_lanka_distribution_v2.png"
                alt="Inventis Pharma Medical Sourcing & Logistics"
                fill
                className="object-cover"
                priority
              />
            </div>
            
          </div>
        </div>
      </section>

      {/* 3. Services Section */}
      <section
        id="services"
        ref={servicesSectionRef}
        className="py-24 lg:py-0 lg:h-screen flex flex-col justify-center bg-brand-orange-light/20 border-y border-brand-orange/10 overflow-hidden relative"
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
                src="/sterigen_product.png"
                alt="Sterigen Sanitizer - GMP quality assurance"
                fill
                className="object-cover"
                priority
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
                    <span className="text-white text-[10px] font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-charcoal text-sm">Regulatory Networks</h4>
                    <p className="text-xs text-brand-charcoal-muted mt-1">Strong professional ties with local regulatory bodies and NMRA.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-[10px] font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-charcoal text-sm">Tender Market Leader</h4>
                    <p className="text-xs text-brand-charcoal-muted mt-1">Robust logistics enabling seamless entry and fulfillment of state tenders.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-[10px] font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-charcoal text-sm">Diverse Client Base</h4>
                    <p className="text-xs text-brand-charcoal-muted mt-1">Partnerships with public & private hospitals, pharmacies, NGOs, and elder homes.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-[10px] font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-charcoal text-sm">Result-Driven Team</h4>
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
              How we source, license, and deliver global biomedical technologies to Sri Lanka's healthcare hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-brand-orange/5 shadow-sm text-center relative reveal-item">
              <div className="h-10 w-10 rounded-full bg-brand-orange text-white font-bold flex items-center justify-center mx-auto mb-4 text-sm">
                01
              </div>
              <h3 className="font-bold text-brand-charcoal mb-2">Global Collaboration</h3>
              <p className="text-xs text-brand-charcoal-muted leading-relaxed">
                Partnering with certified global manufacturers who share our quality objectives.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-brand-orange/5 shadow-sm text-center relative reveal-item">
              <div className="h-10 w-10 rounded-full bg-brand-orange text-white font-bold flex items-center justify-center mx-auto mb-4 text-sm">
                02
              </div>
              <h3 className="font-bold text-brand-charcoal mb-2">Regulatory Clearance</h3>
              <p className="text-xs text-brand-charcoal-muted leading-relaxed">
                Securing certifications, NMRA compliance, and ITI test clearances for active supply.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-brand-orange/5 shadow-sm text-center relative reveal-item">
              <div className="h-10 w-10 rounded-full bg-brand-orange text-white font-bold flex items-center justify-center mx-auto mb-4 text-sm">
                03
              </div>
              <h3 className="font-bold text-brand-charcoal mb-2">Logistical Ingestion</h3>
              <p className="text-xs text-brand-charcoal-muted leading-relaxed">
                Storing devices safely in climate-controlled hubs under strict quality inspection protocols.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-brand-orange/5 shadow-sm text-center relative reveal-item">
              <div className="h-10 w-10 rounded-full bg-brand-orange text-white font-bold flex items-center justify-center mx-auto mb-4 text-sm">
                04
              </div>
              <h3 className="font-bold text-brand-charcoal mb-2">Wide Penetration</h3>
              <p className="text-xs text-brand-charcoal-muted leading-relaxed">
                Distributing apparatus securely to pharmacies, hospitals, clinics, and elder facilities.
              </p>
            </div>
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
            
            {/* FAQ 1 */}
            <div className="border border-brand-orange/15 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleFaq(0)}
                className="w-full flex items-center justify-between p-6 bg-brand-gray-light hover:bg-brand-orange-light/10 text-left font-bold text-brand-charcoal text-base transition-colors"
              >
                <span>What biomedical products does Inventis Pharma supply?</span>
                <span className="faq-icon transition-transform duration-300 font-normal text-brand-orange text-lg">▼</span>
              </button>
              <div className="faq-panel p-6 bg-white border-t border-brand-orange/10 text-sm text-brand-charcoal-muted leading-relaxed hidden">
                We supply a diverse range of medical devices including dialysis consumables, rehabilitation aids, surgery kits, home care medical apparatus, and SLS/WHO compliant sanitizers like Sterigen.
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="border border-brand-orange/15 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleFaq(1)}
                className="w-full flex items-center justify-between p-6 bg-brand-gray-light hover:bg-brand-orange-light/10 text-left font-bold text-brand-charcoal text-base transition-colors"
              >
                <span>Are your products compliant with Sri Lankan healthcare regulations?</span>
                <span className="faq-icon transition-transform duration-300 font-normal text-brand-orange text-lg">▼</span>
              </button>
              <div className="faq-panel p-6 bg-white border-t border-brand-orange/10 text-sm text-brand-charcoal-muted leading-relaxed hidden">
                Yes, absolutely. We maintain rigorous standards. All our products are ITI certified, compliant with relevant regulatory authorities like NMRA, and manufactured in GMP certified factories.
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="border border-brand-orange/15 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleFaq(2)}
                className="w-full flex items-center justify-between p-6 bg-brand-gray-light hover:bg-brand-orange-light/10 text-left font-bold text-brand-charcoal text-base transition-colors"
              >
                <span>Does Inventis Pharma participate in Sri Lankan medical tenders?</span>
                <span className="faq-icon transition-transform duration-300 font-normal text-brand-orange text-lg">▼</span>
              </button>
              <div className="faq-panel p-6 bg-white border-t border-brand-orange/10 text-sm text-brand-charcoal-muted leading-relaxed hidden">
                Yes, Inventis Pharma is an active player in the government tender market of Sri Lanka, supplying consumables and systems to public hospitals and local clinics.
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="border border-brand-orange/15 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleFaq(3)}
                className="w-full flex items-center justify-between p-6 bg-brand-gray-light hover:bg-brand-orange-light/10 text-left font-bold text-brand-charcoal text-base transition-colors"
              >
                <span>How can international suppliers partner with Inventis Pharma?</span>
                <span className="faq-icon transition-transform duration-300 font-normal text-brand-orange text-lg">▼</span>
              </button>
              <div className="faq-panel p-6 bg-white border-t border-brand-orange/10 text-sm text-brand-charcoal-muted leading-relaxed hidden">
                We are always open to collaborations with global suppliers who share our quality assurance objectives. Please submit an inquiry through our Contact page or reach out to our office in Dehiwala.
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
