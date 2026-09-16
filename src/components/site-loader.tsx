"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/components/locale-provider";

const SESSION_KEY = "euloge-portfolio-loader-seen";

export default function SiteLoader() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);
  const [showName, setShowName] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    sessionStorage.setItem(SESSION_KEY, "true");
    setVisible(true);

    if (reduceMotion) {
      const timer = window.setTimeout(() => setVisible(false), 120);
      return () => window.clearTimeout(timer);
    }

    const nameTimer = window.setTimeout(() => setShowName(true), 280);
    const exitTimer = window.setTimeout(() => setLeaving(true), 980);
    return () => {
      window.clearTimeout(nameTimer);
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
          transition={{ duration: reduceMotion ? 0.1 : 0.42, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => {
            if (leaving) setVisible(false);
          }}
        >
          <div className="site-loader__content">
            <motion.img
              src="/logo-sombre.png"
              alt="HE"
              className="site-loader__logo"
              animate={{ opacity: showName ? 0 : 1, scale: showName ? 0.92 : 1 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />
            <motion.div
              className="site-loader__name"
              aria-label="HOUESSOU Euloge"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: showName ? 1 : 0, y: showName ? 0 : 8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <span className="site-loader__name-base">HOUESSOU Euloge</span>
              <motion.span
                className="site-loader__name-fill"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: showName ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                aria-hidden="true"
              >
                HOUESSOU Euloge
              </motion.span>
              <motion.span
                className="site-loader__progress"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: showName ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
