import { useRef } from 'react'
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion'
import HeroCanvas from './3d/HeroCanvas'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // OPTIMIZATION: Store scroll progress in a ref so it doesn't trigger React re-renders
  const scrollRef = useRef(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Silently update the ref value on scroll
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    scrollRef.current = latest
  })

  // Let Framer Motion natively calculate the opacity fade without React state
  const promptOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full">
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
        }}
      >
        {/* Pass the mutable ref instead of a state variable */}
        <HeroCanvas scrollProgress={scrollRef} />
        
        {/* Changed to motion.div to utilize useTransform */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none"
          style={{ opacity: promptOpacity }}
        >
          <p className="text-tan font-antic text-lg tracking-widest uppercase">Scroll to explore</p>
          <div className="w-5 h-9 border-2 border-faded-copper/60 rounded-full mx-auto mt-3 flex justify-center pt-2">
            <div className="w-1 h-2 bg-pale-oak rounded-full animate-bounce" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}