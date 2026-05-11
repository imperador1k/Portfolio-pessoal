import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Search, 
  Settings, 
  ChevronRight, 
  ChevronDown, 
  MoreHorizontal, 
  Clock, 
  Star, 
  Layout, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Download, 
  CheckSquare, 
  File, 
  Folder
} from 'lucide-react';

export default function ResumeView() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    experience: true,
    education: true,
    skills: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent relative min-h-screen border-t border-slate-200/50" id="cv">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-mono font-bold rounded-full tracking-wider uppercase border border-slate-200">
              Notion_Workspace
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight"
          >
            Interactive <span className="text-slate-400 font-light">Resume</span>
          </motion.h2>
        </div>

        {/* Notion Window Wrapper */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row h-[800px] max-h-[80vh]"
        >
          {/* Mobile Top Bar (Notion Style) */}
          <div className="md:hidden flex items-center justify-between p-3 border-b border-slate-200 bg-white sticky top-0 z-30 shadow-sm">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-700 font-medium"
            >
              <Layout className="w-5 h-5 text-blue-500" />
              <span className="text-sm">Abrir Workspace</span>
            </button>
            <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-600">M</div>
          </div>

          {/* Sidebar */}
          <AnimatePresence>
            {(isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
              <>
                {/* Mobile Backdrop */}
                {isSidebarOpen && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsSidebarOpen(false)}
                    className="md:hidden fixed inset-0 bg-slate-900/20 z-40 backdrop-blur-sm"
                  />
                )}
                
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 260, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className={`bg-[#fbfbfa] border-r border-slate-100 flex-shrink-0 flex-col h-full overflow-y-auto no-scrollbar absolute md:relative z-50 md:z-10 shadow-2xl md:shadow-none ${isSidebarOpen ? 'flex' : 'hidden md:flex'}`}
                >
                {/* Workspace Selector */}
                <div className="p-3 flex items-center justify-between hover:bg-slate-200/50 cursor-pointer transition-colors mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center text-[10px] font-bold text-white shadow-sm">M</div>
                    <span className="text-[13px] font-semibold text-[#37352f]">Miguel's Notion</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>

                {/* Search & Actions */}
                <div className="px-3 py-2 space-y-0.5">
                  <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-200/50 rounded cursor-pointer text-[#37352f] transition-colors">
                    <Search className="w-4 h-4 text-slate-400" />
                    <span className="text-[13px] font-medium">Search</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-200/50 rounded cursor-pointer text-[#37352f] transition-colors">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-[13px] font-medium">Updates</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-200/50 rounded cursor-pointer text-[#37352f] transition-colors">
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span className="text-[13px] font-medium">Settings & members</span>
                  </div>
                </div>

                <div className="mt-4 px-3">
                  <div className="px-2 py-1 flex items-center gap-1 group cursor-pointer">
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                    <span className="text-[11px] font-semibold text-slate-500 tracking-wide">WORKSPACE</span>
                  </div>
                  
                  <div className="space-y-0.5 mt-1">
                    <div className="flex items-center gap-2 px-2 py-1.5 bg-slate-200/50 rounded cursor-pointer text-[#37352f] font-medium">
                      <span className="text-[14px]">📄</span>
                      <span className="text-[13px]">Resume 2026</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-200/50 rounded cursor-pointer text-[#37352f] font-medium transition-colors">
                      <span className="text-[14px]">📁</span>
                      <span className="text-[13px]">Projects Database</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-200/50 rounded cursor-pointer text-[#37352f] font-medium transition-colors">
                      <span className="text-[14px]">📝</span>
                      <span className="text-[13px]">Notes & Ideas</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1 bg-white overflow-y-auto no-scrollbar relative flex flex-col">
            
            {/* Top Bar Navigation */}
            <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-slate-100 flex items-center justify-between px-4 py-3 shrink-0 hidden md:flex">
              <div className="flex items-center gap-2 text-[13px] text-slate-500">
                <span className="hover:underline cursor-pointer">Miguel's Notion</span>
                <span>/</span>
                <span className="flex items-center gap-1 text-[#37352f] font-medium">
                  📄 Resume 2026
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 hidden sm:inline-block">Edited just now</span>
                <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-100 transition-colors">
                  <Star className="w-4 h-4" />
                </button>
                <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-100 transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Notion Cover Image */}
            <div className="h-48 sm:h-64 w-full relative shrink-0">
               <div className="absolute inset-0 bg-slate-100 overflow-hidden">
                  <img 
                    src="/windows11.jpg" 
                    alt="Cover" 
                    className="w-full h-full object-cover object-center"
                  />
               </div>
            </div>

            {/* Notion Page Content */}
            <div className="px-6 sm:px-16 lg:px-24 py-8 pb-32 max-w-4xl mx-auto w-full flex-1 -mt-16 sm:-mt-20 relative z-10">
              
              {/* Page Icon & Title */}
              <div className="mb-8">
                <div className="text-[64px] sm:text-[78px] leading-none mb-4 bg-white inline-block rounded-xl shadow-sm p-2 border border-slate-100">📄</div>
                <h1 className="text-4xl sm:text-5xl font-bold text-[#37352f] tracking-tight outline-none" contentEditable suppressContentEditableWarning>
                  Miguel Santos - Resume
                </h1>
              </div>

              {/* Premium Download Banner */}
              <div className="mb-12 relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-[#f8fafc] to-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow group flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                {/* Background glows */}
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-700"></div>
                
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex items-center justify-center shrink-0 text-blue-500 group-hover:scale-105 transition-transform duration-500">
                    <FileText className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-900 tracking-tight">
                      Currículo Oficial 2026
                    </h3>
                    <p className="text-[14px] text-slate-500 mt-1.5 max-w-md leading-relaxed">
                      Leva o histórico completo e detalhado. Perfeito para imprimir, partilhar no formato PDF ou consultar offline.
                    </p>
                  </div>
                </div>
                
                <a 
                  href="/cv.pdf" 
                  download="Miguel_Santos_CV_2026.pdf"
                  className="relative z-10 w-full md:w-auto shrink-0 flex items-center justify-center gap-2.5 px-7 py-3.5 bg-slate-900 hover:bg-black text-white rounded-xl font-medium text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                >
                  <Download className="w-4 h-4" />
                  <span>Descarregar PDF</span>
                </a>
              </div>

              {/* Notion Blocks */}
              <div className="space-y-6 text-[#37352f]">
                
                {/* Intro */}
                <p className="text-[15px] leading-relaxed outline-none" contentEditable suppressContentEditableWarning>
                  Futuro Engenheiro de Software com um mindset focado em resultados e performance. Especialista em dominar o ecossistema Android Nativo e elevar interfaces Web a um nível premium. Unindo a complexidade do Kotlin à versatilidade do TypeScript para construir o futuro, um commit de cada vez.
                </p>

                {/* Divider */}
                <hr className="border-slate-200 my-6" />

                {/* Experience Toggle */}
                <div>
                  <div 
                    className="flex items-center gap-2 py-1 hover:bg-slate-100/50 rounded cursor-pointer -ml-6 pl-6 transition-colors"
                    onClick={() => toggleSection('experience')}
                  >
                    <motion.div animate={{ rotate: expandedSections.experience ? 90 : 0 }} className="text-slate-400">
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-slate-400" /> Experience
                    </h3>
                  </div>
                  
                  <AnimatePresence>
                    {expandedSections.experience && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-6 border-l-2 border-slate-100 ml-[9px] mt-4 space-y-6 pb-2">
                          <div>
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-semibold text-[15px]">Web Developer Freelancer</h4>
                              <span className="text-xs text-slate-400 font-mono">Jan 2024 - Present</span>
                            </div>
                            <p className="text-sm text-slate-500 mb-2">Remote, Portugal</p>
                            <ul className="list-disc pl-4 text-[14px] space-y-1 text-slate-600 marker:text-slate-300">
                              <li>Desenvolvimento de SPAs com React e Vite.</li>
                              <li>Criação de landing pages focadas em conversão e performance.</li>
                              <li>Integração de APIs REST e arquitetura serverless.</li>
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Education Toggle */}
                <div>
                  <div 
                    className="flex items-center gap-2 py-1 hover:bg-slate-100/50 rounded cursor-pointer -ml-6 pl-6 transition-colors"
                    onClick={() => toggleSection('education')}
                  >
                    <motion.div animate={{ rotate: expandedSections.education ? 90 : 0 }} className="text-slate-400">
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-slate-400" /> Education
                    </h3>
                  </div>
                  
                  <AnimatePresence>
                    {expandedSections.education && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-6 border-l-2 border-slate-100 ml-[9px] mt-4 space-y-6 pb-2">
                          <div>
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-semibold text-[15px]">Licenciatura em Engenharia Informática</h4>
                              <span className="text-xs text-slate-400 font-mono">2024 - 2027</span>
                            </div>
                            <p className="text-sm text-slate-500">Instituto Politécnico de Tomar</p>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-semibold text-[15px]">Curso Profissional de Informática</h4>
                              <span className="text-xs text-slate-400 font-mono">2018 - 2023</span>
                            </div>
                            <p className="text-sm text-slate-500">Externato Cooperativo da Benedita</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Skills Toggle */}
                <div>
                  <div 
                    className="flex items-center gap-2 py-1 hover:bg-slate-100/50 rounded cursor-pointer -ml-6 pl-6 transition-colors"
                    onClick={() => toggleSection('skills')}
                  >
                    <motion.div animate={{ rotate: expandedSections.skills ? 90 : 0 }} className="text-slate-400">
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Code className="w-5 h-5 text-slate-400" /> Tech Stack
                    </h3>
                  </div>
                  
                  <AnimatePresence>
                    {expandedSections.skills && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-6 border-l-2 border-slate-100 ml-[9px] mt-4 pb-2">
                           <div className="bg-[#fbfbfa] border border-slate-200 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-3 border-b border-slate-200 pb-2">
                                 <File className="w-4 h-4 text-slate-400" />
                                 <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Database Table</span>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2 text-[13px]">
                                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> React / Vite</div>
                                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-600"></div> TypeScript</div>
                                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> Node.js</div>
                                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Kotlin</div>
                                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-400"></div> Android</div>
                                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-sky-500"></div> TailwindCSS</div>
                              </div>
                           </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
