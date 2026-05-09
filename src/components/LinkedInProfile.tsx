import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Linkedin, 
  MapPin, 
  Users, 
  Briefcase, 
  GraduationCap, 
  ChevronRight, 
  Plus, 
  Pencil, 
  MoreHorizontal,
  Send,
  X,
  Minus,
  ExternalLink,
  Check,
  MessageSquare,
  Search,
  Bell,
  Home,
  Briefcase as JobIcon,
  MessageCircle,
  Grid,
  Paperclip,
  FileText,
  ImageIcon
} from 'lucide-react';

const experience = [
  {
    company: 'Web Developer',
    role: 'Freelance',
    period: 'Jan 2024 - Present • 5 mos',
    location: 'Alcobaça, Leiria, Portugal • Remote',
    description: 'Sou freelancer na área de Web Development, focado na criação de websites modernos e aplicações SPA desenvolvidas em React e Vite. Trabalho sobretudo com pequenos negócios e profissionais...',
    logo: 'https://cdn-icons-png.flaticon.com/512/1006/1006363.png'
  }
];

const education = [
  {
    school: 'Instituto Politécnico de Tomar',
    degree: "Bachelor's degree, Computer Engineering",
    period: 'Sep 2024 - Jul 2027',
    field: 'Engineering',
    logo: '/ipt.png'
  },
  {
    school: 'Externato cooperativo da benedita',
    degree: '12, Information Technology',
    period: 'Sep 2018 - Jul 2023',
    field: 'Grade: 14',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0NnL_A8J5f_C9Q8zX8J8f_C9Q8zX8J8f_C9Q&s'
  }
];

export default function LinkedInProfile() {
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('linkedin_connected') === 'true';
    }
    return false;
  });
  const [connectedPeople, setConnectedPeople] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('linkedin_connected_people');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });
  
  // Email Form State
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [message, setMessage] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [subject, setSubject] = useState('');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Por favor, preencha todos os campos.');
      setSendStatus('error');
      return;
    }

    setIsSending(true);
    setSendStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSendStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setShowEmailForm(false);
          setSendStatus('idle');
        }, 3000);
      } else {
        setSendStatus('error');
        setErrorMessage(data.error || 'Erro ao enviar email.');
      }
    } catch (err) {
      setSendStatus('error');
      setErrorMessage('Erro de rede ao conectar com o servidor.');
    } finally {
      setIsSending(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isMessagingOpen) {
      setTimeout(scrollToBottom, 300);
    }
  }, [isMessagingOpen]);

  useEffect(() => {
    localStorage.setItem('linkedin_connected', isConnected.toString());
  }, [isConnected]);

  useEffect(() => {
    localStorage.setItem('linkedin_connected_people', JSON.stringify(connectedPeople));
  }, [connectedPeople]);

  // Auto-open contact modal if URL hash is #linkedin-contact
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#linkedin-contact') {
        setIsContactModalOpen(true);
        setShowEmailForm(true);
        // Clean up hash to avoid re-triggering on manual modal close/open
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };

    handleHashChange(); // Check on mount
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !subject.trim() || !senderEmail.trim()) {
      alert('Por favor, preencha todos os campos, incluindo o seu email.');
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'LinkedIn Visitor',
          email: senderEmail,
          subject: subject,
          message: message
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSent(true);
        setMessage('');
        setSubject('');
        setSenderEmail('');
        setAttachments([]);
        setTimeout(() => setSent(false), 5000);
      } else {
        alert('Erro ao enviar: ' + data.error);
      }
    } catch (err) {
      alert('Erro de ligação ao servidor.');
    } finally {
      setIsSending(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []) as File[];
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB limit

    const validFiles = selectedFiles.filter(file => {
      const isAllowedType = allowedTypes.includes(file.type);
      const isUnderSize = file.size <= maxSize;
      if (!isAllowedType) alert(`File type ${file.type} not allowed. Please use PDF or Images.`);
      if (!isUnderSize) alert(`File ${file.name} is too large (max 10MB).`);
      return isAllowedType && isUnderSize;
    });

    setAttachments(prev => [...prev, ...validFiles]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleConnectPerson = (name: string) => {
    setConnectedPeople(prev => ({ ...prev, [name]: true }));
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent relative min-h-screen border-t border-slate-200/50" id="contactos">
      <div id="linkedin-contact" className="absolute top-0 left-0 w-full h-1" />
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="px-3 py-1 bg-[#0a66c2]/10 text-[#0a66c2] text-[10px] font-mono font-bold rounded-full tracking-wider uppercase">
              Professional_Network
            </span>
            <div className="h-px flex-1 bg-linear-to-r from-[#0a66c2]/20 to-transparent" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight"
          >
            Professional <span className="text-[#0a66c2] font-light">Hub</span>
          </motion.h2>
        </div>

        {/* Hidden File Input */}
        <input 
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,image/png,image/jpeg,image/jpg,image/webp"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Intro Card */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="relative h-48 bg-slate-200">
                {/* Official Banner */}
                <div className="absolute inset-0 overflow-hidden">
                   <img 
                    src="/banner_linkedin.png" 
                    alt="LinkedIn Banner" 
                    className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-black/5"></div>
                </div>
              </div>
              
              <div className="px-6 pb-6 relative">
                <div className="absolute -top-16 left-6">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden shadow-lg bg-slate-100">
                    <img src="/icon.png" alt="Miguel Santos" className="w-full h-full object-cover" />
                  </div>
                </div>
                
                <div className="pt-20 md:pt-28 flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-2xl font-bold text-slate-900">Miguel Santos</h1>
                      <svg aria-label="Verificado" fill="rgb(0, 149, 246)" height="18" role="img" viewBox="0 0 40 40" width="18">
                        <path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fillRule="evenodd"></path>
                      </svg>
                    </div>
                    <p className="text-sm text-slate-700 leading-tight mb-2">
                      Estudante de Engenharia Informática | Backend / Frontend & AI Developer
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mb-4">
                      <span>Benedita, Leiria, Portugal</span>
                      <button 
                        onClick={() => setIsContactModalOpen(true)}
                        className="text-[#0a66c2] font-semibold hover:underline"
                      >
                        Contact info
                      </button>
                    </div>
                    <a href="#" className="text-xs text-[#0a66c2] font-semibold hover:underline block mb-6">
                      1 connection
                    </a>
                    
                    <div className="flex flex-wrap gap-2">
                      <button className="px-5 py-1.5 bg-[#0a66c2] text-white rounded-full text-sm font-bold hover:bg-[#004182] transition-colors">
                        Open to
                      </button>
                      <button 
                        onClick={() => setIsConnected(!isConnected)}
                        className={`px-5 py-1.5 border rounded-full text-sm font-bold transition-all ${
                          isConnected 
                            ? 'border-slate-400 text-slate-600 bg-slate-50 shadow-inner' 
                            : 'border-[#0a66c2] text-[#0a66c2] hover:bg-[#0a66c2]/5 hover:border-2'
                        }`}
                      >
                        {isConnected ? (
                          <span className="flex items-center gap-1.5">
                            <Check className="w-4 h-4" /> Connected
                          </span>
                        ) : 'Connect'}
                      </button>
                      <button className="px-5 py-1.5 border border-slate-400 text-slate-600 rounded-full text-sm font-bold hover:bg-slate-50 transition-colors">
                        Resources
                      </button>
                    </div>
                  </div>
                  
                  <div className="hidden md:block space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                       <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-100">
                          <img src="https://cdn-icons-png.flaticon.com/512/1006/1006363.png" className="w-6 h-6 object-contain" />
                       </div>
                       <span className="max-w-[150px] hover:text-[#0a66c2] hover:underline cursor-pointer">Web Developer Freelance</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                       <div className="w-8 h-8 rounded bg-white flex items-center justify-center overflow-hidden border border-slate-100">
                          <img src="/ipt.png" className="w-6 h-6 object-contain" />
                       </div>
                       <span className="max-w-[150px] hover:text-[#0a66c2] hover:underline cursor-pointer">Instituto Politécnico de Tomar</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* InMail Messaging Card */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-[#0a66c2] px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <Linkedin className="w-5 h-5 fill-current" />
                  <span className="text-sm font-bold">InMail Message</span>
                </div>
                <div className="flex items-center gap-4 text-white/80">
                   <Minus className="w-4 h-4 cursor-pointer hover:text-white" />
                   <X className="w-4 h-4 cursor-pointer hover:text-white" />
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                   <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200">
                      <img src="/icon.png" alt="Miguel Santos" className="w-full h-full object-cover" />
                   </div>
                   <div>
                      <p className="text-xs text-slate-500 mb-0.5">To:</p>
                      <p className="text-sm font-bold text-slate-900">Miguel Santos • 1st</p>
                      <p className="text-[10px] text-slate-500">Backend / Frontend & AI Developer</p>
                   </div>
                </div>

                <form onSubmit={handleSendMessage} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative group">
                        <label className="absolute left-0 -top-3 text-[10px] font-bold text-[#0a66c2] uppercase tracking-widest bg-white px-1">Subject</label>
                        <input 
                          type="text" 
                          required
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="Ex: Opportunity for Collaboration"
                          className="w-full border-b border-slate-200 py-2 text-sm outline-none focus:border-[#0a66c2] transition-colors placeholder:text-slate-300"
                        />
                      </div>
                      <div className="relative group">
                        <label className="absolute left-0 -top-3 text-[10px] font-bold text-[#0a66c2] uppercase tracking-widest bg-white px-1">Your Email (Required)</label>
                        <input 
                          type="email" 
                          required
                          value={senderEmail}
                          onChange={(e) => setSenderEmail(e.target.value)}
                          placeholder="Ex: your@email.com"
                          className="w-full border-b border-slate-200 py-2 text-sm outline-none focus:border-[#0a66c2] transition-colors placeholder:text-slate-300"
                        />
                      </div>
                   </div>

                   <div className="relative group pt-4">
                      <label className="absolute left-0 top-1 text-[10px] font-bold text-[#0a66c2] uppercase tracking-widest bg-white px-1">Message Body</label>
                      <textarea 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        placeholder="Write your message here..."
                        className="w-full min-h-[200px] border border-slate-200 rounded-lg p-4 mt-4 text-sm outline-none focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] transition-all resize-none placeholder:text-slate-300"
                      />
                   </div>

                   {/* Attachment Previews - Main Form */}
                   {attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2 py-3">
                        {attachments.map((file, i) => (
                          <div key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                            {file.type === 'application/pdf' ? <FileText className="w-3.5 h-3.5 text-red-500" /> : <ImageIcon className="w-3.5 h-3.5 text-blue-500" />}
                            <span className="text-[10px] font-medium text-slate-600 max-w-[150px] truncate">{file.name}</span>
                            <button 
                              type="button" 
                              onClick={() => removeAttachment(i)}
                              className="text-slate-400 hover:text-red-500"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                   )}

                   <div className="flex items-center justify-between pt-4">
                      <div className="flex gap-4 text-slate-400">
                         <button 
                            type="button" 
                            onClick={() => fileInputRef.current?.click()}
                            className="hover:text-[#0a66c2] transition-colors p-1 hover:bg-slate-50 rounded"
                         >
                            <Paperclip className="w-5 h-5" />
                         </button>
                         <button type="button" className="hover:text-[#0a66c2] transition-colors"><Plus className="w-5 h-5" /></button>
                         <button type="button" className="hover:text-[#0a66c2] transition-colors"><Briefcase className="w-5 h-5" /></button>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <AnimatePresence>
                          {sent && (
                            <motion.span 
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0 }}
                              className="text-xs text-emerald-600 font-bold flex items-center gap-1"
                            >
                              <Check className="w-4 h-4" /> Sent!
                            </motion.span>
                          )}
                        </AnimatePresence>
                        <button 
                           type="submit"
                           disabled={isSending}
                           className="bg-[#0a66c2] text-white px-8 py-2 rounded-full font-bold text-sm hover:bg-[#004182] transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                        >
                           {isSending ? 'Sending...' : 'Send InMail'}
                           {!isSending && <Send className="w-4 h-4" />}
                        </button>
                      </div>
                   </div>
                </form>
              </div>

              <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center gap-3">
                 <div className="p-2 bg-emerald-100 rounded text-emerald-700">
                    <Linkedin className="w-4 h-4 fill-current" />
                 </div>
                 <p className="text-[10px] text-slate-500 leading-tight">
                    Professional messaging. This InMail is powered by your interest in working together. 
                    <br />
                    <span className="font-bold text-[#0a66c2] cursor-pointer hover:underline">Learn more about Miguel's availability.</span>
                 </p>
              </div>
            </div>

          </div>

          {/* Side Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-slate-900">Profile language</h3>
               </div>
               <p className="text-xs text-slate-500">English</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-slate-900">Public profile & URL</h3>
               </div>
               <a 
                  href="https://linkedin.com/in/miguel-sant0s" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-[#0a66c2] hover:underline truncate block"
                >
                  linkedin.com/in/miguel-sant0s
                </a>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
               <h3 className="text-sm font-bold text-slate-900 mb-4">People you may know</h3>
               <div className="space-y-6">
                  {[
                    { name: 'Cristiano Ronaldo', role: 'Atleta', img: '/cr7.webp' },
                    { name: 'André Ventura', role: 'Político', img: '/andreventura.jpg' },
                    { name: 'Elon Musk', role: 'X CEO', img: '/elon.jpg' }
                  ].map(person => (
                    <div key={person.name} className="flex gap-3 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                       <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 shrink-0">
                          <img src={person.img} className="w-full h-full object-cover" />
                       </div>
                        <div>
                           <p className="text-xs font-bold text-slate-900">{person.name}</p>
                           <p className="text-[10px] text-slate-500 mb-2 leading-tight">{person.role}</p>
                           <button 
                              onClick={() => handleConnectPerson(person.name)}
                              disabled={connectedPeople[person.name]}
                              className={`px-3 py-1 border rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                                 connectedPeople[person.name]
                                 ? 'border-slate-300 text-slate-400 bg-slate-50'
                                 : 'border-slate-500 text-slate-600 hover:bg-slate-50 hover:border-slate-900'
                              }`}
                           >
                              {connectedPeople[person.name] ? (
                                 <><Check className="w-3 h-3" /> Pending</>
                              ) : (
                                 <><Plus className="w-3 h-3" /> Connect</>
                              )}
                           </button>
                        </div>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-4 py-1.5 text-slate-500 text-sm font-bold hover:bg-slate-50 rounded transition-colors flex items-center justify-center gap-1">
                  Show all <ChevronRight className="w-4 h-4" />
               </button>
             </div>
           </div>
          </div>
      </div>

      {/* Messaging Widget */}
      <div className="fixed bottom-0 right-4 sm:right-12 z-1000 w-72 sm:w-80 shadow-2xl overflow-hidden rounded-t-xl border border-slate-300 border-b-0">
         <div 
            onClick={() => setIsMessagingOpen(!isMessagingOpen)}
            className="bg-white px-4 py-2 flex items-center justify-between cursor-pointer border-b border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
         >
            <div className="flex items-center gap-2">
               <div className="relative">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                    <img src="/icon.png" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
               </div>
               <span className="text-xs font-bold text-slate-700">Messaging</span>
            </div>
            <div className="flex items-center gap-3 text-slate-500">
               <MoreHorizontal className="w-4 h-4" />
               <ExternalLink className="w-3.5 h-3.5" />
               {isMessagingOpen ? <Minus className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 -rotate-90" />}
            </div>
         </div>

         <AnimatePresence>
            {isMessagingOpen && (
               <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: 520 }}
                  exit={{ height: 0 }}
                  className="bg-white flex flex-col"
               >
                  <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4 no-scrollbar">
                     <div className="flex flex-col items-center py-4 border-b border-slate-200 mb-2">
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 mb-2 shadow-sm">
                          <img src="/icon.png" className="w-full h-full object-cover" />
                        </div>
                        <p className="text-xs font-bold text-slate-900">Miguel Santos</p>
                        <p className="text-[9px] text-slate-500 text-center px-4 leading-tight opacity-75">
                           Backend / Frontend & AI Developer
                        </p>
                     </div>

                     {sent && (
                        <motion.div 
                           initial={{ opacity: 0, scale: 0.9, y: 10 }}
                           animate={{ opacity: 1, scale: 1, y: 0 }}
                           className="bg-emerald-50 text-emerald-700 p-3 rounded-lg text-xs flex items-center gap-2 border border-emerald-100 shadow-sm"
                        >
                           <Check className="w-4 h-4" /> Message sent! Check your email.
                        </motion.div>
                     )}
                     
                     <div className="text-[10px] text-slate-400 text-center uppercase tracking-widest py-2">
                        May 7, 2026
                     </div>

                     <div className="space-y-4">
                        {[
                          { sender: 'Miguel Santos', text: "Olá! Obrigado por visitares o meu perfil. 👋", time: '09:00 AM' },
                          { isSystem: true, text: "Miguel Santos accepted your connection request" },
                          { sender: 'Miguel Santos', text: "Estou disponível para novos desafios em Backend e AI. Se tiveres algum projeto em mente, diz-me!", time: '09:05 AM' },
                          { sender: 'Miguel Santos', text: "Podes também anexar documentos se precisares que eu analise algo. Estarei por aqui!", time: '09:06 AM' }
                        ].map((msg, i) => (
                           msg.isSystem ? (
                             <div key={i} className="flex justify-center my-2">
                                <span className="text-[9px] bg-white/50 text-slate-400 px-3 py-1 rounded-full border border-slate-100 italic">
                                   {msg.text}
                                </span>
                             </div>
                           ) : (
                             <div key={i} className="flex gap-2">
                                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white shadow-sm">
                                   <img src="/icon.png" className="w-full h-full object-cover" />
                                </div>
                                <div className="max-w-[85%] p-3 rounded-2xl text-[11px] leading-relaxed shadow-sm bg-white border border-slate-100 text-slate-700 rounded-tl-none">
                                   <p>{msg.text}</p>
                                   <p className="text-[9px] mt-1 text-right opacity-50">{msg.time}</p>
                                </div>
                             </div>
                           )
                        ))}
                        <div ref={messagesEndRef} />
                     </div>
                  </div>

                  <form onSubmit={handleSendMessage} className="p-0 border-t border-slate-200 bg-white">
                     <div className="px-3 py-2 border-b border-slate-100 flex gap-2">
                        <input 
                           type="text"
                           value={subject}
                           onChange={(e) => setSubject(e.target.value)}
                           placeholder="Subject"
                           className="flex-1 text-[11px] font-bold outline-none bg-transparent placeholder:text-slate-400 text-slate-700"
                        />
                        <input 
                           type="email"
                           required
                           value={senderEmail}
                           onChange={(e) => setSenderEmail(e.target.value)}
                           placeholder="Your Email"
                           className="w-24 text-[10px] outline-none bg-slate-50 px-2 py-0.5 rounded border border-slate-100 placeholder:text-slate-400 text-slate-700 focus:border-[#0a66c2]/30"
                        />
                     </div>
                     <div className="p-3">
                        <textarea 
                           value={message}
                           onChange={(e) => setMessage(e.target.value)}
                           placeholder="Write a message..."
                           className="w-full text-xs outline-none bg-transparent resize-none h-24 placeholder:text-slate-400 font-sans"
                        />

                        {/* Attachment Previews - Widget */}
                        {attachments.length > 0 && (
                          <div className="flex flex-wrap gap-1 pb-2 border-b border-slate-50 mb-2">
                            {attachments.map((file, i) => (
                              <div key={i} className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-2 py-1 rounded text-[9px] text-slate-500">
                                {file.type === 'application/pdf' ? <FileText className="w-3 h-3 text-red-500" /> : <ImageIcon className="w-3 h-3 text-blue-500" />}
                                <span className="max-w-[80px] truncate">{file.name}</span>
                                <X className="w-2.5 h-2.5 cursor-pointer hover:text-red-500" onClick={() => removeAttachment(i)} />
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-100">
                           <div className="flex gap-3 text-slate-400">
                              <button 
                                type="button" 
                                onClick={() => fileInputRef.current?.click()}
                                className="hover:text-slate-600 transition-colors"
                              >
                                <Paperclip className="w-4 h-4" />
                              </button>
                              <MessageSquare className="w-4 h-4 cursor-pointer hover:text-slate-600 transition-colors" />
                           </div>
                           <button 
                              type="submit"
                              disabled={!message.trim() || !subject.trim() || isSending}
                              className="bg-[#0a66c2] text-white px-4 py-1 rounded-full text-xs font-bold disabled:opacity-50 disabled:bg-slate-400 flex items-center gap-2 hover:bg-[#004182] transition-all active:scale-95"
                           >
                              {isSending ? (
                                 <>
                                    <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                       <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                    </svg>
                                    Sending...
                                 </>
                              ) : (
                                 <>
                                    <Send className="w-3 h-3" />
                                    Send
                                 </>
                              )}
                           </button>
                        </div>
                     </div>
                  </form>
               </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* Premium Contact Info Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden border border-white/20"
            >
              {/* Decorative Header Background */}
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#0a66c2] via-[#004182] to-[#0a66c2] opacity-10 blur-3xl -z-10" />
              
              <div className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-6 border-b border-slate-100/50">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full border-2 border-[#0a66c2] p-0.5 overflow-hidden shadow-sm">
                      <img src="/icon.png" className="w-full h-full rounded-full object-cover" />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight">Miguel Santos</h3>
                      <p className="text-[10px] text-[#0a66c2] font-bold uppercase tracking-widest">Connect with me</p>
                   </div>
                </div>
                <button 
                  onClick={() => {
                    if (showEmailForm) {
                      setShowEmailForm(false);
                    } else {
                      setIsContactModalOpen(false);
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <AnimatePresence mode="wait">
                  {!showEmailForm ? (
                    <motion.div 
                      key="links"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="grid gap-4"
                    >
                  {[{ 
                      label: 'LinkedIn Profile', 
                      value: 'linkedin.com/in/miguel-sant0s', 
                      link: 'https://linkedin.com/in/miguel-sant0s',
                      icon: <Linkedin className="w-5 h-5" />,
                      color: 'text-[#0a66c2]',
                      bg: 'bg-blue-50'
                    },
                    { 
                      label: 'Professional Email', 
                      value: 'migasmps2005@gmail.com', 
                      link: 'mailto:migasmps2005@gmail.com',
                      icon: <MessageSquare className="w-5 h-5" />,
                      color: 'text-[#0a66c2]',
                      bg: 'bg-blue-50'
                    },
                    { 
                      label: 'WhatsApp Direct', 
                      value: 'Click to open chat', 
                      link: 'https://wa.me/351912345678',
                      icon: <MessageCircle className="w-5 h-5 fill-current" />,
                      color: 'text-emerald-500',
                      bg: 'bg-emerald-50'
                    }
                  ].map((contact, idx) => (
                    <React.Fragment key={idx}>
                      {contact.label === 'Professional Email' ? (
                        <div
                          onClick={() => setShowEmailForm(true)}
                          className="group flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:border-[#0a66c2]/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer"
                        >
                          <div className={`p-3 ${contact.bg} ${contact.color} rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                             {contact.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{contact.label}</p>
                            <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-[#0a66c2] transition-colors">{contact.value}</p>
                          </div>
                          <div className="text-slate-300 group-hover:text-[#0a66c2] transition-colors">
                            <MessageSquare className="w-4 h-4" />
                          </div>
                        </div>
                      ) : (
                        <motion.a
                          href={contact.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="group flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:border-[#0a66c2]/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                        >
                          <div className={`p-3 ${contact.bg} ${contact.color} rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                             {contact.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{contact.label}</p>
                            <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-[#0a66c2] transition-colors">{contact.value}</p>
                          </div>
                          <div className="text-slate-300 group-hover:text-[#0a66c2] transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </div>
                        </motion.a>
                      )}
                    </React.Fragment>
                  ))}
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      onSubmit={handleSendEmail}
                      className="space-y-4"
                    >
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nome Completo</label>
                          <input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            disabled={isSending || sendStatus === 'success'}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/50 focus:border-[#0a66c2] transition-all disabled:opacity-50"
                            placeholder="Ex: João Silva"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Seu Email</label>
                          <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            disabled={isSending || sendStatus === 'success'}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/50 focus:border-[#0a66c2] transition-all disabled:opacity-50"
                            placeholder="Ex: joao@empresa.com"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Mensagem</label>
                          <textarea 
                            required
                            rows={3}
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            disabled={isSending || sendStatus === 'success'}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/50 focus:border-[#0a66c2] transition-all resize-none disabled:opacity-50"
                            placeholder="Olá Miguel, gostava de falar contigo sobre..."
                          />
                        </div>
                      </div>

                      {sendStatus === 'error' && (
                        <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100">
                          {errorMessage}
                        </div>
                      )}

                      {sendStatus === 'success' && (
                        <div className="p-3 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg border border-emerald-100 flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          Enviada! Verifica o teu email.
                        </div>
                      )}

                      <div className="pt-2">
                        <button 
                          type="submit"
                          disabled={isSending || sendStatus === 'success'}
                          className="w-full py-3 bg-[#0a66c2] text-white rounded-xl font-bold text-sm hover:bg-[#004182] hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                        >
                          {isSending ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                              Enviando...
                            </>
                          ) : sendStatus === 'success' ? (
                            'Enviado'
                          ) : (
                            'Enviar Mensagem Segura'
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                <div className="pt-4 pb-2">
                   <p className="text-[11px] text-center text-slate-400 font-medium">
                      Available for freelance opportunities and full-time positions.
                   </p>
                </div>
              </div>

              <div className="bg-slate-50/50 px-8 py-5 flex items-center justify-between border-t border-slate-100">
                <span className="text-[10px] text-slate-400 font-medium">© 2024 Miguel Santos Hub</span>
                <button 
                  onClick={() => setIsContactModalOpen(false)}
                  className="px-8 py-2.5 bg-[#0a66c2] text-white rounded-xl font-bold text-sm hover:bg-[#004182] hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all duration-200"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
