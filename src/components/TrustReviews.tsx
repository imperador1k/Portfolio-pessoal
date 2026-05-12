import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  CheckCircle2, 
  Plus, 
  X, 
  ChevronDown,
  Award,
  MessageSquare,
  TrendingUp,
  User,
  Code,
  Briefcase,
  Palette,
  Search,
  Building2,
  Heart,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface Review {
  id: string;
  name: string;
  initials: string;
  rating: number;
  topic: string;
  text: string;
  date: string;
  roleIcon: string;
}

const getRatingColor = (rating: number) => {
  if (rating >= 4.5) return '#00b67a'; // Deep Green
  if (rating >= 3.5) return '#73cf11'; // Light Green
  if (rating >= 2.5) return '#ffce00'; // Yellow
  if (rating >= 1.5) return '#ff8622'; // Orange
  return '#ff3722'; // Red
};

const TrustPilotStar = ({ filled = true, color = '#00b67a', size = "w-5 h-5", iconSize = "w-3.5 h-3.5" }: { 
  filled?: boolean, 
  color?: string,
  size?: string,
  iconSize?: string
}) => (
  <div 
    className={`${size} flex items-center justify-center rounded-sm transition-all duration-300 shadow-sm`}
    style={{ backgroundColor: filled ? color : '#eef2f6' }}
  >
    <Star className={`${iconSize} ${filled ? 'text-white fill-white' : 'text-[#94a3b8]'}`} />
  </div>
);

const StarRating = ({ rating, size, iconSize }: { rating: number, size?: string, iconSize?: string }) => (
  <div className="flex gap-1.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <TrustPilotStar 
        key={s} 
        filled={s <= Math.round(rating)} 
        color={getRatingColor(rating)} 
        size={size}
        iconSize={iconSize}
      />
    ))}
  </div>
);

const RoleIcon = ({ type, color }: { type: string, color: string }) => {
  switch (type) {
    case 'dev': return <Code className="w-5 h-5" style={{ color }} />;
    case 'recruiter': return <Search className="w-5 h-5" style={{ color }} />;
    case 'client': return <Building2 className="w-5 h-5" style={{ color }} />;
    case 'designer': return <Palette className="w-5 h-5" style={{ color }} />;
    default: return <User className="w-5 h-5" style={{ color }} />;
  }
};

export default function TrustReviews() {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  
  // Modal Form State
  const [newRating, setNewRating] = useState(5);
  const [newTopic, setNewTopic] = useState('');
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [selectedRole, setSelectedRole] = useState('dev');

  const getTranslatedRatingLabel = (rating: number) => {
    if (rating >= 4.5) return t('claude.reviews.excellent');
    if (rating >= 3.5) return t('claude.reviews.very_good');
    if (rating >= 2.5) return t('claude.reviews.good');
    if (rating >= 1.5) return t('claude.reviews.poor');
    return t('claude.reviews.very_poor');
  };

  // Calculations
  const stats = useMemo(() => {
    if (reviews.length === 0) return { avg: 5.0, count: 0, label: t('claude.reviews.excellent') };
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = sum / reviews.length;
    return {
      avg: parseFloat(avg.toFixed(1)),
      count: reviews.length,
      label: getTranslatedRatingLabel(avg)
    };
  }, [reviews, t]);

  const topics = [
    { id: 'engineering', label: t('claude.reviews.modal.topics.engineering') },
    { id: 'design', label: t('claude.reviews.modal.topics.design') },
    { id: 'communication', label: t('claude.reviews.modal.topics.communication') },
    { id: 'reliability', label: t('claude.reviews.modal.topics.reliability') }
  ];

  const roles = [
    { id: 'dev', icon: <Code className="w-3.5 h-3.5" />, label: 'Developer' },
    { id: 'recruiter', icon: <Search className="w-3.5 h-3.5" />, label: 'Recruiter' },
    { id: 'client', icon: <Building2 className="w-3.5 h-3.5" />, label: 'Cliente' },
    { id: 'designer', icon: <Palette className="w-3.5 h-3.5" />, label: 'Designer' },
    { id: 'other', icon: <User className="w-3.5 h-3.5" />, label: 'Outro' }
  ];

  const handlePostReview = () => {
    const review: Review = {
      id: Date.now().toString(),
      name: newName,
      initials: newName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      rating: newRating,
      topic: topics.find(t => t.id === newTopic)?.label || newTopic,
      text: newComment,
      date: new Date().toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' }),
      roleIcon: selectedRole
    };
    
    setReviews([review, ...reviews]);
    setSubmitted(true);
    
    setTimeout(() => {
        setNewName('');
        setNewComment('');
        setNewRating(5);
        setNewTopic('');
        setSelectedRole('dev');
    }, 1000);
  };

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden" id="reviews">
      <div className="max-w-7xl mx-auto">
        
        {/* Elite Context Title */}
        <div className="text-center mb-20 space-y-6">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-white border border-slate-100 text-slate-900 rounded-full text-[10px] font-black uppercase tracking-[0.25em] shadow-sm"
           >
              <Heart className="w-3.5 h-3.5 fill-[#00b67a] text-[#00b67a]" />
              {t('claude.reviews.section_tag')}
           </motion.div>
           <h3 
             className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]"
             dangerouslySetInnerHTML={{ __html: t('claude.reviews.section_title') }}
           />
           <p className="max-w-2xl mx-auto text-lg text-slate-500 font-medium leading-relaxed">
              {t('claude.reviews.section_desc')}
           </p>
        </div>

        {/* Trustpilot-style Header */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between mb-24 gap-6">
           <div className="flex-1 flex flex-col md:flex-row items-center gap-8 bg-white p-12 rounded-[48px] border border-slate-100 shadow-[0_30px_60px_rgba(0,0,0,0.02)]">
              <div className="text-center md:text-left space-y-5">
                 <div className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{t('claude.reviews.title')}</span>
                    <ExternalLink className="w-3 h-3 text-slate-200" />
                 </div>
                 <div className="flex flex-col md:flex-row items-center gap-5">
                    <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{stats.label}</h2>
                    <StarRating rating={stats.avg} size="w-9 h-9" iconSize="w-5 h-5" />
                 </div>
                 <p className="text-sm text-slate-400 font-bold uppercase tracking-wide">
                    {t('claude.reviews.subtitle')} • <span className="text-[#00b67a]">{stats.count} reviews</span>
                 </p>
              </div>
              
              <div className="hidden md:block w-px h-24 bg-slate-50" />
              
              <div className="text-center bg-slate-50/30 px-10 py-8 rounded-[40px] border border-slate-100/50">
                 <div className="flex flex-col items-center">
                    <span className="text-5xl font-black text-slate-900 leading-none tracking-tighter">{stats.avg}</span>
                    <div className="flex items-center gap-2 text-[#00b67a] font-black mt-4">
                       <TrendingUp className="w-4 h-4" />
                       <span className="text-[10px] uppercase tracking-[0.25em]">Trustscore</span>
                    </div>
                 </div>
              </div>
           </div>

           <motion.button 
             whileHover={{ scale: 1.02, y: -5 }}
             whileTap={{ scale: 0.98 }}
             onClick={() => {
                setSubmitted(false);
                setIsModalOpen(true);
             }}
             className="flex flex-col items-center justify-center gap-4 px-10 py-10 bg-white border border-slate-100 text-slate-900 rounded-[48px] shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:border-jb-primary/20 transition-all group lg:w-80"
           >
              <div className="w-14 h-14 bg-[#00b67a] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-[#00b67a]/20">
                 <Plus className="w-7 h-7 text-white" />
              </div>
              <div className="text-center">
                 <span className="text-xs font-black uppercase tracking-[0.2em] block mb-1">{t('claude.reviews.write_btn')}</span>
                 <span className="text-[10px] text-slate-400 font-bold tracking-tight">Partilha a tua experiência</span>
              </div>
           </motion.button>
        </div>

        {/* Reviews Content */}
        {reviews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <AnimatePresence mode="popLayout">
                  {reviews.slice(0, visibleCount).map((review) => (
                    <motion.div 
                      key={review.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white border border-slate-100 p-10 rounded-[48px] shadow-[0_10px_40px_rgba(0,0,0,0.02)] flex flex-col h-full hover:shadow-2xl transition-all group/card hover:-translate-y-2"
                    >
                       <div className="flex items-center gap-4 mb-8">
                          <div 
                              className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-black text-white relative shadow-lg"
                              style={{ backgroundColor: getRatingColor(review.rating) }}
                          >
                             {review.initials}
                             <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-50">
                                <RoleIcon type={review.roleIcon} color={getRatingColor(review.rating)} />
                             </div>
                          </div>
                          <div className="flex-1 min-w-0">
                             <h4 className="text-base font-black text-slate-900 truncate tracking-tight">{review.name}</h4>
                             <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{review.topic}</p>
                          </div>
                          <div className="flex items-center gap-1.5 text-[#00b67a] bg-[#00b67a]/5 px-3 py-1.5 rounded-full border border-[#00b67a]/10">
                             <CheckCircle2 className="w-3.5 h-3.5 fill-[#00b67a] text-white" />
                             <span className="text-[9px] font-black uppercase tracking-tighter">{t('claude.reviews.verified')}</span>
                          </div>
                       </div>

                       <div className="mb-8">
                          <StarRating rating={review.rating} size="w-7 h-7" iconSize="w-4 h-4" />
                       </div>

                       <p className="text-[16px] text-slate-700 leading-relaxed mb-10 flex-1 font-medium italic">
                          "{review.text}"
                       </p>

                       <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
                          <p className="text-[11px] text-slate-400 font-black tracking-widest uppercase">
                             {t('claude.reviews.date')} {review.date}
                          </p>
                          <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: getRatingColor(review.rating) }} />
                       </div>
                    </motion.div>
                  ))}
               </AnimatePresence>
            </div>
            
            {reviews.length > visibleCount && (
              <div className="mt-16 flex justify-center">
                 <button 
                   onClick={() => setVisibleCount(prev => prev + 6)}
                   className="flex items-center gap-3 px-12 py-5 bg-white border border-slate-100 text-slate-600 rounded-full text-xs font-black uppercase tracking-widest shadow-sm hover:shadow-xl hover:bg-slate-50 transition-all active:scale-95"
                 >
                    Ver mais {reviews.length - visibleCount} reviews
                    <ChevronDown className="w-4 h-4" />
                 </button>
              </div>
            )}
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 bg-white/40 backdrop-blur-md rounded-[60px] border-2 border-dashed border-slate-100"
          >
             <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                <MessageSquare className="w-10 h-10 text-slate-200" />
             </div>
             <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">{t('claude.reviews.empty.title')}</h3>
             <p className="text-slate-400 font-medium mb-10 text-center max-w-md px-6 leading-relaxed">
                {t('claude.reviews.empty.desc')}
             </p>
             <button 
                onClick={() => setIsModalOpen(true)}
                className="group flex items-center gap-3 text-[#00b67a] font-black uppercase tracking-[0.3em] text-[10px] hover:gap-5 transition-all"
             >
                {t('claude.reviews.write_btn')}
                <Plus className="w-4 h-4" />
             </button>
          </motion.div>
        )}

        {/* Floating Trustpilot Badge (Mock) */}
        <div className="mt-28 flex items-center justify-center gap-12 opacity-20 grayscale hover:grayscale-0 transition-all cursor-default scale-110">
           <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-[#00b67a] fill-[#00b67a]" />
              <span className="font-black text-3xl tracking-tighter text-slate-900">Trustpilot</span>
           </div>
        </div>

        {/* Review Modal */}
        <AnimatePresence>
           {isModalOpen && (
             <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsModalOpen(false)}
                  className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 50 }}
                  className="relative w-full max-w-2xl bg-white rounded-[56px] shadow-2xl overflow-hidden border border-white"
                >
                   <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-50 to-transparent pointer-events-none" />
                   
                   <div className="p-12 md:p-16 max-h-[90vh] overflow-y-auto custom-scrollbar relative z-10">
                      <div className="flex items-center justify-between mb-12">
                         <div className="flex items-center gap-6">
                            <div 
                                className="w-16 h-16 rounded-[24px] flex items-center justify-center border-2 transition-all duration-700 shadow-xl overflow-hidden relative group"
                                style={{ 
                                    backgroundColor: `${getRatingColor(newRating)}05`,
                                    borderColor: `${getRatingColor(newRating)}30`
                                }}
                            >
                               <Award className="w-8 h-8" style={{ color: getRatingColor(newRating) }} />
                            </div>
                            <div>
                               <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">{t('claude.reviews.modal.title')}</h3>
                               <p className="text-[10px] font-black text-[#00b67a] mt-2.5 uppercase tracking-[0.3em] flex items-center gap-2">
                                  <Sparkles className="w-3 h-3" />
                                  Elite Feedback System
                               </p>
                            </div>
                         </div>
                         <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-slate-100 rounded-full transition-all text-slate-300 hover:text-slate-900 active:scale-90">
                            <X className="w-7 h-7" />
                         </button>
                      </div>

                      {submitted ? (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center py-16"
                        >
                           <motion.div 
                             initial={{ scale: 0, rotate: -45 }}
                             animate={{ scale: 1, rotate: 0 }}
                             className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative"
                             style={{ backgroundColor: `${getRatingColor(newRating)}`, color: 'white' }}
                           >
                              <CheckCircle2 className="w-14 h-14" />
                           </motion.div>
                           <h4 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">{t('claude.reviews.modal.success')}</h4>
                           <p className="text-slate-400 text-lg font-medium">Agradeço a tua contribuição para a transparência deste Hub.</p>
                           <button 
                            onClick={() => setIsModalOpen(false)}
                            className="mt-12 px-16 py-5 bg-slate-900 text-white rounded-[28px] font-black shadow-2xl hover:bg-slate-800 transition-all uppercase text-sm tracking-widest active:scale-95"
                           >
                              Concluir
                           </button>
                        </motion.div>
                      ) : (
                        <div className="space-y-10">
                           {/* Star Selection */}
                           <div className="bg-slate-50/50 p-10 rounded-[48px] border border-slate-100 flex flex-col items-center gap-6 shadow-inner relative overflow-hidden group">
                              <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">{t('claude.reviews.modal.satisfaction_label')}</span>
                              <div className="flex gap-4 relative z-10">
                                 {[1, 2, 3, 4, 5].map((s) => (
                                   <button 
                                     key={s} 
                                     onClick={() => setNewRating(s)}
                                     className="hover:scale-125 transition-transform active:scale-90"
                                   >
                                      <TrustPilotStar 
                                        filled={s <= newRating} 
                                        color={getRatingColor(newRating)} 
                                        size="w-16 h-16" 
                                        iconSize="w-9 h-9" 
                                      />
                                   </button>
                                 ))}
                              </div>
                              <span className="text-2xl font-black transition-all duration-700 tracking-tighter uppercase" style={{ color: getRatingColor(newRating) }}>
                                 {getTranslatedRatingLabel(newRating)}
                              </span>
                           </div>

                           {/* Profile Type Selector */}
                           <div className="space-y-5">
                              <label className="block text-[10px] font-black text-slate-300 uppercase tracking-[0.25em] px-3">O teu Perfil Profissional</label>
                              <div className="flex flex-wrap gap-3">
                                 {roles.map((role) => (
                                    <button
                                      key={role.id}
                                      onClick={() => setSelectedRole(role.id)}
                                      className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl text-xs font-black transition-all border-2 ${
                                        selectedRole === role.id 
                                        ? 'bg-slate-900 text-white border-slate-900 shadow-2xl -translate-y-1' 
                                        : 'bg-white text-slate-400 border-slate-50 hover:border-slate-200 hover:text-slate-600'
                                      }`}
                                    >
                                       {role.icon}
                                       {role.label}
                                    </button>
                                 ))}
                              </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-3">
                                 <label className="block text-[10px] font-black text-slate-300 uppercase tracking-[0.25em] px-3">{t('claude.reviews.modal.name_label')}</label>
                                 <input 
                                   type="text" 
                                   value={newName}
                                   onChange={(e) => setNewName(e.target.value)}
                                   placeholder={t('claude.reviews.modal.name_placeholder')}
                                   className="w-full px-8 py-5 bg-slate-50/50 border border-slate-100 rounded-[28px] focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all text-sm font-bold shadow-inner"
                                 />
                              </div>
                              <div className="space-y-3">
                                 <label className="block text-[10px] font-black text-slate-300 uppercase tracking-[0.25em] px-3">{t('claude.reviews.modal.topic_label')}</label>
                                 <div className="relative">
                                    <select 
                                      value={newTopic}
                                      onChange={(e) => setNewTopic(e.target.value)}
                                      className={`w-full px-8 py-5 bg-slate-50/50 border border-slate-100 rounded-[28px] focus:outline-none appearance-none text-sm font-bold shadow-inner cursor-pointer transition-all focus:bg-white ${!newTopic ? 'text-slate-400' : 'text-slate-900'}`}
                                    >
                                       <option value="" disabled>{t('claude.reviews.modal.topic_placeholder')}</option>
                                       {topics.map(t => (
                                         <option key={t.id} value={t.id} className="text-slate-900 font-bold">{t.label}</option>
                                       ))}
                                    </select>
                                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                                 </div>
                              </div>
                           </div>

                           <div className="space-y-3">
                              <label className="block text-[10px] font-black text-slate-300 uppercase tracking-[0.25em] px-3">{t('claude.reviews.modal.msg_label')}</label>
                              <textarea 
                                rows={4}
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder={t('claude.reviews.modal.msg_placeholder')}
                                className="w-full px-8 py-6 bg-slate-50/50 border border-slate-100 rounded-[32px] focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all text-sm font-bold shadow-inner resize-none"
                              />
                           </div>

                           <motion.button 
                             whileHover={{ scale: 1.02, y: -2 }}
                             whileTap={{ scale: 0.98 }}
                             onClick={handlePostReview}
                             disabled={!newName || !newComment || !newTopic}
                             className="w-full py-6 rounded-[32px] font-black text-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed uppercase text-[14px] tracking-[0.3em] active:scale-95"
                             style={{ 
                                backgroundColor: getRatingColor(newRating),
                                boxShadow: `0 20px 40px ${getRatingColor(newRating)}40`
                             }}
                           >
                              {t('claude.reviews.modal.submit')}
                           </motion.button>
                        </div>
                      )}
                   </div>
                </motion.div>
             </div>
           )}
        </AnimatePresence>

      </div>
    </section>
  );
}
