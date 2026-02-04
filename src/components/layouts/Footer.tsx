import { motion } from "framer-motion";
import {
  Instagram,
  Heart,
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import { eventDetails } from "@/data/mockData";

const Footer = () => {
  return (
    <footer className="relative py-3 px-4 border-t border-primary/10">
      <div className="max-w-4xl mx-auto text-center">

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h3 className="font-display text-3xl text-foreground mb-1">
            {eventDetails.brandName}
          </h3>
          <p className="text-muted-foreground italic text-sm">
            {eventDetails.tagline}
          </p>
        </motion.div>

        {/* Centered Info Block */}
        <div className="flex justify-center mb-5">
          <div className="grid md:grid-cols-2 gap-x-24 gap-y-6 text-sm text-muted-foreground text-left">

            {/* Contact */}
            <div className="space-y-4">
              <a href="tel:9676964871" className="flex items-center gap-3 hover:text-primary">
                <Phone className="w-4 h-4 text-primary" />
                +91 96769 64871
              </a>

              <a href="mailto:granohyd@gmail.com" className="flex items-center gap-3 hover:text-primary">
                <Mail className="w-4 h-4 text-primary" />
                granohyd@gmail.com
              </a>

              <a
                href="https://maps.app.goo.gl/HZ2FPUNYcSn7UPYj9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-primary"
              >
                <MapPin className="w-4 h-4 text-primary" />
                {eventDetails.venue}
              </a>
            </div>

            {/* Timings */}
            <div className="space-y-4">
              {/* <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-primary mt-1" />
                <div>
                  <div className="font-medium text-foreground/90">Event Date</div>
                  {eventDetails.date}
                </div>
              </div> */}

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-primary mt-1" />
                <div>
                  <div className="font-medium text-foreground/90">Event Slots</div>
                  {eventDetails.eventSlots[0]} <br />
                  {eventDetails.eventSlots[1]}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-primary mt-1" />
                <div>
                  <div className="font-medium text-foreground/90">
                    Cafe Timings (Mon–Sun)
                  </div>
                  {eventDetails.cafeTimings}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Instagram */}
        <div className="flex justify-center mb-8">
          <a
            href="https://www.instagram.com/granohyd/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        {/* Policies */}
        <div className="flex justify-center gap-8 text-sm text-muted-foreground mb-6">
          <Link to="/privacy" className="hover:text-primary">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-primary">
            Terms & Conditions
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-xs text-muted-foreground">
          © 2026 All rights reserved ·{" "}
          <a
            href="https://outrightcreators.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Powered by Outright Creators
          </a>
        </div>

        {/* Decorative hearts */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-4 right-8 text-primary/20"
        >
          <Heart className="w-8 h-8" fill="currentColor" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
          className="absolute bottom-12 right-16 text-primary/10"
        >
          <Heart className="w-5 h-5" fill="currentColor" />
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;
