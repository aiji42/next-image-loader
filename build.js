const { buildSync } = require('esbuild')
const fs = require('fs')

const readdirRecursively = (dir, files = []) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const dirs = []
  for (const dirent of entries) {
    if (dirent.isDirectory()) dirs.push(`${dir}/${dirent.name}`)
    if (dirent.isFile()) files.push(`${dir}/${dirent.name}`)
  }
  for (const d of dirs) {
    files = readdirRecursively(d, files)
  }
  return files
}

buildSync({
  entryPoints: readdirRecursively('./src').filter(
    (n) => n.match(/\.(ts|tsx)$/) && !n.includes('__tests__')
  ),
  outdir: './build',
  format: 'cjs',
  target: 'esnext'
})
