import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const isHovering = useRef(false)

  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 })

  const scaleSpring = useSpring(1, { stiffness: 300, damping: 25 })

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const enter = () => { isHovering.current = true; scaleSpring.set(4.5) }
    const leave = () => { isHovering.current = false; scaleSpring.set(1) }

    document.addEventListener('mousemove', move)

    const targets = document.querySelectorAll('a, button, [data-cursor]')
    targets.forEach(el => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', move)
      observer.disconnect()
    }
  }, [])

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: 'var(--cursor)',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'normal',
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        scale: scaleSpring,
      }}
    />
  )
}
