import React, { useState } from 'react';
import { Send, Loader2, Copy, Check, Terminal, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

const FloatingInput = ({ id, label, value, onChange, type = "text", required = false, isTextarea = false }: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  required?: boolean;
  isTextarea?: boolean;
}) => {
  return (
    <div className="relative group">
      {isTextarea ? (
        <textarea 
          id={id}
          value={value}
          onChange={onChange}
          className="peer w-full bg-slate-50 text-slate-900 placeholder-transparent px-4 pt-7 pb-3 outline-none text-sm font-sans rounded-xl border border-slate-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-jb-primary focus:shadow-lg focus:shadow-jb-primary/10 transition-all duration-300 resize-none min-h-[140px] block"
          placeholder={label}
          required={required}
        />
      ) : (
        <input 
          type={type} 
          id={id}
          value={value}
          onChange={onChange}
          className="peer w-full bg-slate-50 text-slate-900 placeholder-transparent px-4 pt-7 pb-3 outline-none text-sm font-sans rounded-xl border border-slate-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-jb-primary focus:shadow-lg focus:shadow-jb-primary/10 transition-all duration-300 h-14 block"
          placeholder={label}
          required={required}
        />
      )}
      <label 
        htmlFor={id} 
        className="absolute left-4 top-2 text-[10px] font-mono font-bold text-slate-500 pointer-events-none transition-all duration-300
                   peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:font-sans peer-placeholder-shown:font-normal peer-placeholder-shown:text-slate-400
                   peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-mono peer-focus:font-bold peer-focus:text-jb-primary z-20"
      >
        {label}
      </label>
    </div>
  );
};

const CodeWindow = ({ onCopy, copied }: { onCopy: () => void, copied: boolean }) => {
    return (
        <div className="bg-jb-dark rounded-xl shadow-2xl overflow-hidden mt-8 relative group border border-white/5">
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
                    <div className="text-slate-600 text-right select-none pr-3 border-r border-white/5 hidden sm:block">
                        1<br/>2<br/>3
                    </div>
                    <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <span className="text-purple-400 italic">package</span> <span className="text-white">me.miguel</span><br/>
                        <span className="text-purple-400">val</span> <span className="text-blue-300">email</span> <span className="text-white">=</span> <span className="text-green-300">"migasmps2005@gmail.com"</span><br/>
                        <span className="text-purple-400">val</span> <span className="text-blue-300">linkedin</span> <span className="text-white">=</span> <span className="text-green-300">"/in/miguel"</span>
                    </div>
                </div>

                {/* Copy Button Overlay */}
                <button 
                    onClick={onCopy}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
};

export default function Contact() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          message: formData.message,
          subject: `Contacto via Portfolio: ${formData.firstName}`
        })
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Contact Error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText('migasmps2005@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="px-5 sm:px-6 py-32 lg:px-10 max-w-7xl mx-auto w-full relative z-10" id="contactos">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto bg-white border border-slate-100 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.08)] rounded-[2.5rem] overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[600px]">
          
          {/* Left Column: Info & Code */}
          <div className="lg:col-span-2 bg-slate-50/50 p-8 lg:p-14 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col justify-center">
            <div className="max-w-sm">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-jb-primary/10 text-jb-primary rounded-full text-[10px] font-mono font-bold uppercase tracking-widest mb-6">
                    <Terminal className="w-3 h-3" />
                    {t('contact.badge')}
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-6 leading-[1.1]">
                    {t('contact.title_part1')} <br />
                    {t('contact.title_part2')} <span className="text-jb-primary">{t('contact.title_part3')}</span>
                </h2>
                
                <p className="text-slate-500 text-base leading-relaxed font-medium mb-2">
                    {t('contact.description')}
                </p>
                
                <CodeWindow onCopy={handleCopy} copied={copied} />
            </div>
          </div>

          {/* Right Column: IDE Form */}
          <div className="lg:col-span-3 p-8 lg:p-16 bg-white flex flex-col justify-center">
            <div className="mb-10 flex justify-between items-end">
                <div>
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">{t('contact.form_filename')}</span>
                  <div className="h-px w-12 bg-jb-primary mt-2"></div>
                </div>
                
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.span 
                      initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                      className="text-[10px] font-mono font-bold text-emerald-500 flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" /> SUCCESS_SENT
                    </motion.span>
                  )}
                  {status === 'error' && (
                    <motion.span 
                      initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                      className="text-[10px] font-mono font-bold text-rose-500 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" /> BUILD_FAILED
                    </motion.span>
                  )}
                </AnimatePresence>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FloatingInput id="firstName" label={t('contact.form.first_name')} value={formData.firstName} onChange={handleChange} required />
                <FloatingInput id="lastName" label={t('contact.form.last_name')} value={formData.lastName} onChange={handleChange} />
              </div>
              
              <FloatingInput id="email" label={t('contact.form.email')} type="email" value={formData.email} onChange={handleChange} required />
              
              <FloatingInput id="message" label={t('contact.form.message')} isTextarea value={formData.message} onChange={handleChange} required />

              <div className="pt-4 space-y-4">
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className={`w-full ${status === 'success' ? 'bg-emerald-500' : 'bg-linear-to-r from-jb-primary to-cyan-500'} text-white py-4 rounded-xl font-bold text-sm shadow-[0_12px_40px_-10px_rgba(127,82,255,0.4)] transition-all flex items-center justify-center overflow-hidden relative group disabled:opacity-80 disabled:cursor-not-allowed h-14`}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div 
                        key="loading"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>{t('contact.form.submitting')}</span>
                      </motion.div>
                    ) : status === 'success' ? (
                      <motion.div 
                        key="sent"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-5 h-5" />
                        <span className="tracking-wide uppercase text-[12px]">Mensagem Enviada!</span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="submit"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <span className="tracking-wide uppercase text-[12px]">{t('contact.form.submit')}</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* IDE Console Feedback */}
                <AnimatePresence>
                  {(isSubmitting || status !== 'idle') && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-slate-900 rounded-xl p-4 font-mono text-[11px] border border-white/10 shadow-inner overflow-hidden"
                    >
                      <div className="flex items-center gap-2 mb-2 border-b border-white/5 pb-2">
                        <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                        <span className="text-slate-500 uppercase tracking-widest text-[9px]">Output Console</span>
                      </div>
                      
                      <div className="space-y-1.5">
                        <div className="flex gap-2">
                          <span className="text-slate-600">[{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]</span>
                          <span className="text-blue-400">INFO:</span>
                          <span className="text-slate-300">Initializing contact protocol...</span>
                        </div>
                        
                        {isSubmitting && (
                          <div className="flex gap-2 animate-pulse">
                            <span className="text-slate-600">[{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]</span>
                            <span className="text-yellow-500">EXEC:</span>
                            <span className="text-slate-300">Compiling message and transmitting to gateway...</span>
                          </div>
                        )}

                        {status === 'success' && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                            <span className="text-slate-600">[{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]</span>
                            <span className="text-emerald-500">SUCCESS:</span>
                            <span className="text-emerald-400">Process finished with exit code 0. Message sent!</span>
                          </motion.div>
                        )}

                        {status === 'error' && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                            <span className="text-slate-600">[{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]</span>
                            <span className="text-rose-500">ERROR:</span>
                            <span className="text-rose-400">Failed to transmit. Check your connection or API status.</span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
