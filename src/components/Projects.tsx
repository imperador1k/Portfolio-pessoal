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
    <section className="px-6 py-24 lg:px-10 max-w-7xl mx-auto w-full relative z-10 bg-white" id="projetos">
      <div className="flex items-center justify-between mb-16 cursor-default">
        <h2 className="text-2xl font-bold font-mono tracking-tighter text-slate-800 uppercase">
          02 // Projetos em Destaque
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300 flex flex-col h-full relative"
          >
            {/* Visual Area */}
            <div className="relative h-64 border-b border-slate-100 overflow-hidden shrink-0 bg-slate-50">
              {project.type === 'network' && <NetworkVisual />}
              {project.type === 'microservices' && <MicroservicesVisual />}
              {project.type === 'neural' && <NeuralVisual />}
              {project.type === 'terminal' && <TerminalVisual />}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 flex flex-col z-10 bg-white">
              <h3 className={`text-2xl font-bold mb-3 text-slate-900 group-hover:text-purple-600 transition-colors`}>{project.title}</h3>
              <p className="text-sm text-slate-500 flex-1 leading-relaxed mb-6 font-medium">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-1 bg-slate-100 rounded-md text-slate-600 font-bold tracking-wide"
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
