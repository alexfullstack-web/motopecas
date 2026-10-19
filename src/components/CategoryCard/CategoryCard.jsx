import SmartImage from "../SmartImage/SmartImage";
import Icon from "../Icon/Icon";
import "./CategoryCard.css";

export function CategoryCard({ category, count, onClick, index = 0, className = "", ...rest }) {
  return (
    <button
      type="button"
      className={`category-card ${className}`}
      onClick={() => onClick?.(category)}
      aria-label={`Ver produtos da categoria ${category.name}`}
      {...rest}
    >
      <SmartImage
        src={category.image}
        fallback={category.fallback}
        placeholder="/images/category-placeholder.svg"
        alt=""
        className="category-card__image"
      />

      <span className="category-card__shade" aria-hidden="true" />

      <span className="category-card__number" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="category-card__body">
        <span className="category-card__title">{category.name}</span>
        {category.description && (
          <span className="category-card__description">{category.description}</span>
        )}
        <span className="category-card__meta">
          {typeof count === "number" && (
            <span>
              {count} {count === 1 ? "produto" : "produtos"}
            </span>
          )}
          <span className="category-card__arrow" aria-hidden="true">
            <Icon name="arrow" size={18} />
          </span>
        </span>
      </span>
    </button>
  );
}

export default CategoryCard;
