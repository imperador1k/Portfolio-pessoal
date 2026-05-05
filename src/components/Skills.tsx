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
    description: 'Foco intensivo em estruturas de dados complexas, análise de algoritmos e arquiteturas de software escaláveis para ambientes corporativos.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop'
  },
  {
    year: '2022 - 2023',
    title: 'Desenvolvimento Mobile Privado',
    organization: 'Projetos Independentes',
    description: 'Criação do zero de aplicações nativas utilitárias em Kotlin, adoção de Clean Architecture e integração profunda com APIs RESTful.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop'
  },
  {
    year: '2021 - 2022',
    title: 'Iniciação à Arquitetura de Software',
    organization: 'Autodidata',
    description: 'Mergulho profundo nos paradigmas de programação orientada a objetos com Java. Construção das bases estruturais para desenvolvimento sólido.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'
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
        className="md:hidden absolute left-[3px] top-1.5 w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 shadow-[0_0_10px_rgba(168,85,247,0.4)] z-10"
      ></motion.div>

      <div className="md:grid md:grid-cols-5 md:gap-8 items-start">
        {/* Year - Left on Desktop */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
          transition={{ delay: index * 0.2 + 0.1 }}
          className="md:col-span-1 md:text-right mb-4 md:mb-0 pt-1"
        >
          <span className="inline-block px-4 py-1.5 bg-white text-slate-700 font-mono text-[11px] uppercase tracking-wider font-bold rounded-full border border-slate-200 shadow-sm">
            {item.year}
          </span>
        </motion.div>

        {/* Center Node (Desktop) */}
        <div className="hidden md:flex flex-col items-center justify-center relative w-full h-full col-span-1 pt-1.5">
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ delay: index * 0.2, type: "spring" }}
            className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 shadow-[0_0_15px_rgba(168,85,247,0.6)] z-10 absolute left-1/2 -translate-x-1/2 top-1.5"
          ></motion.div>
        </div>

        {/* Content - Right on Desktop */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
          transition={{ delay: index * 0.2 + 0.2 }}
          className="md:col-span-3 bg-white/80 backdrop-blur-xl p-2 rounded-3xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 group overflow-hidden relative"
        >
          {/* Subtle gradient border inset */}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-slate-200/50 group-hover:ring-purple-200 transition-colors duration-500 z-30 pointer-events-none"></div>

          <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden mb-5">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent z-10"></div>
            <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
            <div className="absolute bottom-4 left-4 z-20">
               <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white font-mono text-[10px] font-bold tracking-wider uppercase border border-white/20">
                 {item.year}
               </span>
            </div>
          </div>
          <div className="px-5 pb-5 relative z-20">
            <h3 className="text-2xl font-bold text-slate-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-cyan-500 transition-all duration-300 mb-1">{item.title}</h3>
            <div className="text-purple-600 font-bold text-[13px] mb-4 bg-purple-50 inline-block px-2.5 py-1 rounded-md border border-purple-100">{item.organization}</div>
            <p className="text-slate-600 text-[15px] leading-relaxed font-medium">{item.description}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="px-5 sm:px-6 py-24 lg:px-10 max-w-7xl mx-auto w-full relative z-10" id="skills">
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
                className={`group flex items-center gap-4 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_30px_rgba(168,85,247,0.1)] transition-all duration-500 relative overflow-hidden cursor-default`}
              >
                {/* Glow border effect on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-purple-500 to-cyan-500`}></div>
                {/* Inner inset ring */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-200/50 pointer-events-none group-hover:ring-purple-200/50 transition-colors"></div>
                
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-slate-100 group-hover:-translate-y-1 group-hover:rotate-3 transition-transform duration-500 shadow-sm z-10`}>
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
