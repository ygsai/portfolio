import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import HeroSection from './components/HeroSection'
import LoadingScreen from './components/LoadingScreen'
import IntroSection from './components/IntroSection' 
import AboutSection from './components/AboutSection' 
import ExperienceSection from './components/ExperienceSection'
import ContactSection from './components/ContactSection' // IMPORT ADDED

export default function App() {
  const portfolioRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: portfolioRef,
    offset: ['start 75%', 'start 25%'] 
  })

  const { scrollYProgress: expProgress } = useScroll({
    target: experienceRef,
    offset: ['start 60%', 'start 20%'] 
  })

  // COLOR INTERPOLATION 1 (Dark -> Light)
  const mainBg = useTransform(scrollYProgress, [0, 1], ['#492E1F', '#E8CFAC']) 
  const mainText = useTransform(scrollYProgress, [0, 1], ['#E8CFAC', '#492E1F']) 
  const navBg = useTransform(scrollYProgress, [0, 1], ['rgba(73, 46, 31, 0.8)', 'rgba(232, 207, 172, 0.8)']) 
  const subText = useTransform(scrollYProgress, [0, 1], ['#CBAE86', '#56412D']) 
  
  // COLOR INTERPOLATION 2 (Light -> Dark) overrides the main background
  const expBg = useTransform(expProgress, [0, 1], ['#E8CFAC', '#492E1F'])
  const expText = useTransform(expProgress, [0, 1], ['#492E1F', '#E8CFAC'])
  
  return (
    <>
      <LoadingScreen />

      <motion.div 
        className="w-full min-h-screen"
        style={{ backgroundColor: mainBg, color: mainText }}
      >
      <HeroSection />

      <div ref={portfolioRef} className="relative z-10 shadow-2xl ">
        
        {/* MODULAR NAVIGATION BAR */}
        <motion.nav 
          className="sticky top-0 z-50 backdrop-blur-md border-b border-faded-copper/30 px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 transition-colors duration-500"
          style={{ backgroundColor: navBg }}
        >
          <span className="text-xl md:text-2xl font-abril tracking-wider text-dusty-mauve">PORTFOLIO</span>
          <motion.div className="flex items-center gap-4 md:gap-8 text-base md:text-xl font-antic" style={{ color: subText }}>
            <a href="#about" className="hover:opacity-70 transition-opacity">About</a>
            <a href="#experience" className="hover:opacity-70 transition-opacity">Experience</a>
            <a href="#projects" className="hover:opacity-70 transition-opacity">Projects</a>
            <a href="#contact" className="hover:opacity-70 transition-opacity">Contact</a>
            
            {/* ADDED: Nav CV Button */}
            <a 
              href="/Nada_Hanafi_Ahmed_CV.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 md:ml-4 px-4 py-1.5 border border-current rounded-full text-sm tracking-widest uppercase hover:bg-dusty-mauve hover:text-white hover:border-dusty-mauve transition-all duration-300"
            >
              Resume
            </a>
          </motion.div>
        </motion.nav>

        {/* INTRO & ABOUT SECTIONS (Light Theme Context) */}
        <IntroSection subText={subText} />
        <AboutSection subText={subText} />
        
        {/* NEW WRAPPER: Handles the second transition back to Dark */}
        <motion.div 
          ref={experienceRef}
          style={{ backgroundColor: expBg, color: expText }}
          className="w-full transition-colors duration-300"
        >
          {/* EXPERIENCE TIMELINE */}
          <ExperienceSection />
          
          {/* Projects Component will be injected here later */}

          {/* CONTACT FOOTER */}
          <ContactSection />

        </motion.div>
      </div>
    </motion.div>
    </>
  )
}