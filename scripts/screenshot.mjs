// Screenshots of every page, desktop and mobile. Story steps are scrolled into view one by one.
// Run: npm run preview &  then  node scripts/screenshot.mjs <output-dir>
import { chromium } from 'playwright'

const base = process.env.SITE_URL || 'http://localhost:4173'
const out = process.argv[2] || 'screenshots'
const routes = ['/', '/about']

const slugOf = (route) => (route === '/' ? 'home' : route.slice(1).split('/').join('-'))

const browser = await chromium.launch()
for (const [name, w, h] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  for (const route of routes) {
    const slug = slugOf(route)
    await page.goto(base + route, { waitUntil: 'networkidle' })
    await page.waitForTimeout(2800)
    await page.screenshot({ path: `${out}/${name}-${slug}-top.png` })
    const steps = await page.$$('.step')
    for (let i = 0; i < steps.length; i++) {
      await steps[i].evaluate((el) => {
        const r = el.getBoundingClientRect()
        window.scrollBy({ top: r.top - window.innerHeight / 2 + 40, behavior: 'instant' })
      })
      await page.waitForTimeout(1200)
      await page.screenshot({ path: `${out}/${name}-${slug}-step${i}.png` })
    }
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)
    await page.screenshot({ path: `${out}/${name}-${slug}-bottom.png` })
  }
  console.log(name, 'errors', errors)
  await ctx.close()
}
await browser.close()
