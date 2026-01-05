# SEO Quick Start Guide

## 🚀 3-Minute Setup

### Step 1: Environment Variable (30 seconds)

Add to `.env.local`:
```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Step 2: Create Images (2 minutes)

1. **Open Graph Image** → `/public/og-image.png`
   - Size: 1200 x 630 pixels
   - Your brand + tagline

2. **Logo** → `/public/logo.png`
   - Size: 512 x 512 pixels
   - Transparent PNG

### Step 3: Build & Test (30 seconds)

```bash
pnpm build
pnpm start
```

Visit:
- http://localhost:3000/sitemap.xml
- http://localhost:3000/robots.txt

Done! ✅

## 📊 After Deployment

### Google Search Console

1. Visit: https://search.google.com/search-console
2. Add your property
3. Get verification code
4. Update `src/app/layout.tsx`:
   ```typescript
   verification: {
     google: "your-code-here",
   }
   ```
5. Submit sitemap: `https://yourdomain.com/sitemap.xml`

## 📈 Monitoring

### Daily
- Google Search Console - check for errors

### Weekly
- PageSpeed Insights: https://pagespeed.web.dev/
- Rankings: Track target keywords

### Monthly
- Update sitemap if new pages added
- Review Core Web Vitals
- Analyze search traffic

## 🎯 Quick Wins

1. **Page Titles**: Unique, 50-60 chars, keywords first
2. **Meta Descriptions**: 150-160 chars, compelling CTA
3. **Alt Text**: Descriptive image alt attributes
4. **Internal Links**: Link to related pages
5. **Fresh Content**: Update events page weekly

## 📚 Documentation

- **Full Guide**: `SEO.md`
- **Summary**: `SEO-IMPLEMENTATION-SUMMARY.md`
- **CLAUDE.md**: SEO section added

## ✅ What's Already Done

- ✅ SSR enabled (Next.js App Router)
- ✅ Comprehensive metadata
- ✅ Structured data (JSON-LD)
- ✅ Sitemap generation
- ✅ Robots.txt
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Mobile-first design

## 🎉 You're SEO-Ready!

Just add the environment variable and images, then deploy.

Questions? Check `SEO.md` for detailed explanations.
