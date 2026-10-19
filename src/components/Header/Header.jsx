import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useCart } from "../../hooks/useCart";
import { useTheme } from "../../hooks/useTheme";
import "./Header.css";

export default function Header({ text = "[SUA MARCA]" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();
  const { theme, toggleTheme } = useTheme();

  const [firstWord, ...otherWords] = text.split(" ");
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header" id="top">
      <div className="header__container">
        <Link to="/" className="header__brand" onClick={closeMenu}>
          <span className="header__title">
            {firstWord} <span>{otherWords.join(" ")}</span>
          </span>
        </Link>

        <Navbar isOpen={menuOpen} onNavigate={closeMenu} />

        <div className="header__actions">
          <button
            type="button"
            className="header__icon-button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
            }
          >
            <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
          </button>

          <Link
            to="/carrinho"
            className="header__icon-button header__cart"
            onClick={closeMenu}
            aria-label={`Carrinho, ${count} ${count === 1 ? "item" : "itens"}`}
          >
            <span aria-hidden="true">🛒</span>
            {count > 0 && (
              <span className="header__cart-count" aria-hidden="true">
                {count}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="header__icon-button header__menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-principal"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
