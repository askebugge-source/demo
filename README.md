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

Includes six illustrated products, category filters, and a shopping bag with quantity controls. Prices are illustrative and use EUR. The bag lives in memory and resets on reload. Checkout is a demo; no orders or payments are processed. Product illustrations are local SVG components. Google Fonts is optional; system fonts provide a fallback offline.

Edit products in `src/App.tsx` and styles in `src/App.css`.
