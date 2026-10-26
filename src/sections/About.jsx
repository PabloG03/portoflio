import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const facts = [
  { n: '1', label: 'Year of experience' },
  { n: '2', label: 'Projects launched' },
  { n: '+8', label: 'Core technologies' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      className="about-section"
      ref={ref}
      style={{
        minHeight: '100vh',
        background: 'var(--ink)',
        color: 'var(--paper)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 4rem',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr', // Asimetría elegante
        gap: '6rem',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        alignItems: 'center',
      }}>
        
        {/* ── Bloque Izquierdo: Texto Editorial ────────────────────────────────── */}
        <div>
          <motion.p
            initial={{ opacity: 0, x: -15 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span style={{ width: 12, height: 1, background: 'var(--muted)' }} />
            It's me
          </motion.p>
          
          {/* Revelado por máscara para el título */}
          <div style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
            <motion.h2
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 6vw, 6rem)',
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                margin: 0,
              }}
            >
              About<br />
              <span style={{ color: 'var(--accent)' }}>me.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: '1.05rem',
              color: 'rgba(245,242,237,0.6)',
              lineHeight: 1.8,
              fontWeight: 300,
              maxWidth: '460px',
              textAlign: 'justify',     
              textJustify: 'inter-word',
            }}
          >
            I'm a junior developer based in the Canary Islands, Spain. I've worked with a variety of technologies, from front-end frameworks to back-end solutions including training AI models. 
            
            My passion is creating interactive and visually appealing web experiences 
          </motion.p>
        </div>

        {/* ── Bloque Derecho: Métricas Interactivas ─────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {facts.map(({ n, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              whileHover={{ 
                x: 12, 
                borderBottomColor: 'var(--accent)',
              }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 30,
                delay: isInView ? (0.1 + i * 0.08) : 0 // Retraso escalonado solo al entrar
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1.5rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
              }}
            >
              {/* Índice discreto tipo revista */}
              <span style={{
                fontFamily: 'monospace',
                fontSize: '0.65rem',
                color: 'rgba(255,255,255,0.2)',
                marginRight: '2rem',
                width: '20px'
              }}>
                0{i + 1}
              </span>

              {/* Contenedor interno para mantener número y label juntos */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', flex: 1 }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3.5rem',
                  fontWeight: 800,
                  color: 'var(--paper)',
                  lineHeight: 1,
                  transition: 'color 0.3s ease',
                }}>
                  {n}
                </span>
                
                <span style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  fontWeight: 500,
                  transition: 'color 0.3s ease',
                }}>
                  {label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}