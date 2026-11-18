# Sai & Nakshathra — Wedding Invitation

An interactive digital wedding invitation for the wedding of Sai Nath & Dr. Nakshathra.

- **Live URL**: [https://vimal-codes.github.io/sai-weds-nakshathra/](https://vimal-codes.github.io/sai-weds-nakshathra/)

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Routing**: TanStack Router
- **Styling**: Tailwind CSS + custom design tokens
- **Animations**: Lenis smooth scroll, CSS animations
- **Hosting**: GitHub Pages (via GitHub Actions)

## Development

```bash
npm install
npm run dev
```

Runs the application locally at `http://localhost:3000/sai-weds-nakshathra/`.

## Build

```bash
npm run build
```

Builds the static production bundle in `dist/` (includes `.nojekyll` and `404.html` SPA fallback for GitHub Pages).

## Hosting on GitHub Pages

This project is configured for automated deployment to GitHub Pages via **GitHub Actions** (`.github/workflows/deploy.yml`).

### Setup in GitHub:

1. Go to your repository on GitHub: `https://github.com/Vimal-codes/sai-weds-nakshathra`.
2. Navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. Every push to the `main` branch will automatically build and publish the site.
