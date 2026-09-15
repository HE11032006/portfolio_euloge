"use client";

import { use } from "react";
import Link from "next/link";
import TextReveal from "@/components/text-reveal";

type CaseStudy = {
  title: string;
  tagline: string;
  role: string;
  client: string;
  year: string;
  stack: string;
  siteUrl: string;
  image?: string;
  sections: { heading: string; body: string; items?: string[] }[];
};

const caseStudies: Record<string, CaseStudy> = {
  "113-spring": {
    title: "113 Spring",
    tagline:
      "Thème Shopify sur mesure pour une marque confidentielle : modulaire, calme, pensé pour durer.",
    role: "Designer & Developer",
    client: "Bundl / 113 Spring",
    year: "2026",
    stack: "Shopify, TypeScript, Tailwind",
    siteUrl: "https://113spring.com",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80",
    sections: [
      {
        heading: "Problème",
        body: "La marque avait besoin d’un e-commerce qui ne ressemble pas à un e-commerce. Identité retenue, blanc, scrolls éditoriaux. Les thèmes Shopify standards poussent l’urgence. Rien de ça ne tenait.",
      },
      {
        heading: "Solution",
        body: "Un thème écrit en Liquid, par sections. L’éditeur ne voit que les contrôles utiles. Chaque bloc est une paire template + schéma.",
        items: [
          "24 blocs configurables",
          "Images full-bleed, chargement tardif",
          "Échelle typo calée sur le print",
          "Panier et recherche sans casser la lecture",
        ],
      },
      {
        heading: "Mise en œuvre",
        body: "Trois temps : tokens et API de sections, puis templates PDP / PLP / contenu, puis perf (images, search, Lighthouse mobile).",
      },
      {
        heading: "Stack",
        body: "Shopify Online Store 2.0, Vite, TypeScript, Tailwind v4 branché sur les tokens de la marque.",
      },
    ],
  },
  oleus: {
    title: "OLEUS",
    tagline: "Thème Shopify et design system pour la marque d’huile d’olive premium de Nestlé.",
    role: "Designer & Developer",
    client: "Bundl / Nestlé",
    year: "2025",
    stack: "Shopify, TypeScript, Tailwind",
    siteUrl: "https://oleus.com",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    sections: [
      {
        heading: "Enjeu",
        body: "Un storefront D2C premium : provenance, qualité, terroir — tout en convertissant comme une boutique.",
      },
      {
        heading: "Approche",
        body: "Thème OS 2.0 from scratch. Identité (terre cuite, photo éditoriale, typo retenue) et autonomie des éditeurs.",
      },
      {
        heading: "Résultat",
        body: "L’équipe Nestlé lance pages et collections sans développeur. 94 Lighthouse mobile au lancement.",
      },
    ],
  },
};

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const study = caseStudies[slug] ?? caseStudies["113-spring"];

  return (
    <article className="surface-light project-article">
      <TextReveal>
        <p className="type-meta project-article__crumb">
          <Link href="/work">Projets</Link>
          <span>/</span>
          <span>{study.title}</span>
        </p>
        <h1 className="type-display">{study.title}</h1>
        <p className="type-sub">{study.tagline}</p>
        <p className="project-article__meta">
          {study.year} · {study.role} · {study.client}
        </p>
      </TextReveal>

      {study.image && (
        <TextReveal delay={0.08}>
          <img className="project-article__cover" src={study.image} alt="" />
        </TextReveal>
      )}

      <div className="project-article__body">
        {study.sections.map((section, index) => (
          <TextReveal key={section.heading} delay={0.04 * index}>
            <section>
              <h2 className="type-title">{section.heading}</h2>
              <p className="type-body">{section.body}</p>
              {section.items && (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          </TextReveal>
        ))}

        <p className="project-article__links">
          <a href={study.siteUrl} target="_blank" rel="noreferrer">
            Voir le site ↗
          </a>
          <Link href="/work">← Tous les projets</Link>
        </p>
      </div>
    </article>
  );
}
