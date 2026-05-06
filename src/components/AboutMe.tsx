import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, ExternalLink, X, ChevronLeft, ChevronRight, Terminal, User } from 'lucide-react';

const stories = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
    caption: "Early morning discipline. 🏋️‍♂️",
    category: "Ginasio"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
    caption: "Flow state engaged. Building something special. 💻",
    category: "Coding"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop",
    caption: "Essential fuel for the grind. ☕",
    category: "Coffee"
  }
];

const hobbies = [
  {
    id: 1,
    title: "Shape & Discipline",
    category: "Academy",
    description: "Consistent training is the foundation of mental clarity and high performance in engineering.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    baseLikes: 1200,
    comments: "42",
    tag: "consistent"
  },
  {
    id: 2,
    title: "Focus State",
    category: "Setup",
    description: "A clean, ergonomic workspace is where complex architectures come to life.",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800&auto=format&fit=crop",
    baseLikes: 856,
    comments: "12",
    tag: "minimalist"
  },
  {
    id: 3,
    title: "Vibes & Nature",
    category: "Travel",
    description: "Disconnecting from the grid to recharge the creative batteries in the wild.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    baseLikes: 2400,
    comments: "89",
    tag: "adventure"
  },
  {
    id: 4,
    title: "The Perfect Roast",
    category: "Coffee",
    description: "Life begins after the first espresso. The ultimate fuel for debugging session.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
    baseLikes: 3100,
    comments: "156",
    tag: "fuel"
  },
  {
    id: 5,
    title: "Capture the Moment",
    category: "Photography",
    description: "Attention to detail isn't just for code; it's about seeing the world through a different lens.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
    baseLikes: 942,
    comments: "28",
    tag: "visuals"
  },
  {
    id: 6,
    title: "Midnight Compile",
    category: "Coding",
    description: "The quiet hours are for the most ambitious builds. Pure flow state engineering.",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop",
    baseLikes: 5200,
    comments: "999",
    tag: "passion"
  }
];

export default function AboutMe() {
  const [selectedPost, setSelectedPost] = useState<typeof hobbies[0] | null>(null);
  const [showStories, setShowStories] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [comments, setComments] = useState<Record<number, any[]>>({});
  const [newComment, setNewComment] = useState("");
  const storyProgressRef = useRef<NodeJS.Timeout | null>(null);

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
      time: 'Just now'
    };

    setComments(prev => ({
      ...prev,
      [postId]: [comment, ...(prev[postId] || [])]
    }));
    
    setLastCommentTime([...recentComments, now]);
    setNewComment("");
  };

  const isLiked = (postId: number) => likedPosts.includes(postId);
  
  const getLikesDisplay = (post: typeof hobbies[0]) => {
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
    <section className="px-5 sm:px-6 py-32 lg:px-10 max-w-7xl mx-auto w-full relative z-10" id="sobre">
      <div className="flex flex-col mb-16 items-center text-center">
        <span className="text-jb-primary font-mono text-sm font-bold tracking-tighter mb-4">
          01 // LIFESTYLE
        </span>
        <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter uppercase mb-6">
          Life.kt <span className="text-jb-primary not-italic">/</span> <br />
          <span className="text-slate-500 font-mono italic normal-case font-medium text-3xl sm:text-4xl">Lifestyle & Creative Gear</span>
        </h2>
        <p className="max-w-2xl text-slate-500 font-medium leading-relaxed">
          Quando não estou a otimizar loops ou a desenhar interfaces, estou a construir a minha melhor versão fora do código. 
          Clica nos posts para veres mais detalhes.
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)] overflow-hidden">
        {/* Instagram-style Header */}
        <div className="p-8 lg:p-12 border-b border-slate-100 bg-slate-50/30">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Profile Pic with Story Ring */}
            <div 
              className="relative group cursor-pointer"
              onClick={() => setShowStories(true)}
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 transition-transform duration-500 group-hover:scale-105">
                <div className="w-full h-full rounded-full border-[3px] border-white overflow-hidden bg-slate-200">
                   <img 
                    src="/insta.png" 
                    alt="Miguel" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   />
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">miguelsantos.pr</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={toggleFollow}
                    className={`px-6 py-1.5 text-xs font-bold rounded-lg shadow-lg transition-all active:scale-95 ${
                      isFollowing 
                        ? 'bg-slate-100 text-slate-900 shadow-none border border-slate-200' 
                        : 'bg-jb-primary text-white shadow-jb-primary/20 hover:bg-jb-primary/90'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                  <a 
                    href="#contactos"
                    className="px-5 py-1.5 bg-slate-200 text-slate-900 text-xs font-bold rounded-lg transition-all active:scale-95 flex items-center justify-center hover:bg-slate-300"
                  >
                    Message
                  </a>
                </div>
              </div>

              <div className="flex justify-center md:justify-start gap-8 mb-6">
                <div className="text-sm">
                  <span className="font-bold text-slate-900">42</span> <span className="text-slate-500">projects</span>
                </div>
                <div className="text-sm">
                  <span className="font-bold text-slate-900">{isFollowing ? '1,500' : '1,499'}</span> <span className="text-slate-500">followers</span>
                </div>
                <div className="text-sm">
                  <span className="font-bold text-slate-900">∞</span> <span className="text-slate-500">coffee</span>
                </div>
              </div>

              <div className="max-w-md">
                <p className="text-sm font-bold text-slate-900 mb-1">Miguel Santos</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  📱 Mobile Engineer & UI Architect<br />
                  🏋️‍♂️ Academy Enthusiast<br />
                  ☕ Coffee is my compile juice<br />
                  📍 Based in Portugal
                </p>
                <a href="https://github.com/imperador1k" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-jb-primary mt-2 inline-flex items-center gap-1 hover:underline">
                  github.com/imperador1k <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Stories Highlights (Circle icons) */}
          <div className="flex gap-6 mt-12 overflow-x-auto no-scrollbar pb-2">
            {[
              { name: 'Gym', icon: '💪' },
              { name: 'Setup', icon: '🖥️' },
              { name: 'Travel', icon: '✈️' },
              { name: 'Gaming', icon: '🎮' },
              { name: 'Coffee', icon: '☕' }
            ].map((story) => (
              <div key={story.name} className="flex flex-col items-center gap-2 shrink-0">
                <div className="w-16 h-16 rounded-full p-0.5 border-2 border-slate-200 bg-white flex items-center justify-center text-2xl hover:border-jb-primary transition-colors cursor-pointer">
                  {story.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-500 font-mono uppercase tracking-tighter">{story.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hobby Grid */}
        <div className="p-2 sm:p-4 grid grid-cols-3 gap-1 sm:gap-4 lg:gap-6">
          {hobbies.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedPost(post)}
              className="relative aspect-square group cursor-pointer overflow-hidden rounded-md sm:rounded-xl"
            >
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                <div 
                  className="flex items-center gap-2 text-white font-bold"
                  onClick={(e) => toggleLike(post.id, e)}
                >
                  <Heart className={`w-5 h-5 ${isLiked(post.id) ? 'fill-red-500 text-red-500' : 'fill-white'}`} />
                  <span>{getLikesDisplay(post)}</span>
                </div>
                <div className="flex items-center gap-2 text-white font-bold">
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>{getCommentCount(post.id)}</span>
                </div>
                
                {/* Tech Tag Overlay */}
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-2 py-1 rounded border border-white/30 text-[10px] text-white font-mono uppercase tracking-tighter">
                  {post.tag}
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
                    <img src="/insta.png" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-xs font-bold shadow-sm">miguelsantos.pr</span>
                    <span className="text-[10px] text-white/70 shadow-sm">{stories[currentStoryIndex].category}</span>
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
                    {stories[currentStoryIndex].caption}
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
              onClick={() => setSelectedPost(null)}
            >
              <button 
                className="absolute top-6 right-6 text-white hover:rotate-90 transition-transform p-2 bg-white/10 rounded-full z-[10001]"
                onClick={() => setSelectedPost(null)}
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
                className="max-w-5xl w-full bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] z-[10000]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image Side */}
                <div 
                  className="flex-1 bg-slate-100 relative group overflow-hidden cursor-pointer h-[400px] md:h-auto"
                  onDoubleClick={() => toggleLike(selectedPost.id)}
                >
                  <img 
                    src={selectedPost.image} 
                    alt={selectedPost.title} 
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
                        <img src="/insta.png" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900">miguelsantos.pr</span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">{selectedPost.category}</span>
                    </div>
                  </div>

                  {/* Scrollable Comments Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
                    {/* Post Description as First Comment */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden shrink-0">
                        <img src="/insta.png" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-sm">
                        <span className="font-bold mr-2">miguelsantos.pr</span>
                        <span className="text-slate-600 leading-relaxed">{selectedPost.description}</span>
                        <div className="text-[10px] text-slate-400 mt-1 font-mono uppercase">2D</div>
                      </div>
                    </div>

                    {/* Fictional & User Comments */}
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
                      <MessageCircle className="w-6 h-6 text-slate-700" />
                    </div>
                    <div className="text-sm font-black text-slate-900">
                      {getLikesDisplay(selectedPost)} likes
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
                        Slow down! You're commenting too fast.
                      </motion.span>
                    )}
                    <div className="flex gap-3 items-center">
                      <input 
                        type="text" 
                        placeholder={commentError ? "Please wait..." : "Add a comment..."}
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
                        Post
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
