import { Play, TerminalSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { NetworkVisual, MicroservicesVisual, NeuralVisual, TerminalVisual, MobileVisual } from './ProjectVisuals';

const projects = [
  {
    title: 'Nyro',
    description: 'Redefinição da experiência de treino outdoor. Uma aplicação Android nativa (Kotlin + Jetpack Compose) desenhada para preencher a lacuna social do Strava através de gamificação profunda e gestão dinâmica de grupos.',
    tags: ['Android Native', 'Kotlin', 'Jetpack Compose', 'Material 3', 'Social Engineering'],
    demo: null,
    github: 'https://github.com/imperador1k/Nyro',
    type: 'mobile'
  },
  {
    title: 'Task Orchestrator',
    description: 'Aplicação distribuída para coordenar tarefas complexas em ambiente de microsserviços. Implementado usando o padrão Event Sourcing.',
    tags: ['Kotlin', 'Docker', 'RabbitMQ', 'Android'],
    demo: '#',
    github: '#',
    type: 'microservices'
  },
  {
    title: 'Neural Web Analyst',
    description: 'Ferramenta interativa para visualização de redes neurais no browser focada em performance máxima e tipagem forte.',
    tags: ['TypeScript', 'WebGL', 'Python', 'FastAPI'],
    demo: '#',
    github: '#',
    type: 'neural'
  },
  {
    title: 'CLI Scaffolding Tool',
    description: 'Interface de linha de comandos (CLI) desenhada para inicializar e manter projetos corporativos rapidamente.',
    tags: ['Node.js', 'Bash', 'Commander.js'],
    demo: null,
    github: '#',
    type: 'terminal'
  },
];

export default function Projects() {
  return (
    <section className="px-5 sm:px-6 py-24 lg:px-10 max-w-7xl mx-auto w-full relative z-10" id="projetos">
      <div className="flex items-center justify-between mb-16 cursor-default">
        <h2 className="text-2xl font-bold font-mono tracking-tighter text-slate-800 uppercase flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-jb-primary animate-pulse"></span>
          04 // Repositories <span className="text-jb-primary not-italic">/</span> <br />
          <span className="text-slate-500 font-mono italic normal-case font-medium text-2xl sm:text-4xl">Production-Ready Solutions</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, idx) => {
          const isHero = idx === 0;

          return (
            <motion.div
              key={idx}
              whileHover="hover"
              className={`group bg-white rounded-2xl ring-1 ring-slate-100 shadow-lg shadow-slate-200/50 flex flex-col relative overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-jb-primary hover:-translate-y-1 ${
                isHero ? 'lg:col-span-2 lg:flex-row' : 'col-span-1'
              }`}
            >
              {/* IDE Mockup Visual Area */}
              <div
                className={`relative bg-slate-50 border-slate-200/50 overflow-hidden shrink-0 flex flex-col z-10 ${
                  isHero ? 'lg:w-[55%] lg:border-r border-b lg:border-b-0 min-h-[300px]' : 'h-64 border-b'
                }`}
              >
                {/* IDE Top Bar */}
                <div className="h-8 border-b border-slate-200 bg-slate-100/80 backdrop-blur-md flex items-center px-4 gap-1.5 shrink-0 z-20 absolute top-0 w-full">
                  <div className="w-3 h-3 rounded-full bg-slate-300 group-hover:bg-[#FF5F56] transition-colors duration-300"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-300 group-hover:bg-[#FFBD2E] transition-colors duration-300"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-300 group-hover:bg-[#27C93F] transition-colors duration-300"></div>
                </div>

                {/* Visual Content inside IDE */}
                <div className="relative flex-1 overflow-hidden p-0 pt-8">
                  <motion.div
                    variants={{
                      hover: { scale: 1.05, y: ["0%", "-10%"] },
                    }}
                    transition={{
                      scale: { duration: 0.4, ease: "easeOut" },
                      y: { duration: 10, repeat: Infinity, ease: 'linear' },
                    }}
                    className="w-full h-full min-h-[120%] origin-top flex flex-col"
                  >
                    <div className="flex-1 w-full flex">
                      {project.type === 'mobile' && <MobileVisual />}
                      {project.type === 'network' && <NetworkVisual />}
                      {project.type === 'microservices' && <MicroservicesVisual />}
                      {project.type === 'neural' && <NeuralVisual />}
                      {project.type === 'terminal' && <TerminalVisual />}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Content Area */}
              <div className={`flex flex-col p-8 z-20 bg-white ${isHero ? 'lg:w-[45%] lg:p-10 lg:justify-center' : 'flex-1'}`}>
                <h3 className="text-2xl font-bold font-sans text-slate-900 mb-3">{project.title}</h3>
                <p className="text-[15px] font-medium text-slate-600 mb-8 leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Tech Stack Array */}
                <div className="font-mono text-xs sm:text-[13px] text-slate-800 mb-10 flex flex-wrap gap-x-1.5 gap-y-2 items-center">
                  <span className="text-slate-400 font-bold">[</span>
                  {project.tags.map((tag, i) => (
                    <span key={tag} className="flex">
                      <span className="text-emerald-600 font-bold">"{tag}"</span>
                      {i < project.tags.length - 1 && <span className="text-slate-400">,</span>}
                    </span>
                  ))}
                  <span className="text-slate-400 font-bold">]</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 mt-auto">
                  {project.demo && (
                    <a
                      href={project.demo}
                      className="flex items-center gap-2 px-5 py-2.5 bg-jb-secondary/10 text-jb-primary hover:bg-jb-primary hover:text-white rounded-lg font-bold text-[13px] transition-colors border border-jb-primary/20 hover:border-jb-primary"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>RUN</span>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-lg font-bold text-[13px] transition-colors"
                    >
                      <TerminalSquare className="w-4 h-4" />
                      <span>SOURCE</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
