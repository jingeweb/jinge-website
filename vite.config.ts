import tailwindcss from '@tailwindcss/vite';
import { jingeVitePlugin } from 'jinge-compiler';
import { execFile } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { promisify } from 'node:util';
import { defineConfig } from 'vite';

// `site/` is throwaway build input: the generated SPA entry plus one real HTML file per example
// preview. Every other route is resolved by the client.
const root = resolve('site');
const entries = JSON.parse(readFileSync('src/generated/entries.json', 'utf8')) as string[];
const run = promisify(execFile);
let refresh = Promise.resolve();
const entryModules = ['main.tsx', 'i18n.ts', 'locale.ts', 'data.ts', 'state.ts'].map((file) =>
  resolve('src', file),
);

export default defineConfig({
  root,
  base: '/',
  publicDir: resolve('public'),
  resolve: {
    alias: [{ find: /^\/src\//, replacement: resolve('src') + '/' }],
  },
  // The dependency pre-scan transforms every reachable `.tsx` with its own JSX settings, which
  // default to React's automatic runtime — the scan would then report a missing
  // `react/jsx-dev-runtime`. Jinge compiles JSX itself, so tell the scanner to use a classic
  // pragma instead; it only needs the import graph, not real output.
  optimizeDeps: {
    rolldownOptions: {
      transform: {
        jsx: { runtime: 'classic', pragma: 'jingeJsx', pragmaFrag: 'jingeJsxFragment' },
      },
    },
  },
  server: {
    watch: {
      ignored: [root + '/**', resolve('src/generated') + '/**'],
    },
  },
  plugins: [
    tailwindcss(),
    jingeVitePlugin({ intl: { dropDefaultText: false } }),
    {
      name: 'jinge:content-refresh',
      configureServer(server) {
        server.watcher.add([
          resolve('src'),
          resolve('content'),
          resolve('demos'),
          resolve('locales'),
          resolve('public'),
        ]);
        const contentDirs = ['content', 'demos', 'locales'].map((dir) => resolve(dir) + '/');
        const onContentChange = (file: string) => {
          // The entry owns the only stylesheet link, so a CSS edit needs a real reload instead of
          // the HMR update that a JS import would have produced.
          if (file.endsWith('.css')) return server.ws.send({ type: 'full-reload' });
          if (!contentDirs.some((dir) => file.startsWith(dir))) return;
          refresh = refresh
            .catch(() => undefined)
            .then(async () => {
              await run(process.execPath, ['scripts/content.mjs']);
              server.moduleGraph.invalidateAll();
              server.ws.send({ type: 'full-reload' });
            });
        };
        for (const event of ['add', 'change', 'unlink'] as const)
          server.watcher.on(event, onContentChange);
      },
      handleHotUpdate({ file, server }) {
        if (!entryModules.includes(file)) return;
        server.ws.send({ type: 'full-reload' });
        return [];
      },
    },
  ],
  build: {
    target: 'esnext',
    outDir: 'dist',
    rollupOptions: {
      input: entries.map((entry) => resolve(root, entry)),
    },
  },
});
