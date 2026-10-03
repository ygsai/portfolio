import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 30, transition: { duration: 0.5, ease: "easeOut" } },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.21, 0.47, 0.32, 0.98] } }
}

export default function ContactSection() {
  return (
    <section id="contact" className="relative w-full max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-40">
      
      {/* Editorial Top Border */}
      <div className="w-full h-px bg-faded-copper/20 mb-20 md:mb-32" />

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-8"
      >
        {/* Massive Typography */}
        <motion.div variants={revealVariants} className="w-full md:w-2/3">
          <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-abril leading-[1.1] text-tan mb-6">
            Let's architect <br />
            <span className="text-faded-copper italic pr-4">something together.</span>
          </h2>
          <a 
            href="mailto:nada-h-ahmed@outlook.com"
            className="inline-block mt-4 md:mt-8 text-2xl md:text-4xl font-antic text-tan/80 hover:text-dusty-mauve transition-colors duration-300"
          >
            nada-h-ahmed@outlook.com &#8599;
          </a>
        </motion.div>

        {/* Minimalist Details Grid */}
        <motion.div variants={revealVariants} className="w-full md:w-1/3 flex flex-col gap-12 pt-4">
          
          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-antic tracking-[0.2em] uppercase text-faded-copper">Digital Footprint</h4>
            <div className="flex flex-col gap-2 text-lg font-antic text-tan/80">
              <a href="https://github.com/ygsai" target="_blank" rel="noreferrer" className="hover:text-dusty-mauve transition-colors flex items-center gap-2 group">
                GitHub <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">&#8594;</span>
              </a>
              <a href="https://www.linkedin.com/in/nada-h-ahmed-0242a12b2" target="_blank" rel="noreferrer" className="hover:text-dusty-mauve transition-colors flex items-center gap-2 group">
                LinkedIn <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">&#8594;</span>
              </a>
            </div>
          </div>

          {/* Alternative Contacts */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-antic tracking-[0.2em] uppercase text-faded-copper">Direct Lines</h4>
            <div className="flex flex-col gap-2 text-lg font-antic text-tan/80">
              <a href="tel:+201129313098" className="hover:text-dusty-mauve transition-colors">
                +20 112 931 3098
              </a>
              <a href="mailto:yugoslavia2212@gmail.com" className="hover:text-dusty-mauve transition-colors">
                yugoslavia2212@gmail.com
              </a>
            </div>
          </div>

        </motion.div>
      </motion.div>
      
      {/* Copyright Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        className="w-full mt-32 pt-8 border-t border-faded-copper/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-antic text-faded-copper/60 tracking-widest uppercase"
      >
        <p>&copy; {new Date().getFullYear()} Nada H. Ahmed.</p>
        <p>Engineered with precision.</p>
      </motion.div>
    </section>
  )
}