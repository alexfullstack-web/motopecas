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
      <div className="container">
        <Cart
          items={items}
          onRemove={removeItem}
          onUpdateQuantity={updateQuantity}
          onCheckout={handleCheckout}
          onClear={clearCart}
        />
      </div>
    </main>
  );
}
