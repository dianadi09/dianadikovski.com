import { BEIGE, Hand, Label, TEAL, Tangle, move, show } from './common.jsx'
import { lazy, Suspense } from 'react'

// The product mock pulls in the Stageshow kit; load it only when the story reaches it.
const CommissionDashboard = lazy(() => import('./CommissionDashboard.jsx').then((m) => ({ default: m.CommissionDashboard })))

const SHEETS = ['עמלות-הראל', 'נפרעים', 'היקף', 'גבייה']
// Where each sheet sits in states 0/1 (scattered), 2 (lined up) and 3 (folded into the box).
const SCATTER = [
  [34, 40, -7],
  [240, 36, 6],
  [120, 168, -3],
  [270, 190, 8]
]
const LINED = SHEETS.map((_, i) => [28, 30 + i * 60, 0])
const FOLDED = SHEETS.map(() => [250, 125, 0])
const CENTRES = SCATTER.map(([x, y]) => [x + 42, y + 26])

export function CommissionStory({ state }) {
  const pos = state <= 1 ? SCATTER : state === 2 ? LINED : FOLDED
  return (
    <div className="relative h-full w-full">
    <svg viewBox="0 0 400 300" className="sv h-full w-full" aria-hidden="true">
      {/* 1 the tangle */}
      <Tangle points={CENTRES} state={state} on={1} />

      {/* 2 straight arrows into one calculation */}
      <g style={show(state, 2)}>
        {LINED.map(([x, y], i) => (
          <path key={i} d={`M${x + 86} ${y + 26} C 160 ${y + 26}, 180 140, 236 140`} pathLength="1" className={`draw ${state === 2 ? 'is-on' : ''}`} fill="none" stroke={TEAL} strokeWidth="2" style={{ transitionDelay: state === 2 ? `${i * 0.08}s` : '0s' }} />
        ))}
        <rect x="236" y="104" width="130" height="72" rx="4" fill="none" stroke={BEIGE} strokeWidth="1.5" />
        <Label x={301} y={135} anchor="middle" size={16}>חישוב</Label>
        <Label x={301} y={153} anchor="middle" size={16}>אחד</Label>
      </g>

      {/* the sheets, always present, moving */}
      {SHEETS.map((name, i) => {
        const [x, y, r] = pos[i]
        return (
          <g key={name} style={{ ...move(x, y, r, state === 3 ? 0.4 : 1), opacity: state === 3 ? 0 : 1 }}>
            <rect width="86" height="52" rx="2" fill={BEIGE} fillOpacity="0.94" />
            <g stroke={TEAL} strokeOpacity="0.5" strokeWidth="0.9">
              <line x1="5" y1="22" x2="81" y2="22" />
              <line x1="5" y1="32" x2="81" y2="32" />
              <line x1="5" y1="42" x2="81" y2="42" />
              <line x1="30" y1="16" x2="30" y2="48" />
              <line x1="56" y1="16" x2="56" y2="48" />
            </g>
            <Label x={81} y={14} size={14} fill="#2C2018" opacity={0.9} anchor="end">{name}</Label>
          </g>
        )
      })}

      {/* 0 the question */}
      <g style={show(state, 0)}>
        <Hand x={200} y={132} size={34} anchor="middle">כמה ייכנס בחודש הבא?</Hand>
      </g>

    </svg>

    {/* 3 the result: the forecast as the advisor sees it, a product screen */}
    {state === 3 && (
      <div className="cdash-layer absolute inset-0">
        <Suspense fallback={null}>
          <CommissionDashboard />
        </Suspense>
      </div>
    )}
    </div>
  )
}
