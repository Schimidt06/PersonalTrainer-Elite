
import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ChevronRight, Shield, Zap, Award } from 'lucide-react';

const ROADMAP_DATA = {
  estetica: {
    title: "Escultura & Definição",
    phases: [
      {
        title: "Mês 1: Reajuste Metabólico",
        desc: "Otimização da insulina e ativação muscular profunda.",
        icon: <Zap className="w-5 h-5" />
      },
      {
        title: "Mês 2: Hipertrofia Estratégica",
        desc: "Aumento progressivo de carga com foco em harmonia corporal.",
        icon: <Shield className="w-5 h-5" />
      },
      {
        title: "Mês 3: Refinamento Estético",
        desc: "Protocolos de densidade e definição muscular máxima.",
        icon: <Award className="w-5 h-5" />
      }
    ]
  },
  performance: {
    title: "Performance & Força",
    phases: [
      {
        title: "Mês 1: Estabilidade & Base",
        desc: "Fortalecimento de core e correção biomecânica.",
        icon: <Shield className="w-5 h-5" />
      },
      {
        title: "Mês 2: Potência & Explosão",
        desc: "Desenvolvimento de força funcional avançada.",
        icon: <Zap className="w-5 h-5" />
      },
      {
        title: "Mês 3: Ápice Atlético",
        desc: "Pico de condicionamento e prontidão competitiva.",
        icon: <Award className="w-5 h-5" />
      }
    ]
  },
  longevidade: {
    title: "Saúde & Vigor",
    phases: [
      {
        title: "Mês 1: Mobilidade & Postura",
        desc: "Alinhamento e redução de dores articulares.",
        icon: <Shield className="w-5 h-5" />
      },
      {
        title: "Mês 2: Eficiência Cardiovascular",
        desc: "Saúde mitocondrial e resistência sistêmica.",
        icon: <Zap className="w-5 h-5" />
      },
      {
        title: "Mês 3: Vigor Sustentável",
        desc: "Consolidação de força e vitalidade a longo prazo.",
        icon: <Award className="w-5 h-5" />
      }
    ]
  }
};

const StrategicRoadmap: React.FC = () => {
  const [activeGoal, setActiveGoal] = useState<'estetica' | 'performance' | 'longevidade'>('estetica');
  const containerRef = useScrollReveal();

  return (
    <section ref={containerRef as any} className="py-24 bg-zinc-950 border-y border-zinc-900">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16 reveal">
          <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Estratégia</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Os Primeiros 90 Dias</h2>
          <p className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto italic">Selecione seu objetivo principal para ver o protocolo.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16 reveal stagger-delay-1">
          {Object.keys(ROADMAP_DATA).map((key) => (
            <button
              key={key}
              onClick={() => setActiveGoal(key as any)}
              className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                activeGoal === key 
                ? 'bg-gold text-black border-gold shadow-lg shadow-gold/20' 
                : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {ROADMAP_DATA[key as keyof typeof ROADMAP_DATA].title.split(' & ')[0]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {ROADMAP_DATA[activeGoal].phases.map((phase, i) => (
            <div 
              key={i} 
              className="relative glass-card p-8 rounded-xl border border-zinc-800/50 hover:border-gold/30 transition-all group"
            >
              <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center mb-6 text-gold group-hover:scale-110 transition-transform">
                {phase.icon}
              </div>
              <h3 className="text-zinc-100 font-bold text-lg mb-3 flex items-center gap-2">
                <span className="text-gold text-xs font-serif italic">Fase 0{i+1}.</span>
                {phase.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{phase.desc}</p>
              
              {i < 2 && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 lg:bottom-auto lg:top-1/2 lg:-right-6 lg:translate-x-0 lg:translate-y-[-50%] text-zinc-800 rotate-90 lg:rotate-0">
                  <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrategicRoadmap;
