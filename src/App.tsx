import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MouseGradient from './components/MouseGradient';

// Lazy loaded components (below the fold)
const AboutMe = React.lazy(() => import('./components/AboutMe'));
const LocationMap = React.lazy(() => import('./components/LocationMap'));
const CareerMarathon = React.lazy(() => import('./components/CareerMarathon'));
const Certifications = React.lazy(() => import('./components/Certifications'));
const Skills = React.lazy(() => import('./components/Skills'));
const GithubProfile = React.lazy(() => import('./components/GithubProfile'));
const LinkedInProfile = React.lazy(() => import('./components/LinkedInProfile'));
const YoutubeProfile = React.lazy(() => import('./components/YoutubeProfile'));
const SpotifyProfile = React.lazy(() => import('./components/SpotifyProfile'));
const ClaudeChat = React.lazy(() => import('./components/ClaudeChat'));
const ResumeView = React.lazy(() => import('./components/ResumeView'));
const TrustReviews = React.lazy(() => import('./components/TrustReviews'));
const TechStackSlider = React.lazy(() => import('./components/TechStackSlider'));
const Footer = React.lazy(() => import('./components/Footer'));
const SupportModal = React.lazy(() => import('./components/SupportModal'));

// Loading Fallback
const Fallback = () => (
  <div className="w-full flex justify-center py-20">
    <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-[#E03C00] animate-spin"></div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-white">
        <div className="animate-in fade-in duration-700">
          <MouseGradient />
          <Navbar />
          <main>
            <Hero />
            <Suspense fallback={<Fallback />}>
              <AboutMe />
              <div className="px-5 sm:px-6 lg:px-10 mb-12">
                <LocationMap />
              </div>
              <CareerMarathon />
              <Certifications />
              <Skills />
              <GithubProfile />
              <LinkedInProfile />
              <YoutubeProfile />
              <SpotifyProfile />
              <ClaudeChat />
              <ResumeView />
              <TrustReviews />
              <TechStackSlider />
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer />
            <SupportModal />
          </Suspense>
        </div>
    </div>
  );
}

export default App;
