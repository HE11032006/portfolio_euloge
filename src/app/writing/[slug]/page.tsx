"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ArticleContent {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  sections: { heading?: string; body: string }[];
}

const articles: Record<string, ArticleContent> = {
  "agentic-ai-era": {
    slug: "agentic-ai-era",
    title: "The Agentic AI Era: From Chatbots to Autonomous Multi-Agent Workflows",
    subtitle: "In 2026 the conversation has shifted: humans no longer chat with AI — AI agents coordinate with one another to complete entire business processes end to end.",
    category: "Orchestration",
    date: "May 4, 2026",
    readTime: "8 min read",
    sections: [
      {
        body: "Generative AI moved fast, but it stayed conversational. You asked, it answered. In 2026 the value has migrated up the stack: instead of a single model in a single chat window, organisations deploy fleets of specialised agents that plan, delegate, call tools, hand off intermediate state, and finish multi-step jobs without human intervention.",
      },
      {
        heading: "What Makes an Agent Different?",
        body: "A language model generates text. An agent uses that text as a tool to take actions in the world — searching the web, writing and running code, calling APIs, reading and writing files, and spinning up sub-agents to parallelise subtasks. The critical shift is from input-output to a continuous goal-directed loop.",
      },
      {
        heading: "Orchestration Patterns",
        body: "Three patterns have emerged as de facto standards. The first is the Supervisor pattern: a single orchestrator agent decomposes a goal into subtasks and delegates each to a specialist. The second is Peer-to-peer handoff: agents pass structured state to each other in a chain without a central coordinator. The third is Event-driven mesh: agents subscribe to a shared event bus and self-select tasks based on capability.",
      },
      {
        heading: "Business Impact in Practice",
        body: "The teams shipping the most value today are not the ones with the largest models — they are the ones who invested in clean tool definitions, reliable state management, and observable agent traces. Velocity comes from system design, not model size.",
      },
      {
        heading: "A Step-by-Step Implementation Playbook",
        body: "Start with a single well-defined task that has clear inputs, clear success criteria, and a reversible failure mode. Instrument everything from day one — logs, traces, and evals. Expand the agent's autonomy incrementally only after the baseline is stable. Treat human approval as a dial you turn down gradually, not a switch you flip.",
      },
    ],
  },
  "second-brain": {
    slug: "second-brain",
    title: "Switching my second brain: Obsidian, Claude Code, and Knowledge Systems",
    subtitle: "How I rebuilt my personal knowledge system using AI-native tools and why the shift changes everything.",
    category: "Product",
    date: "April 15, 2026",
    readTime: "6 min read",
    sections: [
      {
        body: "For three years, Obsidian was my everything. Bidirectional links, plugins, graph view — I had built a beautiful, complex, personal wiki. Then I started using Claude Code daily and realised my second brain had become a liability: too much friction to write into, too hard to retrieve from.",
      },
      {
        heading: "The Problem with Traditional Note-Taking",
        body: "Traditional PKM assumes you will manually file, tag, and link every note. That assumption breaks down the moment you are moving fast. The cost of capture has to be near zero, or you simply stop capturing.",
      },
      {
        heading: "An AI-Native Knowledge System",
        body: "My current system is brutally simple: everything goes into a flat folder of markdown files. An MCP server indexes them and makes them retrievable via natural language. Claude retrieves relevant context on demand. The discipline is in the output, not the input.",
      },
    ],
  },
  "venture-building-bundl": {
    slug: "venture-building-bundl",
    title: "What venture building at Bundl actually is",
    subtitle: "A candid look inside the venture studio model.",
    category: "Getting Started",
    date: "March 8, 2026",
    readTime: "5 min read",
    sections: [
      {
        body: "When people hear 'venture studio', they picture a startup accelerator. Bundl is something different: a corporate venture builder. We sit inside large enterprises and help them launch new businesses, not invest in external ones.",
      },
      {
        heading: "The Typical Engagement",
        body: "A corporate client comes with a strategic challenge. Over eight to twelve weeks, we validate whether a new venture can solve it. That means customer discovery, rapid prototyping, a go-to-market hypothesis, and a working MVP — in sequence, at speed.",
      },
      {
        heading: "Where Design Engineering Fits",
        body: "The design engineer's job is to compress the distance between idea and artefact. When stakeholders can click through a real prototype — not a Figma file — the quality of the feedback changes entirely. That speed of materialisation is the core value I bring to every engagement.",
      },
    ],
  },
};

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const article = articles[slug] ?? articles["agentic-ai-era"];

  return (
    <div className="bg-[#0B0B0C] text-[#ECECEC] font-sans antialiased selection:bg-[#d4ff33] selection:text-black min-h-screen relative overflow-x-hidden">

      <article className="w-full max-w-3xl mx-auto px-6 sm:px-10 pt-28 md:pt-32 pb-24">

        {/* Article header */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono tracking-wider uppercase mb-6 text-[#8E8E93]">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <span>/</span>
            <Link href="/writing" className="hover:text-white transition-colors">BLOG</Link>
            <span>/</span>
            <span className="text-white">{article.category.toUpperCase()}</span>
          </div>

          {/* Meta pills */}
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#d4ff33] text-black font-mono font-bold text-[11px] px-2.5 py-1 tracking-wider uppercase rounded-sm">
              {article.category.toUpperCase()}
            </span>
            <span className="text-xs font-mono text-[#8E8E93] uppercase">{article.date.toUpperCase()}</span>
            <span className="text-[#242428] text-xs">•</span>
            <span className="text-xs font-mono text-[#8E8E93] uppercase">{article.readTime.toUpperCase()}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl md:text-[52px] font-black text-white leading-[1.05] tracking-tight mb-6"
            style={{ letterSpacing: "-0.035em", textTransform: "uppercase" }}
          >
            {article.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-neutral-400 font-light leading-relaxed max-w-3xl">
            {article.subtitle}
          </p>
        </motion.header>

        {/* Hero visual banner */}
        {article.slug === "agentic-ai-era" && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="my-10"
          >
            <div className="w-full aspect-[16/9] sm:aspect-[2/1] bg-black rounded-lg border border-white/10 p-6 sm:p-10 relative overflow-hidden flex flex-col justify-between shadow-2xl">
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#9FA0A6]">ORCHESTRATION</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 h-full my-auto z-10">
                <div className="flex flex-col justify-center">
                  <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#d4ff33] tracking-tight leading-[0.9]">
                    AGENTIC<br />AI.
                  </h2>
                </div>
                <div className="relative w-full h-48 sm:h-64 flex items-center justify-center">
                  <svg className="w-full h-full max-w-[280px] max-h-[280px]" fill="none" viewBox="0 0 240 240">
                    <line stroke="#D8FF34" strokeOpacity="0.8" strokeWidth="1.75" x1="120" x2="60" y1="120" y2="70" />
                    <line stroke="#D8FF34" strokeOpacity="0.8" strokeWidth="1.75" x1="120" x2="180" y1="120" y2="60" />
                    <line stroke="#D8FF34" strokeOpacity="0.8" strokeWidth="1.75" x1="120" x2="200" y1="120" y2="120" />
                    <line stroke="#D8FF34" strokeOpacity="0.8" strokeWidth="1.75" x1="120" x2="180" y1="120" y2="180" />
                    <line stroke="#D8FF34" strokeOpacity="0.8" strokeWidth="1.75" x1="120" x2="100" y1="120" y2="190" />
                    <line stroke="#D8FF34" strokeOpacity="0.8" strokeWidth="1.75" x1="120" x2="50" y1="120" y2="150" />
                    <circle cx="60" cy="70" fill="#0B0B0C" r="7" stroke="#D8FF34" strokeWidth="2" />
                    <circle cx="180" cy="60" fill="#0B0B0C" r="7" stroke="#D8FF34" strokeWidth="2" />
                    <circle cx="200" cy="120" fill="#0B0B0C" r="7" stroke="#D8FF34" strokeWidth="2" />
                    <circle cx="180" cy="180" fill="#0B0B0C" r="7" stroke="#D8FF34" strokeWidth="2" />
                    <circle cx="100" cy="190" fill="#0B0B0C" r="7" stroke="#D8FF34" strokeWidth="2" />
                    <circle cx="50" cy="150" fill="#0B0B0C" r="7" stroke="#D8FF34" strokeWidth="2" />
                    <circle className="pulse-node" cx="120" cy="120" fill="#D8FF34" r="16" style={{ filter: "drop-shadow(0 0 12px rgba(216, 255, 52, 0.45))" }} />
                  </svg>
                </div>
              </div>

              <div className="flex justify-end z-10">
                <span className="text-[9px] font-mono tracking-widest text-[#9FA0A6]">EULOGE HOUESSOU</span>
              </div>

              {/* Dot grid overlay */}
              <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
            </div>
          </motion.section>
        )}

        {/* Article body */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-neutral-300 text-[16px] sm:text-[17px] leading-[1.75] font-normal space-y-10 max-w-[720px] mx-auto pt-6"
        >
          {article.sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight">
                  {section.heading}
                </h2>
              )}
              <p>{section.body}</p>
            </div>
          ))}
        </motion.section>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-neutral-800">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors font-mono"
          >
            ← Back to Writing
          </Link>
        </div>
      </article>
    </div>
  );
}
