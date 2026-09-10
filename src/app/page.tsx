"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

/* ─── Data ─── */
const clientWork = [
  { name: "OLEUS", meta: "Shopify · Nestlé", year: "2025", href: "/work/oleus" },
  { name: "113 Spring", meta: "Shopify · Undisclosed", year: "2026", href: "/work/113-spring" },
  { name: "Venture Design at Bundl", meta: "Venture design", year: "2025", href: "/work/bundl" },
];

const projects = [
  { title: "Portfolio v1", tag: "Webflow", bg: "bg-[#141414]", text: "Khadlyev", serif: true },
  { title: "Tesla", tag: "3D", bg: "bg-[#8a421c]", gradient: "from-[#3a1a09] to-[#bf5822]", label: "Cybertrack 3D" },
  { title: "Bug's Life", tag: "Illustration", light: true, bg: "bg-[#f0ede6]" },
  { title: "Mixbox", tag: "Packaging", bg: "bg-[#1f4037]" },
  { title: "Mixbox", tag: "Brand System", bg: "bg-[#161616]", emerald: true },
  { title: "Conference Lotus", tag: "Web Design", bg: "bg-[#6b584b]" },
  { title: "Travel Match", tag: "UX", bg: "bg-[#4a5840]" },
  { title: "Pinball Machine", tag: "Motion", bg: "bg-[#dcdbd7]", light: true },
  { title: "Integration 3", tag: "Web Build", bg: "bg-[#242629]" },
  { title: "Lotus Education", tag: "Campaign", bg: "bg-[#385170]" },
  { title: "Larq", tag: "Motion", bg: "bg-[#4895ef]" },
  { title: "Lotus Education", tag: "Web Design", bg: "bg-[#293241]" },
  { title: "Integration 1", tag: "Web Build", bg: "bg-[#181818]" },
];

/* ─── Animation helpers ─── */
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Project Card Visual ─── */
function ProjectCardVisual({ p }: { p: (typeof projects)[0] }) {
  if (p.light && p.bg === "bg-[#f0ede6]") {
    return (
      <div className={`${p.bg} text-black rounded-xl overflow-hidden aspect-[4/3] border border-neutral-800 p-6 flex flex-col justify-between shadow-md group-hover:border-neutral-600 transition`}>
        <div className="flex justify-between text-[10px] text-neutral-600 font-mono">
          <span>EULOGE HOUESSOU</span><span>ISSUE #1</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="w-20 h-20 bg-blue-600 rounded-full relative flex items-center justify-center shadow-md">
            <div className="w-10 h-10 bg-black rounded-t-full" />
          </div>
          <h3 className="text-xl font-serif leading-none tracking-tight text-neutral-900 font-bold">
            "Why should I<br />TRUST YOU?"
          </h3>
        </div>
        <p className="text-[9px] text-neutral-600 max-w-[200px] leading-tight">
          One-pager about a specific insect bringing its fascinating facts to life.
        </p>
      </div>
    );
  }
  if (p.light && p.bg === "bg-[#dcdbd7]") {
    return (
      <div className={`${p.bg} text-neutral-900 rounded-xl overflow-hidden aspect-[4/3] border border-neutral-800/80 p-4 flex flex-col justify-between shadow-md group-hover:border-neutral-600 transition`}>
        <div className="text-[9px] font-mono">by Euloge Houessou</div>
        <div className="text-center">
          <div className="text-2xl font-black italic tracking-tighter text-amber-600">MOTION GRAPHICS</div>
          <div className="text-[9px] tracking-widest uppercase font-mono text-neutral-700">PINBALL MACHINE</div>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="bg-pink-500 text-white text-[8px] px-1.5 py-0.5 rounded">PINBALL</span>
          <span className="text-[10px]">🕹️ 📼</span>
        </div>
      </div>
    );
  }
  if (p.serif) {
    return (
      <div className={`${p.bg} rounded-xl overflow-hidden aspect-[4/3] border border-neutral-800/80 p-5 flex items-center justify-center relative shadow-md group-hover:border-neutral-700 transition`}>
        <div className="w-4/5 aspect-[16/10] bg-[#1a1a1a] rounded-t-md p-2 flex flex-col border border-neutral-700 shadow-xl">
          <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center p-3 text-center">
            <span className="font-serif italic text-lg tracking-wider text-stone-200">{p.text}</span>
          </div>
        </div>
      </div>
    );
  }
  if (p.gradient) {
    return (
      <div className={`${p.bg} rounded-xl overflow-hidden aspect-[4/3] border border-neutral-800/80 p-5 flex items-center justify-center relative shadow-md group-hover:border-neutral-700 transition`}>
        <div className={`w-4/5 aspect-[16/10] bg-gradient-to-tr ${p.gradient} rounded-md overflow-hidden relative flex items-center justify-center shadow-lg`}>
          <span className="relative z-10 text-white/90 text-sm font-semibold tracking-widest uppercase">{p.label}</span>
        </div>
      </div>
    );
  }
  if (p.emerald) {
    return (
      <div className={`${p.bg} rounded-xl overflow-hidden aspect-[4/3] border border-neutral-800/80 p-5 flex items-center justify-center relative shadow-md group-hover:border-neutral-700 transition`}>
        <div className="relative w-48 h-36">
          <div className="absolute -left-4 top-2 w-24 h-36 bg-emerald-950 border border-emerald-600/40 rounded-xl shadow-xl -rotate-12 p-2">
            <div className="w-full h-4 bg-emerald-800 rounded" />
          </div>
          <div className="absolute right-2 top-0 w-24 h-36 bg-emerald-900 border border-emerald-500/50 rounded-xl shadow-2xl rotate-6 p-2">
            <div className="w-full h-4 bg-emerald-700 rounded" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`${p.bg} rounded-xl overflow-hidden aspect-[4/3] border border-neutral-800/80 p-5 flex items-center justify-center relative shadow-md group-hover:border-neutral-700 transition`}>
      <div className="w-4/5 aspect-[16/10] bg-[#0a0a0a]/60 rounded p-3 flex items-center justify-center text-center shadow-xl border border-white/5">
        <span className="text-xs text-neutral-400 font-medium">{p.title}</span>
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function HomePage() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    carouselRef.current?.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" });
  };

  return (
    <div className="bg-[#0D0D0D] text-[#EDEDED] font-sans antialiased selection:bg-stone-700 selection:text-white">
      <div className="w-full px-6 sm:px-10 lg:px-16">

        {/* ── Hero ── */}
        <section className="pt-28 sm:pt-36 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-[5.25rem] tracking-tight leading-[1.08] font-normal text-white">
              Design, Code &amp; AI Workflows.{" "}
              <span className="inline-block text-3xl sm:text-5xl md:text-6xl align-middle -mt-2">👾</span>
              <br />
              <span className="italic-serif font-normal text-4xl sm:text-6xl md:text-[5.5rem] tracking-normal text-neutral-100">
                Design Engineer.
              </span>
            </h1>
          </motion.div>

          {/* Hero visual cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 h-[420px] sm:h-[500px] md:h-[560px]">
              {/* Left card — 113 Spring mockup */}
              <div className="md:col-span-7 bg-[#df8a3c] rounded-xl overflow-hidden relative group flex items-center justify-center p-6 sm:p-10 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#b6531c] via-[#e28328] to-[#f5ab4d] opacity-95" />
                <div className="relative z-10 w-full max-w-lg bg-[#0e0f11] rounded-t-lg border-t-4 border-x-4 border-[#2b2926] shadow-2xl overflow-hidden aspect-[16/10] flex flex-col transform group-hover:scale-[1.01] transition-transform duration-500">
                  <div className="bg-[#191919] px-4 py-2 flex items-center justify-between text-[9px] text-neutral-400 border-b border-neutral-800">
                    <div className="flex space-x-3 text-neutral-300">
                      <span>Products</span><span>Experiences</span><span>Events</span>
                    </div>
                    <span className="font-medium tracking-wider text-neutral-200">113 SPRING</span>
                    <div className="flex space-x-2"><span>🔍</span><span>🛒</span></div>
                  </div>
                  <div className="flex-1 bg-gradient-to-b from-[#b24d08] via-[#e47614] to-[#632402] relative p-6 flex flex-col justify-between text-white overflow-hidden">
                    <div className="absolute right-12 top-4 w-44 h-44 rounded-full bg-[#fde8a0] blur-[1px] shadow-[0_0_80px_#fca311]" />
                    <div className="relative z-10 mt-6 max-w-[240px]">
                      <p className="text-[8px] uppercase tracking-widest text-amber-200 mb-1">ON NOW</p>
                      <h2 className="text-xl sm:text-2xl font-serif font-light leading-snug text-white">
                        The<br />Energy Exchange
                      </h2>
                      <p className="text-[9px] text-amber-100/80 mt-2 leading-relaxed font-light">
                        An exploration of energy not as a metric for output, but as a shared resource.
                      </p>
                      <span className="inline-block mt-3 px-2.5 py-1 text-[8px] bg-white/20 backdrop-blur rounded-full border border-white/30 text-white hover:bg-white/30 transition">
                        Discover the Exhibition
                      </span>
                    </div>
                    <div className="relative z-10 text-[10px] text-neutral-300 font-light border-t border-white/20 pt-2 flex justify-between">
                      <span>Longevity is not just</span><span>01/04</span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>

              {/* Right card — iridescent */}
              <div className="md:col-span-5 bg-black rounded-xl overflow-hidden relative shadow-2xl flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-iridescent scale-125 transform rotate-6 mix-blend-screen opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-[#0d0d0d]/40" />
                <svg className="absolute inset-0 w-full h-full object-cover opacity-80" viewBox="0 0 500 700" preserveAspectRatio="none">
                  <path d="M 0,200 C 150,450 350,100 500,350 L 500,700 L 0,700 Z" fill="#0341c8" opacity="0.6" />
                  <path d="M 50,0 C 200,300 350,550 500,600 L 500,0 Z" fill="#e85d04" opacity="0.5" />
                  <path d="M 0,350 C 220,180 280,620 500,450 L 500,700 L 0,700 Z" fill="#00b4d8" opacity="0.4" />
                </svg>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Client Work ── */}
        <section className="pt-16 pb-16" id="work">
          <FadeIn>
            <div className="text-neutral-400 text-xs mb-3">Client work</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-neutral-100 max-w-xl font-normal leading-tight">
              Client work shipped{" "}
              <span className="italic-serif text-3xl sm:text-4xl">end to end</span>, from Figma frame to production build.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-10 border-t border-neutral-800 divide-y divide-neutral-800/80 text-sm sm:text-base">
              {clientWork.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="py-4 sm:py-5 flex items-center justify-between hover:bg-neutral-900/40 px-2 rounded-lg transition-colors group cursor-pointer"
                >
                  <span className="font-medium text-white group-hover:text-amber-400 transition-colors">{item.name}</span>
                  <span className="text-neutral-400 text-xs sm:text-sm">{item.meta}</span>
                  <span className="text-neutral-500 text-xs sm:text-sm font-mono">{item.year}</span>
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/work"
                className="px-4 py-1.5 rounded-full border border-neutral-800 bg-[#161616] hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs transition"
              >
                All work
              </Link>
            </div>
          </FadeIn>
        </section>

        {/* ── Projects Carousel ── */}
        <section className="py-16 relative">
          <FadeIn>
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl text-neutral-200 font-normal leading-snug">
                A collection of{" "}
                <span className="italic-serif text-3xl sm:text-4xl text-white">student projects</span>,<br />
                freelance work and{" "}
                <span className="italic-serif text-3xl sm:text-4xl text-white">experiments</span>.
              </h2>
            </div>
          </FadeIn>

          {/* Controls */}
          <div className="flex items-center justify-between mb-6 px-1">
            <div className="flex items-center gap-2.5">
              <span className="inline-block w-2 h-2 rounded-full bg-neutral-400" />
              <span className="text-xs text-neutral-400 font-medium tracking-wider uppercase">Swipe or Scroll Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                aria-label="Previous project"
                onClick={() => scroll("left")}
                className="w-9 h-9 rounded-full border border-neutral-800 bg-[#161616] hover:bg-neutral-800 hover:text-white text-neutral-400 flex items-center justify-center transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </button>
              <button
                aria-label="Next project"
                onClick={() => scroll("right")}
                className="w-9 h-9 rounded-full border border-neutral-800 bg-[#161616] hover:bg-neutral-800 hover:text-white text-neutral-400 flex items-center justify-center transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </div>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-5 pb-6 pt-1 no-scrollbar snap-x snap-mandatory scroll-smooth -mx-5 px-5 sm:mx-0 sm:px-0"
          >
            {projects.map((p, i) => (
              <motion.article
                key={`${p.title}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="min-w-[300px] sm:min-w-[360px] md:min-w-[380px] flex-shrink-0 snap-start group cursor-pointer"
              >
                <ProjectCardVisual p={p} />
                <div className="mt-2.5 flex items-center gap-2 text-xs">
                  <span className="text-white font-medium group-hover:text-amber-400 transition-colors">{p.title}</span>
                  <span className="text-neutral-500 text-[11px]">{p.tag}</span>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/work"
              className="px-5 py-2 rounded-full border border-neutral-800 bg-[#161616] hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-medium transition shadow-sm"
            >
              View all projects
            </Link>
          </div>
        </section>

        {/* ── About ── */}
        <section className="py-20 border-t border-neutral-900" id="about">
          <FadeIn>
            <div className="text-xs text-neutral-500 mb-6">About</div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left: Bio */}
              <div className="lg:col-span-6 space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-[2.2rem] font-normal leading-snug text-white">
                  Euloge is an Antwerp-based{" "}
                  <span className="italic-serif">design engineer</span> working across design, code, and AI workflows.
                </h2>
                <p className="text-neutral-400 text-sm sm:text-[15px] leading-relaxed max-w-lg">
                  I design and build fully custom web experiences end to end. Recent client involvements include Nestlé,
                  Lilly, Chanel and Gore. Currently at Bundl.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <a
                    href="mailto:euloge.houessou@gmail.com"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-medium hover:bg-neutral-200 transition"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Book a call</span>
                  </a>
                  <Link
                    href="/about"
                    className="px-4 py-2 rounded-full bg-[#181818] border border-neutral-800 hover:bg-neutral-800 text-neutral-300 text-xs font-medium transition"
                  >
                    About
                  </Link>
                </div>
              </div>

              {/* Right: Portrait + iridescent */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-4 h-[340px] sm:h-[400px]">
                <div className="relative bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 group shadow-lg">
                  {/* Portrait photo */}
                  <img
                    src="https://lh3.googleusercontent.com/aida/AEtjO1U6hJifXCqyj0Yhu_GrhbyNHFHMpCpfFCFutYJ507SV1TKlvmsfz010exTqROyUGtnXuYj-4x8Axw21p-nym86_R2QHDfENSTFgyNoFZOhEHD8baT8Bb22LTS1jEQwShNZcI8pCQ_tixbQTlvxPlM8GrWA_Z65jHpqhhd2r9gCZYC-7MmgEE4CSkcFVtBaDCGftNT3O_ajVobHnVbqGblMbcQecjsuy6s3HONFArKsTTefqdu32Lu2THQE"
                    alt="Euloge HOUESSOU"
                    className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 text-[10px] text-neutral-300">
                    <p className="font-medium text-white">Euloge HOUESSOU</p>
                    <p className="text-neutral-400 text-[9px]">Antwerp, Belgium</p>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden border border-neutral-800 shadow-lg flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-iridescent scale-150 transform -rotate-12 opacity-95" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
