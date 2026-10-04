// Next.js ghi file prefetch dạng thư mục: __next.$d$locale/blog/__PAGE__.txt
// nhưng trình duyệt lại request tên phẳng: __next.$d$locale.blog.__PAGE__.txt
// Hosting tĩnh (GitHub Pages) không tự map được, nên tạo thêm bản tên phẳng.
import fs from 'node:fs'
import path from 'node:path'

const OUT = path.resolve('out')
let count = 0

function flatten(dir, prefix, target) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const name = `${prefix}.${entry.name}`
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) flatten(full, name, target)
    else {
      fs.copyFileSync(full, path.join(target, name))
      count++
    }
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (!entry.isDirectory()) continue
    if (entry.name.startsWith('__next.')) flatten(full, entry.name, dir)
    else walk(full)
  }
}

walk(OUT)
console.log(`flatten-rsc: created ${count} files`)
