"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, Eye } from "lucide-react";
import type { Certification } from "@/lib/content-types";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import TextReveal from "@/components/text-reveal";

function CertModal({
  cert,
  onClose,
}: {
  cert: Certification;
  onClose: () => void;
}) {
  return (
    <motion.div className="cert-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className="cert-modal__panel"
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 16, opacity: 0 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="cert-modal__close" onClick={onClose} aria-label="Fermer">
          ×
        </button>
        {cert.certificateImage && <img src={cert.certificateImage} alt={`Certificat ${cert.title}`} />}
        <div className="cert-modal__meta">
          {cert.issuer && <p>{cert.issuer}</p>}
          <h3>{cert.title}</h3>
          {cert.obtainedAt && <span>Obtenu en {cert.obtainedAt}</span>}
          {cert.verifyUrl && <a href={cert.verifyUrl} target="_blank" rel="noreferrer">Vérifier la certification ↗</a>}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CertificationsCarousel({ certifications }: { certifications: Certification[] }) {
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
          <h2 className="type-title">Professional Certifications</h2>
        </TextReveal>
        <TextReveal delay={0.08}>
          <p className="type-sub">
            Continuous learning and professional development through industry-leading bodies.
          </p>
        </TextReveal>
      </header>

      {certifications.length === 0 ? (
        <p className="content-empty">Aucune certification publiée pour le moment.</p>
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
          return (
            <article key={cert.id} className={`certs__card${dark ? " is-dark" : ""}`}>
              <div className="certs__card-top">
                <span className="certs__badge">
                  <img src={cert.logo} alt={`Logo ${cert.title}`} />
                </span>
                <em>{cert.kind === "specialization" ? "Spécialisation" : "Certification"}</em>
              </div>
              <h3>{cert.title}</h3>
              <p>{cert.subtitle}</p>
              <ul>
                {cert.points.map((point) => (
                  <li key={point}>{point}</li>
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
                  aria-label={`Voir le certificat ${cert.title}`}
                >
                  <Eye aria-hidden="true" />
                  <span>Voir le certificat</span>
                </HoverBorderGradient>
                )}
                {cert.verifyUrl && (
                <a
                  className="certs__action-link"
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Vérifier ${cert.title} sur le site de ${cert.issuer}`}
                >
                  <HoverBorderGradient
                    as="span"
                    containerClassName="certs__gradient-btn"
                    className="certs__gradient-content"
                    duration={1.6}
                  >
                    <BadgeCheck aria-hidden="true" />
                    <span>Vérifier</span>
                  </HoverBorderGradient>
                </a>
                )}
              </div>
            </article>
          );
        })}
        <aside className="certs__more">
          <p>La suite du parcours</p>
          <h3>Plus de certifications</h3>
          <span>Retrouvez toutes les certifications, spécialisations et preuves de validation.</span>
          <Link href="/certifications" className="certs__action-link">
            <HoverBorderGradient
              as="span"
              containerClassName="certs__gradient-btn certs__gradient-btn--all"
              className="certs__gradient-content"
              duration={1.8}
            >
              <span>Voir plus</span>
              <ArrowUpRight aria-hidden="true" />
            </HoverBorderGradient>
          </Link>
        </aside>
      </div>

      <div className="certs__toolbar">
        <Link href="/certifications" className="certs__action-link">
          <HoverBorderGradient
            as="span"
            containerClassName="certs__gradient-btn certs__gradient-btn--all"
            className="certs__gradient-content"
            duration={1.8}
          >
            <span>Voir toutes les certifications</span>
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
            aria-label="Certification précédente"
          >
            <ArrowLeft aria-hidden="true" />
          </HoverBorderGradient>
          <HoverBorderGradient
            as="button"
            onClick={() => scroll("right")}
            containerClassName="certs__gradient-btn certs__gradient-btn--icon"
            className="certs__gradient-content"
            duration={1.8}
            aria-label="Certification suivante"
          >
            <ArrowRight aria-hidden="true" />
          </HoverBorderGradient>
        </div>
      </div>
        </>
      )}

      <AnimatePresence>
        {open && <CertModal cert={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}
