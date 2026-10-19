import "./ProductCard.css";

const formatPrice = (price) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(price) || 0);

export function ProductCard({ product, onViewDetails, onAddToCart }) {
  if (!product) return null;

  const {
    id,
    name = "Produto sem nome",
    description = "Consulte os detalhes deste produto.",
    image,
    price = 0,
    category,
    stock,
  } = product;

  return (
    <article className="product-card">
      <button
        type="button"
        className="product-card__image-button"
        onClick={() => onViewDetails?.(product)}
        aria-label={`Ver detalhes de ${name}`}
      >
        <div className="product-card__image-wrapper">
          {category && (
            <span className="product-card__category">{category}</span>
          )}

          <img
            src={image || "/images/product-placeholder.svg"}
            alt={name}
            className="product-card__image"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = "/images/product-placeholder.svg";
            }}
          />
        </div>
      </button>

      <div className="product-card__content">
        <h2 className="product-card__title">{name}</h2>

        <p className="product-card__description">{description}</p>

        <div className="product-card__purchase">
          <div className="product-card__price-area">
            <span className="product-card__price-label">Preço</span>

            <strong className="product-card__price">
              {formatPrice(price)}
            </strong>
          </div>

          {stock !== undefined && (
            <span
              className={`product-card__stock ${
                stock > 0
                  ? "product-card__stock--available"
                  : "product-card__stock--unavailable"
              }`}
            >
              {stock > 0 ? "Em estoque" : "Indisponível"}
            </span>
          )}
        </div>

        <div className="product-card__actions">
          <button
            type="button"
            className="product-card__details-button"
            onClick={() => onViewDetails?.(product)}
          >
            Ver detalhes
          </button>

          <button
            type="button"
            className="product-card__cart-button"
            onClick={() => onAddToCart?.(product)}
            disabled={stock !== undefined && stock <= 0}
          >
            {stock !== undefined && stock <= 0
              ? "Sem estoque"
              : "Adicionar ao carrinho"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
