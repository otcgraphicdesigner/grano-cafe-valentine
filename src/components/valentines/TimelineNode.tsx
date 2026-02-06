// src/components/valentines/TimelineNode.tsx
"use client";

import { Snowflake, Heart, Flame, Check } from "lucide-react";
import type { TimelineHour } from "@/data/mockData";
import { GameDeck } from "./GameDeck";

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
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
      {/* BACKGROUND LAYER */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hour.bgImage})` }}
      >
        {/* Darkened overlay for better readability on mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background/80 md:to-background/50" />
      </div>

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center w-full py-12 md:py-0">
          {/* CONTENT COLUMN */}
          <div className="flex-1 text-center lg:text-left space-y-4 md:space-y-6 order-2 lg:order-1">
            <div className="flex flex-col items-center lg:items-start gap-2">
              <div className="relative w-14 h-14 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg">
                <Icon className="w-7 h-7 text-primary" />
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {hour.id}
                </span>
              </div>
              <span className="text-xs font-bold text-primary uppercase tracking-tighter pt-2">
                {hour.phase}
              </span>
            </div>

            <h3 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground">
              {hour.title}
            </h3>

            <p className="text-muted-foreground text-sm md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              {hour.description}
            </p>

            {/* Checklist - Hidden on very small screens to maintain layout */}
            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0">
              {hour.activities.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-foreground/80 text-sm md:text-base"
                >
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span className="truncate">{activity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* GAME DECK COLUMN */}
          <div className="w-full lg:w-auto flex justify-center items-center order-1 lg:order-2">
            {/* Scale down the deck on mobile to ensure it fits */}
            <div className="scale-[0.85] md:scale-100 transform-gpu">
              {hour.games.length > 0 && (
  <GameDeck
    title={hour.title}
    games={hour.games}
    stepIndex={hour.id - 1} // 👈 IMPORTANT
  />
)}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
