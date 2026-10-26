import { motion, useInView, useAnimationFrame } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

// ─── Datos ────────────────────────────────────────────────────────────────────

const categories = [
  {
    id: 'frontend',
    side: 'A',
    label: 'Frontend & UI',
    rpm: '33⅓ RPM',
    color: '#A78BFA',
    skills: [
      { name: 'React / Next.js', level: 'Intermediate' },
      { name: 'TypeScript', level: 'Intermediate' },
      { name: 'CSS / Animation', level: 'Intermediate' },
    ],
  },
  {
    id: 'backend',
    side: 'B',
    label: 'Programming Languages',
    rpm: '45 RPM',
    color: '#22D3EE',
    skills: [
      { name: 'Node.js', level: 'Intermediate' },
      { name: 'Python', level: 'Intermediate' },
      { name: 'Java', level: 'Intermediate' },
      { name: 'C++', level: 'Intermediate' },
      { name: 'Kotlin', level: 'Basic' },
    ],
  },
  {
    id: 'tooling',
    side: 'C',
    label: 'Design & Tools',
    rpm: '78 RPM',
    color: '#FB7185',
    skills: [
      { name: 'Figma', level: 'Advanced' },
      { name: 'Git / GitHub', level: 'Intermediate' },
    ],
  },

  {
    id: 'database',
    side: 'D',
    label: 'Databases',
    rpm: '88 RPM',
    color: '#FBBF24',
    skills: [
      { name: 'MySQL*Plus', level: 'Basic' },
      { name: 'PostgreSQL', level: 'Basic' },
    ],
  }
]

const GROOVE_RADII = [14, 22, 30, 38, 44]

// ─── Noise canvas ─────────────────────────────────────────────────────────────

function NoiseCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const { width: w, height: h } = canvas
      if (w === 0 || h === 0) return
      const img = ctx.createImageData(w, h)
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v
        img.data[i + 3] = 5
      }
      ctx.putImageData(img, 0, 0)
    }

    const id = setInterval(draw, 100)
    return () => { clearInterval(id); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 1,
      }}
    />
  )
}

// ─── Partículas flotantes ─────────────────────────────────────────────────────

function Particles() {
  const items = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${5 + Math.random() * 5}s`,
  }))

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {items.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            bottom: `-10px`,
            left: p.left,
            width: 2, height: 2,
            borderRadius: '50%',
            background: 'var(--accent)',
            opacity: 0,
            animation: `floatUp ${p.duration} ${p.delay} linear infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatUp {
          0%   { opacity: 0; transform: translateY(0) scale(0.5); }
          20%  { opacity: 0.4; }
          80%  { opacity: 0.2; }
          100% { opacity: 0; transform: translateY(-120px) scale(1.2); }
        }
      `}</style>
    </div>
  )
}

// ─── Glitch title ─────────────────────────────────────────────────────────────

function GlitchTitle({ children, isInView }) {
  return (
    <>
      <style>{`
        .glitch-wrap { position: relative; display: inline-block; }
        .glitch-wrap::after {
          content: attr(data-text);
          position: absolute;
          left: 2px; top: 0;
          color: rgba(200,255,0,0.3);
          clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
          animation: glitch 4s infinite;
          pointer-events: none;
        }
        @keyframes glitch {
          0%, 85%, 100% { transform: translateX(0); opacity: 0; filter: blur(0); }
          88% { transform: translateX(-4px); opacity: 0.8; filter: blur(0.5px); }
          90% { transform: translateX(3px); opacity: 0.5; }
          92% { transform: translateX(-1px); opacity: 0.2; }
          94% { transform: translateX(0); opacity: 0; }
        }
      `}</style>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glitch-wrap"
        data-text="Tools & Skills"
        style={{
          fontFamily: 'var(--font-display, sans-serif)',
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: 900,
          lineHeight: 0.95,
          letterSpacing: '-0.05em',
          marginBottom: '1rem',
          color: '#F0F0F0',
        }}
      >
        {children}
      </motion.h2>
    </>
  )
}

// ─── Vinyl disc ───────────────────────────────────────────────────────────────

function VinylDisc({ side, color, isHovered, activeTrack, blockIndex, isInView }) {
  const rotateRef = useRef(0)
  const speedRef = useRef(0)
  const divRef = useRef(null)

  // Control de interpolación para aceleración y frenado orgánico
  useAnimationFrame((_, delta) => {
    if (!divRef.current) return
    
    const targetSpeed = isHovered ? 160 : 0
    speedRef.current += (targetSpeed - speedRef.current) * 0.06
    
    if (speedRef.current > 0.2) {
      rotateRef.current += (delta / 1000) * speedRef.current
      divRef.current.style.transform = `rotate(${rotateRef.current % 360}deg)`
    }
  })

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ duration: 0.8, delay: blockIndex * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: 100, height: 100, flexShrink: 0, position: 'relative' }}
    >
      {/* Contenedor Giratorio Integral */}
      <div
        ref={divRef}
        style={{
          width: 100, height: 100,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #141414 0%, #080808 100%)',
          border: `1px solid rgba(255,255,255,0.05)`,
          position: 'absolute', inset: 0,
          boxShadow: isHovered ? '0 10px 25px rgba(0,0,0,0.5)' : 'none',
          transition: 'box-shadow 0.3s',
        }}
      >
        {/* Surcos de sonido */}
        {GROOVE_RADII.map((r, idx) => {
          const isTargetGroove = activeTrack !== null && idx === activeTrack
          return (
            <div
              key={r}
              style={{
                position: 'absolute',
                top: `calc(50% - ${r}px)`,
                left: `calc(50% - ${r}px)`,
                width: r * 2, height: r * 2,
                borderRadius: '50%',
                border: `0.5px solid ${isTargetGroove ? color : `rgba(255,255,255, ${0.02 + (r / 50) * 0.04})`}`,
                boxShadow: isTargetGroove ? `0 0 8px ${color}55` : 'none',
                opacity: isTargetGroove ? 1 : 0.7,
                transform: isTargetGroove ? 'scale(1.02)' : 'scale(1)',
                transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.25s',
              }}
            />
          )
        })}

        {/* Centro del vinilo (Galleta con letras A, B, C) */}
        <div
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 34, height: 34,
            borderRadius: '50%',
            background: color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: isHovered ? `0 0 20px ${color}aa` : 'none',
            transition: 'box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-body, monospace)',
            fontSize: '0.85rem',
            fontWeight: 900,
            color: '#0A0A0A',
          }}>
            {side}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Track row ────────────────────────────────────────────────────────────────

function TrackRow({ skill, index, trackNum, isInView, catIndex, color, onActiveChange }) {
  const [hovered, setHovered] = useState(false)
  const isAvanzado = skill.level === 'Advanced'

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: catIndex * 0.1 + index * 0.05 + 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => {
        setHovered(true)
        onActiveChange(index)
      }}
      onMouseLeave={() => {
        setHovered(false)
        onActiveChange(null)
      }}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        padding: '0.65rem 0',
        paddingLeft: hovered ? '10px' : '0',
        borderBottom: '1px solid rgba(255,255,255,0.03)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'padding-left 0.25s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div className="skills-grid" style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(90deg, ${color}0d 0%, transparent 100%)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.2s ease',
        zIndex: 0
      }} />

      <div style={{
        position: 'absolute',
        left: 0, top: 0, bottom: 0,
        width: hovered ? 3 : 0,
        background: color,
        transition: 'width 0.2s ease',
      }} />

      <div style={{ minWidth: '1.4rem', zIndex: 1, display: 'flex', alignItems: 'center' }}>
        {hovered ? (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, height: 9, marginBottom: 2 }}>
            <div style={{ width: 2, height: '100%', background: color, animation: 'waveGlow 0.4s ease infinite alternate' }} />
            <div style={{ width: 2, height: '60%', background: color, animation: 'waveGlow 0.3s ease infinite alternate 0.1s' }} />
            <div style={{ width: 2, height: '80%', background: color, animation: 'waveGlow 0.5s ease infinite alternate 0.05s' }} />
          </div>
        ) : (
          <span style={{
            fontFamily: 'var(--font-body, monospace)',
            fontSize: '0.62rem', fontWeight: 700,
            color: '#444',
            letterSpacing: '0.08em',
          }}>
            {String(trackNum).padStart(2, '0')}
          </span>
        )}
      </div>

      <span style={{
        fontSize: '0.85rem',
        fontWeight: hovered ? 700 : 500,
        color: hovered ? '#FFFFFF' : '#999',
        letterSpacing: '-0.01em', flex: 1,
        fontFamily: 'var(--font-display, sans-serif)',
        transition: 'color 0.2s, font-weight 0.2s',
        zIndex: 1
      }}>
        {skill.name}
      </span>

      <span style={{
        fontFamily: 'var(--font-body, monospace)',
        fontSize: '0.55rem', fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '2px 6px',
        borderRadius: 2,
        background: hovered
          ? (isAvanzado ? color : '#222')
          : (isAvanzado ? `${color}15` : 'rgba(255,255,255,0.04)'),
        color: hovered
          ? (isAvanzado ? '#0A0A0A' : '#CCC')
          : (isAvanzado ? color : '#555'),
        border: hovered ? '1px solid transparent' : `1px solid rgba(255,255,255,0.02)`,
        transition: 'all 0.25s',
        zIndex: 1
      }}>
        {skill.level}
      </span>
    </motion.div>
  )
}

// ─── Record card ──────────────────────────────────────────────────────────────

function Record({ category, blockIndex, isInView }) {
  const [cardHovered, setCardHovered] = useState(false)
  const [activeTrack, setActiveTrack] = useState(null)
  const { color } = category

  const isHovered = cardHovered || activeTrack !== null

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.6, delay: blockIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      style={{
        background: '#222338',
        border: `1px solid ${isHovered ? `${color}44` : '#1a1a1a'}`,
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isHovered ? `0 20px 40px ${color}0a, 0 1px 0px ${color}33 inset` : '0 10px 30px rgba(0,0,0,0.5)',
        transition: 'border-color 0.3s, box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 0, height: 0,
        borderStyle: 'solid',
        borderWidth: '0 30px 30px 0',
        borderColor: `transparent ${isHovered ? `${color}66` : '#222'} transparent transparent`,
        transition: 'border-color 0.3s',
      }} />

      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle at 30% 10%, ${color}0c 0%, transparent 65%)`,
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem', position: 'relative', zIndex: 2 }}>
        <VinylDisc
          side={category.side}
          color={color}
          isHovered={isHovered}
          activeTrack={activeTrack}
          blockIndex={blockIndex}
          isInView={isInView}
        />

        <div style={{ flex: 1 }}>
          <div style={{
            display: 'inline-block',
            fontFamily: 'var(--font-body, monospace)',
            fontSize: '0.55rem', fontWeight: 800,
            letterSpacing: '0.12em',
            background: color, color: '#0A0A0A',
            padding: '2px 6px', marginBottom: '0.4rem',
            borderRadius: 1
          }}>
            {category.rpm}
          </div>

          <div style={{
            fontFamily: 'var(--font-display, sans-serif)',
            fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)',
            fontWeight: 800, letterSpacing: '-0.02em',
            color: '#FFFFFF', lineHeight: 1.1,
          }}>
            {category.label}
          </div>

          <div style={{
            fontFamily: 'var(--font-body, monospace)',
            fontSize: '0.58rem', color: '#555',
            letterSpacing: '0.08em', marginTop: '0.3rem',
          }}>
            SIDE {category.side} // {category.skills.length} TRACKS
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid rgba(255,255,255,0.06)`, paddingTop: '0.4rem', position: 'relative', zIndex: 2 }}>
        {category.skills.map((skill, i) => (
          <TrackRow
            key={skill.name}
            skill={skill}
            index={i}
            trackNum={i + 1}
            isInView={isInView}
            catIndex={blockIndex}
            color={color}
            onActiveChange={setActiveTrack}
          />
        ))}
      </div>
    </motion.div>
  )
}

// ─── Sección Principal ────────────────────────────────────────────────────────

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <>
      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes waveGlow { from { transform: scaleY(0.3); } to { transform: scaleY(1); } }
        #skills { background: #171827; }
      `}</style>

      <section
        id="skills"
        ref={ref}
        style={{
          background: '#171827',
          padding: '6rem 2rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <NoiseCanvas />

        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)',
          pointerEvents: 'none', zIndex: 2,
        }} />

        <Particles />

        <div style={{ maxWidth: 520, marginBottom: '5rem', position: 'relative', zIndex: 10, paddingLeft: '1rem' }}>
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-body, monospace)',
              fontSize: '0.65rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--accent)',
              marginBottom: '0.75rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}
          >
            <span style={{ animation: 'blink 1s step-end infinite', display: 'inline-block', width: 6, height: 6, background: 'var(--accent)' }} />
            Main Tools
          </motion.p>

          <GlitchTitle isInView={isInView}>
            Tools &amp;<br />
            <span style={{ color: 'var(--accent)' }}>Skills</span>
          </GlitchTitle>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ fontSize: '0.95rem', color: 'rgba(245,242,237,0.6)', lineHeight: 1.7, fontWeight: 400, marginTop: '1rem' }}
          >
            These are some of the technologies and tools I've been working with recently. I'm always eager to learn new skills and expand my toolkit, so this list is constantly evolving as I explore new areas in development and design. 
          </motion.p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          position: 'relative', zIndex: 10,
          maxWidth: '1200px', margin: '0 auto'
        }}>
          {categories.map((cat, i) => (
            <Record key={cat.id} category={cat} blockIndex={i} isInView={isInView} />
          ))}
        </div>
      </section>
    </>
  )
}