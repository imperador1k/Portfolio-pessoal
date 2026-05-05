import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-[#f8fafc] text-slate-900 font-sans selection:bg-gradient-to-r selection:from-purple-500 selection:to-pink-500 selection:text-white min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Background blurs & Textures */}
      <div className="fixed inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] opacity-30 pointer-events-none -z-20"></div>
      <div className="fixed top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-gradient-to-br from-purple-500/10 via-pink-400/5 to-transparent blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-tr from-cyan-500/10 via-emerald-400/5 to-transparent blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="fixed top-[40%] left-[20%] w-[600px] h-[600px] bg-gradient-to-tr from-orange-400/5 to-transparent blur-[120px] rounded-full pointer-events-none -z-10"></div>

      
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
    </div>
  );
}
