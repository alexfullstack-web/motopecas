import { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import SmartImage from "../../components/SmartImage/SmartImage";
import Icon, { WhatsAppIcon } from "../../components/Icon/Icon";
import { products } from "../../data/products";
import { useCart } from "../../hooks/useCart";
import { buildProductMessage, buildWhatsAppUrl } from "../../services/whatsapp";
import { formatPrice } from "../../utils/format";
import { flyToCart } from "../../utils/flyToCart";
import "./ProductDetails.css";

export function ProductDetails({ product, onAddToCart }) {
  const imageRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [zoom, setZoom] = useState({ active: false, x: 50, y: 50 });

  if (!product) {
    return (
      <section className="product-details__empty" role="status">
        <h1>Produto não encontrado</h1>
        <p>Ele pode ter sido removido do catálogo.</p>
        <Link to="/produtos" className="btn btn--primary">
          Ver catálogo
        </Link>
      </section>
    );
  }

  const {
    name = "Produto sem nome",
    description = "Consulte mais informações sobre este produto.",
    image,
    fallback,
    price = 0,
    category,
    stock,
  } = product;

  const unavailable = stock !== undefined && stock <= 0;
  const maxQuantity = stock ?? 99;

  // lupa: a imagem amplia seguindo o mouse
  const handleZoom = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setZoom({
      active: true,
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleAdd = () => {
    flyToCart(imageRef.current);
    onAddToCart?.(product, quantity);
  };

  return (
    <article className="product-details">
      <div
        className={`product-details__gallery ${zoom.active ? "is-zooming" : ""}`}
        ref={imageRef}
        onMouseMove={handleZoom}
        onMouseLeave={() => setZoom((z) => ({ ...z, active: false }))}
        style={{ "--zx": `${zoom.x}%`, "--zy": `${zoom.y}%` }}
      >
        <SmartImage src={image} fallback={fallback} alt={name} fit="contain" eager />
        {unavailable && <span className="product-details__sold">Esgotado</span>}
        <span className="product-details__zoom-hint" aria-hidden="true">
          <Icon name="search" size={14} /> Passe o mouse para ampliar
        </span>
      </div>

      <div className="product-details__content">
        {category && (
          <Link
            to={`/produtos?categoria=${encodeURIComponent(category)}`}
            className="product-details__category"
          >
            {category}
          </Link>
        )}

        <h1 className="product-details__title">{name}</h1>
        <p className="product-details__description">{description}</p>

        <div className="product-details__price-box">
          <span className="product-details__price-label">Preço à vista</span>
          <strong className="product-details__price">{formatPrice(price)}</strong>

          {stock !== undefined && (
            <p className={`product-details__stock ${unavailable ? "is-out" : ""}`}>
              <span className="product-details__stock-dot" />
              {unavailable
                ? "Produto indisponível no momento"
                : stock <= 5
                  ? `Últimas ${stock} unidades disponíveis`
                  : "Produto disponível"}
            </p>
          )}
        </div>

        {!unavailable && (
          <div className="product-details__buy">
            <div className="qty" role="group" aria-label="Quantidade">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Diminuir quantidade"
              >
                <Icon name="minus" size={16} />
              </button>
              <span key={quantity}>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
                disabled={quantity >= maxQuantity}
                aria-label="Aumentar quantidade"
              >
                <Icon name="plus" size={16} />
              </button>
            </div>

            <button type="button" className="btn btn--primary btn--lg product-details__add" onClick={handleAdd}>
              <Icon name="cart" size={20} />
              Adicionar ao carrinho
            </button>
          </div>
        )}

        <a
          className="btn btn--outline btn--lg product-details__whatsapp"
          href={buildWhatsAppUrl(buildProductMessage(product))}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon size={18} />
          {unavailable ? "Avise-me pelo WhatsApp" : "Tirar dúvida pelo WhatsApp"}
        </a>

        <ul className="product-details__perks">
          <li><Icon name="shield" size={18} /> Confirme a compatibilidade com a equipe antes de comprar</li>
          <li><Icon name="chat" size={18} /> Pedido finalizado pelo WhatsApp</li>
          <li><Icon name="box" size={18} /> Entrega e pagamento combinados na conversa</li>
        </ul>
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
    ? [
        ...products.filter((item) => item.category === product.category && item.id !== product.id),
        ...products.filter((item) => item.category !== product.category && item.featured),
      ].slice(0, 4)
    : [];

  return (
    <main className="product-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Você está em">
          <Link to="/">Início</Link>
          <span aria-hidden="true">/</span>
          <Link to="/produtos">Produtos</Link>
          {product && (
            <>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{product.name}</span>
            </>
          )}
        </nav>

        {/* key: zera quantidade e zoom ao trocar de produto */}
        <ProductDetails product={product} onAddToCart={addItem} key={id} />

        {related.length > 0 && (
          <section className="product-page__related" aria-labelledby="relacionados">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Continue comprando</span>
                <h2 id="relacionados">
                  Veja <span className="text-accent">também</span>
                </h2>
              </div>
            </div>

            <div className="product-page__related-grid">
              {related.map((item, i) => (
                <div key={item.id} className="products-page__item" style={{ animationDelay: `${300 + i * 80}ms` }}>
                  <ProductCard
                    product={item}
                    onViewDetails={(selected) => navigate(`/produtos/${selected.id}`)}
                    onAddToCart={addItem}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
