// src/components/valentines/TimelineNode.tsx
"use client";

import { Snowflake, Heart, Flame, Check } from "lucide-react";
import type { TimelineHour } from "@/data/mockData";
import { GameDeck } from "./GameDeck";
import { motion } from "framer-motion";

interface TimelineNodeProps {
  hour: TimelineHour;
}

const iconMap = {
  ice: Snowflake,
  heart: Heart,
  flame: Flame,
} as const;

export const TimelineNode = ({ hour }: TimelineNodeProps) => {
  const Icon = iconMap[hour.icon];

  return (
    <div className="relative flex min-h-[100svh] w-full items-center transform-gpu">
      {/* Background Image with Overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hour.bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/70 to-background/60 md:backdrop-blur-sm" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-0">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
          {/* TIMELINE ICON */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 md:pt-2"
          >
            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center neon-glow shrink-0">
              <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
              <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary text-primary-foreground text-xs md:text-sm font-bold flex items-center justify-center">
                {hour.id}
              </span>
            </div>

            {/* Mobile Phase Badge */}
            <div className="inline-block md:hidden px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30">
              <span className="text-xs font-medium text-primary">
                {hour.phase}
              </span>
            </div>
          </motion.div>

          {/* CONTENT */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            {/* LEFT COLUMN */}
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            >
              {/* Desktop Phase Badge */}
              <div className="hidden md:inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-4">
                <span className="text-sm font-medium text-primary">
                  {hour.phase}
                </span>
              </div>

              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl mb-3 text-foreground">
                Hour {hour.id}: {hour.title}
              </h3>

              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 max-w-xl">
                {hour.description}
              </p>

              {/* Activities List */}
              <div className="space-y-3 mb-6 md:mb-8">
                {hour.activities.map((activity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.12 + i * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </span>
                    <span className="text-foreground/80 text-sm md:text-base">
                      {activity}
                    </span>
                  </motion.div>
                ))}
              </div>

              {hour.games.length > 0 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35, delay: 0.25 }}
                  className="inline-block text-xs tracking-widest text-primary uppercase font-semibold"
                >
                  Featured Games
                </motion.span>
              )}
            </motion.div>

            {/* RIGHT COLUMN - Game Deck */}
            {hour.games.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
                className="flex justify-center lg:justify-end items-start pt-2 lg:pt-0"
              >
                <GameDeck title={hour.title} games={hour.games} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
