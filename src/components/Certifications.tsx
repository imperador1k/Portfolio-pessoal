import { Award, ShieldCheck, Trophy, BadgeCheck } from 'lucide-react';
import { motion } from 'motion/react';

const certs = [
  {
    title: 'Oracle Certified Associate',
    subtitle: 'Java SE 8 Programmer',
    date: '2023',
    icon: Award,
    color: 'text-orange-500',
    gradient: 'from-orange-500 to-red-500',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    glow: 'group-hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]'
  },
  {
    title: 'Google Associate Android Developer',
    subtitle: 'Kotlin',
    date: '2023',
    icon: Trophy,
    color: 'text-green-500',
    gradient: 'from-green-500 to-emerald-500',
    bg: 'bg-green-50',
    border: 'border-green-100',
    glow: 'group-hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]'
  },
  {
    title: 'AWS Certified Cloud Practitioner',
    subtitle: 'Foundational Cloud Architecture',
    date: '2024',
    icon: ShieldCheck,
    color: 'text-purple-500',
    gradient: 'from-purple-500 to-cyan-500',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    glow: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]'
  }
];

export default function Certifications() {
  return (
    <section className="px-5 sm:px-6 py-24 lg:px-10 max-w-7xl mx-auto w-full bg-[#FAFAFA]" id="certificacoes">
      <div className="flex items-center justify-between mb-16 cursor-default">
        <h2 className="text-2xl font-bold font-mono tracking-tighter text-slate-800 uppercase text-center w-full md:text-left flex items-center justify-center md:justify-start gap-3">
          <BadgeCheck className="w-6 h-6 text-purple-600" />
          Hall of Fame // Certificações
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certs.map((cert, idx) => {
          const Icon = cert.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ y: -5 }}
              className={`bg-white/70 backdrop-blur-md border border-white/60 rounded-3xl p-8 relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-all duration-500 flex flex-col group cursor-default ${cert.glow}`}
            >
              {/* Diffuse glow background */}
              <div className={`absolute -inset-10 bg-gradient-to-br ${cert.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 blur-2xl z-0`}></div>
              {/* Inner inset ring */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-slate-200/50 pointer-events-none group-hover:ring-slate-300/50 transition-colors z-30"></div>

              {/* Animated top gradient accent */}
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${cert.gradient} z-20`}></div>
              
              <div className={`w-14 h-14 rounded-2xl ${cert.bg} border ${cert.border} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 z-10 relative`}>
                <Icon className={`w-7 h-7 ${cert.color}`} />
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 mb-1 leading-tight z-10 relative">{cert.title}</h3>
              <p className="text-[15px] font-medium text-slate-500 mb-8 z-10 relative">{cert.subtitle}</p>
              
              <div className="mt-auto flex justify-between items-center z-10 relative">
                 <span className="font-mono text-[10px] font-bold text-slate-500 bg-white shadow-sm px-3 py-1.5 rounded-lg border border-slate-100 group-hover:border-slate-300 transition-colors uppercase tracking-wider">
                   {cert.date}
                 </span>
                 
                 <div className={`w-8 h-8 rounded-full ${cert.bg} border ${cert.border} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-12`}>
                    <Award className={`w-4 h-4 ${cert.color}`} />
                 </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
