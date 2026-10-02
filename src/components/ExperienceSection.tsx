import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const experiences = [
    {
    id: 0,
    role: "B.Sc. in Computer and Communication Engineering",
    company: "Alexandria University",
    date: "Oct 2021 - July 2026",
    description: "Fresh graduate coursework and research in the Computer and Communication Engineering Department, Faculty of Engineering. Cumulative GPA: 3.81.",
    tag: "Academic Background",
    tagColor: "text-tan border-tan/30 bg-tan/5"
  },
  {
    id: 1,
    role: "Co-Director, IT & Web Development",
    company: "Egypt Quantum Computing Community (EgQCC)",
    date: "Dec 2025 - Present",
    description: "Led the web unit and engineered the frontend UI/UX for the primary platform. Delivered a modern, responsive interface using Next.js, Tailwind CSS, and TypeScript to manage global quantum computing events.",
    tag: "Web Architecture",
    tagColor: "text-dusty-mauve border-dusty-mauve/30 bg-dusty-mauve/10"
  },
  {
    id: 2,
    role: "Teaching Assistant",
    company: "Alexandria University",
    date: "Feb 2026 - Present",
    description: "Facilitated undergraduate learning across multiple academic fields, including Computer Graphics and C++. Developed comprehensive course materials and evaluated technical assignments.",
    tag: "Education & Leadership",
    tagColor: "text-tan border-tan/30 bg-tan/5"
  },
  {
    id: 3,
    role: "Undergraduate Research Assistant",
    company: "Alexandria University",
    date: "Dec 2025 - Present",
    description: "Conducted machine learning research on Symbolic Medoid-Based PCA for interval-valued data, optimizing high-performance data science workflows.",
    tag: "Algorithmic Depth",
    tagColor: "text-faded-copper border-faded-copper/30 bg-faded-copper/10"
  },
  {
    id: 4,
    role: "Artificial Intelligence Trainee",
    company: "WE Telecom Egypt",
    date: "July 2023 - Aug 2023",
    description: "Trained, evaluated, and optimized Machine Learning and Deep Learning models utilizing frameworks including PyTorch, Scikit-learn, NumPy, and Pandas.",
    tag: "Machine Learning",
    tagColor: "text-dusty-mauve border-dusty-mauve/30 bg-dusty-mauve/10"
  }
]

const cardVariants: Variants = {
  hidden: (isEven: boolean) => ({
    opacity: 0,
    x: isEven ? -40 : 40, 
    // ADDED: Smooth reverse animation when scrolling away
    transition: { duration: 0.4, ease: "easeOut" }
  }),
  visible: {
    opacity: 1,
    x: 0,
    z: 0, 
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }
  }
}

const dateVariants: Variants = {
  hidden: (isEven: boolean) => ({
    opacity: 0,
    x: isEven ? 40 : -40, 
    // ADDED: Smooth reverse animation when scrolling away
    transition: { duration: 0.4, ease: "easeOut" }
  }),
  visible: {
    opacity: 1,
    x: 0,
    z: 0,
    transition: { duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }
  }
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative w-full py-24 md:py-32">
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-32">
          <h2 className="text-4xl md:text-6xl font-abril tracking-wide mb-4">
            The Journey.
          </h2>
          <p className="text-xl font-antic font-semibold text-faded-copper italic">
            Architecting systems, algorithms, and minds.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full">
          
          {/* The Glowing Spine */}
          <div className="absolute left-7 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-transparent via-faded-copper/30 to-transparent md:-translate-x-1/2" />

          <div className="flex flex-col gap-16 md:gap-24">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0
              
              return (
                <div 
                  key={exp.id} 
                  className={`relative flex flex-col md:flex-row items-start md:items-center w-full ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* The Node */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    // CHANGED: Trigger when 50% of the node is visible
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-7 md:left-1/2 w-4 h-4 -translate-x-1/2 mt-6 md:mt-0 z-10 text-dark-coffee flex items-center justify-center bg-faded-copper rounded-sm shadow-[0_0_10px_rgba(162,83,84,0.4)]"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                      <path d="M12 2L22 12L12 22L2 12L12 2Z" />
                    </svg>
                  </motion.div>

                  {/* The Content Card */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 lg:pr-24 text-left md:text-right' : 'md:pl-16 lg:pl-24 text-left'}`}>
                    <motion.div 
                      custom={isEven}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      // CHANGED: Trigger only when 30% of the card is visible
                      viewport={{ once: false, amount: 0.3 }}
                      className="p-8 rounded-2xl border border-white/10 bg-white/5 shadow-lg relative group hover:border-faded-copper/30 transition-colors duration-300 backdrop-blur-sm"
                    >
                      {/* Mobile-Only Date */}
                      <div className="md:hidden text-sm font-antic text-faded-copper tracking-widest uppercase mb-4">
                        {exp.date}
                      </div>

                      <div className={`inline-block px-3 py-1 mb-4 border rounded-full text-xs md:text-sm font-antic tracking-wider uppercase ${exp.tagColor}`}>
                        {exp.tag}
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-abril text-tan mb-2">
                        {exp.role}
                      </h3>
                      
                      <div className={`flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 mb-4 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <span className="text-lg font-antic text-tan/80">{exp.company}</span>
                      </div>
                      
                      <p className="text-base md:text-lg font-antic leading-relaxed text-tan/70">
                        {exp.description}
                      </p>
                    </motion.div>
                  </div>
                  
                  {/* The Free Side: Desktop Date */}
                  <div className={`hidden md:flex w-1/2 items-center ${isEven ? 'justify-start pl-16 lg:pl-24' : 'justify-end pr-16 lg:pr-24'}`}>
                    <motion.div
                      custom={isEven}
                      variants={dateVariants}
                      initial="hidden"
                      whileInView="visible"
                      // CHANGED: Trigger only when 30% of the date area is visible
                      viewport={{ once: false, amount: 0.3 }}
                    >
                      <span className="text-xl lg:text-2xl font-antic font-semibold text-faded-copper/80 tracking-widest uppercase">
                        {exp.date}
                      </span>
                    </motion.div>
                  </div>
                  
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}