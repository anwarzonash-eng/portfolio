# Roadmap

Planned work on this project:

## Code quality
- [ ] Remove large commented-out blocks and dead code (for example in `next.config.mjs` and API handlers)
- [ ] Turn on ESLint during builds and fix the existing warnings
- [ ] Replace `any` types with proper TypeScript models for the API responses
- [ ] Split the very large page components (CV4, home, portfolio detail) into smaller ones

## Features
- [ ] Remove hard-coded domain checks and move per-domain behaviour into API-driven configuration
- [ ] Make blog sources configurable (WordPress REST API or local Markdown) instead of a static list
- [ ] Improve SEO: metadata per page, sitemap and Open Graph images
- [ ] Add dark mode
- [ ] Add i18n support

## Performance and accessibility
- [x] Compress the large SVG backgrounds and hero images
      (Done, but wider than the line suggests, and one premise in it was wrong.
      The two "large SVG backgrounds" - footerMobileBG.svg and formBg.svg,
      12.78 MB each - turned out to be unreferenced Figma exports of the two
      footer PNGs and were deleted, not compressed. What actually happened:
      150 unreferenced assets removed (104.29 MB -> 1.42 MB in public/);
      29 live rasters converted to WebP; 38 SVGs run through svgo
      (123 KB -> 46 KB gzipped); the Next image optimiser enabled with
      per-device sizes and priority on hero images; print routes deliberately
      excluded from the optimiser to keep PDF capture correct.
      See docs/image-optimisation.md for the before/after figures.)
- [x] Lazy-load heavy sections and carousels
      (hero SVG backdrops moved to `/public/bg`; sweetalert2, formik/yup, swiper,
      the portfolio modal, FAQs, blogs and the home video are now loaded on demand.
      Print routes are deliberately excluded.)
- [ ] Accessibility audit (labels, focus states, contrast)

## Testing and DevOps
- [ ] Add unit tests (Jest / React Testing Library) and Playwright end-to-end tests
- [ ] GitHub Actions workflow for lint, type-check and build
- [ ] Add a Dockerfile
