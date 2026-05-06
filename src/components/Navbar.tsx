import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Download } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';

const navLinks = [
  { name: 'Sobre', href: '#sobre', id: 'sobre' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Projetos', href: '#projetos', id: 'projetos' },
  { name: 'Contactos', href: '#contactos', id: 'contactos' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isOpen) return; // Prevent hiding when mobile menu is open
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" });
    
    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));
    
    return () => observer.disconnect();
  }, []);

  const menuVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    },
    exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-150%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed z-50 left-0 right-0 top-0 md:top-6 sm:px-6 pointer-events-none flex justify-center"
      >
        <div className={`pointer-events-auto bg-white/70 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-gray-100/50 md:border md:rounded-full w-full md:w-auto flex items-center justify-between px-5 py-3 md:py-3.5 gap-8 lg:gap-16 transition-all duration-300 ${isOpen ? 'bg-transparent border-transparent shadow-none backdrop-blur-none' : ''}`}>
          
          {/* Logo (Terminal Aesthetic) */}
          <a href="#" className="font-mono font-bold text-[17px] text-slate-800 flex items-center gap-0.5 z-50">
            <span className="text-jb-primary font-medium">~/</span>
            miguel
            <span className="text-jb-primary font-medium w-3 md:w-auto">_</span>
          </a>

          {/* Desktop Navigation (Sliding Pill) */}
          <ul className="hidden md:flex items-center relative z-50">
            {navLinks.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <li
                  key={item.name} 
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative px-4 py-2"
                >
                  {hoveredIndex === index && (
                    <motion.div
                      layoutId="navHover"
                      className="absolute inset-0 bg-slate-100 rounded-full cursor-pointer"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <a 
                    href={item.href}
                    className={`relative z-10 font-sans text-[14px] transition-colors duration-300 ${isActive ? 'text-jb-primary font-semibold' : 'text-slate-600 font-medium hover:text-slate-900'}`}
                  >
                    {item.name}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Call to Action & Hamburger */}
          <div className="flex items-center gap-4 z-50">
            <a href="#contactos" className="hidden sm:flex items-center justify-center px-6 py-2.5 relative rounded-full group outline-none overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-transform">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-jb-primary to-cyan-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-[1.5px] rounded-full bg-white group-hover:bg-jb-primary/10 transition-colors duration-300"></div>
              <span className="relative font-bold text-jb-primary text-[13px] tracking-wide">Vamos Falar</span>
            </a>

            {/* Mobile Hamburger to X */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden relative flex flex-col justify-center items-center w-8 h-8 focus:outline-none z-50 -mr-1"
              aria-label="Toggle Menu"
            >
              <motion.span 
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 0 : -6 }} 
                className="absolute w-6 h-[2.5px] bg-slate-800 rounded-full origin-center" 
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                animate={{ opacity: isOpen ? 0 : 1 }} 
                className="absolute w-6 h-[2.5px] bg-slate-800 rounded-full"
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 0 : 6 }} 
                className="absolute w-6 h-[2.5px] bg-slate-800 rounded-full origin-center"
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="fixed inset-0 bg-white/95 backdrop-blur-xl z-40 flex flex-col pt-24 px-8 pb-10 overflow-y-auto md:hidden"
          >
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((item, i) => (
                <motion.a
                  variants={itemVariants}
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-bold text-slate-800 flex items-center gap-4"
                >
                  <span className="text-jb-primary/50 text-sm font-mono mt-1">0{i+1}</span>
                  {item.name}
                </motion.a>
              ))}
            </div>

            <motion.div variants={itemVariants} className="mt-auto pt-16 flex flex-col gap-5">
              <div className="flex gap-4">
                <a href="#" className="flex-1 flex justify-center p-3.5 bg-slate-100 rounded-2xl text-slate-600 hover:text-jb-primary active:bg-slate-200 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="flex-1 flex justify-center p-3.5 bg-slate-100 rounded-2xl text-slate-600 hover:text-jb-primary active:bg-slate-200 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              
              <a href="#" className="w-full flex items-center justify-center gap-2.5 py-4 bg-jb-secondary/10 border border-jb-primary/20 text-jb-primary font-bold rounded-2xl active:bg-jb-primary/20 transition-colors">
                <Download className="w-5 h-5" />
                <span>Download CV</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
