"use client";

import { useEffect, useRef } from "react";
import { Snowflake, Heart, Flame, Check } from "lucide-react";
import type { TimelineHour } from "@/data/mockData";
import { GameDeck } from "./GameDeck";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TimelineNodeProps {
  hour: TimelineHour;
}

const iconMap = {
  ice: Snowflake,
  heart: Heart,
  flame: Flame,
};

export const TimelineNode = ({ hour }: TimelineNodeProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const Icon = iconMap[hour.icon];

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 120, opacity: 0 },
        {
          y: -120,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=100%",
            scrub: true,
            pin: true,
            pinSpacing: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div ref={contentRef} className="flex gap-6 md:gap-12 py-24">
        {/* TIMELINE */}
        <div className="flex flex-col items-center">
          <div className="relative z-10 w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center neon-glow">
            <Icon className="w-7 h-7 text-primary" />
            <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
              {hour.id}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* LEFT */}
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-4">
                <span className="text-sm font-medium text-primary">
                  {hour.phase}
                </span>
              </div>

              <h3 className="font-display text-3xl md:text-4xl mb-3">
                Hour {hour.id}: {hour.title}
              </h3>

              <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-xl">
                {hour.description}
              </p>

              <div className="space-y-3 mb-8">
                {hour.activities.map((activity, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </span>
                    <span className="text-foreground/80">{activity}</span>
                  </div>
                ))}
              </div>

              {hour.games.length > 0 && (
                <span className="text-xs tracking-widest text-primary uppercase">
                  Featured Games
                </span>
              )}
            </div>

            {/* RIGHT */}
            {hour.games.length > 0 && (
              <div className="flex justify-center md:justify-end">
                <GameDeck title={hour.title} games={hour.games} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
