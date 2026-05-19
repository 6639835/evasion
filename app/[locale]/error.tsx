"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { PageHero, PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Errors.appError");

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <PageLayout>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <div className="flex flex-wrap gap-3 px-5 pb-24 sm:px-8 md:px-12 lg:px-20">
        <Button onClick={reset} size="lg" className="rounded-full">
          {t("retry")}
        </Button>
        <Button asChild size="lg" variant="outline" className="rounded-full">
          <Link href="/">{t("home")}</Link>
        </Button>
      </div>
    </PageLayout>
  );
}
