import { Link, useNavigate } from "react-router-dom";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import ProductCard from "../../components/ProductCard/ProductCard";
import { categories } from "../../data/categories";
import { products } from "../../data/products";
import { useCart } from "../../hooks/useCart";
import { buildWhatsAppUrl } from "../../services/whatsapp";
import "./Home.css";

const highlights = [
  {
    title: "Compra pelo WhatsApp",
    text: "Monte o carrinho e finalize o pedido direto com a loja.",
  },
  {
    title: "Peças para o dia a dia",
    text: "Pneus, freios, transmissão, elétrica e acessórios.",
  },
  {
    title: "Tire dúvidas antes de comprar",
    text: "Fale com a equipe para confirmar a compatibilidade.",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const featured = products.filter((product) => product.featured).slice(0, 4);

  return (
    <main className="home">
      <section className="hero">
        <div className="hero__content">
          <span className="hero__tag">Peças e acessórios para motos</span>

          <h1 className="hero__title">
            Sua moto merece o <span>melhor.</span>
          </h1>

          <p className="hero__subtitle">
            Encontre peças e acessórios para cuidar da sua moto e deixar cada
            viagem ainda melhor.
          </p>

          <div className="hero__actions">
            <Link to="/produtos" className="hero__button hero__button--primary">
              Ver produtos
            </Link>

            <Link to="/sobre" className="hero__button hero__button--secondary">
              Conheça nossa loja
            </Link>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__circle">
              <img
                className="img__piloto"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMy4lveWM_BxESNscWjRGLyblzs4c3zSsyDRsTUzji7ahXiWm-zC6cTaw&s=10"
                alt="Moto"
              />
          </div>
          <span className="hero__visual-label">Feita para quem pilota</span>
        </div>
      </section>

      <section className="home__highlights" aria-label="Diferenciais da loja">
        <ul className="home__highlights-list">
          {highlights.map((item) => (
            <li key={item.title} className="home__highlight">
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="home__section">
        <div className="home__container">
          <div className="home__heading">
            <h2 className="home__section-title">Compre por categoria</h2>
            <p className="home__section-text">
              Escolha o tipo de peça e veja só o que você precisa.
            </p>
          </div>

          <div className="home__categories">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={(item) =>
                  navigate(
                    `/produtos?categoria=${encodeURIComponent(item.name)}`,
                  )
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section className="home__section home__section--alt">
        <div className="home__container">
          <div className="home__heading home__heading--row">
            <div>
              <h2 className="home__section-title">Produtos em destaque</h2>
              <p className="home__section-text">
                Itens que nossos clientes mais procuram.
              </p>
            </div>

            <Link to="/produtos" className="home__catalog-link">
              Ver catálogo completo
            </Link>
          </div>

          <div className="home__products">
            {featured.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={(item) => navigate(`/produtos/${item.id}`)}
                onAddToCart={addItem}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="home__cta">
        <div className="home__cta-content">
          <h2 className="home__cta-title">Não achou a peça que procura?</h2>
          <p className="home__cta-text">
            Chame a gente no WhatsApp. Informe o modelo e o ano da sua moto e
            ajudamos a encontrar a peça certa.
          </p>
        </div>

        <a
          className="home__cta-button"
          href={buildWhatsAppUrl(
            "Olá! Preciso de ajuda para encontrar uma peça.",
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          Falar no WhatsApp
        </a>
      </section>
    </main>
  );
}
