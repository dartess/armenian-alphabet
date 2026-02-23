import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
    transformer: mode !== 'development' ? ('lightningcss' as const) : undefined,
    modules: {
      generateScopedName:
        mode === 'development' ? '[name]__[local]_[hash:base64:4]' : '[hash:base64:8]',
    },
  },
}));
