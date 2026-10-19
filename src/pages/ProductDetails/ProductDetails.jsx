
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { products } from "../../data/products";
import { useCart } from "../../hooks/useCart";
import { buildProductMessage, buildWhatsAppUrl } from "../../services/whatsapp";
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
          src={image || "/images/product-placeholder.svg"}
          alt={name}
          className="product-details__image"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/images/product-placeholder.svg";
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

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = products.find((item) => String(item.id) === id);

  const related = product
    ? products
        .filter((item) => item.category === product.category && item.id !== product.id)
        .slice(0, 4)
    : [];

  return (
    <main className="product-page">
      <div className="product-page__container">
        <Link to="/produtos" className="product-page__back">
          ← Voltar aos produtos
        </Link>

        <ProductDetails product={product} onAddToCart={addItem} />

        {product && (
          <a
            className="product-page__whatsapp"
            href={buildWhatsAppUrl(buildProductMessage(product))}
            target="_blank"
            rel="noopener noreferrer"
          >
            Perguntar sobre este produto no WhatsApp
          </a>
        )}

        {related.length > 0 && (
          <section className="product-page__related" aria-labelledby="relacionados">
            <h2 id="relacionados" className="product-page__related-title">
              Veja também
            </h2>

            <div className="product-page__related-grid">
              {related.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onViewDetails={(selected) => navigate(`/produtos/${selected.id}`)}
                  onAddToCart={addItem}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
