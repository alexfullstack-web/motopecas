import { Link } from "react-router-dom";
import Icon from "../../components/Icon/Icon";
import "./NotFound.css";

export default function NotFound() {
  return (
    <main className="not-found carbon">
      <div className="not-found__speed" aria-hidden="true">
        <span /><span /><span />
      </div>

      <p className="not-found__code" aria-hidden="true">
        <span>4</span>
        <svg className="not-found__wheel" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="9" strokeDasharray="6 4" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#d71920" strokeWidth="4" />
          <circle cx="50" cy="50" r="7" fill="#d71920" />
          {[0, 72, 144, 216, 288].map((a) => (
            <line key={a} x1="50" y1="50" x2={50 + 30 * Math.cos((a * Math.PI) / 180)} y2={50 + 30 * Math.sin((a * Math.PI) / 180)} stroke="#d71920" strokeWidth="3" />
          ))}
        </svg>
        <span>4</span>
      </p>

      <h1 className="not-found__title">Saiu da pista!</h1>
      <p className="not-found__text">
        O endereço que você acessou não existe ou foi movido.
      </p>
      <div className="not-found__actions">
        <Link to="/" className="btn btn--primary btn--lg">
          <Icon name="arrowLeft" size={18} /> Voltar para o início
        </Link>
        <Link to="/produtos" className="btn btn--ghost btn--lg">
          Ver produtos
        </Link>
      </div>
    </main>
  );
}
