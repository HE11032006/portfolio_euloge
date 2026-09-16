"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/components/locale-provider";

const SESSION_KEY = "euloge-portfolio-loader-seen";
const LOADER_DURATION = 1500;

export default function SiteLoader() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, "true");
    setVisible(true);

    if (reduceMotion) {
      const timer = window.setTimeout(() => setVisible(false), 180);
      return () => window.clearTimeout(timer);
    }

    const expandTimer = window.setTimeout(() => setExpanded(true), 80);
    const exitTimer = window.setTimeout(() => setLeaving(true), LOADER_DURATION + 280);
    return () => {
      window.clearTimeout(expandTimer);
      window.clearTimeout(exitTimer);
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="site-loader"
          role="status"
          aria-label={t.loader.label}
          initial={{ y: 0 }}
          animate={{ y: leaving ? "-100%" : 0 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.48, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => {
            if (leaving) setVisible(false);
          }}
        >
          <div className="site-loader__content">
            <div className="site-loader__wordmark" aria-label="HOUESSOU Euloge">
              <motion.span
                className="site-loader__initials"
                animate={{ opacity: expanded ? 0 : 1, scale: expanded ? 0.86 : 1 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                aria-hidden={expanded}
              >
                HE
              </motion.span>
              <motion.span
                className="site-loader__full-name"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: expanded ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
                transition={{ duration: LOADER_DURATION / 1000, ease: [0.22, 1, 0.36, 1] }}
              >
                HOUESSOU Euloge
              </motion.span>
            </div>
            <div className="site-loader__bar" aria-hidden="true">
              <motion.span
                className="site-loader__bar-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: expanded ? 1 : 0 }}
                transition={{ duration: LOADER_DURATION / 1000, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
