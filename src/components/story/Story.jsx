import { useEffect, useRef, useState } from 'react'
import { STEP_LABELS } from '../../data/site.js'

// One project: the picture stays, the text scrolls, and the picture changes state
// (0 הבעיה, 1 הבלגן, 2 המפה, 3 התוצאה) with the step closest to the middle of the screen.
const STEP_COLORS = ['#8A5228', '#6B4FA0', '#1F6B6B', '#4A3570']

export function Story({ project, Visual, labels = STEP_LABELS, after, compact = false }) {
  const [state, setState] = useState(0)
  const stepRefs = useRef([])

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const mid = window.innerHeight * 0.5
      let next = 0
      stepRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= mid) next = i
      })
      setState(next)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="grid gap-6 md:grid-cols-[1.35fr_1fr] md:gap-14">
      <div className="story__visual self-start">
        <div className="w-full">
          <div className="frame" style={{ '--edge': '14px', aspectRatio: '4 / 3', padding: '14px 6px' }}>
            <div className="frame__img" style={{ inset: '14px 6px' }}>
              <Visual state={state} />
            </div>
          </div>
          <p className="mt-2 flex min-h-[2.5rem] flex-wrap items-baseline gap-x-3 text-[15px] font-semibold text-brown/85">
            <span>{labels[state]}</span>
            {project.captions && <span className="hand font-normal">{project.captions[state]}</span>}
          </p>
        </div>
      </div>

      <div className={compact ? 'pb-[12vh] md:pb-[6vh]' : 'pb-[20vh] md:pb-[15vh]'}>
        {project.sections.map((s, i) => (
          <section
            key={s.label}
            ref={(el) => (stepRefs.current[i] = el)}
            className={`step min-h-[36vh] py-6 md:min-h-[38vh] ${i === state ? 'is-current' : ''}`}
            style={{ '--step': STEP_COLORS[i] }}
          >
            <div className="flex items-baseline gap-3">
              <span className="ltr font-display text-[30px] font-bold leading-none" style={{ color: STEP_COLORS[i] }}>0{i + 1}</span>
              <h3 className="text-[22px] font-bold leading-snug md:text-2xl">{s.label}</h3>
            </div>
            <p className="mt-3 leading-relaxed text-brown/85">{s.text}</p>
          </section>
        ))}
        {project.quote && (
          <blockquote className="rounded-sm bg-[#E3B88F] p-6">
            <span className="block font-display text-6xl font-bold leading-[0.6] text-purple" aria-hidden="true">”</span>
            <p className="mt-2 font-display text-[26px] font-medium leading-[1.35] text-purpleDeep md:text-[32px]">{project.quote.text}</p>
            <footer className="mt-3 text-[15px] font-semibold text-brown">{project.quote.who}</footer>
          </blockquote>
        )}
        {project.learned && (
          <p className="mt-6 font-display text-xl leading-snug text-brown/90 sm:text-2xl">
            מה למדתי: {project.learned}
          </p>
        )}
        {after}
      </div>
    </div>
  )
}
