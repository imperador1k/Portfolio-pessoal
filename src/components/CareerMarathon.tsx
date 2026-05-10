import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import React, { useRef, useState } from 'react';
import { 
  Activity, 
  MessageCircle, 
  Zap, 
  Heart, 
  Trophy, 
  Timer, 
  Send,
  BarChart3
} from 'lucide-react';

const marathonData = [
  {
    id: 1,
    type: 'The Foundation',
    title: 'Engenharia Informática',
    org: 'Licenciatura (A Base)',
    date: '2020 - 2023',
    image: '/journey.jpg',
    description: 'Aqui começou a verdadeira maratona. Três anos intensos onde construí as minhas bases lógicas. Foi aqui que percebi que a programação era o que queria fazer para a vida. As noites a debugar C e a estruturar arquiteturas ensinaram-me a resiliência de um verdadeiro engenheiro.',
    stats: { time: '3 Anos', effort: 'Hardcore', elevation: 'Bases Sólidas' },
    achievement: 'Degree Completed',
    tags: ['C/C++', 'Algorithms', 'Architecture'],
    splits: [
       { label: '01 Lógica e Algoritmos', split: 'Ano 1', effort: 'Pointers', zone: 'Z4' },
       { label: '02 Sistemas', split: 'Ano 2', effort: 'Bases de Dados', zone: 'Z3' },
       { label: '03 Projeto Final', split: 'Ano 3', effort: 'Tese Concluída', zone: 'Z5' }
    ],
    insight: "A base de tudo. Onde aprendi que o código é apenas o meio, mas a lógica é o fim.",
    comments: [
      { user: "Mentores", text: "Excelente capacidade analítica demonstrada ao longo do curso." }
    ]
  },
  {
    id: 2,
    type: 'Web Sprint',
    title: 'O Mergulho no Frontend',
    org: 'Autodidata',
    date: '2022 - 2023',
    image: '/water.png',
    description: 'Um sprint explosivo em direção ao desenvolvimento web e interfaces. Domínio do ecossistema JavaScript e React para construir aplicações modernas. O código passou a ter uma cara visual bonita e responsiva.',
    stats: { time: '1 Ano', effort: 'Aceleração', elevation: 'Ecossistema Web' },
    achievement: 'First Deploys',
    tags: ['React', 'TypeScript', 'Node.js'],
    splits: [
       { label: '01 Domínio do DOM', split: 'Q1', effort: 'Fundamentos', zone: 'Z2' },
       { label: '02 Ecossistema Prático', split: 'Q2', effort: 'React Hooks', zone: 'Z4' },
       { label: '03 Performance', split: 'Q3', effort: 'Deployments', zone: 'Z5' }
    ],
    insight: "A velocidade da web fascinou-me. O feedback visual instantâneo acelerou a minha evolução.",
    comments: [
      { user: "Dev Tracker", text: "Commits diários constantes. Boa evolução!" }
    ]
  },
  {
    id: 3,
    type: 'Business Hike',
    title: 'Digital B2B Solutions',
    org: 'Freelance & Agência',
    date: '2023 - 2024',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=70&w=800&auto=format&fit=crop',
    description: 'Trabalho de campo no mundo real. Comecei a aplicar os meus conhecimentos técnicos em negócios e clientes reais. Aprendi a dura verdade do mercado: código perfeito só interessa se resolver o problema do utilizador final e gerar conversão.',
    stats: { time: '1.5 Anos', effort: 'Tático', elevation: 'Negócios' },
    achievement: 'Customer Focus',
    tags: ['UI/UX', 'Conversão', 'Freelance'],
    splits: [
       { label: '01 Levantamento', split: 'Bases', effort: 'Comunicação', zone: 'Z3' },
       { label: '02 Desenvolvimento', split: 'Code', effort: 'Prazos Rigorosos', zone: 'Z5' },
       { label: '03 Lançamento', split: 'Launch', effort: 'Suporte', zone: 'Z4' }
    ],
    insight: "No mundo real, a melhor stack é apenas aquela que resulta para o problema em causa.",
    comments: [
      { user: "Loja Parceira", text: "As nossas vendas aumentaram drasticamente após o redesign!" }
    ]
  },
  {
    id: 4,
    type: 'Android Ultra',
    title: 'Engenharia Mobile Nativa',
    org: 'Miguel Santos Dev',
    date: 'Presente',
    image: '/natural.jpg',
    description: 'O cume montanhoso atual. Transitei totalmente o meu foco para o ecossistema Android nativo, apaixonando-me pela fluidez e robustez de Kotlin. O design declarativo do Jetpack Compose permite-me agora criar interfaces premium à mesma velocidade a que o penso.',
    stats: { time: 'Active', effort: 'Max Zone', elevation: 'Nativo Mobile' },
    achievement: 'King of the Mountain',
    tags: ['Kotlin', 'Jetpack Compose', 'Coroutines'],
    splits: [
       { label: '01 Mudança de Ritmo', split: 'Current', effort: 'Adeus XML', zone: 'Z3' },
       { label: '02 Coroutines & Flows', split: 'Current', effort: 'Asincronismo', zone: 'Z5' },
       { label: '03 Arquiteturas', split: 'Current', effort: 'MVVM Clean', zone: 'Z4' }
    ],
    insight: "Mobile é pessoal. Cada pixel e fluxo de memória conta porque a app vive na bateria do utilizador.",
    comments: [
      { user: "Senior Dev", text: "Excelente utilização de MVI/MVVM. Arquitetura altamente testável." }
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
    <section className="relative py-20 lg:py-32 overflow-hidden" id="timeline">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FC4C02]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10" ref={containerRef}>
        {/* Header Section */}
        <div className="mb-20 lg:mb-32 relative">
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-8 bg-orange-50 text-[#FC4C02] w-fit px-5 py-2.5 rounded-full shadow-sm border border-orange-100"
            >
              <Activity className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-[0.2em]">Timeline Evolution</span>
            </motion.div>
            <h2 className="text-6xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8">
              A Minha <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FC4C02] to-orange-400">Maratona</span>
            </h2>
            <p className="text-slate-500 text-lg lg:text-xl font-medium max-w-xl leading-relaxed border-l-4 border-orange-200 pl-5">
              Ninguém corre uma maratona focando-se na meta. A evolução profissional é analisada <strong className="text-slate-700">split a split</strong>, projeto a projeto. Esta é a jornada lógica até ao presente.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Main Timeline Line */}
          <div className="absolute left-[20px] lg:left-1/2 top-0 bottom-0 w-px lg:w-[2px] bg-slate-100 lg:-translate-x-1/2 z-0">
            <motion.div 
              style={{ scaleY }}
              className="absolute top-0 left-0 w-full bg-[#FC4C02] origin-top shadow-[0_0_20px_rgba(252,76,2,0.4)]"
            />
          </div>

          <div className="space-y-16 lg:space-y-24">
            {marathonData.map((activity, index) => (
              <ActivityCard key={activity.id} activity={activity} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ActivityCard({ activity, index }: { activity: typeof marathonData[0], index: number }) {
  const isEven = index % 2 === 0;
  const [kudos, setKudos] = useState(Math.floor(Math.random() * 40) + 15);
  const [hasKudosed, setHasKudosed] = useState(false);
  const [showComments, setShowComments] = useState(false);
  
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem(`comments-${activity.id}`);
    return saved ? JSON.parse(saved) : activity.comments;
  });
  const [newComment, setNewComment] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);
  const [error, setError] = useState("");

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    if (isCooldown) {
      setError("Calma aí! Espera uns segundos.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    
    const updatedComments = [...comments, { user: "Tu (Visitante)", text: newComment }];
    setComments(updatedComments);
    localStorage.setItem(`comments-${activity.id}`, JSON.stringify(updatedComments));
    setNewComment("");
    
    setIsCooldown(true);
    setTimeout(() => setIsCooldown(false), 5000);
  };

  const handleKudos = () => {
    if (hasKudosed) {
      setKudos(prev => prev - 1);
      setHasKudosed(false);
    } else {
      setKudos(prev => prev + 1);
      setHasKudosed(true);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`flex flex-col lg:flex-row items-stretch lg:items-center gap-8 lg:gap-16 relative ${isEven ? '' : 'lg:flex-row-reverse'}`}
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
      <div className="w-full lg:w-[46%] bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.08)] transition-all duration-500 group relative z-10 w-full pl-6">
         
         <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FC4C02] to-transparent bg-opacity-20" />

         {/* Activity Header */}
         <div className="px-6 py-8 border-b border-slate-50">
            <div className="flex items-center justify-between mb-4">
               <div>
                  <h4 className="text-slate-900 font-black text-xl leading-none mb-1.5 tracking-tight uppercase">{activity.org}</h4>
                  <div className="flex flex-wrap items-center gap-2">
                     <span className="text-xs font-bold text-slate-400 tracking-widest">{activity.type}</span>
                     <div className="w-1 h-1 rounded-full bg-slate-200" />
                     <span className="text-xs font-black text-[#FC4C02] tracking-widest">{activity.date}</span>
                  </div>
               </div>
               {activity.achievement && (
                  <div className="hidden sm:flex items-center gap-2 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-100 shadow-sm shrink-0">
                     <Trophy className="w-3.5 h-3.5 text-amber-500" />
                     <span className="text-[10px] sm:text-xs font-black text-amber-600 uppercase tracking-tight">{activity.achievement}</span>
                  </div>
               )}
            </div>
         </div>

         {/* Main Content */}
         <div className="p-6 lg:p-8">
            <h3 className="text-2xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight tracking-tighter group-hover:text-[#FC4C02] transition-colors">
               {activity.title}
            </h3>

            <div className="flex flex-col sm:flex-row gap-6 mb-8">
               <p className="text-slate-500 text-sm lg:text-base leading-relaxed font-medium flex-1">
                  {activity.description}
               </p>
               {activity.image && (
                  <div className="w-full h-48 sm:w-32 sm:h-32 lg:w-48 lg:h-48 shrink-0 rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 border-2 border-slate-100 group-hover:border-[#FC4C02]/20 transition-colors">
                     <img src={activity.image} alt={activity.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s] ease-out" />
                  </div>
               )}
            </div>

            {/* Dynamic Splits */}
            <div className="mb-8 bg-slate-50 border border-slate-100 rounded-2xl p-5 shadow-sm">
               <h5 className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
                  <BarChart3 className="w-4 h-4 text-[#FC4C02]" />
                  A evolução deste split
               </h5>
               <div className="space-y-3">
                  {activity.splits.map((s, i) => (
                     <div key={i} className="flex items-center justify-between group/split py-1 border-b border-white last:border-0">
                        <div className="flex flex-col">
                           <span className="text-xs font-bold text-slate-900">{s.label}</span>
                           <span className="text-[9px] font-bold text-slate-400 uppercase">{s.effort}</span>
                        </div>
                        <div className="flex items-center gap-4">
                           <span className="text-sm font-mono font-black text-slate-600">{s.split}</span>
                           <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black shadow-sm ${
                              s.zone === 'Z5' ? 'bg-red-500 text-white' : s.zone === 'Z4' ? 'bg-orange-400 text-white' : 'bg-slate-200 text-slate-600'
                           }`}>
                              {s.zone}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 pt-4 border-t border-slate-100">
               {[
                  { label: 'Tempo', val: activity.stats.time, icon: <Timer className="w-4 h-4" />, color: 'text-blue-500' },
                  { label: 'Esforço', val: activity.stats.effort, icon: <Zap className="w-4 h-4" />, color: 'text-amber-500' },
                  { label: 'Foco', val: activity.stats.elevation, icon: <Activity className="w-4 h-4" />, color: 'text-[#FC4C02]' }
               ].map(m => (
                  <div key={m.label} className="flex flex-col">
                     <span className={`flex items-center gap-1 ${m.color} text-[9px] mb-1 font-black uppercase tracking-widest`}>
                        {m.label}
                     </span>
                     <span className="text-xl font-black text-slate-900 tracking-tighter truncate">{m.val}</span>
                  </div>
               ))}
            </div>

            {/* Tags e Insight */}
            <div className="bg-slate-900 text-white p-4 rounded-xl text-xs font-bold italic mb-6 shadow-inner tracking-wide">
              " {activity.insight} "
            </div>

            <div className="flex flex-wrap gap-2">
               {activity.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white text-slate-500 text-[10px] font-black rounded-lg border border-slate-200 hover:border-[#FC4C02] hover:text-[#FC4C02] transition-colors">
                     #{tag.toUpperCase()}
                  </span>
               ))}
            </div>
         </div>

         {/* Social Footer */}
         <div className="px-6 py-6 bg-slate-50/70 border-t border-slate-100">
            <div className="flex items-center gap-6">
               <button 
                  onClick={handleKudos}
                  className={`flex items-center gap-2 transition-all ${hasKudosed ? 'text-[#FC4C02] scale-110' : 'text-slate-400 hover:text-slate-900'}`}
               >
                  <Heart className={`w-6 h-6 ${hasKudosed ? 'fill-current' : ''}`} />
                  <span className="text-lg font-black italic">{kudos}</span>
               </button>
               <button 
                  onClick={() => setShowComments(!showComments)}
                  className={`flex items-center gap-2 transition-colors ${showComments ? 'text-[#FC4C02]' : 'text-slate-400 hover:text-slate-900'}`}
               >
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-lg font-black italic">{comments.length}</span>
               </button>
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
                     <div className="pt-6 mt-4 border-t border-slate-200/60 space-y-4">
                        <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
                           {comments.map((comment: any, i: number) => (
                              <motion.div 
                                 initial={{ x: -10, opacity: 0 }}
                                 animate={{ x: 0, opacity: 1 }}
                                 key={i} 
                                 className="flex gap-3"
                              >
                                 <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shrink-0 mt-1">
                                    <img src={`https://i.pravatar.cc/100?u=${i + 150}`} alt="" className="w-full h-full object-cover" />
                                 </div>
                                 <div className="bg-white px-4 py-2.5 rounded-xl border border-slate-100 shadow-sm grow text-sm">
                                    <p className="font-bold text-slate-800 text-[10px] mb-0.5">{comment.user}</p>
                                    <p className="text-slate-600 font-medium leading-snug">{comment.text}</p>
                                 </div>
                              </motion.div>
                           ))}
                        </div>

                        <form onSubmit={handleAddComment} className="relative mt-4">
                           <input 
                              type="text" 
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              disabled={isCooldown}
                              placeholder="Publica um comentário..."
                              className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-4 pr-12 text-sm font-medium focus:outline-none focus:border-[#FC4C02] transition-colors"
                           />
                           <button 
                              type="submit"
                              disabled={isCooldown}
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center hover:bg-[#FC4C02] transition-colors disabled:bg-slate-300"
                           >
                              <Send className="w-3.5 h-3.5" />
                           </button>
                           {error && <p className="text-[10px] font-bold text-red-500 mt-2 absolute -bottom-5">{error}</p>}
                        </form>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
      
      {/* Visual Content for Desktop Side (The "Strava" feeling vertical text) */}
      <div className={`hidden lg:flex w-[46%] flex-col ${isEven ? 'items-start pl-16 xl:pl-24' : 'items-end pr-16 xl:pr-24'} justify-center relative select-none pointer-events-none`}>
         <motion.div 
            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`flex items-center gap-6 xl:gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
         >
            {/* Tagline Line */}
            <div className={`flex flex-col gap-4 opacity-70 ${isEven ? 'items-center' : 'items-center'}`}>
               <div className={`w-1.5 h-40 bg-gradient-to-b from-[#FC4C02] to-transparent rounded-full`} />
               <span 
                  className="text-[11px] xl:text-[13px] font-black uppercase tracking-[0.3em] text-[#FC4C02]" 
                  style={{ writingMode: 'vertical-rl', transform: isEven ? 'rotate(180deg)' : 'none' }}
               >
                  {activity.tags[0]}
               </span>
            </div>
            
            {/* Giant Split Number */}
            <motion.h1 
               initial={{ rotate: isEven ? 180 : 0 }}
               animate={{ opacity: [0.3, 1, 0.3] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="text-[8rem] xl:text-[10rem] font-black tracking-tighter leading-none text-transparent"
               style={{ 
                  writingMode: 'vertical-rl', 
                  WebkitTextStroke: '3px rgba(252, 76, 2, 0.25)'
               }}
            >
               SPLIT_0{activity.id}
            </motion.h1>

            {/* Contextual Stats */}
            <div className={`flex flex-col gap-6 justify-center h-full ${isEven ? 'items-start' : 'items-end'}`}>
               <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               >
                  <Trophy className="w-12 h-12 xl:w-16 xl:h-16 text-[#FC4C02] stroke-[2]" />
               </motion.div>
               <motion.span 
                  initial={{ rotate: isEven ? 180 : 0 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="text-3xl xl:text-4xl font-black font-mono text-slate-900 whitespace-nowrap mt-8 tracking-widest"
                  style={{ writingMode: 'vertical-rl' }}
               >
                  {activity.stats.time} <span className="text-[#FC4C02] font-black mx-2 opacity-60">/</span> <span className="text-[#FC4C02]">ZONA {activity.splits[0].zone}</span>
               </motion.span>
            </div>
         </motion.div>
      </div>
    </motion.div>
  );
}
