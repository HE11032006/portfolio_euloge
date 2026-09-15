"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import TextReveal from "@/components/text-reveal";

type CaseStudy = {
  title: string;
  tagline: string;
  role: string;
  client: string;
  year: string;
  stack: string;
  siteUrl?: string;
  githubUrl?: string;
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
    githubUrl: "https://github.com/HE11032006",
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
        heading: "Pour qui",
        body: "Pour une marque premium et son équipe éditoriale, avec des visiteurs qui attendent une expérience calme, lisible et rapide avant d’acheter.",
      },
      {
        heading: "Comment on le résout",
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
    githubUrl: "https://github.com/HE11032006",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    sections: [
      {
        heading: "Problème",
        body: "Un storefront D2C premium : provenance, qualité, terroir — tout en convertissant comme une boutique.",
      },
      {
        heading: "Solution",
        body: "Thème OS 2.0 from scratch. Identité (terre cuite, photo éditoriale, typo retenue) et autonomie des éditeurs.",
      },
      {
        heading: "Pour qui",
        body: "Pour les équipes e-commerce de Nestlé et les consommateurs qui veulent comprendre rapidement la provenance, la qualité et l’usage du produit.",
      },
      {
        heading: "Comment on le résout",
        body: "L’équipe Nestlé lance pages et collections sans développeur. 94 Lighthouse mobile au lancement.",
      },
      {
        heading: "Stack",
        body: "Shopify Online Store 2.0, Liquid, TypeScript, Tailwind et composants éditoriaux configurables.",
      },
    ],
  },
};

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const resolvedSlug = caseStudies[slug] ? slug : "113-spring";
  const study = caseStudies[resolvedSlug];
  const caseStudySlugs = Object.keys(caseStudies);
  const currentIndex = caseStudySlugs.indexOf(resolvedSlug);
  const nextSlug = caseStudySlugs[(currentIndex + 1) % caseStudySlugs.length];
  const nextStudy = caseStudies[nextSlug];

  return (
    <article className="surface-light project-article">
      <div className="project-article__layout">
        <aside className="project-article__side project-article__side--back">
          <Link href="/work" className="project-article__action">
            <HoverBorderGradient
              as="span"
              containerClassName="certs__gradient-btn"
              className="certs__gradient-content"
              duration={1.8}
            >
              <ArrowLeft aria-hidden="true" />
              <span>Retour</span>
            </HoverBorderGradient>
          </Link>
        </aside>

        <div className="project-article__content">
        <TextReveal>
          <p className="type-meta project-article__crumb">
            <span>Projets</span>
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

          <div className="project-article__links">
            <Link href={`/work/${nextSlug}`} className="project-article__action">
              <HoverBorderGradient
                as="span"
                containerClassName="certs__gradient-btn"
                className="certs__gradient-content"
                duration={1.8}
              >
                <span>Projet suivant · {nextStudy.title}</span>
                <ArrowRight aria-hidden="true" />
              </HoverBorderGradient>
            </Link>
          </div>
        </div>
      </div>

        <aside className="project-article__side project-article__external-actions">
          {study.siteUrl && (
            <a href={study.siteUrl} target="_blank" rel="noreferrer" className="project-article__action">
              <HoverBorderGradient
                as="span"
                containerClassName="certs__gradient-btn"
                className="certs__gradient-content"
                duration={1.8}
              >
                <span>Live demo</span>
                <ArrowUpRight aria-hidden="true" />
              </HoverBorderGradient>
            </a>
          )}
          {study.githubUrl && (
            <a href={study.githubUrl} target="_blank" rel="noreferrer" className="project-article__action">
              <HoverBorderGradient
                as="span"
                containerClassName="certs__gradient-btn"
                className="certs__gradient-content"
                duration={1.8}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </HoverBorderGradient>
            </a>
          )}
        </aside>
      </div>
    </article>
  );
}
