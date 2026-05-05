import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-purple-500 selection:text-white min-h-screen flex flex-col">
      {/* Background blurs */}
      <div className="fixed top-[-100px] right-[-100px] w-[500px] h-[500px] bg-gradient-to-br from-purple-400 to-pink-300 blur-[120px] opacity-10 rounded-full pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-gradient-to-tr from-cyan-400 to-emerald-300 blur-[100px] opacity-10 rounded-full pointer-events-none -z-10"></div>

      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <Skills />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
