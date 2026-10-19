import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import { products } from "../../data/products";
import { useCart } from "../../hooks/useCart";
import "./Products.css";

const categories = [
  "Todas",
  ...new Set(products.map((product) => product.category).filter(Boolean)),
];

export default function Products() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [searchParams] = useSearchParams();

  const initialCategory = searchParams.get("categoria");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    categories.includes(initialCategory) ? initialCategory : "Todas",
  );
  const [sort, setSort] = useState("featured");

  const onViewDetails = (product) => navigate(`/produtos/${product.id}`);
  const onAddToCart = addItem;

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        product.name?.toLowerCase().includes(searchText) ||
        product.description?.toLowerCase().includes(searchText) ||
        product.category?.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "Todas" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "price-asc") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sort === "price-desc") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    }

    return result;
  }, [search, category, sort]);

  return (
    <main className="products-page">
      <section className="products-page__hero">
        <div className="products-page__hero-content">
          <span className="products-page__eyebrow">
            DESEMPENHO • QUALIDADE • CONFIANÇA
          </span>

          <h1 className="products-page__title">
            Encontre as peças certas
            <span> para sua moto.</span>
          </h1>

          <p className="products-page__subtitle">
            Explore nosso catálogo de peças e acessórios para manutenção,
            reposição e personalização.
          </p>
        </div>
      </section>

      <section className="products-page__catalog">
        <div className="products-page__heading">
          <div>
            <span className="products-page__eyebrow">NOSSO CATÁLOGO</span>

            <h2 className="products-page__section-title">Peças e acessórios</h2>

            <p className="products-page__count" aria-live="polite">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "produto encontrado"
                : "produtos encontrados"}
            </p>
          </div>
        </div>

        <div className="products-page__toolbar">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar peça, acessório..."
          />

          <label className="products-page__sort">
            <span>Ordenar:</span>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="featured">Destaques</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
              <option value="name">Nome A–Z</option>
            </select>
          </label>
        </div>

        <div className="products-page__filters">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`products-page__filter ${
                category === item ? "products-page__filter--active" : ""
              }`}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-page__grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id ?? product.name}
                product={product}
                onViewDetails={onViewDetails}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="products-page__empty">
            <span className="products-page__empty-icon" aria-hidden="true">
              🔎
            </span>

            <h3>Nenhum produto encontrado</h3>

            <p>
              Tente pesquisar com outro termo ou selecionar uma categoria
              diferente.
            </p>

            <button
              type="button"
              className="products-page__reset"
              onClick={() => {
                setSearch("");
                setCategory("Todas");
                setSort("featured");
              }}
            >
              Limpar filtros
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
