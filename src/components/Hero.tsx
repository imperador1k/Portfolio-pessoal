import { useState, useEffect, useCallback } from 'react';
import { Download, LayoutGrid, Menu, Bell, ChevronDown, ChevronRight, FileText, Check, RefreshCw, Folder } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { KotlinIcon, AndroidIcon, ReactIcon } from './Icons';

type HeroState = 'typing' | 'building' | 'success';

const CODE_LINES = [
  { nodes: [{ text: "data class ", color: "text-purple-600 font-medium" }, { text: "Developer", color: "text-slate-900 font-semibold" }, { text: "(", color: "text-slate-600" }, { text: "val ", color: "text-purple-600 font-medium" }, { text: "name", color: "text-cyan-600" }, { text: ": ", color: "text-slate-600" }, { text: "String", color: "text-slate-900 font-medium" }, { text: ", ", color: "text-slate-600" }, { text: "val ", color: "text-purple-600 font-medium" }, { text: "role", color: "text-cyan-600" }, { text: ": ", color: "text-slate-600" }, { text: "String", color: "text-slate-900 font-medium" }, { text: ")", color: "text-slate-600" }], indent: 0 },
  { nodes: [{ text: "val ", color: "text-purple-600 font-medium" }, { text: "miguel ", color: "text-blue-600 font-semibold" }, { text: "= ", color: "text-slate-600" }, { text: "Developer", color: "text-slate-900 font-medium" }, { text: "(", color: "text-slate-600" }, { text: "\"Miguel\"", color: "text-green-600" }, { text: ", ", color: "text-slate-600" }, { text: "\"Android Engineer\"", color: "text-green-600" }, { text: ")", color: "text-slate-600" }], indent: 0 },
  { nodes: [], indent: 0 },
  { nodes: [{ text: "@Composable", color: "text-amber-600 font-medium" }], indent: 0 },
  { nodes: [{ text: "fun ", color: "text-purple-600 font-medium" }, { text: "PortfolioScreen", color: "text-amber-500 font-semibold" }, { text: "() {", color: "text-slate-600" }], indent: 0 },
  { nodes: [{ text: "if ", color: "text-purple-600 font-medium" }, { text: "(", color: "text-slate-600" }, { text: "miguel", color: "text-blue-600 font-semibold" }, { text: ".", color: "text-slate-600" }, { text: "isReady", color: "text-purple-600 font-medium" }, { text: ") {", color: "text-slate-600" }], indent: 4 },
  { nodes: [{ text: "ShowHero", color: "text-cyan-600 border-b border-cyan-100" }, { text: "(", color: "text-slate-600" }, { text: "title = ", color: "text-cyan-600" }, { text: "\"Construindo software limpo\"", color: "text-green-600" }, { text: ")", color: "text-slate-600" }], indent: 8 },
  { nodes: [{ text: "}", color: "text-slate-600" }], indent: 4 },
  { nodes: [{ text: "}", color: "text-slate-600" }], indent: 0 }
];

export default function Hero() {
  const [heroState, setHeroState] = useState<HeroState>('typing');
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const skipToSuccess = useCallback(() => {
    setHeroState(prev => {
      if (prev !== 'success') {
        setVisibleLines(CODE_LINES.length);
        return 'success';
      }
      return prev;
    });
  }, []);

  // Globally allow skipping the animation with any click or scroll
  useEffect(() => {
    const handleUserInteraction = () => {
      skipToSuccess();
    };

    window.addEventListener('scroll', handleUserInteraction, { once: true, passive: true });
    window.addEventListener('click', handleUserInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { once: true, passive: true });

    return () => {
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [skipToSuccess]);

  // Phase 1: Typing code
  useEffect(() => {
    if (heroState !== 'typing') return;
    
    const typingInterval = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= CODE_LINES.length) {
          clearInterval(typingInterval);
          setTimeout(() => setHeroState('building'), 300); // Pause before building
          return CODE_LINES.length;
        }
        return prev + 1;
      });
    }, 250); // ~2.5s total time
    
    return () => clearInterval(typingInterval);
  }, [heroState]);

  // Phase 2: Building
  useEffect(() => {
    if (heroState !== 'building') return;
    const buildTimer = setTimeout(() => {
      setHeroState('success');
    }, 1500); // 1.5s build time before UAU moment
    return () => clearTimeout(buildTimer);
  }, [heroState]);

  return (
    <section 
      className="px-5 sm:px-6 pt-32 pb-20 lg:pt-48 lg:pb-32 lg:px-10 relative overflow-hidden cursor-pointer w-full flex flex-col justify-center min-h-[100svh]" 
      id="sobre"
    >
      {/* Background Blur Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 blur-[100px] rounded-full -z-10 translate-y-20 mx-auto w-3/4 max-w-3xl pointer-events-none"></div>
      
      {/* Aura Effects */}
      <div className="absolute top-1/2 left-[10%] w-64 h-64 bg-cyan-400 rounded-full mix-blend-multiply blur-[80px] opacity-40 animate-[pulse_6s_ease-in-out_infinite] -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-1/3 right-[10%] w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply blur-[80px] opacity-40 animate-[pulse_4s_ease-in-out_infinite] -translate-y-1/2 pointer-events-none"></div>

      <div className="mx-auto max-w-7xl w-full flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-16 min-h-[85vh] relative z-10">
        
        {/* === LEFT COLUMN: IDE WINDOW (Hidden on mobile) === */}
        <AnimatePresence mode="popLayout">
          {(heroState !== 'success' || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
            <motion.div 
              layoutId="ide-window"
              className={`hidden lg:flex w-full lg:w-[60%] min-w-[500px] max-w-[840px] shrink-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${heroState === 'success' ? 'opacity-50 scale-[0.98]' : ''}`}
            >
              {/* Fake IDE UI - JetBrains Fleet Light mode */}
              <div className="rounded-xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl overflow-hidden flex flex-col font-mono text-[13px] h-[520px] w-full relative">
                {/* IDE Header with Tabs */}
                <div className="bg-[#E8E8E8]/70 border-b border-gray-300/50 flex flex-col justify-end relative shrink-0 pt-3">
                  <div className="flex gap-2 absolute top-4 left-3 z-20 w-16 mb-2.5">
                    <div className="w-[11px] h-[11px] rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                    <div className="w-[11px] h-[11px] rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                    <div className="w-[11px] h-[11px] rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
                  </div>
                  
                  <div className="flex items-center pl-[5rem] w-full gap-0 shadow-none z-10 pt-1">
                    {/* Active Tab */}
                    <div className="flex items-center justify-center gap-2 bg-white/95 border border-gray-200/60 border-b-0 rounded-t-[5px] px-4 h-8 relative z-10 shadow-sm before:absolute before:top-0 before:inset-x-0 before:h-[2px] before:bg-blue-500 before:rounded-t-[5px]">
                      <KotlinIcon className="w-3.5 h-3.5" />
                      <span className="text-slate-700 text-[11px] font-semibold font-sans">HeroContent.kt</span>
                      <span className="text-gray-400 hover:text-gray-600 text-[10px] ml-1 cursor-pointer">×</span>
                    </div>
                    {/* Inactive Tabs */}
                    <div className="flex items-center justify-center gap-2 px-4 h-8 bg-transparent relative z-0 hover:bg-black/5 rounded-t-[5px] cursor-default transition-colors">
                      <ReactIcon className="w-3.5 h-3.5 text-cyan-500" />
                      <span className="text-gray-500 text-[11px] font-medium font-sans">Theme.tsx</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 px-4 h-8 bg-transparent relative z-0 hover:bg-black/5 rounded-t-[5px] cursor-default transition-colors">
                      <span className="text-blue-400 text-xs font-black">#</span>
                      <span className="text-gray-500 text-[11px] font-medium font-sans">Styles.css</span>
                    </div>
                  </div>
                </div>

                {/* Breadcrumbs */}
                <div className="h-6 bg-white/90 border-b border-gray-200/60 px-4 flex items-center text-[10px] text-gray-500 font-sans gap-1 shrink-0">
                   <span className="hover:text-gray-700 cursor-pointer">src</span>
                   <ChevronRight className="w-3 h-3" />
                   <span className="hover:text-gray-700 cursor-pointer">main</span>
                   <ChevronRight className="w-3 h-3" />
                   <span className="hover:text-gray-700 cursor-pointer">kotlin</span>
                   <ChevronRight className="w-3 h-3" />
                   <span className="text-gray-700">HeroContent.kt</span>
                </div>
                
                {/* Body Area */}
                <div className="flex flex-1 overflow-hidden pb-6">
                  {/* File Explorer (Sidebar) */}
                  <div className="w-48 bg-[#F5F5F5]/80 border-r border-gray-200/50 flex flex-col py-2 px-1 text-gray-600 text-[11px] font-sans shrink-0">
                    <div className="flex items-center gap-1.5 py-[3px] px-1 rounded hover:bg-gray-200/50 cursor-pointer">
                      <ChevronDown className="w-3 h-3 text-gray-400" />
                      <span className="text-blue-400 text-xs shrink-0 font-bold">src</span>
                    </div>
                    <div className="flex items-center gap-1.5 py-[3px] px-1 ml-3 rounded hover:bg-gray-200/50 cursor-pointer">
                      <ChevronDown className="w-3 h-3 text-gray-400" />
                      <span className="text-blue-400 text-xs shrink-0 font-bold">main</span>
                    </div>
                    <div className="flex items-center gap-1.5 py-[3px] px-1 ml-6 rounded hover:bg-gray-200/50 cursor-pointer">
                      <ChevronDown className="w-3 h-3 text-gray-400" />
                      <span className="text-blue-400 text-xs shrink-0 font-bold">kotlin</span>
                    </div>
                    <div className="flex items-center gap-1.5 py-[3px] px-1 ml-9 rounded hover:bg-gray-200/50 cursor-pointer">
                      <KotlinIcon className="w-3 h-3 shrink-0 text-gray-500" />
                      MainActivity.kt
                    </div>
                    <div className="flex items-center gap-1.5 py-[3px] px-1 ml-9 rounded bg-[#2979ff]/10 text-blue-700 font-medium cursor-pointer">
                      <KotlinIcon className="w-3 h-3 shrink-0" />
                      HeroContent.kt
                    </div>
                    <div className="flex items-center gap-1.5 py-[3px] px-1 ml-6 rounded hover:bg-gray-200/50 cursor-pointer mt-1">
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                      <span className="text-blue-400 text-xs shrink-0 font-bold">res</span>
                    </div>
                    <div className="flex items-center gap-1.5 py-[3px] px-1 ml-3 rounded hover:bg-gray-200/50 cursor-pointer mt-1">
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-400 text-xs shrink-0 font-bold font-mono">.idea</span>
                    </div>
                  </div>

                  {/* Code Area with per-line layout & Minimap */}
                  <div className="flex flex-1 relative overflow-hidden bg-transparent">
                    {/* Code Container */}
                    <div className="flex-1 min-w-max flex flex-col py-4 overflow-auto no-scrollbar">
                          {CODE_LINES.map((line, i) => {
                            const isTypingLine = heroState === 'typing' && i === visibleLines - 1;
                            const isVisible = i < visibleLines;
                            return (
                              <motion.div 
                                key={i} 
                                className={`flex items-center w-full px-2 ${isTypingLine ? 'bg-blue-50/50' : ''}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isVisible ? 1 : 0 }}
                                transition={{ duration: 0.1 }}
                              >
                                {/* Line Number */}
                                <div className="w-8 shrink-0 text-right pr-3 text-gray-400 text-[11px] select-none border-r border-slate-200/50 relative">
                                  {isTypingLine && (
                                    <span className="absolute -left-1 top-1/2 -translate-y-1/2 text-[8px] text-[#27C93F]">▶</span>
                                  )}
                                  {i + 1}
                                </div>
                                {/* Code Content */}
                                <div className="flex-1 pl-4 whitespace-pre text-[12px] leading-[1.8] font-medium" style={{ paddingLeft: `${line.indent * 0.5 + 1}rem` }}>
                                  {line.nodes.map((node, j) => (
                                    <span key={j} className={node.color}>{node.text}</span>
                                  ))}
                                  {isTypingLine && (
                                    <motion.span animate={{opacity: [1,0]}} transition={{repeat: Infinity}} className="inline-block w-1.5 h-3.5 bg-gray-500 translate-y-0.5 ml-0.5"/>
                                  )}
                                </div>
                              </motion.div>
                            );
                          })}
                          {heroState === 'typing' && visibleLines === 0 && (
                            <div className="flex items-center w-full px-2 bg-blue-50/50">
                                <div className="w-8 shrink-0 text-right pr-3 text-gray-400 text-[11px] select-none border-r border-slate-200/50 relative">
                                    <span className="absolute -left-1 top-1/2 -translate-y-1/2 text-[8px] text-[#27C93F]">▶</span>
                                    1
                                </div>
                                <div className="flex-1 pl-4 whitespace-pre text-[12px] leading-[1.8]">
                                    <motion.span animate={{opacity: [1,0]}} transition={{repeat: Infinity}} className="inline-block w-1.5 h-3.5 bg-gray-500 translate-y-0.5 ml-0.5"/>
                                </div>
                            </div>
                          )}
                    </div>
                    {/* Minimap */}
                    <div className="w-10 bg-transparent shrink-0 border-l border-white/20 p-2 flex flex-col gap-[3px] items-end pt-5 hidden sm:flex pointer-events-none">
                       {CODE_LINES.map((_, i) => {
                         const widths = [30, 24, 0, 12, 18, 16, 24, 4, 4];
                         return (
                           <motion.div 
                             key={`mini-${i}`} 
                             className="h-[3px] bg-gray-300/60 rounded-sm"
                             style={{ width: `${widths[i % widths.length]}px` }}
                             initial={{ opacity: 0.2 }}
                             animate={{ opacity: i < visibleLines ? 1 : 0.2 }}
                           />
                         );
                       })}
                    </div>
                  </div>
                </div>

                {/* Animated Terminal Bottom */}
                <div className="h-20 bg-gray-50/90 backdrop-blur-sm border-t border-gray-200/50 p-2 flex flex-col justify-start text-[10px] font-mono shrink-0 absolute bottom-6 inset-x-0 overflow-hidden w-full">
                  <div className="w-full flex gap-4 border-b border-gray-200 px-2 pb-1.5 mb-1 text-gray-500">
                     <span className="font-bold border-b-2 border-gray-400">Run</span>
                     <span>Problems</span>
                     <span>Terminal</span>
                  </div>
                  <AnimatePresence mode="popLayout">
                    {heroState === 'typing' && (
                       <motion.div key="typing" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex flex-col gap-0.5 text-gray-400 mt-1 px-2">
                          <motion.span animate={{opacity: [0.5, 1, 0.5]}} transition={{repeat: Infinity, duration: 1.5}}>{'>'} Daemon listening...</motion.span>
                       </motion.div>
                    )}
                    {heroState === 'building' && (
                       <motion.div key="building" className="flex flex-col text-gray-600 gap-0.5 relative pt-1 px-2" initial={{opacity:0}} animate={{opacity:1}}>
                          <motion.div animate={{y: [0, -32]}} transition={{duration: 2, ease: "linear"}} className="flex flex-col gap-0.5">
                            <div><span className="text-blue-500">{'>'}</span> Resolving dependencies...</div>
                            <div><span className="text-blue-500">{'>'}</span> Compiling Kotlin...</div>
                            <div><span className="text-blue-500">{'>'}</span> Task :app:compileDebugKotlin <span className="text-orange-400 font-bold ml-1">EXECUTING</span></div>
                            <div><span className="text-blue-500">{'>'}</span> Task :app:assembleDebug <span className="text-orange-400 font-bold ml-1">EXECUTING</span></div>
                            <div className="text-gray-400 font-sans mt-0.5">1 warnings found</div>
                          </motion.div>
                       </motion.div>
                    )}
                    {heroState === 'success' && (
                       <motion.div key="success" className="flex flex-col gap-0.5 text-[#27C93F] mt-1 px-2" initial={{opacity:0}} animate={{opacity:1}}>
                          <span className="font-semibold text-[11px]">BUILD SUCCESSFUL in 943ms.</span>
                          <span className="text-gray-400 font-sans text-xs">Installed on device.</span>
                       </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* IDE Status Bar */}
                <div className="h-6 bg-gray-100/90 border-t border-gray-300/60 px-3 flex items-center justify-between text-[10px] text-gray-500 font-sans shrink-0 absolute bottom-0 inset-x-0 w-full z-20">
                  <div className="flex items-center gap-3">
                    {heroState === 'success' ? (
                       <span className="text-green-600 font-medium flex items-center gap-1"><Check className="w-3 h-3"/> Build Successful</span>
                    ) : (
                       <span className="flex items-center gap-1 text-slate-500"><RefreshCw className={`w-3 h-3 ${heroState === 'building' ? 'animate-spin text-blue-500' : ''}`} /> {heroState === 'typing' ? 'Editing...' : 'Building...'}</span>
                    )}
                    <span>Git: main</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <span>UTF-8</span>
                    <span>4 spaces</span>
                    <span>{Math.max(1, visibleLines)}:4</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* === RIGHT COLUMN: ANDROID EMULATOR === */}
        <AnimatePresence mode="popLayout">
            <motion.div 
              layoutId="emulator-window"
              className={`
                border-[10px] border-slate-900 rounded-[3rem] bg-[#0E131F] relative overflow-visible shadow-[0_20px_50px_-12px_rgba(127,82,255,0.3)] mx-auto w-full max-w-[340px] sm:max-w-[360px] aspect-[9/19] flex flex-col z-20 items-center justify-start shrink-0
              `}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: heroState === 'success' ? 1 : 0.98 }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
            >
              {/* Inner screen bounds to clip content but let physical buttons escape */}
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-start inner-shadow z-10 w-full h-full bg-[#0E131F]">
                
                {/* Background changes to white in success state */}
                <div className={`absolute inset-0 transition-colors duration-700 ease-in-out pointer-events-none z-0 ${heroState === 'success' ? 'bg-slate-50' : 'bg-transparent'}`}></div>

                {/* Emulator Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 rounded-b-[18px] w-32 mx-auto z-40 flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                   <div className="w-[10px] h-[10px] rounded-full bg-[#0E131F] border border-slate-700 relative overflow-hidden flex items-center justify-center">
                      <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
                   </div>
                </div>

                {/* Flash Effect on success */}
                {heroState === 'success' && (
                  <motion.div 
                    key="flash-effect"
                    className="absolute inset-0 bg-white z-50 rounded-[2.5rem] pointer-events-none"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                )}

                {/* Android Top App Bar / Status Bar */}
                {heroState === 'success' ? (
                  <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full h-14 bg-white shadow-sm flex justify-between items-end px-5 pb-3 z-30 shrink-0 relative"
                  >
                     <motion.button 
                       whileTap={{ scale: 0.9 }} 
                       onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }} 
                       className="relative z-50 p-1 -ml-1 rounded-full hover:bg-slate-100"
                     >
                       <Menu className="w-5 h-5 text-slate-800" />
                     </motion.button>
                     <span className="text-[13px] font-bold text-slate-900 font-sans tracking-tight pt-2">Miguel</span>
                     <motion.button whileTap={{ scale: 0.9 }} className="p-1 -mr-1 rounded-full hover:bg-slate-100">
                        <Bell className="w-5 h-5 text-slate-800" />
                     </motion.button>
                  </motion.div>
                ) : (
                  <div className="w-full flex justify-between items-center px-6 pt-2 pb-1 text-[10px] font-semibold absolute top-0 left-0 z-30 text-slate-400 pointer-events-none">
                     <span>12:00</span>
                     <div className="flex gap-1.5 items-center">
                       <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21L15.6 16.2C14.6 15.4 13.4 15 12 15C10.6 15 9.4 15.4 8.4 16.2L12 21ZM12 3C7.95 3 4.21 4.34 1.2 6.6L3 9C5.5 7.12 8.62 6 12 6C15.38 6 18.5 7.12 21 9L22.8 6.6C19.79 4.34 16.05 3 12 3Z"/></svg>
                       <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2H10V4H8.33C7.6 4 7 4.6 7 5.33V20.67C7 21.4 7.6 22 8.33 22H15.67C16.4 22 17 21.4 17 20.67V5.33C17 4.6 16.4 4 15.67 4Z"/></svg>
                     </div>
                  </div>
                )}

                {/* Global Mobile Context Overlay */}
                <AnimatePresence>
                  {isMenuOpen && heroState === 'success' && (
                     <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 bg-white/95 backdrop-blur-md z-[60] pt-20 px-6 flex flex-col gap-2 rounded-[2.5rem] shadow-inner border border-slate-100"
                        onClick={(e) => e.stopPropagation()}
                     >
                         <div className="flex justify-between items-center mb-6">
                            <span className="text-xl font-bold text-slate-900 tracking-tight">Menu</span>
                            <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors">
                               ×
                            </button>
                         </div>
                         {['Sobre', 'Skills', 'Projetos', 'Contacto'].map(item => (
                            <motion.button 
                               key={item}
                               whileTap={{ scale: 0.98, backgroundColor: "rgba(241, 245, 249, 1)" }}
                               onClick={(e) => {
                                  e.stopPropagation();
                                  setIsMenuOpen(false);
                                  document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                               }}
                               className="text-left py-4 px-4 rounded-2xl text-lg font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-between"
                            >
                               {item}
                               <ChevronRight className="w-5 h-5 text-slate-300" />
                            </motion.button>
                         ))}
                     </motion.div>
                  )}
                </AnimatePresence>

                {/* Emulator Contents - Dynamic container */}
                <div className={`flex-1 w-full relative flex flex-col justify-start items-center overflow-y-auto no-scrollbar z-10 ${heroState === 'success' ? 'px-4 pt-5 pb-24 space-y-6' : 'pt-10 pb-6 px-5'}`}>
                  <AnimatePresence mode="popLayout">
                    
                    {/* Phase 1 & 2: Terminal Log Wait & Build */}
                    {heroState !== 'success' && (
                      <motion.div 
                        key="emu-terminal"
                        exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                        className="w-full h-full text-slate-300 font-mono text-[10px] sm:text-xs text-left flex flex-col leading-relaxed justify-start"
                      >
                        {heroState === 'typing' && (
                           <div className="mt-8 px-2 flex items-center">
                              <span className="text-purple-400 font-bold">{'>_'}</span> 
                              <motion.span animate={{opacity:[1,0]}} transition={{repeat:Infinity}} className="inline-block w-1.5 h-3 bg-slate-400 ml-1.5"></motion.span>
                           </div>
                        )}
                        
                        {heroState === 'building' && (
                           <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col gap-1.5 mt-8 px-2">
                             <div className="text-[#3DDC84] font-semibold break-all">{'>'} Task :app:compileDebugKotlin</div>
                             <div className="text-slate-500">w: [kapt] Incremental annotation processing uses...</div>
                             <div className="text-[#3DDC84] font-semibold pt-1">{'>'} Task :app:assembleDebug</div>
                             <div className="flex flex-col gap-1 mt-1">
                                <span className="text-[10px] text-white/80 font-bold uppercase tracking-wider">Building</span>
                                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                  <motion.div 
                                     className="h-full bg-[#3DDC84]"
                                     initial={{ width: "0%" }}
                                     animate={{ width: "100%" }}
                                     transition={{ duration: 1.4, ease: "linear" }}
                                  />
                                </div>
                             </div>
                           </motion.div>
                        )}
                      </motion.div>
                    )}

                    {/* Phase 3: The UAU Moment Content (Native App Experience) */}
                    {heroState === 'success' && (
                      <motion.div 
                        key="emu-success"
                        className="w-full flex flex-col items-start justify-start"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
                      >
                        {/* Avatar/Tag */}
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 }}
                          className="font-sans flex flex-col gap-1 mb-4"
                        >
                          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 p-[2px] shadow-sm">
                             <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-mono text-sm font-black text-slate-800">
                               {`</>`}
                             </div>
                          </div>
                        </motion.div>
                        
                        <motion.h1 
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                          className="text-[24px] font-extrabold tracking-tight leading-[1.1] mb-3 text-slate-900 font-sans w-full text-left"
                        >
                          Construindo software <br />
                          <span className="text-slate-900 pt-0.5 block">limpo e eficiente.</span>
                        </motion.h1>
                        
                        {/* Tech Pills */}
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                          className="flex gap-2 flex-wrap mb-5 w-full"
                        >
                          <span className="px-2.5 py-1.5 bg-purple-50 text-purple-700 border border-purple-100 text-[10px] font-bold rounded-lg flex items-center shadow-sm">Kotlin</span>
                          <span className="px-2.5 py-1.5 bg-purple-50 text-purple-700 border border-purple-100 text-[10px] font-bold rounded-lg flex items-center shadow-sm">Android</span>
                          <span className="px-2.5 py-1.5 bg-purple-50 text-purple-700 border border-purple-100 text-[10px] font-bold rounded-lg flex items-center shadow-sm">React</span>
                        </motion.div>

                        {/* Bento Box Stats */}
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                          className="grid grid-cols-2 gap-3 w-full mb-4"
                        >
                          <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm flex flex-col gap-2">
                             <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                               <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
                             </div>
                             <span className="text-[11px] font-bold text-slate-800 leading-tight">Mobile<br/>First</span>
                          </div>
                          
                          <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm flex flex-col gap-2">
                             <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                               <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                             </div>
                             <span className="text-[11px] font-bold text-slate-800 leading-tight">Clean<br/>Architecture</span>
                          </div>
                        </motion.div>

                        {/* Filler Content for scroll effect */}
                        <motion.div 
                           initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                           className="w-full bg-white border border-slate-100 rounded-xl p-4 shadow-sm"
                        >
                           <h3 className="text-xs font-bold text-slate-800 mb-2">Sobre Mim</h3>
                           <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                             Apanhado pelo design de interfaces e arquiteturas nativas. Acredito que o bom software não é apenas funcional, mas também uma excelente experiência.
                           </p>
                        </motion.div>

                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sticky Bottom Action Bar during success */}
                {heroState === 'success' && (
                  <motion.div 
                    initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
                    className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-md border-t border-slate-200/50 p-4 pb-6 flex gap-2.5 z-40"
                  >
                     <motion.div
                        className="flex-grow w-[70%]"
                        whileTap={{ scale: 0.97 }}
                        onClick={(e) => { e.stopPropagation(); document.getElementById('projetos')?.scrollIntoView({behavior: 'smooth'}) }}
                     >
                         <button className="w-full flex items-center justify-center bg-slate-900 text-white rounded-xl font-bold text-sm h-12 shadow-md hover:bg-slate-800 transition-colors pointer-events-none relative overflow-hidden group">
                            Ver Projetos
                            <span className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0] transition-transform duration-300 rounded-xl pointer-events-none"></span>
                         </button>
                     </motion.div>
                     <motion.a
                        href="/cv.pdf"
                        whileTap={{ scale: 0.97 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-[30%] flex items-center justify-center bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm h-12 shadow-sm hover:bg-slate-50 transition-colors overflow-hidden relative group"
                     >
                        CV
                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-slate-200 translate-y-full group-hover:translate-y-0 transition-transform"></span>
                     </motion.a>
                  </motion.div>
                )}

                {/* Emulador Home Indicator (always bottom) */}
                <div className="absolute bottom-2 inset-x-0 mx-auto w-24 h-1.5 bg-slate-300 rounded-full z-50 pointer-events-none drop-shadow-sm"></div>

              </div>

              {/* Physical Buttons (Outside the clipping view) */}
              <div className="absolute -right-[14px] top-24 w-[14px] h-12 bg-slate-900 rounded-r-lg pointer-events-none border-y-[1px] border-r-[1px] border-slate-700 -z-10"></div>
              <div className="absolute -right-[14px] top-40 w-[14px] h-20 bg-slate-900 rounded-r-lg pointer-events-none border-y-[1px] border-r-[1px] border-slate-700 -z-10"></div>
            </motion.div>
        </AnimatePresence>
        
      </div>
      
      {/* Skip Hint */}
      <AnimatePresence>
        {heroState !== 'success' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute bottom-6 left-0 right-0 mx-auto text-center text-[10px] text-slate-400 font-sans font-semibold tracking-widest uppercase z-10 pointer-events-none"
          >
            Processing... Click anywhere to skip
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
