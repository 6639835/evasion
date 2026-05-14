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
      {/* Brand statement */}
      <div className="px-5 py-16 sm:px-8 sm:py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <p className="mx-auto max-w-5xl text-lg leading-relaxed text-foreground sm:text-xl md:text-2xl lg:text-3xl">
          {t("statement")}
        </p>
      </div>

      {/* Customer reviews */}
      <div className="border-t border-border px-5 py-16 sm:px-8 sm:py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <p className="mb-10 text-xs uppercase tracking-widest text-muted-foreground sm:mb-12">
          {t("reviewsEyebrow")}
        </p>
        <div className="flex flex-col gap-10 sm:gap-12 md:grid md:grid-cols-3 md:gap-6 lg:gap-8">
          {reviews.map((review) => (
            <div key={review.name} className="flex flex-col gap-5">
              <div className="flex gap-1" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-4 w-4 fill-foreground" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="flex-1 text-base leading-relaxed text-foreground md:text-lg">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-full bg-secondary">
                  <Image src={review.avatar} alt={review.name} fill className="object-cover" sizes="44px" />
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

      {/* Full-width image */}
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/9]">
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2400"
          alt={t("alt")}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
    </section>
  );
}
