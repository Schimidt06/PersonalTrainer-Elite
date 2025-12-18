
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TESTIMONIALS } from '../constants';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const SocialProof: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useScrollReveal();
  // Using any to avoid 'Cannot find namespace NodeJS' error in browser environments
  const timeoutRef = useRef<any>(null);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  const goToSlide = (index: number) => {
    resetTimeout();
    setCurrentIndex(index);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(nextSlide, 8000);

    return () => {
      resetTimeout();
    };
  }, [currentIndex, nextSlide, resetTimeout]);

  return (
    <section ref={containerRef as any} className="py-24 bg-zinc-950/50 overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 reveal">
          <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Testemunhos</span>
          <h2 className="text-4xl font-bold mb-4 text-white">Experiências Reais</h2>
          <p className="text-zinc-500">Resultados extraordinários de quem decidiu não aceitar o comum.</p>
        </div>

        <div className="max-w-5xl mx-auto relative reveal stagger-delay-1">
          {/* Viewport for the carousel */}
          <div className="relative overflow-hidden">
            {/* Sliding Track */}
            <div 
              className="flex transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {TESTIMONIALS.map((t, idx) => (
                <div
                  key={t.id}
                  className={`w-full flex-shrink-0 flex flex-col items-center justify-center text-center px-6 md:px-20 min-h-[350px] transition-opacity duration-1000 ${
                    idx === currentIndex ? 'opacity-100' : 'opacity-20'
                  }`}
                >
                  <Quote className={`w-12 h-12 text-gold/10 mb-8 transition-transform duration-1000 delay-300 ${idx === currentIndex ? 'scale-110' : 'scale-90'}`} />
                  <p className={`text-xl md:text-3xl italic text-zinc-200 font-light leading-relaxed mb-10 max-w-3xl transition-all duration-700 delay-200 ${idx === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    "{t.quote}"
                  </p>
                  <div className={`flex flex-col items-center gap-4 transition-all duration-700 delay-500 ${idx === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <div className="relative">
                      <div className={`absolute -inset-1 bg-gold/20 rounded-full blur-sm transition-opacity duration-1000 ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}`}></div>
                      <img 
                        src={t.imageUrl} 
                        alt={t.name} 
                        className="w-20 h-20 rounded-full object-cover grayscale relative z-10 border border-zinc-800" 
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-100 text-lg tracking-tight">{t.name}</h4>
                      <p className="text-[10px] text-gold uppercase tracking-[0.2em] font-black mt-1">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 -left-4 md:-left-16 flex items-center">
            <button 
              onClick={prevSlide}
              className="p-4 text-zinc-700 hover:text-gold transition-all z-20 group bg-zinc-950/50 hover:bg-zinc-900 border border-zinc-900 hover:border-gold/30 rounded-full backdrop-blur-sm shadow-xl"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-6 h-6 group-active:scale-90 transition-transform" />
            </button>
          </div>
          
          <div className="absolute inset-y-0 -right-4 md:-right-16 flex items-center">
            <button 
              onClick={nextSlide}
              className="p-4 text-zinc-700 hover:text-gold transition-all z-20 group bg-zinc-950/50 hover:bg-zinc-900 border border-zinc-900 hover:border-gold/30 rounded-full backdrop-blur-sm shadow-xl"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-6 h-6 group-active:scale-90 transition-transform" />
            </button>
          </div>

          {/* Pagination Dots - Refined with active highlighting and smooth expansion */}
          <div className="flex justify-center items-center gap-3 mt-12">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`group relative h-1.5 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden rounded-full ${
                  i === currentIndex 
                    ? 'w-16 bg-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                    : 'w-4 bg-zinc-800 hover:bg-zinc-700 hover:w-6'
                }`}
                aria-label={`Ir para depoimento ${i + 1}`}
              >
                {/* Active progress bar effect */}
                {i === currentIndex && (
                  <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite_linear]"></div>
                )}
                
                {/* Visual highlight on active state */}
                <div className={`absolute inset-0 transition-opacity duration-700 ${i === currentIndex ? 'opacity-100' : 'opacity-0'} bg-gradient-to-r from-transparent via-white/20 to-transparent`}></div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </section>
  );
};

export default SocialProof;
