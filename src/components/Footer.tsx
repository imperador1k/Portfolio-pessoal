import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-100 bg-white overflow-hidden py-8 md:py-0 md:h-20 flex" id="footer">
      {/* Background Code Stream */}
      <div className="absolute inset-x-0 bottom-0 top-0 opacity-[0.03] overflow-hidden pointer-events-none flex whitespace-nowrap items-end select-none">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="font-mono text-xs flex gap-12"
        >
          <span>console.log("Building the future");</span>
          <span>export const app = new Framework();</span>
          <span>npm run build --production</span>
          <span>docker build -t app:latest .</span>
          <span>git commit -m "Initial commit"</span>
          <span>console.log("Building the future");</span>
          <span>export const app = new Framework();</span>
          <span>npm run build --production</span>
          <span>docker build -t app:latest .</span>
          <span>git commit -m "Initial commit"</span>
        </motion.div>
      </div>

      {/* Diffuse light leak */}
      <div className="absolute bottom-[-100px] right-[10%] w-[400px] h-[200px] bg-gradient-to-t from-jb-primary/20 to-transparent blur-[80px] pointer-events-none rounded-full"></div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono relative z-10">
        <div className="flex items-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-jb-primary transition-colors focus:outline-none font-bold"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
            GITHUB
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-cyan-600 transition-colors focus:outline-none font-bold"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
            LINKEDIN
          </a>
          <a
            href="mailto:migasmps2005@gmail.com"
            className="flex items-center gap-2 hover:text-pink-600 transition-colors focus:outline-none font-bold"
            aria-label="E-mail"
          >
            <Mail className="h-4 w-4" />
            EMAIL
          </a>
        </div>
        <div className="font-medium bg-white/80 px-3 py-1 rounded backdrop-blur-sm shadow-sm border border-slate-100 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
          {new Date().getFullYear()} © Miguel // SE
        </div>
      </div>
    </footer>
  );
}
