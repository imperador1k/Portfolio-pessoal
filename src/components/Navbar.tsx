import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, Variants } from 'motion/react';
import { Github, Linkedin, Download, X, Menu, Globe, ArrowRight, Mail, Zap, MessageSquare, Code, Cpu, Sparkles, ArrowUpRight, Phone, Send, User, ChevronRight, Home, Info, Clock, Trophy, Layers, Briefcase, Youtube, Music, FileText, Star, ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const { scrollY } = useScroll();

  const navLinks = [
    { name: t('navbar.home'), href: '#home', id: 'home', icon: Home },
    { name: t('navbar.about'), href: '#sobre', id: 'sobre', icon: User },
    { name: t('navbar.timeline'), href: '#timeline', id: 'timeline', icon: Clock },
    { name: t('navbar.hall_of_fame'), href: '#certificacoes', id: 'certificacoes', icon: Trophy },
    { name: t('navbar.tech_stack'), href: '#skills', id: 'skills', icon: Layers },
    { name: t('navbar.github'), href: '#github', id: 'github', icon: Github },
    { name: t('navbar.linkedin'), href: '#contactos', id: 'contactos', icon: Linkedin },
    { name: 'Youtube', href: '#youtube', id: 'youtube', icon: Youtube },
    { name: 'Spotify', href: '#spotify', id: 'spotify', icon: Music },
    { name: t('navbar.cv'), href: '#cv', id: 'cv', icon: FileText },
    { name: t('navbar.reviews'), href: '#reviews', id: 'reviews', icon: Star },
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: "-40% 0px -40% 0px" });
    
    document.querySelectorAll('section[id], #home').forEach((section) => observer.observe(section));
    
    return () => observer.disconnect();
  }, []);

  // Nuclear Suppression
  useEffect(() => {
    const styleId = 'nuclear-hide-widgets';
    const hideWidgets = () => {
      const selectors = ['#msg-overlay', '.msg-overlay-container', '[class*="msg-overlay"]'];
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => { (el as HTMLElement).style.display = 'none'; });
      });
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      let styleTag = document.getElementById(styleId);
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = styleId;
        styleTag.innerHTML = `#msg-overlay, [class*="msg-overlay"], .msg-overlay-container { display: none !important; opacity: 0 !important; visibility: hidden !important; z-index: -1 !important; }`;
        document.head.appendChild(styleTag);
      }
      hideWidgets();
      const observer = new MutationObserver(hideWidgets);
      observer.observe(document.body, { childList: true, subtree: true });
      return () => {
        observer.disconnect();
        document.body.style.overflow = 'unset';
        const tag = document.getElementById(styleId);
        if (tag) tag.remove();
      };
    }
  }, [isOpen]);

  const menuVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, staggerChildren: 0.05 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  return (
    <>
      <header className={`fixed z-[70] left-0 right-0 top-0 transition-all duration-700 ${isScrolled ? 'py-4' : 'py-6 md:py-10'}`}>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          <motion.a 
            href="#home" 
            animate={{ opacity: isOpen ? 0 : 1 }}
            className="group font-black text-2xl tracking-tighter text-slate-800 z-10 flex items-center gap-2"
          >
            <span className="text-[#FC4C02]">M</span>
            <span>SANTOS</span>
          </motion.a>

          <div className="flex items-center gap-6 z-10">
            <div className={`hidden lg:flex items-center gap-1 p-1 rounded-2xl border bg-white/50 backdrop-blur-md transition-all duration-500 ${isOpen ? 'opacity-0 pointer-events-none' : 'border-slate-100 shadow-sm opacity-100'}`}>
               <button onClick={() => setLanguage('pt')} className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all ${language === 'pt' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-800'}`}>PT</button>
               <button onClick={() => setLanguage('en')} className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all ${language === 'en' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-800'}`}>EN</button>
            </div>

            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`group flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-500 active:scale-90 cursor-pointer ${isOpen ? 'bg-slate-800 text-white' : 'bg-white text-slate-800 border border-slate-100 shadow-xl'}`}
            >
               <AnimatePresence mode="wait">
                  {isOpen ? <X className="w-5 h-5" key="close" /> : <Menu className="w-5 h-5" key="menu" />}
               </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="fixed inset-0 bg-white z-[60] flex flex-col lg:flex-row overflow-hidden"
          >
            {/* ── PC Sidebar ─────────────────────────────── */}
            <div className="hidden lg:flex flex-col w-[32%] h-full border-r border-slate-100 bg-slate-50/20 px-12 xl:px-20 py-10 xl:py-12 overflow-hidden">
               <div className="flex-1 flex flex-col min-h-max">
                  {/* Branding */}
                  <div className="font-black text-2xl tracking-tighter text-slate-800 flex items-center gap-2 mb-12">
                     <span className="text-[#FC4C02]">M</span><span>SANTOS</span>
                  </div>
                  
                  {/* Profile */}
                  <div className="flex items-center gap-6 mb-12">
                     <div className="w-16 h-16 shrink-0 rounded-2xl bg-slate-800 flex items-center justify-center shadow-2xl">
                        <User className="w-8 h-8 text-white" />
                     </div>
                     <div>
                        <h2 className="text-2xl font-black text-slate-800 leading-none">Miguel Santos</h2>
                        <p className="text-[11px] text-[#FC4C02] font-black uppercase tracking-[0.2em] mt-3">Software Engineer</p>
                     </div>
                  </div>

                  {/* Vision */}
                  <div>
                     <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4">Personal Vision</h4>
                     <p className="text-3xl font-bold text-slate-700 tracking-tight leading-tight italic max-w-sm">
                        "Engineering is not just code, it's the architecture of <span className="text-[#FC4C02]">innovation</span>."
                     </p>
                  </div>

                  {/* Bottom Actions */}
                  <div className="mt-auto pt-10">
                     <div className="flex gap-6 mb-8">
                        {[Github, Linkedin, Mail].map((Icon, i) => (
                           <a key={i} href="#" className="w-14 h-14 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-white transition-all shadow-sm">
                              <Icon className="w-6 h-6" />
                           </a>
                        ))}
                     </div>
                     <a href="#contactos" onClick={() => setIsOpen(false)} className="group w-full flex items-center justify-between p-2.5 pl-10 bg-slate-800 rounded-full hover:bg-[#FC4C02] transition-all duration-500 shadow-2xl">
                        <span className="text-white font-black text-xs uppercase tracking-widest">Start a Project</span>
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform">
                           <Send className="w-5 h-5 text-slate-800" />
                        </div>
                     </a>
                  </div>
               </div>
            </div>

            {/* ── Main Area ──────────────────────────────────── */}
            <div className="flex-1 flex flex-col h-full overflow-hidden pt-6 lg:pt-0 bg-slate-50/10 relative">
               
               {/* Mobile Header (Only visible on Mobile) */}
               <div className="lg:hidden px-8 pt-4 pb-2 flex flex-col gap-4 items-start z-20">
                  <div className="space-y-0.5">
                     <div className="font-black text-xl tracking-tighter text-slate-800 flex items-center gap-2"><span className="text-[#FC4C02]">M</span><span>SANTOS</span></div>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Software Architecture</p>
                  </div>
                  <div className="flex p-0.5 bg-slate-100 rounded-full border border-slate-200">
                     <button onClick={() => setLanguage('pt')} className={`px-4 py-1 rounded-full text-[9px] font-black transition-all ${language === 'pt' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'}`}>PT</button>
                     <button onClick={() => setLanguage('en')} className={`px-4 py-1 rounded-full text-[9px] font-black transition-all ${language === 'en' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'}`}>EN</button>
                  </div>
               </div>

               {/* Links Area */}
               <div className="flex-1 overflow-y-auto no-scrollbar px-6 lg:px-24 xl:px-32 py-4 lg:py-0 relative flex flex-col lg:justify-center">
                  
                  {/* Mobile Explore More */}
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    className="lg:hidden flex items-center gap-2 mb-4 px-2"
                  >
                     <ChevronDown className="w-3 h-3 text-[#FC4C02] animate-bounce" />
                     <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Explore Hub</p>
                  </motion.div>

                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6 lg:gap-x-12 lg:gap-y-20 w-full max-w-7xl mx-auto lg:py-0">
                    {navLinks.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={item.name} variants={itemVariants} className="group lg:h-auto">
                          <a 
                            href={item.href} 
                            onClick={() => setIsOpen(false)}
                            className={`flex flex-col lg:gap-4 p-5 lg:p-0 rounded-[28px] lg:rounded-none bg-white lg:bg-transparent border border-slate-100 lg:border-none shadow-xs lg:shadow-none transition-all duration-500 relative overflow-hidden h-[110px] lg:h-auto ${activeSection === item.id ? 'border-[#FC4C02]/20 bg-orange-50/20' : ''}`}
                          >
                             <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 lg:gap-3">
                                   <span className="text-[9px] lg:text-[10px] font-black text-[#FC4C02] font-mono">0{i+1}</span>
                                   <div className="hidden lg:block flex-1 h-[1px] bg-slate-50 group-hover:bg-[#FC4C02]/20 transition-colors" />
                                </div>
                                <Icon className={`w-4 h-4 lg:hidden transition-all duration-500 ${activeSection === item.id ? 'text-[#FC4C02]' : 'text-slate-300'}`} />
                             </div>

                             <h3 className={`text-base lg:text-3xl xl:text-4xl font-black tracking-tighter leading-none transition-all duration-500 ${activeSection === item.id ? 'text-[#FC4C02]' : 'text-slate-800 group-hover:text-[#FC4C02] lg:group-hover:pl-4'}`}>
                                {item.name}
                             </h3>

                             <ArrowUpRight className={`hidden lg:block absolute top-10 right-0 w-6 h-6 text-[#FC4C02] opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 group-hover:translate-y-0`} />
                          </a>
                        </motion.div>
                      );
                    })}
                  </div>
               </div>

               {/* Mobile Footer */}
               <div className="lg:hidden px-6 py-6 border-t border-slate-100 bg-white/95 backdrop-blur-md">
                  <a href="#contactos" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-3.5 px-7 bg-slate-800 rounded-3xl shadow-xl active:scale-95">
                     <span className="text-white font-black text-[10px] uppercase tracking-widest">Start a Project</span>
                     <div className="w-9 h-9 bg-[#FC4C02] rounded-full flex items-center justify-center"><Send className="w-4 h-4 text-white" /></div>
                  </a>
               </div>

               {/* Bottom Mask (Mobile) */}
               <div className="absolute bottom-[140px] left-0 right-0 h-16 bg-linear-to-t from-white to-transparent pointer-events-none lg:hidden z-10" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
