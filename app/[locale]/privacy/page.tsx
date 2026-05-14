import { getTranslations } from "next-intl/server";

import { PageLayout, PageHero } from "@/components/page-layout";
import { getLocalizedMetadata } from "@/i18n/metadata";
import { setLocaleFromParams, type LocalePageProps } from "@/i18n/page";

export async function generateMetadata({ params }: LocalePageProps) {
  const locale = await setLocaleFromParams(params);
  return getLocalizedMetadata(locale, "Pages.privacy", "/privacy");
}

export default async function PrivacyPage({ params }: LocalePageProps) {
  const locale = await setLocaleFromParams(params);
  const t = await getTranslations({ locale, namespace: "Pages.privacy" });
  const tPages = await getTranslations({ locale, namespace: "Pages" });
  const sections = t.raw("sections") as Array<{ title: string; body: string }>;

  return (
    <PageLayout>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
      />

      <div className="px-6 pb-28 md:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl space-y-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="mb-4 text-base font-medium text-foreground">{section.title}</h2>
              <div className="space-y-3">
                {section.body.split("\n\n").map((para, i) => (
                  <p key={i} className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <p className="border-t border-border pt-8 text-xs text-muted-foreground">
            {tPages("lastUpdated")}
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
