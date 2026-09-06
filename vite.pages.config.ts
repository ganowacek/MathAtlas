import path from 'node:path';
import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Standalone static build for GitHub Pages. Bypasses the vinext/Cloudflare
// Workers pipeline in vite.config.ts, which produces a server-rendered
// worker (dist/server) that Pages cannot run.
export default defineConfig({
  root: path.resolve(__dirname, 'web'),
  base: process.env.GITHUB_PAGES_BASE ?? '/',
  publicDir: path.resolve(__dirname, 'public'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
    },
  },
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'gh-pages-dist'),
    emptyOutDir: true,
  },
});
