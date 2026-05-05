import { ArrowRight, ChevronRight, FileCode2, LayoutGrid, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="px-5 sm:px-6 py-20 lg:py-24 lg:px-10 relative overflow-hidden" id="sobre">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Text Content */}
        <div className="lg:col-span-5 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 font-mono text-xs font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              KOTLIN & MOBILE DEVELOPER
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight leading-[1.05] mb-6 sm:text-6xl md:text-7xl text-slate-900">
              Construindo software <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">limpo e eficiente.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-slate-500 mb-10 lg:mx-0 leading-relaxed font-normal">
              Estudante de Engenharia Informática em Portugal. Focado em ecossistemas Mobile e Backend corporativos. Arquiteturas escaláveis, código tipado e pragmatismo visual.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <motion.a
                whileTap={{ scale: 0.95 }}
                href="#projetos"
                className="group flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-bold text-sm shadow-[0_4px_14px_0_rgba(168,85,247,0.39)] hover:shadow-[0_6px_20px_rgba(168,85,247,0.23)] transition-all"
              >
                Explorar Projetos
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                whileTap={{ scale: 0.95 }}
                href="#contactos"
                className="flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-3.5 bg-white backdrop-blur-md border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
              >
                <Terminal className="h-4 w-4 text-slate-500" />
                Contactar
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Complex IDE Mockup (Light Mode) */}
        <div className="lg:col-span-7 relative w-full perspective-1000 hidden lg:block">
          <motion.div 
            initial={{ opacity: 0, x: 40, rotateY: 5 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="relative transform-gpu"
          >
            {/* Massive diffuse light for IDE */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 blur-[80px] rounded-[40px] -z-10 translate-y-8"></div>
            
            <div className="rounded-2xl border border-slate-200/60 bg-white/60 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden max-h-[500px] relative">
              {/* Inner ring for glassmorphism */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/50 pointer-events-none z-50"></div>
              
              {/* IDE Header */}
              <div className="h-10 border-b border-slate-100 bg-slate-50/80 backdrop-blur-sm flex items-center justify-between px-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 font-medium cursor-default">
                  <LayoutGrid className="w-3 h-3" />
                  <span>app-core</span>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                  <span>src</span>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                  <span>MainActivity.kt</span>
                </div>
                <div></div>
              </div>

              <div className="flex flex-1 overflow-hidden">
                {/* IDE Sidebar */}
                <div className="w-48 border-r border-slate-100 bg-slate-50/50 p-2 hidden sm:block overflow-y-auto">
                  <div className="text-[10px] font-bold text-slate-400 mb-2 mt-1 uppercase tracking-wider pl-2">Project</div>
                  <div className="space-y-1 text-xs font-mono text-slate-600">
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer hover:bg-slate-100/50">
                      <ChevronRight className="w-3 h-3 rotate-90" />
                      <span className="font-semibold text-slate-700">app</span>
                    </div>
                    <div className="pl-4 space-y-0.5">
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-purple-50/50 text-purple-700 font-medium rounded cursor-default border border-purple-100/50">
                        <FileCode2 className="w-3.5 h-3.5 text-purple-500" />
                        MainActivity.kt
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 hover:bg-slate-100/50 rounded cursor-pointer">
                        <FileCode2 className="w-3.5 h-3.5 text-slate-400" />
                        AppModule.kt
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 hover:bg-slate-100/50 rounded cursor-pointer">
                        <FileCode2 className="w-3.5 h-3.5 text-slate-400" />
                        ApiService.kt
                      </div>
                    </div>
                  </div>
                </div>

                {/* IDE Code Area */}
                <div className="flex-1 bg-[#FAFAFA] p-0 font-mono text-[13px] overflow-hidden flex flex-col">
                   <div className="flex-1 overflow-y-auto w-full p-4">
                     <table className="w-full text-left border-spacing-0">
                       <tbody className="text-slate-800 leading-relaxed tabular-nums">
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">1</td><td><span className="text-[#CC7832]">package</span> <span className="text-slate-800">com.miguel.portfolio</span></td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">2</td><td></td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">3</td><td><span className="text-[#CC7832]">import</span> <span className="text-slate-800">android.os.Bundle</span></td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">4</td><td><span className="text-[#CC7832]">import</span> <span className="text-slate-800">androidx.activity.ComponentActivity</span></td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">5</td><td><span className="text-[#CC7832]">import</span> <span className="text-slate-800">androidx.activity.compose.setContent</span></td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">6</td><td></td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">7</td><td><span className="text-[#CC7832]">@AndroidEntryPoint</span></td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">8</td><td><span className="text-[#CC7832]">class</span> <span className="text-[#407A8B]">MainActivity</span> : <span className="text-[#407A8B]">ComponentActivity</span>() {'{'}</td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">9</td><td className="pl-4"><span className="text-[#CC7832]">override fun</span> <span className="text-[#FFC66D]">onCreate</span>(savedInstanceState: <span className="text-[#407A8B]">Bundle</span>?) {'{'}</td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">10</td><td className="pl-8"><span className="text-[#CC7832]">super</span>.onCreate(savedInstanceState)</td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">11</td><td className="pl-8">setContent {'{'}</td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">12</td><td className="pl-12"><span className="text-[#407A8B]">PortfolioTheme</span> {'{'}</td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">13</td><td className="pl-16"><span className="text-slate-500 italic">// Initialize scalable UI</span></td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">14</td><td className="pl-16"><span className="text-[#407A8B]">MainAppNavigation</span>()</td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">15</td><td className="pl-12">{'}'}</td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">16</td><td className="pl-8">{'}'}</td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">17</td><td className="pl-4">{'}'}</td></tr>
                         <tr><td className="w-8 text-slate-300 select-none text-right pr-4">18</td><td>{'}'}</td></tr>
                       </tbody>
                     </table>
                   </div>

                   {/* Terminal area with Telemetry */}
                   <div className="h-40 border-t border-slate-200/60 bg-white/80 backdrop-blur-md p-3 flex flex-col font-mono text-[10px] sm:text-xs text-slate-500 relative">
                     <div className="flex justify-between items-center mb-2 pb-1 text-slate-400 font-bold cursor-default border-b border-slate-100">
                        <div className="flex gap-4">
                          <span className="text-slate-800 border-b-2 border-purple-500 px-1 pb-1">BuildOutput</span>
                          <span className="pb-1 hover:text-slate-600 transition-colors">Telemetry</span>
                          <span className="pb-1 hover:text-slate-600 transition-colors">Logcat</span>
                        </div>
                        <div className="flex gap-3 text-[9px] items-center text-slate-400">
                           <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div> CPU: 12%</span>
                           <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div> RAM: 1.2GB</span>
                        </div>
                     </div>
                     <div className="flex-1 overflow-y-auto space-y-1 relative z-10">
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-bold">INFO:</span> 
                          <span>Daemon started resolving dependencies...</span>
                          <motion.div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                             <motion.div className="h-full bg-green-400" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.5, repeat: Infinity }} />
                          </motion.div>
                        </div>
                        <div><span className="text-blue-600 font-bold">Executing</span> tasks: [:app:assembleDebug]</div>
                        <div className="flex justify-between max-w-sm">
                           <span><span className="text-purple-500">{'>'}</span> Task :app:compileDebugKotlin</span>
                           <span className="text-slate-400">451ms</span>
                        </div>
                        <div className="flex justify-between max-w-sm">
                           <span><span className="text-purple-500">{'>'}</span> Task :app:packageDebug</span>
                           <span className="text-slate-400">120ms</span>
                        </div>
                        <div className="text-slate-700 font-bold mt-1">BUILD SUCCESSFUL in 1s 874ms</div>
                     </div>
                     
                     {/* Data flow lines background */}
                     <svg className="absolute right-0 bottom-0 w-32 h-32 opacity-20 pointer-events-none" viewBox="0 0 100 100">
                        <motion.path 
                           d="M 100 100 Q 50 50 100 0" 
                           fill="none" stroke="#9333ea" strokeWidth="2" 
                           initial={{ strokeDasharray: "0 100" }}
                           animate={{ strokeDasharray: "100 100", strokeDashoffset: [100, 0] }}
                           transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.path 
                           d="M 80 100 Q 30 50 80 0" 
                           fill="none" stroke="#06b6d4" strokeWidth="1" 
                           initial={{ strokeDasharray: "0 100" }}
                           animate={{ strokeDasharray: "100 100", strokeDashoffset: [100, 0] }}
                           transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                        />
                     </svg>
                   </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements to add life */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -right-6 top-20 w-12 h-12 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 flex items-center justify-center p-2"
            >
               <img src="https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png" alt="Kotlin" className="w-full h-full object-contain" />
            </motion.div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -left-6 bottom-32 w-12 h-12 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 flex items-center justify-center p-2"
            >
               <img src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" alt="Android" className="w-full h-full object-contain" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
