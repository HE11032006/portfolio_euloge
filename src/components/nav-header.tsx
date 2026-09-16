"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LetterRoll } from "@/components/ui/letter-roll";

export default function NavHeader() {
  const pathname = usePathname();
  const contactWrapRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [away, setAway] = useState(false);
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const updateHeaderTheme = () => {
      const header = document.querySelector<HTMLElement>(".reference-header");
      if (!header) return;

      const rect = header.getBoundingClientRect();
      const sampleY = Math.min(window.innerHeight - 1, rect.bottom + 8);
      const samplePoints = [rect.left + 16, rect.left + rect.width / 2, rect.right - 16];
      const isDark = samplePoints.some((sampleX) =>
        document
          .elementsFromPoint(sampleX, sampleY)
          .some((element) => !header.contains(element) && Boolean(element.closest('[data-header-theme="dark"], .surface-dark')))
      );

      setOnDark(isDark);
    };

    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY + 2;
      const goingUp = y < lastY - 2;

      if (y < 16) {
        setAway(false);
      } else if (goingDown) {
        setAway(true);
        setMobileOpen(false);
      } else if (goingUp) {
        setAway(false);
      }

      lastY = y;
      updateHeaderTheme();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateHeaderTheme);
    const frame = window.requestAnimationFrame(updateHeaderTheme);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateHeaderTheme);
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    if (!contactOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!contactWrapRef.current?.contains(event.target as Node)) {
        setContactOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setContactOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [contactOpen]);

  useEffect(() => {
    const openContactMenu = () => setContactOpen(true);
    window.addEventListener("open-contact-menu", openContactMenu);
    return () => window.removeEventListener("open-contact-menu", openContactMenu);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <header className={`reference-header${away ? " is-away" : ""}${onDark ? " is-on-dark" : ""}`}>
        <Link href="/about" className="reference-header__logo" aria-label="Euloge HOUESSOU - à propos">
          <img className="reference-header__logo--dark" src="/logo-clair.png" alt="HE" />
          <img className="reference-header__logo--light" src="/logo-sombre.png" alt="HE" />
        </Link>

        <nav className="reference-header__nav" aria-label="Navigation principale">
          <div className="reference-header__cluster">
            <Link
              href="/about"
              className={`reference-header__link ${isActive("/about") ? "is-active" : ""}`}
            >
              <LetterRoll label="ABOUT ME" />
            </Link>

            <Link
              href="/work"
              className={`reference-header__link ${isActive("/work") ? "is-active" : ""}`}
            >
              <LetterRoll label="PROJECTS" />
            </Link>

            <Link
              href="/writing"
              className={`reference-header__link ${isActive("/writing") ? "is-active" : ""}`}
            >
              <LetterRoll label="BLOG" />
            </Link>
          </div>
        </nav>

        <div ref={contactWrapRef} className="reference-header__contact-wrap">
          <button
            type="button"
            className={`reference-header__contact ${contactOpen ? "is-open" : ""}`}
            aria-expanded={contactOpen}
            aria-controls="contact-menu"
          onClick={() => setContactOpen((open) => !open)}
          >
            <LetterRoll label="CONTACT" />
          </button>

          <AnimatePresence>
            {contactOpen && (
              <motion.div
                id="contact-menu"
                className="reference-header__contact-menu"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <button type="button" className="reference-header__contact-close" onClick={() => setContactOpen(false)}>
                  Fermer ×
                </button>
                <a href="mailto:eulogemn@gmail.com" aria-label="Envoyer un email">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                  Email
                </a>
                <a href="https://www.youtube.com/@Euloge-s3s" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.5 15.6V8.4l6.3 3.6-6.3 3.6Z" /></svg>
                  YouTube
                </a>
                <a href="https://x.com/Michel11062006" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.2 2h3.3l-7.2 8.3L23 21.5h-6.7L11 14.7l-6 6.8H1.7l7.7-8.8L1.2 2h6.8l4.7 6.2L18.2 2Zm-1.1 17.5h1.8L7.1 3.9H5.1l12 15.6Z" /></svg>
                  X / Twitter
                </a>
                <a href="https://www.linkedin.com/in/euloge-houessou-8101883b7/" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3ZM5.3 7.4a2.1 2.1 0 1 1 0-4.1 2.1 2.1 0 0 1 0 4.1Zm1.8 13H3.6V9h3.5v11.5Z" /></svg>
                  LinkedIn
                </a>
                <a href="https://github.com/HE11032006" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.5 9.5 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.5.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.6 5 .4.3.7.9.7 1.8V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" /></svg>
                  GitHub
                </a>
                <a href="https://wa.me/22946555100" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.2A8 8 0 1 1 20 11.5Z" /><path d="M9 8.5c.3 2.1 1.6 3.5 3.7 4l1.1-1.1 1.8.9c-.5 1.2-1.3 1.6-2.2 1.5-3.5-.5-5.4-2.5-5.8-5.7-.1-.9.3-1.7 1.5-2.1l1 1.8L9 8.5Z" /></svg>
                  WhatsApp
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          type="button"
          className="reference-header__mobile-toggle"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            className="reference-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            aria-label="Navigation mobile"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              className="reference-mobile-menu__panel"
              initial={{ y: 32 }}
              animate={{ y: 0 }}
              exit={{ y: 32 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              {[
                ["ABOUT ME", "/about"],
                ["PROJECTS", "/work"],
                ["BLOG", "/writing"],
              ].map(([label, href], index) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 14 }}
                  transition={{ duration: 0.24, delay: 0.08 + index * 0.06 }}
                >
                  <Link href={href} onClick={() => setMobileOpen(false)}>{label}</Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
