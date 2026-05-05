import { motion } from 'motion/react';
import { Send, Terminal } from 'lucide-react';

export default function Contact() {
  return (
    <section className="px-6 py-24 lg:px-10 max-w-5xl mx-auto w-full relative z-10" id="contactos">
      <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        {/* Subtle Background Effects */}
        <div className="absolute top-0 right-0 w-full h-[200px] bg-gradient-to-b from-purple-500/5 to-transparent blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-cyan-500/5 to-transparent blur-[80px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>
        
        <div className="relative z-10 px-6 py-16 md:py-20 text-center flex flex-col items-center">
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 border border-slate-100 shadow-sm">
            <Terminal className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Vamos criar algo <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500">incrível</span> juntos.
          </h2>
          <p className="text-slate-500 max-w-lg mb-10 text-sm md:text-base leading-relaxed">
            Seja para discutir uma oportunidade de negócio, integração na sua equipa, ou trocar ideias sobre engenharia de software e ecossistema mobile.
          </p>
          
          <form className="w-full max-w-xl text-left space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 focus-within:text-purple-600 transition-colors">
                <label htmlFor="name" className="text-xs font-bold text-slate-500 font-mono inherit-text">NOME</label>
                <div className="relative rounded-xl overflow-hidden p-[1px] group focus-within:bg-gradient-to-r focus-within:from-purple-500 focus-within:to-cyan-400 bg-slate-200 transition-all duration-300">
                  <input 
                    type="text" 
                    id="name"
                    placeholder="O seu nome..." 
                    className="w-full bg-white text-slate-800 placeholder-slate-400 px-4 py-3 outline-none text-sm font-sans rounded-[10px]"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 focus-within:text-purple-600 transition-colors">
                <label htmlFor="email" className="text-xs font-bold text-slate-500 font-mono inherit-text">EMAIL</label>
                <div className="relative rounded-xl overflow-hidden p-[1px] group focus-within:bg-gradient-to-r focus-within:from-purple-500 focus-within:to-cyan-400 bg-slate-200 transition-all duration-300">
                  <input 
                    type="email" 
                    id="email"
                    placeholder="email@exemplo.com" 
                    className="w-full bg-white text-slate-800 placeholder-slate-400 px-4 py-3 outline-none text-sm font-sans rounded-[10px]"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 focus-within:text-purple-600 transition-colors">
              <label htmlFor="message" className="text-xs font-bold text-slate-500 font-mono inherit-text">MENSAGEM</label>
              <div className="relative rounded-xl overflow-hidden p-[1px] group focus-within:bg-gradient-to-r focus-within:from-purple-500 focus-within:to-cyan-400 bg-slate-200 transition-all duration-300">
                <textarea 
                  id="message"
                  placeholder="Olá! Gostaria de falar sobre..." 
                  rows={4}
                  className="w-full bg-white text-slate-800 placeholder-slate-400 px-4 py-3 outline-none text-sm font-sans rounded-[10px] resize-none"
                  required
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <motion.button 
                type="submit"
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white px-8 py-3 rounded-lg font-bold text-sm shadow-[0_4px_14px_0_rgba(168,85,247,0.39)] transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>Enviar Mensagem</span>
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </form>
          
          <div className="mt-12 flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Disponível para chat
          </div>
        </div>
      </div>
    </section>
  );
}
