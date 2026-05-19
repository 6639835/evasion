/**
 * Canonical site URL.
 *
 * Resolved at build time. Override via the `NEXT_PUBLIC_SITE_URL`
 * environment variable when the production domain is known.
 */
export const siteUrl: string = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://evasion.com"
).replace(/\/+$/, "");
