import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
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

const getSkillCategories = (t: any) => [
  {
    id: 'mobile',
    title: t('skills.categories.mobile'),
    folder: 'mobile',
    items: [
      { name: 'Kotlin', ext: 'kt', icon: KotlinIcon, code: `// ${t('skills.items.kotlin.title')}
import kotlinx.coroutines.*
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope

// ${t('skills.items.kotlin.desc')}

class ProductViewModel(
    private val repository: ProductRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow<UiState>(UiState.Loading)
    val uiState: StateFlow<UiState> = _uiState.asStateFlow()

    init {
        fetchProducts()
    }

    private fun fetchProducts() {
        viewModelScope.launch(Dispatchers.IO) {
            try {
                // Async network call
                val products = repository.getProducts()
                _uiState.value = UiState.Success(products)
            } catch (e: Exception) {
                // Error handling gracefully
                _uiState.value = UiState.Error(e.message ?: "Unknown error")
            }
        }
    }
}` },
      { name: 'JetpackCompose', ext: 'kt', icon: JetpackComposeIcon, code: `// ${t('skills.items.compose.title')}
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*

// ${t('skills.items.compose.desc')}

@Composable
fun ProductScreen(
    viewModel: ProductViewModel,
    onProductClick: (Int) -> Unit
) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()
    
    Scaffold(
        topBar = { TopAppBar(title = { Text("Store") }) }
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            when (val currentState = state) {
                is UiState.Loading -> CircularProgressIndicator()
                is UiState.Error -> ErrorMessage(currentState.msg)
                is UiState.Success -> {
                    ProductList(
                        items = currentState.products,
                        onItemClick = onProductClick
                    )
                }
            }
        }
    }
}` },
      { name: 'AndroidSDK', ext: 'java', icon: AndroidIcon, code: `// ${t('skills.items.android.title')}
package com.miguelsantos.core;

import android.app.Application;
import android.os.StrictMode;
import android.util.Log;

// ${t('skills.items.android.desc')}

public class FoundationApp extends Application {
    
    private static final String TAG = "FoundationApp";

    @Override
    public void onCreate() {
        super.onCreate();
        
        // Setup Crashlytics, DI (Hilt/Dagger), and Analytics
        initializeDependencyInjection();
        setupStrictModeForDebugging();
        
        Log.i(TAG, "Application initialized. Ready for scale.");
    }
    
    private void setupStrictModeForDebugging() {
        if (BuildConfig.DEBUG) {
            StrictMode.setThreadPolicy(new StrictMode.ThreadPolicy.Builder()
                .detectDiskReads()
                .detectDiskWrites()
                .detectNetwork()
                .penaltyLog()
                .build());
        }
    }
}` },
      { name: 'Java', ext: 'java', icon: JavaIcon, code: `// ${t('skills.items.java.title')}
package com.miguelsantos.legacy;

import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

// ${t('skills.items.java.desc')}

public class JavaArchitecture {
    
    public static void main(String[] args) {
        System.out.println("Processing large datasets with Streams");
        
        var processors = List.of(
            new DataProcessor("Users"),
            new DataProcessor("Transactions")
        );
        
        // Multi-threading the traditional powerful way
        var futures = processors.stream()
            .map(p -> CompletableFuture.supplyAsync(p::process))
            .collect(Collectors.toList());
            
        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
            .thenRun(() -> System.out.println("All tasks finished!"))
            .join();
    }
}` },
    ]
  },
  {
    id: 'web',
    title: t('skills.categories.web'),
    folder: 'web',
    items: [
      { name: 'React', ext: 'tsx', icon: ReactIcon, code: `// ${t('skills.items.react.title')}
import React, { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

// ${t('skills.items.react.desc')}

interface DashboardProps {
  userId: string;
}

export const ModernDashboard: React.FC<DashboardProps> = ({ userId }) => {
  const [data, setData] = useState<AppMetrics | null>(null);
  
  const fetchMetrics = useCallback(async () => {
    const res = await api.get('/v1/metrics', { user: userId });
    setData(res.data);
  }, [userId]);
  
  useEffect(() => {
    fetchMetrics();
    // Setting up web-sockets for real-time graphs
    const ws = new WebSocketClient('/live-stats');
    ws.onMessage(updateGraphs);
    
    return () => ws.shutdown();
  }, [fetchMetrics]);

  return (
    <div className="dashboard-grid">
       <Header current={data?.title} />
       <MainGraphs metrics={data} />
       <SidebarNotifications />
    </div>
  );
};` },
      { name: 'Vite', ext: 'config.ts', icon: ViteIcon, code: `// ${t('skills.items.vite.title')}
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// ${t('skills.items.vite.desc')}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@ui': path.resolve(__dirname, './src/components/ui')
      }
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'motion']
          }
        }
      }
    },
    server: { 
      port: 3000,
      cors: true
    }
  };
});` },
      { name: 'Postgres', ext: 'sql', icon: PostgresIcon, code: `-- ${t('skills.items.postgres.title')}
-- ${t('skills.items.postgres.desc')}

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    profile JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexing JSON properties for fast searches
CREATE INDEX idx_users_preferences 
ON users USING GIN (profile->'preferences');

-- Security RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see their own data"
ON users FOR SELECT 
USING (auth.uid() = id);

-- Analytics View
CREATE OR REPLACE VIEW daily_active_users AS
SELECT date_trunc('day', last_login) as day, count(DISTINCT id)
FROM users
GROUP BY 1 ORDER BY 1 DESC;` },
      { name: 'Tailwind', ext: 'css', icon: TailwindIcon, code: `/* ${t('skills.items.tailwind.title')} */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 
 * ${t('skills.items.tailwind.desc')}
 */

@layer components {
  /* Componentes complexos abstratos para código React mais limpo */
  .card-premium {
    @apply relative overflow-hidden bg-white/10 
           backdrop-blur-xl border border-white/20 
           rounded-2xl transition-all duration-500 ease-out;
  }
  
  .card-premium:hover {
    @apply scale-[1.02] shadow-[0_20px_40px_rgba(0,0,0,0.2)] 
           border-white/40;
  }

  /* Custom Glow animations */
  .animated-glow {
    @apply absolute -inset-[1px] bg-gradient-to-r 
           from-blue-500 to-purple-600 rounded-2xl opacity-0 
           blur-md transition-opacity duration-500;
  }
  
  .group:hover .animated-glow {
    @apply opacity-50;
  }
}` },
    ]
  },
  {
    id: 'tools',
    title: t('skills.categories.tools'),
    folder: 'tools',
    items: [
      { name: 'AndroidStudio', ext: 'xml', icon: AndroidStudioIcon, code: `<!-- ${t('skills.items.studio.title')} -->
<component name="ProjectSettings">
    <!-- 
      ${t('skills.items.studio.desc')}
    -->
    <option name="optimizeImports" value="true" />
    <option name="showLineNumbers" value="true" />
    
    <component name="MemoryProfiler">
       <option name="captureAllocations" value="true" />
       <option name="heapDumpFormat" value="HPROF" />
    </component>
    
    <component name="CodeStyleSettings">
       <option name="RIGHT_MARGIN" value="100" />
       <option name="KT_FORMATTING" value="canonical" />
    </component>
</component>` },
      { name: 'GitConfig', ext: 'json', icon: GitIcon, code: `{
  "description": "${t('skills.items.git.title')}",
  "tools": "Git & GitHub",
  "usage": "Trabalho diário em equipa",
  
  // ${t('skills.items.git.desc')}
  "user": {
    "name": "Miguel Santos",
    "email": "hello@miguelsantos.dev",
    "signingKey": "GPG_KEY_ID_123"
  },
  "core": {
    "editor": "code --wait",
    "autocrlf": "input"
  },
  "alias": {
    "co": "checkout",
    "br": "branch",
    "ci": "commit",
    "st": "status",
    "unstage": "reset HEAD --",
    "last": "log -1 HEAD",
    "visual": "!gitk"
  }
}` },
      { name: 'IntelliJ', ext: 'config', icon: IntelliJIcon, code: `// ${t('skills.items.intellij.title')}
// ${t('skills.items.intellij.desc')}

plugin_manager.enable("Database_Tools_and_SQL")
plugin_manager.enable("Docker_Integration")
plugin_manager.enable("Copilot")

editor.setup {
  font_family = "Fira Code"
  line_height = 1.4
  show_whitespaces = true
  inlay_hints = true
}

// Power-user shortcuts
shortcut.add("CTRL+SHIFT+A", "Search_Everywhere")
shortcut.add("SHIFT+SHIFT", "Search_Files")
shortcut.add("ALT+ENTER", "Show_Intentions")
shortcut.add("CTRL+D", "Duplicate_Line")` },
      { name: 'VSCode', ext: 'json', icon: VSCodeIcon, code: `{
  "description": "${t('skills.items.vscode.title')}",
  "editor": "Visual Studio Code",
  
  // ${t('skills.items.vscode.desc')}
  
  "editor.fontSize": 14,
  "editor.fontFamily": "'JetBrains Mono', 'Cascadia Code', monospace",
  "editor.fontLigatures": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": true,
  
  "workbench.colorTheme": "GitHub Dark Dimmed",
  "workbench.iconTheme": "material-icon-theme",
  
  "typescript.updateImportsOnFileMove.enabled": "always",
  "tailwindCSS.emmetCompletions": true
}` },
    ]
  }
];

export default function Skills() {
  const { t } = useLanguage();
  const skillCategories = getSkillCategories(t);
  
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
              {t('skills.badge')}
            </span>
            <div className="h-px flex-1 bg-linear-to-r from-jb-primary/20 to-transparent" />
          </motion.div>
          <h2 className="text-4xl sm:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9]">
            {t('skills.title')} <span className="text-jb-primary">/</span> <br />
            <span className="text-slate-500 font-mono italic normal-case font-medium text-xl sm:text-4xl">{t('skills.subtitle')}</span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl text-[15px] sm:text-base leading-relaxed">
            {t('skills.description')}
          </p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0d1117] rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-slate-800/50 overflow-hidden flex flex-col min-h-[600px] relative"
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

          <div className="flex-1 flex relative">
            <AnimatePresence initial={false}>
               {isSidebarOpen && (
                  <motion.div 
                     initial={{ width: 0, opacity: 0 }}
                     animate={{ width: 260, opacity: 1 }}
                     exit={{ width: 0, opacity: 0 }}
                     className="bg-[#0d1117] border-r border-slate-800 flex flex-col absolute md:relative inset-y-0 left-0 z-40 shadow-2xl md:shadow-none h-full"
                  >
                     <div className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center justify-between">
                        <span>{t('skills.explorer')}</span>
                        <ChevronDown className="w-3 h-3" />
                     </div>
                     
                     <div className="flex-1 px-2 py-2">
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
                                          <span>{cat.title}</span>
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

               <div className="flex-1 p-4 lg:p-8 font-mono text-[11px] sm:text-[13px] relative bg-[#0d1117]">
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
                                    <h4 className="text-white font-bold text-base lg:text-lg mb-1">{currentItem.name} {t('skills.proficiency')}</h4>
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
                        <p className="text-xs">{t('skills.selectFile')}</p>
                     </div>
                  )}
               </div>

               <div className="h-24 sm:h-32 bg-[#0d1117] border-t border-slate-800 p-4 font-mono text-[9px] sm:text-[11px] overflow-hidden shrink-0">
                  <div className="flex items-center gap-2 text-slate-500 mb-2 sm:mb-3 border-b border-slate-800 pb-2">
                     <TerminalIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                     <span className="uppercase tracking-widest font-bold">{t('skills.terminal')}</span>
                  </div>
                  <div className="space-y-1 text-slate-400">
                     <div className="flex gap-2 truncate">
                        <span className="text-green-400">➜</span>
                        <span className="text-blue-300">~</span>
                        <span>miguel-santos --analyze-stack</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-slate-500 italic">{t('skills.buildSuccess')} 1.4s</span>
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
