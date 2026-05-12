import { Github, Linkedin, Mail, ArrowUp, MapPin, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

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

export default function Footer() {
  const { t } = useLanguage();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

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
    <footer className="relative overflow-hidden border-t border-slate-100" id="footer">

      {/* ── Decorative Ambient Orbs ─────────────────────────── */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-[400px] h-[400px] rounded-full bg-orange-400/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-cyan-400/5 blur-[100px] pointer-events-none" />

      {/* ── Scrolling Code Stream ───────────────────────────── */}
      <div className="absolute inset-x-0 top-0 h-12 overflow-hidden pointer-events-none flex items-center select-none">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
          className="flex gap-12 whitespace-nowrap font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-slate-400"
        >
          {/* Duplicated for seamless loop */}
          {[...codeStream, ...codeStream].map((cmd, i) => (
            <span key={i} className="flex items-center gap-3">
              <span className="text-[#FC4C02]">›</span>
              {cmd}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-12">
        {/* ── Links & Info Grid ───────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#home" className="inline-flex items-center gap-2 font-mono font-bold text-xl text-slate-900 mb-4 group">
              <span className="text-[#FC4C02]">&gt;_</span>
              <span>miguel</span>
            </a>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Kotlin · Android · React Native · TypeScript · Node.js
            </p>
            <div className="flex items-center gap-2 mt-4 text-slate-400 text-sm">
              <MapPin className="w-3.5 h-3.5" />
              <span>Portugal 🇵🇹</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">{t('footer.explore')}</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-semibold text-slate-500 hover:text-[#FC4C02] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#FC4C02] transition-all duration-300 ease-out" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">{t('footer.connect')}</h4>
            <div className="flex flex-col gap-4">
              {[
                { href: 'https://github.com/Imperador1k', icon: Github, label: 'GitHub', color: 'hover:text-slate-900' },
                { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn', color: 'hover:text-[#0077B5]' },
                { href: 'mailto:migasmps2005@gmail.com', icon: Mail, label: t('footer.social.email'), color: 'hover:text-[#FC4C02]' },
              ].map(({ href, icon: Icon, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 text-sm font-semibold text-slate-500 ${color} transition-colors group`}
                >
                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-current/10 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  {label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ──────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-100">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-slate-400 tracking-widest uppercase">
            <Zap className="w-3.5 h-3.5 text-[#FC4C02]" />
            <span>© {new Date().getFullYear()} {t('footer.copyright')}</span>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3, backgroundColor: '#FC4C02', color: '#fff' }}
            whileTap={{ scale: 0.92 }}
            className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 transition-all shadow-sm flex-shrink-0"
            aria-label={t('footer.back_to_top')}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>

      </div>
    </footer>
  );
}
