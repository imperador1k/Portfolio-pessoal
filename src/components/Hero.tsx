import { ArrowRight, Download } from 'lucide-react';

export default function Hero() {
  return (
    <section className="px-6 py-20 lg:py-32 lg:px-10" id="sobre">
      <div className="mx-auto max-w-6xl text-center lg:text-left">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-extrabold tracking-tight leading-[1.1] mb-6 sm:text-6xl md:text-7xl">
            Construindo software <br className="hidden lg:block"/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">limpo e eficiente.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 mb-10 lg:mx-0">
            Estudante de Engenharia Informática em Portugal, com uma paixão por 
            arquiteturas robustas, código modular e interfaces funcionais.
            Sempre à procura do próximo desafio tecnológico.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <a
              href="#projetos"
              className="flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-bold text-sm shadow-lg shadow-purple-200 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Ver Projetos
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#cv"
              className="flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-3 border border-slate-200 text-slate-700 rounded-lg font-bold text-sm hover:bg-slate-50 transition-colors"
            >
              <Download className="h-4 w-4 text-slate-500" />
              Download CV
            </a>
          </div>
          
          {/* Decorative code block */}
          <div className="mt-16 hidden lg:block">
            <div className="inline-flex rounded-lg bg-slate-900 px-4 py-2 opacity-80 shadow-lg ring-1 ring-white/10">
              <code className="font-mono text-xs text-emerald-400">
                <span className="text-slate-500">~</span> ./build_future.sh --fast
              </code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
