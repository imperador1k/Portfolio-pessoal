import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Search, 
  Library, 
  Plus, 
  Heart, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Shuffle, 
  Volume2, 
  Maximize2, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ListMusic,
  User,
  ExternalLink,
  Mic2,
  MonitorSpeaker,
  X
} from 'lucide-react';

import { useLanguage } from '../i18n/LanguageContext';

export default function SpotifyProfile() {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isFollowed, setIsFollowed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync audio state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.error("Audio play failed:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden" id="spotify">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-mono font-bold rounded-full tracking-wider uppercase border border-slate-200">
              {t('spotify.badge')}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight"
          >
            {t('spotify.title')} <span className="text-slate-400 font-light">{t('spotify.highlight')}</span>
          </motion.h2>
        </div>

        {/* Spotify Window Container */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col min-h-[600px] relative"
        >
          
          {/* Audio Element */}
          <audio 
            ref={audioRef}
            src="/study.mp3"
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />

          <div className="flex flex-1 overflow-hidden">
            
            {/* Sidebar (Left) - Hidden on Mobile */}
            <div className="hidden lg:flex w-64 bg-[#f6f6f6] flex-col p-6 border-r border-slate-100">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-[#1DB954] rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 text-white fill-white" />
                </div>
                <span className="font-bold text-lg tracking-tight text-slate-900">Spotify</span>
              </div>

              <nav className="space-y-6">
                <div className="space-y-4">
                   <div className="flex items-center gap-4 text-slate-900 font-bold cursor-pointer hover:text-black transition-colors">
                      <Home className="w-5 h-5" />
                      <span className="text-[14px]">{t('spotify.sidebar.home')}</span>
                   </div>
                   <div className="flex items-center gap-4 text-slate-500 font-bold cursor-pointer hover:text-slate-900 transition-colors">
                      <Search className="w-5 h-5" />
                      <span className="text-[14px]">{t('spotify.sidebar.search')}</span>
                   </div>
                   <div className="flex items-center gap-4 text-slate-500 font-bold cursor-pointer hover:text-slate-900 transition-colors">
                      <Library className="w-5 h-5" />
                      <span className="text-[14px]">{t('spotify.sidebar.library')}</span>
                   </div>
                </div>

                <div className="pt-6 space-y-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('spotify.sidebar.playlists')}</p>
                  <div className="space-y-3">
                    {['Deep Work Sessions', 'No-AI Logic', 'Engineering Flow', 'Kotlin Beats'].map((playlist) => (
                      <div key={playlist} className="text-[13px] font-medium text-slate-500 hover:text-slate-900 cursor-pointer transition-colors truncate">
                        {playlist}
                      </div>
                    ))}
                  </div>
                </div>
              </nav>
            </div>

            {/* Main Content (Center) */}
            <div className="flex-1 bg-white relative flex flex-col">
              {/* Top Navigation */}
              <div className="z-20 bg-white/80 backdrop-blur-md px-8 py-4 flex items-center justify-between">
                <div className="flex gap-4">
                  <button className="p-1.5 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button className="p-1.5 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                   <button className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-[13px] font-bold hover:scale-105 transition-transform">
                      Upgrade
                   </button>
                   <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-slate-500" />
                   </div>
                </div>
              </div>

              {/* Profile Header */}
              <div className="px-8 pt-6 pb-8 bg-gradient-to-b from-slate-50 to-white">
                 <div className="flex items-end gap-6">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="w-40 h-40 sm:w-48 sm:h-48 rounded-full shadow-2xl overflow-hidden border-4 border-white bg-slate-100 shrink-0"
                    >
                       <img src="/insta.png" alt="Miguel Santos" className="w-full h-full object-cover" />
                    </motion.div>
                    <div className="flex flex-col mb-2">
                       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Profile</span>
                       <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter mb-4">
                         Miguel Santos
                       </h1>
                       <div className="flex items-center gap-1.5 text-[13px] font-medium text-slate-600">
                          <span>4 public playlists</span>
                          <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                          <span>{t('spotify.monthly_listeners')}</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Controls */}
              <div className="px-8 py-6 flex items-center gap-6">
                 <button 
                  onClick={togglePlay}
                  className="w-14 h-14 bg-[#1DB954] rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all text-white fill-white"
                 >
                    {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white" />}
                 </button>
                 <button 
                  onClick={() => setIsFollowed(!isFollowed)}
                  className={`px-6 py-1.5 rounded border border-slate-200 text-[11px] font-bold uppercase tracking-widest transition-all ${isFollowed ? 'bg-slate-900 text-white border-slate-900' : 'text-slate-900 hover:border-slate-900'}`}
                 >
                    {isFollowed ? 'Following' : 'Follow'}
                 </button>
                 <button className="text-slate-400 hover:text-slate-900 transition-colors">
                    <MoreHorizontal className="w-6 h-6" />
                 </button>
              </div>

              {/* Playlist Grid */}
              <div className="px-8 pb-32">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">Public Playlists</h3>
                    <span className="text-[11px] font-bold text-slate-400 hover:underline cursor-pointer uppercase tracking-widest">Show all</span>
                 </div>

                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {[
                      { title: 'Deep Work Sessions', desc: 'Instrumental beats for peak concentration', img: '/journey.jpg' },
                      { title: 'No-AI Logic', desc: 'Pure engineering mindset music', img: '/motorcycle.jpg' },
                      { title: 'Engineering Flow', desc: 'Techno and focus for late nights', img: '/discipline.jpg' }
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ y: -5 }}
                        className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group cursor-pointer"
                      >
                         <div className="aspect-square rounded-lg bg-slate-200 mb-4 overflow-hidden shadow-md relative">
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                            <button className="absolute bottom-2 right-2 w-10 h-10 bg-[#1DB954] rounded-full flex items-center justify-center shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-white fill-white">
                               <Play className="w-5 h-5 fill-white" />
                            </button>
                         </div>
                         <h4 className="font-bold text-[14px] text-slate-900 truncate mb-1">{item.title}</h4>
                         <p className="text-[12px] text-slate-500 line-clamp-2">{item.desc}</p>
                      </motion.div>
                    ))}
                 </div>
              </div>
            </div>

            {/* Now Playing Panel (Right) - Hidden on Mobile/Tablet */}
            <div className="hidden xl:flex w-[320px] bg-white border-l border-slate-100 flex-col">
               <div className="p-6 flex items-center justify-between bg-white z-10">
                  <span className="text-[14px] font-bold text-slate-900">{t('spotify.now_playing')}</span>
                  <div className="flex gap-2">
                    <MoreHorizontal className="w-4 h-4 text-slate-500 cursor-pointer" />
                    <X className="w-4 h-4 text-slate-500 cursor-pointer" />
                  </div>
               </div>

               <div className="px-6 pb-6 space-y-6">
                  {/* Big Cover */}
                  <div className="aspect-square rounded-xl bg-slate-900 overflow-hidden shadow-2xl relative group">
                     <img src="/banner_linkedin.png" alt="study.mp3" className="w-full h-full object-cover opacity-80" />
                     <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-12 h-12 text-white fill-white" />
                     </div>
                  </div>

                  {/* Info */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                       <h2 className="text-xl font-bold text-slate-900 truncate">{t('spotify.song_title')}</h2>
                       <Heart className="w-5 h-5 text-[#1DB954] fill-[#1DB954]" />
                    </div>
                    <p className="text-[14px] text-slate-500">{t('spotify.artist_name')}</p>
                  </div>

                  {/* Artist Card */}
                  <div className="bg-[#f6f6f6] rounded-xl overflow-hidden group">
                     <div className="h-40 bg-slate-200 relative overflow-hidden">
                        <img src="/insta.png" alt="Artist" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/40 backdrop-blur-md rounded text-[10px] font-bold text-white uppercase tracking-wider">
                           {t('spotify.about_artist')}
                        </div>
                     </div>
                     <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                           <h4 className="font-bold text-slate-900">Miguel Santos</h4>
                           <button className="px-4 py-1 rounded-full border border-slate-300 text-[11px] font-bold uppercase hover:border-slate-900 transition-colors">
                              {t('spotify.follow')}
                           </button>
                        </div>
                        <p className="text-[13px] text-slate-600 leading-relaxed mb-4">
                           {t('spotify.bio')}
                        </p>
                        <div className="flex items-center justify-between text-[12px] font-bold text-slate-400">
                           <span>1 listener</span>
                           <ExternalLink className="w-4 h-4" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

          </div>

          {/* Bottom Player Bar */}
          <div className="h-24 bg-white border-t border-slate-100 flex items-center px-4 shrink-0 relative z-30 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)]">
             {/* Left: Song Info */}
             <div className="w-[30%] flex items-center gap-3">
                <div className="w-14 h-14 bg-slate-900 rounded shadow-md shrink-0 overflow-hidden">
                   <img src="/banner_linkedin.png" alt="Study" className="w-full h-full object-cover" />
                </div>
                <div className="hidden sm:block overflow-hidden">
                   <h5 className="text-[13px] font-bold text-slate-900 truncate">{t('spotify.song_title')}</h5>
                   <p className="text-[11px] text-slate-500 truncate">{t('spotify.artist_name')}</p>
                </div>
                <Heart className="hidden md:block w-4 h-4 text-[#1DB954] fill-[#1DB954] ml-2" />
             </div>

             {/* Center: Controls */}
             <div className="flex-1 flex flex-col items-center">
                <div className="flex items-center gap-6 mb-2">
                   <Shuffle className="hidden sm:block w-4 h-4 text-slate-400 hover:text-slate-900 transition-colors" />
                   <SkipBack className="w-4 h-4 text-slate-400 hover:text-slate-900 transition-colors fill-current" />
                   <button 
                    onClick={togglePlay}
                    className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all"
                   >
                      {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                   </button>
                   <SkipForward className="w-4 h-4 text-slate-400 hover:text-slate-900 transition-colors fill-current" />
                   <Repeat className="hidden sm:block w-4 h-4 text-slate-400 hover:text-slate-900 transition-colors" />
                </div>
                <div className="w-full max-w-[500px] flex items-center gap-2 px-4">
                   <span className="text-[10px] text-slate-400 font-mono w-8 text-right">{formatTime(currentTime)}</span>
                   <input 
                    type="range" 
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 h-1 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#1DB954]"
                   />
                   <span className="text-[10px] text-slate-400 font-mono w-8">{formatTime(duration)}</span>
                </div>
             </div>

             {/* Right: Tools */}
             <div className="w-[30%] flex items-center justify-end gap-3 pr-2">
                <Mic2 className="hidden lg:block w-4 h-4 text-slate-400 hover:text-slate-900" />
                <ListMusic className="hidden lg:block w-4 h-4 text-slate-400 hover:text-slate-900" />
                <MonitorSpeaker className="hidden lg:block w-4 h-4 text-slate-400 hover:text-slate-900" />
                <div className="flex items-center gap-2 group">
                   <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
                   <input 
                    type="range" 
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-24 h-1 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#1DB954]"
                   />
                </div>
                <Maximize2 className="hidden sm:block w-4 h-4 text-slate-400 hover:text-slate-900" />
             </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
