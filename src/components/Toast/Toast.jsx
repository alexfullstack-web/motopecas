import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import Icon from "../Icon/Icon";
import "./Toast.css";

export default function Toast() {
  const { notice } = useCart();

  return (
    <div className="toast-region" role="status" aria-live="polite">
      {notice && (
        <div className="toast" key={notice.id}>
          <span className="toast__icon" aria-hidden="true">
            <Icon name="check" size={18} strokeWidth={2.5} />
          </span>
          <p className="toast__text">{notice.text}</p>
          <Link to="/carrinho" className="toast__link">
            Ver carrinho
          </Link>
          <span className="toast__timer" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
