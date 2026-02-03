import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wine, Palette, Heart } from 'lucide-react';
import type { GameInfo } from '@/data/mockData';

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

export const GameCard = ({ game, index }: GameCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = iconMap[game.icon];
  
  // Get a random question to show on the back
  const sampleQuestion = game.questions[Math.floor(Math.random() * game.questions.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateZ: -5 + index * 5 }}
      whileInView={{ opacity: 1, y: 0, rotateZ: -5 + index * 5 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flip-card w-[200px] h-[280px] cursor-pointer"
      style={{ transformOrigin: 'center bottom' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`flip-card-inner relative w-full h-full ${isFlipped ? 'flipped' : ''}`}>
        {/* Front of card */}
        <div className="flip-card-front absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/30 p-6 flex flex-col items-center justify-center text-center glass">
          {/* Card pattern overlay */}
          <div className="absolute inset-4 border border-primary/20 rounded-xl" />
          <div className="absolute top-4 left-4 text-primary text-lg font-display">♥</div>
          <div className="absolute bottom-4 right-4 text-primary text-lg font-display rotate-180">♥</div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 neon-glow">
              <Icon className="w-8 h-8 text-primary" />
            </div>
            <h4 className="font-display text-lg text-foreground leading-tight mb-2">
              {game.name}
            </h4>
            <p className="text-xs text-muted-foreground">
              Tap to reveal
            </p>
          </div>
        </div>

        {/* Back of card */}
        <div className="flip-card-back absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent p-6 flex flex-col items-center justify-center text-center">
          <div className="absolute inset-2 border-2 border-foreground/20 rounded-xl" />
          
          <div className="relative z-10">
            <p className="font-display text-xl text-foreground leading-relaxed italic mb-4">
              "{sampleQuestion.question}"
            </p>
            <div className="w-12 h-0.5 bg-foreground/40 mx-auto mb-4" />
            <p className="text-sm text-foreground/80">
              {game.tagline}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
