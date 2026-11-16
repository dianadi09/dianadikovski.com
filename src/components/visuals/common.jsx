// Small helpers shared by the story visuals. Each visual is one SVG whose groups move
// and fade between four states: 0 problem, 1 mess, 2 map, 3 result.
export const BEIGE = '#F2E8D9'
export const TEAL = '#3D9E9E'
export const PURPLE = '#A07DD4'
export const TERRA = '#C4885A'

export const show = (state, ...on) => ({ opacity: on.includes(state) ? 1 : 0 })
export const move = (x, y, r = 0, s = 1) => ({ transform: `translate(${x}px, ${y}px) rotate(${r}deg) scale(${s})` })

export function Hand({ x, y, size = 22, fill = TERRA, anchor = 'start', children }) {
  return (
    <text x={x} y={y} fontFamily="'Gveret Levin', Assistant, sans-serif" fontSize={size} fill={fill} textAnchor={anchor} direction="rtl">
      {children}
    </text>
  )
}

// Hebrew label inside a picture. Assistant, no tracking; the browser orders bidi for us.
export function Label({ x, y, size = 14, fill = BEIGE, opacity = 0.9, anchor = 'start', children }) {
  return (
    <text x={x} y={y} fontFamily="Assistant, system-ui, sans-serif" fontWeight="600" fontSize={size} fill={fill} fillOpacity={opacity} textAnchor={anchor}>
      {children}
    </text>
  )
}

// A tangle of pencil lines between points, used by every "mess" state.
export function Tangle({ points, state, on = 1 }) {
  const d = []
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      if ((i * 7 + j * 3) % 4 === 0) continue
      const [ax, ay] = points[i]
      const [bx, by] = points[j]
      const cx = (ax + bx) / 2 + ((i - j) % 3) * 28
      const cy = (ay + by) / 2 - ((i + j) % 3) * 24
      d.push(`M${ax} ${ay} Q ${cx} ${cy} ${bx} ${by}`)
    }
  }
  return (
    <g style={show(state, on)}>
      {d.map((seg, i) => (
        <path key={i} d={seg} pathLength="1" className={`draw ${state === on ? 'is-on' : ''}`} fill="none" stroke={TERRA} strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.9" style={{ transitionDelay: state === on ? `${i * 0.06}s` : '0s' }} />
      ))}
    </g>
  )
}
