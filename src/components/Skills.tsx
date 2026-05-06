import { motion, useInView } from 'motion/react';
import React, { useRef } from 'react';
import { useScrollActive } from '../hooks/useScrollActive';
import { KotlinIcon, AndroidIcon, JavaIcon, ReactIcon, ViteIcon, PostgresIcon, DockerIcon } from './Icons';

const skills = [
  { name: 'Kotlin', icon: KotlinIcon, hoverColor: 'group-hover:text-[#7F52FF]' },
  { name: 'Android', icon: AndroidIcon, hoverColor: 'group-hover:text-[#3DDC84]' },
  { name: 'Java', icon: JavaIcon, hoverColor: 'group-hover:text-[#f89820]' },
  { name: 'React', icon: ReactIcon, hoverColor: 'group-hover:text-[#61DAFB]' },
  { name: 'Vite', icon: ViteIcon, hoverColor: 'group-hover:text-[#646CFF]' },
  { name: 'PostgreSQL', icon: PostgresIcon, hoverColor: 'group-hover:text-[#336791]' },
  { name: 'Docker', icon: DockerIcon, hoverColor: 'group-hover:text-[#2496ED]' },
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

function TimelineItem({ item, index, isLast }: { key?: React.Key, item: typeof timeline[0], index: number, isLast: boolean }) {
  const { ref, isActive } = useScrollActive();

  return (
    <div className="relative pl-8 md:pl-0" ref={ref}>
      {/* Node (Desktop & Mobile) */}
      <motion.div 
        animate={{ 
          scale: isActive ? 1.5 : 1, 
          backgroundColor: isActive ? '#7F52FF' : '#cbd5e1' 
        }}
        className="md:hidden absolute left-[5px] top-1.5 w-3 h-3 rounded-full z-20 shadow-[0_0_10px_rgba(127,82,255,0.4)]"
      ></motion.div>

      <div className="md:grid md:grid-cols-5 md:gap-8 items-start">
        {/* Year - Left on Desktop */}
        <div className="md:col-span-1 md:text-right mb-4 md:mb-0 pt-1">
          <span className={`inline-block px-4 py-1.5 bg-white font-mono text-[11px] uppercase tracking-wider font-bold rounded-full border shadow-sm transition-colors duration-500 ${isActive ? 'text-jb-primary border-jb-primary ring-2 ring-jb-primary/20' : 'text-slate-500 border-slate-200'}`}>
            {item.year}
          </span>
        </div>

        {/* Center Node (Desktop) */}
        <div className="hidden md:flex flex-col items-center justify-center relative w-full h-full col-span-1 pt-1.5">
          <motion.div 
            animate={{ 
              scale: isActive ? 1.5 : 1, 
              backgroundColor: isActive ? '#7F52FF' : '#e2e8f0',
              boxShadow: isActive ? '0 0 15px rgba(127,82,255,0.6)' : 'none'
            }}
            className="w-4 h-4 rounded-full border-2 border-white z-20 absolute left-1/2 -translate-x-1/2 top-1.5"
          ></motion.div>
          {/* Luminous line down */}
          {!isLast && (
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 top-5 w-[2px] rounded-full z-10 origin-top"
              animate={{ 
                height: isActive ? '120%' : '100%',
                backgroundColor: isActive ? '#7F52FF' : 'rgba(203, 213, 225, 0.4)',
                opacity: isActive ? 1 : 0.5
              }}
              transition={{ duration: 0.5 }}
            />
          )}
        </div>

        {/* Content - Right on Desktop */}
        <div className="md:col-span-3 pb-12">
          <motion.div 
            animate={{ 
              scale: isActive ? 1.02 : 1,
              borderColor: isActive ? 'rgba(127, 82, 255, 0.5)' : 'rgba(203, 213, 225, 0.4)'
            }}
            className={`bg-white p-2 rounded-[24px] border shadow-sm transition-all duration-500 overflow-hidden relative ${isActive ? 'ring-2 ring-jb-primary/20 shadow-[0_15px_40px_rgba(127,82,255,0.1)]' : ''}`}
          >
            <div className="relative h-48 md:h-56 rounded-[16px] overflow-hidden mb-5">
              <div className="absolute inset-0 bg-gradient-to-t from-jb-dark/60 via-jb-dark/10 to-transparent z-10"></div>
              <motion.img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover origin-center" 
                animate={{ scale: isActive ? 1.05 : 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                referrerPolicy="no-referrer" 
              />
            </div>
            <div className="px-5 pb-5 relative z-20">
              <h3 className={`text-2xl font-bold transition-colors duration-300 mb-1 ${isActive ? 'text-jb-primary' : 'text-slate-800'}`}>{item.title}</h3>
              <div className="text-jb-primary font-bold text-[13px] mb-4 bg-purple-50 inline-block px-2.5 py-1 rounded-md border border-purple-100">{item.organization}</div>
              <p className="text-slate-600 text-[15px] leading-relaxed font-medium">{item.description}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="px-5 sm:px-6 py-24 lg:px-10 max-w-7xl mx-auto w-full relative z-10" id="skills">
      {/* Grid Secção */}
      <div className="mb-24">
        <h2 className="text-2xl font-bold font-mono tracking-tighter text-jb-dark uppercase mb-12 text-center md:text-left">
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
                className={`group flex items-center gap-4 bg-white p-4 rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] transition-all duration-300 relative overflow-hidden cursor-default`}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:border-transparent group-hover:shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-all duration-300 z-10">
                  <Icon className={`w-6 h-6 text-slate-400 transition-colors duration-300 ${skill.hoverColor}`} />
                </div>
                <span className="font-bold text-slate-600 group-hover:text-jb-dark transition-colors duration-300 z-10">{skill.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Timeline Secção */}
      <div className="relative">
        <h2 className="text-2xl font-bold font-mono tracking-tighter text-jb-dark uppercase mb-16 text-center md:text-left">
          Timeline Pessoal
        </h2>

        {/* Central/Left Line background */}
        <div className="absolute left-[9px] md:left-1/2 top-24 bottom-0 w-[2px] bg-slate-200 md:-translate-x-1/2 rounded-full z-0"></div>

        <div className="relative z-10">
          {timeline.map((item, idx) => (
            <TimelineItem key={idx} item={item} index={idx} isLast={idx === timeline.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
