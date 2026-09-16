"use client";

import { BadgeCheck, Eye, X } from "lucide-react";
import { motion } from "framer-motion";
import type { Certification } from "@/lib/content-types";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function CertificationViewer({ cert, certifications, onClose, onSelect }: { cert: Certification; certifications: Certification[]; onClose: () => void; onSelect: (certification: Certification) => void }) {
  const isSpecialization = cert.kind === "specialization";
  const containedIds = new Set(cert.containedCertificationIds || []);
  const contained = isSpecialization
    ? certifications.filter((item) => item.kind === "certification" && (containedIds.has(item.id) || item.specializationId === cert.id))
    : [];
  const specialization = !isSpecialization
    ? certifications.find((item) => item.kind === "specialization" && (item.id === cert.specializationId || (item.containedCertificationIds || []).includes(cert.id)))
    : undefined;

  return (
    <motion.div className="cert-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className={`cert-modal__panel${isSpecialization ? " cert-modal__panel--specialization" : ""}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="cert-modal__close" onClick={onClose} aria-label="Fermer">
          <X aria-hidden="true" />
        </button>

        <div className="cert-modal__media">
          {cert.certificateImage && <img src={cert.certificateImage} alt={`Certificat ${cert.title}`} />}
        </div>

        <aside className="cert-modal__meta">
          <em>{isSpecialization ? "Certificat de spécialisation" : "Certification"}</em>
          <h3>{cert.title}</h3>
          {cert.issuer && <p>{cert.issuer}</p>}
          {cert.obtainedAt && <span>Obtenue en {cert.obtainedAt}</span>}

          {isSpecialization && contained.length > 0 && (
            <section className="cert-modal__courses">
              <h4>Certificats de cours</h4>
              <p>Obtenus après avoir terminé chaque cours de la spécialisation.</p>
              <ul>
                {contained.map((course) => (
                  <li key={course.id}>
                    <div>
                      <strong>{course.title}</strong>
                      <span>{course.issuer}{course.obtainedAt ? ` · ${course.obtainedAt}` : ""}</span>
                    </div>
                    <button type="button" className="cert-modal__course-eye" onClick={() => onSelect(course)} aria-label={`Voir le certificat ${course.title}`}>
                      <Eye aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {!isSpecialization && specialization && (
            <section className="cert-modal__specialization">
              <span>Spécialisation</span>
              <strong>{specialization.title}</strong>
              <HoverBorderGradient as="button" onClick={() => onSelect(specialization)} containerClassName="certs__gradient-btn" className="certs__gradient-content" duration={1.6}>
                <Eye aria-hidden="true" />
                <span>Voir</span>
              </HoverBorderGradient>
            </section>
          )}

          {cert.verifyUrl && (
            <a className="cert-modal__verify" href={cert.verifyUrl} target="_blank" rel="noreferrer">
              <HoverBorderGradient as="span" containerClassName="certs__gradient-btn" className="certs__gradient-content" duration={1.6}>
                {isSpecialization ? <Eye aria-hidden="true" /> : <BadgeCheck aria-hidden="true" />}
                <span>{isSpecialization ? "Vérifier la spécialisation" : "Vérifier la certification"}</span>
              </HoverBorderGradient>
            </a>
          )}
        </aside>
      </motion.div>
    </motion.div>
  );
}
