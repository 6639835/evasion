"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const themes = [
  { value: "light", icon: Sun },
  { value: "dark", icon: Moon },
  { value: "system", icon: Monitor },
] as const;

interface ThemeToggleProps {
  variant?: "default" | "hero";
}

export function ThemeToggle({ variant = "default" }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("Theme");

  useEffect(() => {
    setMounted(true);
  }, []);

  const isHero = variant === "hero";

  return (
    <div
      className={cn(
        "flex items-center rounded-full border p-0.5",
        isHero
          ? "border-white/25 bg-white/10 text-white"
          : "border-border bg-background/70 text-foreground",
      )}
      aria-label={t("change")}
    >
      {themes.map(({ value, icon: Icon }) => {
        const active = mounted && theme === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            aria-label={t(value as "light" | "dark" | "system")}
            className={cn(
              "rounded-full p-1.5 transition-colors",
              active
                ? isHero
                  ? "bg-white text-foreground"
                  : "bg-foreground text-background"
                : isHero
                  ? "text-white/75 hover:text-white"
                  : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon size={12} />
          </button>
        );
      })}
    </div>
  );
}
