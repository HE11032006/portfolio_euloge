"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDownToLine, ArrowLeft, ArrowUpRight } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ShutterTitle } from "@/components/ui/shutter-title";
import { useLocale } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n-core";

const cvFiles: Record<Locale, { href: string; fileName: string }> = {
  fr: { href: "/euloge_cv.pdf", fileName: "euloge_cv.pdf" },
  en: { href: "/english_euloge_cv.pdf", fileName: "english_euloge_cv.pdf" },
};

export default function ResumePage() {
  const { locale, t, href } = useLocale();
  const [cvLocale, setCvLocale] = useState<Locale>(locale);
  const cv = cvFiles[cvLocale];

  useEffect(() => {
    setCvLocale(locale);
  }, [locale]);

  return (
    <main className="surface-dark resume-cv">
      <div className="page-start resume-cv__content">
        <Link href={href("/about")} className="resume-cv__back">
          <HoverBorderGradient as="span" containerClassName="certs__gradient-btn" className="certs__gradient-content" duration={1.8}>
            <ArrowLeft />
            <span>{t.common.back}</span>
          </HoverBorderGradient>
        </Link>
        <header className="resume-cv__header">
          <p className="type-meta">{t.resume.meta}</p>
          <h1 className="type-display">
            <ShutterTitle text={t.resume.title} />
          </h1>
          <p className="type-sub">{t.resume.description}</p>
        </header>
        <div className="resume-cv__language" role="group" aria-label={t.resume.language}>
          <span>{t.resume.language}</span>
          <button type="button" className={cvLocale === "fr" ? "is-active" : ""} onClick={() => setCvLocale("fr")}>
            {t.resume.fr}
          </button>
          <button type="button" className={cvLocale === "en" ? "is-active" : ""} onClick={() => setCvLocale("en")}>
            {t.resume.en}
          </button>
        </div>
        <div className="resume-cv__actions">
          <a href={cv.href} target="_blank" rel="noreferrer">
            <HoverBorderGradient as="span" containerClassName="certs__gradient-btn" className="certs__gradient-content" duration={1.8}>
              <span>{t.resume.view}</span>
              <ArrowUpRight />
            </HoverBorderGradient>
          </a>
          <a href={cv.href} download={cv.fileName}>
            <HoverBorderGradient as="span" containerClassName="certs__gradient-btn" className="certs__gradient-content" duration={1.8}>
              <span>{t.resume.download}</span>
              <ArrowDownToLine />
            </HoverBorderGradient>
          </a>
        </div>
        <iframe className="resume-cv__viewer" src={cv.href} title={`${t.resume.title} — ${cvLocale === "fr" ? t.resume.fr : t.resume.en}`} />
      </div>
    </main>
  );
}
