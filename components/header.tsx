"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

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

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-3xl transition-all duration-300 ${showOpaque ? "rounded-2xl border border-border/60 bg-background/80 shadow-[var(--shadow-header)] backdrop-blur-md md:rounded-full" : "bg-transparent"}`}
    >
      <div className="flex items-center justify-between transition-all duration-300 px-4 py-2">
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

        {/* CTA */}
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
            className={`transition-colors ${showOpaque ? "text-foreground" : "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"}`}
            aria-label={t("toggleMenu")}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background px-6 py-8 md:hidden rounded-b-2xl">
          <nav className="flex flex-col gap-6">
            <Link
              href="/#products"
              className="text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.products")}
            </Link>
            <Link
              href="/#technology"
              className="text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.technology")}
            </Link>
            <Link
              href="/#gallery"
              className="text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.gallery")}
            </Link>
            <Link
              href="/#accessories"
              className="text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.accessories")}
            </Link>
            <Link
              href="/#reserve"
              className="mt-4 bg-foreground px-5 py-3 text-center text-sm font-medium text-background rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("mobileCta")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
