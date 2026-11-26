# Rosly Tavarez — portfolio

- `site/` is the finished website. This is the folder you deploy (Cloudflare Pages, Netlify, GitHub Pages all work).
- `source/content.mjs` holds every word on the site. Edit text there, then run `node build.mjs` from the `source` folder to regenerate the HTML in `site/` (it writes into `../site` automatically).

## Pages
- `/` home · `/about/` · `/work/canvas/` · `/work/froth/` · `/work/reverdi/` · `/work/choretap/`
- `/choretap-app/` the live ChoreTap prototype (a built copy of the app: to update it, replace everything in `site/choretap-app/` with the new build). The case study also embeds it in a phone frame on desktop.
- `/files/RoslyTavarez_Resume.pdf` résumé (swap this file and `assets/img/files/RoslyTavarez_Resume-1.webp` to update it)

## Deploy to Cloudflare Pages (no code)
1. dash.cloudflare.com → Workers & Pages → Create → Pages → "Upload assets".
2. Name the project (e.g. `roslytavarez`), drag in the `site` folder, Deploy.
3. Live at https://<name>.pages.dev. Custom domain: project → Custom domains → Set up a domain.
