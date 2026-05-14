import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { PageLayout, PageHero } from "@/components/page-layout";
import { getLocalizedMetadata } from "@/i18n/metadata";
import { setLocaleFromParams, type LocalePageProps } from "@/i18n/page";

export async function generateMetadata({ params }: LocalePageProps) {
  const locale = await setLocaleFromParams(params);
  return getLocalizedMetadata(locale, "Pages.warranty", "/warranty");
}

export default async function WarrantyPage({ params }: LocalePageProps) {
  const locale = await setLocaleFromParams(params);
  const t = await getTranslations({ locale, namespace: "Pages.warranty" });
  const tiers = t.raw("tiers") as Array<{
    product: string;
    duration: string;
    description: string;
  }>;
  const coverageItems = t.raw("coverage") as Array<{
    title: string;
    covered: boolean;
    description: string;
  }>;

  return (
    <PageLayout>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
      />

      {/* Warranty Tiers */}
      <div className="px-6 pb-0 md:px-12 lg:px-20">
        <div className="divide-y divide-border">
          {tiers.map((tier) => (
            <div key={tier.product} className="grid grid-cols-1 gap-4 py-8 md:grid-cols-3 md:gap-16">
              <div>
                <h3 className="font-medium text-foreground">{tier.product}</h3>
                <p className="mt-1 text-2xl font-medium text-foreground">{tier.duration}</p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground md:col-span-2">{tier.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Full-bleed statement image */}
      <div className="relative mt-16 aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]">
        <Image
          src="/images/product-backpack.png"
          alt={t("alt")}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-media-backdrop/60" />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <p className="max-w-3xl text-3xl font-medium leading-tight text-white md:text-5xl lg:text-6xl">
            {t("statementLine1")}
            <br />
            {t("statementLine2")}
          </p>
        </div>
      </div>

      {/* What's Covered */}
      <div className="bg-secondary px-6 py-16 md:px-12 lg:px-20">
        <p className="mb-10 text-xs uppercase tracking-widest text-muted-foreground">{t("coveredHeading")}</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coverageItems.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-background p-6">
              <div className="mb-3 flex items-center gap-3">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${item.covered ? "bg-foreground" : "bg-muted-foreground/40"}`}
                />
                <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              <p className={`mt-3 text-xs font-medium ${item.covered ? "text-foreground" : "text-muted-foreground"}`}>
                {item.covered ? t("covered") : t("notCovered")}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How to Claim */}
      <div className="px-6 py-16 md:px-12 lg:px-20">
        <p className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">{t("claimHeading")}</p>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {t("claimPrefix")}{" "}
          <a href="mailto:warranty@evasion.com" className="text-foreground underline underline-offset-2">
            warranty@evasion.com
          </a>{" "}
          {t("claimSuffix")}
        </p>
      </div>
    </PageLayout>
  );
}
