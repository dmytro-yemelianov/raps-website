# 🌼 RAPS Website

The official website and blog for [RAPS](https://github.com/dmytro-yemelianov/raps) — **R**ust **A**utodesk **P**latform **S**ervices CLI (rapeseed 🌼).

🌐 **Live site:** [rapscli.xyz](https://rapscli.xyz)

## Features

- **Landing page** — Marketing and product overview
- **Blog** — Technical articles on APS automation and CI/CD
- **Changelog** — Release history with detailed change notes
- **About** — Author information and project background
- **RSS feed** — Subscribe to blog updates
- **SEO optimized** — Open Graph, Twitter cards, structured data
- **Architecture Documentation** — Microkernel architecture details

## Tech Stack

- [Astro](https://astro.build/) — Static site generator
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [MDX](https://mdxjs.com/) — Markdown with components for blog posts

## Development

### Prerequisites

- Node.js 18+
- npm or pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/dmytro-yemelianov/raps-website.git
cd raps-website

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`.

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

### Quick Start

```bash
# Install the CLI (Cargo, Homebrew, Scoop, or download a release)
cargo install raps

# Configure your APS credentials
export APS_CLIENT_ID="your_client_id"
export APS_CLIENT_SECRET="your_client_secret"

# Verify authentication before running pipelines
raps auth test
```

Explore the new [Troubleshooting guide](https://rapscli.xyz/docs/troubleshooting) for fixes to common install and auth errors.

## RAPS Architecture

RAPS follows a **microkernel architecture** inspired by Unix OS design principles:

### Architecture Overview

- **Kernel (`raps-kernel`)**: Minimal trusted foundation with authentication, HTTP client, configuration, and error handling
- **Service Crates**: Independent modules for APS APIs (OSS, Model Derivative, Data Management, SSA)
- **Application Layer**: User interfaces (CLI, MCP Server, TUI) and extended features

**Key Features:**
- Essential APS APIs (Authentication, SSA, OSS, Model Derivative, Data Management)
- Extended features (ACC modules, Design Automation, Reality Capture, Webhooks, MCP server, TUI)
- Plugin system for extensibility

**Build Commands:**
```bash
# Standard build (includes all features)
cargo build

# Minimal build (kernel + core services only)
cargo build --no-default-features --features core
```

For detailed architecture documentation, see:
- [Architecture Guide](https://rapscli.xyz/docs/architecture)
- [RAPS Ecosystem Constitution](../.specify/memory/constitution.md)

## Project Structure

```
raps-website/
├── public/              # Static assets (favicon, images)
├── src/
│   ├── components/      # Reusable UI components
│   ├── content/
│   │   └── blog/        # Blog posts (MDX files)
│   ├── layouts/         # Page layouts
│   └── pages/           # Routes
│       ├── index.astro  # Landing page
│       ├── about.astro  # About page
│       ├── changelog.astro
│       └── blog/        # Blog listing and posts
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Writing Blog Posts

Create a new `.mdx` file in `src/content/blog/`:

```mdx
---
title: "Your Post Title"
description: "A brief description for SEO and previews"
pubDate: 2026-01-15
author: "Dmytro Yemelianov"
tags: ["ci-cd", "automation"]
series: "DevOps for Design"  # Optional
seriesOrder: 1               # Optional
---

Your content here...
```

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title |
| `description` | Yes | Short description for SEO |
| `pubDate` | Yes | Publication date (YYYY-MM-DD) |
| `author` | No | Author name (default: Dmytro Yemelianov) |
| `tags` | No | Array of tags for categorization |
| `image` | No | OG image path |
| `draft` | No | Set to `true` to hide from listing |
| `series` | No | Series name for related posts |
| `seriesOrder` | No | Order within the series |

## Deployment

### GitHub Pages

The site is configured for GitHub Pages deployment via GitHub Actions.

1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to `main` branch to trigger deployment

### Custom Domain

1. Add your domain in GitHub Pages settings
2. Update `site` in `astro.config.mjs`:
   ```js
   site: 'https://rapscli.xyz'
   ```
3. Add DNS records:
   - A record: `185.199.108.153` (GitHub Pages IPs)
   - CNAME: `your-username.github.io`

### Vercel / Netlify

The site can also be deployed to:

- **Vercel:** Connect repo, auto-detected as Astro
- **Netlify:** Connect repo, build command `npm run build`, publish directory `dist`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE)

---

Built with ❤️ by [Dmytro Yemelianov](https://www.linkedin.com/in/dmytro-yemelianov/)
