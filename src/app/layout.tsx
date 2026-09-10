import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import NavHeader from "@/components/nav-header";
import SiteFooterWrapper from "@/components/site-footer-wrapper";

export const metadata: Metadata = {
  title: "Euloge HOUESSOU — Design Engineer",
  description:
    "Portfolio d'Euloge HOUESSOU — Design Engineer basé à Anvers. Design, Code & AI Workflows. Client work pour Nestlé, Lilly, Chanel et Gore.",
  keywords: [
    "Euloge HOUESSOU",
    "Design Engineer",
    "Antwerp",
    "Shopify",
    "Next.js",
    "UI Design",
    "AI Workflows",
  ],
  authors: [{ name: "Euloge HOUESSOU" }],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Newsreader:ital,opsz,wght@1,6..72,400;1,6..72,500&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#0D0D0D] text-[#EDEDED]">
        <NavHeader />
        <main>{children}</main>
        <SiteFooterWrapper />
      </body>
    </html>
  );
}
