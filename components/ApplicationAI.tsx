
import React, { useState, useRef } from 'react';
import { Send, User, Calendar, Ruler, Weight, Target, AlertCircle, Cpu, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { generateTrainingPreview } from '../services/geminiService';

interface AIResult {
  analysis: string;
  pillars: { title: string; description: string }[];
}

const ApplicationAI: React.FC = () => {
  const [formData, setFormData] = useState({ 
    name: '', age: '', weight: '', height: '', goal: '', routine: '', limitations: '' 
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const containerRef = useScrollReveal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const result = await generateTrainingPreview({
        goal: formData.goal,
        routine: formData.routine || "Executiva / Empresarial",
        limitations: formData.limitations
      });

      if (result) {
        setAiResult(result);
      }
    } catch (err) {
      console.error("Falha no diagnóstico:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactWhatsApp = () => {
    const phoneNumber = "5511999999999"; // Substitua pelo seu número
    const message = `Olá! Completei minha aplicação Elite PT. 
*Objetivo:* ${formData.goal}
*Diagnóstico IA:* ${aiResult?.analysis?.substring(0, 50)}...
Gostaria de agendar minha consulta estratégica.`;

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const inputClasses = "w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-4 focus:border-gold outline-none transition-all text-white text-sm placeholder:text-zinc-600";

  return (
    <section ref={containerRef as any} id="apply" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/20 bg-gold/5 text-gold text-[10px] font-bold uppercase tracking-widest mb-6">
            <Cpu className="w-3 h-3" />
            Análise Bio-Estratégica
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-white">Inicie sua Jornada</h2>
          <p className="text-zinc-500">Submeta seu perfil para uma prévia do seu protocolo exclusivo.</p>
        </div>

        {!aiResult ? (
          <form onSubmit={handleSubmit} className="glass-card p-6 md:p-12 rounded-3xl space-y-6 reveal border border-zinc-800 relative">
            {isSubmitting && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md rounded-3xl">
                 <Loader2 className="w-16 h-16 text-gold animate-spin mb-6" />
                 <p className="text-gold text-xs font-bold uppercase tracking-widest animate-pulse">Cruzando Dados Biométricos...</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input required disabled={isSubmitting} type="text" placeholder="Nome Completo" className={inputClasses} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <input required disabled={isSubmitting} type="number" placeholder="Idade" className={inputClasses} value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input required disabled={isSubmitting} type="number" placeholder="Peso (kg)" className={inputClasses} value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} />
              <input required disabled={isSubmitting} type="number" placeholder="Altura (cm)" className={inputClasses} value={formData.height} onChange={(e) => setFormData({...formData, height: e.target.value})} />
            </div>

            <input required disabled={isSubmitting} type="text" placeholder="Objetivo Principal (ex: Ganho de Massa, Definição)" className={inputClasses} value={formData.goal} onChange={(e) => setFormData({...formData, goal: e.target.value})} />
            
            <textarea disabled={isSubmitting} placeholder="Alguma lesão ou limitação relevante?" className={`${inputClasses} h-32 resize-none`} value={formData.limitations} onChange={(e) => setFormData({...formData, limitations: e.target.value})} />

            <button type="submit" disabled={isSubmitting} className="w-full py-6 bg-gold text-black font-black rounded-lg flex items-center justify-center gap-4 hover:brightness-110 active:scale-95 transition-all uppercase tracking-widest text-xs">
              Gerar Diagnóstico IA
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="glass-card p-8 md:p-12 rounded-3xl border border-gold/30 reveal animate-in fade-in duration-700">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <CheckCircle2 className="text-gold w-6 h-6" />
              Diagnóstico Concluído
            </h3>
            <div className="mb-8 p-6 bg-zinc-900/50 rounded-xl border border-zinc-800 italic text-zinc-300 leading-relaxed">
              "{aiResult.analysis}"
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {aiResult.pillars.map((p, i) => (
                <div key={i} className="p-5 border border-zinc-800 rounded-lg bg-zinc-900/20">
                  <h4 className="text-gold font-bold text-xs uppercase mb-2">{p.title}</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <button onClick={contactWhatsApp} className="w-full py-6 bg-gold text-black font-black rounded-lg flex items-center justify-center gap-4 hover:brightness-110 transition-all uppercase tracking-widest text-sm shadow-xl shadow-gold/20">
                Garantir Vaga via WhatsApp
                <Send className="w-4 h-4" />
              </button>
              <button onClick={() => setAiResult(null)} className="text-zinc-600 text-[10px] uppercase tracking-widest hover:text-zinc-400 transition-colors">
                Refazer Aplicação
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ApplicationAI;
