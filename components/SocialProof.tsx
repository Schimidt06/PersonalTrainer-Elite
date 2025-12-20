
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TESTIMONIALS } from '../constants.tsx';
import { useScrollReveal } from '../hooks/useScrollReveal.ts';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const SocialProof: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useScrollReveal();
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
    <section ref={containerRef as any} className="py-20 lg:py-24 bg-zinc-950/50 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full lg:w-[800px] h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 lg:mb-16 reveal">
          <span className="text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Testemunhos</span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">Experiências Reais</h2>
          <p className="text-zinc-500 text-sm lg:text-base">Resultados extraordinários de quem decidiu não aceitar o comum.</p>
        </div>

        <div className="max-w-5xl mx-auto relative reveal stagger-delay-1">
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {TESTIMONIALS.map((t, idx) => (
                <div
                  key={t.id}
                  className={`w-full flex-shrink-0 flex flex-col items-center justify-center text-center px-4 md:px-20 min-h-[350px] transition-opacity duration-1000 ${
                    idx === currentIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Quote className="w-8 h-8 lg:w-12 lg:h-12 text-gold/10 mb-6 lg:mb-8" />
                  <p className="text-lg md:text-2xl lg:text-3xl italic text-zinc-200 font-light leading-relaxed mb-8 lg:mb-10 max-w-3xl">
                    "{t.quote}"
                  </p>
                  <div className="flex flex-col items-center gap-4">
                    <img 
                      src={t.imageUrl} 
                      alt={t.name} 
                      className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover grayscale border border-zinc-800" 
                    />
                    <div>
                      <h4 className="font-bold text-zinc-100 text-base lg:text-lg tracking-tight">{t.name}</h4>
                      <p className="text-[9px] lg:text-[10px] text-gold uppercase tracking-[0.2em] font-black mt-1">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-0 lg:-left-16 flex items-center">
            <button 
              onClick={prevSlide}
              className="p-3 lg:p-4 text-zinc-500 hover:text-gold transition-all z-20 bg-zinc-900/50 border border-zinc-800 rounded-full"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
          </div>
          
          <div className="absolute inset-y-0 right-0 lg:-right-16 flex items-center">
            <button 
              onClick={nextSlide}
              className="p-3 lg:p-4 text-zinc-500 hover:text-gold transition-all z-20 bg-zinc-900/50 border border-zinc-800 rounded-full"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
          </div>

          <div className="flex justify-center items-center gap-2 lg:gap-3 mt-10">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-1 transition-all duration-700 rounded-full ${
                  i === currentIndex ? 'w-10 lg:w-16 bg-gold' : 'w-2 lg:w-4 bg-zinc-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
