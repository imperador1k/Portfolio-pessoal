import React, { useState } from 'react';
import { Send, Loader2, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';

const FloatingInput = ({ id, label, type = "text", required = false, isTextarea = false }: any) => {
  return (
    <div className="relative">
      {isTextarea ? (
        <textarea 
          id={id}
          className="peer w-full bg-slate-50 text-jb-dark placeholder-transparent px-4 pt-7 pb-3 outline-none text-sm font-sans rounded-xl border border-slate-200 focus:border-transparent focus:ring-2 focus:ring-jb-primary focus:bg-white focus:shadow-lg focus:shadow-jb-primary/10 transition-all duration-300 resize-none block min-h-[140px]"
          placeholder={label}
          required={required}
        />
      ) : (
        <input 
          type={type} 
          id={id}
          className="peer w-full bg-slate-50 text-jb-dark placeholder-transparent px-4 pt-7 pb-3 outline-none text-sm font-sans rounded-xl border border-slate-200 focus:border-transparent focus:ring-2 focus:ring-jb-primary focus:bg-white focus:shadow-lg focus:shadow-jb-primary/10 transition-all duration-300 block"
          placeholder={label}
          required={required}
        />
      )}
      <label 
        htmlFor={id} 
        className="absolute left-4 top-2 text-[10px] font-mono font-medium text-slate-500 pointer-events-none transition-all duration-300
                   peer-placeholder-shown:top-[1.125rem] peer-placeholder-shown:text-sm peer-placeholder-shown:font-sans peer-placeholder-shown:font-normal peer-placeholder-shown:text-slate-400
                   peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-mono peer-focus:font-medium peer-focus:text-jb-primary z-20"
      >
        {label}
      </label>
    </div>
  );
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText('migasmps2005@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="px-5 sm:px-6 py-24 lg:px-10 max-w-7xl mx-auto w-full relative z-10" id="contactos">
       
      <div className="max-w-6xl mx-auto bg-white border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[2rem] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          
          {/* Left Column: Info & Code Snippet (Span 2) */}
          <div className="lg:col-span-2 bg-slate-50/50 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col justify-center">
             <h2 className="text-3xl sm:text-4xl font-extrabold text-jb-dark tracking-tight mb-4 leading-[1.15]">
                Vamos compilar algo juntos?
             </h2>
             <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed">
                Seja para discutir arquiteturas complexas, desafios ou simplesmente partilhar ideias sobre código e interfaces.
             </p>

             {/* The Realistic Code Block */}
             <div className="bg-[#19191C] rounded-xl shadow-[0_15px_30px_-5px_rgba(0,0,0,0.2)] overflow-hidden mt-8 relative group">
                {/* Header */}
                <div className="bg-[#2A2A2F] px-4 py-2.5 flex items-center justify-between border-b border-white/5">
                   <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
                   </div>
                   <div className="absolute left-1/2 -translate-x-1/2 text-[#85858B] text-[11px] font-mono">contact.kt</div>
                   <div></div>
                </div>
                
                {/* Body */}
                <div className="p-5 sm:p-6 relative">
                   <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCopy}
                      className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                      aria-label="Copy code"
                   >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                   </motion.button>
                   <div className="font-mono text-[13px] sm:text-sm leading-8 whitespace-pre overflow-x-auto tracking-tight">
                      <span className="text-purple-400">val</span> <span className="text-blue-300">email</span> <span className="text-white">=</span> <span className="text-green-300">"migasmps2005@gmail.com"</span><br/>
                      <span className="text-purple-400">val</span> <span className="text-blue-300">linkedin</span> <span className="text-white">=</span> <span className="text-green-300">"/in/miguel"</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Right Column: Form (Span 3) */}
          <div className="lg:col-span-3 p-8 lg:p-16 bg-white flex flex-col justify-center">
             <form className="w-full text-left space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                   <FloatingInput id="firstName" label="O teu Nome" required />
                   <FloatingInput id="lastName" label="O teu Apelido" />
                </div>
                
                <FloatingInput id="email" label="O teu Email" type="email" required />
                
                <FloatingInput id="message" label="A tua Mensagem..." isTextarea required />

                <div className="pt-2">
                   <motion.button 
                      type="submit"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={isSubmitting}
                      className="relative w-full bg-gradient-to-r from-jb-primary to-cyan-500 text-white px-8 py-4 mt-2 rounded-xl font-bold text-sm shadow-[0_10px_20px_-5px_rgba(127,82,255,0.4)] transition-all flex items-center justify-center overflow-hidden group disabled:opacity-80 disabled:cursor-not-allowed"
                   >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-xl"></div>
                      <div className="relative flex items-center gap-2">
                         {isSubmitting ? (
                            <>
                               <span>A compilar mensagem...</span>
                               <Loader2 className="w-4 h-4 animate-spin" />
                            </>
                         ) : (
                            <>
                               <span>Enviar Mensagem</span>
                               <Send className="w-4 h-4" />
                            </>
                         )}
                      </div>
                   </motion.button>
                </div>
             </form>
          </div>
          
        </div>
      </div>
    </section>
  );
}
