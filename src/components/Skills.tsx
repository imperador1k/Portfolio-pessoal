import { Database, FileCode2, Layers, Layout, Server, Terminal } from 'lucide-react';

const skills = [
  { name: 'React', icon: Layout, colorClass: 'bg-blue-100', textClass: 'text-blue-600', hoverClass: 'hover:border-blue-400' },
  { name: 'Vite', icon: Terminal, colorClass: 'bg-cyan-100', textClass: 'text-cyan-600', hoverClass: 'hover:border-cyan-300' },
  { name: 'TypeScript', icon: FileCode2, colorClass: 'bg-blue-100', textClass: 'text-blue-600', hoverClass: 'hover:border-blue-500' },
  { name: 'Java', icon: Server, colorClass: 'bg-orange-100', textClass: 'text-orange-600', hoverClass: 'hover:border-orange-300' },
  { name: 'PostgreSQL', icon: Database, colorClass: 'bg-indigo-100', textClass: 'text-indigo-600', hoverClass: 'hover:border-indigo-400' },
  { name: 'Docker', icon: Layers, colorClass: 'bg-emerald-100', textClass: 'text-emerald-600', hoverClass: 'hover:border-emerald-300' },
];

export default function Skills() {
  return (
    <section className="px-6 py-12 lg:px-10" id="skills">
      <div className="mb-8">
        <h2 className="text-xl font-bold font-mono tracking-tighter text-slate-800">
          01 // TECNOLOGIAS E SKILLS
        </h2>
        <div className="mt-4 h-[1px] w-12 bg-purple-500"></div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 mb-12">
        {skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <div
              key={skill.name}
              className={`p-4 border border-slate-100 rounded-xl bg-slate-50/50 transition-all flex flex-col items-center justify-center gap-3 cursor-default ${skill.hoverClass}`}
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-md ${skill.colorClass} ${skill.textClass}`}>
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <span className="text-xs font-mono font-bold text-slate-700">
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <h3 className="text-xl font-bold text-slate-800">Estudante de Engenharia Informática</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Atualmente a frequentar o curso de Engenharia Informática em Portugal.
              Focado em compreender os fundamentos de algoritmos, estruturas de dados, e 
              arquitetura de software para construir soluções robustas desde a raiz.
            </p>
          </div>
          <div>
            <span className="inline-flex items-center rounded-md bg-emerald-50 px-3 py-1 font-mono text-xs font-bold text-emerald-600 ring-1 ring-inset ring-emerald-200 cursor-default">
              ● Status: Licenciatura em curso
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
