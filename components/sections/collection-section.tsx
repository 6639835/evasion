"use client";

import { useTranslations } from "next-intl";

import { FadeImage } from "@/components/fade-image";

const accessories = [
  { id: 1, price: "$89", image: "/images/accessory-charger.png" },
  { id: 2, price: "$45", image: "/images/accessory-sleeve.png" },
  { id: 3, price: "$129", image: "/images/accessory-bike-mount.png" },
  { id: 4, price: "$39", image: "/images/accessory-strap.png" },
  { id: 5, price: "$29", image: "/images/accessory-carabiner.png" },
  { id: 6, price: "$149", image: "/images/accessory-speaker-base.png" },
];

function AccessoryCard({
  accessory,
  content,
  priceClassName,
}: {
  accessory: (typeof accessories)[number];
  content: { name: string; description: string };
  priceClassName: string;
}) {
  return (
    <div className="group">
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
        <FadeImage
          src={accessory.image}
          alt={content.name}
          fill
          className="object-cover group-hover:scale-105"
        />
      </div>

      <div className="py-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-medium leading-snug text-foreground">
              {content.name}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {content.description}
            </p>
          </div>
          <span className={priceClassName}>{accessory.price}</span>
        </div>
      </div>
    </div>
  );
}

export function CollectionSection() {
  const t = useTranslations("Home.collection");
  const translatedAccessories = t.raw("accessories") as Array<{
    name: string;
    description: string;
  }>;

  return (
    <section id="accessories" className="bg-background">
      <div className="px-5 py-14 sm:px-6 sm:py-20 md:px-12 lg:px-20 md:py-10">
        <h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl md:text-4xl">
          {t("title")}
        </h2>
      </div>

      <div className="pb-16 sm:pb-24">
        <div className="flex gap-4 overflow-x-auto px-5 pb-6 sm:gap-6 sm:px-6 md:hidden snap-x snap-mandatory scrollbar-hide">
          {accessories.map((accessory, index) => (
            <div
              key={accessory.id}
              className="flex-shrink-0 w-[80vw] snap-center sm:w-[60vw]"
            >
              <AccessoryCard
                accessory={accessory}
                content={translatedAccessories[index]}
                priceClassName="text-lg font-medium text-foreground"
              />
            </div>
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-6 md:px-12 lg:px-20 lg:gap-8">
          {accessories.map((accessory, index) => (
            <AccessoryCard
              key={accessory.id}
              accessory={accessory}
              content={translatedAccessories[index]}
              priceClassName="font-medium text-foreground text-2xl"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
