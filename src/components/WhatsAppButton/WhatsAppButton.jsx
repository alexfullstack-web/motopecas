import { buildWhatsAppUrl } from "../../services/whatsapp";
import { WhatsAppIcon } from "../Icon/Icon";
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
      <span className="whatsapp-button__pulse" aria-hidden="true" />
      <WhatsAppIcon size={26} />
      <span className="whatsapp-button__label">Fale conosco</span>
    </a>
  );
}
