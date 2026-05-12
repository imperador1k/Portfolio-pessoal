import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowUp, MapPin, Zap, ExternalLink, Cpu, Globe, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { useMouseTracking } from '../hooks/useMouseTracking';

const codeStream = [
  'console.log("Pushing boundaries");',
  'git push origin main --force',
  'npm run elite:build',
  'docker-compose up -d --scale career=max',
  'await quality_check({ strict: true });',
  'deploying --to=global_market',
  'system.health_check() // 100% OK',
  'performance.mark("legendary");',
  'git commit -m "feat: ship it"',
];

const backgroundWords = [
  "ENGINEERING",
  "INNOVATION",
  "ARCHITECTURE",
  "PERFORMANCE",
  "SCALABILITY",
  "ELITE HUB"
];

export default function Footer() {
  const { t } = useLanguage();
  const { mouseX, mouseY } = useMouseTracking();
  const [wordIndex, setWordIndex] = useState(0);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Cycle background words
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % backgroundWords.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: t('footer.nav.home'), href: '#home' },
    { label: t('footer.nav.about'), href: '#sobre' },
    { label: t('footer.nav.timeline'), href: '#timeline' },
    { label: t('footer.nav.hall_of_fame'), href: '#certificacoes' },
    { label: t('footer.nav.tech_stack'), href: '#skills' },
    { label: t('footer.nav.github'), href: '#github' },
    { label: t('navbar.linkedin'), href: '#contactos' },
    { label: 'Youtube', href: '#youtube' },
    { label: 'Spotify', href: '#spotify' },
    { label: t('navbar.cv'), href: '#cv' },
  ];

  return (
    <footer className="relative overflow-hidden bg-white pt-32 pb-12 border-t border-slate-100 group/footer" id="footer">
      
      {/* ── Local Mouse Gradient ──────────────────────────────── */}
      <motion.div
        className="absolute pointer-events-none z-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-0 group-hover/footer:opacity-20 transition-opacity duration-500"
        style={{
          left: mouseX,
          top: mouseY,
          background: 'radial-gradient(circle, rgba(252, 76, 2, 0.4) 0%, transparent 70%)',
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* ── Background Aesthetics ─────────────────────────────── */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#FC4C02]/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      {/* ── Large Animated Background Text ───────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-[22vw] select-none pointer-events-none z-0 hidden lg:flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.h2 
            key={backgroundWords[wordIndex]}
            initial={{ y: "100%", rotateX: -90, opacity: 0 }}
            animate={{ y: 0, rotateX: 0, opacity: 1 }}
            exit={{ y: "-100%", rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[20vw] font-black text-slate-50 tracking-tighter leading-none uppercase"
          >
            {backgroundWords[wordIndex]}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* ── Scrolling Code Stream ───────────────────────────── */}
      <div className="absolute inset-x-0 top-0 h-14 overflow-hidden pointer-events-none flex items-center select-none bg-slate-50/50 backdrop-blur-sm border-b border-slate-100">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
          className="flex gap-16 whitespace-nowrap font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400"
        >
          {[...codeStream, ...codeStream].map((cmd, i) => (
            <span key={i} className="flex items-center gap-4">
              <Cpu className="w-3 h-3 text-[#FC4C02]/40" />
              {cmd}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* ── Top Footer Section: CTA & Vision ────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
           <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                 <div className="flex items-center gap-3 text-[#FC4C02] font-black uppercase text-[11px] tracking-[0.3em]">
                    <span className="w-8 h-px bg-[#FC4C02]" />
                    {t('footer.explore')}
                 </div>
                 <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                    Let's scale your <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FC4C02] to-orange-400">digital presence</span> to elite levels.
                 </h3>
                 <div className="flex flex-wrap gap-4 pt-4">
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="mailto:migasmps2005@gmail.com"
                      className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center gap-3 group"
                    >
                       <Mail className="w-4 h-4 text-[#FC4C02]" />
                       {t('footer.social.email')}
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="#contactos"
                      className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest shadow-sm hover:shadow-xl transition-all flex items-center gap-3"
                    >
                       <MessageSquare className="w-4 h-4 text-[#FC4C02]" />
                       Get in touch
                    </motion.a>
                 </div>
              </motion.div>
           </div>

           <div className="grid grid-cols-2 gap-12 lg:pl-12">
              <div className="space-y-6">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Status</h4>
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="relative">
                          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                          <div className="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping opacity-75" />
                       </div>
                       <span className="text-sm font-bold text-slate-600">Disponível para Projetos</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500">
                       <Globe className="w-4 h-4 text-[#FC4C02]" />
                       <span className="text-sm font-semibold">Porto, Portugal (UTC+0)</span>
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{t('footer.connect')}</h4>
                 <div className="flex gap-4">
                    {[
                      { href: 'https://github.com/Imperador1k', icon: Github, label: 'GitHub' },
                      { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
                    ].map(({ href, icon: Icon, label }) => (
                      <motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, scale: 1.1 }}
                        className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:text-[#FC4C02] hover:bg-white hover:shadow-xl transition-all"
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* ── Links & Info Grid ───────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20 pt-20 border-t border-slate-100 relative z-10">
          
          <div className="col-span-2 lg:col-span-2">
            <a href="#home" className="inline-flex items-center gap-3 font-black text-3xl text-slate-900 mb-6 group tracking-tighter">
              <span className="text-[#FC4C02]">M</span>
              <span>SANTOS</span>
            </a>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-medium">
               Especialista em Engenharia de Software focada em Android, TypeScript e infraestrutura de alta performance.
            </p>
          </div>

          <div className="col-span-1">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">{t('footer.explore')}</h4>
            <ul className="space-y-4">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-bold text-slate-500 hover:text-[#FC4C02] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#FC4C02] transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Social</h4>
            <ul className="space-y-4">
              {navLinks.slice(5).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-bold text-slate-500 hover:text-[#FC4C02] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#FC4C02] transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:block">
             <div className="p-6 bg-slate-50/50 backdrop-blur-sm rounded-3xl border border-slate-100 flex flex-col items-center text-center gap-4 shadow-inner">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                   <Zap className="w-6 h-6 text-amber-500" />
                </div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-normal">
                   Built with <br/> 
                   <span className="text-slate-900">React & Vite</span>
                </p>
             </div>
          </div>
        </div>

        {/* ── Bottom Bar ──────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-10 border-t border-slate-100 relative z-10">
          <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase">
            <span>© {new Date().getFullYear()} {t('footer.copyright')}</span>
            <span className="hidden sm:inline w-1.5 h-1.5 bg-slate-200 rounded-full" />
            <span className="hidden sm:inline">Made with Passion</span>
          </div>

          <div className="flex items-center gap-3">
             <motion.button
               onClick={scrollToTop}
               whileHover={{ y: -5, backgroundColor: '#FC4C02', color: '#fff' }}
               whileTap={{ scale: 0.9 }}
               className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 transition-all shadow-[0_10px_20px_rgba(0,0,0,0.03)] hover:shadow-[#FC4C02]/30"
               aria-label={t('footer.back_to_top')}
             >
               <ArrowUp className="w-6 h-6" />
             </motion.button>
          </div>
        </div>

      </div>
    </footer>
  );
}
