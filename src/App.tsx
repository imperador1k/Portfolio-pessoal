import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MouseGradient from './components/MouseGradient';
import SplashScreen from './components/SplashScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SplashScreen isLoading={isLoading} />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ 
            duration: 0.4, 
            ease: "circOut",
            delay: 0.1
        }}
        className="text-jb-dark font-sans selection:bg-jb-primary selection:text-white min-h-screen flex flex-col relative overflow-hidden"
      >
        <MouseGradient />
        {/* Subtle Dot Grid */}
        <div className="fixed inset-0 pointer-events-none -z-20 opacity-[0.4] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,white,transparent,white)]"></div>

        <Navbar />
        <main className="flex-1 flex flex-col relative z-0">
            <Hero />
            <Skills />
            <Projects />
            <Certifications />
            <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
