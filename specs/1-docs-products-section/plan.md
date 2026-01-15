# Implementation Plan: Products Documentation Section

**Feature Branch**: `1-docs-products-section`
**Spec**: [spec.md](./spec.md)
**Created**: 2026-01-15
**Status**: Planning

## Technical Context

### Current Architecture

| Component | Technology | Notes |
|-----------|------------|-------|
| Framework | Astro 4.x | Static site generator with MDX support |
| Styling | Tailwind CSS | Utility-first CSS framework |
| Content | MDX in `src/content/` | Blog and docs use content collections |
| Navigation | `Header.astro` | Dropdown menus for Developer and Project sections |
| Routing | File-based | `src/pages/` for static, `[...slug].astro` for dynamic |
| Layouts | `DocsLayout.astro` | Sidebar navigation with section grouping |

### Key Files to Modify

| File | Purpose | Changes Needed |
|------|---------|----------------|
| `src/components/Header.astro` | Main navigation | Add "Products" dropdown |
| `src/pages/products/[...slug].astro` | Product page routing | New file for dynamic routes |
| `src/content/products/*.mdx` | Product content | New content collection |
| `src/layouts/ProductLayout.astro` | Product page layout | New layout (or reuse DocsLayout) |

### Dependencies

- raps-mock README.md (content source)
- raps-twin README.md (content source)
- Existing dropdown pattern in Header.astro

## Constitution Check

| Principle | Requirement | Compliance Status |
|-----------|-------------|-------------------|
| I. Content Accuracy | Documentation matches source repos | ✅ Will sync from README files |
| II. User-Centric Structure | 3-click navigation | ✅ Top-level dropdown = 2 clicks |
| III. Build Quality | `npm run build` passes | ⏳ To verify |
| IV. Performance & Accessibility | Lighthouse 90+/95+ | ⏳ To verify |
| V. SEO & Discoverability | Unique titles, meta descriptions | ✅ Planned in spec |

**Gate Status**: PASS (no blocking violations)

## Implementation Approach

### Option Analysis

**Option A: Reuse DocsLayout with new content collection**
- Pros: Consistent look, less code, proven pattern
- Cons: Products may need different navigation structure

**Option B: Create ProductLayout with custom sidebar**
- Pros: Tailored for products, can show related products
- Cons: More code to maintain

**Decision**: Option B - Create a simpler ProductLayout without sidebar, with "Related Products" section. Products are standalone pages, not a hierarchical documentation tree.

### Architecture Decision

```
src/
├── content/
│   └── products/           # NEW: Product content collection
│       ├── raps-mock.mdx
│       └── raps-twin.mdx
├── pages/
│   └── products/           # NEW: Product routes
│       ├── index.astro     # Optional landing page
│       └── [...slug].astro # Dynamic product pages
├── layouts/
│   └── ProductLayout.astro # NEW: Product page layout
└── components/
    └── Header.astro        # MODIFY: Add Products dropdown
```

## Phases

### Phase 1: Navigation Update
1. Add "Products" dropdown to `Header.astro`
2. Add `/products` path handling in `isActive()` helper
3. Update mobile navigation

### Phase 2: Content Infrastructure
1. Create `src/content/products/` directory
2. Add content collection config in `src/content/config.ts`
3. Create `ProductLayout.astro`
4. Create `src/pages/products/[...slug].astro`

### Phase 3: Product Pages
1. Create `raps-mock.mdx` with content from README
2. Create `raps-twin.mdx` with content from README
3. Add cross-links between products
4. Add Related Products component

### Phase 4: Verification
1. Run `npm run build`
2. Test navigation on desktop and mobile
3. Verify search indexing
4. Check accessibility

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Content collection config issues | Low | Medium | Follow existing docs pattern |
| Navigation styling mismatch | Low | Low | Use existing dropdown code |
| Search not indexing products | Medium | Medium | Verify GlobalSearch includes products |

## Artifacts

- [x] plan.md (this file)
- [x] research.md
- [x] data-model.md
- [x] quickstart.md (implementation steps)
- [x] CLAUDE.md updated with products content system
