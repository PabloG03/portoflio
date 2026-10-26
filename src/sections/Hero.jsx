import { useEffect, useState } from 'react'
import { motion, useAnimate, stagger } from 'framer-motion'
import { triggerWipe } from '../components/PageWipe'

import secondCover from '../assets/covers/second.jpeg'
import motionStudiesCover from '../assets/covers/motion-studies.jpg'
import digitalThingsCover from '../assets/covers/digital-things.jpg'

const marqueeItems = ['Java', 'JavaScript', 'C++', 'Python', 'UI Systems', 'React', 'LMM']

const GROOVE_RADII = [155, 135, 115, 95, 75, 55]

// ─── Composición de Álbumes y Vinilos Avanzada ──────────────────────────────

function AlbumComposition() {
  const [albums, setAlbums] = useState([
  {
    id: 1,
    bg: '#A78BFA',
    cover: secondCover,
    label: 'UI Systems Vol. I',
    vinylColor: 'rgba(167,139,250,.78)',
    catalog: 'LP-001',
    year: '2026',
  },
  {
    id: 2,
    bg: '#22D3EE',
    cover: motionStudiesCover,
    label: 'Motion Studies',
    vinylColor: 'rgba(34,211,238,.78)',
    catalog: 'LP-002',
    year: '2026',
  },
  {
    id: 3,
    bg: '#FB7185',
    cover: digitalThingsCover,
    label: 'Digital Things LP',
    vinylColor: 'rgba(251,113,133,.78)',
    catalog: 'LP-003',
    year: '2026',
  },
])

  const [phase, setPhase] = useState('idle')

  useEffect(() => {
    let mounted = true

    const cycle = async () => {
      while (mounted) {
        // 1. Extraer el vinilo lentamente hacia la izquierda con rotación
        setPhase('extract')
        await new Promise(r => setTimeout(r, 2600))

        // 2. Guardar el vinilo de vuelta dentro de su funda
        setPhase('return')
        await new Promise(r => setTimeout(r, 1800))

        // 3. Reordenar el stack de carátulas (mandar la del frente al fondo)
        setPhase('reorder')
        await new Promise(r => setTimeout(r, 1000))

        setAlbums(prev => {
          const copy = [...prev]
          const first = copy.pop()
          copy.unshift(first)
          return copy
        })

        // 4. Pausa estática de reposo antes de iniciar el siguiente ciclo
        setPhase('idle')
        await new Promise(r => setTimeout(r, 1200))
      }
    }

    cycle()

    return () => {
      mounted = false
    }
  }, [])

  const stackPositions = [
    { x: -30, y: 20, rotate: -8, scale: 0.95, z: 1 },
    { x: 0, y: 10, rotate: -4, scale: 0.97, z: 2 },
    { x: 30, y: 0, rotate: 0, scale: 1, z: 4 }, // Portada frontal activa
  ]

  // El álbum del frente siempre es el último del array renderizado debido al mapeo zIndex
  const activeAlbum = albums[albums.length - 1]

  return (
    <div
      className="album-composition"
      style={{
        position: 'relative',
        width: 640,  // Espacio optimizado para evitar cortes laterales al extraer el vinilo
        height: 540,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── STACK DE CARÁTULAS ── */}
      {albums.map((album, i) => {
        const p = stackPositions[i]

        return (
          <motion.div
            className="album-cover"
            key={album.id}
            animate={{
              x: p.x,
              y: p.y,
              rotate: p.rotate,
              scale: p.scale,
            }}
            transition={{
              duration: 1.4,
              ease: [0.25, 1, 0.5, 1],
            }}
            style={{
              position: 'absolute',
              width: 400,
              height: 400,
              backgroundColor: album.bg,
              zIndex: p.z,
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <img
              src={album.cover}
              alt={album.label}
              onError={(event) => {
                event.currentTarget.style.display = 'none'
              }}
              style={{
                position:'absolute',
                inset:0,
                width:'100%',
                height:'100%',
                objectFit:'cover',
                filter:'contrast(1.05) saturate(.95)',
              }}
            />
            <div style={{
              position:'absolute', inset: 12, border: '1px solid rgba(255,255,255,.45)',
              pointerEvents: 'none',
            }}/>
            <div style={{
              position:'absolute', inset:0,
              background:'linear-gradient(145deg, rgba(8,9,18,.05) 25%, rgba(8,9,18,.65) 100%)',
              pointerEvents: 'none',
            }}/>
            <div style={{
              position:'absolute', top: 24, left: 24, right: 24,
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              color: '#fff', fontFamily: 'var(--font-body)', fontSize: '.48rem',
              fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase',
              textShadow: '0 1px 5px rgba(0,0,0,.35)',
            }}>
              <span>PGP / ARCHIVE</span>
              <span>VOL. 0{i + 1}</span>
            </div>
            <div style={{
              position:'absolute', bottom:0,left:0,right:0,height:72,
              background:'linear-gradient(to top, rgba(8,9,18,.72), transparent)',
              display:'flex',alignItems:'flex-end',justifyContent:'space-between',padding:'0 24px 18px',
              color: '#fff',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: '.82rem', fontWeight: 800,
                letterSpacing: '-.02em', maxWidth: '70%',
              }}>{album.label}</span>
              <span style={{fontSize:'.52rem', letterSpacing: '.12em', opacity: .7}}>{album.catalog}</span>
            </div>
          </motion.div>
        )
      })}

      {/* ── VINILO INTEGRADO DINÁMICO ── */}
      <motion.div
        className="hero-vinyl"
        animate={{
          // Se alinea perfectamente en x: 30 detrás de la portada frontal, y sale hasta x: -220
          x: phase === 'extract' ? -220 : 30,
          y: 0,
          // Dos vueltas completas de rotación progresiva al salir
          rotate: phase === 'extract' ? -720 : 0,
        }}
        transition={{
          duration: phase === 'extract' ? 2.4 : 1.6,
          ease: [0.25, 1, 0.5, 1],
        }}
        style={{
          position: 'absolute',
          width: 375,
          height: 375,
          zIndex: 3, // Posicionado milimétricamente detrás de la carátula frontal (z:4)
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            // Efecto translúcido combinado con el color del álbum activo
            background: activeAlbum
              ? `radial-gradient(circle, ${activeAlbum.vinylColor} 0%, rgba(10,10,10,0.95) 80%, #050505 100%)`
              : 'radial-gradient(circle, #222 0%, #0a0a0a 100%)',
            position: 'relative',
            boxShadow: '0 12px 45px rgba(0,0,0,0.65)',
            transition: 'background 0.6s ease',
          }}
        >
          {/* Surcos físicos del sonido */}
          {GROOVE_RADII.map(r => (
            <div
              key={r}
              style={{
                position: 'absolute',
                width: r * 2,
                height: r * 2,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                border: '0.5px solid rgba(255,255,255,0.035)',
              }}
            />
          ))}

          {/* Galleta Central (Cambia de color según el diseño de la funda) */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 95,
              height: 95,
              borderRadius: '50%',
              background: activeAlbum ? activeAlbum.bg : 'var(--accent)',
              border: '5px solid #0a0a0a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              transition: 'background 0.5s ease',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)',
            }}
          >
            <span
              style={{
                fontSize: '.52rem',
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '.08em',
                textAlign: 'center',
                lineHeight: 1.2,
                fontFamily: 'var(--font-body, monospace), monospace',
                textShadow: '0 1px 2px rgba(0,0,0,0.4)',
              }}
            >
              SIDE A
            </span>
            {/* Agujero central del tocadiscos */}
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: '#0a0a0a',
                marginTop: 5,
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Tracklist decorativa ─────────────────────────────────────────────────────

function Tracklist() {
  const tracks = [
    { num: '01', name: 'Hero', active: true },
    { num: '02', name: 'About', active: false },
    { num: '03', name: 'Work',   active: false },
    { num: '04', name: 'Skills', active: false },
    { num: '05', name: 'Contact', active: false },
  ]

  return (
    <div style={{ textAlign: 'right' }}>
      <h3 style={{ fontFamily: 'var(--font-body, monospace), monospace', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#555', marginBottom: '0.75rem', margin: 0 }}>
        Tracklist
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {tracks.map(t => (
          <li
            key={t.num}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end', marginBottom: '0.35rem',
              fontFamily: 'var(--font-body, monospace), monospace', fontSize: '0.62rem',
              color: t.active ? 'var(--accent)' : '#777',
              transition: 'color 0.2s',
            }}
          >
            <span style={{ opacity: 0.4, fontSize: '0.5rem' }}>{t.num}</span>
            {t.name}
            {t.active && <span style={{ fontSize: '0.55rem', color: 'var(--accent)' }}>▶</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Hero Principal ───────────────────────────────────────────────────────────

export default function Hero() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const sequence = async () => {
      await animate(
        '[data-word]',
        { y: [60, 0], opacity: [0, 1] },
        { duration: 0.8, ease: [0.215, 0.610, 0.355, 1], delay: stagger(0.06) }
      )
      animate('[data-sub]',     { opacity: [0, 1], y: [15, 0] }, { duration: 0.6, ease: 'easeOut' })
      animate('[data-actions]', { opacity: [0, 1], y: [10, 0] }, { duration: 0.6, ease: 'easeOut', delay: 0.1 })
    }
    sequence()
  }, [animate])

  const handleNav = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (!target) return
    triggerWipe(() => target.scrollIntoView({ behavior: 'smooth' }))
  }

  return (
    <section
      id="hero"
      ref={scope}
      style={{
        minHeight: '100vh',
        background: 'var(--paper)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Columna izquierda */}
      <div className="hero-copy" style={{ padding: 'clamp(2rem, 5vw, 4rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1px solid #D4CEBC', position: 'relative', zIndex: 2, paddingBottom: '5rem' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-body, monospace), monospace', fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#999' }}>
          <span style={{ width: 20, height: 1, background: '#999', display: 'inline-block' }} />
          Limited edition — 2026
        </motion.div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem 0' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontFamily: 'var(--font-body, monospace), monospace', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#AAA', marginBottom: '2px' }}>Programmer</div>
            <div style={{ fontFamily: 'var(--font-display, sans-serif), sans-serif', fontSize: '0.85rem', fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.01em' }}>Pablo García</div>
          </motion.div>

          <h1 aria-label="Creating digital solutions." style={{ fontFamily: 'var(--font-display, sans-serif), sans-serif', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.05em', fontSize: 'clamp(3rem, 5.5vw, 5rem)', margin: 0, color: '#1A1A1A' }}>
            {[ ['Creating'], ['digital'], ['solutions'] ].map((line, li) => (
              <span key={li} aria-hidden="true" style={{ display: 'block', overflow: 'hidden' }}>
                {line.map((word, wi) => (
                  <motion.span key={wi} data-word initial={{ y: 60, opacity: 0 }} style={{ display: 'inline-block', ...(li === 2 ? { background: '#1A1A1A', color: 'var(--accent)', paddingLeft: '0.08em', paddingRight: '0.08em' } : {}) }}>
                    {word}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
        </div>

        <div>
          <motion.div data-sub initial={{ opacity: 0, y: 15 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem 1.5rem', marginBottom: '1.5rem' }}>
            {[
              { label: 'Year', value: '2026' },
              { label: 'Location', value: 'Canarias, España'},
            ].map(m => (
              <div key={m.label}>
                <div style={{ fontFamily: 'var(--font-body, monospace), monospace', fontSize: '0.52rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#AAA', marginBottom: '2px' }}>{m.label}</div>
                <div style={{ fontFamily: 'var(--font-display, sans-serif), sans-serif', fontSize: '0.78rem', fontWeight: 700, color: '#1A1A1A' }}>{m.value}</div>
              </div>
            ))}
          </motion.div>

          <motion.div data-actions initial={{ opacity: 0, y: 10 }} style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid #D4CEBC' }}>
            <a href="#work" onClick={e => handleNav(e, '#work')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--ink)', color: 'var(--paper)', padding: '0.75rem 1.5rem', fontFamily: 'var(--font-body, monospace), monospace', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--mid)'} onMouseLeave={e => e.currentTarget.style.background = 'var(--ink)'}>
              See projects →
            </a>
            <a href="#contact" onClick={e => handleNav(e, '#contact')} style={{ fontFamily: 'var(--font-body, monospace), monospace', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', textDecoration: 'underline', textUnderlineOffset: '3px', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#1A1A1A'} onMouseLeave={e => e.currentTarget.style.color = '#888'}>
              Let's talk
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Columna derecha reformada ── */}
      <div className="hero-record-stage" style={{
        background: 'var(--ink)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '2rem',
        minHeight: '50vh',
      }}>
        {/* Composición central del disco y sus fundas */}
        <AlbumComposition />

        {/* Tracklist abajo a la derecha */}
        <motion.div className="hero-tracklist" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }} style={{ position: 'absolute', bottom: '4rem', right: '2rem' }}>
          <Tracklist />
        </motion.div>

      </div>

      {/* Marquee inferior */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 32, background: 'var(--accent)', display: 'flex', alignItems: 'center', overflow: 'hidden', zIndex: 10, gridColumn: '1 / -1' }}>
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 20, ease: "linear", repeat: Infinity }} style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap', width: 'max-content', fontFamily: 'var(--font-body, monospace), monospace', fontSize: '0.55rem', fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A1A1A' }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '3rem' }}>
              {item}
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#1A1A1A', opacity: 0.4, display: 'inline-block' }} />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}