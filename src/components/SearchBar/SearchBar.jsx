import Icon from "../Icon/Icon";
import "./SearchBar.css";

export function SearchBar({
  value,
  onChange,
  label = "Buscar produtos",
  placeholder = "O que você está procurando?",
}) {
  return (
    <label className="search-bar">
      <span className="sr-only">{label}</span>
      <span className="search-bar__icon" aria-hidden="true">
        <Icon name="search" size={20} />
      </span>
      <input
        type="search"
        className="search-bar__input"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
      {value && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={() => onChange?.("")}
          aria-label="Limpar busca"
        >
          <Icon name="close" size={16} />
        </button>
      )}
    </label>
  );
}

export default SearchBar;
