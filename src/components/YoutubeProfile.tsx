import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Search, 
  Bell, 
  MoreVertical, 
  Share2, 
  ThumbsUp, 
  MessageSquare,
  ChevronRight,
  Verified
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const YoutubeProfile = () => {
  const { t } = useLanguage();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState<'inicio' | 'videos'>('inicio');

  const allVideos = [
    { id: 'v1', key: 'v1', thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80', duration: '12:45' },
    { id: 'v2', key: 'v2', thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80', duration: '08:20' },
    { id: 'v3', key: 'v3', thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80', duration: '15:10' },
    { id: 'v4', key: 'v4', thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80', duration: '10:30' },
    { id: 'v5', key: 'v2', thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80', duration: '05:45' },
    { id: 'v6', key: 'v1', thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80', duration: '20:15' },
    { id: 'v7', key: 'v3', thumbnail: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80', duration: '18:30' },
    { id: 'v8', key: 'v4', thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80', duration: '14:20' }
  ];

  const displayedVideos = activeTab === 'inicio' ? allVideos.slice(0, 4) : allVideos;

  return (
    <section className="px-5 sm:px-6 py-24 lg:px-10 max-w-7xl mx-auto w-full relative z-10" id="youtube">
      {/* Section Header */}
      <div className="mb-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="px-3 py-1 bg-[#FF0000]/10 text-[#FF0000] text-[10px] font-mono font-bold rounded-full tracking-wider uppercase">
            {t('youtube.badge')}
          </span>
          <div className="h-[1px] flex-1 bg-linear-to-r from-[#FF0000]/20 to-transparent" />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight"
        >
          {t('youtube.title')} <span className="text-slate-400 font-light">{t('youtube.highlight')}</span>
        </motion.h2>
      </div>

      {/* YouTube Replica Container */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-[2rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden"
      >
        {/* Banner */}
        <a 
          href="https://www.youtube.com/@7guel" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block relative h-48 sm:h-64 overflow-hidden bg-slate-900 group"
        >
           <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80" 
            alt="YouTube Banner" 
            className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
           />
           <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        </a>

        {/* Profile Info */}
        <div className="px-6 sm:px-10 py-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative shrink-0 -mt-20 sm:-mt-24">
              <a 
                href="https://www.youtube.com/@7guel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white hover:opacity-90 transition-opacity"
              >
                <img src="/icon.png" alt="Avatar" className="w-full h-full object-cover" />
              </a>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <a 
                    href="https://www.youtube.com/@7guel" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2 hover:text-[#FF0000] transition-colors"
                  >
                    Miguel Santos <Verified className="w-5 h-5 fill-slate-400 text-white" />
                  </a>
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                    <span>{t('youtube.handle')}</span>
                    <span>•</span>
                    <span>{t('youtube.subs')}</span>
                    <span>•</span>
                    <span>{t('youtube.videos_count')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSubscribed(!isSubscribed)}
                    className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg ${
                      isSubscribed 
                        ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 shadow-none' 
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {isSubscribed ? t('youtube.subscribed') : t('youtube.subscribe')}
                  </motion.button>
                  
                  <AnimatePresence>
                    {isSubscribed && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        whileHover={{ rotate: 15 }}
                        className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                      >
                        <Bell className="w-5 h-5 fill-slate-600" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
                  {t('youtube.bio')}
                </p>
                <a 
                  href="https://miguelpsantos.tech" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#065FD4] hover:underline"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  miguelpsantos.tech
                </a>
              </div>
              
              <div className="flex items-center gap-6 pt-2 border-b border-slate-100">
                 <button 
                  onClick={() => setActiveTab('inicio')}
                  className={`relative pb-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                    activeTab === 'inicio' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                  }`}
                 >
                    Início
                    {activeTab === 'inicio' && (
                      <motion.div layoutId="tab-underline" className="h-0.5 w-full bg-slate-900 absolute bottom-0" />
                    )}
                 </button>
                 <button 
                  onClick={() => setActiveTab('videos')}
                  className={`relative pb-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                    activeTab === 'videos' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                  }`}
                 >
                    Vídeos
                    {activeTab === 'videos' && (
                      <motion.div layoutId="tab-underline" className="h-0.5 w-full bg-slate-900 absolute bottom-0" />
                    )}
                 </button>
                 <div className="pb-3 ml-auto">
                    <Search className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" />
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="px-6 sm:px-10 pb-10">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {displayedVideos.map((video) => (
                <motion.a 
                  href="https://www.youtube.com/@7guel"
                  target="_blank"
                  rel="noopener noreferrer"
                  key={video.id}
                  whileHover="hover"
                  className="flex flex-col gap-3 group cursor-pointer"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100">
                     <img 
                      src={video.thumbnail} 
                      alt={t(`youtube.videos.${video.key}.title`)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-2xl">
                           <Play className="w-6 h-6 fill-black text-black ml-1" />
                        </div>
                     </div>
                     <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {video.duration}
                     </div>
                  </div>
                  
                  <div className="flex gap-3">
                     <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 hidden sm:block">
                        <img src="/icon.png" className="w-full h-full object-cover" />
                     </div>
                     <div className="flex flex-col gap-1">
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-[#FF0000] transition-colors">
                          {t(`youtube.videos.${video.key}.title`)}
                        </h4>
                        <div className="flex flex-col text-[12px] text-slate-500">
                           <span>Miguel Santos</span>
                           <div className="flex items-center gap-1">
                              <span>{t(`youtube.videos.${video.key}.views`)} {t('youtube.views')}</span>
                              <span>•</span>
                              <span>{t('youtube.ago')} {t(`youtube.videos.${video.key}.time`)}</span>
                           </div>
                        </div>
                     </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default YoutubeProfile;
