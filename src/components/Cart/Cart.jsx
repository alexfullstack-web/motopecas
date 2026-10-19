import { Link } from "react-router-dom";
import SmartImage from "../SmartImage/SmartImage";
import Icon, { WhatsAppIcon } from "../Icon/Icon";
import { formatPrice } from "../../utils/format";
import "./Cart.css";

export default function Cart({ items = [], onRemove, onUpdateQuantity, onCheckout, onClear }) {
  const count = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const total = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  if (items.length === 0) {
    return (
      <section className="cart cart--empty">
        <div className="cart__empty">
          <span className="cart__empty-icon" aria-hidden="true">
            <Icon name="cart" size={40} strokeWidth={1.5} />
          </span>
          <h1 className="cart__empty-title">Seu carrinho está vazio</h1>
          <p>Explore o catálogo e adicione as peças que sua moto precisa.</p>
          <Link className="btn btn--primary btn--lg" to="/produtos">
            Explorar produtos
            <Icon name="arrow" size={18} className="icon--arrow" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart">
      <div className="cart__main">
        <header className="cart__header">
          <h1 className="cart__title">
            Seu <span className="text-accent">carrinho</span>
          </h1>
          <span className="cart__badge">
            {count} {count === 1 ? "item" : "itens"}
          </span>
        </header>

        <ul className="cart__items">
          {items.map((item, i) => {
            const quantity = item.quantity || 1;
            const atLimit = item.stock !== undefined && quantity >= item.stock;

            return (
              <li key={item.id} className="cart__item" style={{ animationDelay: `${i * 70}ms` }}>
                <Link to={`/produtos/${item.id}`} className="cart__item-image" aria-label={`Ver ${item.name}`}>
                  <SmartImage src={item.image} fallback={item.fallback} alt="" fit="contain" />
                </Link>

                <div className="cart__item-info">
                  {item.category && <span className="cart__item-category">{item.category}</span>}
                  <Link to={`/produtos/${item.id}`} className="cart__item-name">
                    {item.name}
                  </Link>
                  <span className="cart__item-unit">{formatPrice(item.price)} / unidade</span>
                </div>

                <div className="qty cart__qty" role="group" aria-label={`Quantidade de ${item.name}`}>
                  <button
                    type="button"
                    aria-label={`Diminuir quantidade de ${item.name}`}
                    disabled={quantity <= 1}
                    onClick={() => onUpdateQuantity?.(item.id, quantity - 1)}
                  >
                    <Icon name="minus" size={14} />
                  </button>
                  <span key={quantity}>{quantity}</span>
                  <button
                    type="button"
                    aria-label={`Aumentar quantidade de ${item.name}`}
                    disabled={atLimit}
                    onClick={() => onUpdateQuantity?.(item.id, quantity + 1)}
                  >
                    <Icon name="plus" size={14} />
                  </button>
                </div>

                <strong className="cart__item-price">{formatPrice(item.price * quantity)}</strong>

                <button
                  type="button"
                  className="cart__remove"
                  onClick={() => onRemove?.(item.id)}
                  aria-label={`Remover ${item.name}`}
                  title="Remover"
                >
                  <Icon name="trash" size={18} />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="cart__links">
          <Link to="/produtos" className="link-arrow cart__continue">
            <Icon name="arrowLeft" size={16} /> Continuar comprando
          </Link>
          {onClear && (
            <button type="button" className="cart__clear" onClick={onClear}>
              Esvaziar carrinho
            </button>
          )}
        </div>
      </div>

      <aside className="cart__summary" aria-label="Resumo do pedido">
        <h2 className="cart__summary-title">Resumo</h2>

        <dl className="cart__summary-list">
          <div>
            <dt>Itens ({count})</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
          <div>
            <dt>Entrega</dt>
            <dd>A combinar</dd>
          </div>
          <div className="cart__summary-total">
            <dt>Total</dt>
            <dd key={total}>{formatPrice(total)}</dd>
          </div>
        </dl>

        <button type="button" className="btn btn--whatsapp btn--lg cart__checkout" onClick={() => onCheckout?.(items, total)}>
          <WhatsAppIcon size={20} />
          Enviar pedido
        </button>

        <p className="cart__note">
          Abriremos o WhatsApp com o seu pedido pronto para enviar à loja. O
          pagamento e a entrega são combinados na conversa.
        </p>
      </aside>
    </section>
  );
}
