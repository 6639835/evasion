import { getTranslations } from "next-intl/server";

import { PageLayout, PageHero } from "@/components/page-layout";
import { getLocalizedMetadata } from "@/i18n/metadata";
import { setLocaleFromParams, type LocalePageProps } from "@/i18n/page";

export async function generateMetadata({ params }: LocalePageProps) {
  const locale = await setLocaleFromParams(params);
  return getLocalizedMetadata(locale, "Pages.cookies", "/cookies");
}

export default async function CookiesPage({ params }: LocalePageProps) {
  const locale = await setLocaleFromParams(params);
  const t = await getTranslations({ locale, namespace: "Pages.cookies" });
  const tPages = await getTranslations({ locale, namespace: "Pages" });
  const cookieTypes = t.raw("types") as Array<{
    name: string;
    required: boolean;
    description: string;
    examples: string[];
  }>;
  const sections = t.raw("sections") as Array<{ title: string; body: string }>;

  return (
    <PageLayout>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
      />

      {/* Cookie Types Grid */}
      <div className="px-6 pb-20 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cookieTypes.map((type) => (
            <div key={type.name} className="rounded-2xl border border-border p-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-medium text-foreground">{type.name}</h2>
                <span
                  className={`rounded-full px-3 py-0.5 text-xs font-medium ${
                    type.required
                      ? "bg-foreground text-background"
                      : "border border-border text-muted-foreground"
                  }`}
                >
                  {type.required ? t("alwaysOn") : t("optional")}
                </span>
              </div>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{type.description}</p>
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">{t("examples")}</p>
                <ul className="space-y-1">
                  {type.examples.map((ex) => (
                    <li key={ex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Sections */}
      <div className="border-t border-border px-6 pb-28 pt-16 md:px-12 lg:px-20">
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
