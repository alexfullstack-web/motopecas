import { buildWhatsAppUrl } from "../../services/whatsapp";
import "./WhatsAppButton.css";

export default function WhatsAppButton() {
  return (
    <a
      className="whatsapp-button"
      href={buildWhatsAppUrl("Olá! Vim pelo site e gostaria de atendimento.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a loja pelo WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M16 3C9.4 3 4 8.3 4 14.9c0 2.3.7 4.5 1.9 6.3L4 29l8-1.8c1.2.6 2.6.9 4 .9 6.6 0 12-5.3 12-11.9S22.6 3 16 3zm0 2.3c5.4 0 9.7 4.2 9.7 9.5S21.400 24.800 16 24.800c-1.300 0-2.600-.3-3.700-.9l-.5-.3-4.700 1 1-4.500-.3-.5a9.700 9.700 0 0 1-1.500-5.200C6.300 9.500 10.600 5.300 16 5.300zm-4 4.500c-.3 0-.6.100-.9.400-.3.300-1.100 1-1.100 2.600s1.100 3 1.300 3.200c.1.200 2.200 3.400 5.400 4.700 2.700 1.100 3.200.9 3.800.8.600-.1 1.800-.7 2-1.500.3-.7.300-1.300.2-1.500-.1-.1-.3-.2-.7-.4-.3-.1-1.800-.9-2.100-1-.3-.1-.5-.1-.7.100-.2.300-.8 1-.9 1.200-.2.200-.3.200-.7.100-.3-.2-1.300-.5-2.400-1.500-.9-.8-1.500-1.800-1.700-2.100-.2-.3 0-.5.100-.6l.5-.6c.1-.2.200-.3.300-.5.100-.2 0-.4 0-.6-.1-.1-.7-1.700-.9-2.300-.2-.6-.5-.5-.7-.5z"
        />
      </svg>
      <span className="whatsapp-button__label">WhatsApp</span>
    </a>
  );
}
