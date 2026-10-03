import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue, Variants } from 'framer-motion'

interface AboutSectionProps {
  subText: MotionValue<string> 
}

export default function AboutSection({ subText }: AboutSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'] 
  })

  const leftY = useTransform(scrollYProgress, [0, 1], [20, -20])
  const rightY = useTransform(scrollYProgress, [0, 1], [40, -20])

  const maskVariants: Variants = {
    hidden: { 
      y: "110%",
      transition: { duration: 0.5, ease: "easeIn" } 
    },
    visible: (i: number) => ({
      y: 0,
      transition: { duration: 0.8, delay: i * 0.15, ease: "easeOut" as const }
    })
  }

  const paragraphVariants: Variants = {
    hidden: { opacity: 0, transition: { duration: 0.5, ease: "easeOut" } },
    visible: { opacity: 1, transition: { duration: 1, delay: 0.4 } }
  }

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="relative w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-12 flex items-center min-h-[60vh]"
    >
      <div className="animate-botanical absolute z-[-1] pointer-events-none origin-bottom text-dusty-mauve opacity-25 top-[25%] md:top-[20%] left-0 md:left-[10%] w-87.5 h-87.5 md:w-112.5 md:h-112.5">
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M100,190 Q80,130 100,70 T100,10" />
          <path d="M96,150 Q50,165 30,130 Q20,100 60,110 Q85,115 97,140" />
          <path d="M85,130 Q40,140 30,110 Q25,90 55,95 Q75,100 87,120" />
          <path d="M103,110 Q150,120 170,80 Q180,50 140,60 Q115,65 102,100" />
          <path d="M115,95 Q150,100 160,70 Q165,50 135,55 Q115,60 105,85" />
          <path d="M98,70 Q60,70 50,40 Q45,20 75,30 Q90,35 99,60" />
          <path d="M100,30 C75,30 65,10 80,5 C90,0 95,15 100,20 C105,15 110,0 120,5 C135,10 125,30 100,30 Z" />
          <circle cx="90" cy="20" r="0.5" />
          <circle cx="110" cy="20" r="0.5" />
          <circle cx="100" cy="5" r="0.5" />
          <path d="M100,190 L100,195" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative w-full flex flex-col md:flex-row items-center md:items-start justify-between z-10">
        <motion.div style={{ y: leftY, willChange: "transform" }} className="w-full md:w-3/5 flex flex-col gap-1 md:gap-2 pt-4 md:pt-8 z-10">
          <div className="overflow-hidden pb-2 md:pb-4"><motion.h2 custom={0} variants={maskVariants} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-10%" }} className="text-5xl md:text-7xl lg:text-8xl font-abril tracking-wide text-dusty-mauve drop-shadow-sm">I engineer the</motion.h2></div>
          <div className="overflow-hidden pb-2 md:pb-4"><motion.h2 custom={1} variants={maskVariants} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-10%" }} className="text-5xl md:text-7xl lg:text-8xl font-abril tracking-wide drop-shadow-sm">architecture.</motion.h2></div>
          <div className="overflow-hidden pb-2 md:pb-4 mt-6 md:mt-10"><motion.h2 custom={2} variants={maskVariants} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-10%" }} className="text-5xl md:text-7xl lg:text-8xl font-abril tracking-wide text-dusty-mauve drop-shadow-sm">I illustrate the</motion.h2></div>
          <div className="overflow-hidden pb-2 md:pb-4"><motion.h2 custom={3} variants={maskVariants} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-10%" }} className="text-5xl md:text-7xl lg:text-8xl font-abril tracking-wide drop-shadow-sm">experience.</motion.h2></div>
        </motion.div>

        <motion.div style={{ y: rightY, color: subText, willChange: "transform" }} className="w-full md:w-2/5 md:-ml-10 mt-12 md:mt-0 p-8 md:p-10 border border-faded-copper/20 rounded-2xl bg-dark-coffee/10 shadow-2xl z-20 relative flex flex-col items-start">
          <div className="absolute inset-0 bg-dark-coffee/5 blur-xl rounded-2xl z-[-1]" />
          
          <motion.p 
            variants={paragraphVariants}
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: false, amount: 0.3 }} 
            className="text-xl md:text-2xl font-antic leading-relaxed"
          >
            My medium shifts between rigid logic and fluid design. Whether I am architecting secure full-stack environments, exploring the mathematics of quantum protocols, or scaling symmetry in digital illustrations, my process is rooted in precision.
            <br /><br />
            As an educator and developer based in Alexandria, Egypt. I believe the most memorable digital spaces require both the analytical mind of an engineer and the intentional eye of an artist.
          </motion.p>
          
          {/* ADDED: Editorial CV Link under the text */}
         <motion.a
            href="/Nada_Hanafi_Ahmed_CV.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            variants={paragraphVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }} 
            className="mt-10 group flex items-center gap-4 border-b border-dusty-mauve pb-2 text-xl font-antic tracking-widest uppercase hover:text-dusty-mauve hover:border-dark-coffee transition-colors duration-300"
          >
            View Curriculum Vitae 
            {/* Changed arrow to diagonal up-right to indicate opening a new tab */}
            <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110 transition-transform duration-300">&#8599;</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}