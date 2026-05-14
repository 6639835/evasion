"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Header");
  const isHome = pathname === "/";

  const showOpaque = !isHome || isScrolled || isMenuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-3xl transition-all duration-300 ${showOpaque ? "rounded-2xl border border-border/60 bg-background/80 shadow-[var(--shadow-header)] backdrop-blur-md md:rounded-full" : "bg-transparent"}`}
    >
      <div className="flex items-center justify-between transition-all duration-300 px-4 py-2.5 md:py-2">
        {/* Logo */}
        <Link
          href="/"
          className={`text-lg font-medium tracking-tight transition-colors duration-300 ${showOpaque ? "text-foreground" : "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"}`}
        >
          EVASION
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/#products"
            className={`text-sm transition-colors ${showOpaque ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"}`}
          >
            {t("nav.products")}
          </Link>
          <Link
            href="/#technology"
            className={`text-sm transition-colors ${showOpaque ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"}`}
          >
            {t("nav.technology")}
          </Link>
          <Link
            href="/#gallery"
            className={`text-sm transition-colors ${showOpaque ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"}`}
          >
            {t("nav.gallery")}
          </Link>
          <Link
            href="/#accessories"
            className={`text-sm transition-colors ${showOpaque ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"}`}
          >
            {t("nav.accessories")}
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/#reserve"
            className={`px-4 py-2 text-sm font-medium transition-all rounded-full ${showOpaque ? "bg-foreground text-background hover:opacity-80" : "bg-white text-foreground hover:bg-white/90 dark:bg-white/10 dark:text-white dark:border dark:border-white/20 dark:hover:bg-white/20"}`}
          >
            {t("cta")}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-1 transition-colors touch-manipulation ${showOpaque ? "text-foreground" : "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"}`}
            aria-label={t("toggleMenu")}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md px-6 pb-safe-area-inset-bottom md:hidden rounded-b-2xl">
          <nav className="flex flex-col py-6 gap-0">
            {[
              { href: "/#products", label: t("nav.products") },
              { href: "/#technology", label: t("nav.technology") },
              { href: "/#gallery", label: t("nav.gallery") },
              { href: "/#accessories", label: t("nav.accessories") },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="py-4 text-base font-medium text-foreground border-b border-border/50 last:border-b-0 active:opacity-60 transition-opacity"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

            <Link
              href="/#reserve"
              className="mt-6 bg-foreground px-5 py-3.5 text-center text-sm font-medium text-background rounded-full active:opacity-80 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("mobileCta")}
            </Link>

            {/* Preferences row */}
            <div className="mt-6 flex items-center justify-between">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
