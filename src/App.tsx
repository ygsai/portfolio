import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import HeroSection from './components/HeroSection'
import LoadingScreen from './components/LoadingScreen'
import IntroSection from './components/IntroSection' 
import AboutSection from './components/AboutSection' 
import ExperienceSection from './components/ExperienceSection'

export default function App() {
  const portfolioRef = useRef<HTMLDivElement>(null)
  
  // NEW: Ref specifically for the timeline and projects
  const experienceRef = useRef<HTMLDivElement>(null)

  // 1. Initial Scroll Tracker (Hero to Intro) -> Dark to Light
  const { scrollYProgress } = useScroll({
    target: portfolioRef,
    offset: ['start 75%', 'start 25%'] 
  })

  // 2. Second Scroll Tracker (About to Experience) -> Light to Dark
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

      {/* Main wrapper handles the first transition to Light */}
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
          <motion.div className="flex gap-4 md:gap-8 text-base md:text-xl font-antic" style={{ color: subText }}>
            <a href="#about" className="hover:opacity-70 transition-opacity">About</a>
            <a href="#experience" className="hover:opacity-70 transition-opacity">Experience</a>
            <a href="#projects" className="hover:opacity-70 transition-opacity">Projects</a>
            <a href="#contact" className="hover:opacity-70 transition-opacity">Contact</a>
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
          
          {/* PROJECTS SECTION 
          <section id="projects" className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-32 border-t border-faded-copper/30">
            <h2 className="text-3xl md:text-4xl font-abril mb-8 md:mb-12 text-center md:text-left">Selected Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              
              <motion.div 
                className="p-8 md:p-10 rounded-3xl border hover:-translate-y-2 transition-transform duration-500 ease-out bg-white/5 border-white/10"
              >
                <h3 className="text-2xl md:text-3xl font-abril mb-4 text-tan">Multimodal Meeting Assistant</h3>
                <p className="text-lg md:text-xl font-antic leading-relaxed text-tan/70">
                  A comprehensive application featuring automated speech recognition and real-time sign language translation.
                </p>
              </motion.div>

              <motion.div 
                className="p-8 md:p-10 rounded-3xl border hover:-translate-y-2 transition-transform duration-500 ease-out bg-white/5 border-white/10"
              >
                <h3 className="text-2xl md:text-3xl font-abril mb-4 text-tan">Personal Finance Dashboard</h3>
                <p className="text-lg md:text-xl font-antic leading-relaxed text-tan/70">
                  Full-stack environment featuring real-time chat functionality secured with client-side cryptographic encryption keys.
                </p>
              </motion.div>

            </div>
          </section>*/}
        </motion.div>
      </div>
    </motion.div>
    </>
  )
}