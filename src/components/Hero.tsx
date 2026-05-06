import { useState, useEffect, useCallback } from 'react';
import { Download, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { KotlinIcon, AndroidIcon } from './Icons';

type HeroState = 'typing' | 'building' | 'success';

const CODE_LINES = [
  { nodes: [{ text: "@Composable", color: "text-purple-600 font-medium" }], indent: 0 },
  { nodes: [{ text: "fun ", color: "text-purple-600 font-medium" }, { text: "HeroProfile", color: "text-blue-600 font-medium" }, { text: "() {", color: "text-slate-800" }], indent: 0 },
  { nodes: [{ text: "Column", color: "text-cyan-600 font-medium" }, { text: "(modifier = ", color: "text-slate-800" }, { text: "Modifier", color: "text-cyan-600 font-medium" }, { text: ".", color: "text-slate-800" }, { text: "fillMaxSize", color: "text-blue-600" }, { text: "()) {", color: "text-slate-800" }], indent: 4 },
  { nodes: [{ text: "Text", color: "text-cyan-600 font-medium" }, { text: "(text = ", color: "text-slate-800" }, { text: "\"Construindo software\"", color: "text-green-600" }, { text: ", style = ", color: "text-slate-800" }, { text: "Typography", color: "text-cyan-600 font-medium" }, { text: ".", color: "text-slate-800" }, { text: "h1", color: "text-purple-600" }, { text: ")", color: "text-slate-800" }], indent: 8 },
  { nodes: [{ text: "Text", color: "text-cyan-600 font-medium" }, { text: "(text = ", color: "text-slate-800" }, { text: "\"limpo e eficiente.\"", color: "text-green-600" }, { text: ", color = ", color: "text-slate-800" }, { text: "JetBrainsPrimary", color: "text-purple-600" }, { text: ")", color: "text-slate-800" }], indent: 8 },
  { nodes: [{ text: "Button", color: "text-cyan-600 font-medium" }, { text: "(onClick = { ", color: "text-slate-800" }, { text: "openPortfolio", color: "text-blue-600" }, { text: "() }) {", color: "text-slate-800" }], indent: 8 },
  { nodes: [{ text: "Text", color: "text-cyan-600 font-medium" }, { text: "(", color: "text-slate-800" }, { text: "\"Ver Projetos\"", color: "text-green-600" }, { text: ")", color: "text-slate-800" }], indent: 12 },
  { nodes: [{ text: "}", color: "text-slate-800" }], indent: 8 },
  { nodes: [{ text: "}", color: "text-slate-800" }], indent: 4 },
  { nodes: [{ text: "}", color: "text-slate-800" }], indent: 0 }
];

export default function Hero() {
  const [heroState, setHeroState] = useState<HeroState>('typing');
  const [visibleLines, setVisibleLines] = useState<number>(0);

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
              className={`hidden lg:flex w-full min-w-[500px] max-w-[650px] shrink-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${heroState === 'success' ? 'opacity-50 scale-[0.98]' : ''}`}
            >
              {/* Fake IDE UI - JetBrains Fleet Light mode */}
              <div className="rounded-xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl overflow-hidden flex flex-col font-mono text-[13px] h-[480px] w-full">
                {/* IDE Header */}
                <div className="h-11 bg-white/40 border-b border-white/30 flex items-center px-4 relative shrink-0">
                  <div className="flex gap-2 relative z-10 w-20">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-gray-600 text-xs font-semibold font-sans">HeroProfile.kt</span>
                  </div>
                </div>
                
                {/* Body Area */}
                <div className="flex flex-1 overflow-hidden">
                  {/* File Explorer (Sidebar) */}
                  <div className="w-40 bg-gray-50/80 border-r border-gray-200/50 flex flex-col py-3 px-2 text-gray-500 text-xs font-sans shrink-0">
                    <div className="flex items-center gap-1.5 py-1 px-2 rounded hover:bg-gray-200/50 cursor-default mb-0.5">
                      <span className="text-[10px]">▶</span> src
                    </div>
                    <div className="flex items-center gap-1.5 py-1 px-2 rounded hover:bg-gray-200/50 cursor-default mb-0.5">
                      <span className="text-[10px] transform rotate-90">▼</span> components
                    </div>
                    <div className="flex items-center gap-1.5 py-1 px-2 ml-3 rounded bg-blue-100/50 text-blue-700 font-medium cursor-default mb-0.5">
                      HeroProfile.kt
                    </div>
                    <div className="flex items-center gap-1.5 py-1 px-2 ml-3 rounded hover:bg-gray-200/50 cursor-default">
                      Icons.tsx
                    </div>
                  </div>

                  {/* Line Numbers + Code */}
                  <div className="flex flex-1 overflow-x-auto bg-transparent">
                    <div className="w-12 border-r border-transparent flex flex-col items-end py-4 pr-3 text-gray-300 text-xs select-none shrink-0 border-r-slate-200/50">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <div key={i} className="leading-[1.9]">{i + 1}</div>
                      ))}
                    </div>
                    
                    {/* Coding Area */}
                    <div className="flex-1 p-4 bg-transparent min-w-max">
                          {CODE_LINES.map((line, i) => (
                            <motion.div 
                              key={i} 
                              className="whitespace-pre leading-[1.9]"
                              style={{ paddingLeft: `${line.indent * 0.5}rem` }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: i < visibleLines ? 1 : 0 }}
                              transition={{ duration: 0.1 }}
                            >
                              {line.nodes.map((node, j) => (
                                <span key={j} className={node.color}>{node.text}</span>
                              ))}
                              {heroState === 'typing' && i === visibleLines - 1 && (
                                <motion.span animate={{opacity: [1,0]}} transition={{repeat: Infinity}} className="inline-block w-1.5 h-4 bg-gray-400 translate-y-0.5 ml-0.5"/>
                              )}
                            </motion.div>
                          ))}
                          {heroState === 'typing' && visibleLines === 0 && (
                            <motion.span animate={{opacity: [1,0]}} transition={{repeat: Infinity}} className="inline-block w-1.5 h-4 bg-gray-400 translate-y-0.5 ml-0.5"/>
                          )}
                    </div>
                  </div>
                </div>

                {/* Terminal Bottom */}
                <div className="h-12 bg-gray-100/50 border-t border-gray-200/50 p-2 px-4 flex flex-col justify-center text-[11px] font-mono shrink-0 relative overflow-hidden">
                  {heroState === 'building' && (
                     <motion.div className="flex flex-col gap-0.5 text-gray-500" initial={{opacity:0}} animate={{opacity:1}}>
                        <span>{'>'} Task :app:compileDebugKotlin <span className="text-gray-400 pl-2">EXECUTING</span></span>
                        <span>{'>'} Task :app:assembleDebug <span className="text-gray-400 pl-2">EXECUTING</span></span>
                     </motion.div>
                  )}
                  {heroState === 'success' && (
                     <motion.div className="flex flex-col gap-0.5 text-[#27C93F]" initial={{opacity:0}} animate={{opacity:1}}>
                        <span className="font-semibold">BUILD SUCCESSFUL in 1s. 23 actionable tasks...</span>
                     </motion.div>
                  )}
                  {heroState === 'typing' && (
                     <div className="text-gray-400">
                        <span>Terminal: Ready</span>
                     </div>
                  )}
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
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-start inner-shadow z-10 w-full h-full">
                
                <div className={`absolute inset-0 transition-colors duration-700 ease-in-out pointer-events-none z-0 ${heroState === 'success' ? 'bg-slate-50' : 'bg-transparent'}`}></div>

                {/* Emulador Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 rounded-b-[18px] w-32 mx-auto z-40 flex items-center justify-center pointer-events-none shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                   <div className="w-[10px] h-[10px] rounded-full bg-[#0E131F] border border-slate-700 relative overflow-hidden flex items-center justify-center">
                      <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
                   </div>
                </div>

                {/* Flash Effect na fase de success */}
                {heroState === 'success' && (
                  <motion.div 
                    key="flash-effect"
                    className="absolute inset-0 border-[6px] border-[#3DDC84] z-50 rounded-[2rem] pointer-events-none mix-blend-screen"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                )}

                {/* Android Status Bar */}
                <div className={`w-full flex justify-between items-center px-6 pt-2 pb-1 text-[10px] font-semibold absolute top-0 left-0 z-30 transition-colors duration-500 pointer-events-none ${heroState === 'success' ? 'text-slate-800' : 'text-slate-400'}`}>
                   <span>12:00</span>
                   <div className="flex gap-1.5 items-center">
                     <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21L15.6 16.2C14.6 15.4 13.4 15 12 15C10.6 15 9.4 15.4 8.4 16.2L12 21ZM12 3C7.95 3 4.21 4.34 1.2 6.6L3 9C5.5 7.12 8.62 6 12 6C15.38 6 18.5 7.12 21 9L22.8 6.6C19.79 4.34 16.05 3 12 3Z"/></svg>
                     <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2H10V4H8.33C7.6 4 7 4.6 7 5.33V20.67C7 21.4 7.6 22 8.33 22H15.67C16.4 22 17 21.4 17 20.67V5.33C17 4.6 16.4 4 15.67 4Z"/></svg>
                   </div>
                </div>

                {/* Emulador Contents */}
                <div className="flex-1 w-full relative pt-10 pb-6 px-5 flex flex-col justify-start items-center overflow-y-auto no-scrollbar z-10">
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

                    {/* Phase 3: The UAU Moment Content */}
                    {heroState === 'success' && (
                      <motion.div 
                        key="emu-success"
                        className="w-full flex flex-col items-center justify-start h-full pt-4 px-1"
                        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
                      >
                        {/* Avatar/Tag */}
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                          className="self-start mb-6 font-sans flex flex-col gap-1"
                        >
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 p-[2px] shadow-sm">
                               <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-mono text-[11px] font-black text-slate-800">
                                 {`</>`}
                               </div>
                             </div>
                             <div className="flex flex-col">
                               <span className="text-xs font-bold text-slate-900 leading-tight">Miguel</span>
                               <span className="text-[10px] font-bold text-purple-600 leading-tight">Engenheiro de Software</span>
                             </div>
                          </div>
                        </motion.div>
                        
                        <motion.h1 
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                          className="text-[26px] font-extrabold tracking-tight leading-[1.05] mb-4 text-slate-900 font-sans w-full text-left"
                        >
                          Construindo software <br />
                          <span className="text-slate-900 pt-1 block">limpo e eficiente.</span>
                        </motion.h1>
                        
                        <motion.p 
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                          className="text-[13px] text-slate-500 mb-6 w-full text-left font-sans leading-relaxed"
                        >
                          Focado em criar experiências mobile incríveis com Kotlin, Android Nativo e Arquiteturas Escaláveis.
                        </motion.p>
                        
                        {/* Tech Pills */}
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
                          className="flex gap-2 flex-wrap mb-8 w-full"
                        >
                          <span className="px-2.5 py-1.5 bg-purple-50 text-purple-700 text-[10px] font-bold rounded-md flex items-center gap-1.5">Kotlin</span>
                          <span className="px-2.5 py-1.5 bg-purple-50 text-purple-700 text-[10px] font-bold rounded-md flex items-center gap-1.5">Android</span>
                          <span className="px-2.5 py-1.5 bg-purple-50 text-purple-700 text-[10px] font-bold rounded-md flex items-center gap-1.5">React</span>
                        </motion.div>

                        <motion.div 
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
                          className="flex flex-col w-full gap-3 mt-auto font-sans pb-4"
                        >
                          <motion.a
                            href="#projetos"
                            whileTap={{ scale: 0.97 }}
                            onClick={(e) => e.stopPropagation()} // Prevent skip trigger on interaction
                            className="flex w-full items-center justify-center px-6 py-4 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors shadow-xl"
                          >
                            Ver Projetos
                          </motion.a>
                          <motion.a
                            href="/cv.pdf"
                            whileTap={{ scale: 0.97 }}
                            onClick={(e) => e.stopPropagation()}
                            className="flex w-full items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-colors shadow-sm"
                          >
                            <Download className="h-4 w-4" />
                            Download CV
                          </motion.a>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Emulador Home Indicator */}
                <div className="absolute bottom-2 inset-x-0 mx-auto w-24 h-1.5 bg-slate-300 rounded-full z-40 pointer-events-none"></div>

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
