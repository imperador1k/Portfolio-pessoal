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
  // Trigger active state when card's center crosses viewport center
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });
  
  const isEven = index % 2 === 0;

  return (
    <div className="relative w-full mb-16 md:mb-32 flex flex-col md:flex-row items-center md:items-center justify-center">
      {/* Static Dot mapped to the timeline item */}
      <div 
        className={`absolute left-[20px] md:left-1/2 top-12 md:top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 bg-white z-10 transition-colors duration-500 shadow-sm ${isInView ? 'border-jb-primary shadow-[0_0_10px_rgba(127,82,255,0.4)]' : 'border-slate-300'}`}
      ></div>
      
      {/* Horizontal dashed line connecting dot to card */}
      <div 
        className={`absolute top-12 md:top-1/2 -translate-y-1/2 border-t-2 border-dashed transition-colors duration-500 z-0 ${
          isEven 
            ? "left-[20px] md:left-auto md:right-1/2 w-8 md:w-16" 
            : "left-[20px] md:left-1/2 w-8 md:w-16"
        } ${isInView ? 'border-jb-primary/50' : 'border-slate-300'}`}
      ></div>

      <div className="pl-[44px] md:pl-0 w-full relative z-20 flex" ref={ref}>
        {isEven ? (
           <div className="w-full md:w-1/2 md:pr-16 md:ml-0 flex md:justify-end">
              <Card item={item} isActive={isInView} />
           </div>
        ) : (
           <div className="w-full md:w-1/2 md:pl-16 md:ml-auto flex md:justify-start">
              <Card item={item} isActive={isInView} />
           </div>
        )}
      </div>
    </div>
  );
}

function Card({ item, isActive }: { item: typeof timeline[0], isActive: boolean }) {
  return (
    <div 
      className={`w-full max-w-[500px] rounded-[24px] p-6 sm:p-8 bg-white/60 backdrop-blur-lg border transition-all duration-700 overflow-hidden relative ${
        isActive 
          ? 'shadow-[0_20px_40px_rgba(127,82,255,0.08)] ring-1 ring-jb-primary/40 border-jb-primary/20' 
          : 'shadow-[0_10px_30px_rgba(0,0,0,0.03)] ring-0 border-slate-200/60'
      }`}
    >
      {/* Internal Glow on Active */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-jb-primary/10 rounded-full blur-3xl transition-opacity duration-700 -z-10 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>

      {/* Header: IDE Version Trace */}
      <div className="mb-6 inline-flex flex-col">
        <span className={`font-mono text-[11px] sm:text-xs font-bold transition-colors duration-300 ${isActive ? 'text-jb-primary' : 'text-slate-400'}`}>
          {item.version}
        </span>
      </div>

      {/* Image Block */}
      <div className="relative h-48 sm:h-56 rounded-[16px] overflow-hidden mb-6 ring-1 ring-slate-200/50">
        <div className="absolute inset-0 bg-gradient-to-t from-jb-dark/70 via-jb-dark/10 to-transparent z-10"></div>
        <img 
          src={item.image} 
          alt={item.title} 
          className={`w-full h-full object-cover transition-all duration-700 origin-center ${
            isActive 
              ? 'grayscale-0 blur-0 opacity-100 scale-105' 
              : 'grayscale-[50%] md:grayscale blur-[2px] opacity-60 scale-100'
          }`} 
          referrerPolicy="no-referrer" 
        />
        {/* Active Overlay Effect inside Image */}
        <div className={`absolute inset-0 ring-4 ring-inset ring-jb-primary/20 transition-opacity duration-700 z-20 pointer-events-none rounded-[16px] ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>

      {/* Content */}
      <div className="relative z-20">
        <h3 className={`text-xl sm:text-2xl font-bold transition-colors duration-500 mb-2 ${isActive ? 'text-jb-dark' : 'text-slate-700'}`}>
          {item.title}
        </h3>
        <div className={`font-bold text-[13px] mb-4 inline-block transition-colors duration-500 ${isActive ? 'text-cyan-600' : 'text-slate-500'}`}>
          {item.organization}
        </div>
        <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed font-medium mb-6 transition-colors duration-500">
          {item.description}
        </p>

        {/* Tags Stack */}
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
             <span key={tag} className={`px-2.5 py-1 text-[10px] sm:text-[11px] font-mono font-bold rounded shadow-sm border transition-colors duration-500 ${isActive ? 'bg-jb-primary/10 text-jb-primary border-jb-primary/20' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
               {tag}
             </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Smooth out the progress for the glowing line
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  
  return (
    <section className="px-5 sm:px-6 py-24 lg:px-10 max-w-7xl mx-auto w-full relative z-10" id="skills">
      {/* Grid Secção */}
      <div className="mb-32">
        <h2 className="text-2xl font-bold font-mono tracking-tighter text-jb-dark uppercase mb-12 text-center md:text-left">
          01 // Tech Stack
        </h2>
        
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
                      <div className="flex items-center justify-center transition-all duration-300 z-10 shrink-0">
                        <Icon className={`w-5 h-5 text-slate-400 transition-colors duration-300 ${skill.hoverColor}`} />
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

      {/* Timeline Secção */}
      <div>
        <h2 className="text-2xl font-bold font-mono tracking-tighter text-jb-dark uppercase mb-20 text-center md:text-left">
          Timeline Pessoal // Experiência
        </h2>

        <div className="relative py-10" ref={containerRef}>
          {/* Background Static Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200/60 md:-translate-x-1/2 rounded-full z-0"></div>
          
          {/* Foreground Animated Gradient Line */}
          <motion.div 
            className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-jb-primary via-cyan-500 to-emerald-500 md:-translate-x-1/2 rounded-full z-10 origin-top shadow-[0_0_15px_rgba(127,82,255,0.8)]"
            style={{ scaleY }}
          ></motion.div>

          {/* The Glowing Dot (Breakpoint) traversing the line */}
          <motion.div 
            className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-[3px] border-jb-primary shadow-[0_0_20px_rgba(127,82,255,1)] z-30"
            style={{ 
              top: useTransform(scrollYProgress, (pos) => `calc(${pos * 100}% - 8px)`) 
            }}
          >
             <div className="absolute inset-0 bg-jb-primary rounded-full animate-ping opacity-50 shadow-[0_0_10px_#7F52FF]"></div>
          </motion.div>

          <motion.div 
            className="md:hidden absolute left-[20px] -translate-x-1/2 w-4 h-4 rounded-full bg-white border-[3px] border-jb-primary shadow-[0_0_20px_rgba(127,82,255,1)] z-30"
            style={{ 
              top: useTransform(scrollYProgress, (pos) => `calc(${pos * 100}% - 8px)`) 
            }}
          >
             <div className="absolute inset-0 bg-jb-primary rounded-full animate-ping opacity-50 shadow-[0_0_10px_#7F52FF]"></div>
          </motion.div>

          {/* Items */}
          <div className="relative z-20">
            {timeline.map((item, idx) => (
              <TimelineItem key={idx} item={item} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
