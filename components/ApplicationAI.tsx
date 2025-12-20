
import React, { useState, useRef } from 'react';
import { Send, User, Calendar, Ruler, Weight, Target, Activity, AlertCircle, Cpu, Loader2 } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ApplicationAI: React.FC = () => {
  const [formData, setFormData] = useState({ 
    name: '', age: '', weight: '', height: '', goal: '', routine: '', limitations: '' 
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useScrollReveal();
  const formRef = useRef<HTMLFormElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!formRef.current || isSubmitting || window.innerWidth < 1024) return;
    const { left, top, width, height } = formRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: x * 8, y: y * -8 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Efeito dramático de "Processamento de IA"
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const phoneNumber = "5500000000000"; // Substitua pelo seu número
    const message = `*NOVA APLICAÇÃO ELITE PT*
    
*Nome:* ${formData.name}
*Idade:* ${formData.age}
*Metas:* ${formData.goal}
*Corpo:* ${formData.weight}kg / ${formData.height}cm
*Restrições:* ${formData.limitations || 'Nenhuma'}`;

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    setIsSubmitting(false);
  };

  const inputClasses = "w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-4 lg:py-4 focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-all text-white placeholder:text-zinc-700 text-sm lg:text-base appearance-none";

  return (
    <section ref={containerRef as any} className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gold/5 blur-[150px] rounded-full opacity-50"></div>
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/20 bg-gold/5 text-gold text-[10px] font-bold uppercase tracking-widest mb-6">
            <Cpu className="w-3 h-3" />
            Admissão Estratégica
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-white">Solicite sua vaga</h2>
          <p className="text-zinc-500 text-sm md:text-base">Analisaremos seu perfil para garantir exclusividade no atendimento.</p>
        </div>

        <form 
          ref={formRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          style={{ 
            transform: window.innerWidth > 1024 ? `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` : 'none',
            transition: 'transform 0.1s ease-out'
          }}
          onSubmit={handleSubmit} 
          className="glass-card p-6 md:p-12 rounded-3xl space-y-6 lg:space-y-8 reveal border border-zinc-800 relative transition-all duration-500"
        >
          {isSubmitting && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md rounded-3xl">
               <Loader2 className="w-16 h-16 text-gold animate-spin mb-6" />
               <p className="text-gold text-xs font-bold uppercase tracking-[0.4em] animate-pulse">Cruzando Dados Biométricos...</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2"><User className="w-3 h-3" /> Nome Completo</label>
              <input required disabled={isSubmitting} type="text" placeholder="Como devemos chamá-lo?" className={inputClasses} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2"><Calendar className="w-3 h-3" /> Idade</label>
              <input required disabled={isSubmitting} type="number" placeholder="Ex: 35" className={inputClasses} value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2"><Weight className="w-3 h-3" /> Peso (kg)</label>
              <input required disabled={isSubmitting} type="number" step="0.1" placeholder="Ex: 85.0" className={inputClasses} value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2"><Ruler className="w-3 h-3" /> Altura (cm)</label>
              <input required disabled={isSubmitting} type="number" placeholder="Ex: 182" className={inputClasses} value={formData.height} onChange={(e) => setFormData({...formData, height: e.target.value})} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2"><Target className="w-3 h-3" /> Objetivo Principal</label>
            <input required disabled={isSubmitting} type="text" placeholder="Ex: Performance, Estética, Longevidade" className={inputClasses} value={formData.goal} onChange={(e) => setFormData({...formData, goal: e.target.value})} />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2"><AlertCircle className="w-3 h-3" /> Lesões ou Restrições</label>
            <textarea disabled={isSubmitting} placeholder="Algum ponto de atenção?" className={`${inputClasses} h-28 resize-none`} value={formData.limitations} onChange={(e) => setFormData({...formData, limitations: e.target.value})} />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 bg-gold text-black font-black rounded-lg flex items-center justify-center gap-4 hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-widest text-xs lg:text-sm shadow-2xl shadow-gold/20"
          >
            {isSubmitting ? 'Analisando Bio-Perfil...' : 'Enviar Aplicação'}
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default ApplicationAI;
