
import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [active, setActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setActive(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || window.innerWidth < 1024) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: x * 10, y: y * -10 });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className={`absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[4s] ${active ? 'scale-110' : 'scale-100'}`}
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2070&auto=format&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-black/80 lg:bg-black/60 bg-gradient-to-b from-zinc-950/20 via-transparent to-zinc-950"></div>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{ 
          transform: window.innerWidth > 1024 ? `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` : 'none',
          transition: 'transform 0.1s ease-out'
        }}
        className="container mx-auto px-6 relative z-10 text-center max-w-4xl pt-20"
      >
        <span 
          className={`inline-block px-4 py-1.5 mb-8 border border-gold/30 bg-gold/5 text-gold text-[10px] lg:text-xs tracking-[0.3em] uppercase rounded-full transition-all duration-1000 transform ${active ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
        >
          Consultoria de Alto Padrão
        </span>
        <h1 
          className={`text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 leading-[1.1] text-white transition-all duration-1000 delay-300 transform ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          A ciência do movimento para <span className="gold-gradient">corpos de elite.</span>
        </h1>
        <p 
          className={`text-base lg:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed transition-all duration-1000 delay-500 transform ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          Metodologia individualizada para quem não se contenta com o básico. Sua melhor versão exige precisão.
        </p>
        <div 
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-700 transform ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <a 
            href="#apply" 
            className="w-full sm:w-auto px-10 py-5 bg-gold text-black text-sm font-black rounded-sm flex items-center justify-center gap-3 uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-gold/20"
          >
            Aplicar Vaga
            <ArrowRight className="w-4 h-4" />
          </a>
          <a 
            href="#method" 
            className="w-full sm:w-auto px-10 py-5 border border-zinc-700 hover:bg-zinc-800 text-white text-sm font-bold rounded-sm backdrop-blur-md transition-all"
          >
            Ver Método
          </a>
        </div>
      </div>
      
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-1000 delay-1000 hidden md:block ${active ? 'opacity-60' : 'opacity-0'}`}>
        <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent animate-pulse"></div>
      </div>
    </section>
  );
};

export default Hero;
