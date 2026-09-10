"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

export default function ResumePage() {
  return (
    <div className="bg-[#0e0e0e] text-neutral-200 font-sans antialiased min-h-screen relative selection:bg-white selection:text-black">

      <div className="w-full px-6 sm:px-12 lg:px-16 xl:px-24 pt-24 pb-24">

        {/* Hero */}
        <FadeIn>
          <section className="mb-20 sm:mb-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4">
              <div className="hidden md:block md:col-span-6" />
              <div className="md:col-span-6">
                <p className="text-xs text-neutral-500 mb-4 font-medium tracking-wide">Resume</p>
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] leading-[1.18] font-normal text-neutral-100 tracking-[-0.02em] mb-7">
                  Experience, education, and the{" "}
                  <span className="font-serif-italic text-[1.12em] text-neutral-100">details.</span>
                </h1>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 bg-white hover:bg-neutral-200 text-black text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                  >
                    <span>↓</span><span>Download PDF</span>
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 bg-[#141414] hover:bg-neutral-800 border border-neutral-700/60 text-white text-xs font-medium px-4 py-2 rounded-full transition-colors"
                  >
                    <span>↗</span><span>View PDF</span>
                  </a>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 bg-[#141414] hover:bg-neutral-800 border border-neutral-700/60 text-white text-xs font-medium rounded-full transition-colors"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        <div className="space-y-16">

          {/* Experience */}
          <FadeIn delay={0.05}>
            <section className="border-t border-neutral-800/80 pt-5">
              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-12 mb-2">
                  <h2 className="text-xs text-neutral-500 font-medium">Experience</h2>
                </div>
              </div>

              {/* Bundl */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 pt-4 pb-12">
                <div className="md:col-span-6">
                  <h3 className="text-sm font-semibold text-white tracking-tight">Bundl</h3>
                </div>
                <div className="md:col-span-6">
                  <div className="flex items-baseline justify-between text-xs mb-4">
                    <span className="text-neutral-300 font-medium">Venture Designer & Developer</span>
                    <span className="text-neutral-500 font-normal">Jan 2025 – Present</span>
                  </div>
                  <ul className="space-y-3.5 text-xs text-neutral-400 font-normal leading-relaxed">
                    {[
                      "Designer and developer on two fully custom Shopify themes, oleus.com for Nestlé and 113spring.com, built as scalable component systems their teams launch new pages with.",
                      "Built MVPs and prototypes to validate new ventures for enterprise clients, including goretexkidswear.com for Gore.",
                      "Translated venture strategy into visual narratives and GTM assets for Liberty Global, Nestlé and Gore, aligning large stakeholder groups.",
                    ].map((bullet, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-neutral-600 mr-2 select-none">/</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CCM */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 pt-5 pb-6 border-t border-neutral-800/50">
                <div className="md:col-span-6">
                  <h3 className="text-sm font-semibold text-white tracking-tight">CCM</h3>
                </div>
                <div className="md:col-span-6">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-neutral-300 font-medium">Technical Staff</span>
                    <span className="text-neutral-500 font-normal">Jun 2020 – Aug 2022</span>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* Education */}
          <FadeIn delay={0.1}>
            <section className="border-t border-neutral-800/80 pt-5">
              <div className="grid grid-cols-1 md:grid-cols-12 mb-2">
                <div className="md:col-span-12">
                  <h2 className="text-xs text-neutral-500 font-medium">Education</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 pt-4 pb-6">
                <div className="md:col-span-6">
                  <h3 className="text-sm font-semibold text-white tracking-tight">Howest Kortrijk</h3>
                </div>
                <div className="md:col-span-6">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-neutral-300 font-medium">BA Digital Design & Development, Kortrijk</span>
                    <span className="text-neutral-500 font-normal">2022–2025</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 pt-5 pb-6 border-t border-neutral-800/50">
                <div className="md:col-span-6">
                  <h3 className="text-sm font-semibold text-white tracking-tight">Hanyang University</h3>
                </div>
                <div className="md:col-span-6">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-neutral-300 font-medium">Exchange, Communication & Media Studies, Seoul</span>
                    <span className="text-neutral-500 font-normal">2024</span>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* Skills */}
          <FadeIn delay={0.15}>
            <section className="border-t border-neutral-800/80 pt-5">
              <div className="grid grid-cols-1 md:grid-cols-12 mb-2">
                <div className="md:col-span-12">
                  <h2 className="text-xs text-neutral-500 font-medium">Skills</h2>
                </div>
              </div>

              {[
                { label: "Development", value: "TypeScript, JavaScript, React, Next.js, React Native, Swift, ElectronJS, HTML/CSS, Liquid (Shopify)" },
                { label: "Design", value: "Figma, Webflow, Blender, After Effects, Adobe CC" },
                { label: "AI & Workflows", value: "LangChain, Claude Code, Codex, MCP, n8n, Make" },
              ].map((skill, i) => (
                <div
                  key={skill.label}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-y-3 pt-4 pb-5 ${i > 0 ? "border-t border-neutral-800/50" : ""}`}
                >
                  <div className="md:col-span-6">
                    <h3 className="text-xs font-semibold text-white">{skill.label}</h3>
                  </div>
                  <div className="md:col-span-6">
                    <p className="text-xs text-neutral-400 font-normal">{skill.value}</p>
                  </div>
                </div>
              ))}
            </section>
          </FadeIn>

          {/* Details */}
          <FadeIn delay={0.2}>
            <section className="border-t border-neutral-800/80 pt-5">
              <div className="grid grid-cols-1 md:grid-cols-12 mb-2">
                <div className="md:col-span-12">
                  <h2 className="text-xs text-neutral-500 font-medium">Details</h2>
                </div>
              </div>

              {[
                { label: "Location", value: "Antwerp, Belgium" },
                { label: "Languages", value: "English, Dutch, French, Russian" },
                { label: "Nationality", value: "Belgian" },
              ].map((detail, i) => (
                <div
                  key={detail.label}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-y-3 pt-4 pb-5 ${i > 0 ? "border-t border-neutral-800/50" : ""}`}
                >
                  <div className="md:col-span-6">
                    <h3 className="text-xs font-semibold text-white">{detail.label}</h3>
                  </div>
                  <div className="md:col-span-6">
                    <p className="text-xs text-neutral-400 font-normal">{detail.value}</p>
                  </div>
                </div>
              ))}
            </section>
          </FadeIn>

          {/* Recognition */}
          <FadeIn delay={0.25}>
            <section className="border-t border-neutral-800/80 pt-5">
              <div className="grid grid-cols-1 md:grid-cols-12 mb-2">
                <div className="md:col-span-12">
                  <h2 className="text-xs text-neutral-500 font-medium">Recognition</h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-y-3 pt-4 pb-5">
                <div className="md:col-span-6">
                  <h3 className="text-xs font-semibold text-white">Awwwards</h3>
                </div>
                <div className="md:col-span-6">
                  <p className="text-xs text-neutral-400 font-normal">Honorable Mention — W. Honors</p>
                </div>
              </div>
            </section>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
