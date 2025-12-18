
import React from 'react';
import { Shield, Target, TrendingUp, Users, Calendar, Award } from 'lucide-react';
import { Testimonial, FAQItem, MethodStep } from './types';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Ricardo Silveira',
    role: 'CEO & Empreendedor',
    quote: 'Nunca tive um acompanhamento tão preciso. O foco na eficiência mudou não só meu corpo, mas minha produtividade diária.',
    imageUrl: 'https://picsum.photos/id/64/200/200'
  },
  {
    id: '2',
    name: 'Dra. Helena Martins',
    role: 'Médica Cirurgiã',
    quote: 'Para quem tem uma rotina exaustiva, a metodologia exclusiva dele é o diferencial. Resultados reais com inteligência estratégica.',
    imageUrl: 'https://picsum.photos/id/65/200/200'
  },
  {
    id: '3',
    name: 'Felipe Mendes',
    role: 'Investidor Anjo',
    quote: 'A exclusividade é real. Sinto que meu treino é pensado em cada detalhe do meu lifestyle.',
    imageUrl: 'https://picsum.photos/id/91/200/200'
  }
];

export const METHOD_STEPS: MethodStep[] = [
  {
    title: 'Avaliação Multidimensional',
    description: 'Análise biomecânica, metabólica e comportamental profunda para entender seu ponto de partida.',
    icon: 'Target'
  },
  {
    title: 'Planejamento Estratégico',
    description: 'Desenvolvimento de uma rota exclusiva que integra treino, nutrição e gestão de lifestyle.',
    icon: 'Calendar'
  },
  {
    title: 'Execução de Alta Performance',
    description: 'Acompanhamento individualizado em ambiente privado, garantindo técnica impecável.',
    icon: 'Award'
  },
  {
    title: 'Monitoramento Contínuo',
    description: 'Relatórios de evolução semanais e ajustes precisos baseados em métricas reais.',
    icon: 'TrendingUp'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'Para quem é o serviço?',
    answer: 'Nosso treinamento é focado em executivos, empresários e profissionais que buscam o mais alto nível de personalização, privacidade e resultados sustentáveis.'
  },
  {
    question: 'Onde são os atendimentos?',
    answer: 'Realizamos atendimentos em estúdio privado com tecnologia de ponta ou em locais de conveniência do cliente (consultar disponibilidade).'
  },
  {
    question: 'Funciona para quem tem pouco tempo?',
    answer: 'Sim. Nossa metodologia é desenhada para máxima eficiência. Menos tempo "gastos", mais tempo investido em resultados.'
  },
  {
    question: 'Qual o investimento médio?',
    answer: 'O investimento é proporcional à exclusividade do serviço. Os valores são discutidos após a análise da aplicação inicial.'
  }
];
