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
        ⌕
      </span>
      <input
        type="search"
        className="search-bar__input"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </label>
  );
}

export default SearchBar;
