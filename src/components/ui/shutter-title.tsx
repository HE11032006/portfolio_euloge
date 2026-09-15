"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type ShutterTitleProps = {
  text: string;
  className?: string;
};

export function ShutterTitle({ text, className }: ShutterTitleProps) {
  const reduceMotion = useReducedMotion();

  return (
    <span className={cn("inline-flex flex-wrap", className)} aria-label={text}>
      {text.split("").map((character, index) => (
        <span key={`${character}-${index}`} className="relative inline-block overflow-hidden" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={reduceMotion ? false : { opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: index * 0.04 + 0.3 }}
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
          {!reduceMotion && (
            <motion.span
              className="pointer-events-none absolute inset-0 inline-block text-current"
              initial={{ x: "-115%", opacity: 0 }}
              animate={{ x: "115%", opacity: [0, 0.95, 0] }}
              transition={{ duration: 0.7, delay: index * 0.04, ease: "easeInOut" }}
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)" }}
            >
              {character === " " ? "\u00A0" : character}
            </motion.span>
          )}
          {!reduceMotion && (
            <motion.span
              className="pointer-events-none absolute inset-0 inline-block text-current"
              initial={{ x: "115%", opacity: 0 }}
              animate={{ x: "-115%", opacity: [0, 0.95, 0] }}
              transition={{ duration: 0.7, delay: index * 0.04 + 0.1, ease: "easeInOut" }}
              style={{ clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)" }}
            >
              {character === " " ? "\u00A0" : character}
            </motion.span>
          )}
          {!reduceMotion && (
            <motion.span
              className="pointer-events-none absolute inset-0 inline-block text-current"
              initial={{ x: "-115%", opacity: 0 }}
              animate={{ x: "115%", opacity: [0, 0.95, 0] }}
              transition={{ duration: 0.7, delay: index * 0.04 + 0.2, ease: "easeInOut" }}
              style={{ clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)" }}
            >
              {character === " " ? "\u00A0" : character}
            </motion.span>
          )}
        </span>
      ))}
    </span>
  );
}
