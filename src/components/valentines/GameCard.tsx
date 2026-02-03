import { useState } from "react";
import { motion } from "framer-motion";
import { Wine, Palette, Heart } from "lucide-react";
import type { GameInfo } from "@/data/mockData";

interface GameCardProps {
  game: GameInfo;
  index: number;
}

const iconMap = {
  cards: Heart,
  cup: Wine,
  sketch: Palette,
  dessert: Heart,
};

// You can later move these to a constants file or theme
const subtleBackgrounds = [
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800", // soft pink hearts bokeh
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800", // romantic warm tones
  // "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800", // gentle rose petals vibe
  // Optional: add 1–2 more subtle ones
];

export const GameCard = ({ game, index }: GameCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = iconMap[game.icon];

  // Get a random question to show on the back
  const sampleQuestion =
    game.questions[Math.floor(Math.random() * game.questions.length)];

  // Optional: you can make background deterministic per game or per index
  const bgImage = subtleBackgrounds[index % subtleBackgrounds.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateZ: -5 + index * 5 }}
      whileInView={{ opacity: 1, y: 0, rotateZ: -5 + index * 5 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flip-card w-[200px] h-[280px] cursor-pointer"
      style={{ transformOrigin: "center bottom" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`flip-card-inner relative w-full h-full ${isFlipped ? "flipped" : ""}`}
      >
        {/* Front of card – now with background image */}
        <div
          className="flip-card-front absolute inset-0 rounded-2xl border border-primary/30 p-6 flex flex-col items-center justify-center text-center glass overflow-hidden"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Semi-transparent overlay to keep text readable */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/50 to-accent/40" />

          {/* Card pattern overlay – kept for style */}
          <div className="absolute inset-4 border border-primary/20 rounded-xl" />
          <div className="absolute top-4 left-4 text-primary text-lg font-display opacity-80">
            ♥
          </div>
          <div className="absolute bottom-4 right-4 text-primary text-lg font-display rotate-180 opacity-80">
            ♥
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-background/40 backdrop-blur-sm flex items-center justify-center mb-4 neon-glow border border-primary/30">
              <Icon className="w-8 h-8 text-primary" />
            </div>
            <h4 className="font-display text-lg text-white leading-tight mb-2 drop-shadow-md">
              {game.name}
            </h4>
            <p className="text-xs text-white/80 drop-shadow-sm">
              Tap to reveal
            </p>
          </div>
        </div>

        {/* Back of card – remains unchanged */}
        <div className="flip-card-back absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent p-6 flex flex-col items-center justify-center text-center">
          <div className="absolute inset-2 border-2 border-foreground/20 rounded-xl" />

          <div className="relative z-10">
            <p className="font-display text-xl text-foreground leading-relaxed italic mb-4">
              "{sampleQuestion.question}"
            </p>
            <div className="w-12 h-0.5 bg-foreground/40 mx-auto mb-4" />
            <p className="text-sm text-foreground/80">{game.tagline}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
