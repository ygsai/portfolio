import { motion } from 'framer-motion'
import type { MotionValue, Variants } from 'framer-motion'

interface IntroSectionProps {
  subText: MotionValue<string>
}

// 1. Define distinct entry and exit animations
const mainTextVariants: Variants = {
  hidden: { opacity: 0, y: 40, transition: { duration: 0.5, ease: "easeOut" } },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.33, 1, 0.68, 1] } }
}

const dividerVariants: Variants = {
  hidden: { height: 0, transition: { duration: 0.5, ease: "easeOut" } },
  visible: { height: "120px", transition: { duration: 1.2, delay: 0.2, ease: "easeInOut" } }
}

const nameVariants: Variants = {
  hidden: { opacity: 0, y: 20, transition: { duration: 0.4, ease: "easeOut" } },
  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.4 } }
}

const subtitleVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.4, ease: "easeOut" } },
  visible: { opacity: 1, transition: { duration: 1, delay: 0.6 } }
}

export default function IntroSection({ subText }: IntroSectionProps) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-8 overflow-hidden">
      {/* Poetic Ambient Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60">
        <div className="w-[60vw] h-[60vw] md:w-[35vw] md:h-[35vw] bg-dusty-mauve/40 rounded-full blur-[120px]" />
        <div className="absolute w-[50vw] h-[50vw] md:w-[25vw] md:h-[25vw] bg-faded-copper/20 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* We apply the once: false logic here. Since this wraps everything, 
            it acts as a master trigger for the children */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col items-center"
        >
          {/* Main Typographic Canvas */}
          <motion.h1 
            variants={mainTextVariants}
            className="text-6xl md:text-8xl lg:text-[9rem] font-abril tracking-wide leading-[1.1]"
          >
            Code Is My <br className="md:hidden" />
            <span className="text-dusty-mauve italic pr-4 md:pr-8">Canvas.</span>
          </motion.h1>

          {/* Minimalist Editorial Divider */}
          <motion.div 
            variants={dividerVariants}
            className="w-0.5 bg-faded-copper/40 my-8 md:my-12"
          />

          {/* Author Signature */}
          <motion.h2 
            variants={nameVariants}
            className="text-2xl md:text-4xl font-abril tracking-widest uppercase opacity-80"
          >
            Nada H. Ahmed
          </motion.h2>

          {/* Poetic Subtitle */}
          <motion.p 
            variants={subtitleVariants}
            className="mt-6 md:mt-8 text-xl md:text-3xl font-antic tracking-wide italic"
            style={{ color: subText }}
          >
            Where Technology Meets Art.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}