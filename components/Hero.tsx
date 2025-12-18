
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
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: x * 10, y: y * -10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden perspective-1000">
      <div 
        className={`absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[3s] ${active ? 'scale-105' : 'scale-100'}`}
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2070&auto=format&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-black/70 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
        className="container mx-auto px-6 relative z-10 text-center max-w-5xl preserve-3d"
      >
        <span 
          className={`inline-block px-4 py-1 mb-6 border border-zinc-700 bg-zinc-900/50 text-zinc-400 text-sm tracking-widest uppercase rounded-full transition-all duration-1000 transform ${active ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
          style={{ transform: 'translateZ(50px)' }}
        >
          Metodologia Exclusiva
        </span>
        <h1 
          className={`text-5xl md:text-7xl font-bold mb-8 leading-tight transition-all duration-1000 delay-300 transform ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transform: 'translateZ(100px)' }}
        >
          Transformação física personalizada para quem <span className="gold-gradient">exige excelência</span>
        </h1>
        <p 
          className={`text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed transition-all duration-1000 delay-500 transform ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transform: 'translateZ(70px)' }}
        >
          Atendimento individual, metodologia baseada em ciência e resultados mensuráveis para sua melhor versão.
        </p>
        <div 
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-700 transform ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transform: 'translateZ(80px)' }}
        >
          <a 
            href="#apply" 
            className="px-8 py-4 bg-gold hover:opacity-90 transition-all text-black font-semibold rounded-sm flex items-center justify-center gap-2 group shadow-[0_20px_40px_rgba(212,175,55,0.2)] hover:shadow-[0_25px_50px_rgba(212,175,55,0.3)]"
          >
            Aplicar para Treinamento Personalizado
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#method" 
            className="px-8 py-4 border border-zinc-700 hover:bg-zinc-800 transition-all text-white font-semibold rounded-sm backdrop-blur-sm"
          >
            Conhecer o Método
          </a>
        </div>
      </div>
      
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-1000 delay-1000 ${active ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-px h-12 bg-gradient-to-b from-zinc-700 to-transparent animate-bounce"></div>
      </div>
    </section>
  );
};

export default Hero;
