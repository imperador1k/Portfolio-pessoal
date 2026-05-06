import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';

const hobbies = [
  {
    id: 1,
    title: "Shape & Discipline",
    category: "Academy",
    description: "Consistent training is the foundation of mental clarity and high performance in engineering.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    likes: "1.2k",
    comments: "42",
    tag: "consistent"
  },
  {
    id: 2,
    title: "Focus State",
    category: "Setup",
    description: "A clean, ergonomic workspace is where complex architectures come to life.",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800&auto=format&fit=crop",
    likes: "856",
    comments: "12",
    tag: "minimalist"
  },
  {
    id: 3,
    title: "Vibes & Nature",
    category: "Travel",
    description: "Disconnecting from the grid to recharge the creative batteries in the wild.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    likes: "2.4k",
    comments: "89",
    tag: "adventure"
  },
  {
    id: 4,
    title: "The Perfect Roast",
    category: "Coffee",
    description: "Life begins after the first espresso. The ultimate fuel for debugging session.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
    likes: "3.1k",
    comments: "156",
    tag: "fuel"
  },
  {
    id: 5,
    title: "Capture the Moment",
    category: "Photography",
    description: "Attention to detail isn't just for code; it's about seeing the world through a different lens.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
    likes: "942",
    comments: "28",
    tag: "visuals"
  },
  {
    id: 6,
    title: "Midnight Compile",
    category: "Coding",
    description: "The quiet hours are for the most ambitious builds. Pure flow state engineering.",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop",
    likes: "5k+",
    comments: "999",
    tag: "passion"
  }
];

export default function AboutMe() {
  const [selectedPost, setSelectedPost] = useState<typeof hobbies[0] | null>(null);

  const nextPost = () => {
    if (!selectedPost) return;
    const currentIndex = hobbies.findIndex(h => h.id === selectedPost.id);
    setSelectedPost(hobbies[(currentIndex + 1) % hobbies.length]);
  };

  const prevPost = () => {
    if (!selectedPost) return;
    const currentIndex = hobbies.findIndex(h => h.id === selectedPost.id);
    setSelectedPost(hobbies[(currentIndex - 1 + hobbies.length) % hobbies.length]);
  };

  return (
    <section className="px-5 sm:px-6 py-32 lg:px-10 max-w-7xl mx-auto w-full relative z-10" id="sobre">
      <div className="flex flex-col mb-16 items-center text-center">
        <span className="text-jb-primary font-mono text-sm font-bold tracking-tighter mb-4">
          01 // LIFESTYLE
        </span>
        <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter uppercase mb-6">
          Beyond the <br />
          <span className="text-slate-300">Terminal</span>
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
            {/* Profile Pic with Glow */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full animate-spin-slow blur-md opacity-20"></div>
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-slate-200">
                   <img 
                    src="/insta.png" 
                    alt="Miguel" 
                    className="w-full h-full object-cover"
                   />
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">miguelsantos.pr</h3>
                <div className="flex gap-2">
                  <button className="px-5 py-1.5 bg-jb-primary text-white text-xs font-bold rounded-lg shadow-lg shadow-jb-primary/20 transition-transform active:scale-95">
                    Follow
                  </button>
                  <button className="px-5 py-1.5 bg-slate-200 text-slate-900 text-xs font-bold rounded-lg transition-transform active:scale-95">
                    Message
                  </button>
                </div>
              </div>

              <div className="flex justify-center md:justify-start gap-8 mb-6">
                <div className="text-sm">
                  <span className="font-bold text-slate-900">42</span> <span className="text-slate-500">projects</span>
                </div>
                <div className="text-sm">
                  <span className="font-bold text-slate-900">1.5k</span> <span className="text-slate-500">commits</span>
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
                <a href="#" className="text-sm font-bold text-jb-primary mt-2 inline-flex items-center gap-1 hover:underline">
                  github.com/miguel-santos <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Stories Highlights */}
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
                <div className="flex items-center gap-2 text-white font-bold">
                  <Heart className="w-5 h-5 fill-white" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-2 text-white font-bold">
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>{post.comments}</span>
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
                <div className="flex-1 bg-slate-100 relative group overflow-hidden">
                  <img 
                    src={selectedPost.image} 
                    alt={selectedPost.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info Side */}
                <div className="w-full md:w-[350px] lg:w-[400px] p-8 flex flex-col">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-0.5">
                      <div className="w-full h-full rounded-full bg-white border-2 border-white overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">miguel.dev_</span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">{selectedPost.category}</span>
                    </div>
                  </div>

                  <div className="flex-1 border-t border-slate-100 pt-6">
                    <h4 className="text-xl font-black text-slate-900 mb-4 tracking-tight">{selectedPost.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed mb-8">
                      {selectedPost.description}
                    </p>

                    <div className="flex gap-4">
                      <div className="flex items-center gap-1.5 text-slate-900">
                          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                          <span className="text-xs font-bold">{selectedPost.likes}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-900">
                          <MessageCircle className="w-5 h-5 text-slate-400" />
                          <span className="text-xs font-bold">{selectedPost.comments}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                    <div className="text-[10px] font-mono font-bold text-jb-primary uppercase tracking-widest bg-jb-primary/5 px-3 py-1 rounded">
                      # {selectedPost.tag}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">2 DAYS AGO</span>
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
