import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { PageLayout, PageHero } from "@/components/page-layout";
import { getLocalizedMetadata } from "@/i18n/metadata";
import { setLocaleFromParams, type LocalePageProps } from "@/i18n/page";

export async function generateMetadata({ params }: LocalePageProps) {
  const locale = await setLocaleFromParams(params);
  return getLocalizedMetadata(locale, "Pages.careers", "/careers");
}

export default async function CareersPage({ params }: LocalePageProps) {
  const locale = await setLocaleFromParams(params);
  const t = await getTranslations({ locale, namespace: "Pages.careers" });
  const openRoles = t.raw("roles") as Array<{
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
  }>;
  const perks = t.raw("perks") as Array<{ title: string; description: string }>;
  const alt = t.raw("alt") as string[];

  return (
    <PageLayout>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
      />

      {/* Bento Image Grid */}
      <div className="px-6 pb-16 md:px-12 lg:px-20">
        <div className="flex h-[70vh] gap-3">
          {/* Column 1 — full height */}
          <div className="relative flex-1 overflow-hidden rounded-2xl">
            <Image
              src="/images/bottle-mountain.png"
              alt={alt[0]}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Column 2 — two stacked */}
          <div className="flex flex-1 flex-col gap-3">
            <div className="relative flex-1 overflow-hidden rounded-2xl">
              <Image src="/images/bottle-snow.png" alt={alt[1]} fill className="object-cover" />
            </div>
            <div className="relative flex-1 overflow-hidden rounded-2xl">
              <Image src="/images/heating-campfire.png" alt={alt[2]} fill className="object-cover" />
            </div>
          </div>
          {/* Column 3 — two stacked, desktop only */}
          <div className="hidden flex-1 flex-col gap-3 md:flex">
            <div className="relative flex-1 overflow-hidden rounded-2xl">
              <Image src="/images/bottle-fire.png" alt={alt[3]} fill className="object-cover" />
            </div>
            <div className="relative flex-1 overflow-hidden rounded-2xl">
              <Image src="/images/bottle-lake.png" alt={alt[4]} fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Perks */}
      <div className="bg-secondary px-6 py-16 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((perk) => (
            <div key={perk.title}>
              <h3 className="mb-2 font-medium text-foreground">{perk.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{perk.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Open Roles */}
      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
        <p className="mb-12 text-xs uppercase tracking-widest text-muted-foreground">{t("openPositions")}</p>
        <div className="divide-y divide-border">
          {openRoles.map((role) => (
            <div key={role.title} className="group py-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-medium text-foreground">{role.title}</h3>
                    <span className="rounded-full border border-border px-3 py-0.5 text-xs text-muted-foreground">
                      {role.department}
                    </span>
                  </div>
                  <div className="mb-4 flex gap-4 text-xs text-muted-foreground">
                    <span>{role.location}</span>
                    <span>·</span>
                    <span>{role.type}</span>
                  </div>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{role.description}</p>
                </div>
                <div className="shrink-0 md:ml-8 md:mt-1">
                  <a
                    href={`mailto:careers@evasion.com?subject=Application: ${role.title}`}
                    className="inline-block rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80"
                  >
                    {t("apply")}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spontaneous Application */}
      <div className="border-t border-border px-6 py-16 md:px-12 lg:px-20">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("spontaneousEyebrow")}</p>
        <h2 className="mt-4 text-2xl font-medium text-foreground">{t("spontaneousTitle")}</h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
          {t("spontaneousBody")}
        </p>
        <a
          href="mailto:careers@evasion.com?subject=Spontaneous Application"
          className="mt-8 inline-block rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          {t("getInTouch")}
        </a>
      </div>
    </PageLayout>
  );
}
