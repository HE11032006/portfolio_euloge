"use client";
import AboutScrollyCard from "@/components/about-scrolly-card";
import CertificationsCarousel from "@/components/certifications-carousel";
import { ShutterTitle } from "@/components/ui/shutter-title";
import { useLocale } from "@/components/locale-provider";
import type { Certification } from "@/lib/content-types";
import certificationData from "../../../content/certifications.json";

export default function AboutPage() {
  const { t } = useLocale();
  return <div className="surface-light" style={{ minHeight: "100vh" }}>
    <section className="page-start" style={{ paddingBottom: 80 }}><div><div className="about-hero__intro"><div className="about-hero__photo"><img src="/HE.jpg" alt="HOUESSOU Euloge" /></div><h1 className="about-hero__title type-display"><ShutterTitle text={t.about.greeting} /><br /><ShutterTitle text="Euloge" /></h1></div></div><div className="about-hero__summary"><div><span className="about-hero__label">{t.about.me}</span></div><div className="about-hero__copy"><p>{t.about.summary}</p></div></div></section>
    <AboutScrollyCard />
    <CertificationsCarousel certifications={certificationData as Certification[]} />
  </div>;
}
