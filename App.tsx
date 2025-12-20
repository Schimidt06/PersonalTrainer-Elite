
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
import { Instagram, Linkedin, Mail, Phone, Send, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).tagName === 'A') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
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
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen selection:bg-gold selection:text-black bg-zinc-950 overflow-x-hidden">
      {/* 3D Custom Cursor - Hidden on Touch Devices */}
      <div 
        className={`custom-cursor hidden lg:block ${isHovering ? 'scale-[2.5] bg-gold/10' : ''}`}
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />

      {/* Background 3D Particles Simulation - Reduced for mobile performance */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gold/30 blur-xl animate-float"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>

      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-zinc-800/50 backdrop-blur-lg bg-black/80">
        <div className="container mx-auto px-6 py-4 lg:py-5 flex items-center justify-between">
          <button 
            onClick={scrollToTop}
            className="text-xl lg:text-2xl font-serif font-bold tracking-tighter uppercase cursor-pointer hover:opacity-80 transition-opacity"
          >
            Elite <span className="text-gold">PT</span>
          </button>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 lg:gap-10 text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
            <a href="#method" onClick={(e) => scrollToSection(e, 'method')} className="hover:text-gold transition-colors py-2 border-b border-transparent hover:border-gold/30">Método</a>
            <a href="#apply" onClick={(e) => scrollToSection(e, 'apply')} className="hover:text-gold transition-colors py-2 border-b border-transparent hover:border-gold/30">Aplicação</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-gold transition-colors py-2 border-b border-transparent hover:border-gold/30">Contato</a>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={(e) => scrollToSection(e, 'apply')}
              className="hidden sm:block px-5 lg:px-6 py-2.5 lg:py-3 bg-gold text-black text-[9px] lg:text-[10px] font-black rounded-sm uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-gold/5"
            >
              Começar Agora
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-zinc-400 hover:text-gold"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <div className={`fixed inset-0 bg-zinc-950 z-[60] transition-transform duration-500 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full p-8">
            <div className="flex justify-between items-center mb-16">
              <span className="text-2xl font-serif font-bold uppercase">Elite <span className="text-gold">PT</span></span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2"><X className="w-8 h-8" /></button>
            </div>
            <div className="flex flex-col gap-8 text-xl font-bold uppercase tracking-[0.2em]">
              <a href="#method" onClick={(e) => scrollToSection(e, 'method')} className="text-zinc-400 hover:text-gold">Método</a>
              <a href="#depoimentos" onClick={(e) => scrollToSection(e, 'depoimentos')} className="text-zinc-400 hover:text-gold">Resultados</a>
              <a href="#apply" onClick={(e) => scrollToSection(e, 'apply')} className="text-zinc-400 hover:text-gold">Aplicação</a>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-zinc-400 hover:text-gold">Contato</a>
            </div>
            <div className="mt-auto pb-12">
              <button 
                onClick={(e) => scrollToSection(e, 'apply')}
                className="w-full py-5 bg-gold text-black font-black uppercase tracking-widest text-xs"
              >
                Solicitar Vaga
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-16">
        <section id="home"><Hero /></section>
        <section id="sobre"><PremiumPositioning /></section>
        <Qualify />
        <section id="method"><Methodology /></section>
        <StrategicRoadmap />
        <section id="depoimentos"><SocialProof /></section>
        <section id="exclusivo"><Exclusivity /></section>
        <section id="apply"><ApplicationAI /></section>
        <section id="faq"><FAQ /></section>
      </main>

      <footer id="contact" className="bg-zinc-950 pt-24 pb-12 border-t border-zinc-900 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-24">
            <div className="max-w-xs mx-auto md:mx-0 text-center md:text-left">
              <div className="text-3xl font-serif font-bold tracking-tighter uppercase mb-6">
                Elite <span className="text-gold">PT</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                Transformação física personalizada para quem exige o mais alto nível de performance, privacidade e exclusividade.
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 border border-zinc-800 rounded-full hover:border-gold transition-all text-zinc-500 hover:text-gold">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 border border-zinc-800 rounded-full hover:border-gold transition-all text-zinc-500 hover:text-gold">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:contato@elitept.com.br" className="p-3 border border-zinc-800 rounded-full hover:border-gold transition-all text-zinc-500 hover:text-gold">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:col-span-2 md:grid-cols-3 gap-8">
              <div className="col-span-1">
                <h4 className="font-bold mb-6 text-zinc-100 uppercase text-xs tracking-widest">Navegação</h4>
                <ul className="space-y-4 text-sm text-zinc-500">
                  <li><button onClick={scrollToTop} className="hover:text-gold transition-colors">Topo</button></li>
                  <li><button onClick={(e) => scrollToSection(e, 'method')} className="hover:text-gold transition-colors text-left">Método</button></li>
                  <li><button onClick={(e) => scrollToSection(e, 'apply')} className="hover:text-gold transition-colors text-left">Aplicação</button></li>
                </ul>
              </div>
              <div className="col-span-1">
                <h4 className="font-bold mb-6 text-zinc-100 uppercase text-xs tracking-widest">Suporte</h4>
                <ul className="space-y-4 text-sm text-zinc-500">
                  <li><button onClick={(e) => scrollToSection(e, 'faq')} className="hover:text-gold transition-colors text-left">FAQ</button></li>
                  <li><a href="mailto:suporte@elitept.com.br" className="hover:text-gold transition-colors">Canal Aluno</a></li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h4 className="font-bold mb-6 text-zinc-100 uppercase text-xs tracking-widest">Atendimento</h4>
                <p className="text-sm text-zinc-500 leading-relaxed italic">
                  Presencial em SP e Online Global.
                </p>
                <p className="text-sm text-gold font-medium mt-2">contato@elitept.com.br</p>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-zinc-900 text-center text-[9px] text-zinc-700 uppercase tracking-[0.3em]">
            <p>&copy; {new Date().getFullYear()} Elite Personal Training. Design de Excelência.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
         <button 
            onClick={(e) => scrollToSection(e, 'apply')}
            className="w-14 h-14 flex items-center justify-center bg-gold text-black rounded-full shadow-2xl shadow-gold/20 animate-bounce"
          >
            <Send className="w-6 h-6" />
          </button>
      </div>
    </div>
  );
};

export default App;
