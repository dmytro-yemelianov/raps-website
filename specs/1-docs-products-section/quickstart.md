# Implementation Quickstart: Products Documentation Section

**Feature**: 1-docs-products-section
**Created**: 2026-01-15

## Prerequisites

- Node.js 18+
- raps-website repository checked out
- Branch: `1-docs-products-section`

## Implementation Steps

### Step 1: Create Products Content Collection

**File**: `src/content/config.ts`

Add the products collection schema to the existing config:

```typescript
const productsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tagline: z.string().optional(),
    icon: z.string().optional().default('📦'),
    github: z.string().url(),
    order: z.number().default(0),
    version: z.string().optional(),
    sourceVersion: z.string().optional(),
  }),
});

// Add to collections export
export const collections = {
  blog: blogCollection,
  docs: docsCollection,
  products: productsCollection,
};
```

### Step 2: Create Content Directory

```bash
mkdir -p src/content/products
```

### Step 3: Create Product MDX Files

**File**: `src/content/products/raps-mock.mdx`
- Copy structure from `../raps-mock/README.md`
- Add required frontmatter
- Adapt content for website audience

**File**: `src/content/products/raps-twin.mdx`
- Copy structure from `../raps-twin/README.md`
- Add required frontmatter
- Explain EDDT acronym in subtitle

### Step 4: Create Product Page Layout

**File**: `src/layouts/ProductLayout.astro`

Key sections:
- Header with product icon and tagline
- Main content area (full width)
- Related Products section
- Footer navigation

### Step 5: Create Product Pages Route

**File**: `src/pages/products/[...slug].astro`

```astro
---
import ProductLayout from '../../layouts/ProductLayout.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const products = await getCollection('products');
  return products.map(product => ({
    params: { slug: product.slug },
    props: { product },
  }));
}

const { product } = Astro.props;
const { Content } = await product.render();
---

<ProductLayout {...product.data}>
  <Content />
</ProductLayout>
```

### Step 6: Update Header Navigation

**File**: `src/components/Header.astro`

1. Add Products to navItems array (position after Blog)
2. Add `/products` case to `isActive()` function
3. Mobile menu will inherit the dropdown automatically

### Step 7: Update isActive Helper

```javascript
const isActive = (href: string) => {
  // ... existing cases
  if (href === '/products') return currentPath.startsWith('/products');
  // ... rest
};
```

### Step 8: Verify Build

```bash
npm run build
```

Expected output: No errors, products pages generated in `dist/products/`

### Step 9: Test Locally

```bash
npm run preview
```

Verify:
- [ ] Products dropdown appears in header
- [ ] Products dropdown shows raps-mock and raps-twin
- [ ] Clicking each product navigates to correct page
- [ ] Product pages render correctly
- [ ] Mobile menu shows Products section
- [ ] Related Products links work

### Step 10: Search Verification

Navigate to site, use search for:
- "mock server" → should find raps-mock
- "simulation" → should find raps-twin
- "digital twin" → should find raps-twin

## File Checklist

| File | Status | Action |
|------|--------|--------|
| `src/content/config.ts` | Modify | Add productsCollection |
| `src/content/products/raps-mock.mdx` | Create | Product documentation |
| `src/content/products/raps-twin.mdx` | Create | Product documentation |
| `src/layouts/ProductLayout.astro` | Create | Product page layout |
| `src/pages/products/[...slug].astro` | Create | Dynamic routing |
| `src/components/Header.astro` | Modify | Add Products dropdown |

## Validation Checklist

After implementation, verify:

- [ ] `npm run build` passes
- [ ] No console errors on page load
- [ ] Products dropdown visible on desktop
- [ ] Products dropdown accessible on mobile
- [ ] Both product pages load at correct URLs
- [ ] Cross-links between products work
- [ ] Search returns product pages
- [ ] Meta descriptions appear correctly
- [ ] GitHub links work
