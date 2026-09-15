"use client";

import AboutScrollyCard from "@/components/about-scrolly-card";
import CertificationsCarousel from "@/components/certifications-carousel";
import TextReveal from "@/components/text-reveal";

/* ─── Warm cream & ink palette for noise background ─── */
const C = {
  bg: "transparent",          // inherits #ede9e2 with noise overlay
  dark: "#111111",            // primary text & headings
  subtle: "#333333",          // body text
  border: "rgba(17, 17, 17, 0.12)",
};

/* ─── font shortcuts ─── */
const BODY    = "'Plus Jakarta Sans', sans-serif";       // body — matches PP Neue Montreal
const MONO    = "'JetBrains Mono', monospace";

export default function AboutPage() {
  return (
    <div className="surface-light" style={{ minHeight: "100vh" }}>
      <section className="page-start" style={{ paddingBottom: 80 }}>
        <TextReveal>
          <div className="about-hero__intro">
            <div className="about-hero__photo">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWEnSfrX-c9z-NcDdAwsnJJ2l4azN7yEsRwEZb6FbBUwPZgReFWZF-UdftmYt07XLOz3W4ekedvxq7SeQzJrjzXlKRs_ndylst9t80lBZPGAQsbIWCjm-1KZdjCKub6ygFdGrg0sPZuD1_KP2LoMzJr7ofRkeuk95jRR3d_zbWgWZMouxC8MW0WSblTgaTYZ_mgNpvXG7kgvhCh09vnjYez04n7MESwWaLgxLKtSLjcqjsMQZY1wfH"
                alt="HOUESSOU Euloge"
              />
            </div>
            <h1 className="about-hero__title type-display">
              Hey — I&apos;m
              <br />
              Euloge
            </h1>
          </div>
        </TextReveal>

        <TextReveal delay={0.1}>
          <div style={{ height: 1, background: C.border, maxWidth: 980, margin: "36px auto 32px" }} />
        </TextReveal>

        <TextReveal delay={0.18}>
          <div
            style={{
              display: "flex",
              gap: 32,
              alignItems: "flex-start",
              flexWrap: "wrap",
              margin: "0 auto",
              maxWidth: 760,
            }}
          >
            {/* ABOUT ME label */}
            <div style={{ flexShrink: 0, paddingTop: 3 }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: C.dark,
                  border: `1px solid ${C.border}`,
                  padding: "5px 12px",
                  borderRadius: 4,
                  whiteSpace: "nowrap",
                  display: "inline-block",
                  background: "rgba(255, 255, 255, 0.4)",
                }}
              >
                About Me
              </span>
            </div>

            {/* Body text — PP Neue Montreal style */}
            <div style={{ maxWidth: 540 }}>
              <p
                style={{
                  fontFamily: BODY,
                  fontSize: "clamp(14px, 1.6vw, 16px)",
                  fontWeight: 500,
                  lineHeight: 1.65,
                  color: C.subtle,
                  margin: 0,
                }}
              >
                A good system is more than a pretty architecture.
                It creates clarity, builds trust, and delivers performance
                that compounds over time. That&apos;s exactly my standard for every project.
              </p>
              <p
                style={{
                  fontFamily: BODY,
                  fontSize: "clamp(14px, 1.6vw, 16px)",
                  fontWeight: 500,
                  lineHeight: 1.65,
                  color: C.subtle,
                  margin: "16px 0 0 0",
                }}
              >
                As a Lead Architect &amp; Product Technologist, I help ambitious teams
                build systems that scale effortlessly — and interfaces users love.
              </p>
            </div>
          </div>
        </TextReveal>
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
      <CertificationsCarousel />
    </div>
  );
}
