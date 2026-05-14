"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export function TestimonialsSection() {
  const t = useTranslations("Home.testimonials");

  return (
    <section id="about" className="bg-background">
      {/* Large Text Statement */}
      <div className="px-5 py-16 sm:px-6 sm:py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <p className="mx-auto max-w-5xl text-lg leading-relaxed text-foreground sm:text-xl md:text-2xl lg:text-3xl xl:text-[2.5rem] xl:leading-snug">
          {t("statement")}
        </p>
      </div>

      {/* About Image */}
      <div className="relative aspect-[16/9] w-full">
        <Image
          src="/images/coastal-cliff-landscape.png"
          alt={t("alt")}
          fill
          className="object-cover"
        />
        {/* Fade gradient overlay - white at bottom fading to transparent at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
    </section>
  );
}
