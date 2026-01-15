# Tasks: Products Documentation Section

**Feature Branch**: `1-docs-products-section`
**Generated**: 2026-01-15
**Source**: spec.md, plan.md, data-model.md

## User Stories Summary

| Story | Priority | Description | Independent Test |
|-------|----------|-------------|------------------|
| US1 | P1 | Discover RAPS Ecosystem Products | Products dropdown visible in navigation |
| US2 | P1 | Learn About raps-mock | raps-mock page loads with all required sections |
| US3 | P1 | Learn About raps-twin | raps-twin page loads with all required sections |
| US4 | P2 | Navigate Between Products | Related Products section links work |

---

## Phase 1: Setup

**Goal**: Initialize project infrastructure for products feature

- [x] T001 Create products content directory at `src/content/products/`
- [x] T002 Add products collection schema to `src/content/config.ts` (N/A - Astro auto-detects collections)

---

## Phase 2: Foundational (Blocking)

**Goal**: Create shared infrastructure required by all user stories

- [x] T003 Create ProductLayout component at `src/layouts/ProductLayout.astro`
- [x] T004 Create dynamic route handler at `src/pages/products/[...slug].astro`

---

## Phase 3: User Story 1 - Discover RAPS Ecosystem Products (P1)

**Goal**: Users can find Products section in navigation and see available products

**Independent Test**: Navigate to homepage, verify Products dropdown is visible with raps-mock and raps-twin entries

**Depends on**: Phase 2 (layout and routing must exist)

- [x] T005 [US1] Add Products dropdown to navItems array in `src/components/Header.astro`
- [x] T006 [US1] Add `/products` case to isActive() helper in `src/components/Header.astro`
- [x] T007 [US1] Verify Products dropdown styling matches existing Developer/Project dropdowns in `src/components/Header.astro`

**Acceptance Verification**:
- Products dropdown appears in desktop navigation
- Products dropdown appears in mobile menu
- Dropdown shows raps-mock and raps-twin with icons and descriptions

---

## Phase 4: User Story 2 - Learn About raps-mock (P1)

**Goal**: Developers can learn about raps-mock through comprehensive documentation page

**Independent Test**: Navigate to `/products/raps-mock`, verify all required sections present

**Depends on**: Phase 2 (layout), Phase 3 (navigation to reach page)

- [x] T008 [P] [US2] Create raps-mock content file at `src/content/products/raps-mock.mdx`
- [x] T009 [US2] Add product overview section with "What is raps-mock?" in `src/content/products/raps-mock.mdx`
- [x] T010 [US2] Add "Why raps-mock?" section with use cases (local dev, CI/CD, demos, learning) in `src/content/products/raps-mock.mdx`
- [x] T011 [US2] Add "Key Features" section listing capabilities in `src/content/products/raps-mock.mdx`
- [x] T012 [US2] Add "Quick Start" section with installation and basic usage in `src/content/products/raps-mock.mdx`
- [x] T013 [US2] Add "Configuration" section with CLI options and modes in `src/content/products/raps-mock.mdx`
- [x] T014 [US2] Add "Supported APIs" summary table in `src/content/products/raps-mock.mdx`

**Acceptance Verification**:
- Page loads at `/products/raps-mock`
- All required sections present and informative
- GitHub link works
- Content matches source README

---

## Phase 5: User Story 3 - Learn About raps-twin (P1)

**Goal**: Users can learn about raps-twin/EDDT through comprehensive documentation page

**Independent Test**: Navigate to `/products/raps-twin`, verify all required sections present

**Depends on**: Phase 2 (layout), Phase 3 (navigation to reach page)

- [x] T015 [P] [US3] Create raps-twin content file at `src/content/products/raps-twin.mdx`
- [x] T016 [US3] Add product overview explaining "EDDT - Engineering Department Digital Twin" in `src/content/products/raps-twin.mdx`
- [x] T017 [US3] Add "Why raps-twin?" section with simulation use cases in `src/content/products/raps-twin.mdx`
- [x] T018 [US3] Add "Key Features" section (agent-based modeling, workflow simulation, bottleneck analysis) in `src/content/products/raps-twin.mdx`
- [x] T019 [US3] Add "Quick Start" section with installation and basic usage in `src/content/products/raps-twin.mdx`
- [x] T020 [US3] Add "Agent Roles" section documenting available roles in `src/content/products/raps-twin.mdx`
- [x] T021 [US3] Add "Task Types" section documenting task configurations in `src/content/products/raps-twin.mdx`
- [x] T022 [US3] Add "Configuration Examples" section with YAML examples in `src/content/products/raps-twin.mdx`

**Acceptance Verification**:
- Page loads at `/products/raps-twin`
- EDDT acronym explained in description/subtitle
- All required sections present and informative
- GitHub link works

---

## Phase 6: User Story 4 - Navigate Between Products (P2)

**Goal**: Users can easily navigate between product pages via Related Products section

**Independent Test**: Visit any product page, verify Related Products section shows links to other products

**Depends on**: Phase 4 (raps-mock page), Phase 5 (raps-twin page)

- [x] T023 [US4] Add RelatedProducts component to `src/layouts/ProductLayout.astro`
- [x] T024 [US4] Add link to main RAPS CLI docs in Related Products section in `src/layouts/ProductLayout.astro`
- [x] T025 [US4] Ensure Related Products dynamically shows other products (excluding current) in `src/layouts/ProductLayout.astro`

**Acceptance Verification**:
- raps-mock page shows link to raps-twin and RAPS CLI
- raps-twin page shows link to raps-mock and RAPS CLI
- Links navigate correctly

---

## Phase 7: Polish & Verification

**Goal**: Ensure feature meets quality standards and passes all acceptance criteria

- [x] T026 Run `npm run build` and verify no errors
- [x] T027 Test Products dropdown on desktop navigation
- [x] T028 Test Products dropdown on mobile navigation
- [x] T029 Verify search indexing returns products for "mock server", "simulation", "digital twin"
- [x] T030 Verify meta descriptions appear correctly in page source
- [x] T031 Verify all GitHub links work correctly
- [x] T032 Test direct URL access to `/products/raps-mock` and `/products/raps-twin`

---

## Dependencies

```
Phase 1 (Setup)
    │
    ▼
Phase 2 (Foundational)
    │
    ├───────────────┬───────────────┐
    ▼               ▼               ▼
Phase 3 (US1)   Phase 4 (US2)   Phase 5 (US3)
Navigation      raps-mock        raps-twin
    │               │               │
    └───────────────┴───────────────┘
                    │
                    ▼
              Phase 6 (US4)
              Cross-linking
                    │
                    ▼
              Phase 7 (Polish)
```

**Key Dependencies**:
- US2 and US3 can be implemented in parallel after Phase 2
- US4 requires both US2 and US3 to be complete
- US1 is technically independent but should be done with Phase 2 for testability

---

## Parallel Execution Opportunities

### Within Phase 4 & 5 (P marker tasks):
```
T008 [P] [US2] Create raps-mock.mdx  ──┬──  Can run in parallel
T015 [P] [US3] Create raps-twin.mdx  ──┘
```

### Across Phases (after Phase 2):
```
Phase 3 (US1 Navigation)  ──┬──  All three can start after Phase 2
Phase 4 (US2 raps-mock)   ──┤
Phase 5 (US3 raps-twin)   ──┘
```

---

## Implementation Strategy

### MVP Scope (Minimum Viable Product)
**Recommended**: Complete through Phase 4 (US2 - raps-mock page)

This delivers:
- Products dropdown in navigation (US1)
- First product page live (US2)
- Foundation for remaining products

**MVP Tasks**: T001 → T014 (14 tasks)

### Incremental Delivery

| Increment | User Stories | Value Delivered |
|-----------|--------------|-----------------|
| 1 (MVP) | US1 + US2 | Navigation + raps-mock docs |
| 2 | US3 | raps-twin docs |
| 3 | US4 | Cross-linking & polish |

---

## Task Summary

| Phase | Tasks | Parallelizable |
|-------|-------|----------------|
| Phase 1: Setup | 2 | 0 |
| Phase 2: Foundational | 2 | 0 |
| Phase 3: US1 Navigation | 3 | 0 |
| Phase 4: US2 raps-mock | 7 | 1 |
| Phase 5: US3 raps-twin | 8 | 1 |
| Phase 6: US4 Cross-links | 3 | 0 |
| Phase 7: Polish | 7 | 0 |
| **Total** | **32** | **2** |

---

## File Changes Summary

| File | Action | Phase |
|------|--------|-------|
| `src/content/products/` | Create directory | 1 |
| `src/content/config.ts` | Modify | 1 |
| `src/layouts/ProductLayout.astro` | Create | 2 |
| `src/pages/products/[...slug].astro` | Create | 2 |
| `src/components/Header.astro` | Modify | 3 |
| `src/content/products/raps-mock.mdx` | Create | 4 |
| `src/content/products/raps-twin.mdx` | Create | 5 |
