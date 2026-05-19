import React from "react";
import type { Metadata, Viewport } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { ConsentAnalytics } from "@/components/consent-analytics";
import { CookieConsent } from "@/components/cookie-consent";
import { ThemeProvider } from "@/components/theme-provider";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

const icons: Metadata["icons"] = {
  icon: [
    {
      url: "/icon-light-32x32.png",
      media: "(prefers-color-scheme: light)",
    },
    {
      url: "/icon-dark-32x32.png",
      media: "(prefers-color-scheme: dark)",
    },
    {
      url: "/icon.svg",
      type: "image/svg+xml",
    },
  ],
  apple: "/apple-icon.png",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale: requestedLocale } = await params;

  if (!hasLocale(routing.locales, requestedLocale)) {
    notFound();
  }

  const locale = requestedLocale as Locale;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    icons,
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale: requestedLocale } = await params;

  if (!hasLocale(routing.locales, requestedLocale)) {
    notFound();
  }

  const locale = requestedLocale as Locale;
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <CookieConsent />
            <ConsentAnalytics />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
