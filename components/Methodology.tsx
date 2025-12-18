
import React, { useState } from 'react';
import { Target, Calendar, Award, TrendingUp } from 'lucide-react';
import { METHOD_STEPS } from '../constants';
import { useScrollReveal } from '../hooks/useScrollReveal';

const iconMap = {
  Target: <Target className="w-8 h-8 text-[#d4af37]" />,
  Calendar: <Calendar className="w-8 h-8 text-[#d4af37]" />,
  Award: <Award className="w-8 h-8 text-[#d4af37]" />,
  TrendingUp: <TrendingUp className="w-8 h-8 text-[#d4af37]" />
};

const MethodologyCard: React.FC<{ step: any, index: number }> = ({ step, index }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: x * 15, y: y * -15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
      className={`relative p-8 glass-card rounded-xl group hover:border-gold transition-all reveal stagger-delay-${index + 1} preserve-3d`}
    >
      <div className="absolute top-0 right-0 p-4 text-4xl font-serif font-bold text-zinc-800" style={{ transform: 'translateZ(20px)' }}>
        0{index + 1}
      </div>
      <div className="mb-6" style={{ transform: 'translateZ(40px)' }}>
        {iconMap[step.icon as keyof typeof iconMap]}
      </div>
      <h3 className="text-xl font-bold mb-4" style={{ transform: 'translateZ(50px)' }}>{step.title}</h3>
      <p className="text-zinc-500 text-sm leading-relaxed" style={{ transform: 'translateZ(30px)' }}>{step.description}</p>
    </div>
  );
};

const Methodology: React.FC = () => {
  const containerRef = useScrollReveal();

  return (
    <section ref={containerRef as any} className="py-24 bg-zinc-900/50 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20 reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Método de Alta Precisão</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Não é apenas sobre levantar pesos. É sobre uma arquitetura de treinamento projetada para se encaixar na sua vida e potencializar sua biologia.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 perspective-1000">
          {METHOD_STEPS.map((step, i) => (
            <MethodologyCard key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Methodology;
