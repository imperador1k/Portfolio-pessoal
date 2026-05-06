import React, { useState, useEffect, useCallback } from 'react';
import { Download, LayoutGrid, Menu, Bell, ChevronDown, ChevronRight, FileText, Check, RefreshCw, Folder, Wifi, Battery, User, Home, Code, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { KotlinIcon, AndroidIcon, ReactIcon } from './Icons';

type HeroState = 'typing' | 'building' | 'success';

type TabName = 'HeroContent.kt' | 'MainActivity.kt' | 'Theme.tsx' | 'Styles.css';

const FILE_SYSTEM: Record<TabName, { icon: React.ReactNode, path: string[], code: {nodes: {text: string, color: string}[], indent: number}[] }> = {
  'HeroContent.kt': {
    icon: <KotlinIcon className="w-3.5 h-3.5 text-purple-500" />,
    path: ['src', 'main', 'kotlin', 'HeroContent.kt'],
    code: [
      { nodes: [{ text: "data class ", color: "text-purple-600 font-medium" }, { text: "Developer", color: "text-slate-900 font-semibold" }, { text: "(", color: "text-slate-600" }, { text: "val ", color: "text-purple-600 font-medium" }, { text: "name", color: "text-cyan-600" }, { text: ": ", color: "text-slate-600" }, { text: "String", color: "text-slate-900 font-medium" }, { text: ", ", color: "text-slate-600" }, { text: "val ", color: "text-purple-600 font-medium" }, { text: "role", color: "text-cyan-600" }, { text: ": ", color: "text-slate-600" }, { text: "String", color: "text-slate-900 font-medium" }, { text: ")", color: "text-slate-600" }], indent: 0 },
      { nodes: [{ text: "val ", color: "text-purple-600 font-medium" }, { text: "miguel ", color: "text-blue-600 font-semibold" }, { text: "= ", color: "text-slate-600" }, { text: "Developer", color: "text-slate-900 font-medium" }, { text: "(", color: "text-slate-600" }, { text: "\"Miguel\"", color: "text-green-600" }, { text: ", ", color: "text-slate-600" }, { text: "\"Android Engineer\"", color: "text-green-600" }, { text: ")", color: "text-slate-600" }], indent: 0 },
      { nodes: [], indent: 0 },
      { nodes: [{ text: "@Composable", color: "text-amber-600 font-medium" }], indent: 0 },
      { nodes: [{ text: "fun ", color: "text-purple-600 font-medium" }, { text: "PortfolioScreen", color: "text-amber-500 font-semibold" }, { text: "() {", color: "text-slate-600" }], indent: 0 },
      { nodes: [{ text: "if ", color: "text-purple-600 font-medium" }, { text: "(", color: "text-slate-600" }, { text: "miguel", color: "text-blue-600 font-semibold" }, { text: ".", color: "text-slate-600" }, { text: "isReady", color: "text-purple-600 font-medium" }, { text: ") {", color: "text-slate-600" }], indent: 4 },
      { nodes: [{ text: "ShowHero", color: "text-cyan-600 border-b border-cyan-100" }, { text: "(", color: "text-slate-600" }, { text: "title = ", color: "text-cyan-600" }, { text: "\"Construindo software limpo\"", color: "text-green-600" }, { text: ")", color: "text-slate-600" }], indent: 8 },
      { nodes: [{ text: "}", color: "text-slate-600" }], indent: 4 },
      { nodes: [{ text: "}", color: "text-slate-600" }], indent: 0 }
    ]
  },
  'MainActivity.kt': {
    icon: <KotlinIcon className="w-3.5 h-3.5 text-purple-500" />,
    path: ['src', 'main', 'kotlin', 'MainActivity.kt'],
    code: [
      { nodes: [{ text: "class ", color: "text-purple-600 font-medium" }, { text: "MainActivity", color: "text-amber-500 font-semibold" }, { text: " : ", color: "text-slate-600" }, { text: "ComponentActivity", color: "text-slate-900 font-medium" }, { text: "() {", color: "text-slate-600" }], indent: 0 },
      { nodes: [{ text: "override fun ", color: "text-purple-600 font-medium" }, { text: "onCreate", color: "text-blue-600 font-semibold" }, { text: "(savedInstanceState: ", color: "text-slate-600" }, { text: "Bundle?", color: "text-slate-900 font-medium" }, { text: ") {", color: "text-slate-600" }], indent: 4 },
      { nodes: [{ text: "super", color: "text-blue-600 font-medium" }, { text: ".", color: "text-slate-600" }, { text: "onCreate", color: "text-blue-600" }, { text: "(savedInstanceState)", color: "text-slate-600" }], indent: 8 },
      { nodes: [{ text: "setContent", color: "text-cyan-600" }, { text: " {", color: "text-slate-600" }], indent: 8 },
      { nodes: [{ text: "PortfolioTheme", color: "text-amber-500" }, { text: " {", color: "text-slate-600" }], indent: 12 },
      { nodes: [{ text: "PortfolioScreen", color: "text-cyan-600" }, { text: "()", color: "text-slate-600" }], indent: 16 },
      { nodes: [{ text: "}", color: "text-slate-600" }], indent: 12 },
      { nodes: [{ text: "}", color: "text-slate-600" }], indent: 8 },
      { nodes: [{ text: "}", color: "text-slate-600" }], indent: 4 },
      { nodes: [{ text: "}", color: "text-slate-600" }], indent: 0 }
    ]
  },
  'Theme.tsx': {
    icon: <ReactIcon className="w-3.5 h-3.5 text-cyan-500" />,
    path: ['src', 'theme', 'Theme.tsx'],
    code: [
      { nodes: [{ text: "export const ", color: "text-purple-600 font-medium" }, { text: "Theme", color: "text-blue-600 font-semibold" }, { text: " = {", color: "text-slate-600" }], indent: 0 },
      { nodes: [{ text: "colors", color: "text-slate-900 font-medium" }, { text: ": {", color: "text-slate-600" }], indent: 4 },
      { nodes: [{ text: "primary", color: "text-cyan-600" }, { text: ": ", color: "text-slate-600" }, { text: "'#7F52FF'", color: "text-green-600" }, { text: ",", color: "text-slate-600" }], indent: 8 },
      { nodes: [{ text: "background", color: "text-cyan-600" }, { text: ": ", color: "text-slate-600" }, { text: "'#19191C'", color: "text-green-600" }, { text: ",", color: "text-slate-600" }], indent: 8 },
      { nodes: [{ text: "surface", color: "text-cyan-600" }, { text: ": ", color: "text-slate-600" }, { text: "'#232326'", color: "text-green-600" }, { text: ",", color: "text-slate-600" }], indent: 8 },
      { nodes: [{ text: "text", color: "text-cyan-600" }, { text: ": ", color: "text-slate-600" }, { text: "'#FFFFFF'", color: "text-green-600" }], indent: 8 },
      { nodes: [{ text: "}", color: "text-slate-600" }], indent: 4 },
      { nodes: [{ text: "};", color: "text-slate-600" }], indent: 0 }
    ]
  },
  'Styles.css': {
    icon: <span className="text-blue-400 text-xs font-black">#</span>,
    path: ['src', 'styles', 'Styles.css'],
    code: [
      { nodes: [{ text: ":root", color: "text-amber-600 font-medium" }, { text: " {", color: "text-slate-600" }], indent: 0 },
      { nodes: [{ text: "--jb-primary", color: "text-cyan-600" }, { text: ": ", color: "text-slate-600" }, { text: "#7F52FF", color: "text-purple-600" }, { text: ";", color: "text-slate-600" }], indent: 4 },
      { nodes: [{ text: "--radius-md", color: "text-cyan-600" }, { text: ": ", color: "text-slate-600" }, { text: "12px", color: "text-purple-600" }, { text: ";", color: "text-slate-600" }], indent: 4 },
      { nodes: [{ text: "--spacing-safe", color: "text-cyan-600" }, { text: ": ", color: "text-slate-600" }, { text: "24px", color: "text-purple-600" }, { text: ";", color: "text-slate-600" }], indent: 4 },
      { nodes: [{ text: "}", color: "text-slate-600" }], indent: 0 },
      { nodes: [], indent: 0 },
      { nodes: [{ text: ".debug-mode", color: "text-amber-500 font-medium" }, { text: " * {", color: "text-slate-600" }], indent: 0 },
      { nodes: [{ text: "outline", color: "text-cyan-600" }, { text: ": ", color: "text-slate-600" }, { text: "1px dashed ", color: "text-green-600" }, { text: "rgba", color: "text-blue-600" }, { text: "(255,0,0,0.3);", color: "text-slate-600" }], indent: 4 },
      { nodes: [{ text: "background", color: "text-cyan-600" }, { text: ": ", color: "text-slate-600" }, { text: "rgba", color: "text-blue-600" }, { text: "(0,255,0,0.05);", color: "text-slate-600" }], indent: 4 },
      { nodes: [{ text: "}", color: "text-slate-600" }], indent: 0 }
    ]
  }
};

export default function Hero() {
  const [heroState, setHeroState] = useState<HeroState>('typing');
  const [activeTab, setActiveTab] = useState<TabName>('HeroContent.kt');
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
  const [emulatorTab, setEmulatorTab] = useState<'home' | 'work' | 'me'>('home');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeFile = FILE_SYSTEM[activeTab];

  const skipToSuccess = useCallback(() => {
    setHeroState(prev => {
      if (prev !== 'success') {
        setVisibleLines(FILE_SYSTEM['HeroContent.kt'].code.length);
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
        if (prev >= FILE_SYSTEM['HeroContent.kt'].code.length) {
          clearInterval(typingInterval);
          setTimeout(() => setHeroState('building'), 300); // Pause before building
          return FILE_SYSTEM['HeroContent.kt'].code.length;
        }
        return prev + 1;
      });
    }, 150); // Speed up typing slightly
    
    return () => clearInterval(typingInterval);
  }, [heroState]);

  // When switching tabs in success state, immediately show all lines
  useEffect(() => {
    if (heroState === 'success') {
      setVisibleLines(activeFile.code.length);
    }
  }, [activeTab, heroState, activeFile]);

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
      id="home"
    >
      {/* Background Blur Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 blur-[100px] rounded-full -z-10 translate-y-20 mx-auto w-3/4 max-w-3xl pointer-events-none"></div>
      
      {/* Aura Effects */}
      <div className="absolute top-1/4 left-[5%] w-96 h-96 bg-orange-400/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute top-1/2 right-[5%] w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none animate-[pulse_8s_ease-in-out_infinite]"></div>
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Main Title Section */}
      <div className="mx-auto max-w-7xl w-full flex flex-col items-center text-center mb-16 relative z-20 px-6">
        {/* Subtle Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-jb-primary animate-pulse"></span>
          <span className="text-[10px] font-mono font-medium text-slate-400 tracking-wider uppercase">
            v2.4.1 Stable
          </span>
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tighter mb-6 font-mono italic">
          Miguel <span className="text-jb-primary not-italic">/</span> 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7F52FF] via-[#D946EF] to-[#F97316] ml-3 not-italic">
            Engenheiro Mobile
          </span>
        </h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed"
        >
          Explora a minha arquitetura. <span className="text-slate-900 font-bold underline decoration-jb-primary/30 decoration-2 underline-offset-4">Interage com o código</span> para veres a interface a reagir em tempo real.
        </motion.p>
      </div>

      <div className="mx-auto max-w-7xl w-full flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-16 min-h-[70vh] relative z-10">
        {/* Dynamic Stage Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(217,70,239,0.03)_0%,rgba(255,255,255,0)_100%)] pointer-events-none z-0"></div>
        
        {/* === LEFT COLUMN: IDE WINDOW === */}
        <AnimatePresence mode="popLayout">
          {true && (
            <motion.div 
              layoutId="ide-window"
              className={`flex w-full lg:w-[60%] max-w-[840px] shrink-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${heroState === 'success' ? 'opacity-40 lg:opacity-50 scale-[0.98]' : 'opacity-100 scale-100'}`}
            >
              {/* Fake IDE UI - JetBrains Fleet Light mode */}
              <div className="rounded-xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl overflow-hidden flex flex-col font-mono text-[11px] sm:text-[13px] h-[400px] sm:h-[520px] w-full relative">
                {/* IDE Header with Tabs */}
                <div className="bg-[#E8E8E8]/70 border-b border-gray-300/50 flex flex-col justify-end relative shrink-0 pt-3">
                  <div className="flex gap-2 absolute top-4 left-3 z-20 w-16 mb-2.5">
                    <div className="w-[11px] h-[11px] rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                    <div className="w-[11px] h-[11px] rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                    <div className="w-[11px] h-[11px] rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
                  </div>
                  
                  <div className="flex items-center pl-12 sm:pl-[5rem] w-full gap-0 shadow-none z-10 pt-1 overflow-x-auto no-scrollbar">
                    {(Object.keys(FILE_SYSTEM) as TabName[]).map(tabName => {
                      const isActive = activeTab === tabName;
                      return (
                        <div 
                           key={tabName}
                           onClick={(e) => { e.stopPropagation(); if(heroState === 'success') setActiveTab(tabName); }}
                           className={`flex items-center justify-center gap-2 px-4 h-8 relative cursor-pointer transition-colors ${
                              isActive 
                                ? 'bg-white/95 border border-gray-200/60 border-b-0 rounded-t-[5px] z-10 shadow-sm before:absolute before:top-0 before:inset-x-0 before:h-[2px] before:bg-purple-500 before:rounded-t-[5px]'
                                : 'bg-transparent z-0 hover:bg-black/5 rounded-t-[5px] text-gray-500'
                           }`}
                        >
                           {FILE_SYSTEM[tabName].icon}
                           <span className={`${isActive ? 'text-slate-700 font-semibold' : 'text-gray-500 font-medium'} text-[11px] font-sans flex-shrink-0`}>{tabName}</span>
                           {isActive && <span className="text-gray-400 hover:text-gray-600 text-[10px] ml-1 flex-shrink-0">×</span>}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Breadcrumbs */}
                <div className="h-6 bg-white/90 border-b border-gray-200/60 px-4 flex items-center text-[10px] text-gray-500 font-sans gap-1 shrink-0 overflow-x-auto no-scrollbar">
                   {activeFile.path.map((segment, idx) => (
                      <React.Fragment key={idx}>
                         {idx > 0 && <ChevronRight className="w-3 h-3 flex-shrink-0" />}
                         <span className={`${idx === activeFile.path.length - 1 ? 'text-gray-700 font-semibold' : 'hover:text-gray-700 cursor-pointer'} flex-shrink-0`}>
                            {segment}
                         </span>
                      </React.Fragment>
                   ))}
                </div>
                
                {/* Body Area */}
                <div className="flex flex-1 overflow-hidden pb-6">
                  {/* File Explorer (Sidebar) */}
                  <div className="hidden sm:flex w-48 bg-[#F5F5F5]/80 border-r border-gray-200/50 flex-col py-2 px-1 text-gray-600 text-[11px] font-sans shrink-0 overflow-y-auto no-scrollbar">
                     <div className="flex items-center gap-1.5 py-[3px] px-1 rounded hover:bg-gray-200/50 cursor-pointer">
                        <ChevronDown className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        <span className="text-blue-400 text-xs shrink-0 font-bold">src</span>
                     </div>
                     <div className="flex flex-col ml-3">
                        {/* main/kotlin folder */}
                        <div className="flex items-center gap-1.5 py-[3px] px-1 rounded hover:bg-gray-200/50 cursor-pointer">
                           <ChevronDown className="w-3 h-3 text-gray-400 flex-shrink-0" />
                           <span className="text-blue-400 text-xs shrink-0 font-bold">main/kotlin</span>
                        </div>
                        <div className="flex flex-col ml-3">
                           {['MainActivity.kt', 'HeroContent.kt'].map(file => (
                              <div key={file} onClick={(e) => { e.stopPropagation(); if(heroState === 'success') setActiveTab(file as TabName); }} className={`flex items-center gap-1.5 py-[3px] px-1 rounded cursor-pointer ${activeTab === file ? 'bg-[#2979ff]/10 text-blue-700 font-medium' : 'hover:bg-gray-200/50'}`}>
                                 <KotlinIcon className={`w-3 h-3 shrink-0 ${activeTab !== file ? 'text-gray-500' : ''}`} />
                                 {file}
                              </div>
                           ))}
                        </div>

                        {/* theme/styles folders just for show */}
                        <div className="flex items-center gap-1.5 py-[3px] px-1 rounded hover:bg-gray-200/50 cursor-pointer mt-1">
                           <ChevronDown className="w-3 h-3 text-gray-400 flex-shrink-0" />
                           <span className="text-blue-400 text-xs shrink-0 font-bold">theme</span>
                        </div>
                        <div className="flex flex-col ml-3">
                           <div onClick={(e) => { e.stopPropagation(); if(heroState === 'success') setActiveTab('Theme.tsx'); }} className={`flex items-center gap-1.5 py-[3px] px-1 rounded cursor-pointer ${activeTab === 'Theme.tsx' ? 'bg-[#2979ff]/10 text-blue-700 font-medium' : 'hover:bg-gray-200/50'}`}>
                              <ReactIcon className={`w-3 h-3 shrink-0 ${activeTab !== 'Theme.tsx' ? 'text-cyan-600' : 'text-gray-500'}`} />
                              Theme.tsx
                           </div>
                        </div>

                        <div className="flex items-center gap-1.5 py-[3px] px-1 rounded hover:bg-gray-200/50 cursor-pointer mt-1">
                           <ChevronDown className="w-3 h-3 text-gray-400 flex-shrink-0" />
                           <span className="text-blue-400 text-xs shrink-0 font-bold">styles</span>
                        </div>
                        <div className="flex flex-col ml-3">
                           <div onClick={(e) => { e.stopPropagation(); if(heroState === 'success') setActiveTab('Styles.css'); }} className={`flex items-center gap-1.5 py-[3px] px-1 rounded cursor-pointer ${activeTab === 'Styles.css' ? 'bg-[#2979ff]/10 text-blue-700 font-medium' : 'hover:bg-gray-200/50'}`}>
                              <span className={`text-xs font-black shrink-0 ${activeTab === 'Styles.css' ? 'text-blue-700' : 'text-blue-400'}`}>#</span>
                              Styles.css
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Code Area with per-line layout & Minimap */}
                  <div className="flex flex-1 relative overflow-hidden bg-transparent">
                    {/* Code Container */}
                    <div className="flex-1 min-w-max flex flex-col py-4 overflow-auto no-scrollbar">
                          <AnimatePresence mode="wait">
                            <motion.div 
                              key={activeTab} 
                              initial={{ opacity: 0, y: 5 }} 
                              animate={{ opacity: 1, y: 0 }} 
                              exit={{ opacity: 0, y: -5 }} 
                              transition={{ duration: 0.2 }}
                              className="w-full flex-col flex"
                            >
                              {activeFile.code.map((line, i) => {
                                const isTypingLine = heroState === 'typing' && i === visibleLines - 1;
                                const isVisible = i < visibleLines || heroState === 'success';
                                return isVisible ? (
                                  <div 
                                    key={i} 
                                    className={`flex items-center w-full px-2 ${isTypingLine ? 'bg-blue-50/50' : 'hover:bg-gray-100/30'}`}
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
                                  </div>
                                ) : null;
                              })}
                            </motion.div>
                          </AnimatePresence>
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
                       {activeFile.code.map((line, i) => {
                         const widths = [30, 24, 0, 12, 18, 16, 24, 4, 4, 15, 20, 8];
                         const hash = activeTab.length + i;
                         return (
                           <motion.div 
                             key={`mini-${i}-${activeTab}`} 
                             className="h-[3px] bg-gray-300/60 rounded-sm"
                             style={{ width: `${widths[hash % widths.length]}px` }}
                             initial={{ opacity: 0.2 }}
                             animate={{ opacity: i < visibleLines || heroState === 'success' ? 1 : 0.2 }}
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
                
                {/* Background changes dynamically */}
                <div className={`absolute inset-0 transition-colors duration-700 ease-in-out pointer-events-none z-0 ${heroState === 'success' ? (activeTab === 'Theme.tsx' ? 'bg-[#19191C]' : 'bg-slate-50') : 'bg-transparent'}`}></div>

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

                {/* Android Status Bar */}
                <div className={`w-full flex justify-between items-center px-6 pt-1 text-[10px] font-mono ${activeTab === 'Theme.tsx' ? 'text-slate-400' : 'text-slate-500'} absolute top-0 left-0 z-50 pointer-events-none`}>
                   <span>{currentTime}</span>
                   <div className="flex gap-1.5 items-center">
                     <Wifi className="w-2.5 h-2.5" />
                     <Battery className="w-3 h-3" />
                   </div>
                </div>

                {/* Android Top App Bar / Header */}
                {heroState === 'success' && (
                  <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`w-full h-16 ${activeTab === 'Theme.tsx' ? 'bg-[#19191C]/80 border-b border-white/5' : 'bg-white/80 border-b border-slate-100'} backdrop-blur-md flex justify-between items-center px-5 pt-4 z-40 shrink-0 relative transition-colors duration-500`}
                  >
                     <motion.button 
                       whileTap={{ scale: 0.9 }} 
                       onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }} 
                       className={`p-2 rounded-xl ${activeTab === 'Theme.tsx' ? 'hover:bg-white/10 text-white' : 'hover:bg-slate-100 text-slate-800'} transition-colors`}
                     >
                       <Menu className="w-4 h-4" />
                     </motion.button>
                     <div className="flex flex-col items-center">
                        <span className={`text-[12px] font-bold ${activeTab === 'Theme.tsx' ? 'text-white' : 'text-slate-900'} font-mono leading-none`}>miguel.kt</span>
                        <span className="text-[8px] text-jb-primary font-mono font-bold animate-pulse">● RUNNING</span>
                     </div>
                     <motion.button 
                       whileTap={{ scale: 0.9 }} 
                       onClick={() => setEmulatorTab('me')}
                       className={`p-2 rounded-xl ${activeTab === 'Theme.tsx' ? 'hover:bg-white/10 text-white' : 'hover:bg-slate-100 text-slate-800'} transition-colors`}
                     >
                        <UserCircle className="w-4 h-4" />
                     </motion.button>
                  </motion.div>
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
                <div className={`flex-1 w-full relative flex flex-col justify-start items-center overflow-y-auto no-scrollbar z-10 ${heroState === 'success' ? 'px-5 pt-8 pb-32 space-y-8' : 'pt-10 pb-6 px-5'} ${activeTab === 'Styles.css' && heroState === 'success' ? 'debug-mode' : ''}`}>
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
                             <div className="text-[#3DDC84] font-semibold break-all font-mono">{'>'} Task :app:compile</div>
                             <div className="text-slate-500 font-mono">Resolving dependencies...</div>
                             <div className="flex flex-col gap-1 mt-4">
                                <span className="text-[10px] text-white/80 font-bold uppercase tracking-wider font-mono">Building APK</span>
                                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                  <motion.div 
                                     className="h-full bg-jb-primary"
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

                    {/* Phase 3: Native App Experience */}
                    {heroState === 'success' && (
                      <motion.div 
                        key="emu-success"
                        className="w-full flex flex-col items-start justify-start"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
                      >
                        {/* TAB 1: HOME */}
                        {emulatorTab === 'home' && (
                          <motion.div 
                            key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                            className="w-full flex flex-col items-start space-y-6"
                          >
                            {/* Profile Header */}
                            <div className="flex items-center gap-4 w-full">
                              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-jb-primary to-jb-secondary p-[2px] shadow-lg shadow-jb-primary/20">
                                <div className={`w-full h-full ${activeTab === 'Theme.tsx' ? 'bg-[#232326]' : 'bg-white'} rounded-[14px] flex items-center justify-center transition-colors`}>
                                  <User className={`w-6 h-6 ${activeTab === 'Theme.tsx' ? 'text-white' : 'text-jb-primary'}`} />
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10px] font-mono text-jb-primary font-bold tracking-tighter uppercase">Mobile Engineer</span>
                                <span className={`text-xl font-extrabold ${activeTab === 'Theme.tsx' ? 'text-white' : 'text-slate-900'} tracking-tight leading-none`}>Miguel</span>
                              </div>
                            </div>
                            
                            <h2 className={`text-2xl font-bold tracking-tight leading-tight ${activeTab === 'Theme.tsx' ? 'text-white' : 'text-slate-900'} font-mono italic`}>
                              Construindo software <br />
                              <span className="text-jb-primary">limpo & eficiente.</span>
                            </h2>
                            
                            {/* Specialties Section */}
                            <div className="w-full grid grid-cols-1 gap-3">
                               <span className={`text-[9px] font-mono font-bold ${activeTab === 'Theme.tsx' ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-widest`}>Services.kt</span>
                               {[
                                 { title: 'Native Apps', desc: 'Performance extrema em Android/iOS.', color: 'border-blue-200 bg-blue-50/30' },
                                 { title: 'Clean UI', desc: 'Interfaces intuitivas e animações fluidas.', color: 'border-purple-200 bg-purple-50/30' }
                               ].map((service, i) => (
                                 <div key={i} className={`w-full border rounded-2xl p-4 transition-colors ${service.color} ${activeTab === 'Theme.tsx' ? 'bg-[#232326]/50 border-white/5' : ''}`}>
                                    <h4 className={`text-xs font-bold ${activeTab === 'Theme.tsx' ? 'text-white' : 'text-slate-800'} mb-1`}>{service.title}</h4>
                                    <p className={`text-[10px] ${activeTab === 'Theme.tsx' ? 'text-slate-400' : 'text-slate-500'} font-mono leading-tight`}>{service.desc}</p>
                                 </div>
                               ))}
                            </div>

                            {/* Current Learning */}
                            <div className={`w-full ${activeTab === 'Theme.tsx' ? 'bg-[#232326] border-white/5' : 'bg-slate-50 border-slate-100'} border rounded-2xl p-4 flex items-center justify-between`}>
                               <div className="flex flex-col">
                                  <span className="text-[8px] text-slate-500 font-mono uppercase">Currently learning</span>
                                  <span className={`text-[11px] font-bold ${activeTab === 'Theme.tsx' ? 'text-white' : 'text-slate-800'} font-mono`}>Kotlin Multiplatform</span>
                               </div>
                               <RefreshCw className="w-4 h-4 text-jb-primary animate-spin-slow" />
                            </div>

                            {/* Tech Stack Horizontal */}
                            <div className="w-full">
                               <span className={`text-[9px] font-mono font-bold ${activeTab === 'Theme.tsx' ? 'text-slate-500' : 'text-slate-400'} uppercase mb-3 block`}>TechStack.json</span>
                               <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                                  {['Kotlin', 'Swift', 'React', 'Compose', 'Figma'].map(tech => (
                                    <span key={tech} className={`px-3 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap ${activeTab === 'Theme.tsx' ? 'bg-[#232326] text-white border-white/5' : 'bg-white text-slate-700 border-slate-200'} border shadow-sm transition-colors`}>
                                      {tech}
                                    </span>
                                  ))}
                               </div>
                            </div>
                          </motion.div>
                        )}

                        {/* TAB 2: WORK */}
                        {emulatorTab === 'work' && (
                          <motion.div 
                            key="work" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                            className="w-full flex flex-col items-start gap-4"
                          >
                             <div className="flex justify-between items-center w-full mb-2">
                                <h3 className={`text-xs font-mono font-bold ${activeTab === 'Theme.tsx' ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-widest`}>Featured.kt</h3>
                                <div className="flex gap-1.5">
                                   <span className="w-2 h-2 rounded-full bg-jb-primary"></span>
                                   <span className="w-2 h-2 rounded-full bg-slate-200"></span>
                                </div>
                             </div>

                             {[
                               { name: 'Fitness App', tech: 'Kotlin / Compose', status: 'Live', desc: 'Transforming health through code.' },
                               { name: 'Fintech UI', tech: 'React Native', status: 'Dev', desc: 'Secure & fast banking experience.' },
                               { name: 'Travel Guide', tech: 'Swift / SwiftUI', status: 'Live', desc: 'Your perfect companion.' },
                               { name: 'AI Chatbot', tech: 'Python / React', status: 'WIP', desc: 'Next-gen conversation.' }
                             ].map((proj, i) => (
                               <div key={i} className={`w-full ${activeTab === 'Theme.tsx' ? 'bg-[#232326] border-white/5' : 'bg-white border-slate-100'} border rounded-2xl p-4 shadow-sm flex flex-col gap-3 transition-colors`}>
                                  <div className="flex justify-between items-start">
                                     <div className="flex flex-col">
                                        <span className={`text-sm font-bold ${activeTab === 'Theme.tsx' ? 'text-white' : 'text-slate-900'}`}>{proj.name}</span>
                                        <span className="text-[10px] font-mono text-jb-primary font-bold">{proj.tech}</span>
                                     </div>
                                     <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded-full ${proj.status === 'Live' ? 'bg-green-50 text-green-600' : (proj.status === 'Dev' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600')}`}>
                                        {proj.status}
                                     </span>
                                  </div>
                                  <p className={`text-[10px] ${activeTab === 'Theme.tsx' ? 'text-slate-400' : 'text-slate-500'} font-mono leading-tight`}>{proj.desc}</p>
                               </div>
                             ))}
                          </motion.div>
                        )}

                        {/* TAB 3: ME */}
                        {emulatorTab === 'me' && (
                          <motion.div 
                            key="me" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                            className="w-full flex flex-col items-start gap-6"
                          >
                             <div className={`w-full ${activeTab === 'Theme.tsx' ? 'bg-[#232326] border-white/5' : 'bg-white border-slate-100'} border rounded-2xl p-5 shadow-sm transition-colors relative overflow-hidden group`}>
                                <div className="absolute top-0 right-0 w-24 h-24 bg-jb-primary/5 rounded-full -translate-y-12 translate-x-12 blur-2xl group-hover:bg-jb-primary/10 transition-colors"></div>
                                <div className="flex justify-between items-start mb-3">
                                   <h3 className={`text-sm font-bold ${activeTab === 'Theme.tsx' ? 'text-white' : 'text-slate-900'}`}>Status</h3>
                                   <span className="flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                      <span className="text-[9px] font-mono font-bold text-green-600 uppercase">Available</span>
                                   </span>
                                </div>
                                <p className={`text-[11px] ${activeTab === 'Theme.tsx' ? 'text-slate-400' : 'text-slate-500'} leading-relaxed font-mono`}>
                                   Focado em arquiteturas reativas e UI declarativa. Atualmente a explorar o potencial de animações fluidas em Android.
                                </p>
                             </div>

                             <div className="w-full space-y-4">
                                <span className={`text-[10px] font-mono font-bold ${activeTab === 'Theme.tsx' ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-widest`}>Experience.md</span>
                                {[
                                  { role: 'Senior Dev', company: 'Tech Corp', year: '2023-Present' },
                                  { role: 'Mobile Lead', company: 'Startup X', year: '2021-2023' }
                                ].map((exp, i) => (
                                  <div key={i} className="flex gap-4 items-start">
                                     <div className="w-0.5 h-10 bg-slate-200 mt-1 relative">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-jb-primary"></div>
                                     </div>
                                     <div className="flex flex-col gap-0.5">
                                        <span className={`text-[11px] font-bold ${activeTab === 'Theme.tsx' ? 'text-white' : 'text-slate-900'}`}>{exp.role}</span>
                                        <span className="text-[10px] font-mono text-slate-500">{exp.company} • {exp.year}</span>
                                     </div>
                                  </div>
                                ))}
                             </div>

                             <div className="w-full grid grid-cols-2 gap-3">
                                <div className={`flex flex-col gap-1 p-3 rounded-xl border ${activeTab === 'Theme.tsx' ? 'bg-[#232326] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                                   <span className="text-[8px] text-slate-500 font-mono uppercase">Education</span>
                                   <span className={`text-[10px] font-bold ${activeTab === 'Theme.tsx' ? 'text-white' : 'text-slate-800'} font-mono`}>CS Degree</span>
                                </div>
                                <div className={`flex flex-col gap-1 p-3 rounded-xl border ${activeTab === 'Theme.tsx' ? 'bg-[#232326] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                                   <span className="text-[8px] text-slate-500 font-mono uppercase">Languages</span>
                                   <span className={`text-[10px] font-bold ${activeTab === 'Theme.tsx' ? 'text-white' : 'text-slate-800'} font-mono`}>PT / EN / ES</span>
                                </div>
                             </div>

                             <div className="w-full grid grid-cols-2 gap-3">
                                {['LinkedIn', 'GitHub'].map(social => (
                                  <div key={social} className={`flex items-center justify-center gap-2 p-3 rounded-xl border ${activeTab === 'Theme.tsx' ? 'bg-[#232326] border-white/5 text-white' : 'bg-white border-slate-200 text-slate-700 shadow-sm'} font-mono font-bold text-[10px]`}>
                                     {social}
                                  </div>
                                ))}
                             </div>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Navigation Bar (App Style) */}
                {heroState === 'success' && (
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className={`absolute bottom-0 inset-x-0 h-20 ${activeTab === 'Theme.tsx' ? 'bg-[#19191C]/95 border-t border-white/5' : 'bg-white/95 border-t border-slate-100'} backdrop-blur-md z-50 flex items-center justify-around px-8 pb-6 transition-colors duration-500`}
                  >
                    {[
                      { id: 'home', icon: <Home className="w-5 h-5"/>, label: 'Home' },
                      { id: 'work', icon: <LayoutGrid className="w-5 h-5"/>, label: 'Work' },
                      { id: 'me', icon: <User className="w-5 h-5"/>, label: 'Me' }
                    ].map((item, i) => (
                      <motion.div 
                        key={item.id} 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setEmulatorTab(item.id as any)}
                        className="flex flex-col items-center gap-1 cursor-pointer"
                      >
                        <div className={`${emulatorTab === item.id ? 'text-jb-primary' : (activeTab === 'Theme.tsx' ? 'text-slate-500' : 'text-slate-400')}`}>{item.icon}</div>
                        <span className={`text-[9px] font-mono font-bold ${emulatorTab === item.id ? 'text-jb-primary' : (activeTab === 'Theme.tsx' ? 'text-slate-600' : 'text-slate-400')} uppercase tracking-tighter`}>
                          {item.label}
                        </span>
                        {emulatorTab === item.id && <motion.div layoutId="active-dot" className="w-1 h-1 bg-jb-primary rounded-full mt-0.5" />}
                      </motion.div>
                    ))}
                    {/* Home Indicator */}
                    <div className="absolute bottom-2 inset-x-0 mx-auto w-20 h-1 bg-slate-800/20 rounded-full"></div>
                  </motion.div>
                )}

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
      {/* Tech Stack Bar (Subtle) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-8 opacity-30 hover:opacity-60 transition-opacity duration-500 hidden md:flex"
      >
        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mr-4">Stack:</span>
        {['Kotlin', 'Swift', 'React Native', 'Firebase', 'Jetpack Compose'].map((tech) => (
          <span key={tech} className="text-[11px] font-mono text-slate-500 hover:text-jb-primary cursor-default transition-colors">
            {tech}
          </span>
        ))}
      </motion.div>

      {/* Success Flash Effect */}
      <AnimatePresence>
        {heroState === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-white z-[100] pointer-events-none"
          />
        )}
      </AnimatePresence>
    </section>
  );
}
