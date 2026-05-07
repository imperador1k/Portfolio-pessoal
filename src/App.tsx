import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import CareerMarathon from './components/CareerMarathon';
import Certifications from './components/Certifications';
import AboutMe from './components/AboutMe';
import GithubProfile from './components/GithubProfile';
import LinkedInProfile from './components/LinkedInProfile';
import Footer from './components/Footer';
import MouseGradient from './components/MouseGradient';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <MouseGradient />
      <Navbar />
      <main>
        <Hero />
        <AboutMe />
        <CareerMarathon />
        <Certifications />
        <Skills />
        <GithubProfile />
        <LinkedInProfile />
      </main>
      <Footer />
    </div>
  );
}

export default App;
