import { Briefcase, CalendarClock, Database, FileCode2, GraduationCap, LayoutPanelLeft, Layers, Server, Terminal, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

const skills = [
  { name: 'React', icon: LayoutPanelLeft, colorClass: 'bg-blue-100', textClass: 'text-blue-600', hoverBorder: 'group-hover:border-blue-400', glow: 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]' },
  { name: 'Vite', icon: Terminal, colorClass: 'bg-cyan-100', textClass: 'text-cyan-600', hoverBorder: 'group-hover:border-cyan-300', glow: 'group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]' },
  { name: 'TypeScript', icon: FileCode2, colorClass: 'bg-blue-100', textClass: 'text-blue-600', hoverBorder: 'group-hover:border-blue-500', glow: 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]' },
  { name: 'Java', icon: Server, colorClass: 'bg-orange-100', textClass: 'text-orange-600', hoverBorder: 'group-hover:border-orange-300', glow: 'group-hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]' },
  { name: 'PostgreSQL', icon: Database, colorClass: 'bg-indigo-100', textClass: 'text-indigo-600', hoverBorder: 'group-hover:border-indigo-400', glow: 'group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]' },
  { name: 'Docker', icon: Layers, colorClass: 'bg-emerald-100', textClass: 'text-emerald-600', hoverBorder: 'group-hover:border-emerald-300', glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]' },
];

const timeline = [
  {
    year: '2023 - Presente',
    title: 'Licenciatura em Engenharia Informática',
    organization: 'Universidade de Tecnologia',
    icon: GraduationCap,
    description: 'Foco em Sistemas Distribuídos, Algoritmos Avançados e Engenharia de Software.',
  },
  {
    year: 'Verão 2024',
    title: 'Estágio de Verão - Backend Developer',
    organization: 'TechFlow Solutions',
    icon: Briefcase,
    description: 'Desenvolvimento de REST APIs em Java Spring Boot e otimização de queries SQL.',
  },
  {
    year: 'Dez 2023',
    title: '1º Lugar no CodeJam Nacional',
    organization: 'Hackathon Universitário',
    icon: Trophy,
    description: 'Criada uma plataforma de partilha de apontamentos em tempo real usando WebSockets.',
  }
];

export default function Skills() {
  return (
    <section className="px-6 py-12 lg:px-10 max-w-7xl mx-auto w-full relative z-10" id="skills">
      <div className="mb-10">
        <h2 className="text-xl font-bold font-mono tracking-tighter text-slate-800 uppercase">
          01 // Stack & Skills
        </h2>
        <div className="mt-4 h-[1px] w-12 bg-purple-500"></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-16 relative">
        {/* Subtle grid lines in background */}
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-slate-100 -z-10 hidden lg:block"></div>
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              key={skill.name}
              className={`group p-4 border border-slate-200/60 rounded-2xl bg-white/60 backdrop-blur-sm transition-all duration-300 flex flex-col items-center justify-center gap-3 cursor-default relative overflow-hidden ${skill.hoverBorder} ${skill.glow}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${skill.colorClass} ${skill.textClass} group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-700 tracking-wider uppercase mt-1">
                {skill.name}
              </span>
            </motion.div>
          );
        })}
      </div>
      
      {/* Timeline Integration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 border-l-2 border-slate-100 pl-6 lg:pl-10 relative">
          <div className="absolute top-0 bottom-0 left-[-2px] w-[2px] bg-gradient-to-b from-purple-500 via-cyan-400 to-transparent origin-top"></div>
          
          <div className="space-y-10">
            {timeline.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-[45px] lg:-left-[61px] top-1 p-1 bg-white border-2 border-purple-100 rounded-full text-purple-600 shadow-sm z-10 w-10 h-10 flex items-center justify-center">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-mono font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">{item.year}</span>
                    <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                  </div>
                  <div className="text-sm font-medium text-slate-500 mb-2">{item.organization}</div>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-slate-200/60 bg-white/60 backdrop-blur-md p-6 sm:p-8 shadow-sm h-full flex flex-col justify-between group hover:border-purple-300/50 transition-colors">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <CalendarClock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Status Atual</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Atualmente a frequentar o curso de Engenharia Informática em Portugal.
                Foco no desenvolvimento estruturado e compreensão aprofundada de sistemas que escalam. A aprendizagem é contínua e as bases teóricas combinam com aplicação prática pura.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <span className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-1 font-mono text-xs font-bold text-emerald-600 ring-1 ring-inset ring-emerald-200 cursor-default group-hover:bg-emerald-100 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Em curso (3º Ano)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
