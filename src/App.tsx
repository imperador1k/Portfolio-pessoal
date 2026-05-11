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
import ResumeView from './components/ResumeView';
import Footer from './components/Footer';
import MouseGradient from './components/MouseGradient';
import SplashScreen from './components/SplashScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Sync with SplashScreen duration (2800ms) + small buffer for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SplashScreen isLoading={isLoading} />
      
      {!isLoading && (
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
            <ResumeView />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
