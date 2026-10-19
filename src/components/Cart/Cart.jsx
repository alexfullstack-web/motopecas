import { Link } from "react-router-dom";
import "./Cart.css";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function Cart({
  items = [],
  onRemove,
  onUpdateQuantity,
  onCheckout,
}) {
  const total = items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  return (
    <section className="cart">
      <h2 className="cart__title">Carrinho de compras</h2>

      {items.length === 0 ? (
        <div className="cart__empty">
          <span className="cart__empty-icon" aria-hidden="true">
            🛒
          </span>
          <p>Seu carrinho está vazio.</p>
          <Link className="cart__continue" to="/produtos">
            Explorar produtos
          </Link>
        </div>
      ) : (
        <>
          <ul className="cart__items">
            {items.map((item) => {
              const quantity = item.quantity || 1;

              return (
                <li key={item.id} className="cart__item">
                  <div className="cart__item-info">
                    <h3 className="cart__item-name">{item.name}</h3>

                    <p className="cart__item-unit-price">
                      {currency.format(item.price)} por unidade
                    </p>

                    <div className="cart__quantity">
                      <button
                        type="button"
                        aria-label={`Diminuir quantidade de ${item.name}`}
                        disabled={quantity <= 1}
                        onClick={() =>
                          onUpdateQuantity?.(item.id, quantity - 1)
                        }
                      >
                        −
                      </button>

                      <span>{quantity}</span>

                      <button
                        type="button"
                        aria-label={`Aumentar quantidade de ${item.name}`}
                        onClick={() =>
                          onUpdateQuantity?.(item.id, quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart__item-actions">
                    <strong className="cart__item-price">
                      {currency.format(item.price * quantity)}
                    </strong>

                    <button
                      type="button"
                      className="cart__remove"
                      onClick={() => onRemove?.(item.id)}
                    >
                      Remover
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="cart__summary">
            <span>Total da compra</span>
            <strong className="cart__total">{currency.format(total)}</strong>
          </div>

          <button
            type="button"
            className="cart__checkout-button"
            onClick={() => onCheckout?.(items, total)}
          >
            Finalizar compra
          </button>
        </>
      )}
    </section>
  );
}
