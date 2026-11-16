import { useRef } from 'react'
import { Chart, Roll, Stage, Window, chartPoints } from '../../stageshow'
import './commission-dashboard.css'

// The result of the commission story as a believable product screen: twelve
// months of commissions, nine received and three forecast with a low / high band.
// Built on the Stageshow kit, copied from its chart-scrub gold example.
//
// Beats: the received line draws in; the forecast band opens past "today"; the
// pointer runs along the months and the headline reads each one out; it stops on
// next month, the question the advisor could not answer before. That frame holds.
//
// Real strings: the title, the headline label, the value, the range, two axis
// months and "today". Every amount is illustrative, not the client's data.

const MONTHS = ['מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר', 'ינואר', 'פברואר']
const RECEIVED = [31200, 33800, 32500, 36100, 35400, 38200, 37600, 40100, 39300]
const MID = [41800, 42900, 44100]
const LOW = [36500, 36800, 37200]
const HIGH = [47200, 49100, 51300]
const TODAY = RECEIVED.length - 1
const NEXT = RECEIVED.length
const ALL = [...RECEIVED, ...MID]
const BAND_LOW = [...RECEIVED, ...LOW]
const BAND_HIGH = [...RECEIVED, ...HIGH]
const MAX = 53000
const TOTAL = RECEIVED.reduce((n, v) => n + v, 0)
const money = (n) => `₪${n.toLocaleString('en-US')}`
const num = (n) => n.toLocaleString('en-US')

const SIZE = {
  wide: { w: 472, h: 214 },
  compact: { w: 278, h: 84 }
}

// Where each month sits across the full twelve-month plot.
const grid = (data, w, h) => chartPoints({ data, width: w, height: h, dot: false, max: MAX })
// The received chart draws nine points; this width puts its last one on "today".
const receivedWidth = (w) => 2 + ((w - 2) * TODAY) / (ALL.length - 1)

function nearest(pts, x) {
  let best = 0
  for (let i = 1; i < pts.length; i++) if (Math.abs(pts[i].x - x) < Math.abs(pts[best].x - x)) best = i
  return best
}

function yAt(pts, x) {
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i]
    const b = pts[i + 1]
    if (x >= a.x && x <= b.x) return a.y + ((b.y - a.y) * (x - a.x)) / (b.x - a.x)
  }
  return pts[pts.length - 1].y
}

async function script(a) {
  await a.wait(500)
  a.set({ drawn: true })
  await a.wait(1300)
  a.set({ band: true })
  await a.wait(900)
  const box = a.rect('plot')
  const { w, h } = SIZE[a.layout]
  const pts = grid(ALL, w, h)
  const at = (i) => ({ x: box.x + pts[i].x, y: box.y + pts[i].y + 14 })
  a.mark('hover')
  await a.move(at(4), { duration: 700 })
  a.put({ m: 4, x: pts[4].x })
  await a.wait(600)
  a.mark('scrub')
  await a.move(at(NEXT), {
    duration: 1300,
    path: (e, from, to) => ({ x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e }),
    onMove: (pt) => {
      const x = Math.max(0, Math.min(box.width, pt.x - box.x))
      a.put({ m: nearest(pts, x), x })
    }
  })
  a.put({ m: NEXT, x: pts[NEXT].x })
  a.mark('payoff')
  await a.wait(1200)
}

export function CommissionDashboard() {
  const plot = useRef(null)
  return (
    <Stage
      width={640}
      height={480}
      compact={{ below: 560, width: 358, height: 268 }}
      initial={{ drawn: false, band: false, m: null, x: null }}
      poster={{ drawn: true, band: true, m: NEXT, x: null }}
      script={script}
      play="once"
      cursor={{ at: { wide: { x: 600, y: 450 }, compact: { x: 340, y: 255 } } }}
      tokens={{ '--ss-accent': '#3D9E9E', '--ss-font': 'Assistant, system-ui, sans-serif' }}
      className="cdash"
    >
      {(s, _rect, layout) => {
        const { w, h } = SIZE[layout]
        const pts = grid(ALL, w, h)
        const lows = grid(BAND_LOW, w, h)
        const highs = grid(BAND_HIGH, w, h)
        const forecast = pts.slice(TODAY)
        const band = [...highs.slice(TODAY), ...lows.slice(TODAY).reverse()]
        const m = s.m
        const future = m !== null && m > TODAY
        const label = m === null ? `התקבל ב-${RECEIVED.length} חודשים` : `${MONTHS[m]} · ${future ? 'צפוי' : 'התקבל'}`
        const value = m === null ? TOTAL : ALL[m]
        const range = future ? `בין ${num(LOW[m - NEXT])} ל-${num(HIGH[m - NEXT])} ₪` : ' '
        const hx = s.x ?? (m === null ? null : pts[m].x)
        const hy = hx === null ? null : yAt(pts, hx)
        return (
          <Window title="תחזית עמלות" className="cdash-win">
            <div className="cdash-body" dir="rtl">
              <div className="cdash-head">
                <div className="cdash-label">
                  <Roll variant="fade">{label}</Roll>
                </div>
                <div className="cdash-value" dir="ltr">
                  <Roll stagger={25}>{money(value)}</Roll>
                </div>
                <div className="cdash-range">
                  <Roll variant="fade">{range}</Roll>
                </div>
              </div>
              <div ref={plot} className="cdash-plot" data-target="plot" data-cursor="crosshair" dir="ltr" style={{ width: w, height: h }}>
                <svg className="cdash-forecast" width={w} height={h} data-on={s.band ? '' : undefined} aria-hidden="true">
                  <polygon points={band.map((p) => `${p.x},${p.y}`).join(' ')} />
                  <polyline points={forecast.map((p) => `${p.x},${p.y}`).join(' ')} />
                </svg>
                <Chart data={RECEIVED} width={receivedWidth(w)} height={h} max={MAX} dot={false} show={s.drawn} />
                <span className="cdash-today" style={{ left: pts[TODAY].x }} data-on={s.band ? '' : undefined}>
                  <span>היום</span>
                </span>
                <span className="cdash-hair" data-on={hx !== null ? '' : undefined} style={hx !== null ? { left: hx } : undefined} />
                <span className="cdash-dot" data-on={hx !== null ? '' : undefined} data-future={future ? '' : undefined} style={hx !== null ? { left: hx, top: hy } : undefined} />
              </div>
              <div className="cdash-axis" dir="ltr" style={{ width: w }}>
                <span>{MONTHS[0]}</span>
                <span>{MONTHS[MONTHS.length - 1]}</span>
              </div>
            </div>
          </Window>
        )
      }}
    </Stage>
  )
}
