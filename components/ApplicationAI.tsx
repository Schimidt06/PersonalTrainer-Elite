
import React, { useState, useRef } from 'react';
import { Send, User, Calendar, Ruler, Weight, Target, Activity, AlertCircle, Cpu, Loader2 } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ApplicationAI: React.FC = () => {
  const [formData, setFormData] = useState({ 
    name: '',
    age: '',
    weight: '',
    height: '',
    goal: '', 
    routine: '', 
    limitations: '' 
  });
  
  const [isHovered, setIsHovered] = useState(false);
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

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    try {
      const phoneNumber = "5500000000000";
      const message = `Olá! Gostaria de aplicar para o treinamento personalizado. Aqui estão meus dados:

*Nome:* ${formData.name}
*Idade:* ${formData.age} anos
*Peso:* ${formData.weight} kg
*Altura:* ${formData.height} cm
*Objetivo:* ${formData.goal}
*Rotina Atual:* ${formData.routine}
*Limitações/Lesões:* ${formData.limitations || 'Nenhuma'}`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      console.error("Erro na aplicação:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-zinc-900/60 border border-zinc-800 rounded-lg p-3 lg:p-4 focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-all text-white placeholder:text-zinc-700 text-sm lg:text-base";

  const getDynamicStyle = (depth: number, factor: number = 0.6) => ({
    transform: (isSubmitting || window.innerWidth < 1024)
      ? `none` 
      : `translateZ(${depth}px) rotateY(${tilt.x * factor}deg) rotateX(${tilt.y * factor}deg)`,
    transition: 'transform 0.15s ease-out, opacity 0.3s ease-in-out',
  });

  return (
    <section ref={containerRef as any} className="py-20 lg:py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gold/5 blur-[120px] rounded-full"></div>
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-12 lg:mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/20 bg-gold/5 text-gold text-[9px] lg:text-[10px] font-bold uppercase tracking-widest mb-6">
            <Cpu className={`w-3 h-3 ${isSubmitting ? 'animate-spin' : 'animate-pulse'}`} /> 
            {isSubmitting ? 'Analisando Bio-Perfil' : 'Triagem de Performance'}
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-white">Inicie sua Aplicação</h2>
          <p className="text-zinc-500 text-sm lg:text-base">Analisaremos seu perfil para garantir a melhor jornada de performance.</p>
        </div>

        <form 
          ref={formRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => !isSubmitting && setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{ 
            transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
          onSubmit={handleSubmit} 
          className={`glass-card p-6 md:p-12 rounded-2xl lg:rounded-3xl space-y-6 lg:space-y-8 reveal border border-zinc-800/50 relative preserve-3d transition-all duration-500 ${isSubmitting ? 'scale-[0.98]' : ''}`}
        >
          {isSubmitting && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl lg:rounded-3xl">
               <Loader2 className="w-12 h-12 text-gold animate-spin mb-4" />
               <p className="text-gold text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">Sincronizando Dados...</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="space-y-2" style={getDynamicStyle(20, 0.4)}>
              <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2"><User className="w-3 h-3" /> Nome Completo</label>
              <input required disabled={isSubmitting} type="text" placeholder="Seu nome" className={inputClasses} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="space-y-2" style={getDynamicStyle(20, 0.4)}>
              <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2"><Calendar className="w-3 h-3" /> Idade</label>
              <input required disabled={isSubmitting} type="number" placeholder="Ex: 30" className={inputClasses} value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="space-y-2" style={getDynamicStyle(30, 0.6)}>
              <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2"><Weight className="w-3 h-3" /> Peso (kg)</label>
              <input required disabled={isSubmitting} type="number" step="0.1" placeholder="Ex: 80" className={inputClasses} value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} />
            </div>
            <div className="space-y-2" style={getDynamicStyle(30, 0.6)}>
              <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2"><Ruler className="w-3 h-3" /> Altura (cm)</label>
              <input required disabled={isSubmitting} type="number" placeholder="Ex: 180" className={inputClasses} value={formData.height} onChange={(e) => setFormData({...formData, height: e.target.value})} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2" style={getDynamicStyle(40, 0.8)}>
              <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2"><Target className="w-3 h-3" /> Objetivo</label>
              <input required disabled={isSubmitting} type="text" placeholder="Ex: Performance" className={inputClasses} value={formData.goal} onChange={(e) => setFormData({...formData, goal: e.target.value})} />
            </div>
            <div className="space-y-2" style={getDynamicStyle(50, 1.0)}>
              <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2"><AlertCircle className="w-3 h-3" /> Limitações</label>
              <textarea disabled={isSubmitting} placeholder="Alguma lesão ou dor?" className={`${inputClasses} h-24 lg:h-32 resize-none`} value={formData.limitations} onChange={(e) => setFormData({...formData, limitations: e.target.value})} />
            </div>
          </div>

          <div style={getDynamicStyle(60, 1.2)}>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 lg:py-6 bg-gold text-black font-black rounded-lg flex items-center justify-center gap-3 hover:opacity-90 active:scale-[0.98] transition-all uppercase tracking-widest text-[10px] lg:text-[11px] shadow-xl shadow-gold/10"
            >
              {isSubmitting ? 'Analisando...' : 'Enviar Aplicação'}
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ApplicationAI;
