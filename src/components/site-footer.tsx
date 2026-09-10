"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const footerWork = [
  { label: "OLEUS", href: "/work/oleus" },
  { label: "113 Spring", href: "/work/113-spring" },
  { label: "Venture Design at Bundl", href: "/work/bundl" },
];

const footerUniversity = [
  { label: "Tesla in Blender", href: "/work/tesla-blender" },
  { label: "Mixbox", href: "/work/mixbox" },
  { label: "Larq Kickstarter", href: "/work/larq" },
  { label: "Integration 3", href: "/work/integration-3" },
  { label: "Conference Lotus", href: "/work/conference-lotus" },
  { label: "Lotus Education", href: "/work/lotus-education" },
];

const footerWriting = [
  { label: "About Euloge", href: "/about" },
  { label: "The Agentic AI Era", href: "/writing/agentic-ai-era" },
  { label: "Switching my second brain", href: "/writing/second-brain" },
];

const footerElsewhere = [
  { label: "LinkedIn", href: "https://linkedin.com", external: true },
  { label: "GitHub", href: "https://github.com", external: true },
  { label: "Behance", href: "https://behance.net", external: true },
  { label: "Email", href: "mailto:euloge.houessou@gmail.com" },
  { label: "Resume", href: "/resume" },
];

// Pages that should NOT show the footer
const noFooterPaths = ["/writing/", "/work/"];

export default function SiteFooter() {
  const pathname = usePathname();

  // Don't show on article/case study detail pages
  if (noFooterPaths.some((p) => pathname.startsWith(p) && pathname.split("/").length > 2)) {
    return null;
  }

  return (
    <footer className="pt-16 pb-12 border-t border-neutral-900 text-xs bg-[#0D0D0D]">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-neutral-400">
          {/* Column 1: Work */}
          <div>
            <h3 className="text-white font-medium text-sm mb-4">Work</h3>
            <ul className="flex flex-col gap-2.5">
              {footerWork.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: University */}
          <div>
            <h3 className="text-white font-medium text-sm mb-4">University</h3>
            <ul className="flex flex-col gap-2.5">
              {footerUniversity.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link href="/work" className="text-white hover:underline inline-flex items-center">
                  View all <span className="ml-1 text-[10px]">↗</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Writing */}
          <div>
            <h3 className="text-white font-medium text-sm mb-4">Writing</h3>
            <ul className="flex flex-col gap-2.5">
              {footerWriting.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-white transition-colors line-clamp-1">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Elsewhere */}
          <div>
            <h3 className="text-white font-medium text-sm mb-4">Elsewhere</h3>
            <ul className="flex flex-col gap-2.5">
              {footerElsewhere.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="hover:text-white inline-flex items-center transition-colors"
                  >
                    {item.label}
                    {item.external && <span className="ml-1 text-[10px]">↗</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex justify-end text-[11px] text-neutral-600">
          <span>©2026 Euloge HOUESSOU</span>
        </div>
      </div>
    </footer>
  );
}
