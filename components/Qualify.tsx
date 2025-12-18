
import React from 'react';
import { Check, X } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Qualify: React.FC = () => {
  const containerRef = useScrollReveal();

  return (
    <section ref={containerRef as any} className="py-24 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl font-bold mb-4">Critérios de Seleção</h2>
          <p className="text-zinc-500">Trabalhamos apenas com perfis que se alinham à nossa busca por alta performance.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Para Quem é */}
          <div className="glass-card p-10 rounded-2xl border-l-4 border-l-emerald-500/30 reveal-left">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                <Check className="w-5 h-5" />
              </span>
              Este serviço é para você se:
            </h3>
            <ul className="space-y-6">
              {[
                'É executivo, empresário ou profissional liberal com rotina exigente.',
                'Valoriza seu tempo, privacidade e eficiência acima de tudo.',
                'Busca o equilíbrio entre estética impecável, saúde e performance.',
                'Entende que treinamento é um investimento estratégico na sua carreira.'
              ].map((item, i) => (
                <li key={i} className={`flex gap-4 text-zinc-300 reveal stagger-delay-${i + 1}`}>
                  <div className="mt-1 flex-shrink-0 text-emerald-500"><Check className="w-5 h-5" /></div>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Para Quem NÃO é */}
          <div className="glass-card p-10 rounded-2xl border-l-4 border-l-red-500/30 reveal-right">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                <X className="w-5 h-5" />
              </span>
              NÃO é para você se:
            </h3>
            <ul className="space-y-6">
              {[
                'Sua prioridade principal é apenas o preço mais baixo do mercado.',
                'Não está disposto a seguir um processo planejado e disciplinado.',
                'Busca fórmulas mágicas ou resultados imediatos sem compromisso.',
                'Não valoriza a personalização e prefere treinos de massa.'
              ].map((item, i) => (
                <li key={i} className={`flex gap-4 text-zinc-400 reveal stagger-delay-${i + 1}`}>
                  <div className="mt-1 flex-shrink-0 text-red-500"><X className="w-5 h-5" /></div>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualify;
