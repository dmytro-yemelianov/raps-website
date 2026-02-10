# RAPS Website Ukrainian Translation Status

Last updated: 2026-02-10

## Summary

| Category              | Total | Translated | Pending | Coverage |
|-----------------------|------:|----------:|--------:|---------:|
| UI Strings            |  515+ |      515+ |       0 |     100% |
| Docs                  |    21 |         7 |      14 |      33% |
| Cookbook               |    34 |         0 |      34 |       0% |
| Blog                  |    16 |         0 |      16 |       0% |
| Products              |     3 |         0 |       3 |       0% |
| Components / Layouts  |    11 |        11 |       0 |     100% |
| Pages (i18n strings)  |     5 |         5 |       0 |     100% |
| Pages (deferred)      |   10+ |         0 |     10+ |       0% |

## UI Strings

All 515+ UI strings are translated in `src/i18n/ui.ts` with full `en` and `uk` coverage.

## Docs (`src/content/docs/`)

21 English source files in `en/`, 7 translated to Ukrainian in `uk/`.
Untranslated pages fall back to English with a `FallbackBanner` notice.

| File                      | Status     | Notes                         |
|---------------------------|------------|-------------------------------|
| introduction.mdx          | Translated |                               |
| installation.mdx          | Translated |                               |
| configuration.mdx         | Translated |                               |
| auth.mdx                  | Translated |                               |
| usage-modes.mdx           | Translated |                               |
| troubleshooting.mdx       | Translated |                               |
| interactive-shell.mdx     | Translated |                               |
| admin.mdx                 | Pending    | English fallback with banner  |
| architecture.mdx          | Pending    | English fallback with banner  |
| buckets.mdx               | Pending    | English fallback with banner  |
| data-management.mdx       | Pending    | English fallback with banner  |
| examples.mdx              | Pending    | English fallback with banner  |
| exit-codes.mdx            | Pending    | English fallback with banner  |
| mcp-server.mdx            | Pending    | English fallback with banner  |
| mode-cli.mdx              | Pending    | English fallback with banner  |
| mode-docker.mdx           | Pending    | English fallback with banner  |
| mode-github-actions.mdx   | Pending    | English fallback with banner  |
| objects.mdx               | Pending    | English fallback with banner  |
| pipelines.mdx             | Pending    | English fallback with banner  |
| python-bindings.mdx       | Pending    | English fallback with banner  |
| translation.mdx           | Pending    | English fallback with banner  |

## Cookbook (`src/content/cookbook/`)

34 English source files in `en/`, 0 translated. All pending.

| File                              | Status  | Notes                        |
|-----------------------------------|---------|------------------------------|
| cookbook-acc-admin.mdx             | Pending | English fallback with banner |
| cookbook-acc-checklists.mdx        | Pending | English fallback with banner |
| cookbook-acc-dailylog.mdx          | Pending | English fallback with banner |
| cookbook-acc-documents.mdx         | Pending | English fallback with banner |
| cookbook-acc-issues.mdx            | Pending | English fallback with banner |
| cookbook-acc-navigation.mdx        | Pending | English fallback with banner |
| cookbook-acc-quality.mdx           | Pending | English fallback with banner |
| cookbook-acc-reporting.mdx         | Pending | English fallback with banner |
| cookbook-acc-submittals.mdx        | Pending | English fallback with banner |
| cookbook-aec-acc-sync.mdx          | Pending | English fallback with banner |
| cookbook-aec-coordination.mdx      | Pending | English fallback with banner |
| cookbook-aec-ifc.mdx               | Pending | English fallback with banner |
| cookbook-aec-metadata.mdx          | Pending | English fallback with banner |
| cookbook-aec-rooms.mdx             | Pending | English fallback with banner |
| cookbook-aec-versioning.mdx        | Pending | English fallback with banner |
| cookbook-aec.mdx                   | Pending | English fallback with banner |
| cookbook-construction.mdx          | Pending | English fallback with banner |
| cookbook-manufacturing.mdx         | Pending | English fallback with banner |
| cookbook-media-animation.mdx       | Pending | English fallback with banner |
| cookbook-media-catalog.mdx         | Pending | English fallback with banner |
| cookbook-media-materials.mdx       | Pending | English fallback with banner |
| cookbook-media-photogrammetry.mdx  | Pending | English fallback with banner |
| cookbook-media-review.mdx          | Pending | English fallback with banner |
| cookbook-media-sitecapture.mdx     | Pending | English fallback with banner |
| cookbook-media-translation.mdx     | Pending | English fallback with banner |
| cookbook-media-versioning.mdx      | Pending | English fallback with banner |
| cookbook-media.mdx                 | Pending | English fallback with banner |
| cookbook-mfg-batch.mdx             | Pending | English fallback with banner |
| cookbook-mfg-bom.mdx               | Pending | English fallback with banner |
| cookbook-mfg-catalog.mdx           | Pending | English fallback with banner |
| cookbook-mfg-drawings.mdx          | Pending | English fallback with banner |
| cookbook-mfg-iterations.mdx        | Pending | English fallback with banner |
| cookbook-mfg-supplier.mdx          | Pending | English fallback with banner |
| cookbook-mfg-translation.mdx       | Pending | English fallback with banner |

## Blog (`src/content/blog/`)

16 English source files in `en/`, 0 translated. All pending.

| File                                       | Status  | Notes                        |
|--------------------------------------------|---------|------------------------------|
| acc-bulk-operations-crisis.mdx             | Pending | English fallback with banner |
| acc-forum-analysis.mdx                     | Pending | English fallback with banner |
| acc-permission-nightmare.mdx               | Pending | English fallback with banner |
| authentication-chaos-across-cad-platforms.mdx | Pending | English fallback with banner |
| cicd-101-for-aec.mdx                       | Pending | English fallback with banner |
| devcon-2026-acc-enterprise-scale.mdx       | Pending | English fallback with banner |
| devcon-2026-ai-pair-assistant.mdx          | Pending | English fallback with banner |
| devcon-2026-zero-to-production.mdx         | Pending | English fallback with banner |
| file-translation-disasters.mdx            | Pending | English fallback with banner |
| manual-tax.mdx                             | Pending | English fallback with banner |
| raps-4-account-admin.mdx                  | Pending | English fallback with banner |
| raps-mock-local-aps-testing.mdx           | Pending | English fallback with banner |
| rust-vs-nodejs-5gb-files.mdx              | Pending | English fallback with banner |
| sdk-version-hell.mdx                      | Pending | English fallback with banner |
| testing-raps-with-raps-mock.mdx           | Pending | English fallback with banner |
| zero-click-releases-github-actions.mdx    | Pending | English fallback with banner |

## Products (`src/content/products/`)

3 English source files in `en/`, 0 translated. All pending.

| File            | Status  | Notes                        |
|-----------------|---------|------------------------------|
| raps-mock.mdx   | Pending | English fallback with banner |
| raps-twin.mdx   | Pending | English fallback with banner |
| yr.mdx          | Pending | English fallback with banner |

## Components and Layouts

All UI chrome (headers, footers, navigation, layout shells) has been translated
via i18n string extraction. These components read from `src/i18n/ui.ts`.

| Component / Layout        | Status     | Notes                            |
|---------------------------|------------|----------------------------------|
| Header.astro              | Translated | Strings extracted to ui.ts       |
| Footer.astro              | Translated | Strings extracted to ui.ts       |
| GlobalSearch.astro        | Translated | Strings extracted to ui.ts       |
| UserOnboarding.astro      | Translated | Strings extracted to ui.ts       |
| BaseLayout.astro          | Translated | Strings extracted to ui.ts       |
| DocsLayout.astro          | Translated | Strings extracted to ui.ts       |
| CookbookLayout.astro      | Translated | Strings extracted to ui.ts       |
| BlogPost.astro            | Translated | Strings extracted to ui.ts       |
| ProductLayout.astro       | Translated | Strings extracted to ui.ts       |
| FallbackBanner.astro      | Translated | Shown on untranslated content    |
| LanguageSwitcher.astro    | Translated | Language toggle component         |

## Pages with i18n String Extraction

These Astro pages have all user-visible strings extracted and translated.

| Page               | Status     | Notes                       |
|--------------------|------------|-----------------------------|
| index.astro        | Translated | Home page                   |
| quickstart.astro   | Translated |                             |
| blog/index.astro   | Translated | Blog listing page           |
| cookbook/index.astro| Translated | Cookbook listing page        |
| docs/index.astro   | Translated | Docs listing page           |

## Pages Deferred

These pages are accessible under `/uk/` via Astro rewrite fallback, but their
hardcoded strings have not yet been extracted to `ui.ts`.

| Page / Route       | Status   | Notes                                 |
|--------------------|----------|---------------------------------------|
| about              | Deferred | Accessible via fallback               |
| roadmap            | Deferred | Accessible via fallback               |
| changelog          | Deferred | Accessible via fallback               |
| glossary           | Deferred | Accessible via fallback               |
| distributions      | Deferred | Accessible via fallback               |
| status             | Deferred | Accessible via fallback               |
| api-coverage       | Deferred | Accessible via fallback               |
| 404                | Deferred | Accessible via fallback               |
| tools/*            | Deferred | All tool pages, accessible via fallback |
| resources/*        | Deferred | All resource pages, accessible via fallback |

## SEO

| Feature                          | Status  |
|----------------------------------|---------|
| hreflang tags (en, uk, x-default)| Done    |
| og:locale (en_US / uk_UA)        | Done    |
| Sitemap xhtml:link alternates    | Done    |
