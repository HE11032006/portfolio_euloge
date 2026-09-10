"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const experience = [
  {
    company: "Bundl",
    role: "Venture Designer & Developer",
    period: "Jan 2025 – Present",
    bullets: [
      "Designer and developer on two fully custom Shopify themes, oleus.com (Nestlé) and 113spring.com, built as scalable component systems.",
      "Built MVPs and prototypes to validate new ventures for enterprise clients, including goretexkidswear.com for Gore.",
      "Translated venture strategy into visual narratives and GTM assets for Liberty Global, Nestlé and Gore.",
    ],
  },
  {
    company: "CCM",
    role: "Technical Staff",
    period: "Jun 2020 – Aug 2022",
    bullets: [],
  },
];

const highlights = [
  {
    n: "01",
    title: "Shopify Architecture:",
    desc: "Designed and developed end-to-end custom themes for oleus.com (Nestlé) and 113spring.com, establishing resilient modular design systems.",
  },
  {
    n: "02",
    title: "Enterprise MVPs:",
    desc: "Rapidly prototyped and launched high-fidelity validation environments for international clients, including goretexkidswear.com for W. L. Gore.",
  },
  {
    n: "03",
    title: "Strategic Visuals & GTM:",
    desc: "Translated multi-layered corporate venture strategies into unified visual narratives across Liberty Global, Nestlé, and Gore.",
  },
];

const detailCols = [
  {
    title: "Experience",
    items: [
      { label: "Bundl", sub: "Venture Designer & Developer", meta: "Jan 2025 – Present" },
      { label: "CCM", sub: "Technical Staff", meta: "Jun 2020 – Aug 2022" },
    ],
  },
  {
    title: "Client Involvements",
    items: [
      { label: "Nestlé" },
      { label: "Lilly" },
      { label: "Chanel" },
      { label: "Gore" },
      { label: "Liberty Global" },
    ],
  },
  {
    title: "Education",
    items: [
      { label: "Howest Kortrijk", sub: "BA Digital Design & Development", meta: "2022–2025" },
      { label: "Hanyang University", sub: "Exchange Semester, Seoul", meta: "2024" },
    ],
  },
  {
    title: "Languages",
    items: [{ label: "English" }, { label: "Dutch" }, { label: "French" }, { label: "Russian" }],
  },
];

const stackCols = [
  {
    title: "Development",
    items: ["TypeScript", "JavaScript", "React", "Next.js", "React Native", "Swift", "ElectronJS", "HTML/CSS", "Liquid (Shopify)"],
  },
  {
    title: "Design",
    items: ["Figma", "Webflow", "Blender", "After Effects", "Adobe CC"],
  },
  {
    title: "AI & Workflows",
    items: ["LangChain", "Claude Code", "Codex", "MCP", "n8n", "Make"],
  },
  {
    title: "Platforms",
    items: ["Shopify", "Vercel", "Supabase", "GitHub", "Linear"],
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#0b0b0c] text-[#c4c0ba] min-h-screen font-sans antialiased selection:bg-stone-800 selection:text-white">

      {/* ── Editorial Header ── */}
      <section className="px-6 md:px-12 lg:px-16 pt-24 md:pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Top identity headline */}
          <div className="pb-12 border-b border-[#1c1c20] flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#6b6762] mb-3 font-medium">
                Design Engineering & Venture Architecture
              </p>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white leading-[0.98]">
                Euloge HOUESSOU
              </h1>
            </div>
            <div className="md:text-right pb-1">
              <p className="text-sm md:text-base font-normal text-[#d6d2cb]">
                Design Engineer <span className="text-[#524e49] font-light">—</span> Antwerp, Belgium
              </p>
              <p className="text-xs text-[#716d67] mt-1 font-mono tracking-tight">
                Available for selected ventures & digital systems
              </p>
            </div>
          </div>
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-14 items-start">

          {/* Left: Manifesto */}
          <FadeIn delay={0.1} className="lg:col-span-7">
            <div className="space-y-8 pr-0 lg:pr-6">
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-[34px] leading-[1.25] text-[#f2efe9] font-light tracking-tight">
                  Working at the precise{" "}
                  <span className="font-serif-italic font-normal text-white text-3xl sm:text-4xl md:text-[38px]">
                    intersection of design and code
                  </span>
                  , engineering custom digital surfaces from initial conceptualization to production-grade architectures.
                </h2>
                <p className="text-[14.5px] leading-relaxed text-[#9e9a93] font-light">
                  I bridge visual rigor and structural software engineering. Rather than treating design and development
                  as sequential handoffs, every detail is sculpted directly with high-fidelity tools, reactive components,
                  and production code.
                </p>
              </div>

              {/* Core methodology */}
              <div className="border-l-2 border-[#383632] pl-6 py-2 my-8 space-y-2 bg-[#121214]/40 rounded-r-md">
                <span className="text-[10.5px] uppercase tracking-widest text-[#858079] font-mono">Core Methodology</span>
                <p className="text-[13.5px] text-[#ccc8c2] leading-relaxed">
                  An{" "}
                  <span className="text-white font-medium">AI-augmented workflow</span> anchored in Cursor, Claude Code,
                  and autonomous MCP agents defines how I conceive, prototype, and ship. I move with velocity and treat
                  production shipping as the only definitive proof that an idea holds value.
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-4 pt-2">
                <span className="text-[11px] uppercase tracking-wider text-[#69655f] font-mono block">
                  Highlights & Engagements
                </span>
                <div className="space-y-3.5 text-[13px] text-[#938e87]">
                  {highlights.map((h) => (
                    <div key={h.n} className="flex items-start gap-3">
                      <span className="text-[#524e4a] font-mono select-none">{h.n}</span>
                      <p>
                        <strong className="text-[#ddd9d2] font-medium">{h.title}</strong> {h.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div className="pt-6 border-t border-[#1a1a1c] flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white">
                {[
                  { label: "Email", href: "mailto:euloge.houessou@gmail.com", arrow: "↗" },
                  { label: "Book a call", href: "#", arrow: "↗" },
                  { label: "LinkedIn", href: "#", arrow: "↗" },
                  { label: "Resume (PDF)", href: "/resume", arrow: "↓" },
                ].map((l) => (
                  <a key={l.label} href={l.href} className="hover:text-stone-400 transition-colors flex items-center gap-1.5">
                    <span>{l.label}</span>
                    <span className="text-[#635f5a]">{l.arrow}</span>
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right: Portrait */}
          <FadeIn delay={0.2} className="lg:col-span-5 flex flex-col items-center lg:items-end w-full">
            <div className="w-full max-w-[420px]">
                <div className="p-2 border border-[#212126] bg-[#111113] rounded-sm shadow-2xl relative">
                  <div className="aspect-[4/5] w-full overflow-hidden bg-[#18181b] relative">
                    <img
                      src="https://lh3.googleusercontent.com/aida/AEtjO1U6hJifXCqyj0Yhu_GrhbyNHFHMpCpfFCFutYJ507SV1TKlvmsfz010exTqROyUGtnXuYj-4x8Axw21p-nym86_R2QHDfENSTFgyNoFZOhEHD8baT8Bb22LTS1jEQwShNZcI8pCQ_tixbQTlvxPlM8GrWA_Z65jHpqhhd2r9gCZYC-7MmgEE4CSkcFVtBaDCGftNT3O_ajVobHnVbqGblMbcQecjsuy6s3HONFArKsTTefqdu32Lu2THQE"
                      alt="Euloge HOUESSOU"
                      className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
                  </div>
                  <div className="pt-3 pb-1 px-1 flex items-center justify-between text-[11px] text-[#6e6a64] font-mono">
                    <span>FIG. 01 — PORTRAIT</span>
                    <span>ANTWERP, 2025</span>
                  </div>
                </div>

                {/* Status card */}
                <div className="mt-6 p-4 rounded-sm border border-[#1d1d22] bg-[#0f0f11] text-xs text-[#8c8882] space-y-2 font-light">
                  <div className="flex items-center justify-between text-[10.5px] uppercase tracking-wider text-[#635f59] font-mono">
                    <span>Status</span>
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Shipping actively
                    </span>
                  </div>
                  <p className="leading-relaxed text-[#9a968f]">
                    Currently partnering with early-stage founders & enterprise corporate venture labs to craft fluid
                    frontends and intelligent interface systems.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

      {/* ── Details & Stack Grid ── */}
      <section className="w-full border-t border-b border-[#1c1c20] py-24 md:py-32">
        <div className="px-6 md:px-12 lg:px-16 space-y-24 md:space-y-32">

          {/* Details */}
          <FadeIn>
            <div>
              <div className="pb-12 md:pb-16 border-b border-[#1c1c20] flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white">Details</h2>
                <p className="text-sm md:text-base text-[#716d67] tracking-wider uppercase font-mono">Background & Scope</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 pt-12 md:pt-16">
                {detailCols.map((col) => (
                  <div key={col.title} className="space-y-8">
                    <h3 className="text-lg md:text-xl font-medium text-white tracking-tight">{col.title}</h3>
                    <ul className="space-y-6">
                      {col.items.map((item, i) => (
                        <li key={i} className="space-y-1.5">
                          <div className="text-base md:text-lg text-[#f2efe9] font-normal">{item.label}</div>
                          {"sub" in item && item.sub && (
                            <div className="text-sm md:text-base text-[#8c8882] font-light leading-relaxed">{item.sub}</div>
                          )}
                          {"meta" in item && item.meta && (
                            <div className="text-xs md:text-sm text-[#595550] font-mono">{item.meta}</div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Stack */}
          <FadeIn delay={0.1}>
            <div>
              <div className="pb-12 md:pb-16 border-b border-[#1c1c20] flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white">Stack</h2>
                <p className="text-sm md:text-base text-[#716d67] tracking-wider uppercase font-mono">Technologies & Tools</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 pt-12 md:pt-16">
                {stackCols.map((col) => (
                  <div key={col.title} className="space-y-8">
                    <h3 className="text-lg md:text-xl font-medium text-white tracking-tight">{col.title}</h3>
                    <ul className="space-y-3.5">
                      {col.items.map((item) => (
                        <li key={item} className="text-base md:text-lg text-[#ddd9d2] font-light">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
