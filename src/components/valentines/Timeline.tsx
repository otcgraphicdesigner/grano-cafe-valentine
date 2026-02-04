// src/components/valentines/Timeline.tsx
"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { TimelineNode } from "./TimelineNode";
import { timelineHours } from "@/data/mockData";
import { ShiningText } from "../ui/shining-text";
gsap.registerPlugin(ScrollTrigger);

export const Timeline = () => {
  const scrollAreaRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  const hours = useMemo(() => timelineHours, []);
  const count = hours.length;

  useLayoutEffect(() => {
    if (!scrollAreaRef.current || !pinRef.current) return;

    // Helps with mobile resize weirdness (iOS address bar etc.)
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(
        pinRef.current!.querySelectorAll(".timeline-card"),
      );

      // initial
      gsap.set(cards, { autoAlpha: 0, y: 36 });
      gsap.set(cards[0], { autoAlpha: 1, y: 0 });

      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      // One timeline, scrubbed
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollAreaRef.current,
          start: "top top",
          end: () => `+=${(count - 1) * window.innerHeight}`,
          pin: pinRef.current,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          // Mobile stability (esp iOS Safari)
          pinType: isMobile ? "transform" : "fixed",
        },
      });

      for (let i = 0; i < cards.length - 1; i++) {
        const current = cards[i];
        const next = cards[i + 1];

        tl.to(
          current,
          { autoAlpha: 0, y: -36, duration: 0.35, ease: "power2.out" },
          i,
        ).to(
          next,
          { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
          i,
        );
      }

      // Refresh after images load (important for background images/layout)
      requestAnimationFrame(() => ScrollTrigger.refresh());

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("orientationchange", onResize);
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("orientationchange", onResize);
        window.removeEventListener("resize", onResize);
      };
    }, scrollAreaRef);

    return () => ctx.revert();
  }, [count]);

  return (
    <section className="relative overflow-hidden bg-background">
      {/* ================= HEADER ================= */}
      <div className="relative z-10 py-6  px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 max-w-4xl mx-auto"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium tracking-wider uppercase mb-4 md:mb-6">
            The Journey
          </span>

          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground mb-3 md:mb-4">
            Your <ShiningText text="Love Affair" /> Awaits
          </h2>

          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            A curated flow of intimacy — from playful beginnings to heartfelt
            endings.
          </p>
        </motion.div>
      </div>

      {/* ================= PINNED SCROLL (MOBILE + DESKTOP) ================= */}
      <section
        ref={scrollAreaRef}
        className="relative"
        style={{ height: `calc(${count} * 100svh)` }}
      >
        <div
          ref={pinRef}
          className="sticky top-0 h-[100svh] overflow-hidden max-w-7xl mx-auto px-4 md:px-8"
        >
          {hours.map((hour, i) => (
            <div
              key={hour.id}
              className="timeline-card absolute inset-0"
              style={{ zIndex: count - i }}
            >
              <TimelineNode hour={hour} />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};
