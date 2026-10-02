import { useProgress } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const { active, progress } = useProgress()

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="global-loader"
          // The exit animation translates the div up and dynamically morphs the border into a massive curve
          exit={{ 
            y: "-100%",
            borderBottomLeftRadius: "50% 20%",
            borderBottomRightRadius: "50% 20%"
          }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-dark-coffee origin-top shadow-2xl"
          // Starts entirely flat
          style={{ 
            borderBottomLeftRadius: "0% 0%",
            borderBottomRightRadius: "0% 0%" 
          }}
        >
          <div className="relative flex flex-col items-center">
            <h1 className="text-7xl md:text-9xl font-abril text-pale-oak mb-4">
              {progress.toFixed(0)}%
            </h1>
            <p className="text-dusty-mauve font-antic text-xl md:text-2xl tracking-[0.4em] uppercase">
              Opening the Lens
            </p>
            
            {/* Minimalist Progress Line */}
            <div className="w-64 h-px bg-saddle-brown/30 mt-12 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-pale-oak"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}