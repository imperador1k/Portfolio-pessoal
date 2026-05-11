import { motion } from 'motion/react';
import { Network, ServerCog, TerminalSquare, Workflow } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const NetworkVisual = () => (
  <div className="absolute inset-0 bg-[#FAFAFA] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(#d8b4fe_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
    <div className="relative w-full h-full flex items-center justify-center perspective-1000">
       <motion.div 
         animate={{ rotateX: [20, 25, 20], rotateY: [-10, -5, -10] }} 
         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
         className="w-full h-full flex items-center justify-center transform-gpu preserve-3d"
       >
          <motion.div animate={{ rotateZ: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="w-48 h-48 border-[0.5px] border-purple-200 rounded-full flex items-center justify-center absolute">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 bg-purple-500 rounded-full absolute -top-1 shadow-[0_0_10px_#a855f7]"></motion.div>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="w-2 h-2 bg-cyan-500 rounded-full absolute -bottom-1 shadow-[0_0_10px_#06b6d4]"></motion.div>
          </motion.div>
          
          <motion.div animate={{ rotateZ: -360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="w-32 h-32 border-[0.5px] border-pink-200 border-dashed rounded-full flex items-center justify-center absolute">
            <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 bg-pink-500 rounded-full absolute right-0 shadow-[0_0_10px_#ec4899]"></motion.div>
          </motion.div>

          <div className="w-20 h-20 bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-center z-10 relative">
            <Workflow className="w-8 h-8 text-purple-600" />
            <motion.div animate={{ scale: [1, 1.5], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 border-2 border-purple-400 rounded-2xl"></motion.div>
          </div>
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            <path d="M 0 100 Q 150 0 300 100" fill="transparent" stroke="url(#grad1)" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-50" />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
       </motion.div>
    </div>
  </div>
);

export const MicroservicesVisual = () => {
  const { t } = useLanguage();
  return (
    <div className="absolute inset-0 bg-[#FAFAFA] flex items-center justify-center overflow-hidden p-4">
      <div className="grid grid-cols-2 gap-3 w-full h-full max-w-[200px]">
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="bg-white border border-slate-200 shadow-sm rounded p-2 flex flex-col gap-1 relative overflow-hidden">
          <div className="w-full h-1 bg-cyan-100 rounded"><motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 1.5, repeat: Infinity }} className="h-full bg-cyan-500 rounded"></motion.div></div>
          <div className="w-full h-8 bg-slate-50 rounded mt-auto flex items-center justify-center"><ServerCog className="w-4 h-4 text-cyan-500" /></div>
        </motion.div>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 3.5, repeat: Infinity }} className="bg-white border border-slate-200 shadow-sm rounded p-2 flex flex-col gap-1">
          <div className="w-full h-1 bg-blue-400 rounded w-2/3"></div>
          <div className="w-3/4 h-1 bg-slate-300 rounded"></div>
          <div className="w-1/2 h-1 bg-slate-300 rounded"></div>
        </motion.div>
        <div className="col-span-2 bg-slate-50 border border-slate-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] rounded p-2 font-mono text-[8px] text-slate-500 mt-2 overflow-hidden relative">
          <motion.div animate={{ y: [0, -20] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="space-y-1">
            <div className="font-bold text-slate-800">{'>'} {t('projects.visuals.microservices.started')}</div>
            <div className="text-emerald-600">{'>'} {t('projects.visuals.microservices.sync')}</div>
            <div>{'>'} {t('projects.visuals.microservices.ack')}</div>
            <div className="text-purple-600">{'>'} {t('projects.visuals.microservices.dispatch')}</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export const NeuralVisual = () => (
  <div className="absolute inset-0 bg-white flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/50 to-transparent"></div>
    <Network className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-emerald-100" strokeWidth={1} />
    <svg className="w-full h-full relative z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
      <motion.circle cx="30" cy="30" r="3" fill="#10b981" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.circle cx="30" cy="70" r="3" fill="#10b981" />
      <motion.circle cx="70" cy="50" r="4" fill="#059669" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <motion.line x1="30" y1="30" x2="70" y2="50" stroke="#a7f3d0" strokeWidth="1.5" animate={{ strokeDasharray: ["0,100", "100,0"] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <motion.line x1="30" y1="70" x2="70" y2="50" stroke="#a7f3d0" strokeWidth="1.5" animate={{ strokeDasharray: ["0,100", "100,0"] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
    </svg>
  </div>
);

export const TerminalVisual = () => {
  const { t } = useLanguage();
  return (
    <div className="absolute inset-0 bg-white p-4 flex flex-col font-mono text-xs overflow-hidden">
      <div className="flex gap-1.5 mb-4 border-b border-slate-100 pb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
      </div>
      <div className="space-y-1.5 text-slate-600 font-medium font-mono text-[11px]">
        <div><span className="text-orange-500 font-bold">~/projects</span> <span className="text-slate-800">$ npx</span> cli-scaffold init</div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <span className="text-cyan-600 font-bold">?</span> <span className="text-slate-800">Project name:</span> <span className="text-slate-500">enterprise-app</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex items-center gap-2">
          <TerminalSquare className="w-3 h-3 text-purple-500 animate-spin-slow" />
          <span className="text-slate-500">{t('projects.visuals.terminal.generating')}</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="pl-4">
          <span className="text-green-500 font-bold">✔</span> {t('projects.visuals.terminal.created')}
        </motion.div>
      </div>
    </div>
  );
};

export const MobileVisual = () => (
  <div className="absolute inset-0 bg-[#F8FAFC] flex items-center justify-center overflow-hidden p-6">
    {/* Stylized Phone Frame */}
    <motion.div 
      animate={{ y: [2, -2, 2] }} 
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="w-[140px] h-[240px] bg-white border-[3px] border-slate-900 rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col pt-4 px-3"
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-900 rounded-b-xl z-20"></div>
      
      {/* Screen Content */}
      <div className="flex-1 flex flex-col gap-3">
        {/* Header Profile */}
        <div className="flex items-center gap-2 mt-4">
          <div className="w-6 h-6 rounded-full bg-indigo-100 border border-indigo-200"></div>
          <div className="h-2 w-12 bg-slate-100 rounded"></div>
        </div>

        {/* Activity Chart Area */}
        <div className="h-16 w-full bg-indigo-50/50 rounded-xl border border-indigo-100 p-2 flex items-end gap-1 overflow-hidden">
          {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.1, duration: 1 }}
              className="flex-1 bg-indigo-500 rounded-t-sm"
            />
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="h-10 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center justify-center">
             <div className="w-4 h-1 bg-emerald-400 rounded-full mb-1"></div>
             <div className="w-6 h-1 bg-slate-200 rounded-full"></div>
          </div>
          <div className="h-10 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center justify-center">
             <div className="w-4 h-1 bg-orange-400 rounded-full mb-1"></div>
             <div className="w-6 h-1 bg-slate-200 rounded-full"></div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-auto mb-2 flex justify-around items-center">
          <div className="w-4 h-4 rounded-full bg-slate-100"></div>
          <div className="w-6 h-6 rounded-full bg-jb-primary flex items-center justify-center shadow-lg shadow-jb-primary/30">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <div className="w-4 h-4 rounded-full bg-slate-100"></div>
        </div>
      </div>
    </motion.div>

    {/* Background Decorative Circles */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-slate-100 rounded-full z-0"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-slate-50 rounded-full z-0"></div>
  </div>
);
