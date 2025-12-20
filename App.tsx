
import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import PremiumPositioning from './components/PremiumPositioning';
import Qualify from './components/Qualify';
import Methodology from './components/Methodology';
import StrategicRoadmap from './components/StrategicRoadmap';
import SocialProof from './components/SocialProof';
import Exclusivity from './components/Exclusivity';
import ApplicationAI from './components/ApplicationAI';
import FAQ from './components/FAQ';
import { Instagram, Linkedin, Mail, Menu, X, ChevronUp } from 'lucide-react';

const App: React.FC = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen selection:bg-gold selection:text-black bg-zinc-950">
      <div 
        className={`custom-cursor ${isHovering ? 'scale-[2.5] bg-gold/10' : ''}`}
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />

      <nav className="fixed top-0 left-0 w-full z-[100] border-b border-zinc-800/50 backdrop-blur-xl bg-black/70">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button onClick={scrollToTop} className="text-xl sm:text-2xl font-serif font-bold tracking-tighter uppercase text-white">
            Elite <span className="text-gold">PT</span>
          </button>
          
          <div className="hidden lg:flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
            <a href="#sobre" onClick={(e) => scrollToSection(e, 'sobre')} className="hover:text-gold transition-colors">Conceito</a>
            <a href="#method" onClick={(e) => scrollToSection(e, 'method')} className="hover:text-gold transition-colors">Método</a>
            <a href="#apply" onClick={(e) => scrollToSection(e, 'apply')} className="hover:text-gold transition-colors">Aplicação</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-gold transition-colors">Contato</a>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={(e) => scrollToSection(e, 'apply')} className="hidden sm:block px-6 py-2.5 bg-gold text-black text-[10px] font-black rounded-sm uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all">
              Consultoria
            </button>
            <button className="lg:hidden p-2 text-zinc-400 hover:text-gold" onClick={() => setIsMenuOpen(true)}>
              <Menu />
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[110] bg-zinc-950 transition-transform duration-500 lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-12">
            <span className="text-2xl font-serif font-bold">Elite <span className="text-gold">PT</span></span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2"><X className="w-8 h-8" /></button>
          </div>
          <div className="flex flex-col gap-8 text-2xl font-serif text-white">
            <a href="#sobre" onClick={(e) => scrollToSection(e, 'sobre')}>O Conceito</a>
            <a href="#method" onClick={(e) => scrollToSection(e, 'method')}>Metodologia</a>
            <a href="#apply" onClick={(e) => scrollToSection(e, 'apply')}>Aplicação</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contato</a>
          </div>
        </div>
      </div>

      <main>
        <Hero />
        <section id="sobre"><PremiumPositioning /></section>
        <Qualify />
        <section id="method"><Methodology /></section>
        <StrategicRoadmap />
        <section id="depoimentos"><SocialProof /></section>
        <Exclusivity />
        <section id="apply"><ApplicationAI /></section>
        <FAQ />
      </main>

      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 bg-zinc-900 border border-zinc-800 rounded-full text-gold transition-all duration-300 shadow-2xl ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
      >
        <ChevronUp />
      </button>

      <footer id="contact" className="bg-zinc-950 pt-24 pb-12 border-t border-zinc-900">
        <div className="container mx-auto px-6 text-center">
          <div className="text-3xl font-serif font-bold uppercase mb-8">
            Elite <span className="text-gold">PT</span>
          </div>
          <div className="flex justify-center gap-8 mb-12">
            <a href="#" className="text-zinc-500 hover:text-gold transition-colors"><Instagram /></a>
            <a href="#" className="text-zinc-500 hover:text-gold transition-colors"><Linkedin /></a>
            <a href="#" className="text-zinc-500 hover:text-gold transition-colors"><Mail /></a>
          </div>
          <p className="text-[10px] text-zinc-700 uppercase tracking-[0.4em]">&copy; {new Date().getFullYear()} Elite Personal Training. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
