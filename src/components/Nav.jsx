import { useEffect, useState } from 'react'
import { triggerWipe } from './PageWipe'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (!target) return
    triggerWipe(() => target.scrollIntoView({ behavior: 'smooth' }))
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      padding: '1.1rem clamp(1.25rem, 3vw, 3rem)', display: 'flex', justifyContent: 'space-between',
      alignItems: 'center',
      background: scrolled ? 'rgba(244, 240, 231, 0.92)' : 'rgba(244, 240, 231, 0.72)',
      backdropFilter: 'blur(14px) saturate(1.2)',
      boxShadow: scrolled ? '0 12px 30px rgba(11, 13, 18, 0.12)' : 'none',
      transition: 'background 0.25s ease, box-shadow 0.25s ease',
    }}>
      <a
        href="#"
        onClick={(e) => handleNav(e, '#hero')}
        style={{
          fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800,
          letterSpacing: '-0.02em', color: 'var(--ink)', textDecoration: 'none',
          display: 'inline-flex', alignItems: 'center', gap: '0.65rem',
        }}
      >
        <span style={{
          width: 23, height: 23, borderRadius: '50%', background: 'var(--ink)',
          border: '4px solid var(--accent)', boxShadow: '0 0 0 1px var(--ink)',
          display: 'inline-block',
        }} />
        PGP / SYSTEM
      </a>
      <div style={{ display: 'flex', gap: 'clamp(0.8rem, 2.5vw, 2.5rem)', alignItems: 'center' }}>
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            onClick={(e) => handleNav(e, href)}
            style={{
              fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--ink)'}
            onMouseLeave={e => e.target.style.color = 'var(--muted)'}
          >
            {label}
          </a>
        ))}
        <div title="Broadcast online" style={{
          width: 8, height: 8, background: 'var(--accent)', borderRadius: '50%',
          boxShadow: '0 0 0 4px rgba(216,240,74,0.2), 0 0 14px rgba(216,240,74,0.7)',
        }} />
      </div>
    </nav>
  )
}
