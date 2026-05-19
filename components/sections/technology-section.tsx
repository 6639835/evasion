"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setProgress(1);
      return;
    }
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const startOffset = windowHeight * 0.9;
      const endOffset = windowHeight * 0.1;
      
      const totalDistance = startOffset - endOffset;
      const currentPosition = startOffset - rect.top;
      
      const newProgress = Math.max(0, Math.min(1, currentPosition / totalDistance));
      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  const words = text.split(" ");
  
  return (
    <p
      ref={containerRef}
      className="text-lg font-semibold leading-snug sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
    >
      {words.map((word, index) => {
        const wordProgress = index / words.length;
        const isRevealed = progress > wordProgress;
        
        return (
          <span
            key={index}
            className="transition-colors duration-150"
            style={{
              color: isRevealed ? "var(--foreground)" : "var(--reveal-muted)",
            }}
          >
            {word}{index < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}

const sideImages = [
  {
    src: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=1000",
    altKey: "forestTrail",
    position: "left",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?q=80&w=1000",
    altKey: "mountainPeak",
    position: "left",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?q=80&w=1000",
    altKey: "alpineLandscape",
    position: "right",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?q=80&w=1000",
    altKey: "snowMountain",
    position: "right",
    span: 1,
  },
];

export function TechnologySection() {
  const t = useTranslations("Home.technology");
  const sectionRef = useRef<HTMLElement>(null);
  const textSectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const descriptionText = t("description");
  const titleWords = t.raw("titleWords") as string[];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
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

  const titleOpacity = Math.max(0, 1 - (scrollProgress / 0.2));
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  
  const centerWidth = 100 - (imageProgress * (isMobile ? 40 : 58));
  const sideWidth = imageProgress * (isMobile ? 16 : 22);
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100);
  const sideTranslateRight = 100 - (imageProgress * 100);
  const borderRadius = imageProgress * 24;
  const gap = imageProgress * (isMobile ? 8 : 16);

  return (
    <section ref={sectionRef} className="relative bg-media-backdrop">
      {/* Sticky container for scroll animation */}
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          <div 
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px`, padding: `${imageProgress * (isMobile ? 10 : 16)}px` }}
          >
            
            {/* Left Column */}
            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateLeft}%)`,
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

            {/* Main Center Image */}
            <div 
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: "100%",
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1476611338391-6f395a0ebc7b?q=80&w=2000"
                alt={t("alt.main")}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-media-backdrop/40" />
              
              {/* Title Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <h2 className="max-w-3xl font-medium leading-tight tracking-tight text-white text-4xl sm:text-5xl md:text-5xl lg:text-7xl">
                  {titleWords.map((word, index) => {
                    const wordFadeStart = index * 0.07;
                    const wordFadeEnd = wordFadeStart + 0.07;
                    const wordProgress = Math.max(0, Math.min(1, (scrollProgress - wordFadeStart) / (wordFadeEnd - wordFadeStart)));
                    const wordOpacity = 1 - wordProgress;
                    const wordBlur = wordProgress * 10;
                    
                    return (
                      <span
                        key={index}
                        className="inline-block"
                        style={{
                          opacity: wordOpacity,
                          filter: `blur(${wordBlur}px)`,
                          transition: 'opacity 0.1s linear, filter 0.1s linear',
                          marginRight: index < 2 ? '0.3em' : '0',
                        }}
                      >
                        {word}
                        {index === 1 && <br />}
                      </span>
                    );
                  })}
                </h2>
              </div>
            </div>

            {/* Right Column */}
            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateRight}%)`,
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

      {/* Description Section with Scroll Reveal */}
      <div 
        ref={textSectionRef}
        className="relative overflow-hidden bg-background px-5 py-16 sm:px-8 sm:py-24 md:px-12 md:py-32 lg:px-20 lg:py-40"
      >
        <div className="relative z-10 mx-auto max-w-4xl">
          <ScrollRevealText text={descriptionText} />
        </div>
      </div>
    </section>
  );
}
