import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves this repository under /demo/.
  // Keep the local development server at the root URL.
  base: command === 'build' ? '/demo/' : '/',
}))
