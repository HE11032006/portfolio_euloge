"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/content-types";
import projectData from "../../../content/projects.json";
import { ShutterTitle } from "@/components/ui/shutter-title";

const projects = projectData as Project[];
const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];

export default function WorkPage() {
  return (
    <div className="surface-light min-h-screen font-sans antialiased relative">
      <div className="page-start w-full pb-20">
        <section className="mb-12">
          <h1 className="type-display"><ShutterTitle text="Projects" /></h1>
        </section>

        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="pb-4 border-b border-black/10">
          <div className="flex items-center flex-wrap gap-2 text-xs">
            {categories.map((category) => (
              <span
                key={category}
                className={`px-3.5 py-1.5 rounded-md text-[11px] ${category === "All" ? "bg-[#111] text-[#f2f0ec] font-medium" : "bg-white/45 text-[#5c5852] border border-black/10"}`}
              >
                {category}
              </span>
            ))}
          </div>
        </motion.section>

        {projects.length === 0 ? (
          <p className="content-empty">Aucun projet publié pour le moment.</p>
        ) : (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-28">
            {projects.map((project, index) => (
              <motion.article key={project.slug} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25, delay: index * 0.04 }}>
                <Link href={`/work/${project.slug}`} className="group block">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black/5 border border-black/10 group-hover:border-black/30 transition">
                    <img src={project.image} alt="" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[#171717] font-medium text-sm">{project.title}</span>
                    <span className="text-[#77716a] text-xs font-mono">{project.year}</span>
                  </div>
                  <p className="mt-1 text-[#5c5852] text-xs leading-snug">{project.shortDescription}</p>
                </Link>
              </motion.article>
            ))}
          </motion.section>
        )}
      </div>
    </div>
  );
}
