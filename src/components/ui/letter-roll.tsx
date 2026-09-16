"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type LetterRollProps = {
  label: string;
};

export function LetterRoll({ label }: LetterRollProps) {
  const reduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  const staticText = !mounted || reduceMotion;

  return (
    <span
      className="letter-roll"
      aria-label={label}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {label.split("").map((character, index) => (
        <span className="letter-roll__character" key={`${character}-${index}`} aria-hidden="true">
          {character === " " ? "\u00A0" : staticText ? (
            <span className="letter-roll__track letter-roll__track--static">{character}</span>
          ) : (
            <motion.span
              className="letter-roll__track"
              animate={{ y: isHovered ? "-50%" : 0 }}
              transition={{ duration: 0.34, delay: isHovered ? index * 0.028 : 0, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>{character}</span>
              <span>{character}</span>
            </motion.span>
          )}
        </span>
      ))}
    </span>
  );
}
