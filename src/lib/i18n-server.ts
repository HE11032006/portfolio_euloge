import { headers } from "next/headers";
import { defaultLocale, isLocale, type Locale } from "./i18n-core";

export async function getLocale(): Promise<Locale> {
  const value = (await headers()).get("x-site-locale");
  return isLocale(value || undefined) ? value as Locale : defaultLocale;
}
