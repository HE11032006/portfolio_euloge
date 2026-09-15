"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function NavHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [away, setAway] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    let lastY = window.scrollY;

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
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className={`reference-header${away ? " is-away" : ""}`}>
        <Link href="/" className="reference-header__logo" aria-label="Euloge HOUESSOU - accueil">
          <img className="reference-header__logo--dark" src="/logo-clair.png" alt="HE" />
          <img className="reference-header__logo--light" src="/logo-sombre.png" alt="HE" />
        </Link>

        <nav className="reference-header__nav" aria-label="Navigation principale">
          <div className="reference-header__cluster">
            <Link
              href="/writing"
              className={`reference-header__link ${isActive("/writing") ? "is-active" : ""}`}
            >
              BLOG
            </Link>

            <span className="reference-header__divider" aria-hidden="true" />

            <Link
              href="/work"
              className={`reference-header__link ${isActive("/work") ? "is-active" : ""}`}
            >
              PROJECTS
            </Link>
          </div>

          <Link
            href="/about"
            className={`reference-header__pill ${isActive("/about") ? "is-active" : ""}`}
          >
            ABOUTME
          </Link>
        </nav>

        <Link href="/contacts" className="reference-header__contact">
          CONTACT
        </Link>

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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            aria-label="Navigation mobile"
          >
            <Link href="/work">PROJECTS <span>↗</span></Link>
            <Link href="/about">ABOUT ME <span>↗</span></Link>
            <Link href="/writing">BLOG <span>↗</span></Link>
            <Link href="/contacts">CONTACT <span>↗</span></Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
