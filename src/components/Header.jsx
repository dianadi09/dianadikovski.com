import { NavLink } from 'react-router-dom'

const link = ({ isActive }) =>
  `px-1 py-3 hover:text-terraInk ${isActive ? 'text-terraInk' : ''}`

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 flex h-12 items-center justify-between border-b border-brown/10 bg-beige px-5 text-base font-semibold md:text-lg sm:px-8">
      <NavLink to="/" className="font-display text-[20px] font-bold text-purpleDeep hover:text-tealInk">
        דיאנה דיקובסקי
      </NavLink>
      <nav className="flex gap-4 sm:gap-7">
        <NavLink to="/about" className={link}>מי אני</NavLink>
        <a href="/#contact" className="px-1 py-3 hover:text-terraInk">יצירת קשר</a>
      </nav>
    </header>
  )
}
