import { Section } from '../components/Section.jsx'
import { Meta } from '../components/Meta.jsx'
import { Portrait } from '../components/Portrait.jsx'
import { Story } from '../components/story/Story.jsx'
import { WhoStory } from '../components/visuals/WhoStory.jsx'
import { ABOUT, PHOTOS, PORTRAIT_FILM } from '../data/site.js'

const TILT = ['rotate-[-2deg]', 'rotate-[1.5deg]', 'rotate-[-1deg]', 'rotate-[2.2deg]', 'rotate-[-1.6deg]', 'rotate-[1deg]']

export default function About() {
  const who = {
    sections: ABOUT.bring.map((b) => ({ label: b.title, text: b.text }))
  }
  return (
    <main className="pt-12">
      <Meta title="מי אני · דיאנה דיקובסקי · Diana Dikovski" description="מתכנתת, 14 שנים: ironSource, Incredibuild, ועכשיו עצמאית שבונה כלים לסוכני ביטוח ופנסיה בישראל." path="/about/" />
      <Section kicker={<>מי אני · <span lang="en">Diana Dikovski</span></>} title={ABOUT.title}>
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
          <div className="space-y-5 text-lg leading-relaxed text-brown/85">
            {ABOUT.paras.map((t) => <p key={t}>{t}</p>)}
            <p className="text-right text-[15px] text-brown/85"><span dir="ltr">{ABOUT.stack}</span></p>
            <ol className="mt-6 border-t border-brown/15 pt-5">
              {ABOUT.timeline.map((t) => (
                <li key={t.year} className="grid grid-cols-[4rem_1fr] gap-3 py-1.5">
                  <span className="ltr font-bold text-terraInk">{t.year}</span>
                  <span>{t.what}</span>
                </li>
              ))}
            </ol>
          </div>
          <Portrait className="mx-auto w-56 rotate-2 sm:w-72" photo={PORTRAIT_FILM} />
        </div>
      </Section>

      <Section kicker="מה אני מביאה" title="ארבעה דברים, בכל פרויקט.">
        <Story project={who} Visual={WhoStory} labels={['הבעיה קודם', 'גבולות', 'סודיות', 'ליד המשתמש']} compact />
      </Section>

      <section className="band band--purple py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-[30px] font-bold md:text-5xl">מעבר למסך.</h2>
            <p className="max-w-sm text-brown/85">צילום במצלמות פילם ישנות, ובגדים עם עבר. העין שתופסת פיקסל לא במקום תופסת גם ז׳קט טוב.</p>
          </div>
        </div>
        <div className="scroll-fade-x mt-10 overflow-x-auto no-scrollbar">
          <ul className="snap-x mx-auto flex w-max gap-5 px-5 pb-6 pt-3 sm:px-8 md:max-w-7xl">
            {PHOTOS.map((p, i) => (
              <li key={p.src} className={`print w-[64vw] shrink-0 transition-transform duration-200 hover:-translate-y-1.5 hover:rotate-0 sm:w-52 md:w-56 ${TILT[i]}`}>
                <div className="print__img aspect-[2/3]">
                  <img src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" className="h-full w-full object-cover" draggable="false" />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className="mx-auto max-w-7xl px-5 text-[15px] text-brown/85 sm:px-8 md:hidden">6 פריימים · 35 מ״מ · להחליק ←</p>
      </section>
    </main>
  )
}
