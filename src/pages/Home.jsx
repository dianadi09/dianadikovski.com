import { Link } from 'react-router-dom'
import { Section } from '../components/Section.jsx'
import { Meta } from '../components/Meta.jsx'
import { Portrait } from '../components/Portrait.jsx'
import { Story } from '../components/story/Story.jsx'
import { CommissionStory } from '../components/visuals/CommissionStory.jsx'
import { AUDIENCE_LINE, CAN_BUILD, HERO, LINKS, PAINS, PHONE_DISPLAY, PROCESS, PROJECTS, WA_LINK } from '../data/site.js'

const PROCESS_COLORS = [['#C4885A', '#8A5228'], ['#6B4FA0', '#6B4FA0'], ['#1F6B6B', '#1F6B6B'], ['#4A3570', '#4A3570']]

export default function Home() {
  const featured = PROJECTS[0]
  return (
    <main id="top">
      <Meta title="דיאנה דיקובסקי · Diana Dikovski · תוכנה לסוכני ביטוח ופנסיה" description="מתכנתת עם 14 שנות ניסיון שבונה כלים לסוכני ביטוח ופנסיה מעל הדוחות והבקרות שכבר יש להם: איחוד דוחות יצרנים, דשבורד לתיק, תזכורות ואוטומציה לתפעול, ועזרי AI עם גבולות. שיחה ראשונה בוואטסאפ." path="/" />
      {/* hero */}
      <section className="mx-auto grid min-h-[92svh] max-w-7xl items-center gap-10 px-5 pb-12 pt-24 sm:px-8 md:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="text-[15px] font-semibold text-tealInk">{HERO.kicker}</p>
          <h1 className="mt-3 font-display text-[38px] font-bold leading-[1.18] md:text-6xl md:leading-[1.18]">{HERO.title}</h1>
          <p className="mt-6 max-w-xl text-xl leading-relaxed text-brown/85 md:text-[21px]">{HERO.lead}</p>
          <p className="mt-4 max-w-xl text-brown/85">{HERO.cred}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-primary">
              {HERO.cta}
            </a>
            <a href="#example" className="font-semibold text-tealInk underline decoration-tealInk/40 underline-offset-4 hover:text-purple">
              {HERO.cta2}
            </a>
          </div>
        </div>
        <Portrait className="hero-wash relative mx-auto w-60 -rotate-2 sm:w-80 md:w-[22rem]" />
      </section>

      {/* pains and fixes */}
      <Section band="purple" kicker="מה כואב, ומה אפשר לבנות במקומו" title="שלושה כאבים, ומה אפשר לבנות במקומם." lead={AUDIENCE_LINE}>
        <ol className="divide-y divide-brown/15 border-y border-brown/15">
          {PAINS.map((p, i) => (
            <li key={p.pain} className="grid gap-3 py-6 md:grid-cols-[4rem_1fr_1.4fr] md:gap-8">
              <span className="ltr font-display text-[40px] font-bold leading-none text-purple">0{i + 1}</span>
              <h3 className="text-[22px] font-bold leading-snug md:text-2xl">{p.pain}</h3>
              <p className="text-brown/85">{p.fix}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* featured project */}
      <Section id="example" kicker={featured.kicker} title={featured.headline} lead={featured.hook}>
        <Story project={featured} Visual={CommissionStory} compact />
        <p className="mt-6 flex flex-wrap items-center gap-4">
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-primary !px-5 !py-2.5">
            יש לכם דוחות כאלה? נדבר
          </a>
          <Link to="/about" className="font-semibold text-tealInk underline decoration-tealInk/40 underline-offset-4 hover:text-purple">
            מי בונה את זה ←
          </Link>
        </p>
      </Section>

      {/* what else can be built */}
      <Section band="teal" kicker={CAN_BUILD.kicker} title={CAN_BUILD.title} lead={CAN_BUILD.lead}>
        <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2 md:grid-cols-3">
          {CAN_BUILD.items.map(([t, d]) => (
            <li key={t} className="border-t-2 border-teal/70 pt-3">
              <h3 className="text-[22px] font-bold leading-snug">{t}</h3>
              <p className="mt-1 text-brown/85">{d}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 flex flex-wrap items-center gap-4 text-brown/80">
          {CAN_BUILD.closing}
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="font-semibold text-tealInk underline decoration-tealInk/40 underline-offset-4 hover:text-purple">
            נדבר בוואטסאפ
          </a>
        </p>
      </Section>

      {/* process */}
      <Section kicker="איך עובדים ביחד" title="ארבעה שלבים. בלי הפתעות.">
        <ol className="grid gap-5 md:grid-cols-4">
          {PROCESS.map((s, i) => (
            <li key={s.title} className="bg-card p-5" style={{ borderTop: `6px solid ${PROCESS_COLORS[i][0]}` }}>
              <span className="ltr font-display text-[40px] font-bold leading-none" style={{ color: PROCESS_COLORS[i][1] }}>0{i + 1}</span>
              <h3 className="mt-3 text-[22px] font-bold leading-snug md:text-2xl">{s.title}</h3>
              <p className="mt-2 text-brown/85">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* contact */}
      <Section band="plum" id="contact" kicker="יצירת קשר" title="נתחיל בשיחה קצרה בוואטסאפ.">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-3 text-lg">
            <p>
              <a href={WA_LINK} target="_blank" rel="noreferrer" className="font-semibold text-tealInk underline decoration-tealInk/40 underline-offset-4 hover:text-purple">
                וואטסאפ <span className="ltr">{PHONE_DISPLAY}</span>
              </a>
            </p>
            <p>
              <a href={`mailto:${LINKS.email}`} className="ltr inline-block text-tealInk underline decoration-tealInk/40 underline-offset-4 hover:text-purple">
                {LINKS.email}
              </a>
            </p>
            <p>
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="text-tealInk underline decoration-tealInk/40 underline-offset-4 hover:text-purple">
                לינקדאין
              </a>
            </p>
          </div>
          <p className="max-w-md text-brown/80">
            מספרים לי מה תקוע, ומה הייתם רוצים לראות על מסך אחד. אני חוזרת עם שאלות, ואז עם אפיון של עמוד אחד.
          </p>
        </div>
        <footer className="mt-16 flex flex-wrap justify-between gap-2 pb-16 text-sm text-brown/70">
          <span>דיאנה דיקובסקי · <span lang="en">Diana Dikovski</span> · תל אביב</span>
          <span className="ltr">dianadikovski.com · {new Date().getFullYear()}</span>
        </footer>
      </Section>
    </main>
  )
}
