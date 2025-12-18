
import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ChevronRight, Shield, Zap, Award } from 'lucide-react';

const ROADMAP_DATA = {
  estetica: {
    title: "Escultura Corporal & Definição",
    phases: [
      {
        title: "Mês 1: Reajuste Metabólico",
        desc: "Foco em reeducação do sistema insulinêmico e ativação de grandes cadeias musculares para maximizar a queima calórica basal.",
        icon: <Zap className="w-5 h-5" />
      },
      {
        title: "Mês 2: Hipertrofia Estratégica",
        desc: "Aumento progressivo de volume com foco em pontos fracos estéticos (ombros, dorsais e core) para criar a 'V-Shape'.",
        icon: <Shield className="w-5 h-5" />
      },
      {
        title: "Mês 3: Refinamento & Densidade",
        desc: "Protocolos de alta intensidade e ajustes finos na nutrição para revelar a musculatura construída com máxima definição.",
        icon: <Award className="w-5 h-5" />
      }
    ]
  },
  performance: {
    title: "Performance & Força Funcional",
    phases: [
      {
        title: "Mês 1: Estabilidade & Base",
        desc: "Correção de desequilíbrios musculares e fortalecimento do core para suportar cargas elevadas com segurança absoluta.",
        icon: <Shield className="w-5 h-5" />
      },
      {
        title: "Mês 2: Potência & Explosão",
        desc: "Introdução de movimentos multiplanares e treinos de força pura para aumentar o recrutamento de fibras do tipo II.",
        icon: <Zap className="w-5 h-5" />
      },
      {
        title: "Mês 3: Pico de Condicionamento",
        desc: "Integração de força com resistência anaeróbica para atingir o seu ápice físico e prontidão atlética.",
        icon: <Award className="w-5 h-5" />
      }
    ]
  },
  longevidade: {
    title: "Saúde, Longevidade & Vigor",
    phases: [
      {
        title: "Mês 1: Mobilidade & Postura",
        desc: "Liberação miofascial e exercícios de mobilidade articular para reduzir dores crônicas e melhorar a amplitude de movimento.",
        icon: <Shield className="w-5 h-5" />
      },
      {
        title: "Mês 2: Eficiência Cardiovascular",
        desc: "Treinamento intervalado controlado para otimizar a saúde mitocondrial e reduzir a idade biológica.",
        icon: <Zap className="w-5 h-5" />
      },
      {
        title: "Mês 3: Manutenção Vital",
        desc: "Consolidação de novos hábitos e força funcional para garantir autonomia e vigor por décadas.",
        icon: <Award className="w-5 h-5" />
      }
    ]
  }
};

const StrategicRoadmap: React.FC = () => {
  const [activeGoal, setActiveGoal] = useState<'estetica' | 'performance' | 'longevidade'>('estetica');
  const containerRef = useScrollReveal();

  return (
    <section ref={containerRef as any} className="py-24 bg-zinc-950 border-y border-zinc-900 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16 reveal">
          <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Planejamento Estratégico</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Seus Primeiros 90 Dias</h2>
          <p className="text-zinc-500 max-w-xl mx-auto italic">Selecione seu foco principal para visualizar sua jornada de transformação.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16 reveal stagger-delay-1">
          {Object.keys(ROADMAP_DATA).map((key) => (
            <button
              key={key}
              onClick={() => setActiveGoal(key as any)}
              className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                activeGoal === key 
                ? 'bg-gold text-black border-gold shadow-lg shadow-gold/20' 
                : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {key === 'estetica' ? 'Estética' : key === 'performance' ? 'Performance' : 'Longevidade'}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-900 hidden md:block -z-0"></div>
          
          {ROADMAP_DATA[activeGoal].phases.map((phase, i) => (
            <div 
              key={i} 
              className={`relative z-10 glass-card p-8 rounded-2xl border border-zinc-800/50 transition-all duration-500 transform ${
                activeGoal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center mb-6 text-gold group-hover:scale-110 transition-transform">
                {phase.icon}
              </div>
              <h3 className="text-zinc-100 font-bold text-lg mb-3 flex items-center gap-2">
                <span className="text-gold text-xs font-serif italic">0{i+1}.</span>
                {phase.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{phase.desc}</p>
              
              {i < 2 && (
                <div className="absolute top-1/2 -right-4 translate-y-[-50%] text-zinc-800 hidden md:block">
                  <ChevronRight className="w-8 h-8" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center reveal stagger-delay-3">
          <p className="text-zinc-600 text-xs uppercase tracking-widest mb-8">Cada protocolo é ajustado individualmente após sua avaliação.</p>
          <a 
            href="#apply" 
            className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors font-bold text-xs uppercase tracking-[0.2em] group"
            onClick={(e) => {
               e.preventDefault();
               document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Garantir minha vaga estratégica
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default StrategicRoadmap;
