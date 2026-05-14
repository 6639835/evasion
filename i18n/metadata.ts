import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { type Locale, routing } from "./routing";

const baseUrl = new URL("https://evasion.com");

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

  return {
    metadataBase: baseUrl,
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: localizedPath(path, locale),
      languages: {
        en: localizedPath(path, "en"),
        "zh-CN": localizedPath(path, "zh-CN"),
        "x-default": localizedPath(path, routing.defaultLocale),
      },
    },
  };
}
