import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Download } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, Variants } from 'motion/react';

const navLinks = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'Sobre', href: '#sobre', id: 'sobre' },
  { name: 'Timeline', href: '#timeline', id: 'timeline' },
  { name: 'Hall of Fame', href: '#certificacoes', id: 'certificacoes' },
  { name: 'Tech Stack', href: '#skills', id: 'skills' },
  { name: 'GitHub', href: '#github', id: 'github' },
  { name: 'LinkedIn', href: '#contactos', id: 'contactos' },
  { name: 'CV', href: '#cv', id: 'cv' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: "-40% 0px -40% 0px" });
    
    document.querySelectorAll('section[id], #home').forEach((section) => observer.observe(section));
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('nav-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('nav-open');
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const menuVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    },
    exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  return (
    <>
      <header className="fixed z-50 left-0 right-0 top-0 md:top-4 sm:px-6 flex justify-center transition-all duration-300">
        <div className={`
          relative w-full md:w-auto flex items-center justify-between px-6 py-3.5 md:py-3 md:rounded-full transition-all duration-500
          ${isScrolled 
            ? 'bg-white/70 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.04)] border-b md:border border-white/20 md:px-8' 
            : 'bg-transparent border-transparent md:px-6'}
          ${isOpen ? 'bg-white/95 backdrop-blur-xl' : ''}
        `}>
          
          {/* Logo (Terminal Aesthetic) */}
          <a href="#home" className="group font-mono font-bold text-[20px] text-slate-900 flex items-center gap-1 z-50 transition-transform active:scale-95">
            <span className="text-jb-primary font-bold">{'>_'}</span>
            <span className="relative">
              miguel
              <motion.span 
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "steps(2, start)" as any }}
                className="text-jb-primary ml-1 inline-block w-3 h-6 bg-jb-primary/20 translate-y-1.5 rounded-sm"
              />
            </span>
          </a>

          {/* Desktop Navigation (Sliding Pill) */}
          <ul className={`hidden md:flex items-center gap-1 relative z-50 transition-all duration-500 rounded-full p-1 border ${isScrolled ? 'bg-slate-50/50 border-slate-200/50 backdrop-blur-sm' : 'bg-transparent border-transparent'}`}>
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
                      className="absolute inset-0 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] rounded-full border border-slate-100"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <a 
                    href={item.href}
                    className={`relative z-10 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 whitespace-nowrap ${isActive ? 'text-jb-primary' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    {item.name}
                  </a>
                  {isActive && (
                    <motion.div layoutId="navActive" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-jb-primary rounded-full" />
                  )}
                </li>
              )
            })}
          </ul>

          {/* Call to Action & Hamburger */}
          <div className="flex items-center gap-3 z-50">
            <a href="#linkedin-contact" className="hidden sm:flex items-center justify-center px-6 py-2.5 relative rounded-full group outline-none overflow-hidden transition-all duration-300">
              <div className="absolute inset-0 rounded-full bg-slate-900 group-hover:bg-jb-primary transition-colors duration-300"></div>
              <span className="relative font-bold text-white text-[13px] tracking-wide">Conectar</span>
            </a>

            {/* Mobile Hamburger to X */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden relative flex flex-col justify-center items-center w-10 h-10 rounded-full hover:bg-slate-100 transition-colors focus:outline-none z-50 -mr-2"
              aria-label="Toggle Menu"
            >
              <div className="flex flex-col gap-1.5 items-end">
                <motion.span 
                  animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0, width: isOpen ? 24 : 20 }} 
                  className="w-5 h-[2px] bg-slate-800 rounded-full origin-center" 
                />
                <motion.span 
                  animate={{ opacity: isOpen ? 0 : 1, width: 24 }} 
                  className="w-6 h-[2px] bg-slate-800 rounded-full"
                />
                <motion.span 
                  animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0, width: isOpen ? 24 : 16 }} 
                  className="w-4 h-[2px] bg-slate-800 rounded-full origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </header>

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
                <a href="#github" onClick={() => setIsOpen(false)} className="flex-1 flex justify-center p-3.5 bg-slate-100 rounded-2xl text-slate-600 hover:text-jb-primary active:bg-slate-200 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#linkedin-contact" onClick={() => setIsOpen(false)} className="flex-1 flex justify-center p-3.5 bg-slate-100 rounded-2xl text-slate-600 hover:text-jb-primary active:bg-slate-200 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              
              <a href="#linkedin-contact" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-center gap-2.5 py-4 bg-slate-900 text-white font-bold rounded-2xl active:scale-95 transition-all">
                <span>Conectar</span>
              </a>
              
              <a href="#cv" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-center gap-2.5 py-4 bg-jb-secondary/10 border border-jb-primary/20 text-jb-primary font-bold rounded-2xl active:bg-jb-primary/20 transition-colors">
                <Download className="w-5 h-5" />
                <span>Ver CV (Interactive)</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
