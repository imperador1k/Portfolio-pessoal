import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { 
  KotlinIcon, AndroidIcon, JavaIcon, ReactIcon, ViteIcon, PostgresIcon, 
  TailwindIcon, VSCodeIcon, GitIcon, IntelliJIcon, JetpackComposeIcon, AndroidStudioIcon 
} from './Icons';
import { 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  FileCode, 
  Terminal as TerminalIcon,
  Search,
  Layout,
  Menu,
  X,
  Code2
} from 'lucide-react';

const skillCategories = [
  {
    id: 'mobile',
    title: 'Mobile Ecosystem',
    folder: 'mobile',
    items: [
      { name: 'Kotlin', ext: 'kt', icon: KotlinIcon, code: `// Modern Native Android
class MiguelSantos : Developer() {
    val skills = listOf("Kotlin", "Coroutines", "KMP")
    
    fun buildApp() = compose {
        Text("Creating high performance apps")
    }
}` },
      { name: 'JetpackCompose', ext: 'kt', icon: JetpackComposeIcon, code: `@Composable
fun ModernUI() {
    val state by remember { mutableStateOf(true) }
    
    Box(modifier = Modifier.fillMaxSize()) {
        AnimatedVisibility(visible = state) {
            Text("Seamless UI Experiences")
        }
    }
}` },
      { name: 'AndroidSDK', ext: 'java', icon: AndroidIcon, code: `public class AndroidCore extends Activity {
    @Override
    protected void onCreate(Bundle saved) {
        super.onCreate(saved);
        setContentView(R.layout.activity_main);
        Log.d("Lifecycle", "App Initialized");
    }
}` },
      { name: 'Java', ext: 'java', icon: JavaIcon, code: `public class LegacyCore {
    public static void main(String[] args) {
        System.out.println("The foundation of many systems.");
    }
}` },
    ]
  },
  {
    id: 'web',
    title: 'Web & Backend',
    folder: 'web',
    items: [
      { name: 'React', ext: 'tsx', icon: ReactIcon, code: `import React from 'react';

export const Portfolio = () => {
  return (
    <div className="premium-ui">
       <h1>Engineered with Passion</h1>
       <p>Building scalable web apps</p>
    </div>
  );
};` },
      { name: 'Vite', ext: 'config.ts', icon: ViteIcon, code: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 }
});` },
      { name: 'Postgres', ext: 'sql', icon: PostgresIcon, code: `-- Database Schema
SELECT * FROM tech_stack
WHERE level = 'Advanced'
AND category IN ('Backend', 'Architecture')
ORDER BY performance DESC;` },
      { name: 'Tailwind', ext: 'css', icon: TailwindIcon, code: `/* Modern Styling */
.card-premium {
  @apply bg-white/10 backdrop-blur-md 
         border border-white/20 
         hover:scale-105 transition-all;
}` },
    ]
  },
  {
    id: 'tools',
    title: 'Dev Tools',
    folder: 'tools',
    items: [
      { name: 'AndroidStudio', ext: 'xml', icon: AndroidStudioIcon, code: `<!-- IDE Config -->
<component name="ProjectSettings">
    <option name="optimizeImports" value="true" />
    <option name="showLineNumbers" value="true" />
</component>` },
      { name: 'GitConfig', ext: 'json', icon: GitIcon, code: `{
  "user": {
    "name": "Miguel Santos",
    "status": "Ready to Collaborate",
    "branch": "production"
  },
  "preferences": {
    "ui": "clean",
    "performance": "max"
  }
}` },
      { name: 'IntelliJ', ext: 'config', icon: IntelliJIcon, code: `// IDE Configuration
plugin_manager.enable("AI_Assistance")
theme.set("JetBrains_Dark_Premium")
shortcut.add("CTRL+SHIFT+D", "Deploy")` },
      { name: 'VSCode', ext: 'json', icon: VSCodeIcon, code: `{
  "editor.fontSize": 14,
  "editor.fontFamily": "'JetBrains Mono'",
  "editor.bracketPairColorization.enabled": true
}` },
    ]
  }
];

export default function Skills() {
  const [openFiles, setOpenFiles] = useState<string[]>(['Kotlin']);
  const [activeFile, setActiveFile] = useState('Kotlin');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'src': true,
    'mobile': true,
    'web': false,
    'tools': false
  });
  
  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  const handleFileClick = (fileName: string) => {
    if (!openFiles.includes(fileName)) {
      setOpenFiles(prev => [...prev, fileName]);
    }
    setActiveFile(fileName);
    if (window.innerWidth < 768) {
       setIsSidebarOpen(false);
    }
  };

  const closeFile = (e: React.MouseEvent, fileName: string) => {
    e.stopPropagation();
    const newFiles = openFiles.filter(f => f !== fileName);
    setOpenFiles(newFiles);
    if (activeFile === fileName && newFiles.length > 0) {
      setActiveFile(newFiles[newFiles.length - 1]);
    } else if (newFiles.length === 0) {
      setActiveFile('');
    }
  };

  const allItems = skillCategories.flatMap(c => c.items);
  const currentItem = allItems.find(i => i.name === activeFile) || allItems[0];

  return (
    <section className="px-4 sm:px-6 py-20 lg:py-32 lg:px-10 max-w-7xl mx-auto w-full relative z-10" id="skills">
      <div className="mb-0">
        <div className="flex flex-col mb-12 lg:mb-16 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="px-3 py-1 bg-jb-primary/10 text-jb-primary text-[10px] font-mono font-bold rounded-full tracking-widest uppercase shadow-sm">
              Technical_Workspace
            </span>
            <div className="h-px flex-1 bg-linear-to-r from-jb-primary/20 to-transparent" />
          </motion.div>
          <h2 className="text-4xl sm:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9]">
            Stack.ide <span className="text-jb-primary">/</span> <br />
            <span className="text-slate-500 font-mono italic normal-case font-medium text-xl sm:text-4xl">Engineering & Tools</span>
          </h2>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0d1117] rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-slate-800/50 overflow-hidden flex flex-col h-[600px] lg:h-[700px] relative"
        >
          <AnimatePresence>
             {!isSidebarOpen && (
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="md:hidden absolute bottom-6 right-6 z-50 w-12 h-12 bg-jb-primary text-white rounded-full shadow-lg flex items-center justify-center"
                >
                   <Menu className="w-6 h-6" />
                </button>
             )}
          </AnimatePresence>

          <div className="bg-[#161b22] px-4 py-3 flex items-center justify-between border-b border-slate-800 z-30">
             <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
             </div>
             <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-2 text-slate-500 text-[11px] font-mono">
                <Layout className="w-3 h-3" />
                <span>miguel-dev — src/{currentItem?.name}.{currentItem?.ext}</span>
             </div>
             <div className="flex items-center gap-3 text-slate-500">
                <Search className="w-3.5 h-3.5" />
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hover:text-white transition-colors">
                   <Menu className="w-4 h-4" />
                </button>
             </div>
          </div>

          <div className="flex-1 flex overflow-hidden relative">
            <AnimatePresence initial={false}>
               {isSidebarOpen && (
                  <motion.div 
                     initial={{ width: 0, opacity: 0 }}
                     animate={{ width: 260, opacity: 1 }}
                     exit={{ width: 0, opacity: 0 }}
                     className="bg-[#0d1117] border-right border-slate-800 flex flex-col absolute md:relative inset-y-0 left-0 z-40 shadow-2xl md:shadow-none h-full"
                  >
                     <div className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center justify-between">
                        <span>Explorer</span>
                        <ChevronDown className="w-3 h-3" />
                     </div>
                     
                     <div className="flex-1 overflow-y-auto px-2 py-2 no-scrollbar">
                        <div className="mb-2">
                           <button 
                              onClick={() => toggleFolder('src')}
                              className="flex items-center gap-2 w-full px-2 py-1.5 text-slate-300 text-xs hover:bg-slate-800/50 rounded transition-colors"
                           >
                              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${expandedFolders['src'] ? 'rotate-90' : ''}`} />
                              <Folder className="w-4 h-4 text-jb-primary/70" />
                              <span className="font-medium">src</span>
                           </button>
                           
                           {expandedFolders['src'] && (
                              <div className="ml-4">
                                 {skillCategories.map((cat) => (
                                    <div key={cat.id}>
                                       <button 
                                          onClick={() => toggleFolder(cat.id)}
                                          className="flex items-center gap-2 w-full px-2 py-1.5 text-xs text-slate-400 hover:bg-slate-800/30 rounded transition-colors"
                                       >
                                          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${expandedFolders[cat.id] ? 'rotate-90' : ''}`} />
                                          <Folder className="w-4 h-4 text-slate-500" />
                                          <span>{cat.folder}</span>
                                       </button>
                                       
                                       {expandedFolders[cat.id] && (
                                          <div className="ml-5">
                                             {cat.items.map(item => (
                                                <button 
                                                   key={item.name}
                                                   onClick={() => handleFileClick(item.name)}
                                                   className={`flex items-center gap-2 w-full px-2 py-1.5 text-[11px] rounded transition-colors mb-0.5 ${
                                                      activeFile === item.name ? 'bg-jb-primary/20 text-jb-primary' : 'text-slate-500 hover:text-slate-300'
                                                   }`}
                                                >
                                                   <FileCode className="w-3.5 h-3.5" />
                                                   <span>{item.name}.{item.ext}</span>
                                                </button>
                                             ))}
                                          </div>
                                       )}
                                    </div>
                                 ))}
                              </div>
                           )}
                        </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>

            <div className="flex-1 flex flex-col bg-[#0d1117] min-w-0">
               <div className="flex bg-[#161b22] overflow-x-auto no-scrollbar border-b border-slate-800/50">
                  {openFiles.map(fileName => {
                     const item = allItems.find(i => i.name === fileName);
                     return (
                        <button
                           key={fileName}
                           onClick={() => setActiveFile(fileName)}
                           className={`flex items-center gap-2 px-4 py-2.5 text-[11px] font-mono border-r border-slate-800 transition-all min-w-[120px] max-w-[180px] shrink-0 ${
                              activeFile === fileName 
                              ? 'bg-[#0d1117] text-jb-primary border-t-2 border-t-jb-primary' 
                              : 'text-slate-500 hover:bg-slate-800/30'
                           }`}
                        >
                           <FileCode className="w-3.5 h-3.5 shrink-0" />
                           <span className="truncate">{fileName}.{item?.ext}</span>
                           <X 
                              onClick={(e) => closeFile(e, fileName)}
                              className="w-3 h-3 ml-2 hover:text-red-400 transition-colors shrink-0" 
                           />
                        </button>
                     );
                  })}
               </div>

               <div className="flex-1 p-4 lg:p-8 font-mono text-[11px] sm:text-[13px] overflow-y-auto no-scrollbar relative bg-[#0d1117]">
                  {openFiles.length > 0 && currentItem ? (
                     <>
                        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-transparent flex flex-col items-center pt-4 sm:pt-8 text-slate-700 pointer-events-none select-none text-[10px] sm:text-[12px] border-r border-slate-800/30">
                           {Array.from({ length: 30 }).map((_, i) => (
                              <div key={i} className="h-6 leading-6">{i + 1}</div>
                           ))}
                        </div>

                        <AnimatePresence mode="wait">
                           <motion.div
                              key={activeFile}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="ml-6 sm:ml-12 pl-4"
                           >
                              <pre className="text-slate-300 leading-6 whitespace-pre-wrap">
                                 {currentItem.code.split('\n').map((line, i) => (
                                    <div key={i} className="flex flex-wrap min-h-[24px]">
                                       {line.split(' ').map((word, j) => {
                                          let color = 'text-slate-300';
                                          const keywords = ['export', 'const', 'import', 'from', 'class', 'fun', 'val', 'private', 'public', 'protected', 'extends', 'override', '@Composable', '@Override'];
                                          const functions = ['listOf', 'compose', 'Text', 'Activity', 'Box', 'mutableStateOf', 'remember', 'setContentView', 'Log.d'];
                                          
                                          if (keywords.includes(word)) color = 'text-purple-400';
                                          if (functions.some(f => word.startsWith(f))) color = 'text-blue-300';
                                          if (word.startsWith('"') || word.endsWith('"') || word.startsWith("'")) color = 'text-green-300';
                                          if (word.startsWith('//') || word.startsWith('/*')) color = 'text-slate-500 italic';
                                          
                                          return (
                                             <span key={j} className={`${color} mr-1.5`}>
                                                {word}
                                             </span>
                                          );
                                       })}
                                    </div>
                                 ))}
                              </pre>

                              <motion.div 
                                 initial={{ scale: 0.9, opacity: 0 }}
                                 animate={{ scale: 1, opacity: 1 }}
                                 className="mt-8 lg:mt-12 p-4 lg:p-6 rounded-2xl bg-jb-primary/5 border border-jb-primary/20 flex flex-col sm:flex-row items-center gap-4 lg:gap-6 max-w-2xl"
                              >
                                 <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-[#161b22] border border-slate-800 flex items-center justify-center shadow-inner shrink-0">
                                    {React.createElement(currentItem.icon, { className: "w-6 h-6 lg:w-8 lg:h-8" })}
                                 </div>
                                 <div className="text-center sm:text-left flex-1 min-w-0">
                                    <h4 className="text-white font-bold text-base lg:text-lg mb-1">{currentItem.name} Proficiency</h4>
                                    <div className="flex items-center gap-3">
                                       <div className="h-1.5 lg:h-2 flex-1 bg-slate-800 rounded-full overflow-hidden">
                                          <motion.div 
                                             initial={{ width: 0 }}
                                             animate={{ width: '92%' }}
                                             transition={{ duration: 1.5, ease: "easeOut" }}
                                             className="h-full bg-jb-primary shadow-[0_0_10px_rgba(127,82,255,0.5)]"
                                          />
                                       </div>
                                       <span className="text-jb-primary font-bold text-[10px] lg:text-xs">92%</span>
                                    </div>
                                 </div>
                              </motion.div>
                           </motion.div>
                        </AnimatePresence>
                     </>
                  ) : (
                     <div className="h-full flex flex-col items-center justify-center text-slate-600">
                        <Code2 className="w-12 h-12 mb-4 opacity-20" />
                        <p className="text-xs">Select a file from the explorer.</p>
                     </div>
                  )}
               </div>

               <div className="h-24 sm:h-32 bg-[#0d1117] border-t border-slate-800 p-4 font-mono text-[9px] sm:text-[11px] overflow-hidden shrink-0">
                  <div className="flex items-center gap-2 text-slate-500 mb-2 sm:mb-3 border-b border-slate-800 pb-2">
                     <TerminalIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                     <span className="uppercase tracking-widest font-bold">Terminal — zsh</span>
                  </div>
                  <div className="space-y-1 text-slate-400">
                     <div className="flex gap-2 truncate">
                        <span className="text-green-400">➜</span>
                        <span className="text-blue-300">~</span>
                        <span>miguel-santos --analyze-stack</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-slate-500 italic">Build Success in 1.4s</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
