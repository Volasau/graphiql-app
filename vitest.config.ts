import { mergeConfig, defineConfig } from 'vitest/config';
import viteConfig from './vite.config';
import react from '@vitejs/plugin-react';

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      watch: false,
      setupFiles: './src/setup.ts',
      coverage: {
        exclude: [
          'src/main.tsx',
          'src/vite-env.d.ts',
          'src/setup.ts',
          'src/utils/types.ts',
        ],
      },
    },
  })
);
