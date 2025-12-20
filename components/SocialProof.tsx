
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TESTIMONIALS } from '../constants';
import { useScrollReveal } from '../hooks/useScrollReveal';
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

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(nextSlide, 8000);
    return () => resetTimeout();
  }, [currentIndex, nextSlide, resetTimeout]);

  return (
    <section ref={containerRef as any} className="py-24 bg-zinc-950/50 overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-16 text-white reveal">Experiências de Elite</h2>
        <div className="max-w-4xl mx-auto relative reveal">
          <div className="relative overflow-hidden min-h-[300px]">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={t.id}
                className={`absolute inset-0 transition-all duration-1000 flex flex-col items-center justify-center ${idx === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}`}
              >
                <Quote className="w-12 h-12 text-gold/10 mb-8" />
                <p className="text-xl md:text-2xl italic text-zinc-200 mb-10 max-w-2xl mx-auto">"{t.quote}"</p>
                <div className="flex flex-col items-center">
                  <img src={t.imageUrl} alt={t.name} className="w-16 h-16 rounded-full mb-4 border border-zinc-800" />
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <p className="text-[10px] text-gold uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 p-4 text-zinc-500 hover:text-gold"><ChevronLeft /></button>
          <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-zinc-500 hover:text-gold"><ChevronRight /></button>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
