
import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ShieldCheck, CalendarCheck, UserPlus, Fingerprint } from 'lucide-react';

const Exclusivity: React.FC = () => {
  const containerRef = useScrollReveal();

  const selectionSteps = [
    {
      icon: <Fingerprint className="w-6 h-6" />,
      title: "Aplicação Inicial",
      description: "Envolve o preenchimento de um questionário técnico detalhado sobre seu histórico, seguido de uma breve chamada virtual de 15 minutos para alinhamento de perfil e expectativas."
    },
    {
      icon: <CalendarCheck className="w-6 h-6" />,
      title: "Consulta Estratégica",
      description: "Uma imersão presencial ou online para revisão exaustiva de seus hábitos de vida, rotina de sono, nutricional e definição precisa de metas de performance e estética a curto e longo prazo."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Protocolo de Admissão",
      description: "Formalização da nossa parceria exclusiva através da assinatura de termos de compromisso, acordos de confidencialidade e preenchimento de formulários de prontidão para atividade física avançada."
    },
    {
      icon: <UserPlus className="w-6 h-6" />,
      title: "Onboarding Personalizado",
      description: "Primeira sessão dedicada à coleta de métricas basais (composição corporal, fotos e perímetros), testes de mobilidade articular e configuração do seu ecossistema digital de acompanhamento 24/7."
    }
  ];

  return (
    <section ref={containerRef as any} className="py-24 bg-zinc-950 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              Uma experiência <span className="gold-gradient">estritamente limitada</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-12 font-light leading-relaxed">
              Manter um padrão de excelência exige tempo e dedicação absoluta. Por isso, operamos com um número reduzido de alunos ativos. O processo de seleção garante que cada cliente receba o mais alto nível de atenção técnica e estratégica.
            </p>
            
            <div className="space-y-8">
              <div className="p-6 border border-zinc-800 rounded-2xl bg-zinc-900/20 reveal stagger-delay-1 transition-all hover:border-zinc-700 hover:bg-zinc-900/40">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-white">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                  Agenda Restrita
                </h3>
                <p className="text-zinc-500 text-sm">Trabalhamos apenas com um seleto grupo de clientes por vez para assegurar resultados extraordinários.</p>
              </div>
              <div className="p-6 border border-zinc-800 rounded-2xl bg-zinc-900/20 reveal stagger-delay-2 transition-all hover:border-zinc-700 hover:bg-zinc-900/40">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-white">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                  Ambiente Reservado
                </h3>
                <p className="text-zinc-500 text-sm">Sessões em estúdio privado ou locais exclusivos, garantindo 100% de privacidade para o seu treino.</p>
              </div>
            </div>
          </div>

          <div className="lg:bg-zinc-900/30 p-8 md:p-12 rounded-3xl border border-zinc-800 reveal-right">
            <h3 className="text-2xl font-bold mb-10 text-center uppercase tracking-widest text-zinc-300">Processo de Seleção</h3>
            
            <div className="relative">
              {/* Vertical line for mobile/desktop timeline effect */}
              <div className="absolute left-[27px] top-2 bottom-2 w-px bg-zinc-800 hidden md:block"></div>
              
              <div className="space-y-12">
                {selectionSteps.map((step, i) => (
                  <div 
                    key={i} 
                    className="group flex flex-col md:flex-row gap-6 relative reveal stagger-delay-2 cursor-default p-4 -m-4 rounded-2xl transition-all duration-500 ease-out hover:bg-zinc-800/40 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/50"
                  >
                    <div className="w-14 h-14 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0 z-10 shadow-xl transition-all duration-300 group-hover:border-gold group-hover:text-gold text-zinc-400 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:-translate-y-1">
                      {step.icon}
                    </div>
                    <div className="flex-1 transition-transform duration-300 group-hover:translate-x-1">
                      <h4 className="text-lg font-bold text-zinc-200 mb-1 transition-colors group-hover:text-white">{step.title}</h4>
                      <p className="text-zinc-500 text-sm leading-relaxed transition-colors group-hover:text-zinc-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-zinc-800 text-center">
              <p className="text-zinc-400 text-xs italic">
                *Sujeito a disponibilidade de agenda. Consultas iniciais não garantem admissão imediata.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Exclusivity;
