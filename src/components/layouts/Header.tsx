import { motion } from "framer-motion";
import { eventDetails } from "@/data/mockData";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-5 pb-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo with home link */}
        <Link to="/" className="flex items-center">
          <img
            src="/grano-logo.png"
            alt="Grano Cafe Logo"
            className="h-14 md:h-16 w-auto object-contain"
          />
        </Link>

        {/* Date pill */}
        <div className="glass rounded-full px-6 py-2 backdrop-blur-md">
          <span className="text-xs md:text-sm text-muted-foreground">
            {eventDetails.date} • {eventDetails.cafeTimings}
          </span>
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;
