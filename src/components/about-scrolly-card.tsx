"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const TABS = [
  { id: "parcours", label: "Parcours" },
  { id: "stack", label: "Stack" },
  { id: "infos", label: "Infos" },
] as const;

const EXPAND_END = 0.18;

const parcours = [
  {
    role: "Stagiaire, développement mobile",
    org: "GROWTH-IN · Stage",
    period: "Fév. 2026 à Avr. 2026",
    desc: "Développement d’applications Flutter en appliquant la Clean Architecture et le pattern MVVM.",
  },
  {
    role: "Stagiaire, analyse de données",
    org: "SICASS-BENIN · Stage",
    period: "Déc. 2023 à Janv. 2024",
    desc: "Analyse de données de flux en milieu aéroportuaire, avec une attention particulière à la sécurité et à la rigueur des informations critiques.",
  },
];

const stacks = [
  { cat: "Data engineering", items: ["Python", "ELT / ETL", "Modélisation de données", "FastAPI"] },
  { cat: "IA & machine learning", items: ["Recherche sémantique et RAG", "Traitement du langage naturel (NLP)", "Classification d’images", "Pandas", "NumPy", "scikit-learn", "Seaborn", "Statistiques descriptives"] },
  { cat: "Cloud & data", items: ["AWS Bedrock", "PostgreSQL", "Supabase", "SQLite", "Docker"] },
  { cat: "Software engineering", items: ["TypeScript", "Next.js", "Vue.js", "Flutter", "Electron", "Git", "GitHub Actions", "CI/CD", "Analyse statique"] },
  { cat: "Outils", items: ["VS Code", "Android Studio", "Jupyter Notebook", "OpenCode", "Manus AI", "Lunacy"] },
];

const infos = [
  { label: "Base", value: "Cotonou, Bénin" },
  { label: "Focus", value: "Machine learning · Développement web et mobile · Solutions informatiques" },
  { label: "Disponibilité", value: "Ouvert aux collaborations, projets et opportunités d’apprentissage" },
];

function tabFromProgress(progress: number) {
  if (progress <= EXPAND_END) return 0;
  const t = (progress - EXPAND_END) / (1 - EXPAND_END);
  return Math.min(TABS.length - 1, Math.floor(t * TABS.length));
}

export default function AboutScrollyCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const expand = useSpring(useTransform(scrollYProgress, [0, EXPAND_END], [0, 1]), {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  const inset = useTransform(expand, [0, 1], [40, 0]);
  const radius = useTransform(expand, [0, 1], [28, 0]);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setActiveIndex(tabFromProgress(latest));
    });
  }, [scrollYProgress]);

  const scrollToTab = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const track = el.offsetHeight - window.innerHeight;
    const p = EXPAND_END + ((index + 0.12) / TABS.length) * (1 - EXPAND_END);
    window.scrollTo({ top: el.offsetTop + p * track, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="about-pin">
      <div className="about-pin__sticky">
        <motion.div
          className="about-pin__card"
          data-header-theme="dark"
          style={{
            top: inset,
            right: inset,
            bottom: inset,
            left: inset,
            borderRadius: radius,
          }}
        >
          <div className="about-pin__inner">
            <aside className="about-pin__nav" aria-label="Sections">
              <p className="about-pin__kicker">Expériences, compétences et informations</p>
              <div className="about-pin__tabs">
                {TABS.map((tab, index) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`about-pin__tab${activeIndex === index ? " is-active" : ""}`}
                    onClick={() => scrollToTab(index)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </aside>

            <div className="about-pin__stage">
              <motion.div
                className="about-pin__panel"
                animate={{ opacity: activeIndex === 0 ? 1 : 0 }}
                transition={{ duration: 0.35 }}
                style={{ pointerEvents: activeIndex === 0 ? "auto" : "none" }}
              >
                <p className="about-pin__lead">
                  Mes premières expériences entre développement mobile et analyse de données.
                </p>
                <ul className="about-pin__list">
                  {parcours.map((item) => (
                    <li key={item.role}>
                      <div className="about-pin__row">
                        <strong>{item.role}</strong>
                        <span>{item.period}</span>
                      </div>
                      <p>
                        {item.org} : {item.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="about-pin__panel"
                animate={{ opacity: activeIndex === 1 ? 1 : 0 }}
                transition={{ duration: 0.35 }}
                style={{ pointerEvents: activeIndex === 1 ? "auto" : "none" }}
              >
                <ul className="about-pin__stack">
                  {stacks.map((item) => (
                    <li key={item.cat}>
                      <span>{item.cat}</span>
                      <p className="about-pin__skills">
                        {item.items.map((skill, index) => (
                          <span key={skill}>
                            {index > 0 && <i aria-hidden="true">•</i>}
                            {skill}
                          </span>
                        ))}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="about-pin__panel"
                animate={{ opacity: activeIndex === 2 ? 1 : 0 }}
                transition={{ duration: 0.35 }}
                style={{ pointerEvents: activeIndex === 2 ? "auto" : "none" }}
              >
                <ul className="about-pin__infos">
                  {infos.map((item) => (
                    <li key={item.label}>
                      <span>{item.label}</span>
                      <p>{item.value}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <a
              href="/CV_Euloge_HOUESSOU.pdf"
              target="_blank"
              rel="noreferrer"
              className="about-pin__cv"
            >
              <HoverBorderGradient
                as="span"
                containerClassName="certs__gradient-btn"
                className="certs__gradient-content"
                duration={1.8}
              >
                <span>Voir le CV</span>
                <ArrowUpRight aria-hidden="true" />
              </HoverBorderGradient>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
