"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/content-types";
import projectData from "../../../content/projects.json";
import { ShutterTitle } from "@/components/ui/shutter-title";
import InteractiveListPreview from "@/components/ui/interactive-list-preview";
import { useLocale } from "@/components/locale-provider";
import { localized, type Locale } from "@/lib/i18n-core";

const projects = projectData as Project[];
type ViewMode = "list" | "grid";

function ProjectImage({ project }: { project: Project }) {
  return project.image ? (
    <img src={project.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-[#e8e4dc] text-4xl text-[#8a8379]" aria-hidden="true">
      <span>HE</span>
    </div>
  );
}

function ProjectGrid({
  items,
  locale,
  href,
  className,
}: {
  items: Project[];
  locale: Locale;
  href: (path: string) => string;
  className?: string;
}) {
  return (
    <section className={className}>
      {items.map((project, index) => (
        <motion.article
          key={project.slug}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, delay: index * 0.04 }}
        >
          <Link href={href(`/work/${project.slug}`)} className="group block">
            <div className="aspect-[4/3] overflow-hidden rounded-xl border border-black/10 bg-black/5 transition group-hover:border-black/30">
              <ProjectImage project={project} />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm font-medium text-[#171717] transition-colors group-hover:text-black">{localized(project.title, locale)}</span>
              <span className="font-mono text-xs text-[#77716a]">{project.year}</span>
            </div>
            <p className="mt-1 text-xs leading-snug text-[#5c5852]">{localized(project.shortDescription, locale)}</p>
          </Link>
        </motion.article>
      ))}
    </section>
  );
}

export default function WorkPage() {
  const { locale, t, href } = useLocale();
  const [view, setView] = useState<ViewMode>("list");
  const [activeFilter, setActiveFilter] = useState<string>(t.common.all);
  const categories = useMemo(
    () => [t.common.all, ...Array.from(new Set(projects.map((p) => localized(p.category, locale))))],
    [locale, t.common.all],
  );

  const filtered = useMemo(
    () => (activeFilter === t.common.all ? projects : projects.filter((p) => localized(p.category, locale) === activeFilter)),
    [activeFilter, locale, t.common.all],
  );

  const listItems = useMemo(
    () => filtered.map((project) => ({
      client: localized(project.title, locale),
      platform: localized(project.category, locale),
      services: localized(project.shortDescription, locale),
      year: project.year,
      img: project.image || "/textures/bg-dark.png",
      href: href(`/work/${project.slug}`),
    })),
    [filtered, href, locale],
  );

  return (
    <div className="surface-light relative min-h-screen font-sans antialiased">
      <div className="page-start w-full pb-20">
        <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38 }} className="mb-12">
          <h1 className="type-display"><ShutterTitle text={t.work.title} /></h1>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.34, delay: 0.06 }}
          className="flex flex-col justify-between gap-4 border-b border-black/10 pb-4 md:flex-row md:items-center"
        >
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                className={`rounded-md px-3.5 py-1.5 text-[11px] transition-colors ${
                  activeFilter === category
                    ? "bg-[#111] font-medium text-[#f2f0ec]"
                    : "border border-black/10 bg-white/45 text-[#5c5852] hover:text-black"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-1.5 text-xs md:flex">
            <button
              type="button"
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
              className={`rounded-md px-3.5 py-1.5 text-[11px] transition-colors ${
                view === "list" ? "bg-[#111] font-medium text-[#f2f0ec]" : "text-[#6a6762] hover:text-black"
              }`}
            >
              List
            </button>
            <button
              type="button"
              aria-pressed={view === "grid"}
              onClick={() => setView("grid")}
              className={`rounded-md px-3.5 py-1.5 text-[11px] transition-colors ${
                view === "grid" ? "bg-[#111] font-medium text-[#f2f0ec]" : "text-[#6a6762] hover:text-black"
              }`}
            >
              Grid
            </button>
          </div>
        </motion.section>

        {!filtered.length ? (
          <p className="content-empty">{t.common.noProjects}</p>
        ) : (
          <>
            <ProjectGrid
              items={filtered}
              locale={locale}
              href={href}
              className="mb-28 mt-8 grid grid-cols-1 gap-6 md:hidden"
            />

            <div className="hidden md:block">
              <AnimatePresence mode="wait">
                {view === "list" ? (
                  <motion.section
                    key={`list-${activeFilter}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="work-list-section mt-2 mb-28 w-full"
                  >
                    <InteractiveListPreview
                      items={listItems}
                      bgColor="transparent"
                      imageSize={1}
                      theme="light"
                      duration={0.44}
                      smoothness={0.26}
                      lerp={0.24}
                      className="work-list-preview"
                    />
                  </motion.section>
                ) : (
                  <motion.section
                    key={`grid-${activeFilter}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <ProjectGrid
                      items={filtered}
                      locale={locale}
                      href={href}
                      className="mb-28 mt-8 grid grid-cols-2 gap-6 lg:grid-cols-3"
                    />
                  </motion.section>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
