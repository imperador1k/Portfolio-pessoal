import { motion } from 'motion/react';
import { Send, Terminal } from 'lucide-react';

export default function Contact() {
  return (
    <section className="px-6 py-24 lg:px-10 max-w-7xl mx-auto w-full relative z-10" id="contactos">
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-full h-[200px] bg-gradient-to-b from-purple-500/20 to-transparent blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-cyan-500/10 to-transparent blur-[80px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none"></div>
        
        <div className="relative z-10 px-6 py-16 md:py-24 text-center flex flex-col items-center">
          <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6 border border-slate-700">
            <Terminal className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Vamos Criar Algo <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Juntos?</span>
          </h2>
          <p className="text-slate-400 max-w-lg mb-10 text-sm md:text-base leading-relaxed">
            Seja para discutir uma oportunidade de negócio, uma vaga na sua empresa, ou apenas para trocar ideias sobre arquiteturas de sistema. A caixa de entrada está aberta.
          </p>
          
          <form className="w-full max-w-md relative group" onSubmit={(e) => e.preventDefault()}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative flex items-center bg-slate-900 border border-slate-700 rounded-xl overflow-hidden p-1">
              <input 
                type="email" 
                placeholder="Introduza o seu email..." 
                className="w-full bg-transparent text-slate-200 placeholder-slate-500 px-4 py-3 outline-none text-sm font-mono"
                required
              />
              <button 
                type="submit"
                className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 border border-slate-600"
              >
                <span>Enviar</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
          
          <div className="mt-8 flex items-center gap-2 text-xs font-mono text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Disponível para novas oportunidades
          </div>
        </div>
      </div>
    </section>
  );
}
