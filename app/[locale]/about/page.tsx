import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { PageLayout, PageHero } from "@/components/page-layout";
import { getLocalizedMetadata } from "@/i18n/metadata";
import { setLocaleFromParams, type LocalePageProps } from "@/i18n/page";

const team = [
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600",
  },
  {
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600",
  },
  {
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600",
  },
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600",
  },
];

export async function generateMetadata({ params }: LocalePageProps) {
  const locale = await setLocaleFromParams(params);
  return getLocalizedMetadata(locale, "Pages.about", "/about");
}

export default async function AboutPage({ params }: LocalePageProps) {
  const locale = await setLocaleFromParams(params);
  const t = await getTranslations({ locale, namespace: "Pages.about" });
  const story = t.raw("story") as string[];
  const values = t.raw("values") as Array<{ title: string; description: string }>;
  const translatedTeam = t.raw("team") as Array<{
    name: string;
    role: string;
    bio: string;
  }>;

  return (
    <PageLayout>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
      />

      {/* Story Section */}
      <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=1200"
            alt={t("alt")}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex items-center bg-secondary px-8 py-16 md:px-12 lg:px-16">
          <div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {story[0]}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {story[1]}
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
        <p className="mb-12 text-xs uppercase tracking-widest text-muted-foreground">{t("valuesEyebrow")}</p>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title}>
              <h3 className="mb-4 text-xl font-medium text-foreground">{value.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="border-t border-border px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
        <p className="mb-12 text-xs uppercase tracking-widest text-muted-foreground">{t("teamEyebrow")}</p>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => {
            const content = translatedTeam[index];

            return (
            <div key={content.name}>
              <div className="relative mb-6 aspect-square overflow-hidden rounded-2xl bg-secondary">
                <Image
                  src={member.image}
                  alt={content.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium text-foreground">{content.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{content.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{content.bio}</p>
            </div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}
