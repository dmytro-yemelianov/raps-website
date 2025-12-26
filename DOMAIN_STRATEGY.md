# Domain & Hosting Strategy for RAPS Website

## Domain Options

| Domain | Availability | Cost | Recommendation |
|--------|--------------|------|----------------|
| `raps.dev` | Check required | ~$12-15/yr | ⭐ Best if available |
| `raps.io` | Check required | ~$30-40/yr | Good alternative |
| `raps-cli.dev` | Likely available | ~$12-15/yr | Clear, descriptive |
| `getraps.dev` | Likely available | ~$12-15/yr | Action-oriented |
| `raps.tools` | Check required | ~$30/yr | Modern feel |
| `dmytro-yemelianov.github.io/raps` | Free | $0 | Fallback option |

### Checking Availability

```bash
# Using whois
whois raps.dev

# Or use registrar search:
# - Namecheap: namecheap.com
# - Cloudflare: cloudflare.com/products/registrar
# - Google Domains: domains.google (sunset, use Squarespace)
# - Porkbun: porkbun.com (often cheapest)
```

## Recommended: Cloudflare Pages + Custom Domain

### Why Cloudflare?

1. **Free tier** is generous (unlimited bandwidth, builds)
2. **Global CDN** — fast everywhere
3. **Built-in analytics** — privacy-respecting
4. **DDoS protection** — enterprise-grade
5. **Domain registration** — at cost (no markup)
6. **Easy SSL** — automatic HTTPS

### Setup Steps

```bash
# 1. Buy domain on Cloudflare Registrar
#    - Go to cloudflare.com
#    - Add site → enter domain
#    - Register or transfer domain

# 2. Connect repository
#    - Pages → Create a project
#    - Connect GitHub repo
#    - Framework preset: Astro
#    - Build command: npm run build
#    - Output directory: dist

# 3. Add custom domain
#    - Pages → project → Custom domains
#    - Add domain → auto-configures DNS
```

### Alternative: GitHub Pages + Custom Domain

```bash
# 1. Enable GitHub Pages
#    - Repo Settings → Pages → Source: GitHub Actions

# 2. Configure custom domain
#    - Add domain in Pages settings
#    - Create CNAME file in public/:
echo "raps.dev" > public/CNAME

# 3. Configure DNS (at your registrar)
#    A records (IPv4):
#    185.199.108.153
#    185.199.109.153
#    185.199.110.153
#    185.199.111.153
#
#    AAAA records (IPv6):
#    2606:50c0:8000::153
#    2606:50c0:8001::153
#    2606:50c0:8002::153
#    2606:50c0:8003::153
#
#    Or CNAME for www:
#    www → dmytro-yemelianov.github.io
```

## URL Structure

### Marketing Site (Astro)
```
raps.dev/                    → Landing page
raps.dev/blog/               → Blog listing
raps.dev/blog/manual-tax/    → Blog post
raps.dev/about/              → About page
raps.dev/changelog/          → Changelog
raps.dev/rss.xml             → RSS feed
```

### Documentation (MkDocs) — Two Options

**Option A: Subdirectory (recommended for SEO)**
```
raps.dev/docs/               → MkDocs documentation
```

To achieve this, build MkDocs output into Astro's `dist/docs/`:

```yaml
# In MkDocs config
site_url: https://raps.dev/docs/

# In Astro build process
# Add script to package.json:
"build": "astro build && mkdocs build -d dist/docs"
```

**Option B: Subdomain**
```
docs.raps.dev/               → MkDocs documentation
```

Simpler to maintain separately, but splits SEO authority.

## SEO Considerations

### Canonical URLs
```astro
<!-- In BaseLayout.astro -->
<link rel="canonical" href={canonicalURL} />
```

### Sitemap
```js
// astro.config.mjs
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://raps.dev',
  integrations: [sitemap()],
});
```

### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://raps.dev/sitemap-index.xml
```

## Analytics Options

| Service | Privacy | Cost | Features |
|---------|---------|------|----------|
| **Cloudflare Analytics** | High | Free | Basic, built-in |
| **Plausible** | High | $9/mo | Great dashboard |
| **Fathom** | High | $14/mo | Simple, reliable |
| **Umami** | High | Free (self-host) | Full control |
| **Google Analytics** | Low | Free | Most features |

**Recommendation:** Cloudflare Analytics (free, built-in) or Plausible (better UX).

## Estimated Costs

| Item | Annual Cost |
|------|-------------|
| Domain (.dev) | $12-15 |
| Hosting (Cloudflare Pages) | $0 |
| Analytics (Cloudflare) | $0 |
| **Total** | **~$12-15/year** |

## Migration from GitHub Pages

If starting with GitHub Pages and moving to custom domain later:

1. Set up redirects from `dmytro-yemelianov.github.io/raps` to `raps.dev`
2. Update all internal links
3. Submit new sitemap to Google Search Console
4. Keep old GitHub Pages live for 301 redirect period (3-6 months)

## Domain Registration Checklist

- [ ] Check domain availability
- [ ] Register domain (Cloudflare or Porkbun recommended)
- [ ] Enable WHOIS privacy
- [ ] Configure DNS records
- [ ] Enable DNSSEC if available
- [ ] Set up SSL certificate (auto with Cloudflare/Pages)
- [ ] Configure www redirect (www → apex or apex → www)
- [ ] Add domain to Google Search Console
- [ ] Update all references (GitHub, LinkedIn, etc.)

## Quick Start

```bash
# 1. Register domain
# Go to cloudflare.com/products/registrar
# Search for raps.dev (or alternative)
# Complete purchase

# 2. Deploy site
cd raps-website
npm install
npm run build

# 3. Connect to Cloudflare Pages
# - Log into Cloudflare dashboard
# - Pages → Create project → Connect to Git
# - Select raps-website repository
# - Framework: Astro, Build: npm run build, Output: dist
# - Deploy

# 4. Add custom domain
# - Cloudflare Pages → project → Custom domains
# - Add raps.dev
# - Automatic DNS configuration

# Done! Site live at https://raps.dev
```
