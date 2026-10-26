import { useEffect, useRef } from 'react'
import { useInView, useAnimate, stagger } from 'framer-motion'

// Simple hook: returns a ref — attach to any element to fade+slide in when visible
export function useReveal(options = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px', ...options })
  return { ref, isInView }
}

// Hook for staggered children
export function useStaggerReveal() {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { once: true, margin: '-60px' })

  useEffect(() => {
    if (isInView) {
      animate(
        '[data-reveal]',
        { opacity: 1, y: 0, skewY: 0 },
        { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: stagger(0.07) }
      )
    }
  }, [isInView])

  return scope
}
