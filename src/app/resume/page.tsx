import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ShutterTitle } from "@/components/ui/shutter-title";

const cvUrl = "/CV_Euloge_HOUESSOU.pdf";

export default function ResumePage() {
  return (
    <main className="surface-dark resume-cv">
      <div className="page-start resume-cv__content">
        <header className="resume-cv__header">
          <p className="type-meta">Curriculum vitae</p>
          <h1 className="type-display"><ShutterTitle text="Mon CV" /></h1>
          <p className="type-sub">Consulte ou télécharge mon parcours professionnel.</p>
        </header>

        <div className="resume-cv__actions">
          <a href={cvUrl} target="_blank" rel="noreferrer">
            <HoverBorderGradient as="span" containerClassName="certs__gradient-btn" className="certs__gradient-content" duration={1.8}>
              <span>Voir le PDF</span>
              <ArrowUpRight aria-hidden="true" />
            </HoverBorderGradient>
          </a>
          <a href={cvUrl} download>
            <HoverBorderGradient as="span" containerClassName="certs__gradient-btn" className="certs__gradient-content" duration={1.8}>
              <span>Télécharger</span>
              <ArrowDownToLine aria-hidden="true" />
            </HoverBorderGradient>
          </a>
        </div>

        <iframe className="resume-cv__viewer" src={cvUrl} title="CV d’Euloge Houessou" />
      </div>
    </main>
  );
}
