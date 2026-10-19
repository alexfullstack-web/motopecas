import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import Icon from "../../components/Icon/Icon";
import { products } from "../../data/products";
import { useCart } from "../../hooks/useCart";
import "./Products.css";

const categories = [
  "Todas",
  ...new Set(products.map((product) => product.category).filter(Boolean)),
];

const countFor = (name) =>
  name === "Todas" ? products.length : products.filter((p) => p.category === name).length;

export default function Products() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get("categoria");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    categories.includes(initialCategory) ? initialCategory : "Todas",
  );
  const [sort, setSort] = useState("featured");
  const [onlyInStock, setOnlyInStock] = useState(false);

  const chooseCategory = (item) => {
    setCategory(item);
    setSearchParams(item === "Todas" ? {} : { categoria: item }, { replace: true });
  };

  const resetFilters = () => {
    setSearch("");
    chooseCategory("Todas");
    setSort("featured");
    setOnlyInStock(false);
  };

  const filteredProducts = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesSearch =
        !searchText ||
        product.name?.toLowerCase().includes(searchText) ||
        product.description?.toLowerCase().includes(searchText) ||
        product.category?.toLowerCase().includes(searchText);

      const matchesCategory = category === "Todas" || product.category === category;
      const matchesStock = !onlyInStock || (product.stock ?? 1) > 0;

      return matchesSearch && matchesCategory && matchesStock;
    });

    if (sort === "featured") {
      result.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    }
    if (sort === "price-asc") result.sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === "price-desc") result.sort((a, b) => Number(b.price) - Number(a.price));
    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

    return result;
  }, [search, category, sort, onlyInStock]);

  // muda a "key" da grade para reanimar os cards quando o filtro muda
  const gridKey = `${category}|${sort}|${onlyInStock}|${search.trim()}`;

  return (
    <main className="products-page">
      <section className="page-hero carbon">
        <div className="page-hero__stripes" aria-hidden="true" />
        <div className="container page-hero__inner">
          <span className="eyebrow eyebrow--light anim-fade-up">Desempenho • Qualidade • Confiança</span>
          <h1 className="page-hero__title">
            <span className="page-hero__line">Encontre as peças certas</span>
            <span className="page-hero__line page-hero__line--accent">para sua moto.</span>
          </h1>
          <p className="page-hero__text anim-fade-up" style={{ animationDelay: "350ms" }}>
            Explore nosso catálogo de peças e acessórios para manutenção,
            reposição e personalização.
          </p>
        </div>
      </section>

      <section className="container products-page__catalog">
        <div className="products-page__toolbar">
          <SearchBar value={search} onChange={setSearch} placeholder="Buscar peça, acessório..." />

          <div className="products-page__controls">
            <label className="products-page__toggle">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(event) => setOnlyInStock(event.target.checked)}
              />
              <span className="products-page__switch" aria-hidden="true" />
              Só em estoque
            </label>

            <label className="products-page__sort">
              <span className="sr-only">Ordenar por</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="featured">Destaques</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
                <option value="name">Nome A–Z</option>
              </select>
            </label>
          </div>
        </div>

        <div className="products-page__filters" role="group" aria-label="Filtrar por categoria">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`chip ${category === item ? "chip--active" : ""}`}
              aria-pressed={category === item}
              onClick={() => chooseCategory(item)}
            >
              {item}
              <span className="chip__count">{countFor(item)}</span>
            </button>
          ))}
        </div>

        <p className="products-page__count" aria-live="polite">
          <strong>{filteredProducts.length}</strong>{" "}
          {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
          {category !== "Todas" && (
            <>
              {" "}em <strong>{category}</strong>
            </>
          )}
        </p>

        {filteredProducts.length > 0 ? (
          <div className="products-page__grid" key={gridKey}>
            {filteredProducts.map((product, i) => (
              <div
                key={product.id ?? product.name}
                className="products-page__item"
                style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
              >
                <ProductCard
                  product={product}
                  onViewDetails={(item) => navigate(`/produtos/${item.id}`)}
                  onAddToCart={addItem}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="products-page__empty anim-fade-up">
            <span className="products-page__empty-icon" aria-hidden="true">
              <Icon name="search" size={32} />
            </span>
            <h3>Nenhum produto encontrado</h3>
            <p>Tente pesquisar com outro termo ou selecionar uma categoria diferente.</p>
            <button type="button" className="btn btn--primary" onClick={resetFilters}>
              Limpar filtros
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
