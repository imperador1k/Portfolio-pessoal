import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="h-16 md:h-12 border-t border-slate-100 px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono py-4 md:py-0 bg-white" id="contactos">
      <div className="flex items-center gap-6">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-slate-900 transition-colors focus:outline-none"
          aria-label="GitHub"
        >
          <Github className="h-3.5 w-3.5" />
          GITHUB
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-slate-900 transition-colors focus:outline-none"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-3.5 w-3.5" />
          LINKEDIN
        </a>
        <a
          href="mailto:migasmps2005@gmail.com"
          className="flex items-center gap-2 hover:text-slate-900 transition-colors focus:outline-none"
          aria-label="E-mail"
        >
          <Mail className="h-3.5 w-3.5" />
          EMAIL
        </a>
      </div>
      <div>
        © {new Date().getFullYear()} Miguel // Software Engineer
      </div>
    </footer>
  );
}
