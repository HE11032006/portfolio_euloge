import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ShutterTitle } from "@/components/ui/shutter-title";

export default function NotFound() {
  return (
    <main className="surface-light not-found-page">
      <p className="type-meta">Erreur 404</p>
      <h1 className="type-display"><ShutterTitle text="Page introuvable" /></h1>
      <p>Cette page n’existe pas, a été déplacée ou n’est plus publiée.</p>
      <Link href="/about" className="inline-flex">
        <HoverBorderGradient as="span" containerClassName="certs__gradient-btn" className="certs__gradient-content" duration={1.8}>
          <ArrowLeft aria-hidden="true" /><span>Retour à l’accueil</span>
        </HoverBorderGradient>
      </Link>
    </main>
  );
}
