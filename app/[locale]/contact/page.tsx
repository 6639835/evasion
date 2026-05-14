import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { PageLayout, PageHero } from "@/components/page-layout";
import { getLocalizedMetadata } from "@/i18n/metadata";
import { setLocaleFromParams, type LocalePageProps } from "@/i18n/page";

const offices = [
  {
    email: "hello@evasion.com",
    phone: "+46 8 123 456 78",
  },
  {
    email: "research@evasion.com",
    phone: "+41 44 987 654 32",
  },
];

const topics = [
  { email: "support@evasion.com" },
  { email: "orders@evasion.com" },
  { email: "press@evasion.com" },
  { email: "partners@evasion.com" },
  { email: "careers@evasion.com" },
];

export async function generateMetadata({ params }: LocalePageProps) {
  const locale = await setLocaleFromParams(params);
  return getLocalizedMetadata(locale, "Pages.contact", "/contact");
}

export default async function ContactPage({ params }: LocalePageProps) {
  const locale = await setLocaleFromParams(params);
  const t = await getTranslations({ locale, namespace: "Pages.contact" });
  const topicLabels = t.raw("topics") as string[];
  const translatedOffices = t.raw("offices") as Array<{
    city: string;
    role: string;
    address: string;
  }>;

  return (
    <PageLayout>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
      />

      {/* Sticky split layout */}
      <div className="border-t border-border md:grid md:grid-cols-2">

        {/* Left — sticky image */}
        <div className="relative hidden md:block">
          <div className="sticky top-0 h-screen overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600"
              alt={t("alt")}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-media-backdrop/30" />
            <div className="absolute bottom-10 left-10">
              <p className="text-xs uppercase tracking-widest text-white/60">EVASION</p>
              <p className="mt-2 text-2xl font-medium text-white">{t("tagline")}</p>
            </div>
          </div>
        </div>

        {/* Right — scrollable content */}
        <div>
          {/* Contact by Topic */}
          <div className="px-8 py-16 lg:px-14">
            <p className="mb-8 text-xs uppercase tracking-widest text-muted-foreground">{t("topicsHeading")}</p>
            <div className="divide-y divide-border">
              {topics.map((topic, index) => (
                <div key={topic.email} className="flex items-center justify-between py-5">
                  <span className="text-sm font-medium text-foreground">{topicLabels[index]}</span>
                  <a
                    href={`mailto:${topic.email}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {topic.email}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Offices */}
          <div className="border-t border-border bg-secondary px-8 py-16 lg:px-14">
            <p className="mb-8 text-xs uppercase tracking-widest text-muted-foreground">{t("officesHeading")}</p>
            <div className="space-y-10">
              {offices.map((office, index) => {
                const content = translatedOffices[index];

                return (
                <div key={content.city}>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{content.role}</p>
                  <h3 className="mt-2 text-lg font-medium text-foreground">{content.city}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{content.address}</p>
                  <a
                    href={`mailto:${office.email}`}
                    className="mt-2 block text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {office.email}
                  </a>
                  <p className="mt-1 text-sm text-muted-foreground">{office.phone}</p>
                </div>
                );
              })}
            </div>
          </div>

          {/* Response note */}
          <div className="px-8 py-12 lg:px-14">
            <p className="text-sm text-muted-foreground">
              {t("responseNote")}
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
