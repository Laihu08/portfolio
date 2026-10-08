# Rahul Selvaraj — Portfolio

Live: https://laihu08.github.io/portfolio/

Next.js (static export) + Tailwind CSS. Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in ./out (served under /portfolio/)
```

All page content lives in `lib/data.ts`. The previous version of the site is kept on the `old-portfolio` branch.
