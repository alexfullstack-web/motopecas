import { NavLink } from "react-router-dom";
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
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === "/"}
          onClick={onNavigate}
          className={({ isActive }) =>
            `navbar__link${isActive ? " navbar__link--active" : ""}`
          }
        >
          {link.text}
        </NavLink>
      ))}
    </nav>
  );
}
