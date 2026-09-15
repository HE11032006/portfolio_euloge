export type CertKind = "certification" | "specialization";

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  subtitle: string;
  kind: CertKind;
  tag: string;
  credentialId: string;
  obtainedAt: string;
  description: string;
  skills: string[];
  points: string[];
  verifyUrl: string;
  image: string;
  featured?: boolean;
};

export const CERTIFICATIONS: Certification[] = [
  {
    id: "aws-sap",
    title: "AWS Solutions Architect Professional",
    issuer: "Amazon Web Services",
    subtitle: "Architectures cloud à l’échelle · Proctored",
    kind: "certification",
    tag: "Certified · Proctored",
    credentialId: "AWS-PSA-984210",
    obtainedAt: "Mars 2023",
    description:
      "Conception d’architectures distribuées, multi-régions et sécurisées sur AWS, du dimensionnement à la reprise d’activité.",
    skills: ["AWS", "Haute disponibilité", "IAM", "Serverless", "EKS"],
    points: [
      "Architectures multi-régions haute disponibilité",
      "Reprise d’activité, RPO / RTO",
      "Sécurité, IAM et gouvernance",
      "Coûts et scale",
    ],
    verifyUrl: "https://aws.amazon.com/verification",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    featured: true,
  },
  {
    id: "gcp-pca",
    title: "Google Cloud Professional Architect",
    issuer: "Google Cloud",
    subtitle: "Infrastructures hybrides · Proctored",
    kind: "certification",
    tag: "Certified · Proctored",
    credentialId: "GCP-PCA-731940",
    obtainedAt: "Septembre 2023",
    description:
      "Infrastructures cloud et hybrides, GKE, données et architectures Zero-Trust sur Google Cloud.",
    skills: ["GCP", "GKE", "BigQuery", "Zero-Trust"],
    points: [
      "Infrastructures cloud et hybrides",
      "Conteneurs sur GKE",
      "Pipelines et BigQuery",
      "Conformité Zero-Trust",
    ],
    verifyUrl: "https://cloud.google.com/certification",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "cka-cncf",
    title: "Certified Kubernetes Administrator",
    issuer: "CNCF",
    subtitle: "Clusters de production · Performance-based",
    kind: "certification",
    tag: "Performance-based",
    credentialId: "CKA-882104",
    obtainedAt: "Juin 2022",
    description:
      "Administration de clusters de production : réseau, sécurité des pods, stockage et mises à jour sans interruption.",
    skills: ["Kubernetes", "RBAC", "CNI", "Istio"],
    points: [
      "Clusters de production",
      "Réseau, Ingress et mesh",
      "RBAC et politiques réseau",
      "Stockage et rolling updates",
    ],
    verifyUrl: "https://www.cncf.io/certification/cka/",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "ai-systems",
    title: "AI & Distributed Systems Design",
    issuer: "DeepLearning.AI",
    subtitle: "RAG, agents et systèmes · Specialization",
    kind: "specialization",
    tag: "Specialization",
    credentialId: "DLAI-SYS-551029",
    obtainedAt: "Février 2024",
    description:
      "Systèmes d’IA en production : RAG, latence d’inférence, agents et observabilité des modèles.",
    skills: ["RAG", "LLM", "Vector DB", "Agents"],
    points: [
      "Architectures RAG et bases vectorielles",
      "Latence d’inférence et batching",
      "Agents et fine-tuning",
      "Déploiement et observabilité",
    ],
    verifyUrl: "https://www.deeplearning.ai/",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "terraform-assoc",
    title: "HashiCorp Certified: Terraform",
    issuer: "HashiCorp",
    subtitle: "Infrastructure as code · Associate",
    kind: "certification",
    tag: "Infrastructure as Code",
    credentialId: "HC-TER-610482",
    obtainedAt: "Novembre 2023",
    description:
      "Infrastructure as code multi-cloud : state, CI/CD, drift et politiques de sécurité.",
    skills: ["Terraform", "IaC", "CI/CD", "Sentinel"],
    points: [
      "IaC multi-fournisseurs",
      "State et Terraform Cloud",
      "CI/CD et drift detection",
      "Sécurité as code",
    ],
    verifyUrl: "https://www.credly.com/",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1600&q=80",
  },
];

export function getCertification(id: string) {
  return CERTIFICATIONS.find((item) => item.id === id);
}
