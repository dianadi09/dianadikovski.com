// Shared section shell: same width and rhythm everywhere.
export function Section({ id, kicker, title, lead, children, className = '', band }) {
  const body = (
    <section id={id} className={`mx-auto max-w-7xl scroll-mt-12 px-5 py-14 sm:px-8 md:py-20 ${className}`}>
      {(kicker || title) && (
        <header className="mb-8 max-w-3xl md:mb-10">
          {kicker && <p className="text-[15px] font-semibold text-tealInk">{kicker}</p>}
          {title && <h2 className="mt-2 font-display text-[30px] font-bold leading-[1.25] md:text-5xl md:leading-[1.25]">{title}</h2>}
          {lead && <p className="mt-4 max-w-2xl text-xl leading-relaxed text-brown/85 md:text-[21px]">{lead}</p>}
        </header>
      )}
      {children}
    </section>
  )
  return band ? <div className={`band band--${band}`}>{body}</div> : body
}
