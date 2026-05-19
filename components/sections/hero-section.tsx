"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const word = "EVASION";

const sideImages = [
  {
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1000",
    altKey: "mountainHiking",
    position: "left",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1000",
    altKey: "campingStars",
    position: "left",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1000",
    altKey: "forestExploration",
    position: "right",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=1000",
    altKey: "lakeCamping",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const t = useTranslations("Home.hero");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setScrollProgress(0);
      return;
    }

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prefersReducedMotion]);

  // Text fades out first (0 to 0.2)
  const textOpacity = Math.max(0, 1 - (scrollProgress / 0.2));
  
  // Image transforms start after text fades (0.2 to 1)
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  
  // On mobile: smaller side panels to keep center image dominant
  const mobileMultiplier = isMobile ? 0.65 : 1;
  
  const centerWidth = 100 - (imageProgress * (isMobile ? 40 : 58));
  const centerHeight = 100 - (imageProgress * (isMobile ? 20 : 30));
  const sideWidth = imageProgress * (isMobile ? 16 : 22) * mobileMultiplier;
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100);
  const sideTranslateRight = 100 - (imageProgress * 100);
  const borderRadius = imageProgress * 20;
  const gap = imageProgress * (isMobile ? 8 : 16);
  const sideTranslateY = -(imageProgress * (isMobile ? 8 : 15));

  return (
    <section ref={sectionRef} className="relative bg-background">
      {/* Sticky container for scroll animation */}
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Gradient scrim so transparent header text stays readable over the image */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="flex h-full w-full items-center justify-center">
          {/* Bento Grid Container */}
          <div 
            className="relative flex h-full w-full items-stretch justify-center"
            style={{
              gap: `${gap}px`,
              padding: `${imageProgress * (isMobile ? 10 : 16)}px`,
              paddingBottom: `${(isMobile ? 48 : 60) + (imageProgress * (isMobile ? 24 : 40))}px`,
            }}
          >
            
            {/* Left Column */}
            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden will-change-transform"
                  style={{ flex: img.span, borderRadius: `${borderRadius}px` }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={t(`alt.${img.altKey}`)}
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </div>
              ))}
            </div>

            {/* Main Hero Image - Center */}
            <div 
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: `${centerHeight}%`,
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              <Image
                src="/images/hero-main.png"
                alt={t("alt.main")}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              
              {/* Overlay Text - Fades out first */}
              <div 
                className="absolute inset-0 flex items-end overflow-hidden"
                style={{ opacity: textOpacity }}
              >
                <h1 className="w-full text-[18vw] font-medium leading-[0.8] tracking-tighter text-white sm:text-[20vw] md:text-[22vw]">
                  {word.split("").map((letter, index) => (
                    <span
                      key={index}
                      className={
                        prefersReducedMotion
                          ? "inline-block opacity-100"
                          : "inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                      }
                      style={
                        prefersReducedMotion
                          ? undefined
                          : {
                              animationDelay: `${index * 0.08}s`,
                              transition: "all 1.5s",
                              transitionTimingFunction:
                                "cubic-bezier(0.86, 0, 0.07, 1)",
                            }
                      }
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
              </div>
            </div>

            {/* Right Column */}
            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden will-change-transform"
                  style={{ flex: img.span, borderRadius: `${borderRadius}px` }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={t(`alt.${img.altKey}`)}
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Scroll space to enable animation (skipped when reduced motion is requested) */}
      {!prefersReducedMotion && <div className="h-[200vh]" />}

      {/* Tagline Section */}
      <div className="px-5 py-16 sm:px-8 sm:py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-muted-foreground sm:text-xl md:text-2xl lg:text-3xl">
          {t("taglineLine1")}
          <br />
          {t("taglineLine2")}
        </p>
      </div>
    </section>
  );
}
