import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Icon from "../Icon/Icon";
import { useCart } from "../../hooks/useCart";
import { useTheme } from "../../hooks/useTheme";
import "./Header.css";

const topbarItems = [
  "Monte seu pedido e finalize pelo WhatsApp",
  "Ajuda para encontrar a peça certa para o seu modelo",
  "Atendimento de segunda a sábado",
];

export function BrandMark({ size = 36 }) {
  return (
    <svg className="brand-mark" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#d71920" />
      <path d="M14 46V18h6l12 17 12-17h6v28h-7V31L32 46 21 31v15z" fill="#fff" />
    </svg>
  );
}

export default function Header({ text = "[SUA MARCA]" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bump, setBump] = useState(false);
  const { count } = useCart();
  const { theme, toggleTheme } = useTheme();
  const previousCount = useRef(count);

  const [firstWord, ...otherWords] = text.split(" ");
  const closeMenu = () => setMenuOpen(false);

  // cabeçalho compacto ao rolar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // "pulo" do ícone do carrinho quando um item entra
  useEffect(() => {
    if (count > previousCount.current) {
      setBump(true);
      const timer = setTimeout(() => setBump(false), 700);
      previousCount.current = count;
      return () => clearTimeout(timer);
    }
    previousCount.current = count;
    return undefined;
  }, [count]);

  // trava a rolagem com o menu mobile aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div className="topbar" aria-label="Avisos da loja">
        <div className="topbar__track">
          {[...topbarItems, ...topbarItems].map((item, index) => (
            <span key={index} className="topbar__item" aria-hidden={index >= topbarItems.length}>
              <Icon name="bolt" size={14} />
              {item}
            </span>
          ))}
        </div>
      </div>

      <header className={`header ${scrolled ? "header--scrolled" : ""}`} id="top">
        <div className="header__container">
          <Link to="/" className="header__brand" onClick={closeMenu} aria-label="Moto Peças — início">
            <BrandMark />
            <span className="header__title">
              {firstWord} <span>{otherWords.join(" ")}</span>
            </span>
          </Link>

          <Navbar isOpen={menuOpen} onNavigate={closeMenu} />

          <div className="header__actions">
            <button
              type="button"
              className="header__icon-button header__theme"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} key={theme} />
            </button>

            <Link
              to="/carrinho"
              id="header-cart"
              className={`header__icon-button header__cart ${bump ? "is-bumping" : ""}`}
              onClick={closeMenu}
              aria-label={`Carrinho, ${count} ${count === 1 ? "item" : "itens"}`}
            >
              <Icon name="cart" size={22} />
              {count > 0 && (
                <span className="header__cart-count" aria-hidden="true" key={count}>
                  {count}
                </span>
              )}
            </Link>

            <button
              type="button"
              className={`header__icon-button header__menu-button ${menuOpen ? "is-open" : ""}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="menu-principal"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <span className="burger" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
        <span className="header__progress" aria-hidden="true" />
      </header>

      <div
        className={`header__backdrop ${menuOpen ? "is-visible" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </>
  );
}
