export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export type LocalizedText = { fr: string; en: string };
export const translations = {
  fr: {
    nav: { about: "À propos", work: "Projets", writing: "Blog", contact: "Contact", resume: "CV", close: "Fermer", email: "Email", language: "EN", openMenu: "Ouvrir le menu", closeMenu: "Fermer le menu" },
    common: { back: "Retour", all: "Tout", view: "Voir", verify: "Vérifier", readArticle: "Lire l’article", noProjects: "Aucun projet publié pour le moment.", noPosts: "Aucun article publié pour le moment.", noCertifications: "Aucune certification publiée pour le moment.", allCertifications: "Voir toutes les certifications", nextProject: "Projet suivant", liveDemo: "Lien du site web", github: "GitHub" },
    about: { greeting: "Bonjour, je suis", me: "MOI", summary: "Je suis passionné par l’informatique, en particulier le machine learning. Je m’intéresse aussi au développement web et mobile, là où la technologie rencontre un design réfléchi.", certifications: "Certifications professionnelles", certificationLead: "Apprentissage continu et développement professionnel auprès d’organismes reconnus.", scrollyKicker: "Expériences, compétences et informations", tabs: { parcours: "Expérience", academic: "Académique", stack: "Stack", infos: "Infos" }, experienceLead: "Mes premières expériences entre développement mobile et analyse de données.", academicLead: "Mon parcours académique en informatique et en sciences de l’ingénieur.", cv: "Voir le CV", infoLabels: { base: "Base", focus: "Focus", availability: "Disponibilité" }, infoValues: { base: "Cotonou, Bénin", focus: "Machine learning · Développement web et mobile · Solutions informatiques", availability: "Ouvert aux collaborations, projets et opportunités d’apprentissage" } },
    work: { title: "Projets", problem: "Problème", solution: "Solution", audience: "Pour qui", resolution: "Comment on le résout", stack: "Stack" },
    writing: { title: "Blog", subtitle: "Réflexions & systèmes", description: "Articles, architecture et notes sur l’ingénierie moderne.", read: "Lire l’article" },
    certifications: { title: "Toutes les certifications", description: "Descriptions, notions, dates d’obtention et preuves visuelles.", specialization: "Spécialisation", certification: "Certification", points: "Points clés", issuer: "Émetteur", obtained: "Obtenue", viewCertificate: "Voir le certificat", verifyCertification: "Vérifier", verifySpecialization: "Vérifier", all: "Tout", empty: "Aucune certification dans cette catégorie.", courses: "Certificats de cours", coursesDescription: "Obtenus après avoir terminé chaque cours de la spécialisation." },
    resume: { title: "Mon CV", meta: "Curriculum vitae", description: "Consulte ou télécharge mon parcours professionnel.", view: "Voir le PDF", download: "Télécharger" },
    footer: { home: "Accueil", navigation: "Navigation du pied de page", copyright: "Tous droits réservés." },
    loader: { label: "Chargement du portfolio" },
  },
  en: {
    nav: { about: "About", work: "Projects", writing: "Blog", contact: "Contact", resume: "Resume", close: "Close", email: "Email", language: "FR", openMenu: "Open menu", closeMenu: "Close menu" },
    common: { back: "Back", all: "All", view: "View", verify: "Verify", readArticle: "Read article", noProjects: "No projects published yet.", noPosts: "No articles published yet.", noCertifications: "No certifications published yet.", allCertifications: "View all certifications", nextProject: "Next project", liveDemo: "Live website ", github: "GitHub" },
    about: { greeting: "Hi, I’m", me: "ME", summary: "I’m passionate about computer science, especially machine learning. I’m also deeply interested in web and mobile development, where technology meets thoughtful design.", certifications: "Professional Certifications", certificationLead: "Continuous learning and professional development through industry-leading bodies.", scrollyKicker: "Experience, skills and information", tabs: { parcours: "Experience", academic: "Academic", stack: "Stack", infos: "Info" }, experienceLead: "My first experiences across mobile development and data analysis.", academicLead: "My academic background in computer science and engineering sciences.", cv: "View resume", infoLabels: { base: "Based in", focus: "Focus", availability: "Availability" }, infoValues: { base: "Cotonou, Benin", focus: "Machine learning · Web and mobile development · IT solutions", availability: "Open to collaborations, projects and learning opportunities" } },
    work: { title: "Projects", problem: "Problem", solution: "Solution", audience: "Who it’s for", resolution: "How it works", stack: "Stack" },
    writing: { title: "Blog", subtitle: "Thoughts & Systems", description: "Articles, architecture breakdowns, and notes on modern engineering.", read: "Read article" },
    certifications: { title: "All certifications", description: "Descriptions, topics, dates and visual proof.", specialization: "Specialization", certification: "Certification", points: "Key points", issuer: "Issuer", obtained: "Obtained", viewCertificate: "View certificate", verifyCertification: "Verify", verifySpecialization: "Verify", all: "All", empty: "No certification in this category.", courses: "Course certificates", coursesDescription: "Earned after completing each course in the specialization." },
    resume: { title: "My Resume", meta: "Curriculum vitae", description: "View or download my professional background.", view: "View PDF", download: "Download" },
    footer: { home: "Home", navigation: "Footer navigation", copyright: "All rights reserved." },
    loader: { label: "Loading portfolio" },
  },
} as const;
export function isLocale(value: string | undefined): value is Locale { return value === "fr" || value === "en"; }
export function localePath(locale: Locale, path: string) { return `/${locale}${path.startsWith("/") ? path : `/${path}`}`; }
export function localized(value: LocalizedText | string | undefined, locale: Locale): string { if (!value) return ""; if (typeof value === "string") return value; return value[locale] || value.fr || value.en || ""; }
export function getTranslations(locale: Locale) { return translations[locale]; }
export function text(fr: string, en: string = fr): LocalizedText { return { fr, en }; }
