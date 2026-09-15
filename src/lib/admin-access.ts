const LOOPBACK_PATTERN = /^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

function isLoopbackAddress(value: string) {
  const address = value
    .trim()
    .toLowerCase()
    .replace(/^\[|\]$/g, "")
    .replace(/^::ffff:/, "");
  return address === "localhost" || address === "::1" || LOOPBACK_PATTERN.test(address);
}

function hostnameOf(host: string) {
  return host.startsWith("[")
    ? host.slice(0, host.indexOf("]") + 1)
    : host.split(":")[0];
}

/**
 * Le studio de contenu écrit dans les fichiers du dépôt : il ne doit jamais
 * répondre en production, ni à un autre appareil du réseau local.
 */
export function isLocalAdminRequest(headers: Headers | { get(name: string): string | null }) {
  if (process.env.NODE_ENV !== "development" && process.env.LOCAL_CONTENT_ADMIN !== "1") return false;

  const host = headers.get("x-forwarded-host") ?? headers.get("host");
  if (!host || !isLoopbackAddress(hostnameOf(host))) return false;

  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor && !forwardedFor.split(",").every(isLoopbackAddress)) return false;

  return true;
}
