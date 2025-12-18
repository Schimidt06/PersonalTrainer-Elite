
import { useEffect, useRef } from 'react';

/**
 * Hook to handle scroll reveal animations using IntersectionObserver.
 * Elements with .reveal, .reveal-left, or .reveal-right within the ref'd container
 * will receive the .active class when entering the viewport.
 */
export const useScrollReveal = (threshold = 0.05) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      threshold,
      rootMargin: '0px 0px -10% 0px', // Ativa um pouco antes do elemento chegar ao centro da visão
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Uma vez ativado, removemos a observação para poupar recursos
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const refreshObserver = () => {
      if (containerRef.current) {
        const elements = containerRef.current.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        elements.forEach((el) => {
          // Só observa se ainda não estiver ativo
          if (!el.classList.contains('active')) {
            observer.observe(el);
          }
        });
      }
    };

    // Observação inicial
    refreshObserver();

    // MutationObserver para garantir que mudanças no DOM (como abas ou carrosséis) 
    // que tragam novos elementos com as classes de reveal sejam detectadas
    const mutationObserver = new MutationObserver(() => {
      refreshObserver();
    });

    if (containerRef.current) {
      mutationObserver.observe(containerRef.current, { 
        childList: true, 
        subtree: true 
      });
    }

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [threshold]);

  return containerRef;
};
