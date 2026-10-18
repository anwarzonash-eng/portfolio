# Portfolio

The public website of a portfolio / CV platform. It renders a freelancer's home page, portfolio and case studies, testimonials, blog listing, FAQs, contact forms and printable / downloadable CV pages. All content is loaded at runtime from the [Portfolio CMS API](https://github.com/anwarzonash-eng/portfolio-cms-api) and managed through the companion [Portfolio CMS](https://github.com/anwarzonash-eng/portfolio-cms) panel.

It is for freelancers and small agencies who want a data-driven portfolio site that can serve several personas / domains from one codebase.

## Tech stack

- Next.js 15 (App Router) and React 18, TypeScript
- Tailwind CSS, Radix UI, Swiper / Embla / Slick carousels
- Redux Toolkit + redux-persist, Formik + Yup
- `@react-pdf/renderer` and Puppeteer for CV / PDF generation

## Getting started

Requirements: Node.js 18+ and a running instance of the Portfolio CMS API.

```bash
git clone https://github.com/anwarzonash-eng/portfolio.git
cd portfolio
npm install
cp .env.example .env.local   # set API_BASE_URL to your API
npm run dev                  # http://localhost:3059
```

Production:

```bash
npm run build
npm start                    # port 3059
```

## Configuration

| Variable | Purpose |
| --- | --- |
| `API_BASE_URL` | Base URL of the Portfolio CMS API |
| `IS_SERVICES_ALLOWED` | `true` shows the Services section in the header |
| `NEXT_PUBLIC_SITE_URL` | Public URL of this site, used by CV generation |

Blog posts can be served from local WordPress-style JSON files; map a domain to a file in `authorBlogIds` in [src/data/JsonData.ts](src/data/JsonData.ts).

## Project structure

```
src/
  app/           Next.js routes (home, portfolio, blog-listing, print, ...)
  components/    page sections and reusable UI
  apiHandlers/   data fetching helpers
  gateways/      axios API gateway
  store/         Redux store
  hooks/ utils/  shared helpers
```

## Roadmap

See [ROADMAP.md](ROADMAP.md).

## License

[MIT](LICENSE)
