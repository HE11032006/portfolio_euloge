"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Certification, CertificationKind } from "@/lib/content-types";
import certificationData from "../../../content/certifications.json";
import { ShutterTitle } from "@/components/ui/shutter-title";

type Filter = "all" | CertificationKind;
const certifications = certificationData as Certification[];

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
        ← Retour
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
                <button type="button" onClick={() => setOpen(cert)}>
                  Voir l’image
                </button>
                )}
                {cert.verifyUrl && (
                <a href={cert.verifyUrl} target="_blank" rel="noreferrer">
                  Vérifier la certif ↗
                </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <AnimatePresence>
        {open && <CertModal cert={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </div>
  );
}
