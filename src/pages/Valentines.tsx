import { motion } from 'framer-motion';
import { HeroSection } from '@/components/valentines/HeroSection';
import { Timeline } from '@/components/valentines/Timeline';
import { TicketStub } from '@/components/valentines/TicketStub';
import { eventDetails } from '@/data/mockData';
import { Heart, Instagram, Mail } from 'lucide-react';

const Valentines = () => {
  return (
    <div className="min-h-screen bg-background text-foreground valentine-scroll">
      {/* Floating nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary" fill="currentColor" />
            </div>
            <span className="font-display text-lg text-foreground hidden sm:block">
              Grano
            </span>
          </div>
          
          <div className="glass rounded-full px-6 py-2">
            <span className="text-sm text-muted-foreground">
              {eventDetails.date} • {eventDetails.time}
            </span>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <HeroSection />

      {/* Divider */}
      <div className="relative h-32 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rotate-45 border border-primary/50 bg-background" />
        </div>
      </div>

      {/* Timeline */}
      <Timeline />

      {/* Booking Section */}
      <div id="booking">
        <TicketStub />
      </div>

      {/* Footer */}
      <footer className="relative py-16 px-4 border-t border-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="font-display text-3xl text-foreground mb-2">
              {eventDetails.name}
            </h3>
            <p className="text-muted-foreground italic">
              {eventDetails.tagline}
            </p>
          </motion.div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <a
              href="#"
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Venue info */}
          <div className="text-sm text-muted-foreground">
            <p>{eventDetails.venue}</p>
            <p className="mt-1">© 2024 All rights reserved</p>
          </div>

          {/* Decorative hearts */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-4 right-8 text-primary/20"
          >
            <Heart className="w-8 h-8" fill="currentColor" />
          </motion.div>
          <motion.div
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-12 right-16 text-primary/10"
          >
            <Heart className="w-5 h-5" fill="currentColor" />
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Valentines;
