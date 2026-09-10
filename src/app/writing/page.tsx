"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  cardBg: string;
  cardAccent: string;
  cardText: string;
}

const articles: Article[] = [
  {
    slug: "agentic-ai-era",
    title: "The Agentic AI Era: From Chatbots to Autonomous Multi-Agent Workflows",
    excerpt: "How multi-agent AI systems replace human-in-the-loop processes in 2026 — orchestration patterns, business impact, and a step-by-step implementation playbook.",
    date: "May 4, 2026",
    readTime: "8 min read",
    category: "Orchestration",
    cardBg: "#000000",
    cardAccent: "#d4ff33",
    cardText: "AGENTIC\nAI.",
  },
  {
    slug: "second-brain",
    title: "Switching my second brain: Obsidian, Claude Code, and Knowledge Systems",
    excerpt: "How I rebuilt my personal knowledge system using AI-native tools and why the shift from traditional note-taking to agentic retrieval changes everything.",
    date: "April 15, 2026",
    readTime: "6 min read",
    category: "Product",
    cardBg: "#e3e2de",
    cardAccent: "#000000",
    cardText: "SECOND\nBRAIN.",
  },
  {
    slug: "venture-building-bundl",
    title: "What venture building at Bundl actually is",
    excerpt: "A candid look inside the venture studio model — how we take a corporate client's challenge and turn it into a validated, shipped digital product in weeks.",
    date: "March 8, 2026",
    readTime: "5 min read",
    category: "Getting Started",
    cardBg: "#d4ff33",
    cardAccent: "#000000",
    cardText: "VENTURE\nBUILD.",
  },
];

const categories = ["ALL", "CHAIN ABSTRACTION", "GETTING STARTED", "ORCHESTRATION", "PRODUCT", "TECHNOLOGY"];

export default function WritingPage() {
  return (
    <div className="bg-[#0c0b0a] text-[#ededeb] font-sans antialiased min-h-screen relative overflow-x-hidden selection:bg-[#d4ff33] selection:text-black">

      <div className="w-full px-6 sm:px-10 lg:px-16 pt-24 pb-24">

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-baseline gap-4">
            <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter uppercase text-white font-sans">
              BLOG
            </h1>
            <span className="text-2xl sm:text-4xl text-[#8b8a87] font-serif-italic">Thoughts & Systems</span>
          </div>
          <p className="text-[#8b8a87] text-sm mt-2 max-w-xl">
            Articles, architecture breakdowns, and notes on autonomous agents, venture design, and modern front-end engineering.
          </p>
        </motion.div>

        {/* Layout: Sidebar + Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Sidebar categories */}
          <aside className="lg:col-span-2 flex flex-row lg:flex-col flex-wrap gap-4 text-[12px] font-bold tracking-wider uppercase border-b lg:border-b-0 border-[#232220] pb-6 lg:pb-0">
            {categories.map((cat, i) => (
              <a
                key={cat}
                href="#"
                className={`transition ${
                  i === 0
                    ? "text-white underline underline-offset-8 decoration-2 decoration-white"
                    : "text-[#71706c] hover:text-white"
                }`}
              >
                {cat}
              </a>
            ))}
          </aside>

          {/* Articles grid */}
          <div className="lg:col-span-10 flex flex-col gap-16">
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {articles.map((article, i) => (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col justify-between group"
                >
                  <div>
                    {/* Card visual */}
                    <Link href={`/writing/${article.slug}`}>
                      <div
                        className="relative w-full aspect-[16/11] rounded-lg p-6 flex flex-col justify-between overflow-hidden shadow-md group-hover:border-[#383734] transition border"
                        style={{ backgroundColor: article.cardBg, borderColor: "#232220" }}
                      >
                        <span
                          className="text-[9px] font-mono tracking-widest uppercase font-semibold"
                          style={{ color: article.cardAccent }}
                        >
                          {article.category.toUpperCase()}
                        </span>

                        {/* SVG diagram for Agentic AI */}
                        {i === 0 && (
                          <div className="absolute right-6 top-6 w-32 h-32 flex items-center justify-center opacity-90">
                            <svg className="w-full h-full" fill="none" stroke="#d4ff33" strokeWidth="1.2" viewBox="0 0 120 120">
                              <circle cx="60" cy="60" fill="#d4ff33" r="12" stroke="none" />
                              <line x1="60" x2="60" y1="60" y2="15" /><circle cx="60" cy="15" fill="#000" r="5" stroke="#d4ff33" strokeWidth="1.5" />
                              <line x1="60" x2="100" y1="60" y2="35" /><circle cx="100" cy="35" fill="#000" r="5" stroke="#d4ff33" strokeWidth="1.5" />
                              <line x1="60" x2="98" y1="60" y2="85" /><circle cx="98" cy="85" fill="#000" r="5" stroke="#d4ff33" strokeWidth="1.5" />
                              <line x1="60" x2="60" y1="60" y2="105" /><circle cx="60" cy="105" fill="#000" r="5" stroke="#d4ff33" strokeWidth="1.5" />
                              <line x1="60" x2="22" y1="60" y2="85" /><circle cx="22" cy="85" fill="#000" r="5" stroke="#d4ff33" strokeWidth="1.5" />
                              <line x1="60" x2="25" y1="60" y2="35" /><circle cx="25" cy="35" fill="#000" r="5" stroke="#d4ff33" strokeWidth="1.5" />
                            </svg>
                          </div>
                        )}

                        <div className="mt-auto z-10">
                          <h2
                            className="text-3xl font-extrabold leading-none tracking-tight"
                            style={{ color: article.cardAccent }}
                          >
                            {article.cardText.split("\n").map((line, li) => (
                              <span key={li}>{line}{li < article.cardText.split("\n").length - 1 && <br />}</span>
                            ))}
                          </h2>
                          <span
                            className="text-[7px] font-mono tracking-widest uppercase block mt-3"
                            style={{ color: article.cardAccent, opacity: 0.6 }}
                          >
                            EULOGE HOUESSOU
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Meta */}
                    <div className="mt-5 space-y-2.5">
                      <time className="text-[12px] font-extrabold uppercase tracking-wider text-[#73726e]">
                        {article.date.toUpperCase()}
                      </time>
                      <h3 className="text-lg font-bold leading-snug text-white group-hover:text-[#d4ff33] transition">
                        {article.title}
                      </h3>
                      <p className="text-[13px] leading-relaxed text-[#9a9994]">{article.excerpt}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      href={`/writing/${article.slug}`}
                      className="inline-flex items-center justify-center px-6 py-2.5 bg-[#d4ff33] text-black font-extrabold text-[11px] tracking-wider uppercase rounded-full hover:bg-white transition-all active:scale-95 shadow-sm"
                    >
                      READ MORE
                    </Link>
                  </div>
                </motion.article>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
