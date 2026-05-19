"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";

const STORAGE_KEY = "evasion.cookie-consent";

export function ConsentAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        setEnabled(window.localStorage.getItem(STORAGE_KEY) === "accepted");
      } catch {
        setEnabled(false);
      }
    };

    read();
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      setEnabled(detail === "accepted");
    };
    window.addEventListener("evasion:consent-change", handler);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener("evasion:consent-change", handler);
      window.removeEventListener("storage", read);
    };
  }, []);

  if (!enabled) return null;
  return <Analytics />;
}
