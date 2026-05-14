"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export function TestimonialsSection() {
  const t = useTranslations("Home.testimonials");
  const reviews = t.raw("reviews") as Array<{
    quote: string;
    name: string;
    role: string;
    avatar: string;
  }>;

  return (
    <section id="about" className="bg-background">
      {/* Large Text Statement */}
      <div className="px-5 py-16 sm:px-6 sm:py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <p className="mx-auto max-w-5xl text-lg leading-relaxed text-foreground sm:text-xl md:text-2xl lg:text-3xl xl:text-[2.5rem] xl:leading-snug">
          {t("statement")}
        </p>
      </div>

      {/* Customer Testimonials */}
      <div className="border-t border-border px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
        <p className="mb-12 text-xs uppercase tracking-widest text-muted-foreground">
          {t("reviewsEyebrow")}
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.name} className="flex flex-col gap-6">
              <p className="flex-1 text-base leading-relaxed text-foreground md:text-lg">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-secondary">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Image */}
      <div className="relative aspect-[16/9] w-full">
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2400"
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
