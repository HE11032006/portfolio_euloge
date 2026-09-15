export type CertificationKind = "certification" | "specialization";

export type Certification = {
  id: string;
  title: string;
  subtitle: string;
  logo: string;
  kind: CertificationKind;
  points: [string, string, string, string];
  issuer?: string;
  obtainedAt?: string;
  certificateImage?: string;
  verifyUrl?: string;
  featured?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  year: string;
  category: string;
  image: string;
  problem: string;
  solution: string;
  audience: string;
  resolution: string;
  stack: string;
  liveUrl?: string;
  githubUrl?: string;
};

export type BlogSection = {
  heading?: string;
  body: string;
  image?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  shortDescription: string;
  coverImage: string;
  category: string;
  date: string;
  readTime: string;
  sections: BlogSection[];
};

export type ContentCollection = "certifications" | "projects" | "blog-posts" | "blog-categories";

export type ContentStore = {
  certifications: Certification[];
  projects: Project[];
  "blog-posts": BlogPost[];
  "blog-categories": string[];
};
