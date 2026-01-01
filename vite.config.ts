import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [
    svgr({
      svgrOptions: {
        prettier: false,
        svgo: false,
        svgoConfig: { plugins: [{ removeViewBox: false }] },
        titleProp: true,
        ref: true,
      },
    }),
    tsconfigPaths(),
    react(),
  ],
  server: {
    port: 3006,
  },
  css: {
    transformer: 'lightningcss',
  },
});
