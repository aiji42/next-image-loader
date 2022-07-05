const { build } = require('esbuild')
const { peerDependencies } = require('./package.json')

build({
  bundle: true,
  external: Object.keys(peerDependencies),
  format: 'cjs',
  target: 'ES6',
  entryPoints: ['src/index.ts', 'src/image-loader.ts'],
  outdir: './build'
})
