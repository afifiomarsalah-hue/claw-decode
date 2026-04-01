import { build } from 'esbuild';

// Main CLI
await build({
  entryPoints: ['src/cli.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'esm',
  outfile: 'dist/cli.js',
  banner: { js: '#!/usr/bin/env node' },
});

// Live mode
await build({
  entryPoints: ['src/live.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'esm',
  outfile: 'dist/live.js',
  banner: { js: '#!/usr/bin/env node' },
});
