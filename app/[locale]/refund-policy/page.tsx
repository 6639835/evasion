import { getTranslations } from "next-intl/server";

import { PageLayout, PageHero } from "@/components/page-layout";
import { Link } from "@/i18n/navigation";
import { getLocalizedMetadata } from "@/i18n/metadata";
import { setLocaleFromParams, type LocalePageProps } from "@/i18n/page";

const quickLinks = [
  { href: "/returns" },
  { href: "/warranty" },
  { href: "/contact" },
];

export async function generateMetadata({ params }: LocalePageProps) {
  const locale = await setLocaleFromParams(params);
  return getLocalizedMetadata(locale, "Pages.refund", "/refund-policy");
}

export default async function RefundPolicyPage({ params }: LocalePageProps) {
  const locale = await setLocaleFromParams(params);
  const t = await getTranslations({ locale, namespace: "Pages.refund" });
  const tPages = await getTranslations({ locale, namespace: "Pages" });
  const labels = t.raw("quickLinks") as string[];
  const sections = t.raw("sections") as Array<{ title: string; body: string }>;

  return (
    <PageLayout>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
      />

      <div className="border-b border-border bg-secondary px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-wrap gap-6">
          {quickLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
            >
              {labels[index]}
            </Link>
          ))}
        </div>
      </div>

      <div className="px-6 pb-28 pt-16 md:px-12 lg:px-20">
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
