"use client";

import { useTranslations } from "next-intl";

import { FadeImage } from "@/components/fade-image";

const features = [
  { image: "/images/bottle-moss-top-view.png" },
  { image: "/images/bottle-backpack-pocket-trail.png" },
  { image: "/images/bottle-car-cupholder.jpg" },
  { image: "/images/bottle-backpack-pocket-closeup.png" },
  { image: "/images/led-flashlight-bottle.png" },
  { image: "/images/heating-campfire.png" },
];

export function FeaturedProductsSection() {
  const t = useTranslations("Home.featured");
  const translatedFeatures = t.raw("features") as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section id="technology" className="bg-background">
      <div className="px-5 py-14 text-center sm:px-6 sm:py-20 md:px-12 md:py-28 lg:px-20 lg:py-32 lg:pb-20">
        <h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
          {t("titleLine1")}
          <br />
          {t("titleLine2")}
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">
          {t("eyebrow")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 px-5 pb-16 sm:px-6 sm:pb-20 md:grid-cols-3 md:px-12 lg:px-20">
        {features.map((feature, index) => {
          const content = translatedFeatures[index];

          return (
            <div key={content.title} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <FadeImage
                  src={feature.image}
                  alt={content.title}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              <div className="py-6">
                <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                  {content.description}
                </p>
                <h3 className="text-foreground text-xl font-semibold">
                  {content.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center px-5 pb-16 sm:px-6 sm:pb-28 md:px-12 lg:px-20" />
    </section>
  );
}
