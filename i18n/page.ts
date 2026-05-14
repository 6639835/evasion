import { setRequestLocale } from "next-intl/server";

import type { Locale } from "./routing";

export type LocalePageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function setLocaleFromParams(params: LocalePageProps["params"]) {
  const { locale } = await params;
  setRequestLocale(locale);
  return locale;
}
