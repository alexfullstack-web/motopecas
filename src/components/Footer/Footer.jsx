import { Link } from "react-router-dom";
import { buildWhatsAppUrl } from "../../services/whatsapp";
import { categories } from "../../data/categories";
import Icon, { WhatsAppIcon } from "../Icon/Icon";
import { BrandMark } from "../Header/Header";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer carbon">
      <div className="footer__cta">
        <div className="footer__cta-inner">
          <p className="footer__cta-title">
            Pronto para <span>acelerar?</span>
          </p>
          <a
            className="btn btn--whatsapp btn--lg"
            href={buildWhatsAppUrl("Olá! Gostaria de atendimento.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={20} />
            Falar com a loja
          </a>
        </div>
      </div>

      <div className="footer__container">
        <div className="footer__brand">
          <Link to="/" className="footer__logo" aria-label="Moto Peças — início">
            <BrandMark size={40} />
            <span>
              MOTO <span>PEÇAS</span>
            </span>
          </Link>

          <p className="footer__description">
            Peças e acessórios para acompanhar você em cada caminho. Monte seu
            pedido no site e finalize direto com a loja.
          </p>
        </div>

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
          <h3 className="footer__title">Categorias</h3>
          <ul className="footer__list">
            {categories.slice(0, 5).map((category) => (
              <li key={category.id}>
                <Link to={`/produtos?categoria=${encodeURIComponent(category.name)}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__column">
          <h3 className="footer__title">Atendimento</h3>
          <ul className="footer__list footer__list--icons">
            <li>
              <WhatsAppIcon size={16} />
              <a href={buildWhatsAppUrl("Olá! Gostaria de atendimento.")} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
            <li>
              <Icon name="clock" size={16} />
              Seg. a sex., 8h às 18h
            </li>
            <li>
              <Icon name="clock" size={16} />
              Sábado, 8h às 13h
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {year} Moto Peças. Todos os direitos reservados.</p>

        <button
          type="button"
          className="footer__top-link"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Voltar ao topo
          <Icon name="arrowUp" size={16} />
        </button>
      </div>
    </footer>
  );
}
