import { useEffect } from "react";

/**
 * Anima na rolagem todo elemento com a classe "reveal" (ou reveal-left, reveal-right, reveal-zoom).
 * Use data-delay="150" para atrasar (em ms). Chame uma vez por página, passando
 * dependências quando a lista de elementos mudar (ex.: filtros).
 */
export function useReveal(deps = []) {
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".reveal:not(.is-visible), .reveal-left:not(.is-visible), .reveal-right:not(.is-visible), .reveal-zoom:not(.is-visible)",
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const delay = Number(el.dataset.delay || 0);
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("is-visible");
          observer.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Contador animado de 0 até o valor quando o elemento aparece na tela */
export function animateCount(el, to, duration = 1400) {
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(to * eased).toString();
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export default useReveal;
