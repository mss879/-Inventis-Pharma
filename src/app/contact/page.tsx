"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [subject, setSubject] = useState("");

  useEffect(() => {
    // Client-side search param reader (safe from hydration errors & SSR warnings)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const subjectParam = params.get("subject");
      if (subjectParam) {
        setSubject(subjectParam);
      }
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fade-in-up",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Thank you for your inquiry. The Inventis team will get in touch with you shortly.");
    (e.target as HTMLFormElement).reset();
    setSubject("");
  };

  return (
    <div ref={containerRef} className="bg-white text-brand-charcoal min-h-screen pb-24 selection:bg-brand-orange selection:text-white">
      
      {/* Page Header */}
      <section className="relative pt-32 pb-20 bg-brand-orange-light/35 border-b border-brand-orange/10 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-brand-orange/10 blur-[80px]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            Get In Touch
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-brand-charcoal sm:text-5xl uppercase">
            CONTACT US
          </h1>
          <p className="text-base text-brand-charcoal-muted max-w-xl mx-auto font-light leading-relaxed">
            Reach out to our Dehiwala office to discuss medical tenders, product distribution, or partnership inquiries.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Contact details */}
            <div className="lg:col-span-5 space-y-8 fade-in-up">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                  Corporate Offices
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-brand-charcoal uppercase">
                  INVENTIS HEADQUARTERS
                </h2>
              </div>
              
              <div className="space-y-6 text-sm text-brand-charcoal-muted leading-relaxed">
                
                {/* Address block */}
                <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 rounded-xl bg-brand-orange-light border border-brand-orange/10 flex items-center justify-center shrink-0">
                    <svg className="h-5 w-5 text-brand-orange" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-charcoal">Location Address</h4>
                    <p className="mt-1">Inventis Pharma (Pvt) Ltd,</p>
                    <p>No. 11/8, Kawdana Road,</p>
                    <p>Dehiwala, Sri Lanka.</p>
                  </div>
                </div>

                {/* Working hours block */}
                <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 rounded-xl bg-brand-orange-light border border-brand-orange/10 flex items-center justify-center shrink-0">
                    <svg className="h-5 w-5 text-brand-orange" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-charcoal">Office Hours</h4>
                    <p className="mt-1">Monday – Friday: 8:30 AM – 5:30 PM</p>
                    <p>Saturday & Sunday: Closed</p>
                  </div>
                </div>

                {/* Phone & email block */}
                <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 rounded-xl bg-brand-orange-light border border-brand-orange/10 flex items-center justify-center shrink-0">
                    <svg className="h-5 w-5 text-brand-orange" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-1.514 2.018a14.991 14.991 0 01-6.571-6.571l2.017-1.514c.362-.272.527-.734.417-1.173L7.963 3.07a1.25 1.25 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-charcoal">Direct Contact</h4>
                    <p className="mt-1">Phone: +94 11 273 4567</p>
                    <p>Email: info@inventispharma.lk</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Dynamic Form */}
            <div className="lg:col-span-7 bg-brand-gray-light border border-brand-orange/15 rounded-3xl p-8 sm:p-10 shadow-sm fade-in-up">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      placeholder="e.g. Priyantha Silva"
                      className="mt-2 w-full rounded-xl border border-brand-orange/10 bg-white px-4 py-3 text-sm text-brand-charcoal placeholder-brand-charcoal-muted/50 focus:border-brand-orange focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder="name@company.com"
                      className="mt-2 w-full rounded-xl border border-brand-orange/10 bg-white px-4 py-3 text-sm text-brand-charcoal placeholder-brand-charcoal-muted/50 focus:border-brand-orange focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal">
                    Inquiry Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Sourcing Dialysis Concentrates"
                    className="mt-2 w-full rounded-xl border border-brand-orange/10 bg-white px-4 py-3 text-sm text-brand-charcoal placeholder-brand-charcoal-muted/50 focus:border-brand-orange focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal">
                    Message Details
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    required
                    rows={5}
                    placeholder="Provide details about your requirements or partnership options..."
                    className="mt-2 w-full rounded-xl border border-brand-orange/10 bg-white px-4 py-3 text-sm text-brand-charcoal placeholder-brand-charcoal-muted/50 focus:border-brand-orange focus:outline-none transition-colors resize-none"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-brand-orange py-4 text-sm font-bold text-white shadow-md shadow-brand-orange/10 hover:bg-brand-orange-dark hover:shadow-brand-orange/20 transition-all duration-300"
                  >
                    Submit Inquiry Portal
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
