import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

const data = {
  work: [
    {
      role: '2Corders Studio',
      company: 'Front-end Developer',
      date: '2026 — 2026',
      desc: 'Mobile and Android TV front-end development using Kotlin and Jetpack Compose for a streaming platform. ',
      tags: ['Kotlin'],
    },
    {
      role: 'Cátedra BOB ULL',
      company: 'Python developer and data analysis',
      date: '2026 — 2026',
      desc: 'Data analysis and automation scripts development using Python, processing datasets and extracting insights within an academic and research framework.',
      tags: ['Pythob'],
    },
  ],
  edu: [
    {
      role: 'Programming and Software Engineering',
      company: 'Universidad de la Laguna (ULL)',
      date: '2021 — 2026',
      desc: 'University degree in Programming and Software Engineering.',
      tags: ['Java', 'C++', 'Algorithms', 'Data Structures', 'Databases', 'Python'],
    },
  ],
  certificates: [
    {
      role: 'Responsive Web Design (HTML, CSS)',
      company: 'freeCodeCamp',
      date: '2024',
      desc: 'Course on responsive web design, covering HTML and CSS techniques for creating adaptable layouts.',
      tags: ['HTML', 'CSS'],
    },
    {
      role: 'Inteligencia Artificial y Deep Learning desde cero en Python',
      company: 'Udemy',
      date: '2025',
      desc: 'Introduction to Artificial Intelligence and Deep Learning using Python, covering fundamental concepts and practical applications.  ',
      tags: ['Python', 'Deep Learning', 'AI'],
    },
    {
      role: 'Legacy JavaScript Algorithms and Data Structures V8',
      company: 'freeCodeCamp',
      date: '2025',
      desc: 'Course on algorithms and data structures using legacy JavaScript, covering fundamental programming concepts and problem-solving techniques.',
      tags: ['JavaScript', 'Algorithms', 'Data Structures'],
    },
    {
      role: 'Crash Course on Python',
      company: 'coursera',
      date: '2026',
      desc: 'Course on algorithms and data structures usin Python.',
      tags: ['Python', 'Algorithms', 'Data Structures'],
    },
    {
      role: 'Master en React: ReactJS, Hooks, MERN, NodeJS, JWT+',
      company: 'Udemy',
      date: '2026',
      desc: 'Comprehensive training in modern full-stack web development using the MERN stack (MongoDB, Express, React, Node.js), incorporating Hooks, JWT authentication, and REST APIs.',
      tags: ['React', 'Node.js', 'JavaScript', 'JWT'],
    },
    {
      role: 'Programación en Claude Code [I-MPULS-A]',
      company: ' Fundación General de la Universidad de La Laguna',
      date: '2026',
     desc: 'Practical training on AI-assisted software development using Claude Code, focusing on prompt engineering for coding, automated refactoring, and leveraging LLMs within modern programming workflows.',
  tags: ['Artificial Intelligence', 'Claude Code', 'LLMs', 'Prompt Engineering'],
    },
  ],
  languages: [
    { lang: 'English', level: 'B1' },
    { lang: 'Spanish', level: 'Native' },
  ],
}

const TABS = [
  { id: 'work',         label: 'Jobs' },
  { id: 'edu',          label: 'Education' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'languages',    label: 'Languages' },
]

// ─── Card normal ──────────────────────────────────────────────────────────────

function Card({ item, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: '1px solid',
        borderColor: hovered ? '#1A1A1A' : '#E8E4DC',
        padding: '2rem',
        position: 'relative',
        transition: 'border-color 0.25s',
      }}
    >
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: hovered ? 3 : 0,
        background: 'var(--accent)',
        transition: 'width 0.25s cubic-bezier(0.16,1,0.3,1)',
      }} />

      <div style={{
        fontFamily: 'var(--font-body, monospace)',
        fontSize: '0.55rem', letterSpacing: '0.16em',
        textTransform: 'uppercase', color: '#AAA',
        marginBottom: '0.75rem',
      }}>
        {item.date}
      </div>

      <div style={{
        fontFamily: 'var(--font-display, sans-serif)',
        fontSize: '1.15rem', fontWeight: 800,
        letterSpacing: '-0.025em', color: '#1A1A1A',
        lineHeight: 1.1, marginBottom: '0.3rem',
      }}>
        {item.role}
      </div>

      <div style={{
        fontFamily: 'var(--font-body, monospace)',
        fontSize: '0.7rem', color: '#888',
        marginBottom: '1rem',
      }}>
        {item.company}
      </div>

      <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, margin: 0 }}>
        {item.desc}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: '1.25rem' }}>
        {item.tags.map(t => (
          <span key={t} style={{
            fontFamily: 'var(--font-body, monospace)',
            fontSize: '0.5rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '3px 8px',
            background: hovered ? 'var(--surface)' : '#F3F1F7',
            color: '#888',
            transition: 'background 0.25s',
          }}>
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Language card ────────────────────────────────────────────────────────────

function LanguageCard({ item, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: '1px solid',
        borderColor: hovered ? '#1A1A1A' : '#E8E4DC',
        padding: '2rem',
        position: 'relative',
        transition: 'border-color 0.25s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: hovered ? 3 : 0,
        background: 'var(--accent)',
        transition: 'width 0.25s cubic-bezier(0.16,1,0.3,1)',
      }} />

      <div style={{
        fontFamily: 'var(--font-display, sans-serif)',
        fontSize: '1.25rem', fontWeight: 800,
        letterSpacing: '-0.025em', color: '#1A1A1A',
      }}>
        {item.lang}
      </div>

      <div style={{
        fontFamily: 'var(--font-body, monospace)',
        fontSize: '0.7rem', fontWeight: 700,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        padding: '4px 12px',
        background: hovered ? '#1A1A1A' : '#F5F5F3',
        color: hovered ? 'var(--accent)' : '#888',
        transition: 'all 0.25s',
      }}>
        {item.level}
      </div>
    </motion.div>
  )
}

// ─── Experience ───────────────────────────────────────────────────────────────

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState('work')

  const items = data[active]
  const isLanguages = active === 'languages'

  return (
    <section id="experience" className="experience-section" ref={ref} style={{ background: 'var(--surface)', padding: '7rem 3rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-body, monospace)',
              fontSize: '0.58rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', color: '#AAA',
              marginBottom: '1rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}
          >
            <span style={{ width: 16, height: 1, background: '#AAA', display: 'inline-block' }} />
            Career
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display, sans-serif)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900, lineHeight: 0.92,
              letterSpacing: '-0.05em', color: '#1A1A1A',
              margin: 0,
            }}
          >
            Experience<br />
            <span style={{ WebkitTextStroke: '1.5px #1A1A1A', color: 'transparent' }}>
              &amp; Growth
            </span>
          </motion.h2>
        </div>

        {/* Layout dos columnas */}
        <motion.div
          className="experience-layout"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '3rem', alignItems: 'start' }}
        >
          {/* Tabs verticales */}
          <div style={{ position: 'sticky', top: '6rem' }}>
            <div style={{
              fontFamily: 'var(--font-body, monospace)',
              fontSize: '0.5rem', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: '#BBB',
              marginBottom: '0.75rem',
            }}>
              Section
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  style={{
                    all: 'unset',
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.85rem 0',
                    borderBottom: '1px solid #E8E4DC',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: active === tab.id ? 'var(--accent)' : 'transparent',
                    border: `1.5px solid ${active === tab.id ? 'var(--accent)' : '#CCC'}`,
                    flexShrink: 0,
                    transition: 'all 0.2s',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-body, monospace)',
                    fontSize: '0.65rem', fontWeight: active === tab.id ? 700 : 400,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: active === tab.id ? '#1A1A1A' : '#AAA',
                    transition: 'all 0.2s',
                  }}>
                    {tab.label}
                  </span>
                  <span style={{
                    marginLeft: 'auto',
                    fontFamily: 'var(--font-body, monospace)',
                    fontSize: '0.48rem',
                    color: active === tab.id ? '#888' : '#CCC',
                    transition: 'color 0.2s',
                  }}>
                    {String(data[tab.id].length).padStart(2, '0')}
                  </span>
                </button>
              ))}
            </div>

            {/* Vinilo decorativo */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
              style={{
                width: 64, height: 64, borderRadius: '50%',
                background: '#1A1A1A', marginTop: '2.5rem', position: 'relative',
              }}
            >
              {[28, 22, 16].map(r => (
                <div key={r} style={{
                  position: 'absolute',
                  width: r * 2, height: r * 2,
                  top: '50%', left: '50%',
                  marginTop: -r, marginLeft: -r,
                  borderRadius: '50%',
                  border: '0.5px solid rgba(255,255,255,0.07)',
                }} />
              ))}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 12, height: 12, borderRadius: '50%',
                background: 'var(--accent)',
              }} />
            </motion.div>
          </div>

          {/* Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}
              >
                {isLanguages
                  ? items.map((item, i) => (
                      <LanguageCard key={item.lang} item={item} index={i} />
                    ))
                  : items.map((item, i) => (
                      <Card key={item.role} item={item} index={i} />
                    ))
                }
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}