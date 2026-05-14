import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { PageLayout, PageHero } from "@/components/page-layout";
import { getLocalizedMetadata } from "@/i18n/metadata";
import { setLocaleFromParams, type LocalePageProps } from "@/i18n/page";

const stepImages = [
  "/images/led-flashlight-bottle.png",
  "/images/product-backpack.png",
  "/images/bottle-bike.png",
  "/images/bottle-lake.png",
];

export async function generateMetadata({ params }: LocalePageProps) {
  const locale = await setLocaleFromParams(params);
  return getLocalizedMetadata(locale, "Pages.returns", "/returns");
}

export default async function ReturnsPage({ params }: LocalePageProps) {
  const locale = await setLocaleFromParams(params);
  const t = await getTranslations({ locale, namespace: "Pages.returns" });
  const steps = t.raw("steps") as Array<{
    step: string;
    title: string;
    description: string;
    alt: string;
  }>;
  const conditions = t.raw("conditions") as string[];

  return (
    <PageLayout>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
      />

      {/* Steps — each with a background image */}
      <div className="grid grid-cols-1 gap-3 px-6 pb-6 md:grid-cols-2 md:px-12 lg:px-20">
        {steps.map((item, index) => (
          <div key={item.step} className="group relative overflow-hidden rounded-2xl">
            {/* Background image */}
            <div className="relative aspect-[4/3]">
              <Image
                src={stepImages[index]}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-media-backdrop/80 via-media-backdrop/30 to-transparent" />
            </div>
            {/* Overlay content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <p className="mb-2 text-xs uppercase tracking-widest text-white/50">{item.step}</p>
              <h3 className="mb-3 text-xl font-medium text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-white/70">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Conditions */}
      <div className="bg-secondary px-6 py-16 md:px-12 lg:px-20">
        <p className="mb-8 text-xs uppercase tracking-widest text-muted-foreground">{t("conditionsHeading")}</p>
        <ul className="space-y-4">
          {conditions.map((condition, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-0.5 shrink-0 text-foreground">—</span>
              <span>{condition}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="px-6 py-12 md:px-12 lg:px-20">
        <p className="text-sm text-muted-foreground">
          {t("readyPrefix")}{" "}
          <a href="mailto:returns@evasion.com" className="text-foreground underline underline-offset-2">
            {t("emailCta")}
          </a>{" "}
          {t("readySuffix")}
        </p>
      </div>
    </PageLayout>
  );
}
