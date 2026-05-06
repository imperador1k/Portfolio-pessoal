import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Download, Terminal, ChevronRight, LayoutGrid, FileCode2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { KotlinIcon, AndroidIcon } from './Icons';

type HeroState = 'typing' | 'building' | 'success';

const CODE_LINES = [
  { text: "@Composable", color: "text-[#CC7832]", indent: 0 },
  { text: "fun HeroProfile() {", color: "text-[#FFC66D]", indent: 0 },
  { text: "Column(modifier = Modifier.fillMaxSize()) {", color: "text-slate-800", indent: 4 },
  { text: "Text(text = \"Construindo software\", style = Typography.h1)", color: "text-slate-800", indent: 8 },
  { text: "Text(text = \"limpo e eficiente.\", color = JetBrainsPrimary)", color: "text-[#407A8B]", indent: 8 },
  { text: "Button(onClick = { openPortfolio() }) {", color: "text-slate-800", indent: 8 },
  { text: "Text(\"Ver Projetos\")", color: "text-[#6A8759]", indent: 12 },
  { text: "}", color: "text-slate-800", indent: 8 },
  { text: "}", color: "text-slate-800", indent: 4 },
  { text: "}", color: "text-slate-800", indent: 0 }
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
          setTimeout(() => setHeroState('building'), 300); // Small pause before building
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
      className="px-5 sm:px-6 pt-32 pb-20 lg:pt-48 lg:pb-24 lg:px-10 relative overflow-hidden min-h-[90vh] flex flex-col justify-center cursor-pointer" 
      id="sobre"
    >
      {/* Background Blur Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 blur-[100px] rounded-full -z-10 translate-y-20 mx-auto w-3/4 max-w-3xl"></div>
      
      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* === LEFT COLUMN: IDE WINDOW === */}
        {/* Visible always on typing/building, partially hidden on desktop success, fully hidden on mobile success */}
        <AnimatePresence mode="popLayout">
          {(heroState !== 'success' || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
            <motion.div 
              layoutId="ide-window"
              className={`lg:col-span-7 flex flex-col w-full mx-auto max-w-lg lg:max-w-none ${heroState === 'success' ? 'hidden lg:flex opacity-60 scale-95 origin-left' : 'flex'}`}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: heroState === 'success' ? 0.4 : 1, y: 0, scale: heroState === 'success' ? 0.90 : 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.9, filter: "blur(10px)" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              {/* Fake IDE UI */}
              <div className="rounded-2xl border border-slate-200 shadow-2xl bg-white/80 backdrop-blur-md overflow-hidden flex flex-col font-mono text-sm h-[400px] sm:h-[450px]">
                {/* IDE Header */}
                <div className="h-10 border-b border-slate-200 bg-slate-50/80 flex items-center px-4 justify-between transition-colors">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm"></div>
                  </div>
                  <div className="text-slate-400 text-xs font-semibold flex items-center gap-1.5 font-sans">
                    <LayoutGrid className="w-3 h-3" />
                    <span>HeroProfile.kt</span>
                  </div>
                  <div className="w-10"></div>
                </div>
                
                {/* Coding Area */}
                <div className="flex p-4 flex-1 overflow-auto bg-white/60">
                  <div className="text-slate-300 select-none text-right pr-4 tracking-tighter leading-[1.7] flex flex-col">
                    {CODE_LINES.map((_, i) => <span key={i}>{i + 1}</span>)}
                  </div>
                  <div className="flex-1 leading-[1.7] overflow-x-auto pb-4">
                    {CODE_LINES.map((line, i) => (
                      <motion.div 
                        key={i}
                        className={`${line.color} whitespace-pre`}
                        style={{ paddingLeft: `${line.indent * 0.5}rem` }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: i < visibleLines ? 1 : 0 }}
                        transition={{ duration: 0.1 }}
                      >
                        {line.text}
                      </motion.div>
                    ))}
                    {heroState === 'typing' && visibleLines < CODE_LINES.length && (
                      <motion.span 
                        animate={{ opacity: [1, 0] }} 
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-2h-4 bg-slate-400 ml-1 translate-y-1"
                      >
                        |
                      </motion.span>
                    )}
                  </div>
                </div>

                {/* Bottom Terminal Tab */}
                <div className="h-28 border-t border-slate-200 bg-slate-50 p-3 text-xs overflow-hidden flex flex-col z-10 transition-colors">
                  <div className="flex justify-between items-center mb-2 pb-1 border-b border-slate-200">
                    <div className="font-bold text-jb-dark flex items-center gap-2">
                       <Terminal className="w-3.5 h-3.5" /> Output
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center space-y-1 overflow-hidden font-mono text-[11px] sm:text-xs">
                    {heroState === 'typing' && (
                      <span className="text-slate-400 animate-pulse">Waiting for code changes...</span>
                    )}
                    {heroState === 'building' && (
                      <>
                        <div><span className="text-jb-primary font-bold">INFO:</span> Executing tasks: [:app:assembleDebug]</div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-full max-w-[200px] h-1.5 bg-slate-200 rounded-full overflow-hidden">
                             <motion.div 
                               className="h-full bg-[#3DDC84]"
                               initial={{ width: "0%" }}
                               animate={{ width: "100%" }}
                               transition={{ duration: 1.4, ease: "linear" }}
                             />
                          </div>
                          <span className="text-slate-500 text-[10px]">Compiling Kotlin...</span>
                        </div>
                      </>
                    )}
                    {heroState === 'success' && (
                      <div className="text-[#3DDC84] font-bold">BUILD SUCCESSFUL in 1s 512ms</div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* === RIGHT COLUMN: ANDROID EMULATOR === */}
        {/* Hidden on mobile until success */}
        <AnimatePresence mode="popLayout">
           {(heroState === 'success' || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
            <motion.div 
              layoutId="emulator-window"
              className={`border-[8px] border-slate-800 rounded-[2.5rem] bg-white relative overflow-hidden shadow-2xl mx-auto w-full max-w-[340px] sm:max-w-[360px] lg:max-w-md aspect-[9/19] flex flex-col transform-gpu z-20 items-center justify-start
                ${heroState === 'success' ? 'col-span-1 lg:col-span-5' : 'hidden lg:flex lg:col-span-4 lg:col-start-9 scale-90 opacity-80'}`}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: heroState === 'success' ? 1 : 0.95 }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: heroState === 'success' ? 0.1 : 0 }}
            >
              {/* Emulador Notch */}
              <div className="absolute top-0 inset-x-0 h-6 bg-slate-800 rounded-b-2xl w-32 mx-auto z-40 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-1.5 rounded-full bg-slate-900 absolute top-2"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900 absolute top-2 right-6"></div>
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

              {/* StatusBar Fake */}
              <div className="w-full flex justify-between items-center px-6 py-2 text-[10px] font-medium text-slate-400 absolute top-0 left-0 bg-white/80 backdrop-blur-md z-30">
                 <span>12:00</span>
                 <div className="flex gap-1">
                   <div className="w-3 h-2.5 border-[1.5px] border-slate-400 rounded-sm"></div>
                 </div>
              </div>

              {/* Emulador Contents */}
              <div className="flex-1 w-full relative pt-12 pb-6 px-6 flex flex-col justify-center items-center text-center overflow-y-auto">
                <AnimatePresence mode="popLayout">
                  {/* Phase 1: Terminal Log Wait */}
                  {heroState === 'typing' && (
                    <motion.div 
                      key="emu-typing"
                      exit={{ opacity: 0, y: -20 }}
                      className="text-slate-400 font-mono text-xs flex flex-col items-center gap-3"
                    >
                      <AndroidIcon className="w-10 h-10 opacity-20 grayscale" />
                      <motion.span animate={{ opacity: [1, 0.3] }} transition={{ repeat: Infinity }}>
                        {'>'} Waiting for code...
                      </motion.span>
                    </motion.div>
                  )}
                  
                  {/* Phase 2: Building Emulator Screen */}
                  {heroState === 'building' && (
                    <motion.div 
                      key="emu-building"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      className="text-slate-600 font-mono text-xs flex flex-col items-center gap-4 w-full"
                    >
                      <AndroidIcon className="w-12 h-12 text-[#3DDC84] animate-bounce" />
                      <div className="w-3/4 text-center text-slate-500 mb-2">Gradle Build Running...</div>
                      <div className="w-full max-w-[120px] h-1 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                           className="h-full bg-slate-400"
                           initial={{ x: "-100%" }}
                           animate={{ x: "100%" }}
                           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Phase 3: The UAU Moment Content */}
                  {heroState === 'success' && (
                    <motion.div 
                      key="emu-success"
                      className="w-full flex flex-col items-center justify-center h-full"
                      initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.15 }}
                    >
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-jb-primary font-mono text-[9px] sm:text-[10px] font-bold mb-5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC84] animate-pulse"></span>
                        MOBILE DEVELOPER
                      </motion.div>
                      
                      <motion.h1 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                        className="text-[26px] sm:text-3xl font-extrabold tracking-tight leading-[1.05] mb-4 text-jb-dark font-sans"
                      >
                        Construindo software <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-jb-primary via-pink-500 to-cyan-500 pt-1 block">limpo e eficiente.</span>
                      </motion.h1>
                      
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                        className="text-xs sm:text-sm text-slate-500 mb-8 leading-relaxed font-normal px-2"
                      >
                        Estudante de Engenharia Informática focado em Kotlin, Android Nativo e Arquiteturas Escaláveis.
                      </motion.p>

                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                        className="flex flex-col w-full gap-3 mt-auto"
                      >
                        <motion.a
                          whileTap={{ scale: 0.95 }}
                          href="#projetos"
                          onClick={(e) => e.stopPropagation()} // Prevent skip trigger on interaction
                          className="group flex w-full items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-jb-primary to-pink-500 text-white rounded-[14px] font-bold text-sm shadow-[0_4px_14px_0_rgba(127,82,255,0.39)] hover:shadow-[0_6px_20px_rgba(127,82,255,0.23)] transition-all font-sans"
                        >
                          Ver Projetos
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                        <motion.a
                          whileTap={{ scale: 0.95 }}
                          href="/cv.pdf"
                          onClick={(e) => e.stopPropagation()}
                          className="flex w-full items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-jb-dark rounded-[14px] font-bold text-sm hover:bg-slate-50 transition-colors shadow-sm font-sans"
                        >
                          <Download className="h-4 w-4 text-slate-500" />
                          Download CV
                        </motion.a>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Emulador Home Indicator */}
              <div className="absolute bottom-2 inset-x-0 mx-auto w-24 h-1 bg-slate-300 rounded-full z-40"></div>
            </motion.div>
           )}
        </AnimatePresence>
        
      </div>
      
      {/* Skip Hint (Visible only during typing/building) */}
      <AnimatePresence>
        {heroState !== 'success' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute bottom-6 left-0 right-0 mx-auto text-center text-[10px] text-slate-400 font-mono tracking-widest uppercase z-10 pointer-events-none"
          >
            A processar... Clique para saltar a Animação
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
