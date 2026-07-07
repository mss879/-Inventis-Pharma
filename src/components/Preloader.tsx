"use client";

import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import gsap from "gsap";

/**
 * Full-screen intro shown on the first homepage visit of a session.
 *
 * While it is on screen it pre-downloads the hero poster and warms the hero
 * video so the hero section paints instantly the moment the overlay lifts.
 * Reveals when the hero assets are ready (and a minimum time has elapsed) or
 * after a hard timeout, whichever comes first — it never blocks indefinitely.
 */
export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = sessionStorage.getItem("inventis-intro") === "seen";

    // Warm the hero assets on every visit (cheap, benefits the hero even when
    // we skip the intro on repeat visits).
    const warmPoster = new Promise<void>((resolve) => {
      const img = new window.Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = "/hero_poster.webp";
    });
    const warmVideo = new Promise<void>((resolve) => {
      const v = document.createElement("video");
      v.muted = true;
      v.preload = "auto";
      const done = () => resolve();
      v.oncanplay = done;
      v.onloadeddata = done;
      v.onerror = done;
      v.src = "/hero_video.webm";
      window.setTimeout(done, 2200); // don't wait on the full video
    });

    // Repeat visit this session: skip the intro entirely — hide immediately,
    // never lock scroll, never paint the slide-out.
    if (alreadySeen) {
      const hideNow = () => {
        setHidden(true);
        onComplete();
      };
      hideNow();
      return;
    }

    // First visit: lock scroll while the intro is on screen.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      sessionStorage.setItem("inventis-intro", "seen");

      const cleanup = () => {
        document.body.style.overflow = prevOverflow;
        setHidden(true);
        onComplete();
      };

      if (reduce || !rootRef.current) {
        cleanup();
      } else {
        gsap.to(rootRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: cleanup,
        });
      }
    };

    let barTween: gsap.core.Tween | undefined;
    if (!reduce && barRef.current) {
      barTween = gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        { scaleX: 0.9, duration: 2.2, ease: "power1.out" }
      );
    }

    const delay = (ms: number) =>
      new Promise<void>((resolve) => window.setTimeout(resolve, ms));
    const minTime = delay(reduce ? 300 : 900);
    const maxTime = delay(3000);

    Promise.race([
      Promise.all([Promise.all([warmPoster, warmVideo]), minTime]),
      maxTime,
    ]).then(() => {
      if (barTween && barRef.current) {
        gsap.to(barRef.current, { scaleX: 1, duration: 0.25, onComplete: finish });
      } else {
        finish();
      }
    });

    return () => {
      document.body.style.overflow = prevOverflow;
      barTween?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-label="Loading Inventis Pharma"
      className="preloader-overlay fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 bg-brand-charcoal"
    >
      {/* Without JS the overlay can't be dismissed, so hide it entirely. */}
      <noscript>
        <style>{`.preloader-overlay{display:none !important}`}</style>
      </noscript>

      <div className="flex flex-col items-center gap-5">
        <div className="h-20 w-20 rounded-2xl bg-white p-3 flex items-center justify-center shadow-lg shadow-brand-orange/20 animate-pulse">
          <NextImage
            src="/inventis_logo.webp"
            alt="Inventis Pharma"
            width={56}
            height={56}
            className="object-contain"
            preload
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold tracking-tight text-white">
            Inventis Pharma
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-white/50">
            Pvt Ltd
          </span>
        </div>
      </div>

      <div className="h-[3px] w-48 rounded-full bg-white/15 overflow-hidden">
        <div
          ref={barRef}
          className="h-full w-full origin-left rounded-full bg-brand-orange"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
