import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { PageLayout, PageHero } from "@/components/page-layout";
import { getLocalizedMetadata } from "@/i18n/metadata";
import { setLocaleFromParams, type LocalePageProps } from "@/i18n/page";

export async function generateMetadata({ params }: LocalePageProps) {
  const locale = await setLocaleFromParams(params);
  return getLocalizedMetadata(locale, "Pages.shipping", "/shipping");
}

export default async function ShippingPage({ params }: LocalePageProps) {
  const locale = await setLocaleFromParams(params);
  const t = await getTranslations({ locale, namespace: "Pages.shipping" });
  const zones = t.raw("zones") as Array<{
    zone: string;
    countries: string;
    standard: string;
    express: string;
    standardCost: string;
  }>;
  const notes = t.raw("notes") as string[];

  return (
    <PageLayout>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
      />

      {/* Content + Sticky Image split */}
      <div className="border-t border-border md:grid md:grid-cols-5">

        {/* Left: content (3 cols) */}
        <div className="md:col-span-3">
          {/* Rates Table */}
          <div className="px-6 py-16 md:px-10 lg:px-14">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-4 text-left text-xs uppercase tracking-widest text-muted-foreground">{t("table.zone")}</th>
                    <th className="pb-4 text-left text-xs uppercase tracking-widest text-muted-foreground">{t("table.countries")}</th>
                    <th className="pb-4 text-left text-xs uppercase tracking-widest text-muted-foreground">{t("table.standard")}</th>
                    <th className="pb-4 text-left text-xs uppercase tracking-widest text-muted-foreground">{t("table.express")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {zones.map((zone) => (
                    <tr key={zone.zone}>
                      <td className="py-6 pr-4 align-top">
                        <p className="font-medium text-foreground">{zone.zone}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{zone.standardCost}</p>
                      </td>
                      <td className="py-6 pr-4 align-top text-sm text-muted-foreground">{zone.countries}</td>
                      <td className="py-6 pr-4 align-top text-sm text-foreground">{zone.standard}</td>
                      <td className="py-6 align-top text-sm text-foreground">{zone.express}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes */}
          <div className="border-t border-border bg-secondary px-6 py-16 md:px-10 lg:px-14">
            <p className="mb-8 text-xs uppercase tracking-widest text-muted-foreground">{t("goodToKnow")}</p>
            <ul className="space-y-4">
              {notes.map((note, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-0.5 shrink-0 text-foreground">—</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Questions */}
          <div className="px-6 py-12 md:px-10 lg:px-14">
            <p className="text-sm text-muted-foreground">
              {t("questionPrefix")}{" "}
              <a href="mailto:orders@evasion.com" className="text-foreground underline underline-offset-2">
                {t("contact")}
              </a>
            </p>
          </div>
        </div>

        {/* Right: sticky image (2 cols) */}
        <div className="relative hidden border-l border-border md:col-span-2 md:block">
          <div className="sticky top-0 h-screen overflow-hidden">
            <Image
              src="/images/bottle-bike.png"
              alt={t("alt")}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
