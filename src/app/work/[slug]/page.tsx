"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface CaseStudyData {
  title: string;
  tagline: string;
  role: string;
  client: string;
  year: string;
  stack: string;
  siteUrl: string;
  summary: string[];
  tocItems: { id: string; label: string }[];
  sections: { id: string; heading: string; body: string; subItems?: string[] }[];
}

const caseStudies: Record<string, CaseStudyData> = {
  "113-spring": {
    title: "113 Spring",
    tagline: "Custom Shopify theme for a confidential brand: configurable, modular, enduring — preserving editorial calm against e-commerce imperatives.",
    role: "Designer & Developer",
    client: "Bundl / 113 Spring",
    year: "2026",
    stack: "Shopify Liquid · TypeScript · Tailwind CSS · Vite",
    siteUrl: "https://113spring.com",
    summary: [
      "End-to-end Shopify theme design and development for an undisclosed luxury brand.",
      "Built a fully modular section system enabling non-technical editors to launch new pages independently.",
      "Preserved the brand's calm editorial aesthetic within the constraints of a commercial e-commerce platform.",
    ],
    tocItems: [
      { id: "probleme", label: "01 / Problème" },
      { id: "solution", label: "02 / Solution" },
      { id: "implementation", label: "03 / Implémentation" },
      { id: "stack", label: "04 / Stack technique" },
    ],
    sections: [
      {
        id: "probleme",
        heading: "Problème",
        body: "The brand needed an e-commerce presence that didn't feel like e-commerce. Their identity was built on restraint — white space, long editorial scrolls, absence of pressure. The standard Shopify theme ecosystem offered none of this. Every template felt like a conversion machine, optimised for urgency and discounting, not for the quiet authority the brand had cultivated.",
      },
      {
        id: "solution",
        heading: "Solution",
        body: "A ground-up custom theme built directly in Liquid, with a modular section architecture that gives content editors full control without exposing technical complexity. Every section was designed as a pair: a Liquid template and a schema block. The schema surfaces only the controls the editor actually needs — nothing more.",
        subItems: [
          "Configurable section system with 24 custom blocks",
          "Full-bleed editorial imagery with lazy loading",
          "Type-scale system mapped to the brand's print guidelines",
          "Cart with predictive search that doesn't interrupt reading flow",
        ],
      },
      {
        id: "implementation",
        heading: "Implémentation",
        body: "The build ran in three phases. First, component architecture: defining the token system, type scale, and section API. Second, templating: building all PDP, PLP, collection, and content page templates. Third, optimisation: image pipeline, predictive search, and performance audit to hit a 95+ Lighthouse score on mobile.",
      },
      {
        id: "stack",
        heading: "Stack technique",
        body: "The theme is built on Shopify's Online Store 2.0 architecture, compiled with Vite for fast local development and deterministic production builds. TypeScript handles all client-side interactivity. Tailwind CSS v4 with a custom @theme configuration maps directly to the brand's design tokens.",
      },
    ],
  },
  "oleus": {
    title: "OLEUS",
    tagline: "Custom Shopify theme and design system for Nestlé's premium olive oil brand.",
    role: "Designer & Developer",
    client: "Bundl / Nestlé",
    year: "2025",
    stack: "Shopify Liquid · TypeScript · Tailwind CSS",
    siteUrl: "https://oleus.com",
    summary: [
      "End-to-end design and development of a custom Shopify theme for oleus.com.",
      "Built a modular component library allowing Nestlé's team to launch new pages independently.",
      "Established a design system that scales across product categories.",
    ],
    tocItems: [
      { id: "challenge", label: "01 / Challenge" },
      { id: "approach", label: "02 / Approach" },
      { id: "outcome", label: "03 / Outcome" },
    ],
    sections: [
      {
        id: "challenge",
        heading: "Challenge",
        body: "Nestlé needed a premium D2C storefront for their OLEUS olive oil brand. The brief called for a design that communicated provenance and quality — Mediterranean terroir, artisan production, centuries of tradition — while still converting efficiently as an e-commerce platform.",
      },
      {
        id: "approach",
        heading: "Approach",
        body: "I designed and built the theme from scratch using Shopify's OS 2.0 section system. Every design decision was anchored in the brand's visual identity — terracotta palette, editorial photography, restrained typography — while the technical architecture prioritised editor autonomy and page load performance.",
      },
      {
        id: "outcome",
        heading: "Outcome",
        body: "The Nestlé team can now launch new product pages and promotional collections without developer involvement. The theme scored 94 on Lighthouse mobile performance at launch and has maintained that score as the product catalogue has grown.",
      },
    ],
  },
};

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const study = caseStudies[slug] ?? caseStudies["113-spring"];

  return (
    <div className="bg-[#0d0d0c] text-[#dedbd5] min-h-screen font-sans antialiased relative flex flex-col justify-between selection:bg-stone-700 selection:text-stone-100">

      <div className="flex-grow w-full px-6 md:px-12 lg:px-16 pt-24 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Sticky sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-24 space-y-10"
          >
            {/* Back link */}
            <div>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-xs text-stone-500 hover:text-stone-300 transition-colors font-mono"
              >
                ← Back
              </Link>
            </div>

            {/* Project intro */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-stone-900 border border-stone-800 text-[10px] font-mono text-stone-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Case Study
              </div>
              <h1 className="text-3xl md:text-4xl font-normal text-white tracking-tight">{study.title}</h1>
              <p className="text-stone-400 text-sm leading-relaxed font-light">{study.tagline}</p>
            </div>

            {/* TOC */}
            <div className="space-y-2 border-t border-stone-800/80 pt-6">
              <span className="block text-stone-600 text-[11px] uppercase tracking-wider mb-2 font-mono">Sommaire</span>
              <nav className="space-y-1.5 font-mono text-xs">
                {study.tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-stone-400 hover:text-white transition-colors hover:translate-x-1 duration-150"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Meta */}
            <div className="space-y-5 text-xs border-t border-stone-800/80 pt-6">
              {[
                { label: "Rôle", value: study.role },
                { label: "Client & Studio", value: study.client },
                { label: "Année", value: study.year },
                { label: "Stack sommaire", value: study.stack, mono: true },
              ].map((m) => (
                <div key={m.label}>
                  <span className="block text-stone-600 text-[11px] uppercase tracking-wider mb-1 font-mono">{m.label}</span>
                  <span className={`text-stone-300 ${m.mono ? "font-mono text-[11px]" : ""}`}>{m.value}</span>
                </div>
              ))}
              <div className="pt-2">
                <a
                  href={study.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-stone-300 hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  ↗ Visiter le site
                </a>
              </div>
            </div>
          </motion.aside>

          {/* Main content */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8 xl:col-span-9 space-y-20"
          >
            {/* Hero mockup frame */}
            <section className="rounded-xl overflow-hidden border border-stone-800/80 bg-[#161514] shadow-2xl relative">
              <div className="w-full bg-[#171615] px-5 py-3 border-b border-stone-800/90 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                <div className="flex items-center space-x-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-stone-600" />
                  <span className="text-stone-300 tracking-wider uppercase text-[10px]">Exhibition Plate No. 01</span>
                </div>
                <div className="font-serif tracking-widest text-stone-200 text-xs font-bold uppercase">
                  {study.title.toUpperCase()} — FLAGSHIP STOREFRONT
                </div>
                <div className="text-[10px] text-stone-500">40.7223° N, 73.9996° W</div>
              </div>

              {/* Showcase visual */}
              <div className="relative aspect-[16/10] md:aspect-[16/9] w-full overflow-hidden bg-stone-950 group">
                <div className="w-full h-full bg-gradient-to-br from-[#1a1816] via-[#252220] to-[#0d0d0c] flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="text-4xl font-bold text-stone-200 tracking-tight">{study.title}</div>
                    <div className="text-sm text-stone-500 font-mono">Shopify Custom Theme</div>
                  </div>
                </div>
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/30">
                  <div className="flex justify-between items-start text-[10px] font-mono tracking-widest text-stone-400 uppercase">
                    <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-stone-800/80">
                      Digital Vernissage · {study.year}
                    </span>
                  </div>
                  <div className="max-w-xl space-y-3">
                    <h2 className="text-2xl md:text-4xl text-stone-100 font-normal leading-tight tracking-tight">
                      {study.title}
                    </h2>
                    <p className="text-stone-400 text-sm font-light max-w-md">{study.tagline}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Sections */}
            {study.sections.map((section, i) => (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="space-y-6"
              >
                <div className="flex items-baseline gap-4 border-b border-stone-800/60 pb-4">
                  <span className="text-stone-600 font-mono text-xs">0{i + 1}</span>
                  <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight">{section.heading}</h2>
                </div>
                <p className="text-stone-400 text-[15px] leading-relaxed font-light max-w-3xl">{section.body}</p>
                {section.subItems && (
                  <ul className="space-y-2 pt-2">
                    {section.subItems.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-stone-400">
                        <span className="text-stone-600 font-mono mt-0.5">/</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.section>
            ))}

            {/* Back to work */}
            <div className="pt-8 border-t border-stone-800/60">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-white transition-colors font-mono"
              >
                ← All work
              </Link>
            </div>
          </motion.article>
        </div>
      </div>
    </div>
  );
}
