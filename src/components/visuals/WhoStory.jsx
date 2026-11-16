import { BEIGE, Label, PURPLE, TEAL, TERRA, move } from './common.jsx'

// One pencil path with four stops. Each step adds a stop and a small real glyph.
const STOPS = [
  [70, 190],
  [165, 85],
  [255, 195],
  [340, 90]
]
const LABEL = ['הבעיה קודם', 'גבולות', 'סודיות', 'ליד המשתמש']

export function WhoStory({ state }) {
  const segs = STOPS.slice(1).map(([bx, by], i) => {
    const [ax, ay] = STOPS[i]
    return `M${ax} ${ay} Q ${(ax + bx) / 2 + (i % 2 ? 36 : -36)} ${(ay + by) / 2} ${bx} ${by}`
  })
  return (
    <svg viewBox="0 0 400 300" className="sv h-full w-full" aria-hidden="true">
      {segs.map((d, i) => (
        <path key={i} d={d} pathLength="1" className={`draw ${state > i ? 'is-on' : ''}`} fill="none" stroke={TERRA} strokeWidth="2.4" strokeLinecap="round" style={{ opacity: state > i ? 1 : 0 }} />
      ))}
      {STOPS.map(([x, y], i) => (
        <g key={i} style={{ ...move(0, 0, 0, state >= i ? 1 : 0.8), opacity: state >= i ? 1 : 0.4 }}>
          <circle cx={x} cy={y} r="38" fill={BEIGE} fillOpacity={state === i ? 1 : 0.8} />
          <g style={{ transform: 'scale(1.5)' }}><Glyph kind={i} x={x} y={y} on={state === i} /></g>
          <Label x={x} y={y + 58} size={15} anchor="middle">{LABEL[i]}</Label>
        </g>
      ))}
    </svg>
  )
}

function Glyph({ kind, x, y, on }) {
  const c = on ? TEAL : '#2C2018'
  if (kind === 0)
    return (
      <g fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round">
        <path d={`M${x - 14} ${y + 8} C ${x - 6} ${y - 12}, ${x + 6} ${y - 12}, ${x + 14} ${y + 8}`} />
        <circle cx={x - 14} cy={y + 8} r="2.5" fill={c} />
        <circle cx={x + 14} cy={y + 8} r="2.5" fill={c} />
      </g>
    )
  if (kind === 1)
    return (
      <g fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round">
        <line x1={x} y1={y - 14} x2={x} y2={y + 14} strokeDasharray="3 3" />
        <rect x={x - 16} y={y - 6} width="10" height="12" rx="1" fill={c} stroke="none" />
        <path d={`M${x + 6} ${y} q 5 -6 10 0`} stroke={on ? PURPLE : c} />
      </g>
    )
  if (kind === 2)
    return (
      <g fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round">
        <rect x={x - 11} y={y - 3} width="22" height="16" rx="2" fill={c} stroke="none" />
        <path d={`M${x - 6} ${y - 3} v -5 a 6 6 0 0 1 12 0 v 5`} />
      </g>
    )
  return (
    <g fill={c}>
      <circle cx={x - 10} cy={y} r="4" />
      <circle cx={x} cy={y - 6} r="4" />
      <circle cx={x + 10} cy={y} r="4" />
      <circle cx={x} cy={y + 7} r="4" fill={on ? TERRA : c} />
    </g>
  )
}
