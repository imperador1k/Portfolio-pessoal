import { Database, FileCode2, Layers, LayoutPanelLeft, Server, Smartphone, Terminal } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const skills = [
  { name: 'Kotlin', icon: FileCode2, color: 'text-purple-600', bg: 'bg-purple-100', border: 'group-hover:border-purple-300' },
  { name: 'Android', icon: Smartphone, color: 'text-green-600', bg: 'bg-green-100', border: 'group-hover:border-green-300' },
  { name: 'Java', icon: Server, color: 'text-orange-600', bg: 'bg-orange-100', border: 'group-hover:border-orange-300' },
  { name: 'React', icon: LayoutPanelLeft, color: 'text-blue-600', bg: 'bg-blue-100', border: 'group-hover:border-blue-300' },
  { name: 'Vite', icon: Terminal, color: 'text-cyan-600', bg: 'bg-cyan-100', border: 'group-hover:border-cyan-300' },
  { name: 'PostgreSQL', icon: Database, color: 'text-indigo-600', bg: 'bg-indigo-100', border: 'group-hover:border-indigo-300' },
  { name: 'Docker', icon: Layers, color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'group-hover:border-emerald-300' },
];

const timeline = [
  {
    year: '2023 - Presente',
    title: 'Engenharia Informática',
    organization: 'Universidade X',
    description: 'Foco em estruturas de dados, algoritmos, arquiteturas e desenvolvimento backend corporativo.',
  },
  {
    year: '2022 - 2023',
    title: 'Desenvolvimento Mobile Privado',
    organization: 'Projetos Pessoais',
    description: 'Desenvolvimento de aplicações utilitárias em Kotlin e Android Studio com integrações REST.',
  },
  {
    year: '2021 - 2022',
    title: 'Iniciação à Programação',
    organization: 'Autodidata',
    description: 'Primeiros passos em lógica de programação com Java, focando na orientação a objetos.',
  }
];

function TimelineItem({ item, index }: { item: typeof timeline[0], index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <div className="relative pl-8 md:pl-0" ref={ref}>
      {/* Node (Desktop & Mobile) */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ delay: index * 0.2, type: "spring" }}
        className="md:hidden absolute left-0 top-1.5 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 border-2 border-white shadow-[0_0_10px_rgba(168,85,247,0.4)] z-10"
      ></motion.div>

      <div className="md:grid md:grid-cols-5 md:gap-8 items-start">
        {/* Year - Left on Desktop */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
          transition={{ delay: index * 0.2 + 0.1 }}
          className="md:col-span-1 md:text-right mb-2 md:mb-0 pt-1"
        >
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 font-mono text-xs font-bold rounded-full border border-slate-200">
            {item.year}
          </span>
        </motion.div>

        {/* Center Node (Desktop) */}
        <div className="hidden md:flex flex-col items-center justify-center relative w-full h-full col-span-1 pt-1.5">
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ delay: index * 0.2, type: "spring" }}
            className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 border-2 border-white shadow-[0_0_10px_rgba(168,85,247,0.4)] z-10 absolute left-1/2 -translate-x-1/2 top-1.5"
          ></motion.div>
        </div>

        {/* Content - Right on Desktop */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
          transition={{ delay: index * 0.2 + 0.2 }}
          className="md:col-span-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all"
        >
          <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
          <div className="text-purple-600 font-medium text-sm mb-3">{item.organization}</div>
          <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
        </motion.div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="px-6 py-24 lg:px-10 max-w-7xl mx-auto w-full border-t border-slate-100 bg-[#FAFAFA]" id="skills">
      {/* Grid Secção */}
      <div className="mb-24">
        <h2 className="text-2xl font-bold font-mono tracking-tighter text-slate-800 uppercase mb-12 text-center md:text-left">
          01 // Tech Stack
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={skill.name}
                className={`group flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden cursor-default`}
              >
                {/* Glow border effect on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-r from-purple-500 to-cyan-500`}></div>
                
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100 group-hover:-translate-y-1 transition-transform duration-300 shadow-sm z-10`}>
                  <Icon className={`w-6 h-6 ${skill.color}`} />
                </div>
                <span className="font-bold text-slate-700 z-10">{skill.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Timeline Secção */}
      <div className="relative">
        <h2 className="text-2xl font-bold font-mono tracking-tighter text-slate-800 uppercase mb-16 text-center md:text-left">
          Timeline Pessoal
        </h2>

        {/* Central/Left Line */}
        <div className="absolute left-1.5 md:left-1/2 top-24 bottom-0 w-[2px] bg-gradient-to-b from-purple-500/20 via-cyan-500/20 to-transparent md:-translate-x-1/2 rounded-full"></div>

        <div className="space-y-12 relative">
          {timeline.map((item, idx) => (
            <TimelineItem key={idx} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
