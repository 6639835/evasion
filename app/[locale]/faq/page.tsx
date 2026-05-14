import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { PageLayout, PageHero } from "@/components/page-layout";
import { getLocalizedMetadata } from "@/i18n/metadata";
import { setLocaleFromParams, type LocalePageProps } from "@/i18n/page";

export async function generateMetadata({ params }: LocalePageProps) {
  const locale = await setLocaleFromParams(params);
  return getLocalizedMetadata(locale, "Pages.faq", "/faq");
}

export default async function FaqPage({ params }: LocalePageProps) {
  const locale = await setLocaleFromParams(params);
  const t = await getTranslations({ locale, namespace: "Pages.faq" });
  const faqs = t.raw("sections") as Array<{
    category: string;
    questions: Array<{ q: string; a: string }>;
  }>;

  return (
    <PageLayout>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
      />

      {/* Full-bleed image with gradient fade — like testimonials section */}
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
        <Image
          src="/images/bottle-canyon.png"
          alt={t("alt")}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background" />
      </div>

      <div className="px-6 pb-28 md:px-12 lg:px-20">
        <div className="space-y-16">
          {faqs.map((section) => (
            <div key={section.category}>
              <p className="mb-8 border-b border-border pb-4 text-xs uppercase tracking-widest text-muted-foreground">
                {section.category}
              </p>
              <div className="space-y-8">
                {section.questions.map((item) => (
                  <div key={item.q} className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-16">
                    <h3 className="font-medium text-foreground">{item.q}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
