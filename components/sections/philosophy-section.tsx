"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, useCallback } from "react";

export function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [alpineTranslateX, setAlpineTranslateX] = useState(-100);
  const [forestTranslateX, setForestTranslateX] = useState(100);
  const [titleOpacity, setTitleOpacity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number | null>(null);
  const t = useTranslations("Home.philosophy");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const updateTransforms = useCallback(() => {
    if (!sectionRef.current || isMobile) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollableRange = sectionRef.current.offsetHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / scrollableRange));
    setAlpineTranslateX((1 - progress) * -100);
    setForestTranslateX((1 - progress) * 100);
    setTitleOpacity(1 - progress);
  }, [isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateTransforms);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransforms();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateTransforms]);

  return (
    <section id="products" className="bg-background">
      {/* Mobile: static stacked layout */}
      <div className="md:hidden px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="mb-10 text-2xl font-medium tracking-tight text-foreground sm:text-3xl text-center">
          {t("title")}
        </h2>
        <div className="flex flex-col gap-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/images/product-backpack.png" alt={t("alt.alpine")} fill className="object-cover" sizes="(max-width: 767px) 100vw" />
            <div className="absolute bottom-4 left-4">
              <span className="rounded-full bg-image-chip px-3 py-1.5 text-sm font-medium text-image-chip-foreground backdrop-blur-md">
                Alpine $299
              </span>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/images/bottle-forest-hands.png" alt={t("alt.forest")} fill className="object-cover" sizes="(max-width: 767px) 100vw" />
            <div className="absolute bottom-4 left-4">
              <span className="rounded-full bg-image-chip px-3 py-1.5 text-sm font-medium text-image-chip-foreground backdrop-blur-md">
                Forest $199
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: sticky scroll animation */}
      <div ref={sectionRef} className="relative hidden md:block" style={{ height: "200vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-full">
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
              style={{ opacity: titleOpacity }}
            >
              <h2 className="text-[8vw] font-medium leading-[0.95] tracking-tighter text-foreground lg:text-[6.5vw] text-center px-8">
                {t("title")}
              </h2>
            </div>
            <div className="relative z-10 grid grid-cols-2 gap-5 px-12 lg:gap-6 lg:px-20">
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                style={{ transform: `translate3d(${alpineTranslateX}%, 0, 0)`, backfaceVisibility: "hidden" }}
              >
                <Image src="/images/product-backpack.png" alt={t("alt.alpine")} fill className="object-cover" sizes="50vw" />
                <div className="absolute bottom-6 left-6">
                  <span className="rounded-full bg-image-chip px-4 py-2 text-sm font-medium text-image-chip-foreground backdrop-blur-md">
                    Alpine $299
                  </span>
                </div>
              </div>
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                style={{ transform: `translate3d(${forestTranslateX}%, 0, 0)`, backfaceVisibility: "hidden" }}
              >
                <Image src="/images/bottle-forest-hands.png" alt={t("alt.forest")} fill className="object-cover" sizes="50vw" />
                <div className="absolute bottom-6 left-6">
                  <span className="rounded-full bg-image-chip px-4 py-2 text-sm font-medium text-image-chip-foreground backdrop-blur-md">
                    Forest $199
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-5 py-16 sm:px-8 sm:py-24 md:px-12 md:py-32 lg:px-20 lg:py-40 lg:pb-16">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {t("eyebrow")}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl md:text-2xl lg:text-3xl">
            {t("description")}
          </p>
        </div>
      </div>
    </section>
  );
}
