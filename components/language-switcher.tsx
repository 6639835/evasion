"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  variant?: "default" | "hero";
}

export function LanguageSwitcher({ variant = "default" }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations("Locale");
  const isHero = variant === "hero";

  return (
    <div
      className={cn(
        "flex items-center rounded-full border p-0.5 text-xs font-medium",
        isHero
          ? "border-white/25 bg-white/10 text-white"
          : "border-border bg-background/70 text-foreground",
      )}
      aria-label={t("switch")}
    >
      {routing.locales.map((item) => {
        const active = item === locale;

        return (
          <Link
            key={item}
            href={pathname}
            locale={item}
            className={cn(
              "rounded-full px-2 py-1 transition-colors",
              active
                ? isHero
                  ? "bg-white text-foreground"
                  : "bg-foreground text-background"
                : isHero
                  ? "text-white/75 hover:text-white"
                  : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t(item)}
          </Link>
        );
      })}
    </div>
  );
}
