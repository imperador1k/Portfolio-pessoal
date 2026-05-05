import { ArrowRight, ChevronRight, FileJson, LayoutGrid, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="px-6 py-20 lg:py-24 lg:px-10 relative overflow-hidden" id="sobre">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Text Content */}
        <div className="lg:col-span-5 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 font-mono text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              BUILDING SCALABLE SOLUTIONS
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight leading-[1.05] mb-6 sm:text-6xl md:text-7xl">
              Construindo software <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">limpo e eficiente.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600 mb-10 lg:mx-0 leading-relaxed">
              Estudante de Engenharia Informática em Portugal, com uma paixão por 
              arquiteturas robustas, código modular e interfaces funcionais.
              Sempre à procura do próximo desafio tecnológico.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="#projetos"
                className="group flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-purple-200 hover:shadow-purple-300 transition-all active:scale-[0.98]"
              >
                Explorar Projetos
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contactos"
                className="flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-3.5 bg-white/60 backdrop-blur-md border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                <Terminal className="h-4 w-4 text-slate-500" />
                Contactar
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Complex IDE Mockup */}
        <div className="lg:col-span-7 relative w-full perspective-1000 hidden lg:block">
          <motion.div 
            initial={{ opacity: 0, x: 20, rotateY: 5 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative transform-gpu"
          >
            {/* Diffuse purple glow behind IDE */}
            <div className="absolute inset-x-0 -bottom-10 h-1/2 bg-gradient-to-t from-purple-400/30 to-transparent blur-3xl rounded-xl -z-10"></div>
            
            <div className="rounded-2xl border border-slate-200/50 bg-white shadow-2xl flex flex-col overflow-hidden max-h-[500px]">
              
              {/* IDE Header */}
              <div className="h-10 border-b border-slate-100 bg-slate-50/80 backdrop-blur-sm flex items-center justify-between px-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
                </div>
                <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><LayoutGrid className="w-3 h-3" /> miguel-portfolio</span>
                  <span>src / components / Hero.tsx</span>
                </div>
                <div></div>
              </div>

              <div className="flex flex-1 overflow-hidden">
                {/* IDE Sidebar */}
                <div className="w-48 border-r border-slate-100 bg-slate-50/50 p-2 hidden sm:block overflow-y-auto">
                  <div className="text-[10px] font-bold text-slate-400 mb-2 mt-1 uppercase tracking-wider pl-2">Explorer</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-purple-50 text-purple-600 rounded text-xs font-mono font-medium cursor-default">
                      <ChevronRight className="w-3 h-3 rotate-90" />
                      src
                    </div>
                    <div className="pl-5 space-y-1 text-xs font-mono text-slate-500">
                      <div className="flex items-center gap-1.5 px-2 py-1 hover:bg-slate-100 hover:text-slate-700 rounded cursor-pointer">
                        <ChevronRight className="w-3 h-3 rotate-90" />
                        components
                      </div>
                      <div className="pl-4 space-y-0.5">
                        <div className="flex items-center gap-1.5 px-2 py-0.5 text-purple-600 bg-purple-50/50 rounded cursor-default">
                          <FileJson className="w-3 h-3" />
                          Hero.tsx
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 hover:text-slate-700 cursor-pointer">
                          <FileJson className="w-3 h-3" />
                          App.tsx
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* IDE Code Area */}
                <div className="flex-1 bg-white p-4 font-mono text-xs sm:text-sm overflow-hidden flex flex-col">
                   <div className="flex-1 overflow-y-auto w-full">
                     <table className="w-full text-left border-spacing-0">
                       <tbody className="text-slate-600 leading-relaxed">
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">1</td><td><span className="text-pink-500">import</span> {'{'} motion {'}'} <span className="text-pink-500">from</span> <span className="text-green-600">'motion/react'</span>;</td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">2</td><td><span className="text-pink-500">import</span> {'{'} useEffect, useState {'}'} <span className="text-pink-500">from</span> <span className="text-green-600">'react'</span>;</td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">3</td><td></td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">4</td><td><span className="text-purple-600">export default function</span> <span className="text-blue-500">Hero</span>() {'{'}</td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">5</td><td className="pl-4"><span className="text-purple-600">const</span> [isReady, setIsReady] = <span className="text-blue-500">useState</span>(<span className="text-orange-500">false</span>);</td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">6</td><td></td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">7</td><td className="pl-4"><span className="text-blue-500">useEffect</span>(() <span className="text-pink-500">=&gt;</span> {'{'}</td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">8</td><td className="pl-8">console.<span className="text-blue-500">log</span>(<span className="text-green-600">"Initializing scalable app..."</span>);</td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">9</td><td className="pl-8"><span className="text-blue-500">setIsReady</span>(<span className="text-orange-500">true</span>);</td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">10</td><td className="pl-4">{'}'}, []);</td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">11</td><td></td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">12</td><td className="pl-4"><span className="text-pink-500">return</span> (</td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">13</td><td className="pl-8">&lt;<span className="text-blue-500">motion.div</span> <span className="text-cyan-500">className</span>=<span className="text-green-600">"hero-container"</span>&gt;</td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">14</td><td className="pl-12">{'// Rendering future innovations'}</td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">15</td><td className="pl-8">&lt;/<span className="text-blue-500">motion.div</span>&gt;</td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">16</td><td className="pl-4">);</td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">17</td><td>{'}'}</td></tr>
                       </tbody>
                     </table>
                   </div>

                   {/* Terminal area */}
                   <div className="h-32 border-t border-slate-100 bg-[#1e1e1e] rounded-b-xl overflow-hidden text-slate-300 p-2 flex flex-col font-mono text-[10px] sm:text-xs">
                     <div className="flex gap-4 mb-2 border-b border-slate-700 pb-1">
                        <span className="text-white border-b-2 border-blue-500 px-1">TERMINAL</span>
                        <span className="text-slate-500">OUTPUT</span>
                        <span className="text-slate-500">DEBUG CONSOLE</span>
                     </div>
                     <div className="flex-1 overflow-y-auto space-y-1 mt-1">
                        <div><span className="text-green-400">~/miguel-portfolio/</span> <span className="text-cyan-400">npm</span> run dev</div>
                        <div><span className="text-blue-400">VITE v6.2.3</span> <span className="text-white">ready in 145 ms</span></div>
                        <div className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-green-500"/> <span className="text-green-400">➜</span>  <span className="text-white">Local:</span>   <span className="text-cyan-300">http://localhost:3000/</span></div>
                        <div className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-green-500 opacity-0"/> <span className="text-green-400">➜</span>  <span className="text-white">Network:</span> <span className="text-slate-400">use --host to expose</span></div>
                        <div className="text-yellow-400 mt-2">watching for file changes...</div>
                     </div>
                   </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements to add life */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -right-6 top-20 w-12 h-12 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center justify-center p-2"
            >
               <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" className="w-full h-full object-contain animate-spin-slow" style={{ animationDuration: '10s' }} />
            </motion.div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -left-6 bottom-32 w-12 h-12 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center justify-center p-2"
            >
               <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="TypeScript" className="w-full h-full object-contain" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
