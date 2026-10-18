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
- [ ] Compress the large SVG backgrounds and hero images
- [ ] Lazy-load heavy sections and carousels
- [ ] Accessibility audit (labels, focus states, contrast)

## Testing and DevOps
- [ ] Add unit tests (Jest / React Testing Library) and Playwright end-to-end tests
- [ ] GitHub Actions workflow for lint, type-check and build
- [ ] Add a Dockerfile
