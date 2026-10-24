import sharp from 'sharp'
import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

const root = process.cwd()
const widths = [260, 400, 520, 800, 1200, 1536]

async function walk(dir) {
  const result = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) result.push(...(await walk(path)))
    else if (
      entry.name === 'illustration.webp' ||
      entry.name === 'workshop.png'
    ) {
      result.push(path)
    }
  }
  return result
}

const rows = []
for (const file of await walk(join(root, 'app/Custom/pages'))) {
  const before = await stat(file)
  for (const width of widths) {
    const dest = file.replace(/\.(png|webp)$/, `-${width}.webp`)
    const info = await sharp(file)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(dest)
    rows.push({
      source: file.slice(root.length + 1),
      output: dest.slice(root.length + 1),
      width: info.width,
      height: info.height,
      bytes: info.size,
      sourceBytes: before.size,
    })
  }
}
console.log(JSON.stringify(rows, null, 2))
