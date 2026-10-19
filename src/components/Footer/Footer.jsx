import { Link } from "react-router-dom";
import { buildWhatsAppUrl } from "../../services/whatsapp";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <h2 className="footer__logo">
            MOTO <span>PEÇAS</span>
          </h2>

          <p className="footer__description">
            Peças e acessórios para acompanhar você em cada caminho.
          </p>
        </div>

        <div className="footer__columns">
          <nav className="footer__column" aria-label="Links do rodapé">
            <h3 className="footer__title">Navegue</h3>
            <ul className="footer__list">
              <li><Link to="/produtos">Produtos</Link></li>
              <li><Link to="/sobre">Sobre a loja</Link></li>
              <li><Link to="/contato">Contato</Link></li>
              <li><Link to="/carrinho">Carrinho</Link></li>
            </ul>
          </nav>

          <div className="footer__column">
            <h3 className="footer__title">Atendimento</h3>
            <ul className="footer__list">
              <li>
                <a href={buildWhatsAppUrl("Olá! Gostaria de atendimento.")} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>Segunda a sexta, 8h às 18h</li>
              <li>Sábado, 8h às 13h</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__text">
            © {year} Moto Peças. Todos os direitos reservados.
          </p>

          <a className="footer__top-link" href="#top">
            Voltar ao topo ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
