import { motion } from 'framer-motion';
import { GameCard } from './GameCard';
import type { GameInfo } from '@/data/mockData';

interface GameDeckProps {
  games: GameInfo[];
  title: string;
}

export const GameDeck = ({ games, title }: GameDeckProps) => {
  if (games.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-8"
    >
      <h4 className="text-sm uppercase tracking-widest text-primary mb-6 font-medium">
        {title}
      </h4>
      
      <div className="flex justify-center items-end gap-[-20px] relative">
        {/* Deck stack effect */}
        <div className="relative flex">
          {games.map((game, index) => (
            <div
              key={game.id}
              className="relative"
              style={{
                marginLeft: index > 0 ? '-60px' : '0',
                zIndex: index,
              }}
            >
              <GameCard game={game} index={index} />
            </div>
          ))}
        </div>
      </div>
      
      <p className="text-center text-muted-foreground text-sm mt-6 italic">
        Tap a card to reveal a sample question
      </p>
    </motion.div>
  );
};
