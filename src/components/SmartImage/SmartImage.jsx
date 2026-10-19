import { useState } from "react";
import "./SmartImage.css";

/**
 * Imagem com carregamento suave:
 * - mostra um "skeleton" brilhando enquanto carrega
 * - faz fade-in quando termina
 * - se a foto principal falhar, tenta a imagem local (fallback) e depois o placeholder
 */
export default function SmartImage({
  src,
  fallback,
  placeholder = "/images/product-placeholder.svg",
  alt = "",
  className = "",
  fit = "cover",
  eager = false,
  ...rest
}) {
  const sources = [src, fallback, placeholder].filter(Boolean);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [lastSrc, setLastSrc] = useState(src);

  // Se o produto mudar (ex.: navegação entre detalhes), recomeça
  if (src !== lastSrc) {
    setLastSrc(src);
    setIndex(0);
    setLoaded(false);
  }

  const handleError = () => {
    if (index < sources.length - 1) {
      setLoaded(false);
      setIndex((current) => current + 1);
    } else {
      setLoaded(true);
    }
  };

  return (
    <span className={`smart-image smart-image--${fit} ${loaded ? "is-loaded" : ""} ${className}`}>
      <img
        src={sources[index]}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        {...rest}
      />
    </span>
  );
}
