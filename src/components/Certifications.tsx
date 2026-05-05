import { Award, CheckCircle2, Medal, Zap } from 'lucide-react';

export default function Certifications() {
  return (
    <section className="px-6 py-20 lg:px-10 max-w-7xl mx-auto w-full relative z-10" id="certificacoes">
      <div className="flex items-center justify-between mb-12 cursor-default">
        <h2 className="text-xl font-bold font-mono tracking-tighter text-slate-800 uppercase">
          03 // Hall of Fame: Certificações
        </h2>
        <div className="h-[1px] flex-1 ml-6 bg-slate-200"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Certificate 1 */}
        <div className="group relative rounded-2xl bg-white/60 backdrop-blur-md border border-slate-200/60 p-6 shadow-sm hover:shadow-xl hover:border-purple-300/50 transition-all overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-2">Certified Enterprise React Architect (CERA)</h3>
            <p className="text-sm text-slate-500 mb-6">Validação avançada em design de estado global, performance e microui frameworks para scale-ups corporativas.</p>
            
            <div className="flex items-center gap-2 text-xs font-mono text-purple-600 font-bold border border-purple-100 bg-purple-50 px-3 py-1.5 rounded-md inline-flex w-max">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>VERIFIED BADGE</span>
            </div>
          </div>
        </div>

        {/* Certificate 2 */}
        <div className="group relative rounded-2xl bg-white/60 backdrop-blur-md border border-slate-200/60 p-6 shadow-sm hover:shadow-xl hover:border-cyan-300/50 transition-all overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 transition-transform">
              <Medal className="w-6 h-6" />
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-2">Linux Backend System Administrator (LBSA)</h3>
            <p className="text-sm text-slate-500 mb-6">Proficiência em gestão de servidores Linux, CI/CD pipelines, container orchestration e networking networking tuning.</p>
            
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 font-bold border border-cyan-100 bg-cyan-50 px-3 py-1.5 rounded-md inline-flex w-max">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>VERIFIED BADGE</span>
            </div>
          </div>
        </div>

        {/* Certificate 3 */}
        <div className="group relative rounded-2xl bg-white/60 backdrop-blur-md border border-slate-200/60 p-6 shadow-sm hover:shadow-xl hover:border-emerald-300/50 transition-all overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-2">Vite + React Masterclass</h3>
            <p className="text-sm text-slate-500 mb-6">Desenvolvimento Full-Stack de alto desempenho focando nas toolchains mais modernas do ecossistema JavaScript.</p>
            
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 font-bold border border-emerald-100 bg-emerald-50 px-3 py-1.5 rounded-md inline-flex w-max">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>VERIFIED BADGE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
