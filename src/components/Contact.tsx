import React, { useState } from 'react';
import { Terminal, Send, Loader2, Clipboard, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FloatingInput = ({ id, label, type = "text", required = false, isTextarea = false }: any) => {
  const [value, setValue] = useState("");
  const isFilled = value.length > 0;

  return (
    <div className="relative group">
      <div className={`
        absolute left-4 transition-all duration-300 pointer-events-none z-10
        ${isFilled ? 'top-2 text-[10px] font-mono font-bold text-jb-primary' : 'top-5 text-sm text-slate-400 font-sans'}
        group-focus-within:top-2 group-focus-within:text-[10px] group-focus-within:font-mono group-focus-within:font-bold group-focus-within:text-jb-primary
      `}>
        {label}
      </div>
      
      {isTextarea ? (
        <textarea 
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="peer w-full bg-slate-50 text-slate-900 px-4 pt-7 pb-3 outline-none text-sm font-sans rounded-xl border border-slate-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-jb-primary focus:shadow-lg focus:shadow-jb-primary/10 transition-all duration-300 resize-none min-h-[140px]"
          required={required}
        />
      ) : (
        <input 
          type={type} 
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="peer w-full bg-slate-50 text-slate-900 px-4 pt-7 pb-3 outline-none text-sm font-sans rounded-xl border border-slate-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-jb-primary focus:shadow-lg focus:shadow-jb-primary/10 transition-all duration-300"
          required={required}
        />
      )}
    </div>
  );
};

const CodeWindow = () => {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = () => {
        navigator.clipboard.writeText("migasmps2005@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-[#19191C] rounded-xl shadow-2xl overflow-hidden mt-10 relative group border border-white/5">
            {/* Header */}
            <div className="bg-[#2A2A2F] px-4 py-2.5 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="font-mono text-[10px] text-slate-400 lowercase tracking-wider opacity-60">contact.kt</div>
                <div className="w-12"></div>
            </div>
            
            {/* Body */}
            <div className="p-6 font-mono text-[13px] leading-relaxed relative">
                <div className="flex items-start gap-4">
                    <div className="text-slate-600 text-right select-none pr-2 border-r border-white/5">
                        1<br/>2<br/>3
                    </div>
                    <div className="flex-1">
                        <span className="text-purple-400 italic">package</span> <span className="text-white">me.miguel</span><br/>
                        <span className="text-purple-400">val</span> <span className="text-blue-300">email</span> <span className="text-white">=</span> <span className="text-green-300">"migasmps2005@gmail.com"</span><br/>
                        <span className="text-purple-400">val</span> <span className="text-blue-300">linkedin</span> <span className="text-white">=</span> <span className="text-green-300">"/in/miguel"</span>
                    </div>
                </div>

                {/* Copy Button Overlay */}
                <button 
                    onClick={handleCopy}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Clipboard className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <section className="px-5 sm:px-6 py-24 lg:px-10 max-w-7xl mx-auto w-full relative z-10" id="contactos">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto bg-white border border-slate-100 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.08)] rounded-[2.5rem] overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[650px]">
          
          {/* Left Column: Info & Code */}
          <div className="lg:col-span-2 bg-slate-50/50 p-8 lg:p-14 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col justify-center">
            <div className="max-w-sm">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-jb-primary/10 text-jb-primary rounded-full text-[10px] font-mono font-bold uppercase tracking-widest mb-6">
                    <Terminal className="w-3 h-3" />
                    Connect_Sequence
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
                    Vamos compilar <br />
                    algo <span className="text-jb-primary">juntos?</span>
                </h2>
                
                <p className="text-slate-500 text-base leading-relaxed font-medium mb-2">
                    Estás à procura de um engenheiro para transformar a tua visão em código nativo de alta performance?
                </p>
                
                <CodeWindow />
            </div>
          </div>

          {/* Right Column: IDE Form */}
          <div className="lg:col-span-3 p-8 lg:p-16 bg-white flex flex-col justify-center">
            <div className="mb-10">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">Contact_Form.kt</span>
                <div className="h-[2px] w-12 bg-jb-primary mt-2"></div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FloatingInput id="firstName" label="O teu Nome" required />
                <FloatingInput id="lastName" label="O teu Apelido" />
              </div>
              
              <FloatingInput id="email" label="O teu Email" type="email" required />
              
              <FloatingInput id="message" label="A tua Mensagem..." isTextarea required />

              <div className="pt-4">
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.01, filter: "brightness(1.1)" }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-jb-primary via-jb-primary to-cyan-500 text-white py-4.5 rounded-xl font-bold text-sm shadow-[0_12px_40px_-10px_rgba(127,82,255,0.4)] transition-all flex items-center justify-center overflow-hidden relative group disabled:opacity-80 disabled:cursor-not-allowed h-14"
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div 
                        key="loading"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Compilando...</span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="submit"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <span className="tracking-wide uppercase text-[12px]">Executar Envio</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </form>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
