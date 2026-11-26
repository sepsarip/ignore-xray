import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: [
    { in: 'src/extension.ts', out: 'extension' },
    { in: 'src/worker/worker.ts', out: 'worker' },
  ],
  outdir: 'dist',
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'es2022',
  external: ['vscode'],
  minify: true,
});
