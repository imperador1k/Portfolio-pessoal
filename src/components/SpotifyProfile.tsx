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
import { AudioVisualizer } from './AudioVisualizer';

export default function SpotifyProfile() {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isFollowed, setIsFollowed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isPlaylistLoading, setIsPlaylistLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(true);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [view, setView] = useState<'home' | 'search' | 'playlist' | 'library'>('home');
  const [currentPlaylist, setCurrentPlaylist] = useState<any>(null);
  const [playbackContext, setPlaybackContext] = useState<any[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1);
  const [currentTrack, setCurrentTrack] = useState<any>({
    id: 'initial',
    title: 'Discovering music...',
    artist: 'Spotify',
    cover: 'https://images.unsplash.com/photo-1514525253344-f814d0743b1a?q=80&w=500&auto=format&fit=crop',
    url: ''
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-play when track changes
  useEffect(() => {
    if (audioRef.current && currentTrack.url && isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Playback failed:", error);
        });
      }
    }
  }, [currentTrack.url]);

  // Search logic (Deezer API)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
        setView('search');
        performSearch(searchQuery);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);
  
  // Load initial random track on mount
  useEffect(() => {
    const loadInitialTrack = async () => {
      try {
        const results = await performSearch('lofi beats');
        if (results && results.length > 0) {
          const randomIndex = Math.floor(Math.random() * results.length);
          const randomTrack = results[randomIndex];
          const formatted = {
            id: randomTrack.id || randomTrack.trackId,
            title: randomTrack.title || randomTrack.trackName,
            artist: randomTrack.artist?.name || randomTrack.artistName,
            url: randomTrack.preview || randomTrack.previewUrl,
            cover: randomTrack.album?.cover_xl || randomTrack.artworkUrl100?.replace('100x100', '600x600'),
            duration: randomTrack.duration || Math.floor(randomTrack.trackTimeMillis / 1000)
          };
          setCurrentTrack(formatted);
          setPlaybackContext(results);
          setCurrentTrackIndex(randomIndex);
        }
      } catch (error) {
        console.error("Failed to load initial track", error);
      }
    };

    loadInitialTrack();
  }, []);

  const performSearch = async (query: string, isPlaylist = false) => {
    if (!isPlaylist) setIsSearching(true);
    try {
      console.log(`🎵 Searching for: ${query}...`);
      
      // 1. Tentar iTunes primeiro (Direct fetch, no CORS issues, highly reliable)
      const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=25`;
      const response = await fetch(itunesUrl);
      if (!response.ok) throw new Error("iTunes API unreachable");
      
      const data = await response.json();
      let tracks = (data.results || []).map((t: any) => ({
        id: t.trackId,
        title: t.trackName,
        artist: { name: t.artistName },
        album: { 
          cover_medium: t.artworkUrl100?.replace('100x100', '300x300'), 
          cover_xl: t.artworkUrl100?.replace('100x100', '600x600') 
        },
        preview: t.previewUrl,
        duration: Math.floor(t.trackTimeMillis / 1000)
      }));

      if (tracks.length === 0) {
        console.warn("iTunes returned 0, trying Deezer fallback...");
        const targetUrl = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=25`;
        const dzResp = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`);
        const dzData = await dzResp.json();
        tracks = dzData.data || [];
      }

      // 3. Fallback Final (Músicas "Curinga" se tudo falhar)
      if (tracks.length === 0) {
        console.error("All APIs failed. Using emergency mock data.");
        tracks = [
          { 
            id: 'mock1', title: 'Deep Focus (Emergency Fallback)', artist: { name: 'Engineering Radio' }, 
            album: { cover_medium: '/journey.webp' }, preview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', duration: 300 
          },
          { 
            id: 'mock2', title: 'Night Shift Flow', artist: { name: 'Miguel Santos' }, 
            album: { cover_medium: '/discipline.webp' }, preview: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', duration: 240 
          }
        ];
      }

      console.log(`✅ Found ${tracks.length} tracks.`);
      if (!isPlaylist) setSearchResults(tracks);
      return tracks;
    } catch (error) {
      console.error("Music API Critical Error:", error);
      // Emergency return to prevent infinite loading
      return [
        { 
          id: 'err1', title: 'Check your connection', artist: { name: 'System' }, 
          album: { cover_medium: '/motorcycle.webp' }, preview: '', duration: 0 
        }
      ];
    } finally {
      if (!isPlaylist) setIsSearching(false);
    }
  };

  const openPlaylist = async (playlist: any) => {
    setView('playlist');
    setIsPlaylistLoading(true);
    setCurrentPlaylist({ ...playlist, tracks: [] });
    
    try {
      const tracks = await performSearch(playlist.searchQuery, true);
      setCurrentPlaylist({ ...playlist, tracks });
    } catch (error) {
      console.error("Failed to load playlist:", error);
    } finally {
      setIsPlaylistLoading(false);
    }
  };

  const playTrack = (track: any, index: number, context: any[]) => {
    const trackUrl = track.preview || track.previewUrl;
    if (!trackUrl) return;

    const newTrack = {
      id: track.id || track.trackId,
      title: track.title || track.trackName,
      artist: track.artist?.name || track.artistName,
      cover: track.album?.cover_xl || track.album?.cover_big || track.album?.cover_medium || track.artworkUrl100?.replace('100x100', '600x600'),
      url: trackUrl
    };

    setCurrentTrackIndex(index);
    setPlaybackContext(context);
    setCurrentTrack(newTrack);
    setIsPlaying(true);
    setShowMiniPlayer(true);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = trackUrl;
      audioRef.current.load();
      // O play() é chamado pelo useEffect de auto-play que já temos
    }
  };

  const playNext = () => {
    if (playbackContext.length > 0 && currentTrackIndex < playbackContext.length - 1) {
      playTrack(playbackContext[currentTrackIndex + 1], currentTrackIndex + 1, playbackContext);
    }
  };

  const playPrev = () => {
    if (playbackContext.length > 0 && currentTrackIndex > 0) {
      playTrack(playbackContext[currentTrackIndex - 1], currentTrackIndex - 1, playbackContext);
    }
  };

  const toggleFavorite = (track: any) => {
    if (!track || !track.id) return;
    setFavorites(prev => {
      const exists = prev.find(t => t.id === track.id);
      if (exists) {
        return prev.filter(t => t.id !== track.id);
      } else {
        return [...prev, track];
      }
    });
  };

  const isFavorite = (trackId: string) => favorites.some(t => t.id === trackId);
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
  };

  const playlistData = [
    { id: 1, title: 'Deep Work Sessions', desc: 'Instrumental beats for peak concentration', img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=500&auto=format&fit=crop', searchQuery: 'lofi instrumental' },
    { id: 2, title: 'No-AI Logic', desc: 'Pure engineering mindset music', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=500&auto=format&fit=crop', searchQuery: 'techno focus' },
    { id: 3, title: 'Engineering Flow', desc: 'Techno and focus for late nights', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=500&auto=format&fit=crop', searchQuery: 'deep house' },
    { id: 4, title: 'Kotlin Beats', desc: 'Productive coding vibes', img: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=500&auto=format&fit=crop', searchQuery: 'programming music' }
  ];

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

  // Sync Global Playback State (Navbar, etc)
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('spotify-play-state', { detail: { isPlaying } }));
  }, [isPlaying]);

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
            <div className="h-px flex-1 bg-linear-to-r from-slate-200 to-transparent" />
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
            src={currentTrack.url}
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoadedMetadata}
            onEnded={playNext}
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
                   <div 
                    onClick={() => { setView('home'); setSearchQuery(''); }}
                    className={`flex items-center gap-4 font-bold cursor-pointer transition-colors ${view === 'home' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
                   >
                      <Home className="w-5 h-5" />
                      <span className="text-[14px]">{t('spotify.sidebar.home')}</span>
                   </div>
                   <div className="relative group">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#1DB954]" />
                      <input 
                        type="text"
                        placeholder={t('spotify.sidebar.search')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-200/50 border-none rounded-full py-2 pl-10 pr-4 text-[13px] focus:ring-2 focus:ring-[#1DB954]/20 outline-none transition-all"
                      />
                   </div>
                   <div 
                    onClick={() => { setView('library'); setSearchQuery(''); }}
                    className={`flex items-center gap-4 font-bold cursor-pointer transition-colors ${view === 'library' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
                   >
                      <Library className="w-5 h-5" />
                      <span className="text-[14px]">{t('spotify.sidebar.library')}</span>
                   </div>
                </div>

                <div className="pt-6 space-y-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('spotify.sidebar.playlists')}</p>
                  <div className="space-y-3">
                    {playlistData.map((playlist) => (
                      <div 
                        key={playlist.id} 
                        onClick={() => openPlaylist(playlist)}
                        className={`text-[13px] font-medium transition-colors truncate cursor-pointer ${currentPlaylist?.id === playlist.id && view === 'playlist' ? 'text-[#1DB954]' : 'text-slate-500 hover:text-slate-900'}`}
                      >
                        {playlist.title}
                      </div>
                    ))}
                  </div>
                </div>
              </nav>
            </div>

            {/* Main Content (Center) */}
            <div className="flex-1 bg-white relative flex flex-col min-w-0">
              {/* Top Navigation */}
              <div className="z-20 bg-white/80 backdrop-blur-md px-8 py-4 flex items-center justify-between shrink-0">
                <div className="flex gap-4">
                  <button aria-label="Go home" onClick={() => setView('home')}
                    className="p-1.5 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button aria-label="Navigate" className="p-1.5 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
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

              {/* Mobile View Switcher (Tabs) */}
              <div className="lg:hidden flex items-center gap-6 px-8 py-2 border-b border-slate-50 overflow-x-auto no-scrollbar shrink-0">
                <button 
                  onClick={() => { setView('home'); setSearchQuery(''); }}
                  className={`text-[13px] font-bold pb-1 transition-colors whitespace-nowrap ${view === 'home' ? 'text-[#1DB954] border-b-2 border-[#1DB954]' : 'text-slate-400'}`}
                >
                  Home
                </button>
                <button 
                  onClick={() => setView('search')}
                  className={`text-[13px] font-bold pb-1 transition-colors whitespace-nowrap ${view === 'search' ? 'text-[#1DB954] border-b-2 border-[#1DB954]' : 'text-slate-400'}`}
                >
                  Search
                </button>
                <button 
                  onClick={() => setView('library')}
                  className={`text-[13px] font-bold pb-1 transition-colors whitespace-nowrap ${view === 'library' ? 'text-[#1DB954] border-b-2 border-[#1DB954]' : 'text-slate-400'}`}
                >
                  Library
                </button>
              </div>

              {/* Scrollable Area */}
              <div className="flex-1 overflow-y-auto no-scrollbar">
                {view === 'search' ? (
                  /* Search Results UI */
                  <div className="px-8 py-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-slate-900">Results for "{searchQuery}"</h3>
                      <button onClick={() => { setView('home'); setSearchQuery(''); }} className="text-slate-400 hover:text-slate-900"><X className="w-5 h-5" /></button>
                    </div>
                    {isSearching ? (
                      <div className="space-y-4">
                        {[1,2,3,4,5].map(i => (
                          <div key={i} className="h-12 bg-slate-100 animate-pulse rounded-lg w-full"></div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {searchResults.map((track, index) => (
                          <div 
                            key={track.id}
                            onClick={() => playTrack(track, index, searchResults)}
                            className={`flex items-center gap-4 p-2 hover:bg-slate-100 rounded-lg cursor-pointer group transition-colors ${currentTrack.id === track.id ? 'bg-slate-50' : ''}`}
                          >
                            <div className="w-10 h-10 rounded overflow-hidden shrink-0 relative">
                              <img src={track.album.cover_medium} alt={track.title} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <Play className="w-4 h-4 text-white fill-white" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-slate-900 truncate">{track.title}</p>
                              <p className="text-xs text-slate-500 truncate">{track.artist.name}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={(e) => { e.stopPropagation(); toggleFavorite(track); }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
                              >
                                <Heart className={`w-4 h-4 transition-colors ${isFavorite(track.id || track.trackId) ? 'text-[#1DB954] fill-[#1DB954]' : 'text-slate-400 hover:text-slate-900'}`} />
                              </button>
                              <span className="text-xs text-slate-400 font-mono hidden sm:block">
                                {formatTime(track.duration)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : view === 'library' ? (
                  /* Library View */
                  <div className="px-8 py-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">Your Library</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                      {/* Liked Songs Card */}
                      <motion.div 
                        whileHover={{ y: -5 }}
                        onClick={() => {
                          if (favorites.length > 0) {
                            setCurrentPlaylist({ 
                              title: 'Liked Songs', 
                              desc: `${favorites.length} songs`, 
                              img: 'https://images.unsplash.com/photo-1514525253344-f814d0743b1a?q=80&w=500&auto=format&fit=crop',
                              tracks: favorites 
                            });
                            setView('playlist');
                          }
                        }}
                        className="col-span-2 p-6 rounded-2xl bg-linear-to-br from-[#450af5] to-[#8e8ee5] flex flex-col justify-end relative overflow-hidden group cursor-pointer shadow-xl h-full min-h-[220px]"
                      >
                        <div className="absolute top-4 right-4 bg-white/20 p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-6 h-6 text-white fill-white" />
                        </div>
                        <div className="space-y-2 relative z-10">
                          <h3 className="text-3xl font-black text-white tracking-tighter">Liked Songs</h3>
                          <p className="text-white/80 font-bold">{favorites.length} liked songs</p>
                        </div>
                      </motion.div>

                      {/* Playlists in Library */}
                      {playlistData.map((item) => (
                        <motion.div 
                          key={item.id}
                          onClick={() => openPlaylist(item)}
                          whileHover={{ y: -5 }}
                          className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group cursor-pointer"
                        >
                          <div className="aspect-square rounded-lg bg-slate-200 mb-4 overflow-hidden shadow-md relative">
                              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                              <button aria-label="Play Playlist" className="absolute bottom-2 right-2 w-10 h-10 bg-[#1DB954] rounded-full flex items-center justify-center shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-white fill-white">
                                <Play className="w-5 h-5 fill-white" />
                              </button>
                          </div>
                          <h4 className="font-bold text-[14px] text-slate-900 truncate mb-1">{item.title}</h4>
                          <p className="text-[12px] text-slate-500 line-clamp-1">{item.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : view === 'playlist' ? (
                  /* Playlist View */
                  <div className="pb-12">
                    <div className="px-8 pt-6 pb-8 bg-linear-to-b from-slate-100 to-white flex items-end gap-6">
                      <div className="w-48 h-48 sm:w-60 sm:h-60 shadow-2xl overflow-hidden rounded-lg shrink-0">
                        <img src={currentPlaylist.tracks?.length > 0 ? (currentPlaylist.tracks[0].album.cover_xl || currentPlaylist.tracks[0].album.cover_medium) : currentPlaylist.img} alt={currentPlaylist.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="mb-2">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 inline-block">Public Playlist</span>
                        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter mb-4 leading-tight">{currentPlaylist.title}</h1>
                        <p className="text-slate-500 text-sm font-medium">{currentPlaylist.desc}</p>
                      </div>
                    </div>
                    
                    <div className="px-8 py-6 flex items-center gap-6">
                      <button aria-label="Play Music" className="w-14 h-14 bg-[#1DB954] rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all text-white">
                        <Play className="w-6 h-6 fill-white" />
                      </button>
                      <button aria-label="Toggle Favorite" onClick={() => toggleFavorite(currentTrack)}>
                        <Heart className={`w-8 h-8 transition-colors ${isFavorite(currentTrack.id) ? 'text-[#1DB954] fill-[#1DB954]' : 'text-slate-300 hover:text-[#1DB954]'}`} />
                      </button>
                      <MoreHorizontal className="w-6 h-6 text-slate-400" />
                    </div>

                    <div className="px-8">
                      <div className="grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 mb-2">
                        <span>#</span>
                        <span>Title</span>
                        <span>Duration</span>
                      </div>
                      <div className="space-y-1">
                        {isPlaylistLoading ? (
                          <div className="py-20 text-center space-y-4">
                            <div className="inline-block animate-spin w-6 h-6 border-2 border-[#1DB954] border-t-transparent rounded-full" />
                            <p className="text-sm text-slate-400 font-medium">Loading tracks from Deezer...</p>
                          </div>
                        ) : currentPlaylist.tracks?.length > 0 ? (
                          currentPlaylist.tracks.map((track: any, i: number) => (
                            <div 
                              key={track.id}
                              onClick={() => playTrack(track, i, currentPlaylist.tracks)}
                              className={`grid grid-cols-[auto_1fr_auto] gap-4 items-center px-4 py-2 hover:bg-slate-100 rounded-lg cursor-pointer group transition-colors ${currentTrack.id === track.id ? 'bg-slate-50' : ''}`}
                            >
                              {currentTrack.id === (track.id || track.trackId) ? (
                                <div className="w-4 flex justify-center"><AudioVisualizer isPlaying={isPlaying} /></div>
                              ) : (
                                <span className="text-sm text-slate-400 w-4 font-mono group-hover:hidden">{i + 1}</span>
                              )}
                              <Play className={`w-4 h-4 text-[#1DB954] hidden group-hover:block fill-[#1DB954] ${currentTrack.id === (track.id || track.trackId) ? '!hidden' : ''}`} />
                              <div className="flex items-center gap-3 min-w-0">
                                <img 
                                  src={track.album?.cover_medium || track.artworkUrl100 || 'https://via.placeholder.com/100'} 
                                  alt={track.title || track.trackName || "Track Cover"}
                                  className="w-8 h-8 rounded shrink-0 object-cover" 
                                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100' }}
                                />
                                <div className="min-w-0">
                                  <p className="text-[14px] font-bold text-slate-900 truncate">{track.title || track.trackName}</p>
                                  <p className="text-[12px] text-slate-500 truncate">{track.artist?.name || track.artistName}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); toggleFavorite(track); }}
                                  className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 ${isFavorite(track.id || track.trackId) ? 'opacity-100' : ''}`}
                                >
                                  <Heart className={`w-4 h-4 transition-colors ${isFavorite(track.id || track.trackId) ? 'text-[#1DB954] fill-[#1DB954]' : 'text-slate-400 hover:text-slate-900'}`} />
                                </button>
                                <span className="text-xs text-slate-400 font-mono">{formatTime(track.duration || Math.floor(track.trackTimeMillis / 1000))}</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="py-20 text-center text-slate-400">
                            <p className="text-sm font-medium">No tracks found for this playlist.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Home/Profile View */
                  <>
                    <div className="px-8 pt-6 pb-8 bg-linear-to-b from-slate-50 to-white">
                      <div className="flex items-end gap-6">
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="w-40 h-40 sm:w-48 sm:h-48 rounded-full shadow-2xl overflow-hidden border-4 border-white bg-slate-100 shrink-0"
                          >
                            <img src="/whatsapp.webp" alt="Miguel Santos" className="w-full h-full object-cover" />
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

                    <div className="px-8 py-6 flex items-center gap-6">
                      <button aria-label="Toggle Play" onClick={togglePlay}
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
                      <button aria-label="More Options" className="text-slate-400 hover:text-slate-900 transition-colors">
<MoreHorizontal className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="px-8 pb-12">
                      <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Public Playlists</h3>
                          <span className="text-[11px] font-bold text-slate-400 hover:underline cursor-pointer uppercase tracking-widest">Show all</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                          {playlistData.map((item) => (
                            <motion.div 
                              key={item.id}
                              onClick={() => openPlaylist(item)}
                              whileHover={{ y: -5 }}
                              className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group cursor-pointer"
                            >
                              <div className="aspect-square rounded-lg bg-slate-200 mb-4 overflow-hidden shadow-md relative">
                                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                                  <button aria-label="Play Playlist" className="absolute bottom-2 right-2 w-10 h-10 bg-[#1DB954] rounded-full flex items-center justify-center shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-white fill-white">
                                    <Play className="w-5 h-5 fill-white" />
                                  </button>
                              </div>
                              <h4 className="font-bold text-[14px] text-slate-900 truncate mb-1">{item.title}</h4>
                              <p className="text-[12px] text-slate-500 line-clamp-2">{item.desc}</p>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Now Playing Panel (Right) - Hidden on Mobile/Tablet */}
            <div className="hidden xl:flex w-[320px] bg-white border-l border-slate-100 flex-col shrink-0">
               <div className="p-6 flex items-center justify-between bg-white z-10">
                  <span className="text-[14px] font-bold text-slate-900">{t('spotify.now_playing')}</span>
                  <div className="flex gap-2">
                    <MoreHorizontal className="w-4 h-4 text-slate-500 cursor-pointer" />
                    <X 
                      onClick={() => setSearchQuery('')}
                      className="w-4 h-4 text-slate-500 cursor-pointer" 
                    />
                  </div>
               </div>

               <div className="px-6 pb-6 space-y-6 overflow-y-auto no-scrollbar">
                  {/* Big Cover */}
                  <div className="aspect-square rounded-xl bg-slate-900 overflow-hidden shadow-2xl relative group">
                     <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover opacity-80" />
                     <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-12 h-12 text-white fill-white" />
                     </div>
                  </div>

                  {/* Info */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                       <div className="flex items-center gap-3">
                         <h2 className="text-xl font-bold text-slate-900 truncate max-w-[180px]">{currentTrack.title}</h2>
                         {currentTrack.id !== 'study' && <AudioVisualizer isPlaying={isPlaying} />}
                       </div>
                       <button aria-label="Toggle Favorite" onClick={() => toggleFavorite(currentTrack.id)}>
                         <Heart className={`w-5 h-5 transition-colors ${favorites.includes(currentTrack.id) ? 'text-[#1DB954] fill-[#1DB954]' : 'text-slate-400 hover:text-slate-900'}`} />
                       </button>
                    </div>
                    <p className="text-[14px] text-slate-500">{currentTrack.artist}</p>
                  </div>

                  {/* Artist Card */}
                  <div className="bg-[#f6f6f6] rounded-xl overflow-hidden group">
                     <div className="h-40 bg-slate-200 relative overflow-hidden">
                        <img src="/whatsapp.webp" alt="Artist" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/40 backdrop-blur-md rounded text-[10px] font-bold text-white uppercase tracking-wider">
                           {t('spotify.about_artist')}
                        </div>
                     </div>
                     <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                           <h4 className="font-bold text-slate-900">Miguel Santos</h4>
                           <button 
                             onClick={() => setIsFollowing(!isFollowing)}
                             className={`px-4 py-1 rounded-full border text-[11px] font-bold uppercase transition-all ${isFollowing ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-300 text-slate-900 hover:border-slate-900'}`}
                           >
                              {isFollowing ? 'Following' : t('spotify.follow')}
                           </button>
                        </div>
                        <p className="text-[13px] text-slate-600 leading-relaxed mb-4">
                           {t('spotify.bio')}
                        </p>
                        <div className="flex items-center justify-between text-[12px] font-bold text-slate-400">
                           <span>{t('spotify.monthly_listeners')}</span>
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
                   <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover" />
                </div>
                <div className="hidden sm:block overflow-hidden">
                   <div className="flex items-center gap-2">
                     <h5 className="text-[13px] font-bold text-slate-900 truncate">{currentTrack.title}</h5>
                     {isPlaying && currentTrack.id !== 'study' && <AudioVisualizer isPlaying={isPlaying} />}
                   </div>
                   <p className="text-[11px] text-slate-500 truncate">{currentTrack.artist}</p>
                </div>
                <button aria-label="Toggle Favorite" onClick={() => toggleFavorite(currentTrack)} className="ml-2 hidden md:block">
                  <Heart className={`w-4 h-4 transition-colors ${isFavorite(currentTrack.id) ? 'text-[#1DB954] fill-[#1DB954]' : 'text-slate-400 hover:text-slate-900'}`} />
                </button>
             </div>

             {/* Center: Controls */}
             <div className="flex-1 flex flex-col items-center">
                <div className="flex items-center gap-6 mb-2">
                   <Shuffle className="hidden sm:block w-4 h-4 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer" />
                   <SkipBack onClick={playPrev} className={`w-4 h-4 transition-colors fill-current cursor-pointer ${currentTrackIndex > 0 ? 'text-slate-900 hover:scale-110' : 'text-slate-300'}`} />
                   <button aria-label="Toggle Play" onClick={togglePlay}
                    className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all"
                   >
                      {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                   </button>
                   <SkipForward onClick={playNext} className={`w-4 h-4 transition-colors fill-current cursor-pointer ${playbackContext.length > 0 && currentTrackIndex < playbackContext.length - 1 ? 'text-slate-900 hover:scale-110' : 'text-slate-300'}`} />
                   <Repeat className="hidden sm:block w-4 h-4 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer" />
                </div>
                <div className="w-full max-w-[500px] flex items-center gap-2 px-4">
                   <span className="text-[10px] text-slate-400 font-mono w-8 text-right">{formatTime(currentTime)}</span>
                   <input aria-label="Slider" type="range" 
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
                   <input aria-label="Slider" type="range" 
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
            {/* Global Floating Mini Player */}
      <AnimatePresence>
        {isPlaying && showMiniPlayer && (
          <motion.div
            initial={{ opacity: 0, y: 100, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 100, x: "-50%" }}
            className="fixed bottom-24 sm:bottom-10 left-1/2 z-9999 flex items-center gap-2 sm:gap-4 p-2 sm:p-3 bg-white/80 backdrop-blur-2xl border border-white/50 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] group w-[92vw] sm:w-auto sm:min-w-[300px] overflow-hidden"
          >
            {/* Progress Bar (Tiny top line) */}
            <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-slate-100/50">
              <motion.div 
                className="h-full bg-[#1DB954]"
                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
              />
            </div>

            {/* Disk/Cover Animation */}
            <div className="relative w-10 h-10 sm:w-14 sm:h-14 shrink-0">
              <motion.img 
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                src={currentTrack.cover} 
                alt={currentTrack.title}
                className="w-full h-full object-cover rounded-full border-2 border-white shadow-md"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full shadow-inner" />
              </div>
              {/* Overlay Visualizer */}
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm border border-slate-100">
                <AudioVisualizer isPlaying={isPlaying} />
              </div>
            </div>

            {/* Track & Controls Container */}
            <div className="flex flex-col flex-1 min-w-0 gap-0.5 sm:gap-1 pr-6">
              <div className="min-w-0">
                <p className="text-[11px] sm:text-[13px] font-bold text-slate-900 truncate">{currentTrack.title}</p>
                <p className="text-[9px] sm:text-[11px] text-slate-500 truncate">{currentTrack.artist}</p>
              </div>

              <div className="flex items-center justify-between gap-2 sm:gap-4 mt-0.5">
                {/* Playback Controls */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button aria-label="Previous Track" onClick={playPrev} className="text-slate-400 hover:text-slate-900 transition-colors">
                    <SkipBack className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  </button>
                  <button aria-label="Toggle Play" onClick={togglePlay}
                    className="w-7 h-7 sm:w-9 sm:h-9 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-md hover:scale-110 active:scale-95 transition-all"
                  >
                    {isPlaying ? <Pause className="w-3 h-3 sm:w-4 sm:h-4 fill-white" /> : <Play className="w-3 h-3 sm:w-4 sm:h-4 fill-white ml-0.5" />}
                  </button>
                  <button aria-label="Next Track" onClick={playNext} className="text-slate-400 hover:text-slate-900 transition-colors">
                    <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  </button>
                </div>

                {/* Volume Control (Hidden on mobile) */}
                <div className="hidden sm:flex items-center gap-2 group/vol">
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover/vol:text-slate-900 transition-colors" />
                  <input aria-label="Slider" type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-16 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1DB954]"
                  />
                </div>
              </div>
            </div>

            {/* Close Button (More visible) */}
            <button 
              onClick={() => setShowMiniPlayer(false)}
              className="absolute top-1 sm:top-2 right-1 sm:right-2 p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
              title="Close Player"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </section>
  );
}
