import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Snowflake, Heart, Flame, Check } from 'lucide-react';
import { GameDeck } from './GameDeck';
import type { TimelineHour } from '@/data/mockData';

interface TimelineNodeProps {
  hour: TimelineHour;
  isLast?: boolean;
}

const iconMap = {
  ice: Snowflake,
  heart: Heart,
  flame: Flame,
};

export const TimelineNode = ({ hour, isLast = false }: TimelineNodeProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = iconMap[hour.icon];

  return (
    <div ref={ref} className="relative flex gap-8 md:gap-16">
      {/* Timeline line and node */}
      <div className="flex flex-col items-center">
        {/* Node */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="relative z-10 w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center neon-glow"
        >
          <Icon className="w-7 h-7 text-primary" />
          
          {/* Hour indicator */}
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
            {hour.id}
          </div>
        </motion.div>
        
        {/* Connecting line */}
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-0.5 timeline-thread flex-1 min-h-[200px]"
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 pb-16"
      >
        {/* Phase badge */}
        <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-4">
          <span className="text-sm font-medium text-primary">{hour.phase}</span>
        </div>
        
        {/* Title */}
        <h3 className="font-display text-3xl md:text-4xl text-foreground mb-3">
          Hour {hour.id}: {hour.title}
        </h3>
        
        {/* Description */}
        <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-xl">
          {hour.description}
        </p>
        
        {/* Activities */}
        <div className="space-y-2 mb-8">
          {hour.activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <span className="text-foreground/80">{activity}</span>
            </motion.div>
          ))}
        </div>
        
        {/* Games */}
        {hour.games.length > 0 && (
          <GameDeck games={hour.games} title="Featured Games" />
        )}

        {/* Special content for final hour */}
        {hour.id === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 p-6 rounded-2xl glass border border-primary/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-neon flex items-center justify-center">
                <span className="text-2xl">📸</span>
              </div>
              <div>
                <h4 className="font-display text-xl text-foreground mb-1">
                  Polaroid Goodbye
                </h4>
                <p className="text-muted-foreground">
                  Capture your moment at the Love Affair Corner
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
