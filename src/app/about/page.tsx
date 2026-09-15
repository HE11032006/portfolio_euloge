"use client";

import AboutScrollyCard from "@/components/about-scrolly-card";
import CertificationsCarousel from "@/components/certifications-carousel";
import { ShutterTitle } from "@/components/ui/shutter-title";
import type { Certification } from "@/lib/content-types";
import certificationData from "../../../content/certifications.json";

export default function AboutPage() {
  return (
    <div className="surface-light" style={{ minHeight: "100vh" }}>
      <section className="page-start" style={{ paddingBottom: 80 }}>
        <div>
          <div className="about-hero__intro">
            <div className="about-hero__photo">
              <img
                src="/HE.jpg"
                alt="HOUESSOU Euloge"
              />
            </div>
            <h1 className="about-hero__title type-display">
              <ShutterTitle text="Yo, I’m" />
              <br />
              <ShutterTitle text="Euloge" />
            </h1>
          </div>
        </div>

        <div className="about-hero__summary">
          <div><span className="about-hero__label">ME</span></div>
          <div className="about-hero__copy">
              <p>
                I&apos;m simply someone passionate about computer science, especially machine learning.
                I&apos;m also deeply interested in web and mobile development, where technology meets thoughtful design.
              </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SCROLLYTELLING PINNED DOSSIER
          PARCOURS · STACK · RÉCOMPENSES · INFOS
      ════════════════════════════════════════ */}
      <AboutScrollyCard />

      {/* ════════════════════════════════════════
          PROFESSIONAL CERTIFICATIONS
          Horizontal scrollable cards + modal verification
      ════════════════════════════════════════ */}
      <CertificationsCarousel certifications={certificationData as Certification[]} />
    </div>
  );
}
