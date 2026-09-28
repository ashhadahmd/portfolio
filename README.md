# Ashhad Ahmed — portfolio

React + Vite + Tailwind site, deployed to GitHub Pages.

## Develop

```sh
npm install
npm run dev      # http://localhost:5173
npm run lint     # type-check
npm run build    # production build into dist/
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which type-checks, builds, and publishes to GitHub Pages. One-time setup: in the repo, go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.

The workflow picks the base path automatically, so the same code works as a project site (`username.github.io/<repo>/`), a user site (`username.github.io`), or a custom domain.

## Editing content

All copy lives in [src/data/portfolio.ts](src/data/portfolio.ts). Files in `public/` are served as-is; reference them with `asset('file.ext')` so the path works under the Pages base path.

- **Resume:** add `public/ashhad-ahmed-resume.pdf`, then set `profile.resumeUrl` to `asset('ashhad-ahmed-resume.pdf')`. The resume links stay hidden while it is empty.
- **Photo:** add a square image to `public/` and set `profile.avatar` the same way. It shows on the Contact page.
