import { getLocale, getTranslations } from "next-intl/server";

import { PageHero, PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

async function resolveLocale(): Promise<Locale> {
  try {
    const locale = await getLocale();
    return (routing.locales as readonly string[]).includes(locale)
      ? (locale as Locale)
      : routing.defaultLocale;
  } catch {
    return routing.defaultLocale;
  }
}

export async function generateMetadata() {
  const locale = await resolveLocale();
  const t = await getTranslations({ locale, namespace: "Errors.notFound" });
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    robots: { index: false, follow: false },
  };
}

export default async function LocaleNotFound() {
  const locale = await resolveLocale();
  const t = await getTranslations({ locale, namespace: "Errors.notFound" });

  return (
    <PageLayout>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <div className="px-5 pb-24 sm:px-8 md:px-12 lg:px-20">
        <Button asChild size="lg" className="rounded-full">
          <Link href="/">{t("cta")}</Link>
        </Button>
      </div>
    </PageLayout>
  );
}
