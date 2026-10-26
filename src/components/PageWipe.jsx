import { useEffect } from 'react'
import { motion, useAnimate } from 'framer-motion'

// Call wipe() imperatively from anywhere via the exported ref
let _trigger = null
export function triggerWipe(cb) {
  if (_trigger) _trigger(cb)
}

export default function PageWipe() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    _trigger = async (cb) => {
      // Sweep in
      await animate([
        ['#wl1', { y: ['101%', '0%'] }, { duration: 0.45, ease: [0.76, 0, 0.24, 1] }],
        ['#wl2', { y: ['101%', '0%'] }, { duration: 0.45, ease: [0.76, 0, 0.24, 1], at: 0.04 }],
      ])
      if (cb) cb()
      // Sweep out
      await animate([
        ['#wl1', { y: ['0%', '-101%'] }, { duration: 0.45, ease: [0.76, 0, 0.24, 1], delay: 0.06 }],
        ['#wl2', { y: ['0%', '-101%'] }, { duration: 0.45, ease: [0.76, 0, 0.24, 1], at: 0.04 }],
      ])
    }

    // Run once on mount
    _trigger()
  }, [])

  return (
    <div
      ref={scope}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 8000,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <motion.div
        id="wl2"
        initial={{ y: '101%' }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--surface)',
        }}
      />
      <motion.div
        id="wl1"
        initial={{ y: '101%' }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--ink)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{
          position: 'relative',
          width: 'min(42vw, 260px)',
          aspectRatio: '1',
          display: 'grid',
          placeItems: 'center',
        }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.8, ease: 'linear', repeat: Infinity }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: `
                repeating-radial-gradient(circle at center,
                  #292b3d 0 2px,
                  #10111b 3px 5px
                )
              `,
              boxShadow: '0 20px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.12)',
            }}
          >
            <div style={{
              position: 'absolute',
              inset: '34%',
              borderRadius: '50%',
              background: 'var(--accent)',
              border: '5px solid var(--ink)',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--ink)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.55rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
            }}>
              PGP
              <span style={{
                position: 'absolute',
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'var(--ink)',
              }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ rotate: -28 }}
            animate={{ rotate: 8 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              width: '46%',
              height: 5,
              top: '8%',
              right: '-8%',
              background: 'var(--paper)',
              borderRadius: 8,
              transformOrigin: 'right center',
              boxShadow: '0 0 14px rgba(248,245,240,0.25)',
            }}
          >
            <span style={{
              position: 'absolute',
              left: -3,
              top: -3,
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: 'var(--magenta)',
            }} />
          </motion.div>

          <span style={{
            position: 'absolute',
            bottom: '-2.5rem',
            color: 'var(--paper)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.58rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}>
            Loading side A
          </span>
        </div>
      </motion.div>
    </div>
  )
}
