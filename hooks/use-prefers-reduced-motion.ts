"use client";

import { useEffect, useState } from "react";

/**
 * Returns `true` when the user has requested reduced motion via the OS.
 * Defaults to `false` during SSR / before hydration.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(query.matches);

    update();

    if (query.addEventListener) {
      query.addEventListener("change", update);
      return () => query.removeEventListener("change", update);
    }
    // Safari < 14 fallback
    query.addListener(update);
    return () => query.removeListener(update);
  }, []);

  return prefersReducedMotion;
}
