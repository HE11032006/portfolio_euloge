"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Bot, Box, ChartBar, CodeXml, Cloud, Database, SearchCode, Sparkles, Workflow } from "lucide-react";
import {
  SiAndroidstudio, SiCloudflareworkers, SiDocker, SiElectron, SiFastapi, SiFlutter, SiGit, SiGithub,
  SiGithubactions, SiHuggingface, SiJupyter, SiLangchain, SiLunacy, SiMysql, SiNumpy,
  SiOnnx, SiOpencv, SiOpencode, SiPandas, SiPostgresql, SiPython, SiRust,
  SiScikitlearn, SiShell, SiSqlite, SiSupabase, SiTypescript, SiVuedotjs, SiNextdotjs, SiYaml,
} from "react-icons/si";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { useLocale } from "@/components/locale-provider";

const EXPAND_END = 0.18;

const STACK_GROUPS = [
  {
    id: "data", fr: "Ingénierie des données", en: "Data Engineering",
    items: [
      { fr: "ETL / ELT", en: "ETL / ELT", icon: Workflow },
      { fr: "Modélisation de données", en: "Data modeling", icon: Database },
    ],
  },
  {
    id: "database", fr: "Bases de données et stockage", en: "Databases & Storage",
    items: [
      { fr: "PostgreSQL", en: "PostgreSQL", icon: SiPostgresql },
      { fr: "MySQL", en: "MySQL", icon: SiMysql },
      { fr: "Supabase", en: "Supabase", icon: SiSupabase },
    ],
  },
  {
    id: "ia", fr: "Science des données & IA", en: "Data Science & AI",
    items: [
      { fr: "Python (Pandas, NumPy, scikit-learn, matplotlib)", en: "Python (Pandas, NumPy, scikit-learn, matplotlib)", icon: SiPython },
      { fr: "RAG", en: "RAG", icon: SiLangchain },
      { fr: "LLM", en: "LLM", icon: SiHuggingface },
      { fr: "Statistiques descriptives", en: "Descriptive statistics", icon: SiPython },
    ],
  },
  {
    id: "env", fr: "Environnement & CI/CD", en: "Environment & CI/CD",
    items: [
      { fr: "GitHub Actions", en: "GitHub Actions", icon: SiGithubactions },
      { fr: "Git", en: "Git", icon: SiGit },
      { fr: "Jupyter", en: "Jupyter", icon: SiJupyter },
    ],
  },
  {
    id: "fullstack", fr: "Développement Fullstack", en: "Fullstack Development",
    items: [
      { fr: "Flutter (Dart)", en: "Flutter (Dart)", icon: SiFlutter },
      { fr: "TypeScript (React, Next.js, Vue.js)", en: "TypeScript (React, Next.js, Vue.js)", icon: SiTypescript },
      { fr: "Tauri", en: "Tauri", icon: Box },
      { fr: "FastAPI", en: "FastAPI", icon: SiFastapi },
      { fr: "API REST", en: "API REST", icon: SearchCode },
      { fr: "Supabase", en: "Supabase", icon: SiSupabase },
      { fr: "Cloudflare Workers", en: "Cloudflare Workers", icon: SiCloudflareworkers },
      { fr: "Docker", en: "Docker", icon: SiDocker },
    ],
  },
] as const;

export default function AboutScrollyCard() {
  const { locale, t, href } = useLocale();
  const tabs = [
    { id: "academic", label: t.about.tabs.academic },
    { id: "experience", label: t.about.tabs.parcours },
    { id: "stack", label: t.about.tabs.stack },
    { id: "infos", label: t.about.tabs.infos },
  ] as const;

  const experience = locale === "fr"
    ? [
        { role: "Stagiaire, développement mobile", org: "GROWTH-IN · Stage", period: "Fév. 2026 à Avr. 2026", desc: "Développement d’applications Flutter en appliquant la Clean Architecture et le pattern MVVM." },
        { role: "Stagiaire, analyse de données", org: "SICASS-BENIN · Stage", period: "Déc. 2023 à Janv. 2024", desc: "Analyse de données de flux en milieu aéroportuaire, avec une attention particulière à la sécurité et à la rigueur des informations critiques." },
      ]
    : [
        { role: "Mobile development intern", org: "GROWTH-IN · Internship", period: "Feb. 2026 to Apr. 2026", desc: "Flutter application development applying Clean Architecture and the MVVM pattern." },
        { role: "Data analysis intern", org: "SICASS-BENIN · Internship", period: "Dec. 2023 to Jan. 2024", desc: "Analysis of airport traffic data, with particular attention to safety and the accuracy of critical information." },
      ];

  const academic = locale === "fr"
    ? [
        { role: "Licence Professionnelle en Réseaux, Informatique et Technologie - spécialité Génie logiciel", org: "École Supérieure de Gestion d’Informatique et de Science (ESGIS)", period: "2025 – aujourd’hui", desc: "École Supérieure de Gestion d’Informatique et de Science (ESGIS) : BAC + 3." },
        { role: "Cours Préparatoire", org: "Cours Préparatoire Père Aupiais (CPPA)", period: "sept. 2023 – juin 2025", desc: "Cours Préparatoire Père Aupiais (CPPA) : BAC + 2." },
      ]
    : [
        { role: "Professional Bachelor’s Degree in Networks, IT and Technology - Software Engineering", org: "École Supérieure de Gestion d’Informatique et de Science (ESGIS)", period: "2025 – present", desc: "École Supérieure de Gestion d’Informatique et de Science (ESGIS): BAC + 3." },
        { role: "Preparatory Course", org: "Cours Préparatoire Père Aupiais (CPPA)", period: "Sep. 2023 – Jun. 2025", desc: "Cours Préparatoire Père Aupiais (CPPA): BAC + 2." },
      ];

  const infos = [
    { label: t.about.infoLabels.base, value: t.about.infoValues.base },
    { label: t.about.infoLabels.focus, value: t.about.infoValues.focus },
    { label: t.about.infoLabels.availability, value: t.about.infoValues.availability },
  ];
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const expand = useSpring(useTransform(scrollYProgress, [0, EXPAND_END], [0, 1]), { stiffness: 120, damping: 28, mass: 0.4 });
  const inset = useTransform(expand, [0, 1], [40, 0]);
  const radius = useTransform(expand, [0, 1], [28, 0]);

  useEffect(() => scrollYProgress.on("change", (latest) => {
    if (latest <= EXPAND_END) setActiveIndex(0);
    else setActiveIndex(Math.min(tabs.length - 1, Math.floor(((latest - EXPAND_END) / (1 - EXPAND_END)) * tabs.length)));
  }), [scrollYProgress, tabs.length]);

  const scrollToTab = (index: number) => {
    const element = containerRef.current;
    if (!element) return;
    const track = element.offsetHeight - window.innerHeight;
    const progress = EXPAND_END + ((index + 0.12) / tabs.length) * (1 - EXPAND_END);
    window.scrollTo({ top: element.offsetTop + progress * track, behavior: "smooth" });
  };

  const panel = (index: number, children: ReactNode) => (
    <motion.div className="about-pin__panel" animate={{ opacity: activeIndex === index ? 1 : 0 }} transition={{ duration: 0.35 }} style={{ pointerEvents: activeIndex === index ? "auto" : "none" }}>
      {children}
    </motion.div>
  );

  return <div ref={containerRef} className="about-pin"><div className="about-pin__sticky"><motion.div className="about-pin__card" data-header-theme="dark" style={{ top: inset, right: inset, bottom: inset, left: inset, borderRadius: radius }}><div className="about-pin__inner"><aside className="about-pin__nav" aria-label={t.about.scrollyKicker}><p className="about-pin__kicker">{t.about.scrollyKicker}</p><div className="about-pin__tabs">{tabs.map((tab, index) => <button key={tab.id} type="button" className={`about-pin__tab${activeIndex === index ? " is-active" : ""}`} onClick={() => scrollToTab(index)}>{tab.label}</button>)}</div></aside><div className="about-pin__stage">
    {panel(0, <><p className="about-pin__lead">{t.about.academicLead}</p><ul className="about-pin__list">{academic.map((item) => <li key={item.role}><div className="about-pin__row"><strong>{item.role}</strong><span>{item.period}</span></div><p>{item.org} : {item.desc}</p></li>)}</ul></>)}
    {panel(1, <><p className="about-pin__lead">{t.about.experienceLead}</p><ul className="about-pin__list">{experience.map((item) => <li key={item.role}><div className="about-pin__row"><strong>{item.role}</strong><span>{item.period}</span></div><p>{item.org} : {item.desc}</p></li>)}</ul></>)}
    {panel(2, <ul className="about-pin__stack">{STACK_GROUPS.map((group) => <li key={group.id}><span>{locale === "fr" ? group.fr : group.en}</span><ul className="about-pin__skills">{group.items.map((item) => { const Icon = item.icon; return <li key={item.fr} className="about-pin__chip"><Icon aria-hidden="true" /><span>{locale === "fr" ? item.fr : item.en}</span></li>; })}</ul></li>)}</ul>)}
    {panel(3, <ul className="about-pin__infos">{infos.map((item) => <li key={item.label}><span>{item.label}</span><p>{item.value}</p></li>)}</ul>)}
  </div><Link href={href("/resume")} className="about-pin__cv"><HoverBorderGradient as="span" containerClassName="certs__gradient-btn" className="certs__gradient-content" duration={1.8}><span>{t.about.cv}</span><ArrowUpRight /></HoverBorderGradient></Link></div></motion.div></div></div>;
}
