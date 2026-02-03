import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Clock, MapPin } from 'lucide-react';
import { eventDetails } from '@/data/mockData';

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Silhouettes move closer as user scrolls
  const leftX = useTransform(scrollYProgress, [0, 1], ['-15%', '5%']);
  const rightX = useTransform(scrollYProgress, [0, 1], ['15%', '-5%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain-overlay"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Ambient glow */}
      <motion.div 
        style={{ opacity }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px]" 
      />

      {/* Silhouettes */}
      <motion.div
        style={{ x: leftX, opacity }}
        className="absolute left-1/2 top-1/2 -translate-y-1/2 z-0"
      >
        <div className="w-48 h-80 md:w-64 md:h-96 rounded-full bg-gradient-to-b from-primary/5 to-transparent backdrop-blur-sm border border-primary/10 -translate-x-full" />
      </motion.div>
      
      <motion.div
        style={{ x: rightX, opacity }}
        className="absolute left-1/2 top-1/2 -translate-y-1/2 z-0"
      >
        <div className="w-48 h-80 md:w-64 md:h-96 rounded-full bg-gradient-to-b from-primary/5 to-transparent backdrop-blur-sm border border-primary/10" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8"
        >
          <Heart className="w-4 h-4 text-primary" fill="currentColor" />
          <span className="text-primary text-sm font-medium tracking-wide">
            {eventDetails.venue}
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground leading-tight mb-6"
        >
          From <span className="text-primary neon-text italic">Strangers</span>
          <br />
          to <span className="text-blush">Soulmates</span>
          <br />
          <span className="text-4xl md:text-5xl lg:text-6xl text-muted-foreground">
            in 3 Hours
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display text-xl md:text-2xl text-muted-foreground italic mb-10"
        >
          {eventDetails.tagline}
        </motion.p>

        {/* Event details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-10"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-5 h-5 text-primary" />
            <span>{eventDetails.time}</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            <span>{eventDetails.venue}</span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <button
            onClick={scrollToBooking}
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-neon text-primary-foreground font-semibold text-lg rounded-full heartbeat overflow-hidden"
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-shimmer bg-[length:200%_100%] animate-shimmer opacity-30" />
            
            <span className="relative z-10">Reserve Your Sanctuary</span>
            <span className="relative z-10 font-display text-xl">
              {eventDetails.currency}{eventDetails.price.toLocaleString()}
            </span>
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ height: ['20%', '50%', '20%'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 bg-primary rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
