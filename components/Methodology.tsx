
import React from 'react';
import { Target, Calendar, Award, TrendingUp } from 'lucide-react';
import { METHOD_STEPS } from '../constants';
import { useScrollReveal } from '../hooks/useScrollReveal';
import BiomechanicalModel from './BiomechanicalModel';

const iconMap = {
  Target: <Target className="w-8 h-8 text-[#d4af37]" />,
  Calendar: <Calendar className="w-8 h-8 text-[#d4af37]" />,
  Award: <Award className="w-8 h-8 text-[#d4af37]" />,
  TrendingUp: <TrendingUp className="w-8 h-8 text-[#d4af37]" />
};

const MethodologyCard: React.FC<{ step: any, index: number }> = ({ step, index }) => {
  return (
    <div className={`relative p-8 glass-card rounded-xl group hover:border-gold transition-all reveal stagger-delay-${index + 1}`}>
      <div className="absolute top-0 right-0 p-4 text-4xl font-serif font-bold text-zinc-800">
        0{index + 1}
      </div>
      <div className="mb-6">
        {iconMap[step.icon as keyof typeof iconMap]}
      </div>
      <h3 className="text-xl font-bold mb-4">{step.title}</h3>
      <p className="text-zinc-500 text-sm leading-relaxed">{step.description}</p>
    </div>
  );
};

const Methodology: React.FC = () => {
  const containerRef = useScrollReveal();

  return (
    <section ref={containerRef as any} id="method" className="py-24 bg-zinc-900/50 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="reveal-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Engenharia do Corpo</h2>
            <p className="text-zinc-400 text-lg font-light leading-relaxed">
              Minha metodologia não se baseia em suposições. Utilizamos ciência biomecânica e análise de dados para projetar o caminho mais eficiente para a sua evolução física.
            </p>
          </div>
          <div className="h-[400px] lg:h-[500px] reveal-right bg-zinc-950/50 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl">
            <BiomechanicalModel />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {METHOD_STEPS.map((step, i) => (
            <MethodologyCard key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Methodology;
