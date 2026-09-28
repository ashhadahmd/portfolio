<p align="center">
  <img src="public/og-image.png" alt="Ashhad Ahmed — Services that scale. Automations that stick." width="100%" />
</p>

<p align="center">
  <a href="https://ashhadahmd.github.io/portfolio/"><strong>Live site</strong></a> ·
  <a href="https://linkedin.com/in/ashhad-ahmed">LinkedIn</a> ·
  <a href="mailto:ashhad.ahmed776@gmail.com">Email</a>
</p>

# Ashhad Ahmed — Portfolio

Personal site of Ashhad Ahmed, a backend engineer at Toko Labs building Python services for payments, wallets, and data pipelines. It has case studies, the tech stack, and a contact page.

## Featured work

<table>
  <tr>
    <td width="50%" valign="top">
      <img src="public/covers/cobu-devices.webp" alt="Cobu payment gateway on phone, tablet, and card terminal" />
      <h3>Cobu — Certified Payment Gateway</h3>
      Transaction settlement, the Mastercard Payment Gateway Services (MPGS) integration, and cardholder-data isolation for a gateway certified by Visa and Mastercard under PCI-DSS SAQ-D.
    </td>
    <td width="50%" valign="top">
      <img src="public/covers/rupin-app.webp" alt="Rupin wallet app screens" />
      <h3>Rupin — Wallet &amp; Payments</h3>
      Backend for a wallet serving 10M+ users: ledger, QR and DQR payments, IBAN transfers, and VIBAN payments, with Redis caching and Celery workers keeping it fast under load.
    </td>
  </tr>
</table>

## Built with

React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion, and React Router. The animated dot-grid background is drawn on a canvas with a small built-in simplex noise function, so it needs no graphics library. The site is deployed to GitHub Pages with GitHub Actions.

## Run it locally

```sh
npm install
npm run dev      # http://localhost:5173
npm run lint     # type-check
npm run build    # production build into dist/
```

## Deploy

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). It type-checks, builds, and publishes to GitHub Pages. The workflow picks up the base path and site URL from the Pages settings, so the same build works at `ashhadahmd.github.io/portfolio/` or on a custom domain. After you add or change the domain, run the workflow again.

## Editing content

All copy lives in [`src/data/portfolio.ts`](src/data/portfolio.ts). Files in `public/` are served as-is. Reference them with `asset('file.ext')` so their paths still work under the Pages base path.

- **Resume:** add `public/ashhad-ahmed-resume.pdf`, then set `profile.resumeUrl` to `asset('ashhad-ahmed-resume.pdf')`. The resume links stay hidden while that field is empty.

## License

The code is [MIT](LICENSE). Cobu and Rupin names, logos, and product imagery belong to their respective owners.
