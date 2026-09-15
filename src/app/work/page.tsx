"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import InteractiveListPreview from "@/components/ui/interactive-list-preview";

type Category = "All" | "Client" | "Lab" | "University";

interface Project {
  title: string;
  description: string;
  year: string;
  category: Exclude<Category, "All">;
  href: string;
  image: string;
}

const projects: Project[] = [
  { title: "OLEUS", description: "Shopify custom theme & design system for Nestlé", year: "2025", category: "Client", href: "/work/oleus", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80" },
  { title: "113 Spring", description: "Direct-to-consumer editorial storefront & reusable components", year: "2026", category: "Client", href: "/work/113-spring", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80" },
  { title: "Venture Design at Bundl", description: "Enterprise venture design case study & MVP strategy", year: "2025", category: "Client", href: "/work/bundl", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80" },
  { title: "Portfolio v1", description: "Interactive experimental personal portfolio in Webflow", year: "2025", category: "Lab", href: "/work/portfolio-v1", image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80" },
  { title: "Tesla in Blender", description: "High-fidelity 3D modeling and animation showcase", year: "2024", category: "University", href: "/work/tesla-blender", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80" },
  { title: "Mixbox", description: "Sound synthesizer & interactive audio hardware packaging", year: "2024", category: "University", href: "/work/mixbox", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80" },
  { title: "Larq Kickstarter", description: "Award-winning product launch campaign & visual design", year: "2024", category: "University", href: "/work/larq", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80" },
  { title: "Integration 3", description: "Full-stack web application development & interactive canvas", year: "2024", category: "University", href: "/work/integration-3", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80" },
  { title: "Conference Lotus", description: "Educational conference website & event design system", year: "2023", category: "University", href: "/work/conference-lotus", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80" },
  { title: "Lotus Education", description: "Campaign design for student savings platform", year: "2023", category: "University", href: "/work/lotus-education", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80" },
  { title: "Travel Match", description: "UX design for travel companion matching app", year: "2023", category: "University", href: "/work/travel-match", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80" },
  { title: "Pinball Machine", description: "Motion graphics & video production project", year: "2023", category: "University", href: "/work/pinball", image: "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&w=800&q=80" },
  { title: "Bug's Life", description: "Illustrated editorial one-pager about the beetle", year: "2022", category: "University", href: "/work/bugs-life", image: "https://images.unsplash.com/photo-1568565726891-52e48b41b7e8?auto=format&fit=crop&w=800&q=80" },
  { title: "Integration 1", description: "Web build — The Kung Fu for Your Mind", year: "2022", category: "University", href: "/work/integration-1", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80" },
];

const categories: Category[] = ["All", "Client", "Lab", "University"];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [view, setView] = useState<"list" | "grid">("list");

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="surface-light min-h-screen font-sans antialiased relative">

      <div className="page-start w-full pb-20">

        {/* Page title */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="type-display">Projects</h1>
        </motion.section>

        {/* Filters & View toggle */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row md:items-center justify-between pb-4 gap-4 border-b border-black/10"
        >
          {/* Filter tabs */}
          <div className="flex items-center gap-2 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-md text-[11px] transition-colors ${
                  activeFilter === cat
                    ? "bg-[#111] text-[#f2f0ec] font-medium"
                    : "bg-white/45 text-[#5c5852] hover:text-black border border-black/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setView("list")}
              className={`px-3.5 py-1.5 rounded-md text-[11px] transition-colors ${
                view === "list" ? "bg-[#111] text-[#f2f0ec] font-medium" : "text-[#6a6762] hover:text-black"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setView("grid")}
              className={`px-3.5 py-1.5 rounded-md text-[11px] transition-colors ${
                view === "grid" ? "bg-[#111] text-[#f2f0ec] font-medium" : "text-[#6a6762] hover:text-black"
              }`}
            >
              Grid
            </button>
          </div>
        </motion.section>

        {/* Works */}
        <AnimatePresence mode="wait">
          {view === "list" ? (
            <motion.section
              key={`list-${activeFilter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2 mb-28 w-full"
            >
              <InteractiveListPreview
                items={filtered.map((p) => ({
                  client: p.title,
                  platform: p.category,
                  services: p.description,
                  year: p.year,
                  img: p.image,
                  href: p.href,
                }))}
                bgColor="transparent"
                imageSize={1}
                theme="light"
              />
            </motion.section>
          ) : (
            <motion.section
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-28"
            >
              <AnimatePresence>
                {filtered.map((p, i) => (
                  <motion.div
                    key={p.title + p.year}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                  >
                    <Link href={p.href} className="group block">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black/5 border border-black/10 group-hover:border-black/30 transition">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[#171717] font-medium text-sm group-hover:text-black transition-colors">{p.title}</span>
                        <span className="text-[#77716a] text-xs font-mono">{p.year}</span>
                      </div>
                      <p className="mt-1 text-[#5c5852] text-xs leading-snug">{p.description}</p>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
