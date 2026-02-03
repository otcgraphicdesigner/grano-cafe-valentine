import { motion } from "framer-motion";
import { TimelineNode } from "./TimelineNode";
import { timelineHours } from "@/data/mockData";

export const Timeline = () => {
  return (
    <section className="relative py-24 px-4 md:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      <div className="max-w-4xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium tracking-wider uppercase mb-6">
            The 3-Hour Journey
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Your <span className="text-primary neon-text">Love Affair</span>{" "}
            Awaits
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three hours of curated intimacy, from playful beginnings to
            heartfelt endings.
          </p>
        </motion.div>

        {/* Timeline nodes */}
        <div className="relative">
          {timelineHours.map((hour, index) => (
            <TimelineNode
              key={hour.id}
              hour={hour}
              isLast={index === timelineHours.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
