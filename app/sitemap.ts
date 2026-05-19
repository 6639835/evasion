import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

const paths = [
  "/",
  "/about",
  "/careers",
  "/contact",
  "/cookies",
  "/faq",
  "/privacy",
  "/refund-policy",
  "/returns",
  "/shipping",
  "/terms",
  "/warranty",
] as const;

function localizedPath(path: string, locale: (typeof routing.locales)[number]) {
  const normalized = path === "/" ? "" : path;
  return locale === routing.defaultLocale
    ? path
    : `/${locale}${normalized}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return paths.map((path) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        `${siteUrl}${localizedPath(path, locale)}`,
      ]),
    );

    return {
      url: `${siteUrl}${localizedPath(path, routing.defaultLocale)}`,
      lastModified: now,
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : 0.6,
      alternates: { languages },
    };
  });
}
