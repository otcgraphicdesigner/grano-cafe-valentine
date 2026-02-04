import { Heart, Clock, MapPin } from 'lucide-react';
import { eventDetails } from '@/data/mockData';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background video parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <video
          className="hidden md:block w-full h-full object-cover"
          src="/desk.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <video
          className="block md:hidden w-full h-full object-cover"
          src="/mob.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/65" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto text-white mt-10 sm:mt-10 md:mt-0">

        {/* Event badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/40 mb-8 backdrop-blur-sm">
          <Heart className="w-4 h-4 text-primary" fill="currentColor" />
          <span className="text-primary text-sm font-medium tracking-wide">
            {eventDetails.eventName}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-6">
          From <span className="text-primary italic">Strangers</span>
          <br />
          to <span className="text-blush">Soulmates</span>
          <br />
          <span className="text-4xl md:text-5xl lg:text-6xl text-white/80">
            in 3 Hours
          </span>
        </h1>

        {/* Tagline */}
        <p className="font-display text-xl md:text-2xl italic mb-10 text-white/80">
          {eventDetails.tagline}
        </p>

        {/* Slots + Map layout */}
        <div className="mb-10 text-white/80">

          {/* Mobile layout (stacked) */}
          <div className="flex flex-col items-center gap-4 md:hidden">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>{eventDetails.eventSlots[0]}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>{eventDetails.eventSlots[1]}</span>
            </div>
            <a
              href="https://maps.app.goo.gl/HZ2FPUNYcSn7UPYj9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <MapPin className="w-5 h-5 text-primary" />
              <span>{eventDetails.venue}</span>
            </a>
          </div>

          {/* Desktop layout */}
<div className="hidden md:flex justify-center">
  <div className="flex items-center gap-16">
    
    {/* Slots */}
    <div className="flex flex-col items-start gap-6">
      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary" />
        <span>{eventDetails.eventSlots[0]}</span>
      </div>

      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary" />
        <span>{eventDetails.eventSlots[1]}</span>
      </div>
    </div>

    {/* Map */}
    <a
      href="https://maps.app.goo.gl/HZ2FPUNYcSn7UPYj9"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 hover:text-primary transition-colors"
    >
      <MapPin className="w-5 h-5 text-primary" />
      <span>{eventDetails.venue}</span>
    </a>

  </div>
</div>

        </div>

        {/* CTA */}
        <button
          onClick={scrollToBooking}
          className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-neon text-primary-foreground font-semibold text-lg rounded-full"
        >
          <span>Reserve Your Table</span>
          <span className="font-display text-xl">
            {eventDetails.currency}{eventDetails.price.toLocaleString()}
          </span>
        </button>
      </div>
    </section>
  );
};
