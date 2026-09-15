"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CERTIFICATIONS, type Certification, type CertKind } from "@/data/certifications";

type Filter = "all" | CertKind;

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
        <img src={cert.image} alt={`Certificat ${cert.title}`} />
        <div className="cert-modal__meta">
          <p>{cert.issuer}</p>
          <h3>{cert.title}</h3>
          <span>Obtenu en {cert.obtainedAt}</span>
          <a href={cert.verifyUrl} target="_blank" rel="noreferrer">
            Vérifier la certification ↗
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CertificationsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<Certification | null>(null);

  const items = useMemo(
    () => (filter === "all" ? CERTIFICATIONS : CERTIFICATIONS.filter((item) => item.kind === filter)),
    [filter],
  );

  return (
    <div className="certs-page">
      <Link href="/about" className="certs-page__back">
        ← Retour
      </Link>

      <header className="certs-page__header">
        <h1>Toutes les certifications</h1>
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
        {items.map((cert) => (
          <article key={cert.id} className="certs-page__card">
            <button type="button" className="certs-page__thumb" onClick={() => setOpen(cert)}>
              <img src={cert.image} alt="" />
            </button>
            <div className="certs-page__body">
              <em>{cert.kind === "specialization" ? "Spécialisation" : "Certification"}</em>
              <h2>{cert.title}</h2>
              <p>{cert.description}</p>
              <dl>
                <div>
                  <dt>Émetteur</dt>
                  <dd>{cert.issuer}</dd>
                </div>
                <div>
                  <dt>Obtenue</dt>
                  <dd>{cert.obtainedAt}</dd>
                </div>
              </dl>
              <h3>Notions acquises</h3>
              <ul>
                {cert.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
              <div className="certs-page__actions">
                <button type="button" onClick={() => setOpen(cert)}>
                  Voir l’image
                </button>
                <a href={cert.verifyUrl} target="_blank" rel="noreferrer">
                  Vérifier la certif ↗
                </a>
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
