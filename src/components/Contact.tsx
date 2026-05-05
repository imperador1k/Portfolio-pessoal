import { motion } from 'motion/react';
import { Send, Terminal } from 'lucide-react';

export default function Contact() {
  return (
    <section className="px-5 sm:px-6 py-24 lg:px-10 max-w-5xl mx-auto w-full relative z-10" id="contactos">
      <div className="relative rounded-[40px] overflow-hidden bg-white/60 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(168,85,247,0.1)] transition-all duration-700">
        {/* Subtle Background Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/10 to-transparent blur-[100px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/10 to-transparent blur-[100px] pointer-events-none -z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none -z-10"></div>
        {/* Inner ring */}
        <div className="absolute inset-0 rounded-[40px] ring-1 ring-inset ring-slate-200/50 pointer-events-none z-30"></div>
        
        <div className="relative z-10 px-6 py-16 md:py-24 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <Terminal className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform duration-500" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 tracking-tight mb-6">
            Vamos criar algo <br className="md:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500">incrível</span> juntos.
          </h2>
          <p className="text-slate-500 max-w-lg mb-12 text-[15px] md:text-base leading-relaxed font-medium">
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

            <div className="pt-4 flex justify-center">
              <motion.button 
                type="submit"
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-[1.02] text-white px-10 py-4 rounded-xl font-bold text-sm shadow-[0_10px_30px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                <span>Enviar Mensagem</span>
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </form>
          
          <div className="mt-14 flex items-center gap-2 text-[11px] font-mono text-slate-500 bg-white/50 backdrop-blur-sm border border-slate-200/60 px-4 py-2 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></span>
            Sistemas Operacionais
          </div>
        </div>
      </div>
    </section>
  );
}
