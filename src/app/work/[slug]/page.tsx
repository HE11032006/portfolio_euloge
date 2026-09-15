import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import TextReveal from "@/components/text-reveal";
import { ShutterTitle } from "@/components/ui/shutter-title";
import type { Project } from "@/lib/content-types";
import projectData from "../../../../content/projects.json";

const projects = projectData as Project[];

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) notFound();

  const project = projects[index];
  const nextProject = projects.length > 1 ? projects[(index + 1) % projects.length] : null;
  const sections = [
    ["Problème", project.problem],
    ["Solution", project.solution],
    ["Pour qui", project.audience],
    ["Comment on le résout", project.resolution],
    ["Stack", project.stack],
  ] as const;

  return (
    <article className="surface-light project-article">
      <div className="project-article__layout">
        <aside className="project-article__side project-article__side--back">
          <Link href="/work" className="project-article__action">
            <HoverBorderGradient as="span" containerClassName="certs__gradient-btn" className="certs__gradient-content" duration={1.8}>
              <ArrowLeft aria-hidden="true" /><span>Retour</span>
            </HoverBorderGradient>
          </Link>
        </aside>

        <div className="project-article__content">
          <div>
            <p className="type-meta project-article__crumb"><span>Projets</span><span>/</span><span>{project.title}</span></p>
            <h1 className="type-display"><ShutterTitle text={project.title} /></h1>
            <p className="type-sub">{project.shortDescription}</p>
            <p className="project-article__meta">{project.year} · {project.category}</p>
          </div>

          <TextReveal delay={0.08}>
            <img className="project-article__cover" src={project.image} alt="" />
          </TextReveal>

          <div className="project-article__body">
            {sections.map(([heading, body], sectionIndex) => (
              <TextReveal key={heading} delay={0.04 * sectionIndex}>
                <section><h2 className="type-title">{heading}</h2><p className="type-body">{body}</p></section>
              </TextReveal>
            ))}

            {nextProject && (
              <div className="project-article__links">
                <Link href={`/work/${nextProject.slug}`} className="project-article__action">
                  <HoverBorderGradient as="span" containerClassName="certs__gradient-btn" className="certs__gradient-content" duration={1.8}>
                    <span>Projet suivant · {nextProject.title}</span><ArrowRight aria-hidden="true" />
                  </HoverBorderGradient>
                </Link>
              </div>
            )}
          </div>
        </div>

        <aside className="project-article__side project-article__external-actions">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-article__action">
              <HoverBorderGradient as="span" containerClassName="certs__gradient-btn" className="certs__gradient-content" duration={1.8}>
                <span>Live demo</span><ArrowUpRight aria-hidden="true" />
              </HoverBorderGradient>
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-article__action">
              <HoverBorderGradient as="span" containerClassName="certs__gradient-btn" className="certs__gradient-content" duration={1.8}>
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                <span>GitHub</span>
              </HoverBorderGradient>
            </a>
          )}
        </aside>
      </div>
    </article>
  );
}
