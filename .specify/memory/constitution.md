<!--
SYNC IMPACT REPORT
==================
Version change: N/A → 1.0.0 (initial ratification)

Modified principles: N/A (initial version)

Added sections:
- Core Principles (5 principles)
- Technical Standards
- Content Workflow
- Governance

Removed sections: N/A (initial version)

Templates requiring updates:
- .specify/templates/plan-template.md: N/A (not yet created)
- .specify/templates/spec-template.md: N/A (not yet created)
- .specify/templates/tasks-template.md: N/A (not yet created)

Follow-up TODOs:
- Create template files when speckit infrastructure is fully initialized
-->

# raps-website Constitution

## Core Principles

### I. Content Accuracy

All documentation MUST accurately reflect the current state of RAPS ecosystem products.

- Documentation MUST be synchronized with the source repositories (raps, raps-mock, raps-twin)
- Code examples MUST be tested and working against the documented versions
- Outdated documentation MUST be updated or removed within one release cycle
- Breaking changes in RAPS products MUST trigger documentation updates
- Version numbers and compatibility information MUST be explicitly stated

**Rationale**: Users depend on documentation to learn and troubleshoot. Inaccurate documentation wastes user time and erodes trust.

### II. User-Centric Structure

Content MUST be organized for discoverability and task completion, not internal architecture.

- Navigation MUST allow users to find any topic within 3 clicks from the homepage
- Documentation sections MUST be named from the user's perspective (what they want to do)
- Each page MUST have a clear purpose stated in the first paragraph
- Related content MUST be cross-linked to support different learning paths
- Search MUST return relevant results for common user queries

**Rationale**: Documentation exists to serve users, not to mirror code structure. Information architecture should match user mental models.

### III. Build Quality

The site MUST build successfully and be free of errors before deployment.

- `npm run build` MUST pass before any PR merge
- No broken internal links (404s on any documented page)
- No MDX/JSX syntax errors that prevent page rendering
- All images MUST have alt text for accessibility
- Console MUST be free of errors on page load

**Rationale**: A documentation site that doesn't build or has broken pages fails its primary purpose.

### IV. Performance and Accessibility

The site MUST be fast and accessible to all users.

- Pages MUST achieve Lighthouse performance score of 90+
- Pages MUST achieve Lighthouse accessibility score of 95+
- Core Web Vitals MUST be in "Good" range (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- Site MUST be fully navigable via keyboard
- Site MUST be usable on mobile devices (responsive design)

**Rationale**: Slow or inaccessible documentation excludes users and harms SEO. Performance is a feature.

### V. SEO and Discoverability

Content MUST be optimized for search engines to help users find answers.

- Every page MUST have unique, descriptive title and meta description
- Blog posts MUST use appropriate heading hierarchy (H1 → H2 → H3)
- Images MUST have descriptive file names and alt text
- Structured data (JSON-LD) MUST be present on blog posts
- RSS/Atom feeds MUST be valid and updated with new content

**Rationale**: Users often discover documentation through search engines. SEO enables organic discovery.

## Technical Standards

### Language and Tooling

- **Node.js Version**: 18+ (as specified in README)
- **Framework**: Astro with MDX for content
- **Styling**: Tailwind CSS
- **Package Manager**: npm or pnpm
- **Deployment**: GitHub Actions to GitHub Pages / Vercel

### Code Quality Gates

- `npm run build` MUST pass (no build errors)
- All internal links MUST resolve (no 404s)
- MDX frontmatter MUST include required fields (title, description, pubDate for blog)
- Special characters in MDX MUST be properly escaped

### Content Versioning

- Follow Semantic Versioning (SemVer) for site releases
- MAJOR: Navigation restructuring, URL changes that break bookmarks
- MINOR: New documentation pages, new features, content additions
- PATCH: Typo fixes, minor corrections, styling updates

## Content Workflow

### Adding Documentation

1. Create feature branch from `main`
2. Write content in appropriate directory (`src/content/docs/` or `src/content/blog/`)
3. Include all required frontmatter fields
4. Add cross-links to related content
5. Run `npm run build` to verify no errors
6. Preview locally with `npm run preview`
7. Create PR with clear description of changes

### Blog Post Requirements

- Title: Clear, specific, SEO-friendly
- Description: 150-160 characters for optimal display in search results
- Tags: Use existing tags where possible for consistency
- Code examples: Test all code snippets before publishing
- Images: Optimize file size, include alt text

### Documentation Page Requirements

- Follow existing section/order frontmatter patterns
- Include practical examples where applicable
- Link to related CLI commands or API references
- Keep content focused on one topic per page

## Governance

### Constitution Authority

This constitution supersedes all other development practices for raps-website. When in conflict, the constitution takes precedence.

### Amendment Process

1. Propose amendment via PR to `.specify/memory/constitution.md`
2. Include rationale for change and impact assessment
3. Update version according to SemVer:
   - MAJOR: Principle removal, fundamental governance change
   - MINOR: New principle, significant expansion of existing principle
   - PATCH: Clarification, typo fix, non-semantic refinement
4. Update dependent templates if affected
5. Merge requires maintainer approval

### Compliance

- All PRs SHOULD be checked against constitution principles
- Build failures MUST be fixed before merge
- Accessibility violations MUST be addressed before merge
- Repeated violations indicate need for constitution review

### Guidance Files

- `CLAUDE.md`: AI assistant guidance for development tasks
- `README.md`: User-facing documentation and quick start
- `.specify/`: Specification and planning artifacts

**Version**: 1.0.0 | **Ratified**: 2026-01-15 | **Last Amended**: 2026-01-15
