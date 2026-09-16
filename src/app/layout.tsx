import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import NavHeader from "@/components/nav-header";
import SiteFooterWrapper from "@/components/site-footer-wrapper";
import SiteLoader from "@/components/site-loader";
import LocaleProvider from "@/components/locale-provider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Euloge HOUESSOU",
  description:
    "Portfolio d’Euloge HOUESSOU, passionné par le machine learning, la recherche sémantique, le développement web et mobile.",
  keywords: [
    "HOUESSOU Euloge",
    "Machine learning",
    "Recherche sémantique",
    "Développement web",
    "Développement mobile",
    "Intelligence artificielle",
  ],
  authors: [{ name: "HOUESSOU Euloge" }],
  icons: {
    icon: "/logo-sombre.png",
    shortcut: "/logo-sombre.png",
    apple: "/logo-sombre.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={cn("scroll-smooth", "font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <LocaleProvider>
          <SiteLoader />
          <NavHeader />
          <main>{children}</main>
          <SiteFooterWrapper />
        </LocaleProvider>
      </body>
    </html>
  );
}
