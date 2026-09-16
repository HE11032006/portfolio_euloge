import { NextResponse, type NextRequest } from "next/server";

const locales = ["fr", "en"];
const publicRoutes = ["about", "work", "writing", "certifications", "resume"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Une URL localisée est réécrite vers la route historique en interne.
  // Ce marqueur évite que ce second passage ne redirige à nouveau vers /fr/… .
  if (request.headers.get("x-i18n-rewrite") === "1") return NextResponse.next();
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) return NextResponse.next();
  if (pathname === "/") return NextResponse.redirect(new URL("/fr/about", request.url));

  const parts = pathname.split("/").filter(Boolean);
  const locale = locales.includes(parts[0]) ? parts[0] : "fr";
  const route = locales.includes(parts[0]) ? `/${parts.slice(1).join("/")}` : pathname;
  const base = route.split("/").filter(Boolean)[0];
  if (!locales.includes(parts[0]) && publicRoutes.includes(base || "")) return NextResponse.redirect(new URL(`/fr${pathname}`, request.url));
  if (!locales.includes(parts[0])) return NextResponse.next();

  const headers = new Headers(request.headers);
  headers.set("x-site-locale", locale);
  headers.set("x-i18n-rewrite", "1");
  const destination = new URL(route || "/about", request.url);
  return NextResponse.rewrite(destination, { request: { headers } });
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
