// components/ui/StickyGameCards.tsx
"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Heart, Wine, Palette } from "lucide-react";
import type { GameInfo } from "@/data/mockData";

interface StickyGameCardProps {
  game: GameInfo;
  index: number;
  total: number;
}

const iconMap = {
  cards: Heart,
  cup: Wine,
  sketch: Palette,
  dessert: Heart,
};

const cardColors = [
  "from-pink-600 to-rose-600", // main pink-magenta
  "from-rose-500 to-pink-700",
  "from-fuchsia-600 to-pink-600",
];

const StickyGameCard: FC<StickyGameCardProps> = ({ game, index, total }) => {
  const Icon = iconMap[game.icon];
  const gradient = cardColors[index % cardColors.length];

  return (
    <div className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-8 lg:px-12">
      <motion.div
        initial={{ opacity: 0.7, y: 60, scale: 0.9, rotate: -2 + index * 1.5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`relative w-full max-w-md md:max-w-lg lg:max-w-xl h-[65vh] md:h-[75vh] rounded-3xl overflow-hidden shadow-2xl border-2 border-pink-400/30 bg-gradient-to-br ${gradient}`}
      >
        {/* Subtle shine / bevel effect (optional, keeps it card-like) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

        {/* Main content – centered heart + texts */}
        <div className="relative h-full flex flex-col items-center justify-center px-8 md:px-12 text-center z-10">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1.1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7, type: "spring" }}
            className="mb-8 md:mb-10"
          >
            <Heart
              className="w-32 h-32 md:w-40 md:h-40 text-white/90 drop-shadow-xl"
              strokeWidth={1.2}
            />
          </motion.div>

          <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-lg mb-4 md:mb-6">
            {game.name}
          </h3>

          <p className="text-lg md:text-xl lg:text-2xl text-white/85 font-light max-w-md leading-relaxed drop-shadow-md">
            {game.tagline}
          </p>

          <p className="mt-8 md:mt-10 text-white/70 text-base md:text-lg font-medium">
            Tap to reveal
          </p>

          {/* Small badge */}
          <div className="absolute top-6 right-6 md:top-8 md:right-8">
            <span className="inline-flex px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium border border-white/30">
              Game {index + 1} / {total}
            </span>
          </div>
        </div>

        {/* Corner hearts like playing cards */}
        <div className="absolute top-4 left-4 text-white text-4xl md:text-5xl font-bold opacity-80">
          ♥
        </div>
        <div className="absolute bottom-4 right-4 text-white text-4xl md:text-5xl font-bold opacity-80 rotate-180">
          ♥
        </div>
      </motion.div>
    </div>
  );
};

interface StickyGameCardsProps {
  games: GameInfo[];
  title?: string;
}

export const StickyGameCards: FC<StickyGameCardsProps> = ({ games, title }) => {
  if (games.length === 0) return null;

  return (
    <div className="relative min-h-[200vh] md:min-h-[300vh] w-full">
      {" "}
      {/* adjust vh based on how many cards */}
      {title && (
        <div className="sticky top-8 z-20 text-center mb-10 md:mb-16">
          <h4 className="inline-block px-8 py-4 rounded-full bg-black/40 backdrop-blur-lg border border-pink-500/30 text-2xl md:text-3xl font-display text-white">
            Featured in {title}
          </h4>
        </div>
      )}
      {games.map((game, i) => (
        <StickyGameCard
          key={game.id}
          game={game}
          index={i}
          total={games.length}
        />
      ))}
    </div>
  );
};
