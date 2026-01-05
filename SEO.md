# SEO Implementation Guide

This document outlines the SEO (Search Engine Optimization) implementation for the GameWeb application.

## Overview

GameWeb is built with **Next.js 16 App Router**, which provides excellent Server-Side Rendering (SSR) capabilities out of the box. This implementation focuses on maximizing SEO performance while maintaining the interactive features of the application.

## Architecture

### Server-Side Rendering (SSR)

Next.js App Router uses SSR by default for all pages unless explicitly marked with `"use client"`. This means:

- **Default behavior**: Pages are server-rendered
- **Client components**: Use `"use client"` directive only when necessary (for interactivity, hooks, event handlers)
- **Hybrid approach**: Server components can render static content, while client components handle user interactions

### Current Implementation

#### What's Already SSR-Optimized:
1. **Root Layout** (`src/app/layout.tsx`)
   - Server component by default
   - Comprehensive metadata for SEO
   - Structured data (JSON-LD) for search engines
   - Open Graph tags for social media
   - Twitter Card metadata

2. **Sitemap** (`src/app/sitemap.ts`)
   - Automatically generated at `/sitemap.xml`
   - Lists all public pages
   - Includes change frequency and priority

3. **Robots.txt** (`src/app/robots.ts`)
   - Automatically generated at `/robots.txt`
   - Controls crawler access
   - Points to sitemap

#### Pages Requiring Client Components:

Most pages use `"use client"` because they:
- Use React hooks (useState, useEffect, useRef)
- Handle user interactions
- Access browser APIs
- Use context providers (auth, i18n)

**This is correct and doesn't hurt SEO** because:
- Initial HTML is still server-rendered
- Content is available for crawlers
- Hydration adds interactivity client-side

## SEO Features Implemented

### 1. Metadata Configuration

**Location**: `src/app/layout.tsx`

```typescript
export const metadata: Metadata = {
  metadataBase: URL,
  title: { default, template },
  description: string,
  keywords: string[],
  authors, creator, publisher,
  openGraph: {...},
  twitter: {...},
  robots: {...},
  verification: {...}
}
```

**Features**:
- ✅ Title templates for consistent branding
- ✅ Comprehensive descriptions
- ✅ Relevant keywords
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card metadata
- ✅ Robot directives
- ✅ Search engine verification codes

### 2. Structured Data (JSON-LD)

**Location**: `src/app/layout.tsx`

Implements Schema.org structured data for:
- Business information
- Logo
- Social media links
- Website URL

**Benefits**:
- Better understanding by search engines
- Enhanced search results (rich snippets)
- Improved local SEO

### 3. Sitemap

**Location**: `src/app/sitemap.ts`

**Features**:
- Dynamic generation
- Includes all public pages
- Change frequency hints
- Priority indicators

**Access**: `https://yourdomain.com/sitemap.xml`

### 4. Robots.txt

**Location**: `src/app/robots.ts`

**Features**:
- Allows public pages
- Blocks private/sensitive pages
- References sitemap
- Configurable per user agent

**Access**: `https://yourdomain.com/robots.txt`

### 5. Viewport & Mobile Optimization

**Location**: `src/app/layout.tsx`

```typescript
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}
```

**Benefits**:
- Mobile-first design
- Prevents zoom issues
- Improves mobile rankings

## Page-Specific SEO

To add SEO metadata to specific pages, use the metadata export:

```typescript
// src/app/event/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Promotions",
  description: "Check out our latest casino promotions, bonuses, and special events.",
  openGraph: {
    title: "Events & Promotions | GameWeb",
    description: "Check out our latest casino promotions, bonuses, and special events.",
    images: ["/events/og-image.png"],
  },
};

export default function EventPage() {
  // Your page component
}
```

## Best Practices for SEO with Next.js

### 1. Server Components by Default

Only use `"use client"` when absolutely necessary:

```typescript
// ✅ Server component (default) - Best for SEO
export default function AboutPage() {
  return <div>Static content</div>;
}

// ❌ Client component - Only when needed
"use client";
export default function InteractivePage() {
  const [state, setState] = useState();
  return <div onClick={...}>Interactive content</div>;
}
```

### 2. Hybrid Composition

Combine server and client components:

```typescript
// app/page.tsx (Server Component)
import ClientComponent from './client-component';

export default function Page() {
  return (
    <div>
      <h1>Server-rendered heading</h1>
      <ClientComponent /> {/* Interactive part */}
    </div>
  );
}
```

### 3. Image Optimization

Use Next.js Image component:

```typescript
import Image from "next/image";

<Image
  src="/banner.png"
  alt="Descriptive alt text"
  width={1200}
  height={630}
  priority // For above-the-fold images
/>
```

### 4. Semantic HTML

Use proper HTML tags for better SEO:

```typescript
// ✅ Good
<main>
  <h1>Main Heading</h1>
  <article>
    <h2>Section Heading</h2>
    <p>Content</p>
  </article>
</main>

// ❌ Bad
<div>
  <div className="heading">Main Heading</div>
  <div>
    <div className="subheading">Section Heading</div>
    <div>Content</div>
  </div>
</div>
```

### 5. Link Optimization

Use Next.js Link component:

```typescript
import Link from "next/link";

// ✅ Good - prefetches on hover
<Link href="/events">Events</Link>

// ❌ Bad - requires full page reload
<a href="/events">Events</a>
```

## Environment Variables

Add to `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

This is used for:
- Sitemap URLs
- Open Graph URLs
- Canonical URLs
- Structured data

## Verification & Monitoring

### 1. Google Search Console

Add verification code to `metadata.verification.google` in `layout.tsx`

### 2. Testing Tools

- **Google PageSpeed Insights**: https://pagespeed.web.dev/
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Markup Validator**: https://validator.schema.org/
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly

### 3. Lighthouse Audit

Run in Chrome DevTools:
```bash
# Or via CLI
npx lighthouse https://yourdomain.com --view
```

## Performance Optimization for SEO

### 1. Core Web Vitals

Next.js automatically optimizes for:
- **LCP** (Largest Contentful Paint): Image optimization, code splitting
- **FID** (First Input Delay): JavaScript optimization
- **CLS** (Cumulative Layout Shift): Size attributes on images

### 2. Code Splitting

Automatic with Next.js:
- Each page is a separate bundle
- Dynamic imports for heavy components
- Automatic prefetching of links

### 3. Caching Strategy

Next.js App Router uses:
- **Static generation** for static pages
- **Server-side rendering** for dynamic pages
- **Client-side caching** with Router Cache

## Content Guidelines for SEO

### 1. Title Tags

- **Length**: 50-60 characters
- **Format**: Primary Keyword | Brand Name
- **Unique**: Each page should have unique title

### 2. Meta Descriptions

- **Length**: 150-160 characters
- **Action-oriented**: Include call-to-action
- **Keywords**: Natural keyword placement

### 3. Headings

- **H1**: One per page, main topic
- **H2-H6**: Hierarchical structure
- **Keywords**: Include relevant keywords naturally

### 4. Content

- **Original**: Unique, valuable content
- **Length**: Sufficient to cover topic thoroughly
- **Keywords**: Natural integration, avoid stuffing
- **Updates**: Regular content updates

## Internationalization (i18n) & SEO

For multi-language support:

```typescript
// Add to layout.tsx
<html lang={locale}>
  <head>
    <link rel="alternate" hrefLang="en" href="/en" />
    <link rel="alternate" hrefLang="zh" href="/zh" />
    <link rel="alternate" hrefLang="ms" href="/ms" />
  </head>
</html>
```

## Monitoring & Analytics

### Recommended Tools

1. **Google Analytics 4**: Track user behavior
2. **Google Search Console**: Monitor search performance
3. **Bing Webmaster Tools**: Additional search insights
4. **Ahrefs/SEMrush**: Competitive analysis

### Key Metrics to Track

- Organic traffic
- Keyword rankings
- Click-through rate (CTR)
- Bounce rate
- Page load time
- Core Web Vitals

## Next Steps

### Immediate Actions

1. ✅ **Set environment variable**: Add `NEXT_PUBLIC_SITE_URL` to `.env.local`
2. ⚠️ **Add verification codes**: Update `metadata.verification` in `layout.tsx`
3. ⚠️ **Create OG images**: Add `/og-image.png` (1200x630)
4. ⚠️ **Add logo**: Add `/logo.png` for structured data

### Ongoing Optimization

1. **Add page-specific metadata** to important pages
2. **Create blog/content section** for fresh content
3. **Build quality backlinks** through partnerships
4. **Monitor and improve Core Web Vitals**
5. **Regular content updates** on event page
6. **A/B test** titles and descriptions

## Troubleshooting

### Issue: Metadata not showing

**Solution**: Ensure you're exporting metadata from server components, not client components.

### Issue: Sitemap not accessible

**Solution**: Build and deploy the app. Check `/sitemap.xml` in production.

### Issue: Poor mobile performance

**Solution**:
- Use Next.js Image component
- Minimize client-side JavaScript
- Enable compression in hosting

### Issue: Content not indexed

**Solution**:
- Check robots.txt
- Submit sitemap to Google Search Console
- Ensure pages are not blocking crawlers

## Resources

- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Web.dev](https://web.dev/) - Performance and SEO best practices

## Summary

Your Next.js application is **already optimized for SSR and SEO**. The App Router provides:

- ✅ Server-side rendering by default
- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ Font optimization
- ✅ Link prefetching

With the added metadata, structured data, sitemap, and robots.txt, your site is well-positioned for search engine success.

**Remember**: SEO is ongoing. Monitor, measure, and continuously improve based on data.
