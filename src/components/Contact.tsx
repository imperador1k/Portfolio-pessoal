import { motion } from 'motion/react';
import { Send, Terminal } from 'lucide-react';

export default function Contact() {
  return (
    <section className="px-5 sm:px-6 py-24 lg:px-10 max-w-5xl mx-auto w-full relative z-10" id="contactos">
      <div className="relative rounded-[40px] overflow-hidden bg-white/60 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(127,82,255,0.1)] transition-all duration-700">
        {/* Subtle Background Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-jb-primary/10 to-transparent blur-[100px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/10 to-transparent blur-[100px] pointer-events-none -z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none -z-10"></div>
        {/* Inner ring */}
        <div className="absolute inset-0 rounded-[40px] ring-1 ring-inset ring-slate-200/50 pointer-events-none z-30"></div>
        
        <div className="relative z-10 px-6 py-16 md:py-24 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-jb-primary to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <Terminal className="w-8 h-8 text-jb-primary group-hover:scale-110 transition-transform duration-500" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-jb-dark tracking-tight mb-6">
            Vamos criar algo <br className="md:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-jb-primary to-cyan-500">incrível</span> juntos.
          </h2>
          <p className="text-slate-500 max-w-lg mb-12 text-[15px] md:text-base leading-relaxed font-medium">
            Seja para discutir uma oportunidade de negócio, integração na sua equipa, ou trocar ideias sobre engenharia de software e ecossistema mobile.
          </p>
          
          <form className="w-full max-w-xl text-left space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative">
                <input 
                  type="text" 
                  id="name"
                  className="peer w-full bg-white text-jb-dark placeholder-transparent px-4 py-3.5 outline-none text-sm font-sans rounded-xl ring-1 ring-slate-200 focus:ring-2 focus:ring-jb-primary shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all duration-300"
                  placeholder="Nome"
                  required
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-3 -top-2.5 bg-white px-1 text-[10px] font-mono font-bold tracking-wider text-slate-400 transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent peer-placeholder-shown:font-sans peer-placeholder-shown:font-normal peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[10px] peer-focus:bg-white peer-focus:font-mono peer-focus:font-bold peer-focus:text-jb-primary pointer-events-none"
                >
                  NOME
                </label>
              </div>
              <div className="relative">
                <input 
                  type="email" 
                  id="email"
                  className="peer w-full bg-white text-jb-dark placeholder-transparent px-4 py-3.5 outline-none text-sm font-sans rounded-xl ring-1 ring-slate-200 focus:ring-2 focus:ring-jb-primary shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all duration-300"
                  placeholder="Email"
                  required
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-3 -top-2.5 bg-white px-1 text-[10px] font-mono font-bold tracking-wider text-slate-400 transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent peer-placeholder-shown:font-sans peer-placeholder-shown:font-normal peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[10px] peer-focus:bg-white peer-focus:font-mono peer-focus:font-bold peer-focus:text-jb-primary pointer-events-none"
                >
                  EMAIL
                </label>
              </div>
            </div>

            <div className="relative">
              <textarea 
                id="message"
                rows={4}
                className="peer w-full bg-white text-jb-dark placeholder-transparent px-4 py-3.5 outline-none text-sm font-sans rounded-xl ring-1 ring-slate-200 focus:ring-2 focus:ring-jb-primary shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all duration-300 resize-none block"
                placeholder="Mensagem"
                required
              />
              <label 
                htmlFor="message" 
                className="absolute left-3 -top-2.5 bg-white px-1 text-[10px] font-mono font-bold tracking-wider text-slate-400 transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent peer-placeholder-shown:font-sans peer-placeholder-shown:font-normal peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[10px] peer-focus:bg-white peer-focus:font-mono peer-focus:font-bold peer-focus:text-jb-primary pointer-events-none"
              >
                MENSAGEM
              </label>
            </div>

            <div className="pt-2 flex justify-center">
              <motion.button 
                type="submit"
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-jb-primary to-pink-500 hover:scale-[1.02] text-white px-10 py-4 rounded-xl font-bold text-sm shadow-[0_10px_30px_rgba(127,82,255,0.3)] transition-all flex items-center justify-center gap-3 w-full sm:w-auto"
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
