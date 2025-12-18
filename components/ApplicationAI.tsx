
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
    if (!formRef.current || isSubmitting) return;
    const { left, top, width, height } = formRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    // Increased multipliers for a more pronounced tilt
    setTilt({ x: x * 12, y: y * -12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulando uma análise de IA sofisticada para melhorar a experiência do usuário
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

  const inputClasses = "w-full bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 focus:border-gold focus:ring-2 focus:ring-gold/10 focus:shadow-[0_0_30px_rgba(212,175,55,0.1)] active:bg-zinc-900/60 outline-none transition-all text-white placeholder:text-zinc-700 relative z-30 disabled:opacity-50 disabled:cursor-not-allowed group-hover:border-zinc-700";

  const getDynamicStyle = (depth: number, factor: number = 0.6) => ({
    transform: isSubmitting 
      ? `translateZ(${depth}px)` 
      : `translateZ(${depth}px) rotateY(${tilt.x * factor}deg) rotateX(${tilt.y * factor}deg)`,
    transition: 'transform 0.15s ease-out, opacity 0.3s ease-in-out, box-shadow 0.3s ease',
  });

  return (
    <section ref={containerRef as any} className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 bg-gold/5 blur-[120px] rounded-full"></div>
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/20 bg-gold/5 text-gold text-[10px] font-bold uppercase tracking-widest mb-6">
            <Cpu className={`w-3 h-3 ${isSubmitting ? 'animate-spin' : 'animate-pulse'}`} /> 
            {isSubmitting ? 'Analisando Bio-Perfil' : 'Triagem de Performance'}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Inicie sua Aplicação</h2>
          <p className="text-zinc-400">Preencha seus dados abaixo para analisarmos seu perfil e iniciarmos o processo de admissão.</p>
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
          className={`glass-card p-8 md:p-12 rounded-3xl space-y-8 reveal border border-zinc-800/50 relative preserve-3d transition-all duration-500 ${isSubmitting ? 'scale-[0.98] border-gold/20' : ''}`}
        >
          {/* 3D Scanner Effect */}
          {(isHovered || isSubmitting) && <div className={`scan-line ${isSubmitting ? 'animate-[scan_1.5s_linear_infinite]' : ''}`} />}

          {/* Loading Overlay */}
          {isSubmitting && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] rounded-3xl animate-in fade-in duration-500">
               <div className="relative mb-6">
                  <div className="absolute -inset-4 bg-gold/20 blur-xl rounded-full animate-pulse"></div>
                  <Loader2 className="w-12 h-12 text-gold animate-spin relative z-10" />
               </div>
               <p className="text-gold text-xs font-bold uppercase tracking-[0.3em] animate-pulse">Sincronizando Dados de Performance...</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group space-y-3" style={getDynamicStyle(40, 0.4)}>
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 transition-colors group-hover:text-gold">
                <User className="w-3 h-3" /> Nome Completo
              </label>
              <div style={getDynamicStyle(20, 0.2)}>
                <input 
                  required
                  disabled={isSubmitting}
                  type="text" 
                  placeholder="Como prefere ser chamado?"
                  className={inputClasses}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>
            <div className="group space-y-3" style={getDynamicStyle(40, 0.4)}>
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 transition-colors group-hover:text-gold">
                <Calendar className="w-3 h-3" /> Idade
              </label>
              <div style={getDynamicStyle(20, 0.2)}>
                <input 
                  required
                  disabled={isSubmitting}
                  type="number" 
                  placeholder="Sua idade"
                  className={inputClasses}
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group space-y-3" style={getDynamicStyle(60, 0.6)}>
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 transition-colors group-hover:text-gold">
                <Weight className="w-3 h-3" /> Peso Atual (kg)
              </label>
              <div style={getDynamicStyle(30, 0.3)}>
                <input 
                  required
                  disabled={isSubmitting}
                  type="number" 
                  step="0.1"
                  placeholder="Ex: 85.5"
                  className={inputClasses}
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                />
              </div>
            </div>
            <div className="group space-y-3" style={getDynamicStyle(60, 0.6)}>
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 transition-colors group-hover:text-gold">
                <Ruler className="w-3 h-3" /> Altura (cm)
              </label>
              <div style={getDynamicStyle(30, 0.3)}>
                <input 
                  required
                  disabled={isSubmitting}
                  type="number" 
                  placeholder="Ex: 180"
                  className={inputClasses}
                  value={formData.height}
                  onChange={(e) => setFormData({...formData, height: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group space-y-3" style={getDynamicStyle(80, 0.8)}>
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 transition-colors group-hover:text-gold">
                <Target className="w-3 h-3" /> Objetivo Principal
              </label>
              <div style={getDynamicStyle(40, 0.4)}>
                <input 
                  required
                  disabled={isSubmitting}
                  type="text" 
                  placeholder="Ex: Emagrecimento, Ganho de Massa"
                  className={inputClasses}
                  value={formData.goal}
                  onChange={(e) => setFormData({...formData, goal: e.target.value})}
                />
              </div>
            </div>
            <div className="group space-y-3" style={getDynamicStyle(80, 0.8)}>
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 transition-colors group-hover:text-gold">
                <Activity className="w-3 h-3" /> Frequência Semanal
              </label>
              <div style={getDynamicStyle(40, 0.4)}>
                <input 
                  required
                  disabled={isSubmitting}
                  type="text" 
                  placeholder="Quantas vezes por semana pretende treinar?"
                  className={inputClasses}
                  value={formData.routine}
                  onChange={(e) => setFormData({...formData, routine: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="group space-y-3" style={getDynamicStyle(100, 1.0)}>
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 transition-colors group-hover:text-gold">
              <AlertCircle className="w-3 h-3" /> Limitações ou Lesões (Opcional)
            </label>
            <div style={getDynamicStyle(50, 0.5)}>
              <textarea 
                disabled={isSubmitting}
                placeholder="Descreva brevemente se possui alguma restrição médica ou dor crônica..."
                className={`${inputClasses} h-32 resize-none`}
                value={formData.limitations}
                onChange={(e) => setFormData({...formData, limitations: e.target.value})}
              />
            </div>
          </div>

          <div style={getDynamicStyle(120, 1.2)}>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 bg-gold text-black font-black rounded-lg flex items-center justify-center gap-4 hover:opacity-90 active:scale-[0.97] transition-all uppercase tracking-[0.25em] text-[11px] shadow-2xl shadow-gold/30 relative z-40 disabled:opacity-70 disabled:grayscale disabled:scale-[0.98] border border-white/10"
            >
              {isSubmitting ? (
                <>
                  Preparando Relatório Estratégico...
                  <Loader2 className="w-4 h-4 animate-spin" />
                </>
              ) : (
                <>
                  Enviar Aplicação via WhatsApp
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </>
              )}
            </button>
          </div>
          
          <p className="text-center text-[9px] text-zinc-600 uppercase tracking-[0.4em] font-medium" style={getDynamicStyle(20, 0.2)}>
            Sua jornada para a excelência começa com um clique.
          </p>
        </form>
      </div>
    </section>
  );
};

export default ApplicationAI;
