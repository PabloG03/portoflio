import PageWipe from './components/PageWipe'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import About from './sections/About'
import Work from './sections/Work'
import Skills from './sections/Skills'
import Contact from './sections/Contact'
import Experience from './sections/Experience'

export default function App() {
  return (
    <>
      <PageWipe />
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <footer className="site-footer" style={{
        background: 'var(--ink)', padding: '1.8rem 3rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: '0.85rem',
          fontWeight: 800, color: 'var(--paper)', letterSpacing: '-0.01em',
        }}>
          Pablo García Pérez
        </span>
        <span style={{
          fontSize: '0.62rem', letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'rgba(245,242,237,0.25)',
        }}>
          © 2026 — Diseñado con intención
        </span>
      </footer>
    </>
  )
}
