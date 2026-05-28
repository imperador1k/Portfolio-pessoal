import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Layout, 
  Star, 
  GitFork, 
  MapPin, 
  Link as LinkIcon, 
  Twitter, 
  ChevronDown,
  Search,
  Plus,
  Scale
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const allRepos = [
  {
    name: 'Nyro',
    description: 'Nyro is a next generation athlete platform designed to help people push limits, track performance, build consistency, and evolve every single day.',
    language: 'Kotlin',
    languageColor: '#A97BFF',
    stars: 124,
    forks: 18,
    isPublic: true,
    updated: '6 hours ago',
    license: 'Apache License 2.0'
  },
  {
    name: 'Duolingo-Site',
    description: 'Um Site Dedicado para o site público do MyDuolingo',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 89,
    forks: 12,
    isPublic: true,
    updated: '16 hours ago'
  },
  {
    name: 'es',
    description: 'A React-Native app for all students! Enjoy the process :)',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 45,
    forks: 5,
    isPublic: true,
    updated: 'yesterday',
    tags: ['school', 'school-education', 'school-management-system']
  },
  {
    name: 'organizaS',
    description: 'Um software focado em organizar de forma simples agendas e horários',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 12,
    forks: 3,
    isPublic: true,
    updated: '4 days ago',
    tags: ['planner', 'scheduler', 'organizer']
  }
];

const achievements = [
  { id: 1, name: 'Arctic Code Vault Contributor', emoji: '❄️' },
  { id: 2, name: 'GitHub Star', emoji: '🌟' },
  { id: 3, name: 'Pull Shark', emoji: '🦈' },
  { id: 4, name: 'Quickdraw', emoji: '🏹' },
];

const projectsData = [
  {
    name: 'Nyro Roadmap 2026',
    description: 'Product planning, feature prioritization, and engineering milestones for the Nyro ecosystem.',
    status: 'Open',
    updated: '2 days ago',
    progress: 75,
    items: 24,
    isPublic: true
  }
];

const packagesData = [
  {
    name: 'nyro-android-sdk',
    description: 'Official Android SDK for integrating Nyro fitness tracking into 3rd party apps.',
    type: 'NPM',
    downloads: '1.2k',
    updated: '5 days ago'
  }
];

const starredRepos = [
  {
    name: 'architecture-samples',
    owner: 'android',
    description: 'A collection of samples to discuss and showcase different architectural tools and patterns for Android apps.',
    language: 'Kotlin',
    languageColor: '#A97BFF',
    stars: '45.2k',
    updated: '2 hours ago'
  },
  {
    name: 'compose-samples',
    owner: 'android',
    description: 'Official Jetpack Compose samples by the Android team.',
    language: 'Kotlin',
    languageColor: '#A97BFF',
    stars: '18.9k',
    updated: 'Yesterday'
  }
];

export default function GithubProfile() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = React.useState<'overview' | 'repositories' | 'projects' | 'packages' | 'stars'>('overview');
  const [isFollowing, setIsFollowing] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('github_followed') === 'true';
    }
    return false;
  });

  const toggleFollow = () => {
    const newState = !isFollowing;
    setIsFollowing(newState);
    localStorage.setItem('github_followed', String(newState));
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-100 relative z-10" id="github">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="px-3 py-1 bg-jb-primary/10 text-jb-primary text-[10px] font-mono font-bold rounded-full tracking-wider uppercase">
              {t('github.badge')}
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-jb-primary/20 to-transparent" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight"
          >
            {t('github.title_main')} <span className="text-slate-400 font-light">{t('github.title_highlight')}</span>
          </motion.h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl font-light">
            {t('github.description')}
          </p>
        </div>
        
        {/* GitHub Mock Header Tabs */}
        <div className="flex items-center gap-6 border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', name: t('github.tabs.overview'), icon: <BookOpen className="w-4 h-4" /> },
            { id: 'repositories', name: t('github.tabs.repositories'), icon: <Layout className="w-4 h-4" />, count: allRepos.length },
            { id: 'projects', name: t('github.tabs.projects'), icon: <Layout className="w-4 h-4" /> },
            { 
              id: 'packages', 
              name: t('github.tabs.packages'), 
              icon: (
                <svg data-component="Octicon" aria-hidden="true" focusable="false" className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                  <path d="m8.878.392 5.25 3.045c.54.314.872.89.872 1.514v6.098a1.75 1.75 0 0 1-.872 1.514l-5.25 3.045a1.75 1.75 0 0 1-1.756 0l-5.25-3.045A1.75 1.75 0 0 1 1 11.049V4.951c0-.624.332-1.201.872-1.514L7.122.392a1.75 1.75 0 0 1 1.756 0ZM7.875 1.69l-4.63 2.685L8 7.133l4.755-2.758-4.63-2.685a.248.248 0 0 0-.25 0ZM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432Zm6.25 8.271 4.625-2.683a.25.25 0 0 0 .125-.216V5.677L8.75 8.432Z"></path>
                </svg>
              ) 
            },
            { id: 'stars', name: t('github.tabs.stars'), icon: <Star className="w-4 h-4" />, count: 128 },
          ].map((tab) => (
            <div 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3 py-4 text-sm font-sans cursor-pointer whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id 
                  ? 'border-[#FD8C73] text-slate-900 font-semibold' 
                  : 'border-transparent text-slate-500 hover:border-slate-300'
              }`}
            >
              {tab.icon}
              {tab.name}
              {tab.count && (
                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs font-medium">
                  {tab.count}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="relative group mb-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full aspect-square rounded-full border border-slate-200 overflow-hidden shadow-sm"
              >
                <img src="/git.png" alt="Profile" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </motion.div>
              <div className="absolute bottom-4 right-4 w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:bg-slate-50">
                 <span className="text-xl">🏃‍♂️</span>
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900">Miguel Santos</h1>
              <p className="text-xl text-slate-500 font-light">imperador1k</p>
            </div>

            <button 
              onClick={toggleFollow}
              className={`w-full py-2 border rounded-md text-sm font-semibold transition-all active:scale-[0.98] mb-6 ${
                isFollowing 
                  ? 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              {isFollowing ? t('github.profile.unfollow') : t('github.profile.follow')}
            </button>

            <div className="space-y-4 mb-8">
              <p className="text-sm text-slate-800">
                {t('github.profile.bio')}
              </p>
              
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="w-4 h-4" />
                <span>{t('github.profile.location')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <LinkIcon className="w-4 h-4" />
                <a href="#" className="hover:text-jb-primary hover:underline font-semibold">imperador.dev</a>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <h2 className="text-sm font-semibold text-slate-900 mb-4">{t('github.profile.achievements')}</h2>
              <div className="flex flex-wrap gap-2">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="group relative">
                    <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-xl bg-white hover:border-jb-primary transition-colors cursor-help">
                      {achievement.emoji}
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {achievement.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:flex-1">
            {activeTab === 'overview' ? (
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-slate-900">{t('github.overview.pinned')}</h2>
                  <span className="text-xs text-slate-500 cursor-pointer hover:text-jb-primary">{t('github.overview.customize')}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allRepos.slice(0, 4).map((repo) => (
                    <motion.div 
                      key={repo.name}
                      whileHover={{ borderColor: '#0969da' }}
                      className="bg-white border border-slate-200 rounded-md p-4 flex flex-col hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-slate-500" />
                          <a 
                            href={`https://github.com/imperador1k/${repo.name}`} 
                            target="_blank"
                            className="text-sm font-semibold text-[#0969da] hover:underline"
                          >
                            {repo.name}
                          </a>
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-slate-200 text-slate-500 uppercase">
                            {t('github.repositories.public')}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 mb-4 flex-1 line-clamp-2">
                        {repo.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: repo.languageColor }}
                          />
                          <span>{repo.language}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5" />
                          <span>{repo.stars}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5" />
                          <span>{repo.forks}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Contribution Graph */}
                <div className="mt-10 border border-slate-200 rounded-md p-4 overflow-hidden bg-white">
                  <h2 className="text-sm font-semibold text-slate-900 mb-4">842 {t('github.overview.contributions')}</h2>
                  <div className="flex gap-1 overflow-x-auto no-scrollbar">
                      {Array.from({ length: 52 }).map((_, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-1">
                          {Array.from({ length: 7 }).map((_, dayIndex) => {
                            const intensity = Math.random();
                            let color = '#ebedf0';
                            if (intensity > 0.8) color = '#216e39';
                            else if (intensity > 0.6) color = '#30a14e';
                            else if (intensity > 0.4) color = '#40c463';
                            else if (intensity > 0.2) color = '#9be9a8';
                            
                            return (
                              <div 
                                key={dayIndex} 
                                className="w-3 h-3 rounded-[2px]" 
                                style={{ backgroundColor: color }}
                              />
                            );
                          })}
                        </div>
                      ))}
                  </div>
                  <div className="flex justify-between items-center mt-2 text-[10px] text-slate-500">
                    <span>{t('github.overview.learn_more')}</span>
                    <div className="flex items-center gap-1">
                      <span>{t('github.overview.less')}</span>
                      <div className="flex gap-1">
                        {['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'].map(c => (
                          <div key={c} className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                      <span>{t('github.overview.more')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeTab === 'repositories' ? (
              <div className="flex flex-col">
                {/* Search & Filters */}
                <div className="flex flex-col sm:flex-row gap-3 border-b border-slate-200 pb-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder={t('github.repositories.search_placeholder')} 
                      className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-jb-primary/20 focus:border-jb-primary/50 transition-all"
                    />
                  </div>
                  <div className="flex gap-2">
                    {[
                      { label: t('github.repositories.type') },
                      { label: t('github.repositories.language') },
                      { label: t('github.repositories.sort') }
                    ].map(filter => (
                      <button key={filter.label} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1">
                        {filter.label} <ChevronDown className="w-3 h-3" />
                      </button>
                    ))}
                    <button className="px-3 py-1.5 bg-[#2da44e] text-white rounded-md text-xs font-semibold hover:bg-[#2c974b] flex items-center gap-1">
                      <Plus className="w-3 h-3" /> {t('github.repositories.new')}
                    </button>
                  </div>
                </div>

                {/* Repo List */}
                <div className="flex flex-col">
                  {allRepos.map((repo, i) => (
                    <div key={repo.name} className={`py-6 flex flex-col sm:flex-row justify-between gap-4 ${i !== allRepos.length - 1 ? 'border-b border-slate-100' : ''}`}>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <a href="#" className="text-xl font-semibold text-[#0969da] hover:underline">{repo.name}</a>
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-slate-200 text-slate-500 uppercase tracking-tighter">{t('github.repositories.public')}</span>
                        </div>
                        <p className="text-sm text-slate-500 mb-4 max-w-2xl">{repo.description}</p>
                        
                        {repo.tags && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {repo.tags.map(tag => (
                              <span key={tag} className="px-2 py-0.5 bg-[#ddf4ff] text-[#0969da] rounded-full text-[10px] font-semibold hover:bg-[#0969da] hover:text-white transition-colors cursor-pointer">{tag}</span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                            <span>{repo.language}</span>
                          </div>
                          {repo.license && (
                            <div className="flex items-center gap-1">
                              <Scale className="w-3 h-3" />
                              <span>{repo.license}</span>
                            </div>
                          )}
                          <span>{t('github.repositories.updated')} {repo.updated}</span>
                        </div>
                      </div>

                      {/* Sparkline Visual */}
                      <div className="hidden sm:flex items-end h-8 w-32 pb-1">
                        <div className="flex items-end gap-[1px] h-full w-full">
                          {Array.from({ length: 30 }).map((_, idx) => (
                            <div 
                              key={idx} 
                              className="flex-1 bg-emerald-500/20 hover:bg-emerald-500 transition-colors rounded-t-[1px]"
                              style={{ height: `${Math.random() * 80 + 20}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : activeTab === 'projects' ? (
              <div className="flex flex-col">
                <div className="flex flex-col sm:flex-row gap-3 border-b border-slate-200 pb-4 mb-8">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder={t('github.projects.search_placeholder')} 
                      className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-jb-primary/20 focus:border-jb-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {projectsData.map(project => (
                    <div key={project.name} className="border border-slate-200 rounded-md p-4 bg-white hover:shadow-sm transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Layout className="w-4 h-4 text-slate-500" />
                            <h3 className="font-semibold text-slate-900">{project.name}</h3>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-slate-200 text-slate-500 uppercase">{project.isPublic ? t('github.repositories.public') : 'Private'}</span>
                          </div>
                          <p className="text-xs text-slate-500">{project.description}</p>
                        </div>
                        <span className="text-xs text-slate-400">{t('github.repositories.updated')} {project.updated}</span>
                      </div>
                      
                      <div className="mt-4 flex items-center gap-4">
                        <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-emerald-500 h-full rounded-full transition-all duration-1000" 
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-medium text-slate-500 whitespace-nowrap">
                          {project.progress}% {t('github.projects.complete')} • {project.items} {t('github.projects.items')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : activeTab === 'packages' ? (
              <div className="flex flex-col items-center py-20 bg-slate-50 border border-slate-200 border-dashed rounded-md">
                 <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center mb-6">
                    <svg data-component="Octicon" aria-hidden="true" focusable="false" className="w-8 h-8 text-slate-400" viewBox="0 0 16 16" fill="currentColor">
                      <path d="m8.878.392 5.25 3.045c.54.314.872.89.872 1.514v6.098a1.75 1.75 0 0 1-.872 1.514l-5.25 3.045a1.75 1.75 0 0 1-1.756 0l-5.25-3.045A1.75 1.75 0 0 1 1 11.049V4.951c0-.624.332-1.201.872-1.514L7.122.392a1.75 1.75 0 0 1 1.756 0ZM7.875 1.69l-4.63 2.685L8 7.133l4.755-2.758-4.63-2.685a.248.248 0 0 0-.25 0ZM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432Zm6.25 8.271 4.625-2.683a.25.25 0 0 0 .125-.216V5.677L8.75 8.432Z"></path>
                    </svg>
                 </div>
                 <h3 className="text-xl font-semibold text-slate-900 mb-2">{t('github.packages.title')}</h3>
                 <p className="text-sm text-slate-500 max-w-sm text-center mb-6">
                    {t('github.packages.description')}
                 </p>
                 <div className="flex gap-4">
                    {packagesData.map(pkg => (
                       <div key={pkg.name} className="bg-white border border-slate-200 rounded-md p-4 text-left w-64 shadow-sm">
                          <h4 className="text-sm font-semibold text-[#0969da] mb-1">{pkg.name}</h4>
                          <p className="text-[10px] text-slate-500 mb-4">{pkg.description}</p>
                          <div className="flex justify-between text-[10px] text-slate-400">
                             <span>{pkg.type}</span>
                             <span>{pkg.downloads} {t('github.packages.downloads')}</span>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
            ) : (
              <div className="flex flex-col">
                 <div className="border-b border-slate-200 pb-4 mb-4">
                    <h3 className="text-sm font-semibold text-slate-900">{t('github.tabs.stars')}</h3>
                 </div>
                 <div className="divide-y divide-slate-100">
                    {starredRepos.map(repo => (
                       <div key={repo.name} className="py-6 flex justify-between items-start">
                          <div>
                             <div className="flex items-center gap-1 mb-1">
                                <a href="#" className="text-sm font-semibold text-[#0969da] hover:underline">{repo.owner} / {repo.name}</a>
                             </div>
                             <p className="text-xs text-slate-500 mb-4 max-w-2xl">{repo.description}</p>
                             <div className="flex items-center gap-4 text-[10px] text-slate-500">
                                <div className="flex items-center gap-1.5">
                                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                                   <span>{repo.language}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                   <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                   <span>{repo.stars}</span>
                                </div>
                                <span>{t('github.repositories.updated')} {repo.updated}</span>
                             </div>
                          </div>
                          <button className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-100">
                             <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" /> {t('github.tabs.stars')}
                          </button>
                       </div>
                    ))}
                 </div>
              </div>
            )
    }
          </div>

        </div>
      </div>
    </section>
  );
}
