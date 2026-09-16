"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, BadgeCheck, Eye } from "lucide-react";
import type { Certification, CertificationKind } from "@/lib/content-types";
import certificationData from "../../../content/certifications.json";
import { ShutterTitle } from "@/components/ui/shutter-title";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import CertificationViewer from "@/components/certification-viewer";

type Filter = "all" | CertificationKind;
const certifications = certificationData as Certification[];

export default function CertificationsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<Certification | null>(null);

  const items = useMemo(
    () => (filter === "all" ? certifications : certifications.filter((item) => item.kind === filter)),
    [filter],
  );

  return (
    <div className="certs-page">
      <Link href="/about" className="certs-page__back">
        <HoverBorderGradient as="span" containerClassName="certs__gradient-btn" className="certs__gradient-content" duration={1.8}>
          <ArrowLeft aria-hidden="true" />
          <span>Retour</span>
        </HoverBorderGradient>
      </Link>

      <header className="certs-page__header">
        <h1><ShutterTitle text="Toutes les certifications" /></h1>
        <p>Descriptions, notions, dates d’obtention et preuves visuelles.</p>
      </header>

      <div className="certs-page__filters" role="tablist" aria-label="Filtrer">
        {(
          [
            ["all", "Tout"],
            ["certification", "Certification"],
            ["specialization", "Spécialisation"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={filter === value}
            className={filter === value ? "is-active" : ""}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="certs-page__grid">
        {items.length === 0 && <p className="content-empty">Aucune certification dans cette catégorie.</p>}
        {items.map((cert) => (
          <article key={cert.id} className="certs-page__card">
            <button type="button" className="certs-page__thumb" onClick={() => setOpen(cert)}>
              <img src={cert.certificateImage || cert.logo} alt="" />
            </button>
            <div className="certs-page__body">
              <em>{cert.kind === "specialization" ? "Spécialisation" : "Certification"}</em>
              <h2>{cert.title}</h2>
              <p>{cert.subtitle}</p>
              <dl>
                {cert.issuer && <div>
                  <dt>Émetteur</dt>
                  <dd>{cert.issuer}</dd>
                </div>}
                {cert.obtainedAt && <div>
                  <dt>Obtenue</dt>
                  <dd>{cert.obtainedAt}</dd>
                </div>}
              </dl>
              <h3>Points clés</h3>
              <ul>
                {cert.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="certs-page__actions">
                {cert.certificateImage && (
                  <HoverBorderGradient
                    as="button"
                    onClick={() => setOpen(cert)}
                    containerClassName="certs__gradient-btn"
                    className="certs__gradient-content"
                    duration={1.6}
                  >
                    <Eye aria-hidden="true" />
                    <span>Voir le certificat</span>
                  </HoverBorderGradient>
                )}
                {cert.verifyUrl && (
                  <a href={cert.verifyUrl} target="_blank" rel="noreferrer">
                    <HoverBorderGradient as="span" containerClassName="certs__gradient-btn" className="certs__gradient-content" duration={1.6}>
                      <BadgeCheck aria-hidden="true" />
                      <span>Vérifier</span>
                    </HoverBorderGradient>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <AnimatePresence>
        {open && <CertificationViewer cert={open} certifications={certifications} onClose={() => setOpen(null)} onSelect={setOpen} />}
      </AnimatePresence>
    </div>
  );
}
