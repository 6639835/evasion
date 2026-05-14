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
}: {
  accessory: (typeof accessories)[number];
  content: { name: string; description: string };
}) {
  return (
    <div className="group flex-shrink-0">
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
        <FadeImage
          src={accessory.image}
          alt={content.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 767px) 80vw, (max-width: 1023px) 33vw, 30vw"
        />
      </div>
      <div className="py-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-base font-medium leading-snug text-foreground sm:text-lg">
              {content.name}
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {content.description}
            </p>
          </div>
          <span className="text-lg font-medium text-foreground sm:text-xl">
            {accessory.price}
          </span>
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
      {/* Section heading */}
      <div className="px-5 py-16 sm:px-8 sm:py-24 md:px-12 md:py-16 lg:px-20">
        <h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
      </div>

      {/* Mobile: horizontal carousel */}
      <div className="flex gap-4 overflow-x-auto px-5 pb-16 snap-x snap-mandatory scrollbar-hide sm:gap-5 sm:px-8 sm:pb-24 md:hidden">
        {accessories.map((accessory, index) => (
          <div key={accessory.id} className="w-[78vw] snap-center sm:w-[56vw]">
            <AccessoryCard
              accessory={accessory}
              content={translatedAccessories[index]}
            />
          </div>
        ))}
      </div>

      {/* Desktop: 3-col grid */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-6 md:px-12 md:pb-32 lg:gap-8 lg:px-20 lg:pb-40">
        {accessories.map((accessory, index) => (
          <AccessoryCard
            key={accessory.id}
            accessory={accessory}
            content={translatedAccessories[index]}
          />
        ))}
      </div>
    </section>
  );
}
