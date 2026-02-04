import { motion } from 'framer-motion';
import { HeroSection } from '@/components/valentines/HeroSection';
import { Timeline } from '@/components/valentines/Timeline';
import { TicketStub } from '@/components/valentines/TicketStub';
import { eventDetails } from '@/data/mockData';
import { Heart, Instagram, Mail } from 'lucide-react';
import { Timelineo } from '@/components/valentines/Timelineo';
import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';

const Valentines = () => {
  return (
    <div className="min-h-screen bg-background text-foreground valentine-scroll">
      {/* Floating nav */}
      <Header />

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
      {/* <Timelineo /> */}

      {/* Booking Section */}
      <div id="booking">
        <TicketStub />
      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Valentines;
