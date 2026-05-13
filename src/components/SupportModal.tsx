import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function SupportModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  // Prevenir o scroll da página quando a modal está aberta
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
      {/* Botão Flutuante (FAB) */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3, type: 'spring', stiffness: 200, damping: 20 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-0 left-4 sm:left-8 z-[900] group flex items-center justify-center w-14 h-12 sm:h-14 bg-white rounded-t-2xl sm:rounded-full shadow-[0_-4px_20px_rgb(0,0,0,0.08)] sm:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200 border-b-0 sm:border-b hover:border-[#FFDD00] hover:shadow-[0_8px_30px_rgba(255,221,0,0.3)] transition-all duration-300 sm:bottom-6"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FFDD00]/20 to-amber-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Coffee className="w-6 h-6 text-slate-700 group-hover:text-amber-700 transition-colors z-10" />
        
        {/* Tooltip Lateral */}
        <div className="hidden sm:block absolute left-full ml-4 px-3 py-1.5 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 pointer-events-none transition-all duration-300 whitespace-nowrap">
           Buy me a coffee
           <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-slate-900" />
        </div>
        
        {/* Animação Subtil de Ping */}
        <span className="absolute flex h-full w-full -z-10">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFDD00] opacity-30"></span>
        </span>
      </motion.button>

      {/* Modal Glassmorphism */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            {/* Background Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden border border-white/20 p-8 text-center"
            >
              {/* Decorative Gradient */}
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FFDD00]/20 to-transparent -z-10" />
              
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-20 h-20 mx-auto bg-[#FFDD00]/10 rounded-2xl flex items-center justify-center mb-6 border-2 border-white shadow-lg rotate-3 hover:rotate-0 transition-transform">
                 <Coffee className="w-10 h-10 text-amber-600 -rotate-3" />
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-2">Apoia o Criador</h3>
              <p className="text-[13px] sm:text-sm text-slate-500 mb-8 leading-relaxed px-2">
                 O desenvolvimento deste portfólio e dos projetos open-source exigem dezenas de horas de foco, café e inspiração. Se valorizas este nível de detalhe e UI/UX de elite, considera pagar-me um café!
              </p>

              <div className="space-y-3">
                 <a 
                   href="https://buymeacoffee.com/imperador1k"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-center gap-3 w-full py-4 bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-slate-900 rounded-xl font-black transition-all active:scale-95 shadow-[0_4px_14px_rgba(255,221,0,0.4)]"
                 >
                    <Coffee className="w-5 h-5" />
                    Buy Me a Coffee
                 </a>
                 <button 
                   onClick={() => setIsOpen(false)}
                   className="w-full py-3 text-[10px] sm:text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest"
                 >
                    Talvez mais tarde
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
