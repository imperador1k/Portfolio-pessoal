import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';
import { 
  Heart, 
  MessageCircle, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  MapPin,
  MoreHorizontal,
  Send,
  Check
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const stories = [
  { id: 1, image: "/discipline.jpg", key: "s1", category_key: "discipline" },
  { id: 2, image: "/motorcycle.jpg", key: "s2", category_key: "ride" },
  { id: 3, image: "/mountain.jpg", key: "s3", category_key: "mountain" }
];

const hobbies = [
  {
    id: 1,
    key: "p1",
    category_key: "academy",
    image: "/discipline.jpg",
    baseLikes: 1200,
    comments: "42",
    tag: "consistent"
  },
  {
    id: 2,
    key: "p2",
    category_key: "natural",
    image: "/natural.jpg",
    baseLikes: 856,
    comments: "12",
    tag: "clarity"
  },
  {
    id: 3,
    key: "p3",
    category_key: "motorcycle",
    image: "/motorcycle.jpg",
    baseLikes: 3100,
    comments: "156",
    tag: "adrenaline"
  },
  {
    id: 4,
    key: "p4",
    category_key: "travel",
    image: "/mountain.jpg",
    baseLikes: 2400,
    comments: "89",
    tag: "adventure"
  },
  {
    id: 5,
    key: "p5",
    category_key: "photography",
    image: "/water.png",
    baseLikes: 942,
    comments: "28",
    tag: "visuals"
  },
  {
    id: 6,
    key: "p6",
    category_key: "origins",
    image: "/journey.jpg",
    baseLikes: 5200,
    comments: "999",
    tag: "roots"
  }
];

export default function AboutMe() {
  const { t } = useLanguage();
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [showStories, setShowStories] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [comments, setComments] = useState<Record<number, any[]>>({});
  const [newComment, setNewComment] = useState("");
  const [showMobileComments, setShowMobileComments] = useState(false);
  const storyProgressRef = useRef<NodeJS.Timeout | null>(null);
  const commentInputRef = useRef<HTMLInputElement>(null);

  // Load persistence on mount
  useEffect(() => {
    const savedFollowing = localStorage.getItem('insta_following') === 'true';
    const savedLikes = JSON.parse(localStorage.getItem('insta_likes') || '[]');
    const savedComments = JSON.parse(localStorage.getItem('insta_comments') || '{}');
    
    setIsFollowing(savedFollowing);
    setLikedPosts(savedLikes);
    
    // Initialize with fake data if empty
    if (Object.keys(savedComments).length === 0) {
      const initialComments: Record<number, any[]> = {
        1: [{ id: 'f1', user: 'gym_rat', text: 'Consistent effort! 🔥', time: '2h' }],
        2: [{ id: 'f2', user: 'coder_vibe', text: 'Clean setup, man!', time: '5h' }],
        4: [{ id: 'f3', user: 'coffee_lover', text: 'Best fuel ever ☕', time: '1d' }],
        6: [{ id: 'f4', user: 'dev_hero', text: 'Pure flow state! 🚀', time: '3h' }]
      };
      setComments(initialComments);
    } else {
      setComments(savedComments);
    }
  }, []);

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem('insta_following', isFollowing.toString());
    localStorage.setItem('insta_likes', JSON.stringify(likedPosts));
    localStorage.setItem('insta_comments', JSON.stringify(comments));
  }, [isFollowing, likedPosts, comments]);

  // Story Autoplay logic
  useEffect(() => {
    if (showStories) {
      if (storyProgressRef.current) clearTimeout(storyProgressRef.current);
      
      storyProgressRef.current = setTimeout(() => {
        if (currentStoryIndex < stories.length - 1) {
          setCurrentStoryIndex(prev => prev + 1);
        } else {
          setShowStories(false);
          setCurrentStoryIndex(0);
        }
      }, 5000); // 5 seconds per story
    }
    return () => {
      if (storyProgressRef.current) clearTimeout(storyProgressRef.current);
    };
  }, [showStories, currentStoryIndex]);

  const toggleFollow = () => setIsFollowing(!isFollowing);
  
  const toggleLike = (postId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId) 
        : [...prev, postId]
    );
  };

  const [lastCommentTime, setLastCommentTime] = useState<number[]>([]);
  const [commentError, setCommentError] = useState(false);

  const addComment = (postId: number) => {
    if (!newComment.trim()) return;

    // Rate Limit: 5 comments per minute
    const now = Date.now();
    const recentComments = lastCommentTime.filter(t => now - t < 60000);
    
    if (recentComments.length >= 5) {
      setCommentError(true);
      setTimeout(() => setCommentError(false), 3000);
      return;
    }

    const comment = {
      id: now.toString(),
      user: 'visitor',
      text: newComment.trim(),
      time: t('about.just_now')
    };

    setComments(prev => ({
      ...prev,
      [postId]: [comment, ...(prev[postId] || [])]
    }));
    
    setLastCommentTime([...recentComments, now]);
    setNewComment("");
  };

  const isLiked = (postId: number) => likedPosts.includes(postId);
  
  const getLikesDisplay = (post: any) => {
    const count = isLiked(post.id) ? post.baseLikes + 1 : post.baseLikes;
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count;
  };

  const getCommentCount = (postId: number) => {
    return (comments[postId]?.length || 0) + parseInt(hobbies.find(h => h.id === postId)?.comments || "0");
  };

  const nextPost = () => {
    if (!selectedPost) return;
    const currentIndex = hobbies.findIndex(h => h.id === selectedPost.id);
    setSelectedPost(hobbies[(currentIndex + 1) % hobbies.length]);
    setNewComment("");
  };

  const prevPost = () => {
    if (!selectedPost) return;
    const currentIndex = hobbies.findIndex(h => h.id === selectedPost.id);
    setSelectedPost(hobbies[(currentIndex - 1 + hobbies.length) % hobbies.length]);
    setNewComment("");
  };

  const nextStory = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
    } else {
      setShowStories(false);
      setCurrentStoryIndex(0);
    }
  };

  const prevStory = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
    }
  };

  return (
    <section className="px-5 sm:px-6 py-24 lg:px-10 max-w-7xl mx-auto w-full relative z-10" id="sobre">
      {/* Section Header */}
      <div className="mb-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="px-3 py-1 bg-jb-primary/10 text-jb-primary text-[10px] font-mono font-bold rounded-full tracking-wider uppercase">
            Lifestyle_Journey
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-jb-primary/20 to-transparent" />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight"
        >
          {t('about.title')} <span className="text-slate-400 font-light">{t('about.subtitle')}</span>
        </motion.h2>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl font-light">
          {t('about.description')}
        </p>
      </div>

      <div className="max-w-7xl mx-auto overflow-hidden">
        {/* Instagram-style Header */}
        <div className="p-8 lg:p-12 border-b border-slate-100 bg-white/5 backdrop-blur-[2px] rounded-[2.5rem] mb-8 border border-slate-200/50 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Profile Pic with Story Ring */}
            <div 
              className="relative group cursor-pointer"
              onClick={() => setShowStories(true)}
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ willChange: "transform" }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 blur-[2px] opacity-70 group-hover:blur-[4px] transition-all"
              />
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 relative z-10 transition-transform duration-500 group-hover:scale-105">
                <div className="w-full h-full rounded-full border-[3px] border-white overflow-hidden bg-slate-200 shadow-inner">
                   <img 
                    src="/icon.png" 
                    alt="Miguel Santos Profile" 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   />
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">miguelsantos.pr</h3>
                  <svg aria-label={t('about.verified')} fill="rgb(0, 149, 246)" height="18" role="img" viewBox="0 0 40 40" width="18">
                    <title>{t('about.verified')}</title>
                    <path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fillRule="evenodd"></path>
                  </svg>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={toggleFollow}
                    className={`px-6 py-1.5 text-xs font-bold rounded-lg shadow-lg transition-all active:scale-95 ${
                      isFollowing 
                        ? 'bg-slate-100 text-slate-900 shadow-none border border-slate-200' 
                        : 'bg-jb-primary text-white shadow-jb-primary/20 hover:bg-jb-primary/90'
                    }`}
                  >
                    {isFollowing ? t('about.following') : t('about.follow')}
                  </button>
                  <a 
                    href="#contactos"
                    className="px-5 py-1.5 bg-slate-200 text-slate-900 text-xs font-bold rounded-lg transition-all active:scale-95 flex items-center justify-center hover:bg-slate-300"
                  >
                    {t('about.message')}
                  </a>
                </div>
              </div>

              <div className="flex justify-center md:justify-start gap-8 mb-6">
                <div className="text-sm">
                  <span className="font-bold text-slate-900">42</span> <span className="text-slate-500">{t('about.posts')}</span>
                </div>
                <div className="text-sm">
                  <span className="font-bold text-slate-900">{isFollowing ? '1,500' : '1,499'}</span> <span className="text-slate-500">{t('about.followers')}</span>
                </div>
                <div className="text-sm">
                  <span className="font-bold text-slate-900">∞</span> <span className="text-slate-500">{t('about.following_stats')}</span>
                </div>
              </div>

              <div className="max-w-md">
                <p className="text-sm font-bold text-slate-900 mb-1">Miguel Santos</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  📱 Mobile Engineer & UI Architect<br />
                  🏋️‍♂️ Academy Enthusiast<br />
                  ☕ Coffee is my compile juice<br />
                  📍 Based in {t('about.location')}
                </p>
                <div className="flex flex-col gap-1 mt-2">
                  <a href="https://github.com/imperador1k" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-jb-primary inline-flex items-center gap-1 hover:underline w-fit">
                    github.com/imperador1k <ExternalLink className="w-3 h-3" />
                  </a>
                  <a href="https://www.linkedin.com/in/miguel-sant0s/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#0A66C2] inline-flex items-center gap-1 hover:underline w-fit">
                    linkedin.com/in/miguel-sant0s <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Stories Highlights (Circle icons) */}
          <div className="flex gap-8 mt-12 overflow-x-auto no-scrollbar pb-4">
            {[
              { name: t('about.categories.discipline'), icon: '💪', color: 'from-orange-400 to-red-500' },
              { name: 'Setup', icon: '🖥️', color: 'from-blue-400 to-indigo-500' },
              { name: t('about.categories.travel'), icon: '✈️', color: 'from-green-400 to-emerald-500' },
              { name: 'Gaming', icon: '🎮', color: 'from-purple-400 to-pink-500' },
              { name: 'Coffee', icon: '☕', color: 'from-yellow-400 to-orange-500' }
            ].map((story) => (
              <div key={story.name} className="flex flex-col items-center gap-3 shrink-0 group">
                <div className={`w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr ${story.color} hover:scale-110 transition-transform cursor-pointer shadow-lg`}>
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl shadow-inner group-hover:rotate-12 transition-transform">
                    {story.icon}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-500 font-mono uppercase tracking-widest">{story.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hobby Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
          {hobbies.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              style={{ willChange: "transform, opacity" }}
              onClick={() => setSelectedPost(post)}
              className="relative aspect-square group cursor-pointer overflow-hidden rounded-md sm:rounded-xl"
            >
              <img 
                src={post.image} 
                alt={t(`about.posts_content.${post.key}.title`)} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ willChange: "transform" }}
              />
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-8">
                <div 
                  className="flex flex-col items-center gap-1 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  onClick={(e) => toggleLike(post.id, e)}
                >
                  <Heart className={`w-6 h-6 ${isLiked(post.id) ? 'fill-red-500 text-red-500' : 'fill-white'}`} />
                  <span className="font-bold text-sm">{getLikesDisplay(post)}</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  <MessageCircle className="w-6 h-6 fill-white" />
                  <span className="font-bold text-sm">{getCommentCount(post.id)}</span>
                </div>
                
                {/* Tech Tag Overlay */}
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded border border-white/20 text-[9px] text-white font-mono uppercase tracking-widest font-bold">
                  {post.tag}
                </div>

                {/* IG Fidelity Icons (Reels/Carousel) */}
                <div className="absolute top-4 right-4 text-white drop-shadow-md">
                   {index % 3 === 0 ? (
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>
                   ) : index % 2 === 0 ? (
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M19 15V5c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2zm-2 0H7V5h10v10zm2 4H5c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg>
                   ) : null}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Story Viewer Portal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {showStories && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[10002] bg-black flex items-center justify-center overflow-hidden"
              onClick={() => setShowStories(false)}
            >
              {/* Close Button */}
              <button 
                className="absolute top-6 right-6 text-white p-2 z-[10005] bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                onClick={() => setShowStories(false)}
              >
                <X className="w-8 h-8" />
              </button>

              {/* Physical Nav Buttons - OUTSIDE the story frame */}
              <button 
                className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 z-[10005] text-white p-4 bg-white/5 backdrop-blur-md rounded-full hover:bg-white/10 transition-all hover:scale-110 hidden md:block"
                onClick={(e) => { e.stopPropagation(); prevStory(); }}
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
              <button 
                className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 z-[10005] text-white p-4 bg-white/5 backdrop-blur-md rounded-full hover:bg-white/10 transition-all hover:scale-110 hidden md:block"
                onClick={(e) => { e.stopPropagation(); nextStory(); }}
              >
                <ChevronRight className="w-10 h-10" />
              </button>

              <div 
                className="relative h-full sm:h-[90vh] aspect-[9/16] max-h-screen sm:max-h-[800px] w-full sm:w-auto bg-slate-900 sm:rounded-[2rem] overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Progress Bars */}
                <div className="absolute top-4 left-4 right-4 z-50 flex gap-1.5">
                  {stories.map((_, idx) => (
                    <div key={idx} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                      {idx < currentStoryIndex && <div className="h-full bg-white w-full" />}
                      {idx === currentStoryIndex && (
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 5, ease: "linear" }}
                          className="h-full bg-white"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Header */}
                <div className="absolute top-10 left-4 z-50 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                    <img src="/icon.png" alt="Miguel Profile" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-xs font-bold shadow-sm">miguelsantos.pr</span>
                    <span className="text-[10px] text-white/70 shadow-sm">{t(`about.categories.${stories[currentStoryIndex].category_key}`)}</span>
                  </div>
                </div>

                {/* Story Image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStoryIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={stories[currentStoryIndex].image} 
                      alt="Story Content"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Areas (Invisible) */}
                <div className="absolute inset-0 flex z-40">
                  <div className="w-1/3 h-full cursor-pointer" onClick={prevStory} />
                  <div className="w-2/3 h-full cursor-pointer" onClick={nextStory} />
                </div>

                {/* Caption */}
                <div className="absolute bottom-12 left-6 right-6 z-50">
                  <p className="text-white text-lg font-medium leading-tight drop-shadow-lg">
                    {t(`about.stories_content.${stories[currentStoryIndex].key}`)}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Gallery Modal using Portal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-10 bg-slate-900/95 backdrop-blur-md"
              onClick={() => { setSelectedPost(null); setShowMobileComments(false); }}
            >
              <button 
                className="absolute top-6 right-6 text-white hover:rotate-90 transition-transform p-2 bg-white/10 rounded-full z-[10001]"
                onClick={() => { setSelectedPost(null); setShowMobileComments(false); }}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Nav Buttons */}
              <button 
                className="absolute left-4 sm:left-10 text-white hover:scale-110 transition-transform p-3 bg-white/5 rounded-full hidden sm:block z-[10001]"
                onClick={(e) => { e.stopPropagation(); prevPost(); }}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button 
                className="absolute right-4 sm:right-10 text-white hover:scale-110 transition-transform p-3 bg-white/5 rounded-full hidden sm:block z-[10001]"
                onClick={(e) => { e.stopPropagation(); nextPost(); }}
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="max-w-5xl w-full bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] z-[10000] relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Mobile Comments Drawer (Slide Up) */}
                <AnimatePresence>
                  {showMobileComments && (
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ type: "spring", damping: 25, stiffness: 200 }}
                      drag="y"
                      dragConstraints={{ top: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(_, info) => {
                        if (info.offset.y > 100) setShowMobileComments(false);
                      }}
                      className="absolute inset-0 z-[10005] bg-white md:hidden flex flex-col"
                    >
                      {/* Drawer Handle / Header */}
                      <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                        <div className="w-10 h-1 bg-slate-200 rounded-full absolute left-1/2 -translate-x-1/2 top-2" />
                        <button 
                          onClick={() => setShowMobileComments(false)}
                          className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                        >
                          <X className="w-5 h-5 text-slate-500" />
                        </button>
                        <span className="text-sm font-bold text-slate-900 absolute left-1/2 -translate-x-1/2 pt-1">{t('about.comments_drawer')}</span>
                        <div className="w-7 h-7" />
                      </div>

                      {/* Comments Content */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
                        {/* Original Post Desc */}
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden shrink-0">
                            <img src="/icon.png" alt="Miguel Profile" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                          </div>
                          <div className="text-sm">
                            <span className="font-bold mr-2">miguelsantos.pr</span>
                            <span className="text-slate-600 leading-relaxed">{t(`about.posts_content.${selectedPost.key}.desc`)}</span>
                          </div>
                        </div>

                        {/* User Comments */}
                        {(comments[selectedPost.id] || []).map((c) => (
                          <div key={c.id} className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 uppercase font-bold text-[10px] text-slate-400 border border-slate-200">
                              {c.user.substring(0, 2)}
                            </div>
                            <div className="text-sm">
                              <span className="font-bold mr-2">{c.user}</span>
                              <span className="text-slate-600">{c.text}</span>
                              <div className="text-[10px] text-slate-400 mt-1 uppercase font-mono">{c.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Input */}
                      <div className="p-4 border-t border-slate-100 bg-white pb-8">
                        <div className="flex gap-3 items-center">
                          <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0 flex items-center justify-center text-[10px] font-bold text-slate-500 uppercase">ME</div>
                          <input 
                            autoFocus
                            type="text" 
                            placeholder={t('about.add_comment')}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addComment(selectedPost.id)}
                            className="flex-1 text-sm outline-none placeholder:text-slate-400"
                          />
                          <button 
                            onClick={() => addComment(selectedPost.id)}
                            disabled={!newComment.trim()}
                            className="text-jb-primary font-bold text-sm disabled:opacity-30"
                          >
                            {t('about.post_btn')}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Image Side */}
                <div 
                  className="flex-1 bg-slate-100 relative group overflow-hidden cursor-pointer h-[400px] md:h-auto"
                  onDoubleClick={() => toggleLike(selectedPost.id)}
                >
                  <img 
                    src={selectedPost.image} 
                    alt={t(`about.posts_content.${selectedPost.key}.title`)} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  {/* Heart Animation on Double Click */}
                  <AnimatePresence>
                    {isLiked(selectedPost.id) && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      >
                         <Heart className="w-24 h-24 fill-white text-white drop-shadow-2xl" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Info Side */}
                <div className="w-full md:w-[350px] lg:w-[400px] bg-white flex flex-col h-[500px] md:h-auto overflow-hidden">
                  {/* Modal Header */}
                  <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
                      <div className="w-full h-full rounded-full bg-white border border-white overflow-hidden">
                        <img src="/icon.png" alt="Miguel Profile" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900">miguelsantos.pr</span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">{t(`about.categories.${selectedPost.category_key}`)}</span>
                    </div>
                  </div>

                  {/* Scrollable Comments Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
                    {/* Post Description as First Comment */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden shrink-0">
                        <img src="/icon.png" alt="Miguel Profile" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-sm">
                        <span className="font-bold mr-2">miguelsantos.pr</span>
                        <span className="text-slate-600 leading-relaxed">{t(`about.posts_content.${selectedPost.key}.desc`)}</span>
                        <div className="text-[10px] text-slate-400 mt-1 font-mono uppercase">2D</div>
                      </div>
                    </div>

                    {/* User Comments */}
                    {(comments[selectedPost.id] || []).map((c) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={c.id} 
                        className="flex gap-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 uppercase font-bold text-[10px] text-slate-400 border border-slate-200">
                          {c.user.substring(0, 2)}
                        </div>
                        <div className="text-sm">
                          <span className="font-bold mr-2">{c.user}</span>
                          <span className="text-slate-600">{c.text}</span>
                          <div className="text-[10px] text-slate-400 mt-1 font-mono uppercase">{c.time}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Interactions Area */}
                  <div className="p-4 border-t border-slate-100 space-y-2 bg-slate-50/50">
                    <div className="flex gap-4">
                      <button onClick={() => toggleLike(selectedPost.id)}>
                        <Heart className={`w-6 h-6 transition-colors ${isLiked(selectedPost.id) ? 'fill-red-500 text-red-500' : 'text-slate-700 hover:text-slate-400'}`} />
                      </button>
                      <button onClick={() => {
                        if (window.innerWidth < 768) {
                          setShowMobileComments(true);
                        } else {
                          commentInputRef.current?.focus();
                        }
                      }}>
                        <MessageCircle className="w-6 h-6 text-slate-700 hover:text-slate-400 transition-colors" />
                      </button>
                    </div>
                    <div className="text-sm font-black text-slate-900">
                      {getLikesDisplay(selectedPost)} {t('about.likes')}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono uppercase">MAY 6, 2026</div>
                  </div>

                  {/* Comment Input */}
                  <div className="p-4 border-t border-slate-100 flex flex-col gap-2">
                    {commentError && (
                      <motion.span 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] text-red-500 font-bold"
                      >
                        {t('about.too_fast')}
                      </motion.span>
                    )}
                    <div className="flex gap-3 items-center">
                      <input 
                        ref={commentInputRef}
                        type="text" 
                        placeholder={commentError ? t('about.wait') : t('about.add_comment')}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addComment(selectedPost.id)}
                        disabled={commentError}
                        className="flex-1 text-sm outline-none placeholder:text-slate-400 disabled:bg-transparent"
                      />
                      <button 
                        onClick={() => addComment(selectedPost.id)}
                        disabled={!newComment.trim() || commentError}
                        className="text-jb-primary font-bold text-sm disabled:opacity-30 transition-opacity"
                      >
                        {t('about.post_btn')}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
