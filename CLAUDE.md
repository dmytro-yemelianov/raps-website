# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the documentation website for [RAPS](https://github.com/dmytro-yemelianov/raps) (Rust Autodesk Platform Services CLI), hosted at [rapscli.xyz](https://rapscli.xyz). Built with Astro, Tailwind CSS, and MDX.

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at localhost:4321
npm run build        # Production build to ./dist
npm run preview      # Preview production build
```

## Architecture

### Content System

- **Blog posts**: `src/content/blog/*.mdx` - Technical articles with frontmatter (title, description, pubDate, tags, series, seriesOrder)
- **Documentation**: `src/content/docs/*.mdx` - CLI docs with section-based navigation (section, order fields in frontmatter)
- **Products**: `src/content/products/*.mdx` - Ecosystem product pages (raps-mock, raps-twin) with frontmatter (title, description, tagline, icon, github, order)

### Layouts

- `BaseLayout.astro` - Root layout with SEO meta tags, OG/Twitter cards
- `BlogPost.astro` - Blog article layout with author, tags, series navigation
- `DocsLayout.astro` - Documentation layout with sidebar navigation organized by sections (getting-started, modes, commands, guides, cookbook)
- `ProductLayout.astro` - Product page layout with hero section and Related Products

### Key Components

- `Header.astro` - Navigation with nested dropdown menus
- `GlobalSearch.astro` - Site-wide search functionality
- `GlossaryText.astro` - Tooltip component for glossary terms
- `TerminalDemo.astro` - Animated CLI demonstration

### Pages Structure

- `/` - Landing page
- `/quickstart` - Installation and setup guide
- `/blog/` - Blog listing and posts
- `/docs/` - Documentation with dynamic routes (`[...slug].astro`)
- `/products/` - Ecosystem products (raps-mock, raps-twin) with dynamic routes
- `/tools/` - Interactive developer tools (scope-builder, token-decoder, urn-encoder, etc.)
- `/resources/` - Cheat sheets and guides
- `/glossary` - APS/CAD/DevOps terminology
- `/api-coverage` - Supported APS endpoints matrix

### RSS Feeds

- `rss.xml.js` - RSS feed generator
- `atom.xml.js` - Atom feed generator

## Styling

Tailwind CSS with custom brand colors defined in `tailwind.config.mjs`:
- `primary` - Blue scale for UI elements
- `rapeseed` - Yellow scale (brand color from rapeseed flower)
- `accent` - Orange scale for highlights
- `rust` - Rust language brand colors

Global styles in `src/styles/globals.css` and `accessibility.css`.

## Deployment

Automated via GitHub Actions (`.github/workflows/deploy.yml`):
- Triggers on push to `main` branch
- Uses pnpm for package management
- Deploys to GitHub Pages

## Writing Content

### Blog Post Frontmatter

```yaml
---
title: "Post Title"
description: "SEO description"
pubDate: 2026-01-15
author: "Author Name"
tags: ["ci-cd", "automation"]
series: "Series Name"      # Optional - groups related posts
seriesOrder: 1             # Optional - order within series
featured: true             # Optional - highlights post
draft: false               # Optional - hides from listing
---
```

### Documentation Frontmatter

```yaml
---
title: "Page Title"
description: "Page description"
section: "commands"        # getting-started, modes, commands, guides, cookbook
order: 1                   # Sort order within section
icon: "🔐"                 # Optional emoji icon
---
```

### Product Page Frontmatter

```yaml
---
title: "raps-mock"
description: "APS API mock server for local development and CI/CD testing"
tagline: "Test APS integrations without credentials"  # Optional hero subtitle
icon: "🧪"                 # Optional emoji for navigation
github: "https://github.com/dmytro-yemelianov/raps-mock"
order: 1                   # Sort order in Products dropdown
version: "0.2.0"           # Optional current version
sourceVersion: "2026-01-15" # Optional README sync date
---
```

## Common Build Issues

**Always run `npm run build` before committing** to catch syntax errors.

### Escaping Special Characters

Astro/MDX interprets `{` as JSX expressions and `<` as element tags. Escape them:

| Pattern | Problem | Solution |
|---------|---------|----------|
| `{variable}` in HTML | Parsed as JSX | Use `&#123;variable&#125;` |
| `${{ secrets.X }}` | GitHub Actions syntax | Use `{'${{ secrets.X }}'}` |
| `<100MB` | Looks like JSX element | Write "under 100MB" instead |
| `{...}` in code blocks | May still be parsed | Use HTML entities `&#123;` `&#125;` |

### Linting

```bash
npm install @astrojs/check typescript --save-dev  # First time only
npx astro check                                    # Run type checker
```
