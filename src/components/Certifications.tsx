import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { BadgeCheck, X, Maximize2, ExternalLink, Calendar, Award } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../i18n/LanguageContext';

type CertId = 'techniques' | 'algorithms' | 'structures' | 'web' | 'mobile';

const certsData = [
  {
    id: 'techniques' as CertId,
    issuer: 'NAU / FCCN',
    date: '2026',
    image: '/certificado-nau-curso-tecnicas.jpg',
    colSpan: 'md:col-span-2 lg:col-span-2 lg:row-span-2',
  },
  {
    id: 'algorithms' as CertId,
    issuer: 'NAU / FCCN',
    date: '2026',
    image: '/certificado-nau-curso-algoritmos.jpg',
    colSpan: 'md:col-span-2 lg:col-span-2',
  },
  {
    id: 'structures' as CertId,
    issuer: 'NAU / FCCN',
    date: '2025',
    image: '/certificado-nau-curso-estruturas.jpg',
    colSpan: 'md:col-span-1 lg:col-span-1',
  },
  {
    id: 'web' as CertId,
    issuer: 'NAU / FCCN',
    date: '2025',
    image: '/certificado-nau-curso-prog_web.jpg',
    colSpan: 'md:col-span-1 lg:col-span-1',
  },
  {
    id: 'mobile' as CertId,
    issuer: 'NAU / FCCN',
    date: '2025',
    image: '/certificado-nau-curso-prog_moveis.jpg',
    colSpan: 'md:col-span-2 lg:col-span-2',
  }
];

function CertificateModal({ cert, onClose, t }: { cert: typeof certsData[0], onClose: () => void, t: any }) {
  const title = t(`hall_of_fame.certs.${cert.id}.title`);
  const tags = t(`hall_of_fame.certs.${cert.id}.tags`, { returnObjects: true }) as string[];

  return createPortal(
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10 bg-slate-900/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
        >
          <X className="w-6 h-6 text-slate-800" />
        </button>

        <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
          {/* Image Container */}
          <div className="lg:flex-1 bg-slate-100 flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-100">
            <img 
              src={cert.image} 
              alt={title} 
              className="max-w-full max-h-full object-contain shadow-lg"
            />
          </div>

          {/* Info Sidebar */}
          <div className="lg:w-80 p-8 flex flex-col bg-white">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-jb-primary/10 flex items-center justify-center">
                <BadgeCheck className="w-6 h-6 text-jb-primary" />
              </div>
              <span className="font-mono text-[10px] font-bold text-jb-primary uppercase tracking-widest">{t('hall_of_fame.modal.verified')}</span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 leading-tight mb-4">{title}</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-slate-500">
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">{cert.issuer}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{cert.date}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-auto">
              {tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-slate-100">
                  {tag}
                </span>
              ))}
            </div>

            <button 
              onClick={onClose}
              className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-colors"
            >
              {t('hall_of_fame.modal.close')}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default function Certifications() {
  const { t } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<typeof certsData[0] | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="px-5 sm:px-6 py-32 lg:px-10 max-w-7xl mx-auto w-full relative z-10" id="certificacoes">
      <div className="flex flex-col mb-20 cursor-default">
        <h2 className="text-2xl font-bold font-mono tracking-tighter text-slate-800 uppercase flex items-center gap-3 mb-4">
          <BadgeCheck className="w-7 h-7 text-jb-primary" />
          {t('hall_of_fame.badge')} <span className="text-jb-primary not-italic">/</span>
        </h2>
        <span className="text-slate-500 font-mono italic normal-case font-medium text-3xl sm:text-5xl">{t('hall_of_fame.title')}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[280px] gap-6 lg:gap-8">
        {certsData.map((cert, idx) => {
          const title = t(`hall_of_fame.certs.${cert.id}.title`);
          return (
            <motion.div
              key={cert.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              onClick={() => setSelectedCert(cert)}
              className={`group relative rounded-[2rem] overflow-hidden cursor-pointer bg-white border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-jb-primary/20 ${cert.colSpan}`}
            >
              {/* Background Image Preview */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={cert.image} 
                  alt={title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-100 md:opacity-40 group-hover:opacity-100 grayscale-0 md:grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                <div className="translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-jb-primary/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-mono text-[10px] font-bold text-white/70 tracking-widest uppercase">{cert.issuer}</span>
                  </div>

                  <h3 className="text-xl font-black text-white leading-tight mb-2 pr-8">{title}</h3>
                  
                  <div className="flex items-center justify-between opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span className="text-xs font-mono text-jb-primary font-bold">{cert.date}</span>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-white uppercase tracking-tighter">
                      {t('hall_of_fame.card.fullView')} <Maximize2 className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>

              {/* JetBrains Corner Accent */}
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedCert && (
          <CertificateModal 
            cert={selectedCert} 
            onClose={() => setSelectedCert(null)} 
            t={t}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
