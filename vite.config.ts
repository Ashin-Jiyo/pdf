import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  return {
    plugins: [react()],
    // For GitHub Pages, set base to your repo name (with trailing slash)
  base: isProd ? '/pdf/' : '/', // Set base to new repo name for GitHub Pages
    server: {
      host: true, // Expose to network
      port: 5173,
    },
    build: {
      outDir: 'dist',
      sourcemap: isProd ? false : true,
      minify: isProd ? 'esbuild' : false, // Only 'esbuild', 'terser', or false are allowed
      emptyOutDir: true,
    },
    preview: {
      port: 4173,
      host: true,
    },
  };
});
