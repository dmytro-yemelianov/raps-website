# Research: Products Documentation Section

**Feature**: 1-docs-products-section
**Created**: 2026-01-15

## Research Tasks

### 1. Astro Content Collections Pattern

**Question**: How to add a new content collection for products?

**Decision**: Create `products` collection in `src/content/config.ts`

**Rationale**: Astro content collections provide:
- Type-safe frontmatter validation
- Automatic slug generation
- Easy querying with `getCollection()`
- Consistent with existing `docs` and `blog` collections

**Implementation**:
```typescript
// In src/content/config.ts
const productsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    github: z.string().url(),
    order: z.number().default(0),
  }),
});

export const collections = {
  // ... existing collections
  products: productsCollection,
};
```

**Alternatives Considered**:
- Static pages only: Less maintainable, no dynamic features
- External CMS: Overkill for 2 products, adds complexity

---

### 2. Navigation Dropdown Pattern

**Question**: How are existing dropdowns structured in Header.astro?

**Decision**: Follow exact pattern of "Developer" and "Project" dropdowns

**Rationale**: Consistency with existing navigation ensures:
- Predictable user experience
- Reuse of existing styling
- No new CSS required
- Mobile menu compatibility

**Implementation**:
```javascript
// Add to navItems array in Header.astro
{
  label: 'Products',
  submenu: [
    { href: '/products/raps-mock', label: 'raps-mock', icon: '🧪', description: 'APS API mock server' },
    { href: '/products/raps-twin', label: 'raps-twin', icon: '🏭', description: 'Engineering simulation' },
  ]
}
```

**Alternatives Considered**:
- Mega menu: Too complex for 2 items
- Side panel: Inconsistent with existing navigation

---

### 3. Product Page Layout

**Question**: Should products use DocsLayout or a custom layout?

**Decision**: Create simplified ProductLayout without sidebar

**Rationale**:
- Products are standalone pages, not a documentation hierarchy
- Sidebar navigation would be nearly empty (only 2 products)
- Need space for "Related Products" section
- Cleaner presentation for marketing-style content

**Key Differences from DocsLayout**:
- No sidebar navigation
- Full-width content area
- Related Products section at bottom
- Hero section with product icon and tagline

**Alternatives Considered**:
- DocsLayout with minimal sidebar: Awkward with only 2 items
- No layout (inline in page): Code duplication

---

### 4. Global Search Integration

**Question**: How does GlobalSearch index content?

**Decision**: Products will be automatically indexed if using content collections

**Rationale**: After reviewing `GlobalSearch.astro`, it appears to search across all content. Content collections are the standard way to make content searchable.

**Verification Needed**: Confirm GlobalSearch queries include the products collection after implementation.

---

### 5. Content Source Strategy

**Question**: How to keep product docs in sync with source repos?

**Decision**: Manual sync from README files, with version tracking

**Rationale**:
- Automated sync would require CI/CD changes
- Product content needs website-specific formatting
- Manual sync allows editorial control
- Version numbers in frontmatter track source versions

**Content Structure**:
Each product page includes:
1. Overview (from README intro)
2. Why use this product? (from README "Why" section)
3. Key Features (from README features list)
4. Quick Start (from README quick start)
5. Configuration (from README CLI options)
6. Related Products (new, website-specific)

**Alternatives Considered**:
- Git submodules: Complex, overkill
- API fetch at build: Fragile, slow builds
- Symlinks: Cross-repo issues

---

## Resolved Clarifications

| Unknown | Resolution | Source |
|---------|------------|--------|
| Content collection setup | Standard Astro pattern | Astro docs |
| Dropdown structure | Match existing Developer/Project | Header.astro analysis |
| Layout approach | Custom ProductLayout | Architecture decision |
| Search integration | Automatic via collections | GlobalSearch review |
| Content sync | Manual with version tracking | Pragmatic choice |

## Outstanding Questions

None - all technical unknowns resolved.
