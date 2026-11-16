import { useEffect, useState } from 'react'
import { PORTRAIT } from '../data/site.js'

// A print in the developer tray: blank paper, then the portrait comes up.
export function Portrait({ caption, className = '', photo = PORTRAIT }) {
  const [dev, setDev] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setDev(true), 250)
    return () => clearTimeout(t)
  }, [])
  return (
    <div className={`${dev ? 'is-developed' : ''} ${className}`}>
      <div className="print" style={caption ? undefined : { paddingBottom: 14 }}>
        <div className="print__img aspect-[2/3]">
          <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} className="cover-develop h-full w-full object-cover" />
        </div>
        {caption && <p className="hand mt-3 text-center">{caption}</p>}
      </div>
    </div>
  )
}
