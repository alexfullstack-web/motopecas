import { NavLink } from "react-router-dom";
import { buildWhatsAppUrl } from "../../services/whatsapp";
import { WhatsAppIcon } from "../Icon/Icon";
import "./Navbar.css";

const links = [
  { to: "/", text: "Início" },
  { to: "/produtos", text: "Produtos" },
  { to: "/sobre", text: "Sobre" },
  { to: "/contato", text: "Contato" },
];

export default function Navbar({ isOpen = false, onNavigate }) {
  return (
    <nav
      id="menu-principal"
      className={`navbar${isOpen ? " navbar--open" : ""}`}
      aria-label="Navegação principal"
    >
      {links.map((link, index) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === "/"}
          onClick={onNavigate}
          style={{ "--i": index }}
          className={({ isActive }) => `navbar__link${isActive ? " navbar__link--active" : ""}`}
        >
          <span className="navbar__index" aria-hidden="true">
            0{index + 1}
          </span>
          {link.text}
        </NavLink>
      ))}

      <a
        className="navbar__whatsapp btn btn--whatsapp"
        style={{ "--i": links.length }}
        href={buildWhatsAppUrl("Olá! Vim pelo site e gostaria de atendimento.")}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
      >
        <WhatsAppIcon size={18} />
        Pedir pelo WhatsApp
      </a>
    </nav>
  );
}
