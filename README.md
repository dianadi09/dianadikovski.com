# dianadikovski.com

אתר בעברית לסוכנים פיננסיים. React + Vite + Tailwind. התוכנית המלאה ב־[content/site-plan.md](content/site-plan.md).

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # vite build + prerender of every route into dist/
npm run preview    # serves dist/ on http://localhost:4173
```

## Screenshots

```bash
npm run preview &
node scripts/screenshot.mjs <output-dir>
```

## Where things live

- `src/data/site.js` — every word on the site
- `src/pages/` — Home, Projects, Project, About
- `src/components/story/Story.jsx` — the sticky four-state picture + scrolling steps
- `src/components/visuals/` — the SVG pictures, one per project
- `src/components/Meta.jsx` — per-page title, description, canonical
- `scripts/prerender.mjs` — static HTML for SEO and LLM crawlers, runs in `npm run build`
- `public/llms.txt`, `public/sitemap.xml`, `public/robots.txt`
- `public/photos/` — web-sized film photos, named by what is in them (originals in `assets/images/`)

## Deploy

GitHub Pages builds from `main` with `.github/workflows/deploy.yml`. `public/CNAME` holds the custom domain. The prerender writes a static HTML file per route and a `404.html`.
