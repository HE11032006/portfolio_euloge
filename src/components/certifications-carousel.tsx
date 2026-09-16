"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, Eye } from "lucide-react";
import type { Certification } from "@/lib/content-types";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import TextReveal from "@/components/text-reveal";
import CertificationViewer from "@/components/certification-viewer";
import { useLocale } from "@/components/locale-provider";
import { localized } from "@/lib/i18n-core";

export default function CertificationsCarousel({ certifications }: { certifications: Certification[] }) {
  const { locale, t, href } = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ pointerId: -1, startX: 0, scrollLeft: 0, moved: false });
  const suppressClickRef = useRef(false);
  const [open, setOpen] = useState<Certification | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: direction === "left" ? -360 : 360, behavior: "smooth" });
  };

  const startDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    if ((event.target as HTMLElement).closest("a, button")) return;

    const track = scrollRef.current;
    if (!track) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
      moved: false,
    };
    suppressClickRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const drag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = dragRef.current;
    if (state.pointerId !== event.pointerId || !scrollRef.current) return;

    const distance = event.clientX - state.startX;
    if (Math.abs(distance) > 4) state.moved = true;
    scrollRef.current.scrollLeft = state.scrollLeft - distance;
  };

  const stopDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current.pointerId !== event.pointerId) return;

    suppressClickRef.current = dragRef.current.moved;
    dragRef.current.pointerId = -1;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  };

  return (
    <section className="certs">
      <header className="certs__header">
        <TextReveal>
          <h2 className="type-title">{t.about.certifications}</h2>
        </TextReveal>
        <TextReveal delay={0.08}>
          <p className="type-sub">{t.about.certificationLead}</p>
        </TextReveal>
      </header>

      {!certifications.length ? (
        <p className="content-empty">{t.common.noCertifications}</p>
      ) : (
        <>
          <div
            ref={scrollRef}
            className={`certs__track${isDragging ? " is-dragging" : ""}`}
            onPointerDown={startDragging}
            onPointerMove={drag}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
            onClickCapture={(event) => {
              if (!suppressClickRef.current) return;
              event.preventDefault();
              event.stopPropagation();
              suppressClickRef.current = false;
            }}
          >
            {certifications.map((cert, index) => {
              const dark = Boolean(cert.featured) || index === 0;
              const title = localized(cert.title, locale);

              return (
                <article key={cert.id} className={`certs__card${dark ? " is-dark" : ""}`}>
                  <div className="certs__card-top">
                    <span className="certs__badge">
                      <img src={cert.logo} alt={`Logo ${title}`} />
                    </span>
                    <em>{cert.kind === "specialization" ? t.certifications.specialization : t.certifications.certification}</em>
                  </div>
                  <h3>{title}</h3>
                  <p>{localized(cert.subtitle, locale)}</p>
                  <ul>
                    {cert.points.map((point, pointIndex) => (
                      <li key={pointIndex}>{localized(point, locale)}</li>
                    ))}
                  </ul>
                  <div className="certs__card-actions">
                    {cert.certificateImage && (
                      <HoverBorderGradient
                        as="button"
                        onClick={() => setOpen(cert)}
                        containerClassName="certs__gradient-btn"
                        className="certs__gradient-content"
                        duration={1.6}
                        aria-label={`${t.certifications.viewCertificate} ${title}`}
                      >
                        <Eye aria-hidden="true" />
                        <span>{t.certifications.viewCertificate}</span>
                      </HoverBorderGradient>
                    )}
                    {cert.verifyUrl && (
                      <a
                        className="certs__action-link"
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${t.common.verify} ${title}`}
                      >
                        <HoverBorderGradient
                          as="span"
                          containerClassName="certs__gradient-btn"
                          className="certs__gradient-content"
                          duration={1.6}
                        >
                          <BadgeCheck aria-hidden="true" />
                          <span>{t.common.verify}</span>
                        </HoverBorderGradient>
                      </a>
                    )}
                  </div>
                </article>
              );
            })}

            <aside className="certs__more">
              <p>{locale === "fr" ? "La suite du parcours" : "More from the journey"}</p>
              <h3>{locale === "fr" ? "Plus de certifications" : "More certifications"}</h3>
              <span>
                {locale === "fr"
                  ? "Retrouvez toutes les certifications, spécialisations et preuves de validation."
                  : "Browse all certifications, specializations, and verification links."}
              </span>
              <Link href={href("/certifications")} className="certs__action-link">
                <HoverBorderGradient
                  as="span"
                  containerClassName="certs__gradient-btn certs__gradient-btn--all"
                  className="certs__gradient-content"
                  duration={1.8}
                >
                  <span>{t.common.view}</span>
                  <ArrowUpRight aria-hidden="true" />
                </HoverBorderGradient>
              </Link>
            </aside>
          </div>

          <div className="certs__toolbar">
            <Link href={href("/certifications")} className="certs__action-link">
              <HoverBorderGradient
                as="span"
                containerClassName="certs__gradient-btn certs__gradient-btn--all"
                className="certs__gradient-content"
                duration={1.8}
              >
                <span>{t.common.allCertifications}</span>
                <ArrowUpRight aria-hidden="true" />
              </HoverBorderGradient>
            </Link>
            <div className="certs__arrows">
              <HoverBorderGradient
                as="button"
                onClick={() => scroll("left")}
                containerClassName="certs__gradient-btn certs__gradient-btn--icon"
                className="certs__gradient-content"
                duration={1.8}
                aria-label={locale === "fr" ? "Certification précédente" : "Previous certification"}
              >
                <ArrowLeft aria-hidden="true" />
              </HoverBorderGradient>
              <HoverBorderGradient
                as="button"
                onClick={() => scroll("right")}
                containerClassName="certs__gradient-btn certs__gradient-btn--icon"
                className="certs__gradient-content"
                duration={1.8}
                aria-label={locale === "fr" ? "Certification suivante" : "Next certification"}
              >
                <ArrowRight aria-hidden="true" />
              </HoverBorderGradient>
            </div>
          </div>
        </>
      )}

      <AnimatePresence>
        {open && (
          <CertificationViewer
            cert={open}
            certifications={certifications}
            onClose={() => setOpen(null)}
            onSelect={setOpen}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
