import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const projects = [
  { n: '01', title: 'MAGI: Real Time LSE Recognition', sub: 'AI Model · 2026', tech: 'React / Python', href: 'https://github.com/PabloG03/MAGI-Real-Time-LSE-Recognition.git' },
]

function ProjectRow({ project, index, isInView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      className="project-row"
      href={project.href}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid', gridTemplateColumns: '3rem 1fr auto auto',
        alignItems: 'center', gap: '2rem', padding: '1.8rem 0',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        textDecoration: 'none', position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Fill wipe — the P5 hover slam */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', inset: 0, background: 'var(--ink)',
          transformOrigin: 'left', zIndex: 0,
        }}
      />

      <span style={{
        fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 800,
        color: hovered ? 'var(--paper)' : 'var(--muted)',
        position: 'relative', zIndex: 1, transition: 'color 0.3s',
      }}>
        {project.n}
      </span>

      <span style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
        fontWeight: 800, position: 'relative', zIndex: 1,
        letterSpacing: '-0.02em',
        color: hovered ? 'var(--paper)' : 'var(--ink)',
        transition: 'color 0.3s',
      }}>
        {project.title}
        <em style={{
          fontStyle: 'normal', fontSize: '0.75rem',
          fontFamily: 'var(--font-body)', fontWeight: 400,
          color: hovered ? 'rgba(245,242,237,0.5)' : 'var(--muted)',
          marginLeft: '0.75rem', letterSpacing: '0.05em', verticalAlign: 'middle',
          transition: 'color 0.3s',
        }}>
          {project.sub}
        </em>
      </span>

      <span style={{
        fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase',
        padding: '0.35rem 0.8rem',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}`,
        position: 'relative', zIndex: 1,
        color: hovered ? 'rgba(245,242,237,0.7)' : 'var(--muted)',
        transition: 'color 0.3s, border-color 0.3s',
      }}>
        {project.tech}
      </span>

      <motion.span
        animate={{ rotate: hovered ? -45 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          fontSize: '1.2rem', position: 'relative', zIndex: 1,
          color: hovered ? 'var(--paper)' : 'var(--muted)',
          transition: 'color 0.3s',
        }}
      >
        ↗
      </motion.span>
    </motion.a>
  )
}

export default function Work() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="work" className="work-section" ref={ref} style={{
      background: 'var(--surface)', padding: '6rem 3rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1rem' }}
          >
            Main projects
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.04em',
            }}
          >
            Selected<br />Work
          </motion.h2>
        </div>
        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
        >
          See all  →
        </motion.a>
      </div>

      <div>
        {projects.map((p, i) => (
          <ProjectRow key={p.n} project={p} index={i} isInView={isInView} />
        ))}
      </div>
    </section>
  )
}
