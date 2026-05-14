"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, useCallback } from "react";

export function GallerySection() {
  const t = useTranslations("Home.gallery");
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState("100vh");
  const [translateX, setTranslateX] = useState(0);
  const rafRef = useRef<number | null>(null);

  const altText = t.raw("alt") as string[];
  const images = [
    { src: "/images/bottle-bike.png" },
    { src: "/images/bottle-lake.png" },
    { src: "/images/bottle-water.png" },
    { src: "/images/bottle-stream.png" },
    { src: "/images/bottle-fire.png" },
    { src: "/images/bottle-snow.png" },
    { src: "/images/bottle-mountain.png" },
    { src: "/images/bottle-canyon.png" },
  ];

  useEffect(() => {
    const calculateHeight = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const totalHeight = viewportHeight + (containerWidth - viewportWidth);
      setSectionHeight(`${totalHeight}px`);
    };

    const timer = setTimeout(calculateHeight, 100);
    window.addEventListener("resize", calculateHeight, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  const updateTransform = useCallback(() => {
    if (!galleryRef.current || !containerRef.current) return;
    
    const rect = galleryRef.current.getBoundingClientRect();
    const containerWidth = containerRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    
    const totalScrollDistance = containerWidth - viewportWidth;
    const scrolled = Math.max(0, -rect.top);
    const progress = Math.min(1, scrolled / totalScrollDistance);
    const newTranslateX = progress * -totalScrollDistance;
    
    setTranslateX(newTranslateX);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateTransform);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransform();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateTransform]);

  return (
    <section 
      id="gallery"
      ref={galleryRef}
      className="relative bg-background"
      style={{ height: sectionHeight }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Section label */}
        <div className="absolute top-6 left-5 z-10 sm:left-8 md:left-12 lg:left-20">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Gallery
          </p>
        </div>

        <div className="flex h-full items-center">
          {/* Horizontal scrolling container */}
          <div 
            ref={containerRef}
            className="flex gap-3 px-5 sm:gap-5 sm:px-8 md:gap-6 md:px-12 lg:px-20"
            style={{
              transform: `translate3d(${translateX}px, 0, 0)`,
              WebkitTransform: `translate3d(${translateX}px, 0, 0)`,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              perspective: 1000,
              WebkitPerspective: 1000,
              touchAction: 'pan-y',
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 overflow-hidden rounded-2xl"
                style={{
                  // Responsive image card sizes per breakpoint via inline calc
                  width: 'clamp(72vw, 80vw, 85vw)',
                  height: 'clamp(58vh, 65vh, 72vh)',
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)',
                }}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={altText[index]}
                  fill
                  className="object-cover"
                  priority={index < 3}
                  sizes="(max-width: 767px) 80vw, (max-width: 1023px) 60vw, 45vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
