"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

export default function NavHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0D0D0D]/90 backdrop-blur-md border-b border-[#242424]/80"
            : "bg-transparent"
        }`}
      >
        <div className="w-full px-6 sm:px-10 lg:px-16 h-14 flex items-center justify-between text-xs">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="font-medium text-white hover:text-neutral-300 transition-colors tracking-tight text-sm"
            >
              Euloge HOUESSOU
            </Link>
            <span className="text-[#7A7A7A] hidden sm:inline text-xs">Design Engineer</span>
          </div>

          {/* Right: Nav Links (desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] text-neutral-300">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-1 py-1 hover:text-white transition-colors ${
                  isActive(link.href) ? "text-white font-medium" : ""
                }`}
              >
                {isActive(link.href) && (
                  <span className="inline-block w-1.5 h-1.5 bg-white rounded-full" />
                )}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile: Hamburger */}
          <button
            className="md:hidden text-neutral-400 hover:text-white transition-colors p-1"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              {mobileOpen ? (
                <>
                  <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <line x1="2" y1="5" x2="16" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="2" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="2" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-14 z-40 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#242424] md:hidden"
          >
            <nav className="flex flex-col px-6 py-6 space-y-4 text-sm text-neutral-300">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`hover:text-white transition-colors ${
                    isActive(link.href) ? "text-white font-medium" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
