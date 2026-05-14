# EVASION — Go Further

Marketing and e-commerce website for **EVASION**, a premium smart outdoor gear brand. Built with Next.js 16, featuring the Alpine & Forest product line — smart bottles engineered with GPS tracking, LED flashlight, and self-heating technology.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) + Radix UI
- **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/) (English & Simplified Chinese)
- **Theming:** next-themes (light / dark / system)
- **Package Manager:** pnpm
- **Analytics:** Vercel Analytics

## Getting Started

### Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)

### Installation

```bash
git clone https://github.com/your-username/evasion.git
cd evasion
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
pnpm build
pnpm start
```

### Lint

```bash
pnpm lint
```

## Project Structure

```
evasion/
├── app/
│   └── [locale]/          # Locale-aware routes (en, zh-CN)
│       ├── page.tsx        # Homepage
│       ├── about/
│       ├── careers/
│       ├── contact/
│       ├── faq/
│       ├── privacy/
│       ├── returns/
│       ├── shipping/
│       ├── terms/
│       └── warranty/
├── components/
│   ├── sections/           # Page sections (Hero, Products, Gallery…)
│   └── ui/                 # shadcn/ui primitives
├── i18n/                   # next-intl config and routing
├── messages/               # Translation files (en.json, zh-CN.json)
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
└── public/                 # Static assets
```

## Internationalization

The site supports English (`en`) and Simplified Chinese (`zh-CN`). English is the default locale and uses path-less routing (e.g., `/`). Chinese routes are prefixed (e.g., `/zh-CN`).

Translation strings live in `messages/en.json` and `messages/zh-CN.json`.

## Deployment

This project is optimized for [Vercel](https://vercel.com/). Push to the `main` branch to trigger a production deployment.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/evasion)

## License

MIT © 2026 EVASION
