"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "evasion.cookie-consent";
type Consent = "accepted" | "rejected";

function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

function writeConsent(value: Consent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* storage may be unavailable (private mode, quota) — ignore */
  }
  window.dispatchEvent(
    new CustomEvent<Consent>("evasion:consent-change", { detail: value }),
  );
}

export function CookieConsent() {
  const t = useTranslations("Cookies");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setOpen(readConsent() === null);
  }, []);

  if (!mounted || !open) return null;

  const decide = (value: Consent) => {
    writeConsent(value);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("title")}
      className={cn(
        "fixed inset-x-3 bottom-3 z-[60] sm:inset-x-auto sm:right-4 sm:bottom-4 sm:max-w-md",
        "rounded-2xl border border-border/80 bg-background/95 p-5 shadow-2xl backdrop-blur-md",
      )}
    >
      <p className="text-sm font-medium text-foreground">{t("title")}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {t("description")}{" "}
        <Link
          href="/cookies"
          className="underline underline-offset-4 hover:text-foreground"
        >
          {t("policy")}
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          size="sm"
          className="rounded-full"
          onClick={() => decide("accepted")}
        >
          {t("accept")}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="rounded-full"
          onClick={() => decide("rejected")}
        >
          {t("reject")}
        </Button>
      </div>
    </div>
  );
}
