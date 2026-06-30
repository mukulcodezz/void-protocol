import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useWallet, shortenAddress } from '../hooks/useWallet'

const NAV_LINKS = [
  { to: '/', label: 'HOME' },
  { to: '/mint', label: 'MINT' },
  { to: '/roadmap', label: 'ROADMAP' },
  { to: '/team', label: 'TEAM' },
  { to: '/faq', label: 'FAQ' },
]

function SystemClock() {
  const [time, setTime] = useState('00:00:00:00')

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date()
      const h = String(now.getHours()).padStart(2, '0')
      const m = String(now.getMinutes()).padStart(2, '0')
      const s = String(now.getSeconds()).padStart(2, '0')
      const cs = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0')
      setTime(`${h}:${m}:${s}:${cs}`)
    }, 10)
    return () => clearInterval(id)
  }, [])

  return <div className="text-xl tabular-nums">{time}</div>
}

export default function Layout() {
  const wallet = useWallet()
  const location = useLocation()
  const prefersReduced = useReducedMotion()

  return (
    <div className="font-mono selection:bg-primary selection:text-background min-h-screen flex flex-col">
      <nav className="fixed top-0 w-full z-50 bg-background border-b border-primary flex justify-between items-center px-6 md:px-10 h-24">
        <NavLink to="/" className="font-display text-display-lg-mobile md:text-display-lg text-primary uppercase tracking-tighter">
          VOID
        </NavLink>
        <div className="hidden md:flex items-center gap-6 font-mono text-system-mono uppercase">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-4 py-1 border transition-colors ${
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-outline hover:text-primary'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={wallet.address ? wallet.disconnect : wallet.connect}
          disabled={wallet.connecting}
          className="font-mono text-system-mono uppercase px-4 md:px-6 py-2 border border-primary hover:bg-primary hover:text-background transition-colors duration-75 disabled:opacity-50"
        >
          {wallet.connecting ? 'CONNECTING…' : wallet.address ? shortenAddress(wallet.address) : 'CONNECT'}
        </motion.button>
      </nav>

      <main className="pt-24 flex-grow">
        {wallet.error && (
          <div className="px-6 md:px-10 py-3 border-b border-primary bg-surface-container text-system-mono text-on-background">
            {wallet.error}
          </div>
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReduced ? 0 : -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Outlet context={wallet} />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="w-full border-t border-primary bg-background font-mono text-system-mono uppercase">
        <div className="grid grid-cols-1 md:grid-cols-12 px-6 md:px-10 py-12">
          <div className="col-span-12 md:col-span-4 mb-12 md:mb-0">
            <div className="font-display text-display-lg text-primary mb-4">VOID</div>
            <div className="text-outline">©2026 VOID_PROTOCOL // ALL_RIGHTS_RESERVED</div>
          </div>
          <div className="col-span-12 md:col-span-2 mb-12 md:mb-0">
            <div className="text-primary mb-6">DIRECTORY</div>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} className="text-outline hover:text-primary">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 md:col-span-6 flex flex-col justify-between items-start md:items-end">
            <div className="text-left md:text-right">
              <div className="text-outline mb-2">SYSTEM_TIME</div>
              <SystemClock />
            </div>
            <div className="flex gap-4 mt-12">
              {['X', 'D', 'T'].map((letter) => (
                <a
                  key={letter}
                  href="#"
                  className="w-8 h-8 border border-primary flex items-center justify-center hover:bg-primary hover:text-background"
                  aria-label={letter}
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
