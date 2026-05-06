import { Github, Linkedin, Mail, ArrowUp, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-100 bg-white overflow-hidden pt-16 pb-8" id="footer">
      {/* Background Code Stream - Refined */}
      <div className="absolute inset-x-0 top-0 h-32 opacity-[0.03] overflow-hidden pointer-events-none flex whitespace-nowrap items-center select-none border-b border-slate-200">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
          className="font-mono text-[10px] flex gap-12 tracking-widest uppercase"
        >
          <span>console.log("Building the future");</span>
          <span>export const app = new Framework();</span>
          <span>npm run build --production</span>
          <span>docker build -t app:latest .</span>
          <span>git commit -m "Initial commit"</span>
          <span>system.reboot()</span>
          <span>await quality_check()</span>
          <span>deploy --to=production</span>
        </motion.div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#" className="font-mono font-bold text-[20px] text-slate-800 flex items-center gap-0.5 mb-6 group">
              <span className="text-jb-primary">~/</span>
              miguel
              <span className="text-jb-primary w-2.5 h-5 bg-jb-primary/20 translate-y-1 ml-0.5"></span>
            </a>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed font-medium">
              Engenheiro de Software focado em criar experiências mobile nativas e interfaces de alta performance.
            </p>
            
            {/* Status Pill */}
            <div className="mt-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Disponível para Projetos
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Navegação</h4>
            <ul className="space-y-4">
              {['Sobre', 'Skills', 'Projetos', 'Contactos'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-slate-600 hover:text-jb-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Conectar</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://github.com" className="group flex items-center gap-3 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-slate-100 transition-colors border border-slate-100">
                    <Github className="w-4 h-4" />
                  </div>
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" className="group flex items-center gap-3 text-sm font-semibold text-slate-600 hover:text-[#0077B5] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-[#0077B5]/5 transition-colors border border-slate-100">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:migasmps2005@gmail.com" className="group flex items-center gap-3 text-sm font-semibold text-slate-600 hover:text-pink-600 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-pink-50 transition-colors border border-slate-100">
                    <Mail className="w-4 h-4" />
                  </div>
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-jb-primary" />
            <span>{new Date().getFullYear()} © MIGUEL // ENGENHEIRO DE SOFTWARE</span>
          </div>

          <motion.button
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-jb-primary hover:border-jb-primary/30 transition-all shadow-sm"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
