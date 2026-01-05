# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
pnpm dev          # Start development server at localhost:3000
pnpm build        # Production build
pnpm lint         # Run ESLint
```

## Architecture

### Framework Stack
- **Next.js 16** with App Router (`src/app/`)
- **React 19** with TypeScript (strict mode)
- **Tailwind CSS v4** with PostCSS
- **TanStack Query** for server state management
- **React Hook Form + Zod** for form handling and validation

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Route group for auth pages (login, register)
│   ├── api/auth/          # API routes for authentication
│   ├── home/              # Main home page
│   ├── deposit/           # Payment flows (ewallet, instant, bank, crypto)
│   └── account/           # User account pages
├── components/
│   ├── ui/                # Reusable UI primitives (shadcn/ui pattern)
│   ├── layout/            # Layout components (header, sidebar, bottom-nav, mobile-container)
│   ├── auth/              # Authentication forms
│   └── home/              # Home page components
├── hooks/                 # Custom React hooks (use-auth.ts)
├── lib/
│   ├── utils.ts           # Utility functions (cn for className merging)
│   └── i18n/              # Internationalization (en, zh, ms locales)
├── providers/             # React context providers
├── schemas/               # Zod validation schemas
└── types/                 # TypeScript type definitions
```

### Key Patterns

**Mobile-First Design**: All content renders within `MobileContainer` (max-width: 430px), simulating a mobile app experience.

**Internationalization**: Uses a custom i18n system with `useI18n()` hook and `t()` function for translations. Supports English, Chinese, and Malay. Translations stored in JSON files under `src/lib/i18n/translations/`.

**Form Handling**: Forms use React Hook Form with Zod schema validation via `@hookform/resolvers`. See `src/schemas/auth.ts` for schema patterns.

**UI Components**: Uses shadcn/ui patterns with `class-variance-authority` for variants. Components use the `cn()` utility from `src/lib/utils.ts` for conditional class merging.

**Provider Hierarchy** (in `layout.tsx`):
```
QueryProvider → I18nProvider → MobileContainer → children
```

### Path Alias

Use `@/*` to import from `src/*` directory.

## SEO & Server-Side Rendering (SSR)

This application is optimized for SEO with comprehensive Server-Side Rendering support.

### SSR Architecture

- **Next.js App Router** provides SSR by default
- Pages are server-rendered unless marked with `"use client"`
- Client components are used only for interactivity (hooks, events)
- Initial HTML is always server-rendered for optimal SEO

### SEO Features

**Metadata** (`src/app/layout.tsx`):
- Comprehensive meta tags (title, description, keywords)
- Open Graph tags for social media sharing
- Twitter Card metadata
- Structured data (JSON-LD) for search engines
- Search engine verification codes

**Sitemap** (`src/app/sitemap.ts`):
- Auto-generated at `/sitemap.xml`
- Lists all public pages with priorities

**Robots.txt** (`src/app/robots.ts`):
- Auto-generated at `/robots.txt`
- Controls crawler access
- Blocks private pages (account, transactions)

**Documentation**: See `SEO.md` for complete SEO implementation guide.

### Environment Setup

Add to `.env.local`:
```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Adding Page-Specific SEO

```typescript
// Export metadata from any page
export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description for SEO",
  openGraph: {
    title: "OG Title",
    description: "OG Description",
    images: ["/og-image.png"],
  },
};
```
