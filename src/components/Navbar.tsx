import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'Sobre', href: '#sobre' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projetos', href: '#projetos' },
  { name: 'Certificações', href: '#certificacoes' },
  { name: 'Contactos', href: '#contactos' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="h-16 flex items-center justify-between px-6 lg:px-10 border-b border-slate-200/50 bg-white/70 backdrop-blur-xl sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
      <div className="font-mono font-bold text-base md:text-lg text-slate-800 cursor-default">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500">Miguel</span> <span className="hidden sm:inline-block text-slate-400 font-medium">// Engenharia Informática</span>
      </div>

      <div className="hidden md:flex gap-8 text-[13px] font-bold text-slate-500 font-mono tracking-wide uppercase">
        {navLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="relative group transition-colors focus:outline-none hover:text-slate-900"
          >
            <span>{item.name}</span>
            <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300 ease-out"></span>
          </a>
        ))}
      </div>

      {/* Mobile menu trigger */}
      <div className="flex md:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700 hover:text-purple-600 transition-colors"
        >
          <span className="sr-only">Toggle main menu</span>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            className="absolute top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white/95 backdrop-blur-3xl overflow-hidden flex flex-col md:hidden z-40"
          >
            <div className="px-6 py-6 flex flex-col gap-5 font-mono text-base font-bold text-slate-700 h-full justify-center">
              {navLinks.map((item, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-4 border-b border-slate-100/50 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-500 transition-all uppercase tracking-wider"
                >
                  <span className="text-purple-500 mr-3 text-xs opacity-50">0{i+1}</span>
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
