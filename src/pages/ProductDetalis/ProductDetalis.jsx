
import "./ProductDetails.css";

const formatPrice = (price) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(price) || 0);

export function ProductDetails({ product, onAddToCart }) {
  if (!product) {
    return (
      <section className="product-details__empty" role="status">
        Produto não encontrado.
      </section>
    );
  }

  const {
    name = "Produto sem nome",
    description = "Consulte mais informações sobre este produto.",
    image,
    price = 0,
    category,
    stock,
  } = product;

  const unavailable = stock !== undefined && stock <= 0;

  return (
    <article className="product-details">
      <div className="product-details__image-wrapper">
        <img
          src={image || "/images/product-placeholder.png"}
          alt={name}
          className="product-details__image"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/images/product-placeholder.png";
          }}
        />
      </div>

      <div className="product-details__content">
        {category && (
          <span className="product-details__category">
            {category}
          </span>
        )}

        <h1 className="product-details__title">{name}</h1>

        <p className="product-details__description">
          {description}
        </p>

        <div className="product-details__purchase">
          <span className="product-details__price-label">
            Preço
          </span>

          <strong className="product-details__price">
            {formatPrice(price)}
          </strong>

          {stock !== undefined && (
            <p className="product-details__stock">
              {unavailable
                ? "Produto indisponível"
                : "Produto disponível"}
            </p>
          )}
        </div>

        <button
          type="button"
          className="product-details__button"
          onClick={() => onAddToCart?.(product)}
          disabled={unavailable}
        >
          {unavailable ? "Indisponível" : "Adicionar ao carrinho"}
        </button>
      </div>
    </article>
  );
}

export default ProductDetails;
