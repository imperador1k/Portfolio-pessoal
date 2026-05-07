import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'motion/react';
import React, { useRef, useState } from 'react';
import { 
  Activity, 
  ThumbsUp, 
  MessageCircle, 
  Zap, 
  Heart, 
  Trophy, 
  Timer, 
  Send,
  MoreHorizontal,
  Map as MapIcon,
  Award,
  ArrowRight,
  BarChart3
} from 'lucide-react';

const marathonData = [
  {
    id: 1,
    type: 'Architecture Marathon',
    title: 'Engenharia Informática',
    org: 'Licenciatura (A Paixão)',
    date: '2020 - 2023',
    description: 'A grande maratona de fundação. 3 anos de alta intensidade focados em algoritmos, estruturas de dados e arquitetura de sistemas. Onde o "fôlego" técnico foi construído.',
    image: '/journey.jpg',
    stats: { time: '3y', effort: '9.8', elevation: '1200m' },
    achievement: 'Cum Laude Spirit',
    tags: ['Algorithms', 'C/C++', 'Architecture'],
    comments: [
      { user: "Prof. Alberto", text: "Excelente capacidade analítica demonstrada nos projetos finais." },
      { user: "João Silva", text: "Aquela entrega de Compiladores foi épica! 🍻" }
    ]
  },
  {
    id: 2,
    type: 'Web Sprint',
    title: 'Primeiros Passos: O Core',
    org: 'Web Fundamentals',
    date: 'Jan 2021',
    description: 'Um sprint explosivo no mundo do desenvolvimento web. Domínio rápido de HTML, CSS e JS para construir as primeiras interfaces responsivas.',
    image: '/water.png',
    stats: { time: '6m', effort: '7.2', elevation: '200m' },
    achievement: 'First Deploy',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    comments: [
      { user: "Client A", text: "O site ainda hoje é o mais rápido da nossa rede." }
    ]
  },
  {
    id: 3,
    type: 'Full-Stack Ride',
    title: 'Evolução Tecnológica',
    org: 'React & Node Ecosystem',
    date: '2022',
    description: 'Uma subida constante em direção às tecnologias mais modernas do mercado. Implementação de ecossistemas completos e escaláveis.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=70&w=800&auto=format&fit=crop',
    stats: { time: '1.2y', effort: '8.5', elevation: '500m' },
    achievement: 'Cloud Ready',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    comments: [
      { user: "Senior Dev", text: "A estruturação dos hooks está ao nível de um Pro." }
    ]
  },
  {
    id: 4,
    type: 'Business Hike',
    title: 'Digital Solutions',
    org: 'B2B Freelance',
    date: '2023',
    description: 'Trabalho de campo intenso. Desenvolvendo soluções reais para negócios reais, focando em conversão e experiência de utilizador.',
    image: '/motorcycle.jpg',
    stats: { time: '1y', effort: '8.0', elevation: '300m' },
    achievement: 'Customer King',
    tags: ['Business', 'UX/UI', 'Freelance'],
    comments: [
      { user: "Lojinha Local", text: "As nossas vendas online duplicaram em 2 meses!" }
    ]
  },
  {
    id: 5,
    type: 'Android Ultra',
    title: 'Engenharia Mobile & Premium Solutions',
    org: 'Miguel Santos Dev',
    date: 'Presente',
    description: 'O cume atual. Especialização em Android Nativo com Kotlin e criação de experiências web de luxo. Alta performance em cada linha de código.',
    image: '/natural.jpg',
    stats: { time: 'Active', effort: 'Max', elevation: '800m' },
    achievement: 'King of the Mountain',
    tags: ['Kotlin', 'Compose', 'Premium Web'],
    comments: [
      { user: "Tech Lead", text: "Melhor implementação de Coroutines que já vi neste repo. ✅" },
      { user: "Runner", text: "Alta performance no código e nas sapatilhas! 💪" }
    ]
  }
];

export default function CareerMarathon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  return (
    <section className="relative py-32 lg:py-64 overflow-hidden" id="timeline">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FC4C02]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10" ref={containerRef}>
        {/* Header Section */}
        <div className="max-w-4xl mx-auto mb-24 lg:mb-40">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6 bg-white w-fit px-4 py-2 rounded-2xl shadow-sm border border-slate-100"
          >
            <Activity className="w-5 h-5 text-[#FC4C02]" />
            <span className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Live Training Session</span>
          </motion.div>
          <h2 className="text-5xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8">
            Career <br />
            <span className="text-[#FC4C02]">Marathon</span>
          </h2>
          <p className="text-slate-500 text-lg lg:text-2xl font-medium max-w-2xl leading-relaxed">
            A high-performance journey through code, architecture, and system engineering. Analyzing every split, every milestone.
          </p>
        </div>

        {/* Performance Dashboard */}
        <motion.div 
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-white border border-slate-100 rounded-4xl p-8 lg:p-12 mb-32 shadow-[0_50px_100px_rgba(0,0,0,0.04)] relative overflow-hidden group max-w-5xl mx-auto"
        >
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <BarChart3 className="w-48 h-48 text-[#FC4C02]" />
           </div>

           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 relative z-10">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#FC4C02] to-[#ff7e47] flex items-center justify-center shadow-2xl shadow-[#FC4C02]/30">
                    <Zap className="w-8 h-8 text-white" />
                 </div>
                 <div>
                    <h3 className="text-slate-900 font-black text-3xl tracking-tight">Fitness & Freshness</h3>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Professional Progression</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-16">
                 {[
                    { label: 'Distance', val: '4.2', unit: 'Yrs' },
                    { label: 'Elev. Gain', val: '1.2k', unit: 'Mls' },
                    { label: 'Activities', val: '28', unit: 'Prj' },
                    { label: 'Score', val: '98', unit: 'Pts' }
                 ].map(s => (
                    <div key={s.label} className="flex flex-col">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</span>
                       <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black text-slate-900">{s.val}</span>
                          <span className="text-xs font-bold text-[#FC4C02]">{s.unit}</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Stylized SVG Graph */}
           <div className="h-64 w-full mt-16 relative bg-slate-50/50 rounded-4xl border border-slate-100 p-8">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 100" preserveAspectRatio="none">
                 <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="0%" stopColor="#FC4C02" stopOpacity="0.15" />
                       <stop offset="100%" stopColor="#FC4C02" stopOpacity="0" />
                    </linearGradient>
                 </defs>
                 <motion.path
                    d="M0,90 C100,85 200,95 300,70 S450,40 600,60 S800,20 1000,5"
                    fill="url(#grad)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                 />
                 <motion.path
                    d="M0,90 C100,85 200,95 300,70 S450,40 600,60 S800,20 1000,5"
                    fill="none"
                    stroke="#FC4C02"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                 />
                 {[0, 300, 600, 1000].map((x, i) => (
                    <motion.circle 
                       key={i} cx={x} cy={[90, 70, 60, 5][i]} r="6" fill="white" stroke="#FC4C02" strokeWidth="3"
                       initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1 + i*0.2 }}
                    />
                 ))}
              </svg>
           </div>
        </motion.div>

        <div className="relative">
          {/* Main Timeline Line - Centered on Desktop, Left on Mobile */}
          <div className="absolute left-[20px] lg:left-1/2 top-0 bottom-0 w-px lg:w-[2px] bg-slate-100 lg:-translate-x-1/2 z-0">
            <motion.div 
              style={{ scaleY }}
              className="absolute top-0 left-0 w-full bg-[#FC4C02] origin-top shadow-[0_0_20px_rgba(252,76,2,0.4)]"
            />
          </div>

          <div className="space-y-40">
            {marathonData.map((activity, index) => (
              <ActivityCard key={activity.id} activity={activity} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ActivityCard({ activity, index }: { activity: typeof marathonData[0], index: number, key?: React.Key }) {
  const isEven = index % 2 === 0;
  const [kudos, setKudos] = useState(Math.floor(Math.random() * 40) + 15);
  const [hasKudosed, setHasKudosed] = useState(false);
  const [showComments, setShowComments] = useState(false);
  
  // Local Comments State with LocalStorage persistence
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem(`comments-${activity.id}`);
    return saved ? JSON.parse(saved) : activity.comments;
  });
  const [newComment, setNewComment] = useState("");
  
  // Rate Limiting State
  const [isCooldown, setIsCooldown] = useState(false);
  const [error, setError] = useState("");

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // Rate Limit Check (5 seconds)
    if (isCooldown) {
      setError("Slow down! Please wait a few seconds.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    
    const updatedComments = [...comments, { user: "Tu (Visitante)", text: newComment }];
    setComments(updatedComments);
    localStorage.setItem(`comments-${activity.id}`, JSON.stringify(updatedComments));
    setNewComment("");
    
    // Activate Rate Limit
    setIsCooldown(true);
    setTimeout(() => setIsCooldown(false), 5000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-col lg:flex-row items-stretch lg:items-center gap-12 lg:gap-24 relative ${isEven ? '' : 'lg:flex-row-reverse'}`}
    >
      {/* Integrated Timeline Node */}
      <div className="absolute left-0 lg:left-1/2 -translate-x-1/2 top-10 lg:top-1/2 -translate-y-1/2 z-30">
         <motion.div 
            animate={{ scale: [1, 1.15, 1], boxShadow: ['0 0 0px rgba(252,76,2,0)', '0 0 20px rgba(252,76,2,0.4)', '0 0 0px rgba(252,76,2,0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-10 h-10 lg:w-16 lg:h-16 rounded-full bg-white border-[3px] lg:border-4 border-[#FC4C02] shadow-xl flex items-center justify-center"
         >
            <Activity className="w-5 h-5 lg:w-8 lg:h-8 text-[#FC4C02]" />
         </motion.div>
      </div>

      {/* The Activity Card */}
      <div className="w-full lg:w-[46%] bg-white border border-slate-100 rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.04)] hover:shadow-[0_60px_120px_rgba(0,0,0,0.1)] transition-all duration-700 group relative z-10">
         
         <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-[#FC4C02] to-transparent opacity-20 lg:hidden" />

         {/* Activity Header */}
         <div className="px-6 lg:px-12 py-6 lg:py-10 border-b border-slate-50">
            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-4 lg:gap-5">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-slate-900 overflow-hidden shadow-2xl border border-slate-800 shrink-0 ring-4 ring-slate-50">
                     <img src="/icon.png" alt="MS" className="w-full h-full object-cover" />
                  </div>
                  <div>
                     <h4 className="text-slate-900 font-black text-lg lg:text-2xl leading-none mb-1.5 tracking-tight">Miguel Santos</h4>
                     <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest">{activity.org}</span>
                        <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-200" />
                        <span className="text-[10px] lg:text-xs font-black text-[#FC4C02] uppercase tracking-widest">{activity.date}</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
               <span className="px-4 py-1 bg-slate-900 text-white text-[10px] lg:text-xs font-black rounded-full uppercase tracking-widest shadow-lg shadow-slate-200">
                  {activity.type}
               </span>
               {activity.achievement && (
                  <div className="flex items-center gap-2 bg-amber-50 px-4 py-1 rounded-full border border-amber-100 shadow-sm">
                     <Trophy className="w-3.5 h-3.5 text-amber-500" />
                     <span className="text-[10px] lg:text-xs font-black text-amber-600 uppercase tracking-tight">{activity.achievement}</span>
                  </div>
               )}
            </div>
         </div>

         {/* Main Content */}
         <div className="p-6 lg:p-12">
            <h3 className="text-3xl lg:text-5xl font-black text-slate-900 mb-8 lg:mb-12 leading-[0.95] tracking-tighter group-hover:text-[#FC4C02] transition-colors">
               {activity.title}
            </h3>

            <div className="grid grid-cols-3 gap-6 lg:gap-12 mb-10 lg:mb-16">
               {[
                  { label: 'Total Time', val: activity.stats.time, icon: <Timer className="w-4 h-4 lg:w-5 lg:h-5" />, color: 'text-blue-500' },
                  { label: 'Effort Score', val: activity.stats.effort, icon: <Zap className="w-4 h-4 lg:w-5 lg:h-5" />, color: 'text-amber-500' },
                  { label: 'Growth Gain', val: activity.stats.elevation, icon: <Activity className="w-4 h-4 lg:w-5 lg:h-5" />, color: 'text-[#FC4C02]' }
               ].map(m => (
                  <div key={m.label} className="flex flex-col group/metric">
                     <div className="flex items-center gap-2 mb-2 lg:mb-3 opacity-50 group-hover/metric:opacity-100 transition-opacity">
                        <span className={m.color}>{m.icon}</span>
                        <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em]">{m.label}</span>
                     </div>
                     <span className="text-2xl lg:text-4xl font-black text-slate-900 tracking-tighter">{m.val}</span>
                  </div>
               ))}
            </div>

            <div className="relative aspect-video rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden mb-10 lg:mb-16 group/media shadow-2xl border border-slate-100 bg-slate-50">
               <img src={activity.image} alt="" className="w-full h-full object-cover group-hover/media:scale-110 transition-transform duration-[4s] ease-out" />
               <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
               
               <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 bg-white/95 backdrop-blur px-5 py-2.5 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-2xl scale-90 lg:scale-100">
                  <div className="w-2 h-2 rounded-full bg-[#FC4C02] animate-pulse" />
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Live Session</span>
               </div>
            </div>

            <p className="text-slate-500 text-sm lg:text-lg leading-relaxed mb-10 lg:mb-16 font-medium italic">
               "{activity.description}"
            </p>

            <div className="mb-10 lg:mb-16 bg-slate-50/80 backdrop-blur rounded-3xl lg:rounded-[2rem] p-6 lg:p-10 border border-slate-100 shadow-inner">
               <h5 className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3 mb-8">
                  <BarChart3 className="w-4 h-4 text-[#FC4C02]" />
                  Technical Splits
               </h5>
               <div className="space-y-4 lg:space-y-6">
                  {[
                     { label: '01 Architectural Setup', split: '0:45', effort: 'Warm up', zone: 'Z2' },
                     { label: '02 Implementation Flow', split: '1:20', effort: 'Hard', zone: 'Z4' },
                     { label: '03 Optimization & Refactor', split: '0:35', effort: 'Peak', zone: 'Z5' }
                  ].map((s, i) => (
                     <div key={i} className="flex items-center justify-between group/split">
                        <div className="flex flex-col">
                           <span className="text-[11px] lg:text-sm font-black text-slate-900 group-hover:text-[#FC4C02] transition-colors">{s.label}</span>
                           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{s.effort}</span>
                        </div>
                        <div className="flex items-center gap-6 lg:gap-10">
                           <span className="text-sm lg:text-lg font-mono font-black text-slate-900">{s.split}</span>
                           <div className={`w-8 lg:w-10 h-8 lg:h-10 rounded-xl flex items-center justify-center text-[10px] font-black shadow-sm ${
                              s.zone === 'Z5' ? 'bg-red-500 text-white shadow-red-200' : 'bg-slate-200 text-slate-600'
                           }`}>
                              {s.zone}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="flex flex-wrap gap-2 lg:gap-3">
               {activity.tags.map(tag => (
                  <span key={tag} className="px-5 py-2 bg-white text-slate-400 text-[10px] lg:text-xs font-black rounded-xl border border-slate-100 hover:border-[#FC4C02]/30 hover:text-[#FC4C02] transition-all">
                     #{tag.toUpperCase()}
                  </span>
               ))}
            </div>
         </div>

         {/* Social Footer */}
         <div className="px-6 lg:px-12 py-6 lg:py-10 bg-slate-50/50 border-t border-slate-100 flex flex-col items-stretch gap-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
               <div className="flex items-center gap-8 lg:gap-12 w-full sm:w-auto">
                  <button 
                     onClick={() => { if(!hasKudosed) { setKudos(prev => prev + 1); setHasKudosed(true); } }}
                     className={`flex items-center gap-3 transition-all ${hasKudosed ? 'text-[#FC4C02] scale-110' : 'text-slate-400 hover:text-slate-900'}`}
                  >
                     <Heart className={`w-7 h-7 lg:w-9 lg:h-9 ${hasKudosed ? 'fill-current' : ''}`} />
                     <span className="text-lg lg:text-2xl font-black italic">{kudos}</span>
                  </button>
                  <button 
                     onClick={() => setShowComments(!showComments)}
                     className={`flex items-center gap-3 transition-colors ${showComments ? 'text-[#FC4C02]' : 'text-slate-400 hover:text-slate-900'}`}
                  >
                     <MessageCircle className="w-7 h-7 lg:w-9 lg:h-9" />
                     <span className="text-lg lg:text-2xl font-black italic">{comments.length}</span>
                  </button>
               </div>
               <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                  <div className="flex -space-x-3 lg:-space-x-4">
                     {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 lg:w-12 lg:h-12 rounded-full border-2 lg:border-4 border-white bg-slate-200 overflow-hidden shadow-xl">
                           <img src={`https://i.pravatar.cc/100?u=${activity.id + i + 70}`} alt="" className="w-full h-full object-cover grayscale" />
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Interactive Comment Section */}
            <AnimatePresence>
               {showComments && (
                  <motion.div 
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     className="overflow-hidden"
                  >
                     <div className="pt-8 border-t border-slate-200/60 space-y-6">
                        {/* Comments List */}
                        <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                           {comments.map((comment: any, i: number) => (
                              <motion.div 
                                 initial={{ x: -10, opacity: 0 }}
                                 animate={{ x: 0, opacity: 1 }}
                                 key={i} 
                                 className="flex gap-4"
                              >
                                 <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                    <img src={`https://i.pravatar.cc/100?u=${i + 100}`} alt="" className="w-full h-full rounded-full object-cover" />
                                 </div>
                                 <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm grow">
                                    <p className="text-[11px] font-black text-slate-900 mb-0.5">{comment.user}</p>
                                    <p className="text-sm text-slate-500 font-medium">{comment.text}</p>
                                 </div>
                              </motion.div>
                           ))}
                        </div>

                        {/* Comment Input */}
                        <form onSubmit={handleAddComment} className="relative mt-6 group">
                           <input 
                              type="text" 
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              disabled={isCooldown}
                              placeholder={isCooldown ? "Rate limit active..." : "Write a comment..."}
                              className={`w-full bg-white border ${error ? 'border-red-500 ring-4 ring-red-500/5' : 'border-slate-200'} rounded-2xl py-4 pl-6 pr-14 text-sm font-medium focus:outline-none focus:border-[#FC4C02] focus:ring-4 focus:ring-[#FC4C02]/5 transition-all disabled:opacity-50 disabled:bg-slate-50`}
                           />
                           <button 
                              type="submit"
                              disabled={isCooldown}
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-[#FC4C02] transition-colors shadow-lg disabled:bg-slate-300"
                           >
                              <Send className="w-4 h-4" />
                           </button>
                           {error && (
                              <motion.p 
                                 initial={{ opacity: 0, y: 5 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 className="text-[10px] font-bold text-red-500 mt-2 ml-2"
                              >
                                 {error}
                              </motion.p>
                           )}
                        </form>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>

      {/* Empty Space Filler - The Technical DNA */}
      <div className={`hidden lg:flex w-[46%] flex-col ${isEven ? 'items-start pl-20' : 'items-end pr-20'} justify-center relative`}>
         <div className="relative">
            {/* Background Large Icon */}
            <div className="absolute -top-32 -left-20 opacity-[0.03] pointer-events-none select-none">
               <h1 className="text-[18rem] font-black tracking-tighter leading-none italic uppercase whitespace-nowrap">
                  {activity.tags[0]}
               </h1>
            </div>

            {/* Contextual Annotation */}
            <motion.div 
               initial={{ opacity: 0, x: isEven ? -20 : 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               className={`max-w-xs space-y-8 ${isEven ? 'text-left' : 'text-right'}`}
            >
               <div className="space-y-3">
                  <div className={`flex items-center gap-3 text-[#FC4C02] ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                     <Zap className="w-5 h-5 fill-current" />
                     <span className="text-[10px] font-black uppercase tracking-[0.3em]">Phase Insight</span>
                  </div>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
                     {activity.id === 1 && "A base de tudo. Onde aprendi que o código é apenas o meio, mas a lógica é o fim."}
                     {activity.id === 2 && "A velocidade da web fascinou-me. O feedback instantâneo mudou a minha forma de criar."}
                     {activity.id === 3 && "Full-stack não é saber duas coisas, é entender como o mundo se conecta."}
                     {activity.id === 4 && "No mundo real, a melhor tecnologia é a que resolve o problema do cliente."}
                     {activity.id === 5 && "Mobile é pessoal. Cada pixel conta porque está na palma da mão do utilizador."}
                  </p>
               </div>

               <div className={`flex flex-col gap-2 ${isEven ? 'border-l border-slate-200 pl-6' : 'border-r border-slate-200 pr-6'}`}>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Runtime Analytics</span>
                  <div className="font-mono text-[9px] text-slate-400 space-y-1 opacity-70">
                     <p>&gt; phase_status: 100%_OPTIMIZED</p>
                     <p>&gt; stack_depth: {10 + activity.id * 5}k_LINES</p>
                     <p>&gt; core_temp: STABLE</p>
                     <p>&gt; commit_hash: 0x{Math.random().toString(16).slice(2, 10).toUpperCase()}</p>
                  </div>
               </div>
            </motion.div>
         </div>
      </div>
    </motion.div>
  );
}
