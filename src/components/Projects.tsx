import { ExternalLink, Github } from 'lucide-react';
import { NetworkVisual, MicroservicesVisual, NeuralVisual, TerminalVisual } from './ProjectVisuals';

const projects = [
  {
    title: 'Platform Optimizer',
    description: 'Sistema de gestão e otimização de recursos académicos. Permite escalar e distribuir processamento de dados geograficamente.',
    tags: ['React', 'Java', 'Spring Boot', 'PostgreSQL'],
    demo: '#',
    github: '#',
    hoverText: 'group-hover:text-purple-600',
    linkColor: 'text-purple-600',
    type: 'network'
  },
  {
    title: 'Task Orchestrator',
    description: 'Aplicação distribuída para coordenar tarefas complexas em ambiente de microsserviços. Usando o padrão Event Sourcing.',
    tags: ['Golang', 'Docker', 'RabbitMQ', 'Vue.js'],
    demo: '#',
    github: '#',
    hoverText: 'group-hover:text-cyan-600',
    linkColor: 'text-cyan-600',
    type: 'microservices'
  },
  {
    title: 'Neural Web Analyst',
    description: 'Ferramenta interativa e 3D para visualização de redes neurais a correr  no browser. Focado em performance máxima.',
    tags: ['TypeScript', 'WebGL', 'Python', 'FastAPI'],
    demo: '#',
    github: '#',
    hoverText: 'group-hover:text-emerald-600',
    linkColor: 'text-emerald-600',
    type: 'neural'
  },
  {
    title: 'CLI Scaffolding Tool',
    description: 'Interface de linha de comandos (CLI) desenhada para inicializar e manter projetos complexos rapidamente.',
    tags: ['Node.js', 'Bash', 'Commander.js'],
    demo: null,
    github: '#',
    hoverText: 'group-hover:text-orange-600',
    linkColor: 'text-orange-600',
    type: 'terminal'
  },
];

export default function Projects() {
  return (
    <section className="px-6 py-20 lg:px-10 max-w-7xl mx-auto w-full relative z-10" id="projetos">
      <div className="flex items-center justify-between mb-12 cursor-default">
        <h2 className="text-xl font-bold font-mono tracking-tighter text-slate-800 uppercase">
          02 // Projetos em Destaque
        </h2>
        <div className="h-[1px] flex-1 ml-6 bg-slate-200"></div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="group bg-white/70 backdrop-blur-md border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row md:h-[260px] relative"
          >
            {/* Visual Area */}
            <div className="relative h-56 md:h-full md:w-2/5 border-b md:border-b-0 md:border-r border-slate-100 overflow-hidden shrink-0">
              {project.type === 'network' && <NetworkVisual />}
              {project.type === 'microservices' && <MicroservicesVisual />}
              {project.type === 'neural' && <NeuralVisual />}
              {project.type === 'terminal' && <TerminalVisual />}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 flex flex-col z-10 bg-white/50">
              <h3 className={`text-xl font-bold mb-2 transition-colors ${project.hoverText}`}>{project.title}</h3>
              <p className="text-sm text-slate-600 flex-1 leading-relaxed mb-4 font-medium">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2.5 py-1 bg-slate-100/80 border border-slate-200 rounded-md text-slate-600 font-bold tracking-wide"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-6 mt-auto">
                {project.github && (
                  <a
                    href={project.github}
                    className={`flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors`}
                  >
                    <Github className="h-4 w-4" />
                    <span>REPO GITHUB</span>
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    className={`flex items-center gap-1.5 text-xs font-bold transition-colors hover:opacity-70 ${project.linkColor}`}
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>LIVE DEMO</span>
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
