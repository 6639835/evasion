import { FooterSection } from "@/components/sections/footer-section";
import { Header } from "@/components/header";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 sm:pt-24">{children}</main>
      <FooterSection />
    </div>
  );
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <div className="px-5 py-16 sm:px-8 sm:py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
      {eyebrow && (
        <p className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">
          {eyebrow}
        </p>
      )}
      <h1 className="max-w-3xl text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
        {title}
      </h1>
      {description && (
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
