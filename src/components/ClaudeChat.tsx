import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  MessageSquare, 
  Folder, 
  Box, 
  Code, 
  User,
  Settings,
  ArrowUpRight,
  Pencil,
  GraduationCap,
  Coffee,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  FileText,
  X,
  Menu,
  Linkedin,
  Instagram
} from 'lucide-react';

import { useLanguage } from '../i18n/LanguageContext';

const ClaudeLogo = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className}>
    <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" fill="currentColor"></path>
  </svg>
);

export default function ClaudeChat() {
  const { t } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<'new' | 'cv'>('new');
  const [chatStep, setChatStep] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Set sidebar to false on small screens initially
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const anthropicFontStack = '"Anthropic Serif", Georgia, "Arial Hebrew", "Noto Sans Hebrew", "Times New Roman", Times, "Hiragino Sans", "Yu Gothic", Meiryo, "Noto Sans CJK JP", "PingFang TC", "Microsoft JhengHei", "Noto Sans CJK TC", "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", "Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans CJK KR", serif';

  const projects = ["Imperador", "Port-test", "Code-Vault", "System-Core"];
  const artefacts = ["Engineering_Hub_Diagram.svg", "Dev_Blueprint_V2.pdf", "Performance_Audit.json"];

  useEffect(() => {
    if (isShareModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isShareModalOpen]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText('https://miguelpsantos.tech');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  useEffect(() => {
    if (activeView === 'cv') {
      const timer = setInterval(() => {
        setChatStep(prev => (prev < 4 ? prev + 1 : prev));
      }, 2000);
      return () => clearInterval(timer);
    } else {
      setChatStep(0);
    }
  }, [activeView]);

  const SidebarContent = () => (
    <>
      <div className="p-4 flex items-center justify-between">
         <div className="flex items-center gap-2 cursor-pointer" onClick={() => {
           setActiveView('new');
           setIsMobileMenuOpen(false);
         }}>
            <ClaudeLogo className="w-5 h-5 text-slate-800" />
            <span className="text-xl font-medium text-slate-800">Claude</span>
         </div>
         <button onClick={() => {
           setIsSidebarOpen(false);
           setIsMobileMenuOpen(false);
         }} className="p-1.5 hover:bg-slate-200/50 rounded-lg transition-colors text-slate-400">
            <PanelLeftClose className="w-4 h-4" />
         </button>
      </div>

      <div className="px-3 space-y-1">
         <button 
          onClick={() => {
            setActiveView('new');
            setIsMobileMenuOpen(false);
          }}
          className="w-full flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-[13px] font-medium text-slate-700 shadow-sm hover:shadow-md transition-all group"
         >
            <Plus className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
            {t('claude.actions.new_chat')}
         </button>
      </div>

      <div className="mt-6 px-3 space-y-0.5 overflow-y-auto no-scrollbar flex-1">
         <div className="px-3 py-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-4">Conversas</div>
         <div 
          onClick={() => {
            setActiveView('cv');
            setIsMobileMenuOpen(false);
          }}
          className={`flex items-center gap-3 px-3 py-1.5 rounded-lg cursor-pointer transition-colors group ${activeView === 'cv' ? 'bg-slate-200/50 text-slate-900' : 'text-slate-500 hover:bg-slate-200/50'}`}
         >
            <MessageSquare className="w-4 h-4 group-hover:text-slate-900" />
            <span className="text-[13px] font-medium group-hover:text-slate-900">CV Chat</span>
         </div>

         <div className="px-3 py-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-4">Projetos</div>
         {projects.map((proj, i) => (
           <div key={i} className="flex items-center gap-3 px-3 py-1.5 hover:bg-slate-200/50 rounded-lg cursor-pointer transition-colors text-slate-500 group">
              <Folder className="w-4 h-4 group-hover:text-slate-900" />
              <span className="text-[13px] font-medium group-hover:text-slate-900">{proj}</span>
           </div>
         ))}

         <div className="px-3 py-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-4">Artefatos</div>
         {artefacts.map((art, i) => (
           <div key={i} className="flex items-center gap-3 px-3 py-1.5 hover:bg-slate-200/50 rounded-lg cursor-pointer transition-colors text-slate-500 group">
              <Box className="w-4 h-4 group-hover:text-slate-900" />
              <span className="text-[13px] font-medium group-hover:text-slate-900 truncate">{art}</span>
           </div>
         ))}

         <div className="px-3 py-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-4">Código</div>
         <a 
          href="https://buymeacoffee.com/imperador1k"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-1.5 hover:bg-slate-200/50 rounded-lg cursor-pointer transition-colors text-slate-500 group"
         >
            <Code className="w-4 h-4 group-hover:text-slate-900" />
            <span className="text-[13px] font-medium group-hover:text-slate-900">Código Premium</span>
            <span className="ml-auto text-[9px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400 group-hover:text-amber-600 transition-colors">Upgrade</span>
         </a>
      </div>

      <div className="p-4 border-t border-slate-100">
         <div className="flex items-center gap-3 p-2 hover:bg-slate-200/50 rounded-xl cursor-pointer transition-colors group">
            <div className="w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">M</div>
            <div className="flex-1 overflow-hidden">
               <p className="text-[13px] font-bold text-slate-800 truncate">Miguel</p>
               <p className="text-[11px] text-slate-400">plano Gratuito</p>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-900" />
         </div>
      </div>
    </>
  );

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden" id="claude" style={{ fontFamily: anthropicFontStack }}>
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-mono font-bold rounded-full tracking-wider uppercase border border-slate-200">
              {t('claude.badge')}
            </span>
            <div className="h-px flex-1 bg-linear-to-r from-slate-200 to-transparent" />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex h-[700px] max-h-[85vh] relative"
        >
          
          {/* Desktop Sidebar */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 260, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="hidden md:flex flex-col border-r border-slate-100 bg-[#f7f7f7] shrink-0 overflow-hidden"
              >
                <SidebarContent />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Overlay Sidebar */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] md:hidden"
                />
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#f7f7f7] z-[70] flex flex-col shadow-2xl md:hidden"
                >
                  <SidebarContent />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col relative bg-white overflow-y-auto custom-scrollbar overflow-x-hidden">
             
             {/* Header */}
             <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 py-3">
                <div className="flex items-center gap-2 sm:gap-4">
                  <button 
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        setIsMobileMenuOpen(true);
                      } else {
                        setIsSidebarOpen(!isSidebarOpen);
                      }
                    }} 
                    className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400"
                  >
                    {isSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                  <div className="flex items-center gap-1 sm:gap-2 text-[12px] sm:text-[13px] font-medium text-slate-600 cursor-pointer hover:bg-slate-50 px-2 py-1 rounded-md transition-colors truncate max-w-[150px] sm:max-w-none">
                     <span className="truncate">{activeView === 'cv' ? 'CV Chat' : 'Novo Bate-papo'}</span>
                     <ChevronDown className="w-3 h-3 shrink-0" />
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                   <button className="hidden sm:block p-1.5 hover:bg-slate-100 rounded-lg text-slate-400">
                      <FileText className="w-4 h-4" />
                   </button>
                   <button 
                    onClick={() => setIsShareModalOpen(true)}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 border border-slate-200 rounded-lg text-[11px] sm:text-[12px] font-semibold text-slate-700 hover:bg-slate-50 transition-all active:scale-95"
                   >
                      {t('claude.share.btn')}
                   </button>
                </div>
             </div>

             <div className="flex-1 flex flex-col items-center max-w-3xl mx-auto w-full pt-8 sm:pt-12 pb-32 px-4 sm:px-6">
                
                <AnimatePresence mode="wait">
                  {activeView === 'new' ? (
                    <motion.div 
                      key="welcome"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center w-full"
                    >
                      <motion.h2 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl sm:text-5xl text-slate-800 mb-8 sm:mb-12 flex items-center justify-center gap-2 sm:gap-4 leading-tight"
                      >
                        <span className="text-[#D97757] text-3xl sm:text-4xl">✶</span>
                        {t('claude.welcome')}
                      </motion.h2>

                      <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full bg-white border border-slate-200 rounded-[24px] p-4 sm:p-6 shadow-[0_2px_15px_rgba(0,0,0,0.03)] relative overflow-hidden"
                      >
                         <div className="text-left mb-10 sm:mb-16 flex items-center gap-2">
                            <motion.span 
                              className="text-[15px] sm:text-[17px] text-slate-400"
                            >
                               Digite / para habilidades
                            </motion.span>
                            <motion.span 
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ repeat: Infinity, duration: 1 }}
                              className="w-0.5 h-6 bg-[#D97757]" 
                            />
                         </div>
                         
                         <div className="flex items-center justify-between">
                            <Plus className="w-5 h-5 text-slate-300 cursor-pointer hover:text-slate-600 transition-colors" />
                            <div className="flex items-center gap-2 sm:gap-4">
                               <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px] font-semibold text-slate-400 cursor-pointer hover:text-slate-600 transition-colors">
                                  <span>Sonnet 4.6 <span className="hidden sm:inline font-normal opacity-60">Adaptativo</span></span>
                                  <ChevronDown className="w-3 h-3" />
                               </div>
                               <div className="flex items-center gap-1">
                                  <div className="w-1 h-3 bg-slate-200 rounded-full" />
                                  <div className="w-1 h-3 bg-slate-200 rounded-full" />
                                  <div className="w-1 h-3 bg-slate-200 rounded-full" />
                               </div>
                            </div>
                         </div>
                      </motion.div>

                      <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                         {[
                           { label: t('claude.actions.write'), icon: Pencil },
                           { label: t('claude.actions.learn'), icon: GraduationCap },
                           { label: t('claude.actions.code'), icon: Code },
                           { label: t('claude.actions.personal'), icon: Coffee },
                         ].map((action, i) => (
                           <button key={i} className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-[12px] sm:text-[13px] font-medium text-slate-500 hover:bg-slate-50 transition-all">
                              <action.icon className="w-3 h-3" />
                              {action.label}
                           </button>
                         ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="chat"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="w-full flex flex-col gap-8 sm:gap-12 text-[15px] sm:text-[16px] leading-[1.6]"
                    >
                       <div className="text-slate-600 italic border-l-2 border-slate-100 pl-4 mb-2 text-sm sm:text-base">
                          Reading frontend design skill for CV artifact &gt;
                       </div>

                       <div className="text-slate-800 space-y-6">
                          <p className="font-bold text-lg">Aqui está o teu CV, Miguel. Deixa-me explicar as decisões principais:</p>
                          <div className="space-y-4 text-sm sm:text-base">
                             <p><strong className="text-slate-900">Posicionamento estratégico:</strong> O título evita qualquer referência a "estudante" ou "júnior", posicionando-te diretamente como alguém que pensa em arquitetura.</p>
                             <p><strong className="text-slate-900">Métricas Reais:</strong> Cada ponto tem uma ação forte e um resultado justificável.</p>
                          </div>
                       </div>

                       {chatStep >= 3 && (
                         <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="w-full bg-[#fcfaf8] border border-slate-200 rounded-xl overflow-hidden shadow-sm"
                         >
                            <div className="bg-[#f0eee4] px-4 py-2 flex items-center justify-between border-b border-slate-200">
                               <div className="flex items-center gap-2">
                                  <ClaudeLogo className="w-4 h-4 text-slate-800" />
                                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">System</span>
                                </div>
                            </div>
                            <div className="p-4 sm:p-8 space-y-6 bg-white">
                               <div className="bg-slate-50 p-3 sm:p-4 rounded-lg border border-slate-100 font-mono text-[12px] sm:text-[13px] text-slate-600 overflow-x-auto">
                                  {t('claude.chat.ai_response')}
                               </div>
                               <p className="text-slate-700 text-sm sm:text-base">
                                  {t('claude.chat.ai_cta')}
                                </p>
                               <motion.a 
                                 href="https://buymeacoffee.com/imperador1k"
                                 target="_blank"
                                 className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-amber-400 text-slate-900 rounded-2xl font-black shadow-lg text-xs sm:text-sm uppercase"
                               >
                                  <Coffee className="w-5 h-5" />
                                  <span>{t('claude.chat.support_btn')}</span>
                               </motion.a>
                            </div>
                         </motion.div>
                       )}
                    </motion.div>
                  )}
                </AnimatePresence>

             </div>

             {/* Token Limit UI (Fixed for mobile) */}
             <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-slate-100 pb-4 pt-4 px-4 sm:px-6 flex flex-col items-center z-20">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3 sm:gap-5 shadow-lg relative overflow-hidden"
                >
                   <div className="absolute top-0 left-0 w-1 h-full bg-[#D97757]" />
                   <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                      <ClaudeLogo className="w-5 h-5 sm:w-6 sm:h-6 text-[#D97757]" />
                   </div>
                   <div className="flex-1">
                      <p className="text-[13px] sm:text-[14px] font-bold text-slate-900 leading-tight">
                         {t('claude.limit.message')}
                      </p>
                      <p className="hidden sm:block text-[12px] text-slate-500 mt-1 leading-relaxed">
                         {t('claude.limit.cta')}
                      </p>
                   </div>
                   <motion.a 
                      href="https://buymeacoffee.com/imperador1k"
                      className="shrink-0 px-3 sm:px-4 py-2 bg-slate-900 text-white rounded-xl text-[11px] sm:text-[12px] font-bold"
                   >
                      {t('claude.limit.btn')}
                   </motion.a>
                </motion.div>

                <div className="w-full max-w-2xl mt-3">
                   <div className="w-full bg-[#fcfaf8] border border-slate-100 rounded-full px-5 py-2.5 flex items-center justify-between text-slate-300">
                      <span className="text-[12px] truncate">Limite de mensagens atingido...</span>
                      <ArrowUpRight className="w-4 h-4 opacity-20" />
                   </div>
                </div>
             </div>

          </div>

        </motion.div>
      </div>

      {/* ── Share Modal ───────────────────────────────────────── */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden border border-white p-8 sm:p-10"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                      <ClaudeLogo className="w-6 h-6 text-slate-800" />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-slate-900 leading-none">{t('claude.share.title')}</h3>
                      <p className="text-xs text-slate-400 mt-1.5 font-medium">Partilha este Hub de Engenharia</p>
                   </div>
                </div>
                <button 
                  onClick={() => setIsShareModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-300 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                   <p className="text-[13px] font-medium text-slate-600 leading-relaxed">
                      Este portfólio foi desenhado para demonstrar capacidades de arquitetura, performance e UI/UX de elite.
                   </p>
                   <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                      <div className="flex-1 truncate text-xs font-mono text-slate-400">
                         https://miguelpsantos.tech
                      </div>
                      <button 
                        onClick={copyToClipboard}
                        className={`px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${isCopied ? 'bg-green-500 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                      >
                         {isCopied ? 'Copiado!' : 'Copiar'}
                      </button>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <a 
                    href="https://www.linkedin.com/in/miguel-sant0s/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 p-4 border border-slate-100 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all group"
                   >
                      <Linkedin className="w-4 h-4 text-[#0077B5]" />
                      <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">LinkedIn</span>
                   </a>
                   <a 
                    href="https://instagram.com/miguelsantos.pr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 p-4 border border-slate-100 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all group"
                   >
                      <Instagram className="w-4 h-4 text-[#E4405F]" />
                      <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">Instagram</span>
                   </a>
                </div>
              </div>

              <div className="mt-8 text-center">
                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Miguel P. Santos • Portfolio v2.0</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
