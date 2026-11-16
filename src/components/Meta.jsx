import { useEffect } from 'react'

const SITE = 'https://dianadikovski.com'

// Per-page title, description and canonical. The prerender step captures the result.
export function Meta({ title, description, path = '/' }) {
  useEffect(() => {
    document.title = title
    const set = (sel, attr, val) => {
      let el = document.head.querySelector(sel)
      if (!el) {
        el = document.createElement(sel.startsWith('link') ? 'link' : 'meta')
        const [, k, v] = sel.match(/\[(\w+)="([^"]+)"\]/)
        el.setAttribute(k, v)
        document.head.appendChild(el)
      }
      el.setAttribute(attr, val)
    }
    set('meta[name="description"]', 'content', description)
    set('meta[property="og:title"]', 'content', title)
    set('meta[property="og:description"]', 'content', description)
    set('meta[property="og:url"]', 'content', SITE + path)
    set('link[rel="canonical"]', 'href', SITE + path)
  }, [title, description, path])
  return null
}
