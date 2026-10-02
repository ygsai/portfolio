import { Canvas } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import type { MutableRefObject } from 'react'
import { useInView } from 'framer-motion'
import PortfolioScene from './PortfolioScene'

interface HeroCanvasProps {
  scrollProgress: MutableRefObject<number>
}

export default function HeroCanvas({ scrollProgress }: HeroCanvasProps) {
  // 1. Create a ref to track this container
  const containerRef = useRef<HTMLDivElement>(null)
  
  // 2. Detect if the container is visible on the screen. 
  // margin: "0px" means it triggers the moment it enters/leaves the viewport.
  const isInView = useInView(containerRef, { margin: "0px" })

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas 
        // 3. THE MAGIC SWITCH:
        // 'always' = 60fps running normally. 
        // 'demand' = rendering completely STOPS. GPU usage drops to 0%.
        frameloop={isInView ? 'always' : 'demand'} 
        camera={{ position: [0, 0, 6], fov: 50 }} 
        dpr={[1, 1.2]} // Capped pixel ratio to prevent retina display lag
        performance={{ min: 0.5 }} // Allows React to throttle if needed
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 15, 10]} intensity={2} />
        
        <Suspense fallback={null}>
          <PortfolioScene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  )
}