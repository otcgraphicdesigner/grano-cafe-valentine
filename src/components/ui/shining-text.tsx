"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShiningTextProps {
  text: string;
  className?: string;
}

export function ShiningText({ text, className }: ShiningTextProps) {
  return (
    <span className={cn("relative inline-block align-baseline", className)}>
      {/* Base text */}
      <span className="relative z-10 text-primary">{text}</span>

      {/* Shine layer (CLIPPED to text) */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 select-none"
        style={{
          backgroundImage:
            "linear-gradient(80deg, transparent 0%, rgba(255,255,255,0) 42%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 58%, transparent 100%)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
          mixBlendMode: "screen",
        }}
        initial={{ backgroundPositionX: "200%" }}
        animate={{ backgroundPositionX: "0%" }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
      >
        {text}
      </motion.span>

      {/* Soft glow (also clipped to text) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 select-none"
        style={{
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
          backgroundImage:
            "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.25), transparent 55%)",
          filter: "blur(8px)",
          opacity: 0.55,
        }}
      >
        {text}
      </span>
    </span>
  );
}
