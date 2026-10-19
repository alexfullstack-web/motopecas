import { useCart } from "../../hooks/useCart";
import "./Toast.css";

export default function Toast() {
  const { notice } = useCart();

  return (
    <div className="toast-region" role="status" aria-live="polite">
      {notice && <p className="toast">{notice}</p>}
    </div>
  );
}
