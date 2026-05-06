import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { BadgeCheck, ArrowRight } from 'lucide-react';

const certs = [
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'AWS',
    date: '2024',
    colSpan: 'md:col-span-2 lg:col-span-2',
    iconSvg: (
      <svg className="w-6 h-6 text-jb-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
        <path d="M12 12l8-4.5" />
        <path d="M12 12v9" />
        <path d="M12 12L4 7.5" />
      </svg>
    ),
    link: '#'
  },
  {
    title: 'Google Associate Android Developer',
    issuer: 'GOOGLE',
    date: '2023',
    colSpan: 'md:col-span-1 lg:col-span-1',
    iconSvg: (
      <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    link: '#'
  },
  {
    title: 'Oracle Certified Associate (Java SE)',
    issuer: 'ORACLE',
    date: '2023',
    colSpan: 'md:col-span-1 lg:col-span-1',
    iconSvg: (
      <svg className="w-6 h-6 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </svg>
    ),
    link: '#'
  }
];

export default function Certifications() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="px-5 sm:px-6 py-24 lg:px-10 max-w-7xl mx-auto w-full" id="certificacoes">
      <div className="flex items-center justify-between mb-16 cursor-default">
        <h2 className="text-2xl font-bold font-mono tracking-tighter text-slate-800 uppercase flex items-center gap-3">
          <BadgeCheck className="w-6 h-6 text-jb-primary" />
          05 // Verified.java <span className="text-jb-primary not-italic">/</span> <br />
          <span className="text-slate-500 font-mono italic normal-case font-medium text-2xl sm:text-4xl ml-9">Hall of Fame & Expertise</span>
        </h2>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {certs.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : idx * 0.15, ease: "easeOut" }}
            className={`relative group bg-white ring-1 ring-gray-100/50 shadow-sm rounded-3xl p-8 pt-10 flex flex-col hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-jb-primary/50 transition-all duration-300 ${cert.colSpan}`}
          >
            {/* Header Glow pretending to be an IDE header */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-jb-primary/5 to-transparent rounded-t-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50"></div>

            <div className="flex-1 relative z-10">
               {/* Squircle Emblem */}
               <div className="w-14 h-14 rounded-[16px] bg-white ring-1 ring-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] flex items-center justify-center mb-8">
                  {cert.iconSvg}
               </div>

               <h3 className="text-xl font-sans font-semibold text-slate-800 mb-4 leading-tight group-hover:text-jb-primary transition-colors">
                  {cert.title}
               </h3>
               
               <div className="font-mono text-sm text-slate-500 tracking-wide break-words">
                  ISSUER: {cert.issuer} <br className="lg:hidden" /><span className="hidden lg:inline text-slate-300 mx-1">//</span> DATE: {cert.date}
               </div>
            </div>

            <div className="mt-10 relative z-10">
               <a href={cert.link} className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-jb-primary transition-colors group/link focus:outline-none">
                 Ver Credencial
                 <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/link:translate-x-1" />
               </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
