// Write dist/sitemap.xml with a lastmod per page: the date of the last commit that
// touched the files that page is built from. Falls back to no lastmod without git.
import { execSync } from 'node:child_process'
import { writeFile } from 'node:fs/promises'

const SITE = 'https://dianadikovski.com'
const SHARED = ['index.html', 'src/data/site.js', 'src/components', 'src/styles', 'src/App.jsx']
const PAGES = [
  { path: '/', files: ['src/pages/Home.jsx'], changefreq: 'monthly', priority: '1.0' },
  { path: '/about/', files: ['src/pages/About.jsx'], changefreq: 'yearly', priority: '0.6' }
]

function lastChange(files) {
  try {
    const out = execSync(`git log -1 --format=%cs -- ${files.join(' ')}`, { encoding: 'utf8' }).trim()
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null
  } catch {
    return null
  }
}

const urls = PAGES.map((p) => {
  const date = lastChange([...p.files, ...SHARED])
  const lastmod = date ? `<lastmod>${date}</lastmod>` : ''
  return `  <url><loc>${SITE}${p.path}</loc>${lastmod}<changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`
})

await writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
)
console.log('sitemap written')
