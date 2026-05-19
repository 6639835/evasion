import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { siteUrl } from "@/lib/site";
import { type Locale, routing } from "./routing";

const baseUrl = new URL(siteUrl);

function localizedPath(path: string, locale: Locale) {
  const normalizedPath = path === "/" ? "" : path;
  return locale === routing.defaultLocale
    ? path
    : `/${locale}${normalizedPath}`;
}

export async function getLocalizedMetadata(
  locale: Locale,
  namespace: string,
  path: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(path, l)]),
  ) as Record<Locale, string>;

  return {
    metadataBase: baseUrl,
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: localizedPath(path, locale),
      languages: {
        ...languages,
        "x-default": localizedPath(path, routing.defaultLocale),
      },
    },
  };
}
