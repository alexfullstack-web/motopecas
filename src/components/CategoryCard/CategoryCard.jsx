
import "./CategoryCard.css";

export function CategoryCard({ category, onClick }) {
  return (
    <button
      type="button"
      className="category-card"
      onClick={() => onClick?.(category)}
      aria-label={`Ver produtos da categoria ${category.name}`}
    >
      <img
        src={category.image || "/images/category-placeholder.svg"}
        alt={category.name}
        className="category-card__image"
        loading="lazy"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = "/images/category-placeholder.svg";
        }}
      />

      <h3 className="category-card__title">
        {category.name}
      </h3>

      {category.description && (
        <p className="category-card__description">
          {category.description}
        </p>
      )}
    </button>
  );
}

export default CategoryCard;
