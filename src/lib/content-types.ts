import type { LocalizedText } from "@/lib/i18n-core";

export type { LocalizedText };
export type CertificationKind = "certification" | "specialization";

export type Certification = {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  logo: string;
  kind: CertificationKind;
  points: [LocalizedText, LocalizedText, LocalizedText, LocalizedText];
  issuer?: LocalizedText;
  obtainedAt?: LocalizedText;
  certificateImage?: string;
  verifyUrl?: string;
  featured?: boolean;
  containedCertificationIds?: string[];
  specializationId?: string;
};

export type Project = {
  slug: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  year: string;
  category: LocalizedText;
  image: string;
  problem: LocalizedText;
  solution: LocalizedText;
  audience: LocalizedText;
  resolution: LocalizedText;
  stack: LocalizedText;
  liveUrl?: string;
  githubUrl?: string;
};

export type BlogSection = { heading?: LocalizedText; body: LocalizedText; image?: string };
export type BlogPost = { slug: string; title: LocalizedText; shortDescription: LocalizedText; coverImage: string; category: LocalizedText; date: LocalizedText; readTime: LocalizedText; sections: BlogSection[] };
export type ContentCollection = "certifications" | "projects" | "blog-posts" | "blog-categories";
export type ContentStore = { certifications: Certification[]; projects: Project[]; "blog-posts": BlogPost[]; "blog-categories": LocalizedText[] };
