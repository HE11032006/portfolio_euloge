"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import type { BlogPost } from "@/lib/content-types";
import postData from "../../../content/blog-posts.json";
import categoryData from "../../../content/blog-categories.json";
import { ShutterTitle } from "@/components/ui/shutter-title";

const posts = postData as BlogPost[];
const savedCategories = categoryData as string[];
const categories = ["All", ...Array.from(new Set([...savedCategories, ...posts.map((post) => post.category)]))];

export default function WritingPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? posts : posts.filter((post) => post.category === activeCategory);

  return (
    <div className="surface-dark text-[#ededeb] font-sans antialiased min-h-screen relative overflow-x-hidden selection:bg-[#f2f0ec] selection:text-black">
      <div className="page-start w-full pb-24">
        <header className="mb-14">
          <div className="flex items-baseline gap-4">
            <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter uppercase text-white"><ShutterTitle text="Blog" /></h1>
            <span className="text-2xl sm:text-4xl text-[#8b8a87] font-serif-italic">Thoughts & Systems</span>
          </div>
          <p className="text-[#8b8a87] text-sm mt-2 max-w-xl">Articles, architecture breakdowns, and notes on modern engineering.</p>
        </header>

        {posts.length === 0 ? (
          <p className="content-empty content-empty--dark">Aucun article publié pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <aside className="lg:col-span-2 flex flex-row lg:flex-col flex-wrap gap-4 text-[12px] font-bold tracking-wider uppercase border-b lg:border-b-0 border-white/10 pb-6 lg:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`w-fit cursor-pointer border-0 bg-transparent p-0 text-left transition ${
                    activeCategory === category ? "text-white underline underline-offset-8 decoration-2" : "text-[#777570] hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </aside>

            <section className="lg:col-span-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtered.map((post, index) => (
                <motion.article key={post.slug} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }} className="flex flex-col">
                  <Link href={`/writing/${post.slug}`} className="group">
                    <div className="aspect-[16/11] overflow-hidden rounded-lg border border-white/10 bg-[#151515]">
                      <img src={post.coverImage} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                    </div>
                    <div className="mt-5 space-y-2">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-[#777570]">{post.category} · {post.date} · {post.readTime}</p>
                      <h2 className="text-xl font-bold leading-snug text-white">{post.title}</h2>
                      <p className="text-[13px] leading-relaxed text-[#aaa7a1]">{post.shortDescription}</p>
                    </div>
                  </Link>
                  <div className="mt-auto pt-6">
                    <Link href={`/writing/${post.slug}`} className="inline-flex">
                      <HoverBorderGradient as="span" containerClassName="certs__gradient-btn" className="certs__gradient-content" duration={1.8}>
                        <span>Lire l’article</span><ArrowUpRight aria-hidden="true" />
                      </HoverBorderGradient>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
