"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const TABS = [
  { id: "parcours", label: "Parcours" },
  { id: "stack", label: "Stack" },
  { id: "recompenses", label: "Récompenses" },
  { id: "infos", label: "Infos" },
] as const;

const EXPAND_END = 0.18;

const parcours = [
  {
    role: "Lead Solutions Architect & Fractional CTO",
    org: "Advisory indépendant",
    period: "2022 — Présent",
    desc: "Architectures distribuées, pipelines temps réel et conformité cloud pour scale-ups.",
  },
  {
    role: "Senior Full-Stack & Cloud Systems",
    org: "Tech Ventures",
    period: "2020 — 2022",
    desc: "Latence critique réduite, plateformes microservices mises à l’échelle.",
  },
  {
    role: "Lead Digital Systems Engineer",
    org: "Enterprise Digital Labs",
    period: "2017 — 2020",
    desc: "Socles multi-tenant banque et télécom, transformation numérique.",
  },
];

const stacks = [
  { cat: "Architecture", items: "Node.js, TypeScript, Go, GraphQL, gRPC, Kafka" },
  { cat: "Cloud", items: "AWS, GCP, Kubernetes, Terraform, CI/CD" },
  { cat: "Interfaces", items: "Next.js, React, Tailwind, Motion, Three.js" },
  { cat: "Data", items: "PostgreSQL, Redis, Vector DB, Elasticsearch" },
];

const awards = [
  { stat: "99.99%", title: "Uptime", desc: "Plateformes critiques, haute résilience." },
  { stat: "+15M", title: "Req / jour", desc: "APIs temps réel sans goulet." },
  { stat: "0", title: "Downtime", desc: "Migrations et déploiements continus." },
  { stat: "10+", title: "Années", desc: "Architecture, cloud, leadership produit." },
];

const infos = [
  { label: "Depuis", value: "2014" },
  { label: "Base", value: "Paris / Cotonou · Remote" },
  { label: "Focus", value: "Architecture, cloud, scale" },
  { label: "Statut", value: "Ouvert à l’advisory" },
];

function tabFromProgress(progress: number) {
  if (progress <= EXPAND_END) return 0;
  const t = (progress - EXPAND_END) / (1 - EXPAND_END);
  return Math.min(3, Math.floor(t * 4));
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
    const p = EXPAND_END + ((index + 0.12) / 4) * (1 - EXPAND_END);
    window.scrollTo({ top: el.offsetTop + p * track, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="about-pin">
      <div className="about-pin__sticky">
        <motion.div
          className="about-pin__card"
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
              <p className="about-pin__kicker">Parcours, stack et informations</p>
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
                  Je conçois des systèmes qui tiennent : clarté, performance, et une direction
                  artistique respectée jusqu’au détail.
                </p>
                <ul className="about-pin__list">
                  {parcours.map((item) => (
                    <li key={item.role}>
                      <div className="about-pin__row">
                        <strong>{item.role}</strong>
                        <span>{item.period}</span>
                      </div>
                      <p>
                        {item.org} — {item.desc}
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
                      <p>{item.items}</p>
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
                <ul className="about-pin__awards">
                  {awards.map((item) => (
                    <li key={item.title}>
                      <b>{item.stat}</b>
                      <strong>{item.title}</strong>
                      <p>{item.desc}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="about-pin__panel"
                animate={{ opacity: activeIndex === 3 ? 1 : 0 }}
                transition={{ duration: 0.35 }}
                style={{ pointerEvents: activeIndex === 3 ? "auto" : "none" }}
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
          </div>
        </motion.div>
      </div>
    </div>
  );
}
