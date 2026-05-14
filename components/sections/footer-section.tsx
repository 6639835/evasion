"use client";

import { useTranslations } from "next-intl";

import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Link } from "@/i18n/navigation";

const footerLinks = {
  explore: [
    { label: "products", href: "/#products" },
    { label: "technology", href: "/#technology" },
    { label: "gallery", href: "/#gallery" },
    { label: "accessories", href: "/#accessories" },
  ],
  about: [
    { label: "story", href: "/about" },
    { label: "team", href: "/about" },
    { label: "careers", href: "/careers" },
    { label: "contact", href: "/contact" },
  ],
  service: [
    { label: "faq", href: "/faq" },
    { label: "shipping", href: "/shipping" },
    { label: "returns", href: "/returns" },
    { label: "warranty", href: "/warranty" },
  ],
};

export function FooterSection() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-background">
      {/* Main Footer Content */}
      <div className="border-t border-border px-5 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-2 gap-8 sm:gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 mb-2 md:col-span-1 md:mb-0 lg:col-span-2">
            <Link href="/" className="text-lg font-medium text-foreground">
              EVASION
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">{t("headings.explore")}</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(`links.${link.label}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">{t("headings.about")}</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(`links.${link.label}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">{t("headings.service")}</h4>
            <ul className="space-y-3">
              {footerLinks.service.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(`links.${link.label}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Legal Links */}
      <div className="border-t border-border px-5 py-4 sm:px-6 md:px-12 lg:px-20">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/privacy" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
            {t("links.privacy")}
          </Link>
          <Link href="/terms" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
            {t("links.terms")}
          </Link>
          <Link href="/cookies" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
            {t("links.cookies")}
          </Link>
          <Link href="/refund-policy" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
            {t("links.refund")}
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border px-5 py-6 sm:px-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            {t("rights")}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              YouTube
            </Link>
          </div>

          {/* Preferences */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
