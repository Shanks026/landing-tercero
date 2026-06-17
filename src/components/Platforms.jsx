import { Reveal } from '../lib/Reveal'
import instagram from '../assets/platformIcons/instagram.png'
import linkedin from '../assets/platformIcons/linkedin.png'
import twitter from '../assets/platformIcons/twitter.png'
import youtube from '../assets/platformIcons/youtube.png'
import facebook from '../assets/platformIcons/facebook.png'
// import googleBusiness from '../assets/platformIcons/google_busines.png'

const plats = [
  { name: 'Instagram',       icon: instagram },
  { name: 'LinkedIn',        icon: linkedin },
  { name: 'X / Twitter',     icon: twitter },
  { name: 'YouTube',         icon: youtube },
  { name: 'Facebook',        icon: facebook },
  // { name: 'Google Business', icon: googleBusiness },
]

export function Platforms() {
  return (
    <Reveal className="py-16 max-sm:py-10 border-t border-border">
      <div className="max-w-wrap mx-auto px-10 max-sm:px-5">
        <p className="text-center text-xs text-muted-foreground mb-5 tracking-[0.06em] uppercase font-medium">
          Platform-specific previews for
        </p>
        <div className="flex items-center justify-center gap-[10px] flex-wrap">
          {plats.map((p, i) => (
            <div key={i} className="flex items-center gap-[6px] text-[13px] text-muted-foreground px-4 py-2 border border-border rounded-full hover:border-foreground/15 hover:text-muted-foreground transition-all font-normal cursor-default">
              <img src={p.icon} alt={p.name} className="w-[14px] h-[14px] object-contain shrink-0" />
              {p.name}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  )
}
