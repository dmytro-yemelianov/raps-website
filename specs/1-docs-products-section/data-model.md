# Data Model: Products Documentation Section

**Feature**: 1-docs-products-section
**Created**: 2026-01-15

## Entities

### Product

Represents a distinct tool in the RAPS ecosystem with its own documentation page.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Display name (e.g., "raps-mock") |
| `description` | string | Yes | SEO meta description (150-160 chars) |
| `tagline` | string | No | Short marketing phrase for hero |
| `icon` | string | No | Emoji icon for navigation/display |
| `github` | URL | Yes | Link to GitHub repository |
| `order` | number | No | Sort order in navigation (default: 0) |
| `version` | string | No | Current version of the product |
| `sourceVersion` | string | No | README version this was synced from |

**Validation Rules**:
- `title` must be unique across all products
- `description` should be 150-160 characters for SEO
- `github` must be a valid HTTPS URL
- `order` determines display sequence in Products dropdown

### ProductNavItem

Navigation entry for a product in the header dropdown.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `href` | string | Yes | URL path (e.g., "/products/raps-mock") |
| `label` | string | Yes | Display text in dropdown |
| `icon` | string | Yes | Emoji for visual identification |
| `description` | string | Yes | Brief description shown in dropdown |

**Derived From**: Product entity frontmatter

## Relationships

```
┌─────────────────┐     ┌──────────────────┐
│ Navigation      │     │ Content          │
│ (Header.astro)  │     │ Collection       │
├─────────────────┤     ├──────────────────┤
│ navItems[]      │◄────│ products/*.mdx   │
│ - Products      │     │ - frontmatter    │
│   submenu[]     │     │ - body content   │
└─────────────────┘     └──────────────────┘
         │                      │
         │                      ▼
         │              ┌──────────────────┐
         │              │ ProductLayout    │
         └──────────────►│ - renders content│
                        │ - related prods  │
                        └──────────────────┘
```

## Content Collection Schema

```typescript
// src/content/config.ts

import { z, defineCollection } from 'astro:content';

const productsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(200),
    tagline: z.string().optional(),
    icon: z.string().optional().default('📦'),
    github: z.string().url(),
    order: z.number().default(0),
    version: z.string().optional(),
    sourceVersion: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,      // existing
  docs: docsCollection,      // existing
  products: productsCollection,  // NEW
};
```

## Sample Content

### raps-mock.mdx Frontmatter

```yaml
---
title: "raps-mock"
description: "A comprehensive mock server for Autodesk Platform Services APIs. Test your APS integrations locally without credentials or network dependencies."
tagline: "APS API Mock Server"
icon: "🧪"
github: "https://github.com/dmytro-yemelianov/raps-mock"
order: 1
version: "0.2.0"
sourceVersion: "2026-01-15"
---
```

### raps-twin.mdx Frontmatter

```yaml
---
title: "raps-twin"
description: "Engineering Department Digital Twin (EDDT) - A simulation framework for modeling engineering workflows using agent-based modeling and discrete-event simulation."
tagline: "Engineering Workflow Simulation"
icon: "🏭"
github: "https://github.com/dmytro-yemelianov/raps-twin"
order: 2
version: "0.1.0"
sourceVersion: "2026-01-15"
---
```

## Navigation Structure

### Updated navItems Array

```javascript
const navItems = [
  { href: '/', label: 'Home' },
  { href: '/quickstart', label: 'Quick Start', color: 'rapeseed' },
  { href: '/blog', label: 'Blog' },
  {
    label: 'Products',  // NEW
    submenu: [
      {
        href: '/products/raps-mock',
        label: 'raps-mock',
        icon: '🧪',
        description: 'APS API mock server'
      },
      {
        href: '/products/raps-twin',
        label: 'raps-twin',
        icon: '🏭',
        description: 'Engineering simulation'
      },
    ]
  },
  {
    label: 'Developer',
    submenu: [/* existing items */]
  },
  {
    label: 'Project',
    submenu: [/* existing items */]
  },
];
```

## State Transitions

Products are static content with no runtime state transitions. Content updates occur through:

1. **Manual Sync**: Developer updates MDX file from source README
2. **Build**: Astro generates static HTML
3. **Deploy**: GitHub Actions deploys to hosting

## Constraints

- Maximum 10 products recommended (navigation becomes unwieldy)
- Description must fit single-line dropdown display (~50 chars visible)
- Icons should be distinct and recognizable at small sizes
- All products must have unique slugs (enforced by file system)
