/**
 * Animação "voar até o carrinho": copia a imagem do produto e a leva até o
 * ícone do carrinho no cabeçalho (#header-cart).
 */
export function flyToCart(sourceElement) {
  if (!sourceElement) return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  const target = document.getElementById("header-cart");
  const img = sourceElement.tagName === "IMG" ? sourceElement : sourceElement.querySelector("img");
  if (!target || !img) return;

  const from = img.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  if (!from.width) return;

  const clone = img.cloneNode();
  clone.removeAttribute("loading");
  clone.className = "fly-to-cart";
  Object.assign(clone.style, {
    left: `${from.left}px`,
    top: `${from.top}px`,
    width: `${from.width}px`,
    height: `${from.height}px`,
  });
  document.body.appendChild(clone);

  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);
  const scale = Math.max(28 / from.width, 0.08);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      clone.style.transform = `translate(${dx}px, ${dy}px) scale(${scale}) rotate(20deg)`;
      clone.style.opacity = "0.4";
    });
  });

  setTimeout(() => clone.remove(), 800);
}

export default flyToCart;
