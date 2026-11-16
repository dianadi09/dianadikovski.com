// Pre-render every route to static HTML so search engines and LLM crawlers see the
// full Hebrew content without running JavaScript. Runs after `vite build`.
import { chromium } from 'playwright'
import { execSync } from 'node:child_process'
import { createServer } from 'node:http'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const DIST = path.resolve('dist')
const ROUTES = ['/', '/about']
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.txt': 'text/plain', '.xml': 'application/xml' }

// Tiny static server with SPA fallback, so the build runs the same everywhere.
const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x')
  let file = path.join(DIST, decodeURIComponent(url.pathname))
  if (!existsSync(file) || !path.extname(file)) file = path.join(DIST, 'index.html')
  try {
    const body = await readFile(file)
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' })
    res.end(body)
  } catch {
    res.writeHead(404).end()
  }
})
await new Promise((r) => server.listen(0, r))
const base = `http://localhost:${server.address().port}`

// Hosted builders (Netlify, Cloudflare) have Playwright but no browser. Install one on
// demand; if that is impossible, ship the plain SPA instead of failing the build.
async function launch() {
  try {
    return await chromium.launch()
  } catch {
    console.log('prerender: installing chromium')
    try {
      execSync('npx playwright install chromium', { stdio: 'inherit' })
      return await chromium.launch()
    } catch (err) {
      console.warn('prerender: skipped, no browser available:', err.message.split('\n')[0])
      return null
    }
  }
}

const browser = await launch()
if (!browser) {
  server.close()
  await writeFile(path.join(DIST, '404.html'), await readFile(path.join(DIST, 'index.html')))
  process.exit(0)
}
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
for (const route of ROUTES) {
  await page.goto(base + route, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  // Snapshot after the cover has developed, so the static HTML is not blurred.
  await page.evaluate(() => document.querySelectorAll('.cover-develop').forEach((el) => el.closest('[class]')?.classList.add('is-developed')))
  const html = '<!doctype html>\n' + (await page.evaluate(() => document.documentElement.outerHTML))
  const out = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route, 'index.html')
  await mkdir(path.dirname(out), { recursive: true })
  await writeFile(out, html)
  console.log('prerendered', route)
}
await browser.close()
server.close()

// 404 falls back to the app shell, which routes client-side.
await writeFile(path.join(DIST, '404.html'), await readFile(path.join(DIST, 'index.html')))
