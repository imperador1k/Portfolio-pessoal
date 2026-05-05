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
    <nav className="h-16 flex items-center justify-between px-6 lg:px-10 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="font-mono font-bold text-base md:text-lg text-slate-800 cursor-default">
        <span className="text-purple-600">Miguel</span> <span className="hidden sm:inline-block">// Engenharia Informática</span>
      </div>

      <div className="hidden md:flex gap-8 text-sm font-medium text-slate-500 font-mono">
        {navLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="hover:text-purple-600 transition-colors focus:outline-none"
          >
            {item.name}
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 w-full bg-white border-b border-slate-100 shadow-xl overflow-hidden flex flex-col md:hidden z-40"
          >
            <div className="px-6 py-4 flex flex-col gap-4 font-mono text-sm font-bold text-slate-700">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 border-b border-slate-50 hover:text-purple-600 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
