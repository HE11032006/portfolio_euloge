"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { defaultLocale, getTranslations, isLocale, localePath, type Locale } from "@/lib/i18n-core";

type LocaleContextValue = { locale: Locale; t: ReturnType<typeof getTranslations>; switchLocale: () => void; href: (path: string) => string };
const LocaleContext = createContext<LocaleContextValue | null>(null);

export default function LocaleProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const pathLocale = pathname.split("/")[1];
  const [storedLocale, setStoredLocale] = useState<Locale>(defaultLocale);
  const locale = isLocale(pathLocale) ? pathLocale : storedLocale;

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-locale");
    if (isLocale(saved || undefined)) setStoredLocale(saved as Locale);
    document.documentElement.lang = locale;
    document.cookie = `portfolio-locale=${locale}; path=/; max-age=31536000; samesite=lax`;
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    t: getTranslations(locale),
    href: (path: string) => localePath(locale, path),
    switchLocale: () => {
      const next = locale === "fr" ? "en" : "fr";
      window.localStorage.setItem("portfolio-locale", next);
      document.cookie = `portfolio-locale=${next}; path=/; max-age=31536000; samesite=lax`;
      const segments = pathname.split("/");
      if (isLocale(segments[1])) segments[1] = next; else segments.splice(1, 0, next);
      router.push(segments.join("/") || `/${next}`);
    },
  }), [locale, pathname, router]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() { const value = useContext(LocaleContext); if (!value) throw new Error("useLocale must be used inside LocaleProvider"); return value; }
