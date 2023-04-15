/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      mainFields: ['module', 'main'],
      resolveExtensions: ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', '.ts', '.js'],
    },
  },
  resolve: {
    extensions: ['.web.tsx', '.web.jsx', '.web.js', '.tsx', '.ts', '.js'],
    alias: {
      'react-native': 'react-native-web',
    },
  },
  build: {
    outDir: 'build',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'UniversalLabsStyled',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      makeAbsoluteExternalsRelative: 'ifRelativeSource',
      external: [
        'react',
        'react/jsx-runtime',
        'react-native',
        'react-native-web',
        '@universal-labs/stylesheets',
        'use-sync-external-store/shim',
        'use-sync-external-store',
      ],
      treeshake: true,
      output: {
        extend: true,
        globals: {
          react: 'React',
          'use-sync-external-store/shim': 'UseSyncExternalStoreShim',
          'use-sync-external-store': 'UseSyncExternalStoreLegacy',
        },
        externalImportAssertions: true,
      },
    },
    emptyOutDir: false,
  },
});
