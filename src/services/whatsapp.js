import { formatPrice } from "../utils/format";

// Defina o número real no arquivo .env (veja .env.example), formato: DDI + DDD + número.
const rawNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "5598900000000";

export const WHATSAPP_NUMBER = rawNumber.replace(/\D/g, "");

export function buildWhatsAppUrl(message = "") {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${text}` : ""}`;
}

export function buildProductMessage(product) {
  return `Olá! Tenho interesse no produto "${product.name}" (${formatPrice(product.price)}). Ele está disponível?`;
}

export function buildOrderMessage(items, total) {
  const lines = items.map((item) => {
    const quantity = item.quantity || 1;
    return `• ${quantity}x ${item.name} — ${formatPrice(item.price * quantity)}`;
  });

  return [
    "Olá! Gostaria de fazer o seguinte pedido:",
    "",
    ...lines,
    "",
    `Total: ${formatPrice(total)}`,
  ].join("\n");
}
