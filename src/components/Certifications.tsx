import { Award, ShieldCheck, Trophy } from 'lucide-react';
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
  }
];

export default function Certifications() {
  return (
    <section className="px-6 py-24 lg:px-10 max-w-7xl mx-auto w-full bg-[#FAFAFA]" id="certificacoes">
      <div className="flex items-center justify-between mb-16 cursor-default">
        <h2 className="text-2xl font-bold font-mono tracking-tighter text-slate-800 uppercase text-center w-full md:text-left">
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
              className="bg-white border border-slate-200 rounded-3xl p-8 relative overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all flex flex-col group cursor-default"
            >
              {/* Subtle top gradient accent */}
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${cert.gradient}`}></div>
              
              <div className={`w-14 h-14 rounded-2xl ${cert.bg} border ${cert.border} flex items-center justify-center mb-6`}>
                <Icon className={`w-7 h-7 ${cert.color}`} />
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-1">{cert.title}</h3>
              <p className="text-sm font-medium text-slate-500 mb-6">{cert.subtitle}</p>
              
              <div className="mt-auto flex justify-between items-center">
                 <span className="font-mono text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 group-hover:border-slate-300 transition-colors">
                   {cert.date}
                 </span>
                 
                 <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
