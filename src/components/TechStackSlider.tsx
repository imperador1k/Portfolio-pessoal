import React from 'react';
import { motion } from 'motion/react';
import { 
  Code, 
  Cpu, 
  Globe, 
  Layers, 
  Zap, 
  Terminal, 
  Database, 
  Cloud, 
  Github, 
  Smartphone,
  Server,
  Layout,
  Box,
  Braces
} from 'lucide-react';

const techStack = [
  { name: 'React', icon: Code, color: '#61DAFB' },
  { name: 'Vite', icon: Zap, color: '#646CFF' },
  { name: 'TypeScript', icon: Braces, color: '#3178C6' },
  { name: 'Node.js', icon: Server, color: '#339933' },
  { name: 'Kotlin', icon: Cpu, color: '#7F52FF' },
  { name: 'Android', icon: Smartphone, color: '#3DDC84' },
  { name: 'Tailwind', icon: Layout, color: '#06B6D4' },
  { name: 'Express', icon: Terminal, color: '#000000' },
  { name: 'Vercel', icon: Globe, color: '#000000' },
  { name: 'Git', icon: Github, color: '#F05032' },
  { name: 'Next.js', icon: Layers, color: '#000000' },
  { name: 'Prisma', icon: Database, color: '#2D3748' },
  { name: 'Docker', icon: Box, color: '#2496ED' },
  { name: 'PostgreSQL', icon: Database, color: '#4169E1' },
  { name: 'Cloudflare', icon: Cloud, color: '#F38020' },
];

export default function TechStackSlider() {
  // Triple the items to ensure seamless loop
  const duplicatedStack = [...techStack, ...techStack, ...techStack];

  return (
    <div className="py-20 bg-transparent overflow-hidden relative group">
      {/* Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Row 1: Moving Left */}
      <div className="flex mb-12">
        <motion.div 
          animate={{ x: [0, -1035] }} // Adjust based on content width
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex gap-12 items-center whitespace-nowrap"
        >
          {duplicatedStack.map((tech, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default px-6 py-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100"
            >
              <tech.icon className="w-8 h-8" style={{ color: tech.color }} />
              <span className="text-xl font-black text-slate-800 tracking-tighter uppercase">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2: Moving Right */}
      <div className="flex">
        <motion.div 
          animate={{ x: [-1035, 0] }}
          transition={{ 
            duration: 50, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex gap-12 items-center whitespace-nowrap"
        >
          {duplicatedStack.map((tech, i) => (
            <div 
              key={`row2-${i}`} 
              className="flex items-center gap-3 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default px-6 py-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100"
            >
              <tech.icon className="w-8 h-8" style={{ color: tech.color }} />
              <span className="text-xl font-black text-slate-800 tracking-tighter uppercase">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
