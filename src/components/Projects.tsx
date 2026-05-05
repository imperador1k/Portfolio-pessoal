import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { NetworkVisual, MicroservicesVisual, NeuralVisual, TerminalVisual } from './ProjectVisuals';

const projects = [
  {
    title: 'Cluster Data Engine',
    description: 'Sistema de gestão e otimização de recursos académicos. Permite escalar e distribuir processamento de dados geograficamente.',
    tags: ['React', 'Java', 'Spring Boot', 'PostgreSQL'],
    demo: '#',
    github: '#',
    type: 'network'
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
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
          02 // Projetos em Destaque
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="group bg-white/60 backdrop-blur-xl border border-white/60 rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(168,85,247,0.1)] hover:-translate-y-1 transition-all duration-500 flex flex-col h-full relative"
          >
            {/* Diffuse glow effect behind the card */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 rounded-[32px] -z-10"></div>
            {/* Inner Ring */}
            <div className="absolute inset-0 rounded-[32px] ring-1 ring-inset ring-slate-200/50 pointer-events-none z-30 group-hover:ring-purple-200/50 transition-colors"></div>

            {/* Visual Area */}
            <div className="relative h-72 border-b border-slate-100/50 overflow-hidden shrink-0 bg-[#FAFAFA]">
              {/* Overlay shadow for depth */}
              <div className="absolute inset-0 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.02)] z-20 pointer-events-none"></div>
              {project.type === 'network' && <NetworkVisual />}
              {project.type === 'microservices' && <MicroservicesVisual />}
              {project.type === 'neural' && <NeuralVisual />}
              {project.type === 'terminal' && <TerminalVisual />}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 md:p-10 flex flex-col z-10 bg-white/50">
              <h3 className={`text-2xl font-bold mb-3 text-slate-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-cyan-500 transition-all duration-300`}>{project.title}</h3>
              <p className="text-[15px] text-slate-600 flex-1 leading-relaxed mb-8 font-medium">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-10">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 font-bold tracking-wide shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-6 mt-auto">
                {project.github && (
                  <a
                    href={project.github}
                    className="flex items-center gap-1.5 text-[13px] font-bold text-slate-600 hover:text-slate-900 transition-colors group/link"
                  >
                    <Github className="h-4 w-4" />
                    <span>VER CÓDIGO</span>
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all -ml-1" />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    className="flex items-center gap-1.5 text-[13px] font-bold text-purple-600 hover:text-purple-700 transition-colors group/link"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>LIVE DEMO</span>
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all -ml-1" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
