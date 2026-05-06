import React, { useState } from 'react';
import { Terminal, Send, Loader2, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'motion/react';

const FloatingInput = ({ id, label, type = "text", required = false, isTextarea = false }: any) => {
  const baseClasses = "absolute left-3 -top-2.5 bg-white px-1 text-[10px] font-mono font-bold text-slate-500 transition-all duration-300 pointer-events-none rounded";
  const placeholderClasses = "peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent peer-placeholder-shown:font-sans peer-placeholder-shown:font-normal peer-placeholder-shown:text-slate-400";
  const focusClasses = "peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[10px] peer-focus:bg-white peer-focus:font-mono peer-focus:font-bold peer-focus:text-jb-primary";
  
  return (
    <div className="relative">
      {isTextarea ? (
        <textarea 
          id={id}
          className="peer w-full bg-slate-50 text-jb-dark placeholder-transparent px-4 py-4 outline-none text-sm font-sans rounded-xl ring-1 ring-slate-200 focus:ring-2 focus:ring-jb-primary focus:bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus:shadow-none transition-all duration-300 resize-none block min-h-[140px]"
          placeholder={label}
          required={required}
        />
      ) : (
        <input 
          type={type} 
          id={id}
          className="peer w-full bg-slate-50 text-jb-dark placeholder-transparent px-4 py-4 outline-none text-sm font-sans rounded-xl ring-1 ring-slate-200 focus:ring-2 focus:ring-jb-primary focus:bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus:shadow-none transition-all duration-300 block"
          placeholder={label}
          required={required}
        />
      )}
      <label 
        htmlFor={id} 
        className={`${baseClasses} ${placeholderClasses} ${focusClasses}`}
      >
        {label}
      </label>
    </div>
  );
};

const ContactVar = ({ name, value, type, icon: Icon, href }: any) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-3 -ml-3 rounded-xl hover:bg-white/80 transition-colors border border-transparent hover:border-slate-200/60 hover:shadow-sm">
    <div className="w-10 h-10 shrink-0 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-jb-primary/10 group-hover:scale-110 transition-all duration-300">
      <Icon className="w-5 h-5 text-slate-500 group-hover:text-jb-primary transition-colors" />
    </div>
    <div className="font-mono text-[13px] sm:text-sm overflow-hidden text-ellipsis">
      <span className="text-pink-500">val</span> <span className="text-jb-dark font-bold">{name}</span><span className="text-slate-400">: {type} = </span><br className="sm:hidden" />
      <span className="text-emerald-600 break-all">"{value}"</span>
    </div>
  </a>
);

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <section className="px-5 sm:px-6 py-24 lg:px-10 max-w-7xl mx-auto w-full relative z-10" id="contactos">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Column: Info & Context */}
        <div className="flex flex-col">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-jb-primary to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <Terminal className="w-8 h-8 text-jb-primary group-hover:scale-110 transition-transform duration-500" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-jb-dark tracking-tight mb-6 leading-[1.1]">
            Vamos compilar a <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-jb-primary to-cyan-500">próxima grande ideia</span> juntos?
          </h2>
          
          <p className="text-slate-600 text-lg mb-10 max-w-xl font-medium leading-relaxed">
            Seja para discutir arquiteturas complexas, resolver desafios de integração no ecossistema mobile ou simplesmente trocar ideias sobre engenharia de software, estou sempre disponível.
          </p>

          <div className="space-y-3">
             <ContactVar name="email" type="String" value="migasmps2005@gmail.com" icon={Mail} href="mailto:migasmps2005@gmail.com" />
             <ContactVar name="linkedIn" type="URL" value="linkedin.com/in/miguel" icon={Linkedin} href="https://linkedin.com" />
             <ContactVar name="gitHub" type="URL" value="github.com/miguel" icon={Github} href="https://github.com" />
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="relative w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
          {/* Subtle glow behind form */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-jb-primary/10 to-cyan-500/10 blur-[80px] pointer-events-none -z-10 rounded-full"></div>
          
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] ring-1 ring-slate-200/50 p-8 sm:p-10">
            <form className="w-full text-left space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FloatingInput id="firstName" label="O teu Nome" required />
                <FloatingInput id="lastName" label="O teu Apelido" />
              </div>
              
              <FloatingInput id="email" label="O teu Email" type="email" required />
              
              <FloatingInput id="message" label="A tua Mensagem..." isTextarea required />

              <div className="pt-2">
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                  className="relative w-full bg-gradient-to-r from-jb-primary to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-[0_10px_30px_rgba(127,82,255,0.3)] hover:shadow-[0_15px_40px_rgba(127,82,255,0.4)] transition-all flex items-center justify-center overflow-hidden group disabled:opacity-80 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                  <div className="relative flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <span>Building message...</span>
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
