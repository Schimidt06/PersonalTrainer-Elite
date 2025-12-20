
import React from 'react';
import { ShieldCheck, UserCheck, BarChart4, Lock } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal.ts';

const PremiumPositioning: React.FC = () => {
  const containerRef = useScrollReveal();

  const features = [
    {
      icon: <UserCheck className="w-6 h-6 text-[#d4af37]" />,
      title: 'Atendimento 100% Individual',
      desc: 'Nada de treinos genéricos. Cada movimento é planejado para sua estrutura e objetivos.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#d4af37]" />,
      title: 'Número Limitado de Alunos',
      desc: 'Mantenho uma base seleta para garantir que minha atenção esteja focada na sua evolução.'
    },
    {
      icon: <BarChart4 className="w-6 h-6 text-[#d4af37]" />,
      title: 'Avaliação Avançada',
      desc: 'Métricas precisas de composição corporal e biomecânica para guiar cada ajuste.'
    },
    {
      icon: <Lock className="w-6 h-6 text-[#d4af37]" />,
      title: 'Privacidade Total',
      desc: 'Ambientes reservados e foco absoluto no seu desenvolvimento sem distrações.'
    }
  ];

  return (
    <section ref={containerRef as any} className="py-24 bg-zinc-900/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 reveal-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/20 bg-gold/5 text-gold text-[10px] font-bold uppercase tracking-widest mb-6">
              Posicionamento Premium
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meu método é para quem não aceita <span className="text-zinc-500">soluções genéricas</span>.
            </h2>
            <p className="text-zinc-400 text-lg mb-8 font-light">
              Diferente de academias convencionais, meu foco é a entrega de resultados reais através de um acompanhamento obsessivo pela biomecânica e fisiologia.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((f, i) => (
                <div key={i} className={`flex flex-col gap-3 reveal stagger-delay-${(i % 2) + 1}`}>
                  <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-2">
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-100">{f.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative reveal-right w-full">
            <div className="absolute -inset-10 bg-gold opacity-5 blur-[100px] rounded-full"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 aspect-square lg:aspect-auto lg:h-[600px]">
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
                alt="Personal Training de Elite" 
                className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 p-6 glass-card rounded-2xl border border-white/10">
                <p className="text-white font-serif italic text-lg">"A excelência não é um ato, mas um hábito."</p>
                <p className="text-gold text-[10px] font-bold uppercase tracking-[0.2em] mt-2">Aristóteles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumPositioning;
