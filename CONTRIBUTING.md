# Contributing to EVASION

Thank you for your interest in contributing!

## Development setup

```bash
git clone https://github.com/your-username/evasion.git
cd evasion
pnpm install
pnpm dev
```

## Workflow

1. Fork the repo and create a branch from `main`.
2. Make your changes, following the guidelines below.
3. Run `pnpm lint` and `pnpm build` to verify nothing is broken.
4. Open a pull request against `main`.

## Guidelines

### Code style

- TypeScript everywhere — avoid `any`.
- Use Tailwind utility classes; avoid inline styles.
- Keep components focused. Prefer small, composable pieces over large monoliths.

### Internationalization

Any user-visible string must be added to **both** `messages/en.json` and `messages/zh-CN.json`. Use the `useTranslations` hook from `next-intl` — never hard-code strings in components.

### Commits

Use conventional commit prefixes:

| Prefix | When to use |
|--------|-------------|
| `feat:` | New feature or section |
| `fix:` | Bug fix |
| `chore:` | Tooling, deps, config |
| `content:` | Copy or translation update |
| `style:` | Visual / CSS changes |
| `refactor:` | Code reorganization |

Example: `feat: add product detail modal`

## Reporting issues

Use the GitHub issue templates for bugs and feature requests.
