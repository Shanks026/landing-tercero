import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { track } from '@vercel/analytics'
import { Logo } from '../lib/Logo'
import { links } from '../lib/links'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] py-[22px] transition-all duration-400 border-b ${
        scrolled ? 'bg-background/92 backdrop-blur-[12px] border-border' : 'border-transparent'
      }`}>
        <div className="max-w-wrap mx-auto px-10 max-sm:px-5">
          <div className="flex items-center justify-between">
            <a href="#" className="no-underline flex items-center">
              <Logo width={120} />
            </a>
            <div className="flex items-center gap-7">
              <ul className="hidden md:flex items-center gap-7 list-none">
                {['Features', 'How it works', 'Pricing'].map((item, i) => (
                  <li key={i}>
                    <a
                      href={`#${item === 'How it works' ? 'how' : item === 'Features' ? 'features' : 'pricing'}`}
                      className="text-muted-foreground text-sm font-normal no-underline hover:text-foreground transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="hidden md:flex items-center gap-2">
                <a href={links.login} className="bg-transparent border-none text-muted-foreground text-sm font-normal cursor-pointer px-[14px] py-2 rounded-lg hover:text-foreground transition-colors font-sans no-underline">
                  Log in
                </a>
                <a href={links.signup} onClick={() => track('signup_click', { location: 'navbar' })} className="bg-primary text-primary-foreground border-none px-[18px] py-[9px] rounded-lg text-[13px] font-medium cursor-pointer hover:opacity-80 transition-opacity font-sans tracking-[-0.01em] no-underline">
                  Start free trial
                </a>
              </div>
            </div>
            <button
              className="md:hidden bg-transparent border-none cursor-pointer p-[6px] text-foreground"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              <svg viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" style={{ width: 22, height: 22 }}>
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/25 z-[300] backdrop-blur-[2px]"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-[260px] bg-background z-[400] p-6 shadow-[-8px_0_40px_rgba(0,0,0,0.08)] flex flex-col"
            >
              <button
                className="self-end bg-transparent border-none cursor-pointer p-1 text-muted-foreground mb-6"
                onClick={() => setDrawerOpen(false)}
              >
                <svg viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" style={{ width: 20, height: 20 }}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <a href="#" className="mb-6 no-underline block"><Logo /></a>
              <ul className="list-none flex flex-col gap-1">
                {[
                  { label: 'Features', href: '#features' },
                  { label: 'How it works', href: '#how' },
                  { label: 'Pricing', href: '#pricing' },
                ].map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.href}
                      className="block text-base font-medium text-foreground no-underline px-2 py-[10px] rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setDrawerOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="h-px bg-border my-4" />
              <ul className="list-none flex flex-col gap-1">
                <li><a href={links.login} className="block text-base font-medium text-foreground no-underline px-2 py-[10px] rounded-lg hover:bg-muted transition-colors">Log in</a></li>
                <li><a href={links.signup} onClick={() => track('signup_click', { location: 'navbar_mobile' })} className="block text-base font-semibold text-primary no-underline px-2 py-[10px] rounded-lg hover:bg-muted transition-colors">Start free trial</a></li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
