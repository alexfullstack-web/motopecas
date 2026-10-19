import Cart from "../../components/Cart/Cart";
import { useCart } from "../../hooks/useCart";
import { buildOrderMessage, buildWhatsAppUrl } from "../../services/whatsapp";
import "./CartPage.css";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();

  const handleCheckout = (cartItems, total) => {
    const url = buildWhatsAppUrl(buildOrderMessage(cartItems, total));
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="cart-page">
      <div className="cart-page__container">
        <Cart
          items={items}
          onRemove={removeItem}
          onUpdateQuantity={updateQuantity}
          onCheckout={handleCheckout}
        />

        {items.length > 0 && (
          <div className="cart-page__footer">
            <p className="cart-page__note">
              Ao finalizar, abriremos o WhatsApp com o seu pedido pronto para
              enviar à loja. O pagamento e a entrega são combinados na conversa.
            </p>

            <button type="button" className="cart-page__clear" onClick={clearCart}>
              Esvaziar carrinho
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
