import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import CareerMarathon from './components/CareerMarathon';
import Certifications from './components/Certifications';
import AboutMe from './components/AboutMe';
import LocationMap from './components/LocationMap';
import GithubProfile from './components/GithubProfile';
import LinkedInProfile from './components/LinkedInProfile';
import YoutubeProfile from './components/YoutubeProfile';
import SpotifyProfile from './components/SpotifyProfile';
import ClaudeChat from './components/ClaudeChat';
import ResumeView from './components/ResumeView';
import TrustReviews from './components/TrustReviews';
import TechStackSlider from './components/TechStackSlider';
import Footer from './components/Footer';
import MouseGradient from './components/MouseGradient';
import SupportModal from './components/SupportModal';

function App() {
  return (
    <div className="min-h-screen bg-white">
        <div className="animate-in fade-in duration-700">
          <MouseGradient />
          <Navbar />
          <main>
            <Hero />
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
          </main>
          <Footer />
          <SupportModal />
        </div>
    </div>
  );
}

export default App;
