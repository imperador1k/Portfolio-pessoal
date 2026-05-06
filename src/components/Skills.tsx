import { motion, useInView, useScroll, useSpring, useTransform } from 'motion/react';
import React, { useRef } from 'react';
import { 
  KotlinIcon, AndroidIcon, JavaIcon, ReactIcon, ViteIcon, PostgresIcon, 
  TailwindIcon, VSCodeIcon, GitIcon, IntelliJIcon, JetpackComposeIcon, AndroidStudioIcon 
} from './Icons';

const skillCategories = [
  {
    id: 'mobile',
    title: 'ECOSSISTEMA MOBILE',
    items: [
      { name: 'Kotlin', icon: KotlinIcon, hoverColor: 'group-hover:text-[#7F52FF]', hoverBg: 'group-hover:bg-[#7F52FF]/5', hoverRing: 'group-hover:ring-[1px] group-hover:ring-[#7F52FF]/30' },
      { name: 'Jetpack Compose', icon: JetpackComposeIcon, hoverColor: 'group-hover:text-[#4285F4]', hoverBg: 'group-hover:bg-[#4285F4]/5', hoverRing: 'group-hover:ring-[1px] group-hover:ring-[#4285F4]/30' },
      { name: 'Android SDK', icon: AndroidIcon, hoverColor: 'group-hover:text-[#3DDC84]', hoverBg: 'group-hover:bg-[#3DDC84]/5', hoverRing: 'group-hover:ring-[1px] group-hover:ring-[#3DDC84]/30' },
      { name: 'Java', icon: JavaIcon, hoverColor: 'group-hover:text-[#f89820]', hoverBg: 'group-hover:bg-[#f89820]/5', hoverRing: 'group-hover:ring-[1px] group-hover:ring-[#f89820]/30' },
    ]
  },
  {
    id: 'tools',
    title: 'FERRAMENTAS & IDES',
    items: [
      { name: 'Android Studio', icon: AndroidStudioIcon, hoverColor: 'group-hover:text-[#3DDC84]', hoverBg: 'group-hover:bg-[#3DDC84]/5', hoverRing: 'group-hover:ring-[1px] group-hover:ring-[#3DDC84]/30' },
      { name: 'IntelliJ IDEA', icon: IntelliJIcon, hoverColor: 'group-hover:text-[#FE2857]', hoverBg: 'group-hover:bg-[#FE2857]/5', hoverRing: 'group-hover:ring-[1px] group-hover:ring-[#FE2857]/30' },
      { name: 'VS Code', icon: VSCodeIcon, hoverColor: 'group-hover:text-[#007ACC]', hoverBg: 'group-hover:bg-[#007ACC]/5', hoverRing: 'group-hover:ring-[1px] group-hover:ring-[#007ACC]/30' },
      { name: 'Git / GitHub', icon: GitIcon, hoverColor: 'group-hover:text-[#F05032]', hoverBg: 'group-hover:bg-[#F05032]/5', hoverRing: 'group-hover:ring-[1px] group-hover:ring-[#F05032]/30' },
    ]
  },
  {
    id: 'web',
    title: 'WEB & BACKEND',
    items: [
      { name: 'React', icon: ReactIcon, hoverColor: 'group-hover:text-[#61DAFB]', hoverBg: 'group-hover:bg-[#61DAFB]/5', hoverRing: 'group-hover:ring-[1px] group-hover:ring-[#61DAFB]/30' },
      { name: 'Vite', icon: ViteIcon, hoverColor: 'group-hover:text-[#646CFF]', hoverBg: 'group-hover:bg-[#646CFF]/5', hoverRing: 'group-hover:ring-[1px] group-hover:ring-[#646CFF]/30' },
      { name: 'Tailwind CSS', icon: TailwindIcon, hoverColor: 'group-hover:text-[#06B6D4]', hoverBg: 'group-hover:bg-[#06B6D4]/5', hoverRing: 'group-hover:ring-[1px] group-hover:ring-[#06B6D4]/30' },
      { name: 'PostgreSQL', icon: PostgresIcon, hoverColor: 'group-hover:text-[#336791]', hoverBg: 'group-hover:bg-[#336791]/5', hoverRing: 'group-hover:ring-[1px] group-hover:ring-[#336791]/30' },
    ]
  }
];

const timeline = [
  {
    version: '> release: v2024.10',
    title: 'Engenharia Informática',
    organization: 'Universidade X',
    description: 'Foco intensivo em estruturas de dados complexas, análise de algoritmos e arquiteturas de software escaláveis para ambientes corporativos.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=70&w=800&auto=format&fit=crop',
    tags: ['C', 'Java', 'Data Structures', 'Git']
  },
  {
    version: '> commit: a1b2c3d',
    title: 'Desenvolvimento Mobile Privado',
    organization: 'Projetos Independentes',
    description: 'Criação do zero de aplicações nativas utilitárias em Kotlin, adoção de Clean Architecture e integração profunda com APIs RESTful.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=70&w=800&auto=format&fit=crop',
    tags: ['Kotlin', 'Android SDK', 'Clean Code', 'REST']
  },
  {
    version: '> init: root',
    title: 'Iniciação à Arquitetura',
    organization: 'Autodidata',
    description: 'Mergulho profundo nos paradigmas de programação orientada a objetos com Java. Construção das bases estruturais para desenvolvimento sólido.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=70&w=800&auto=format&fit=crop',
    tags: ['Java', 'OOP', 'Design Patterns']
  }
];

function TimelineItem({ item, index }: { key?: React.Key, item: typeof timeline[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", once: false });

  return (
    <div 
      ref={ref}
      className="relative pl-12 md:pl-20 pb-20 last:pb-0"
    >
      {/* The Node on the line */}
      <div className="absolute left-[-5px] top-2 z-20">
        <div className={`w-[10px] h-[10px] rounded-full border-2 transition-all duration-500 ${
          isInView ? 'bg-jb-primary border-jb-primary scale-125 shadow-[0_0_12px_rgba(127,82,255,0.5)]' : 'bg-white border-slate-300'
        }`} />
      </div>

      {/* Date / Version Tag - Left side alignment */}
      <div className="absolute left-[-120px] top-1 hidden lg:block w-24 text-right">
        <span className={`font-mono text-[11px] font-bold tracking-tighter transition-colors duration-500 ${isInView ? 'text-jb-primary' : 'text-slate-400'}`}>
          {item.version}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Card item={item} isActive={isInView} index={index} />
      </motion.div>
    </div>
  );
}

function Card({ item, isActive, index }: { item: typeof timeline[0], isActive: boolean, index: number }) {
  return (
    <div className={`group relative transition-all duration-700 ${isActive ? 'translate-x-2' : 'opacity-40'}`}>
      {/* Background ID Number */}
      <div className="absolute -top-6 -right-2 text-7xl font-black text-slate-50 font-mono pointer-events-none select-none transition-colors duration-700 group-hover:text-slate-100/50">
        0{index + 1}
      </div>

      <div className={`rounded-2xl border transition-all duration-700 overflow-hidden ${
        isActive 
          ? 'bg-white border-jb-primary/20 shadow-[0_12px_40px_rgba(0,0,0,0.04)] ring-1 ring-jb-primary/5' 
          : 'bg-slate-50/50 border-slate-100'
      }`}>
        <div className="flex flex-col lg:flex-row">
          {/* Visual Side */}
          <div className="lg:w-1/3 relative h-48 lg:h-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
            <img 
              src={item.image} 
              alt={item.title} 
              className={`w-full h-full object-cover transition-transform duration-1000 ${isActive ? 'scale-105' : 'scale-100 grayscale'}`}
            />
          </div>

          {/* Content Side */}
          <div className="lg:w-2/3 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="lg:hidden font-mono text-[10px] font-bold text-jb-primary bg-jb-primary/10 px-2 py-0.5 rounded">
                  {item.version}
                </span>
                <span className={`text-[11px] font-mono font-bold uppercase tracking-widest ${isActive ? 'text-jb-primary' : 'text-slate-400'}`}>
                  {item.organization}
                </span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 tracking-tight">
                {item.title}
              </h3>
              
              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed mb-6 font-medium max-w-xl">
                {item.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100">
              {item.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 text-[10px] font-mono font-bold rounded bg-slate-900 text-white shadow-sm transition-transform hover:-translate-y-0.5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  
  return (
    <section className="px-5 sm:px-6 py-32 lg:px-10 max-w-6xl mx-auto w-full relative z-10" id="skills">
      {/* 02 // Tech Stack Section */}
      <div className="mb-40">
        <div className="flex flex-col mb-12">
          <span className="text-jb-primary font-mono text-sm font-bold tracking-tighter mb-4 text-center md:text-left">
            02 // TECH STACK
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter uppercase text-center md:text-left">
            Main <br />
            <span className="text-slate-300">Toolbox</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: catIndex * 0.15, ease: "easeOut" }}
              key={category.id}
              className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-sm"
            >
              <span className="text-xs sm:text-sm font-mono text-slate-500 mb-6 block font-bold tracking-tight">
                /// {category.title}
              </span>
              
              <div className="flex flex-wrap gap-3">
                {category.items.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      className={`group flex items-center gap-2.5 bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl transition-all duration-300 relative overflow-hidden cursor-default ${skill.hoverBg} ${skill.hoverRing}`}
                    >
                      <div className="flex items-center justify-center transition-all duration-300 z-10 shrink-0 group-hover:scale-110">
                        <Icon className="w-5 h-5 transition-transform duration-300" />
                      </div>
                      <span className="font-medium text-sm text-slate-700 group-hover:text-slate-900 transition-colors duration-300 z-10 font-sans tracking-tight">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 03 // Experience Section */}
      <div className="relative">
        <div className="flex flex-col mb-20">
          <span className="text-jb-primary font-mono text-sm font-bold tracking-tighter mb-4">
            03 // CHANGELOG
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter uppercase">
            Personal <br />
            <span className="text-slate-300">Timeline</span>
          </h2>
        </div>

        {/* Professional Timeline Container */}
        <div ref={containerRef} className="relative max-w-4xl ml-0 lg:ml-32">
          {/* Main Vertical Track */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-100 z-0">
            <motion.div 
              style={{ scaleY }}
              className="absolute top-0 left-0 w-full bg-jb-primary origin-top shadow-[0_0_10px_rgba(127,82,255,0.5)]"
            />
          </div>

          <div className="space-y-4">
            {timeline.map((item, index) => (
              <TimelineItem key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
