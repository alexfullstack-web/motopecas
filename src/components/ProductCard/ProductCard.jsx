import { useRef, useState } from "react";
import SmartImage from "../SmartImage/SmartImage";
import Icon from "../Icon/Icon";
import { formatPrice } from "../../utils/format";
import { flyToCart } from "../../utils/flyToCart";
import "./ProductCard.css";

export function ProductCard({ product, onViewDetails, onAddToCart, style, className = "", ...rest }) {
  const mediaRef = useRef(null);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const {
    name = "Produto sem nome",
    description = "Consulte os detalhes deste produto.",
    image,
    fallback,
    price = 0,
    category,
    stock,
  } = product;

  const unavailable = stock !== undefined && stock <= 0;
  const lowStock = stock !== undefined && stock > 0 && stock <= 5;

  const handleAdd = () => {
    if (unavailable) return;
    flyToCart(mediaRef.current);
    onAddToCart?.(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  // brilho que segue o mouse
  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <article
      className={`product-card ${unavailable ? "product-card--out" : ""} ${className}`}
      onMouseMove={handleMove}
      style={style}
      {...rest}
    >
      <button
        type="button"
        className="product-card__media"
        onClick={() => onViewDetails?.(product)}
        aria-label={`Ver detalhes de ${name}`}
        ref={mediaRef}
      >
        <SmartImage src={image} fallback={fallback} alt={name} fit="contain" />

        <span className="product-card__badges">
          {category && <span className="product-card__category">{category}</span>}
          {unavailable && <span className="product-card__flag product-card__flag--out">Esgotado</span>}
          {lowStock && <span className="product-card__flag">Últimas unidades</span>}
        </span>

        <span className="product-card__quick" aria-hidden="true">
          Ver detalhes <Icon name="arrow" size={16} />
        </span>
      </button>

      <div className="product-card__content">
        <h3 className="product-card__title">
          <button type="button" onClick={() => onViewDetails?.(product)}>
            {name}
          </button>
        </h3>

        <p className="product-card__description">{description}</p>

        <div className="product-card__footer">
          <div className="product-card__price-area">
            <span className="product-card__price-label">À vista</span>
            <strong className="product-card__price">{formatPrice(price)}</strong>
          </div>

          <button
            type="button"
            className={`product-card__add ${added ? "is-added" : ""}`}
            onClick={handleAdd}
            disabled={unavailable}
            aria-label={unavailable ? `${name} sem estoque` : `Adicionar ${name} ao carrinho`}
            title={unavailable ? "Sem estoque" : "Adicionar ao carrinho"}
          >
            <Icon name={added ? "check" : "cart"} size={20} key={added ? "ok" : "cart"} />
            {!added && !unavailable && <Icon name="plus" size={12} strokeWidth={3} className="product-card__plus" />}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
