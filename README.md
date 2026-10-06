# Form & Field

A responsive furniture storefront demo built with React, TypeScript and Vite.

## Start locally

Open PowerShell in this folder:

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local URL printed by Vite. Use `npm.cmd` in PowerShell if execution policy prevents `npm.ps1` from running.

## Check and build

```powershell
npm.cmd run build
npm.cmd run preview
```

Includes six photographed products, category filters, and a shopping bag with quantity controls. Prices are illustrative and use EUR. The bag lives in memory and resets on reload. Checkout is a demo; no orders or payments are processed. Product photographs are stored in public/images. See PHOTO-CREDITS.md for sources. Google Fonts is optional; system fonts provide a fallback offline.

Edit products in `src/App.tsx` and styles in `src/App.css`.

## Deploy to GitHub Pages

This project is configured for https://askebugge-source.github.io/demo/.

1. Open https://github.com/askebugge-source/demo/settings/pages. Under Build and deployment, set Source to GitHub Actions.
2. Upload the source files from this folder to the repository's main branch, keeping the same folder structure. Include src/, public/, package.json, package-lock.json, index.html, vite.config.ts, tsconfig.json, tsconfig.app.json, tsconfig.node.json, and .github/workflows/deploy.yml. Do not upload node_modules/, dist/, or .git/.
3. In GitHub's web interface, use Add file > Upload files for the source files and folders. To add the hidden workflow folder, use Add file > Create new file, name it .github/workflows/deploy.yml, and paste the contents of the local workflow file. Commit the changes on GitHub.
4. Open the Actions tab and select Deploy furniture demo to GitHub Pages. It runs when main changes; you can also select Run workflow once the file is on main.
5. Wait for both jobs to pass, then open https://askebugge-source.github.io/demo/.

The workflow installs packages from the lockfile, builds the application, and deploys only dist/. No deployment secret is needed; it uses GitHub's built-in token. If you change the repository name or use a custom domain, update the production base in vite.config.ts.

Official guidance: https://vite.dev/guide/static-deploy.html#github-pages and https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site.

