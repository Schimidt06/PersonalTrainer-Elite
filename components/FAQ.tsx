
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../constants';
import { useScrollReveal } from '../hooks/useScrollReveal';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useScrollReveal();

  return (
    <section ref={containerRef as any} className="py-24 bg-zinc-900/20">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-4xl font-bold mb-12 text-center reveal">Dúvidas Frequentes</h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className={`border border-zinc-800 rounded-lg overflow-hidden transition-all reveal stagger-delay-${i + 1}`}>
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-zinc-800/50 transition-all"
              >
                <span className="font-semibold text-zinc-100">{faq.question}</span>
                {openIndex === i ? <Minus className="w-4 h-4 text-zinc-500" /> : <Plus className="w-4 h-4 text-zinc-500" />}
              </button>
              {openIndex === i && (
                <div className="p-6 pt-0 text-zinc-400 leading-relaxed animate-in fade-in duration-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
