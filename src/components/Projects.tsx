import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Platform Optimizer',
    description: 'Sistema de gestão e otimização de recursos académicos. Permite escalar e distribuir processamento de dados.',
    tags: ['React', 'Java', 'Spring Boot', 'PostgreSQL'],
    demo: '#',
    github: '#',
    gradient: 'from-purple-500/20 to-transparent',
    hoverText: 'group-hover:text-purple-600',
    linkColor: 'text-purple-600'
  },
  {
    title: 'Task Orchestrator',
    description: 'Aplicação distribuída para coordenar tarefas complexas em ambiente de microsserviços. Implementado usando o padrão Event Sourcing.',
    tags: ['Golang', 'Docker', 'RabbitMQ', 'Vue.js'],
    demo: '#',
    github: '#',
    gradient: 'from-cyan-500/20 to-transparent',
    hoverText: 'group-hover:text-cyan-600',
    linkColor: 'text-cyan-600'
  },
  {
    title: 'Neural Web Analyst',
    description: 'Ferramenta de visualização de redes neurais a correr diretamente no browser. Focado em performance máxima.',
    tags: ['TypeScript', 'WebGL', 'Python', 'FastAPI'],
    demo: '#',
    github: '#',
    gradient: 'from-emerald-500/20 to-transparent',
    hoverText: 'group-hover:text-emerald-600',
    linkColor: 'text-emerald-600'
  },
  {
    title: 'CLI Scaffolding Tool',
    description: 'Interface de linha de comandos (CLI) desenhada para inicializar projetos rapidamente de acordo com os padrões da universidade.',
    tags: ['Node.js', 'Bash', 'Commander.js'],
    demo: null,
    github: '#',
    gradient: 'from-orange-500/20 to-transparent',
    hoverText: 'group-hover:text-orange-600',
    linkColor: 'text-orange-600'
  },
];

export default function Projects() {
  return (
    <section className="px-6 py-12 lg:px-10 flex-1 bg-slate-50/50" id="projetos">
      <div className="flex items-center justify-between mb-8 cursor-default">
        <h2 className="text-xl font-bold font-mono tracking-tighter text-slate-800 uppercase">
          02 // Projetos em Destaque
        </h2>
        <div className="h-[1px] flex-1 ml-6 bg-slate-200"></div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row md:h-[240px]"
          >
            {/* Visual Area (Placeholder) */}
            <div className="relative h-48 md:h-auto md:w-1/3 bg-slate-100 overflow-hidden shrink-0">
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}></div>
              <div className="flex items-center justify-center h-full">
                <span className="font-mono text-xs tracking-widest text-slate-400 opacity-60">
                  IMAGE PREVIEW
                </span>
              </div>
              {/* Optional: Pattern for placeholder */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }}
              ></div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 flex flex-col">
              <h3 className={`text-xl font-bold mb-2 transition-colors ${project.hoverText}`}>{project.title}</h3>
              <p className="text-sm text-slate-500 flex-1 leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-1 bg-slate-100 rounded text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 mt-auto">
                {project.github && (
                  <a
                    href={project.github}
                    className={`flex items-center gap-1.5 text-xs font-bold transition-colors hover:opacity-80 ${project.linkColor}`}
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>VER CÓDIGO &rarr;</span>
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    className={`flex items-center gap-1.5 text-xs font-bold transition-colors hover:opacity-80 ${project.linkColor}`}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>LIVE DEMO &rarr;</span>
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
